// UI 层扫描：HTML/CSS 里的机械 slop。不解析 DOM，只按声明和标签做可复现判定。
import { readFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Finding, Rule } from './core.ts';

const HERE = dirname(fileURLToPath(import.meta.url));

export function loadUiRules(): Rule[] {
  const parsed = JSON.parse(readFileSync(resolve(HERE, '..', 'rules', 'ui.json'), 'utf8'));
  return parsed.rules as Rule[];
}

export interface GridChange {
  prop: string;
  from: number;
  to: number;
}

/**
 * 只做一件事：把 padding / margin / gap 里的 px 值向上取整到 4 的倍数。
 * 1px 描边和 0 不动。改的是数值，不动其它任何字符。
 */
export function snapSpacingToGrid(src: string, grid = 4): { text: string; changes: GridChange[] } {
  const props = ['padding', 'margin', 'gap', 'row-gap', 'column-gap', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
  const re = new RegExp(`(${props.join('|')})(\\s*:\\s*)([^;}]+)`, 'gi');
  const changes: GridChange[] = [];
  const text = src.replace(re, (whole, prop: string, sep: string, value: string) => {
    const next = value.replace(/(\d+(?:\.\d+)?)px/g, (raw, num: string) => {
      const n = parseFloat(num);
      if (n === 0 || n === 1 || n % grid === 0) return raw;
      const snapped = Math.ceil(n / grid) * grid;
      changes.push({ prop: prop.toLowerCase(), from: n, to: snapped });
      return `${snapped}px`;
    });
    return `${prop}${sep}${next}`;
  });
  return { text, changes };
}

const lineOf = (src: string, index: number) => src.slice(0, index).split('\n').length;

function rgbOf(token: string): [number, number, number] | null {
  const hex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(token.trim());
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }
  const rgb = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(token);
  if (rgb) return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];
  return null;
}

function hueSat(token: string): { h: number; s: number } | null {
  const c = rgbOf(token);
  if (!c) return null;
  const [r, g, b] = c;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = 60 * (((g - b) / d) % 6);
    else if (max === g) hue = 60 * ((b - r) / d + 2);
    else hue = 60 * ((r - g) / d + 4);
  }
  if (hue < 0) hue += 360;
  return { h: hue, s };
}

