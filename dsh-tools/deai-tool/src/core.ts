// 规则引擎：把 Markdown 切成块，跑确定性谓词。
// 不调模型、不评分、不引用「检测」。
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Severity = 'error' | 'warn' | 'info';

export interface Rule {
  id: string;
  title: string;
  title_en: string;
  object: string;
  scope: string;
  severity: Severity;
  defaultOn: boolean;
  source: string;
  derived: boolean;
  predicate: Record<string, unknown>;
  exempt: string[];
  fix: string;
  fix_en?: string;
  autofix: 'safe' | null;
}

export interface Finding {
  ruleId: string;
  severity: Severity;
  file: string;
  line: number;
  message: string;
  evidence: string;
  fix: string;
  source: string;
  autofix: 'safe' | null;
}

interface Block {
  kind: 'para' | 'heading';
  text: string;
  line: number;
  fromList: boolean;
  inQuote: boolean;
}

const HERE = dirname(fileURLToPath(import.meta.url));

export function loadRules(layer = 'text'): Rule[] {
  const file = resolve(HERE, '..', 'rules', `${layer}.json`);
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  return parsed.rules as Rule[];
}

/** 去掉行内代码、链接目标、URL、HTML 标签、强调标记，只留人读的字 */
export function stripInline(text: string): string {
  return text
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseMarkdown(raw: string): { blocks: Block[]; headings: Block[]; bodyChars: number } {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  const headings: Block[] = [];
  let start = 0;
  let fence = false;
  let buffer: string[] = [];
  let bufLine = 0;

  const flush = () => {
    if (!buffer.length) return;
    const text = stripInline(buffer.join(' '));
    if (text) blocks.push({ kind: 'para', text, line: bufLine, fromList: false, inQuote: false });
    buffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const at = i + 1;

    if (/^\s*```/.test(line)) {
      flush();
      fence = !fence;
      continue;
    }
    if (fence) continue;

    if (i === 0 && line.trim() === '---') {
      let end = -1;
      for (let j = 1; j < lines.length; j += 1) {
        if (lines[j].trim() === '---') {
          end = j;
          break;
        }
      }
      if (end > 0) {
        i = end;
        continue;
      }
    }

    if (!line.trim()) {
      flush();
      continue;
    }
    if (/^\s*>/.test(line)) {
      flush();
      continue;
    }
    if (/^\s*\|/.test(line)) {
      flush();
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      const text = stripInline(h[2]);
      if (text) headings.push({ kind: 'heading', text, line: at, fromList: false, inQuote: false });
      continue;
    }
    const li = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/.exec(line);
    if (li) {
      flush();
      const text = stripInline(li[1]);
      if (text) blocks.push({ kind: 'para', text, line: at, fromList: true, inQuote: false });
      continue;
    }
    if (!buffer.length) bufLine = at;
    buffer.push(line);
  }
  flush();

  const bodyChars = blocks.reduce((n, b) => n + b.text.length, 0);
  return { blocks, headings, bodyChars };
}

const chars = (s: string) => [...s].length;

function countWords(text: string, words: string[]): { total: number; hit: string[] } {
  const hit: string[] = [];
  let total = 0;
  for (const w of words) {
    let idx = text.indexOf(w);
    let n = 0;
    while (idx !== -1) {
      n += 1;
      idx = text.indexOf(w, idx + w.length);
    }
    if (n) {
      total += n;
      hit.push(`${w}×${n}`);
    }
  }
  return { total, hit };
}

function bigrams(text: string, n = 3): Set<string> {
  const t = text.replace(/\s+/g, '');
  const out = new Set<string>();
  for (let i = 0; i + n <= t.length; i += 1) out.add(t.slice(i, i + n));
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
}

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;

export interface RunOptions {
  strict?: boolean;
  file?: string;
  rules?: Rule[];
}

export function runRules(raw: string, opts: RunOptions = {}): Finding[] {
  const rules = (opts.rules ?? loadRules()).filter((r) => (opts.strict ? true : r.defaultOn));
  const { blocks, headings, bodyChars } = parseMarkdown(raw);
  const paras = blocks.filter((b) => b.kind === 'para' && !b.fromList);
  const findings: Finding[] = [];

  const push = (rule: Rule, line: number, message: string, evidence: string) => {
    findings.push({
      ruleId: rule.id,
      severity: rule.severity,
      file: opts.file ?? '<stdin>',
      line,
      message,
      evidence,
      fix: rule.fix,
      source: rule.source,
      autofix: rule.autofix,
    });
  };

  for (const rule of rules) {
    const p = rule.predicate as Record<string, any>;
    switch (p.type) {
      case 'first_word_stack': {
        const words: string[] = p.words;
        // 引导词只在「句首/段首/分句首」算数：前面是标点或开头
        const atClauseStart = (text: string, w: string) => (text.match(new RegExp(`(^|[。，；、！？\\s])${w}`, 'g')) ?? []).length;
        let docHits = 0;
        for (const b of paras) {
          let n = 0;
          const hit: string[] = [];
          for (const w of words) {
            const c = atClauseStart(b.text, w);
            if (c) {
              n += c;
              hit.push(`${w}×${c}`);
            }
          }
          if (n) docHits += 1;
          if (n >= (p.perParagraphMin ?? 2)) push(rule, b.line, `同一段堆了 ${n} 个引导词`, hit.join(' '));
        }
        if (docHits >= (p.documentMin ?? 3)) push(rule, 1, `全文 ${docHits} 段带引导词`, `paragraphs=${docHits}`);
        break;
      }
      case 'lexicon_density': {
        const words: string[] = p.words;
        let docTotal = 0;
        for (const b of paras) {
          const { total, hit } = countWords(b.text, words);
          docTotal += total;
          if (total >= (p.perParagraphMin ?? 2)) push(rule, b.line, `单段空话词 ${total} 处`, hit.join(' '));
        }
        const density = docTotal / Math.max(1, bodyChars / (p.perChars ?? 300));
        // 短文不判密度：分母太小，一个词就能把密度顶上去
        if (bodyChars >= (p.minBodyChars ?? 300) && density >= (p.densityMin ?? 1)) {
          push(rule, 1, `全文空话词密度 ${density.toFixed(2)}/300字`, `count=${docTotal}, chars=${bodyChars}`);
        }
        break;
      }
      case 'paragraph_head_same': {
        const n = p.consecutive ?? 3;
        const k = p.prefixChars ?? 2;
        for (let i = 0; i + n - 1 < paras.length; i += 1) {
          const heads = paras.slice(i, i + n).map((b) => b.text.slice(0, k));
          if (heads.every((h) => h === heads[0] && h.length === k)) {
            push(rule, paras[i + n - 1].line, `连续 ${n} 段以「${heads[0]}」开头`, heads.join(' | '));
          }
        }
        break;
      }
      case 'paragraph_length_uniform': {
        const n = p.consecutive ?? 4;
        const ratio = p.spreadRatio ?? 0.15;
        for (let i = 0; i + n - 1 < paras.length; i += 1) {
          const win = paras.slice(i, i + n).map((b) => chars(b.text));
          const total = win.reduce((a, b) => a + b, 0);
          const max = Math.max(...win);
          const min = Math.min(...win);
          if (total >= (p.minChars ?? 120) && max > 0 && (max - min) / max <= ratio) {
            push(rule, paras[i].line, `连续 ${n} 段长度误差 <${Math.round(ratio * 100)}%`, win.join('/'));
          }
        }
        break;
      }
      case 'ending_restates_opening': {
        if (paras.length < 2) break;
        const first = paras[0];
        const last = paras[paras.length - 1];
        const need: string[] = p.requireWords ?? [];
        if (!need.some((w) => last.text.includes(w))) break;
        const score = jaccard(bigrams(first.text, p.ngram ?? 3), bigrams(last.text, p.ngram ?? 3));
        if (score >= (p.jaccard ?? 0.35)) {
          push(rule, last.line, `末段与首段三字重合率 ${(score * 100).toFixed(0)}%`, last.text.slice(0, 40));
        }
        break;
      }
      case 'heading_density': {
        const per = p.perChars ?? 150;
        if (bodyChars < per) break;
        const density = headings.length / (bodyChars / per);
        if (density > 1) push(rule, 1, `每 ${per} 字 ${density.toFixed(1)} 个标题`, `${headings.length} 个标题 / ${bodyChars} 字`);
        break;
      }
      case 'number_without_source': {
        const re = new RegExp(p.numberPattern as string, 'g');
        const markers: string[] = p.sourceMarkers ?? [];
        for (const b of paras) {
          const m = re.exec(b.text);
          re.lastIndex = 0;
          if (!m) continue;
          if (markers.some((k) => b.text.includes(k))) continue;
          push(rule, b.line, `数字没有出处：${m[0].trim()}`, b.text.slice(0, 50));
        }
        break;
      }
      case 'absolute_claim': {
        const words: string[] = p.words ?? [];
        for (const b of paras) {
          const hit = words.filter((w) => b.text.includes(w));
          if (hit.length) push(rule, b.line, `绝对化断言：${hit.join(' ')}`, b.text.slice(0, 50));
        }
        break;
      }
      case 'slogan_pattern': {
        const patterns = (p.patterns ?? []).map((s: string) => new RegExp(s));
        for (const b of paras) {
          for (const seg of b.text.split(/[。！？!?；;]/)) {
            const s = seg.trim();
            if (!s) continue;
            const hit = patterns.find((re) => re.test(s));
            if (hit) push(rule, b.line, '套话句式', s.slice(0, 50));
          }
        }
        break;
      }
      case 'emoji_or_bang': {
        // 同一个 emoji 反复出现 = 当列表标记用，降级为 info，不按装饰处理
        const tally = new Map<string, number>();
        for (const b of blocks) {
          for (const m of b.text.matchAll(new RegExp(EMOJI, 'gu'))) {
            tally.set(m[0], (tally.get(m[0]) ?? 0) + 1);
          }
        }
        for (const b of blocks) {
          const emoji = b.text.match(EMOJI);
          if (emoji) {
            const repeated = (tally.get(emoji[0]) ?? 0) >= 3;
            findings.push({
              ruleId: rule.id,
              severity: repeated ? 'info' : rule.severity,
              file: opts.file ?? '<stdin>',
              line: b.line,
              message: repeated ? `emoji 作为重复标记：${emoji[0]}` : `正文含 emoji：${emoji[0]}`,
              evidence: b.text.slice(0, 40),
              fix: repeated ? '同一符号重复出现在清单里，说明它是结构性标记，不是装饰。要留就留，别再往里加表情。' : rule.fix,
              source: rule.source,
              autofix: rule.autofix,
            });
          }
          const bang = /[!！]{3,}/.exec(b.text);
          if (bang) push(rule, b.line, '连续感叹号', bang[0]);
        }
        break;
      }
      default:
        break;
    }
  }

  const seen = new Set<string>();
  return findings
    .filter((f) => {
      const k = `${f.ruleId}:${f.line}:${f.evidence.slice(0, 20)}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
}
