// 浏览器版 deai 引擎：和 CLI 同一套谓词，去掉 Node 依赖。
// 规则从 JSON 导入，报告结构与 CLI 一致。
import textRulesJson from './text-rules.json';
import uiRulesJson from './ui-rules.json';

const textRules = textRulesJson.rules;
const uiRules = uiRulesJson.rules;

const chars = (s) => [...s].length;

export function stripInline(text) {
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

export function parseMarkdown(raw) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  let fence = false;
  let buffer = [];
  let bufLine = 0;

  const flush = () => {
    if (!buffer.length) return;
    const text = stripInline(buffer.join(' '));
    if (text) blocks.push({ text, line: bufLine, fromList: false });
    buffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const at = i + 1;
    if (/^\s*```/.test(line)) { flush(); fence = !fence; continue; }
    if (fence) continue;
    if (i === 0 && line.trim() === '---') {
      const end = lines.findIndex((l, j) => j > 0 && l.trim() === '---');
      if (end > 0) { i = end; continue; }
    }
    if (!line.trim()) { flush(); continue; }
    if (/^\s*>/.test(line)) { flush(); continue; }
    if (/^\s*\|/.test(line)) { flush(); continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) { flush(); const t = stripInline(h[2]); if (t) headings.push({ text: t, line: at }); continue; }
    const li = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/.exec(line);
    if (li) { flush(); const t = stripInline(li[1]); if (t) blocks.push({ text: t, line: at, fromList: true }); continue; }
    if (!buffer.length) bufLine = at;
    buffer.push(line);
  }
  flush();
  return { blocks, headings, bodyChars: blocks.reduce((n, b) => n + b.text.length, 0) };
}

function countWords(text, words) {
  const hit = [];
  let total = 0;
  for (const w of words) {
    let idx = text.indexOf(w);
    let n = 0;
    while (idx !== -1) { n += 1; idx = text.indexOf(w, idx + w.length); }
    if (n) { total += n; hit.push(`${w}×${n}`); }
  }
  return { total, hit };
}

function trigrams(text, n = 3) {
  const t = text.replace(/\s+/g, '');
  const out = new Set();
  for (let i = 0; i + n <= t.length; i += 1) out.add(t.slice(i, i + n));
  return out;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
}

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;

export function checkText(raw, { strict = false } = {}) {
  const rules = textRules.filter((r) => (strict ? true : r.defaultOn));
  const { blocks, headings, bodyChars } = parseMarkdown(raw);
  const paras = blocks.filter((b) => !b.fromList);
  const findings = [];
  const push = (rule, line, message, evidence) =>
    findings.push({ ruleId: rule.id, severity: rule.severity, line, message, evidence: String(evidence).slice(0, 120), fix: rule.fix, fixEn: rule.fix_en, source: rule.source });

  for (const rule of rules) {
    const p = rule.predicate;
    if (p.type === 'first_word_stack') {
      const atClause = (t, w) => (t.match(new RegExp(`(^|[。，；、！？\\s])${w}`, 'g')) ?? []).length;
      let docHits = 0;
      for (const b of paras) {
        let n = 0;
        const hit = [];
        for (const w of p.words) {
          const c = atClause(b.text, w);
          if (c) { n += c; hit.push(`${w}×${c}`); }
        }
        if (n) docHits += 1;
        if (n >= (p.perParagraphMin ?? 2)) push(rule, b.line, `同一段堆了 ${n} 个引导词`, hit.join(' '));
      }
      if (docHits >= (p.documentMin ?? 3)) push(rule, 1, `全文 ${docHits} 段带引导词`, `paragraphs=${docHits}`);
    } else if (p.type === 'lexicon_density') {
      let total = 0;
      for (const b of paras) {
        const { total: n, hit } = countWords(b.text, p.words);
        total += n;
        if (n >= (p.perParagraphMin ?? 2)) push(rule, b.line, `单段空话词 ${n} 处`, hit.join(' '));
      }
      const density = total / Math.max(1, bodyChars / (p.perChars ?? 300));
      if (bodyChars >= (p.minBodyChars ?? 300) && density >= (p.densityMin ?? 1)) {
        push(rule, 1, `全文空话词密度 ${density.toFixed(2)}/300字`, `count=${total}`);
      }
    } else if (p.type === 'paragraph_head_same') {
      const n = p.consecutive ?? 3;
      const k = p.prefixChars ?? 2;
      for (let i = 0; i + n - 1 < paras.length; i += 1) {
        const heads = paras.slice(i, i + n).map((b) => b.text.slice(0, k));
        if (heads.every((h) => h === heads[0] && h.length === k)) push(rule, paras[i + n - 1].line, `连续 ${n} 段以「${heads[0]}」开头`, heads.join(' | '));
      }
    } else if (p.type === 'paragraph_length_uniform') {
      const n = p.consecutive ?? 4;
      for (let i = 0; i + n - 1 < paras.length; i += 1) {
        const win = paras.slice(i, i + n).map((b) => chars(b.text));
        const total = win.reduce((a, b) => a + b, 0);
        const max = Math.max(...win);
        const min = Math.min(...win);
        if (total >= (p.minChars ?? 120) && max > 0 && (max - min) / max <= (p.spreadRatio ?? 0.15)) {
          push(rule, paras[i].line, `连续 ${n} 段长度误差 <${Math.round((p.spreadRatio ?? 0.15) * 100)}%`, win.join('/'));
        }
      }
    } else if (p.type === 'ending_restates_opening') {
      if (paras.length >= 2) {
        const first = paras[0];
        const last = paras[paras.length - 1];
        if ((p.requireWords ?? []).some((w) => last.text.includes(w))) {
          const score = jaccard(trigrams(first.text, p.ngram ?? 3), trigrams(last.text, p.ngram ?? 3));
          if (score >= (p.jaccard ?? 0.35)) push(rule, last.line, `末段与首段三字重合率 ${(score * 100).toFixed(0)}%`, last.text.slice(0, 40));
        }
      }
    } else if (p.type === 'heading_density') {
      const per = p.perChars ?? 150;
      if (bodyChars >= per) {
        const density = headings.length / (bodyChars / per);
        if (density > 1) push(rule, 1, `每 ${per} 字 ${density.toFixed(1)} 个标题`, `${headings.length} 个标题 / ${bodyChars} 字`);
      }
    } else if (p.type === 'number_without_source') {
      const re = new RegExp(p.numberPattern, 'g');
      for (const b of paras) {
        const m = re.exec(b.text);
        re.lastIndex = 0;
        if (!m) continue;
        if ((p.sourceMarkers ?? []).some((k) => b.text.includes(k))) continue;
        push(rule, b.line, `数字没有出处：${m[0].trim()}`, b.text.slice(0, 50));
      }
    } else if (p.type === 'absolute_claim') {
      for (const b of paras) {
        const hit = (p.words ?? []).filter((w) => b.text.includes(w));
        if (hit.length) push(rule, b.line, `绝对化断言：${hit.join(' ')}`, b.text.slice(0, 50));
      }
    } else if (p.type === 'slogan_pattern') {
      const res = (p.patterns ?? []).map((s) => new RegExp(s));
      for (const b of paras) {
        for (const seg of b.text.split(/[。！？!?；;]/)) {
          const s = seg.trim();
          if (s && res.some((re) => re.test(s))) { push(rule, b.line, '套话句式', s.slice(0, 50)); break; }
        }
      }
    } else if (p.type === 'emoji_or_bang') {
      const tally = new Map();
      for (const b of blocks) for (const m of b.text.matchAll(new RegExp(EMOJI, 'gu'))) tally.set(m[0], (tally.get(m[0]) ?? 0) + 1);
      for (const b of blocks) {
        const emoji = b.text.match(EMOJI);
        if (emoji) {
          const repeated = (tally.get(emoji[0]) ?? 0) >= 3;
          push(rule, b.line, repeated ? `emoji 作为重复标记：${emoji[0]}` : `正文含 emoji：${emoji[0]}`, b.text.slice(0, 40));
          if (repeated) findings[findings.length - 1].severity = 'info';
        }
        const bang = /[!！]{3,}/.exec(b.text);
        if (bang) push(rule, b.line, '连续感叹号', bang[0]);
      }
    }
  }

  return findings.sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
}

// ---------------- UI ----------------
const UI_EXTS = ['.html', '.htm', '.css', '.astro', '.tsx', '.jsx', '.vue', '.svg'];
const pxNumbers = (v) => (v.match(/(\d+(?:\.\d+)?)px/g) ?? []).map(parseFloat);
const NEUTRAL = /^(#([0-9a-f])\2\2|#000|#fff|#000000|#ffffff|#111|#222|#333)$/i;

function rgbOf(token) {
  const hex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(token.trim());
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }
  const rgb = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(token);
  return rgb ? [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255] : null;
}

function hueSat(token) {
  const c = rgbOf(token);
  if (!c) return null;
  const [r, g, b] = c;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  return { h, s };
}

const colorsIn = (v) => [...(v.match(/#[0-9a-f]{3,8}\b/gi) ?? []), ...(v.match(/rgba?\([^)]*\)/gi) ?? [])];
const lineOf = (src, i) => src.slice(0, i).split('\n').length;

export function checkUi(src, { strict = false, name = 'input' } = {}) {
  const rules = uiRules.filter((r) => (strict ? true : r.defaultOn));
  const isCss = /\.css$/i.test(name);
  const findings = [];
  const push = (rule, line, message, evidence) =>
    findings.push({ ruleId: rule.id, severity: rule.severity, line, message, evidence: String(evidence).trim().slice(0, 120), fix: rule.fix, fixEn: rule.fix_en, source: rule.source });

  for (const rule of rules) {
    const p = rule.predicate;
    if (p.type === 'gradient_hue') {
      for (const m of src.matchAll(/linear-gradient\(([^;]{0,300}?)\)/g)) {
        const stops = colorsIn(m[1])
          .map(hueSat)
          .filter((x) => x && x.s >= (p.minSaturation ?? 0.35) && x.h >= (p.hueMin ?? 190) && x.h <= (p.hueMax ?? 320));
        if (stops.length >= (p.minStops ?? 2)) push(rule, lineOf(src, m.index ?? 0), `紫蓝渐变：${stops.length} 个冷色停靠点`, m[0]);
      }
    } else if (p.type === 'gradient_text') {
      for (const m of src.matchAll(/(?:-webkit-)?background-clip\s*:\s*text/gi)) push(rule, lineOf(src, m.index ?? 0), '渐变文字（background-clip: text）', m[0]);
    } else if (p.type === 'backdrop_blur') {
      for (const m of src.matchAll(/backdrop-filter\s*:\s*[^;}]*blur\(/gi)) push(rule, lineOf(src, m.index ?? 0), '玻璃拟态（backdrop-filter: blur）', m[0]);
    } else if (p.type === 'shadow_glow') {
      for (const m of src.matchAll(/box-shadow\s*:\s*([^;}]+)/gi)) {
        const before = m[1].split(/rgba?\(|#[0-9a-f]/i)[0];
        const nums = (before.match(/-?\d+(?:\.\d+)?(?:px)?/g) ?? []).map((n) => Math.abs(parseFloat(n)));
        const blur = nums.length >= 3 ? nums[2] : 0;
        if (blur < (p.minBlurPx ?? 24)) continue;
        const colour = colorsIn(m[1]).find((c) => {
          if (NEUTRAL.test(c)) return false;
          const hs = hueSat(c);
          return hs ? hs.s >= (p.minSaturation ?? 0.35) : false;
        });
        if (colour) push(rule, lineOf(src, m.index ?? 0), `彩色大模糊阴影（blur ${blur}px）`, m[0]);
      }
    } else if (p.type === 'emoji_in_control') {
      for (const m of src.matchAll(/<(button|a)\b[^>]*>([^<]{0,80})<\//gi)) {
        if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(m[2])) push(rule, lineOf(src, m.index ?? 0), `控件里用 emoji 当图标：${m[2].trim().slice(0, 20)}`, m[0]);
      }
    } else if (p.type === 'magic_spacing') {
      const re = new RegExp(`(${(p.props ?? []).join('|')})\\s*:\\s*([^;}]+)`, 'gi');
      for (const m of src.matchAll(re)) {
        const off = pxNumbers(m[2]).filter((n) => n !== 0 && n !== 1 && n % (p.grid ?? 4) !== 0);
        if (off.length) push(rule, lineOf(src, m.index ?? 0), `间距 ${off.join('/')}px 不在 ${p.grid ?? 4}px 栅格`, m[0]);
      }
    } else if (p.type === 'fake_data') {
      for (const raw of p.patterns ?? []) {
        const re = new RegExp(raw, 'gi');
        for (const m of src.matchAll(re)) push(rule, lineOf(src, m.index ?? 0), `占位/假数据：${m[0]}`, m[0]);
      }
    }
  }
  return findings.sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
}

export const meta = {
  text: textRules.map((r) => ({ id: r.id, title: r.title, titleEn: r.title_en, severity: r.severity, source: r.source, defaultOn: r.defaultOn })),
  ui: uiRules.map((r) => ({ id: r.id, title: r.title, titleEn: r.title_en, severity: r.severity, source: r.source, defaultOn: r.defaultOn })),
  uiExts: UI_EXTS,
};