const colorsIn = (value: string): string[] => [
  ...(value.match(/#[0-9a-f]{3,8}\b/gi) ?? []),
  ...(value.match(/rgba?\([^)]*\)/gi) ?? []),
];

function pxNumbers(value: string): number[] {
  return (value.match(/(\d+(?:\.\d+)?)px/g) ?? []).map((x) => parseFloat(x));
}

const NEUTRAL = /^(#([0-9a-f])\2\2|#000|#fff|#000000|#ffffff|#111|#222|#333)$/i;

export interface UiScanOptions {
  strict?: boolean;
  rules?: Rule[];
}

export function runUiRules(file: string, src: string, opts: UiScanOptions = {}): Finding[] {
  const rules = (opts.rules ?? loadUiRules()).filter((r) => (opts.strict ? true : r.defaultOn));
  const ext = extname(file).toLowerCase();
  const isCss = ext === '.css';
  const findings: Finding[] = [];

  const push = (rule: Rule, line: number, message: string, evidence: string, severity = rule.severity) => {
    findings.push({
      ruleId: rule.id,
      severity,
      file,
      line,
      message,
      evidence: evidence.trim().slice(0, 120),
      fix: rule.fix,
      source: rule.source,
      autofix: rule.autofix,
    });
  };

  for (const rule of rules) {
    const p = rule.predicate as Record<string, any>;

    if (p.type === 'gradient_hue' && (isCss || /style=|linear-gradient/.test(src))) {
      for (const m of src.matchAll(/linear-gradient\(([^;]{0,300}?)\)/g)) {
        const stops = colorsIn(m[1])
          .map((c) => hueSat(c))
          .filter((x): x is { h: number; s: number } => Boolean(x))
          .filter((x) => x.s >= (p.minSaturation ?? 0.35) && x.h >= (p.hueMin ?? 190) && x.h <= (p.hueMax ?? 320));
        if (stops.length >= (p.minStops ?? 2)) {
          push(rule, lineOf(src, m.index ?? 0), `紫蓝渐变：${stops.length} 个冷色停靠点`, m[0]);
        }
      }
    }

    if (p.type === 'gradient_text') {
      for (const m of src.matchAll(/(?:-webkit-)?background-clip\s*:\s*text/gi)) {
        push(rule, lineOf(src, m.index ?? 0), '渐变文字（background-clip: text）', m[0]);
      }
    }

    if (p.type === 'backdrop_blur') {
      for (const m of src.matchAll(/backdrop-filter\s*:\s*[^;}]*blur\(/gi)) {
        push(rule, lineOf(src, m.index ?? 0), '玻璃拟态（backdrop-filter: blur）', m[0]);
      }
    }

    if (p.type === 'shadow_glow') {
      for (const m of src.matchAll(/box-shadow\s*:\s*([^;}]+)/gi)) {
        const value = m[1];
        // 颜色之前的四个长度：x y blur spread（0 可以不带单位）
        const beforeColour = value.split(/rgba?\(|#[0-9a-f]/i)[0];
        const nums = (beforeColour.match(/-?\d+(?:\.\d+)?(?:px)?/g) ?? []).map((n) => Math.abs(parseFloat(n)));
        const blur = nums.length >= 3 ? nums[2] : 0;
        if (blur < (p.minBlurPx ?? 24)) continue;
        const colour = colorsIn(value).find((c) => {
          if (NEUTRAL.test(c)) return false;
          const hs = hueSat(c);
          return hs ? hs.s >= (p.minSaturation ?? 0.35) : false;
        });
        if (colour) push(rule, lineOf(src, m.index ?? 0), `彩色大模糊阴影（blur ${blur}px）`, m[0]);
      }
    }

    if (p.type === 'emoji_in_control' && !isCss) {
      const re = /<(button|a)\b[^>]*>([^<]{0,80})<\//gi;
      for (const m of src.matchAll(re)) {
        const text = m[2];
        if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(text)) {
          push(rule, lineOf(src, m.index ?? 0), `控件里用 emoji 当图标：${text.trim().slice(0, 20)}`, m[0]);
        }
      }
    }

    if (p.type === 'magic_spacing') {
      const props: string[] = p.props ?? [];
      const grid = p.grid ?? 4;
      const re = new RegExp(`(${props.join('|')})\\s*:\\s*([^;}]+)`, 'gi');
      for (const m of src.matchAll(re)) {
        // 1px 是描边，不是间距
        const off = pxNumbers(m[2]).filter((n) => n !== 0 && n !== 1 && n % grid !== 0);
        if (off.length) push(rule, lineOf(src, m.index ?? 0), `间距 ${off.join('/')}px 不在 ${grid}px 栅格`, m[0]);
      }
    }

    if (p.type === 'fake_data') {
      const pats = (p.patterns ?? []).map((s: string) => new RegExp(s, 'i'));
      for (const re of pats) {
        for (const m of src.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) {
          push(rule, lineOf(src, m.index ?? 0), `占位/假数据：${m[0]}`, m[0]);
        }
      }
    }

    if (p.type === 'hero_three_cta' && !isCss) {
      const firstH2 = src.search(/<h2[\s>]/i);
      const head = firstH2 > 0 ? src.slice(0, firstH2) : src;
      const ctas = (head.match(/<(a|button)\b[^>]*class="[^"]*(btn|cta|button)/gi) ?? []).length;
      if (ctas >= (p.minCtas ?? 3)) push(rule, 1, `首屏 ${ctas} 个按钮`, `ctas=${ctas}`);
    }
  }

  return findings.sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
}
