#!/usr/bin/env node
// deai 本地面板：问题清单 + 原文对照。只监听 127.0.0.1，只读 --root 之下的文件。
// 用法：node src/serve.ts [--port 4319] [--root <目录>]
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { loadRules, runRules, type Finding } from './core.ts';
import { loadUiRules, runUiRules } from './ui.ts';

const TEXT_EXTS = new Set(['.md', '.txt']);
const UI_EXTS = new Set(['.html', '.htm', '.css', '.astro', '.tsx', '.jsx', '.vue', '.svg']);

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const ROOT = resolve(arg('root', process.cwd()));
const PORT = Number(arg('port', '4319'));
const textRules = loadRules('text');
const uiRules = loadUiRules();

function safePath(rel: string): string {
  const full = resolve(ROOT, rel);
  if (full !== ROOT && !full.startsWith(ROOT + sep)) throw new Error('路径越界');
  return full;
}

function collect(target: string, exts: Set<string>): string[] {
  const st = statSync(target);
  if (st.isFile()) return [target];
  const out: string[] = [];
  for (const name of readdirSync(target, { recursive: true }) as string[]) {
    const full = join(target, name);
    if (!exts.has(extname(full).toLowerCase())) continue;
    try {
      if (statSync(full).isFile()) out.push(full);
    } catch {
      /* 断链跳过 */
    }
  }
  return out;
}

function scan(kind: string, rel: string): { files: string[]; findings: Finding[]; counts: Record<string, number> } {
  const target = safePath(rel);
  const files = collect(target, kind === 'ui' ? UI_EXTS : TEXT_EXTS);
  const findings: Finding[] = [];
  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    const shown = relative(ROOT, file).replaceAll(sep, '/');
    const got = kind === 'ui' ? runUiRules(shown, raw, { rules: uiRules }) : runRules(raw, { file: shown, rules: textRules });
    findings.push(...got);
  }
  findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
  const counts = { error: 0, warn: 0, info: 0 } as Record<string, number>;
  for (const f of findings) counts[f.severity] += 1;
  return { files: files.map((f) => relative(ROOT, f).replaceAll(sep, '/')), findings, counts };
}

const PAGE = `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>deai · 本地面板</title>
<style>
  :root {
    --bg:      oklch(98% 0.005 250);
    --surface: oklch(100% 0 0);
    --fg:      oklch(22% 0.02 240);
    --muted:   oklch(50% 0.018 240);
    --border:  oklch(90% 0.008 240);
    --accent:  oklch(58% 0.16 145);
    --warn:    oklch(62% 0.14 75);
    --danger:  oklch(58% 0.19 25);
    --font-display: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif;
    --font-body:    -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif;
    --font-mono:    'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--font-body); font-size: 14px; }
  header { background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 20px; display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; }
  header strong { font-size: 15px; }
  header code { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
  .bar { display: flex; gap: 8px; padding: 12px 20px; border-bottom: 1px solid var(--border); background: var(--surface); flex-wrap: wrap; align-items: center; }
  input[type=text] { flex: 1 1 320px; font-family: var(--font-mono); font-size: 13px; padding: 7px 10px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg); color: var(--fg); }
  button { font-family: var(--font-body); font-size: 13px; padding: 7px 14px; border: 1px solid var(--border); border-radius: 4px; background: var(--surface); color: var(--fg); cursor: pointer; }
  button:hover { border-color: var(--accent); }
  button.on { border-color: var(--accent); box-shadow: inset 0 -2px 0 var(--accent); }
  main { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: 0; height: calc(100vh - 104px); }
  .list { overflow: auto; border-right: 1px solid var(--border); }
  .src { overflow: auto; background: var(--surface); }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; font-weight: 500; color: var(--muted); font-size: 12px; padding: 8px 12px; border-bottom: 1px solid var(--border); background: var(--surface); position: sticky; top: 0; }
  td { padding: 7px 12px; border-bottom: 1px solid var(--border); vertical-align: top; }
  tr.row { cursor: pointer; }
  tr.row:hover td { background: var(--surface); }
  tr.row.sel td { background: var(--surface); box-shadow: inset 2px 0 0 var(--accent); }
  .mono { font-family: var(--font-mono); font-size: 12px; }
  .mut { color: var(--muted); }
  .pill { display: inline-block; padding: 1px 7px; border-radius: 999px; font-size: 11px; font-family: var(--font-mono); border: 1px solid var(--border); }
  .pill.error { color: var(--danger); border-color: color-mix(in oklch, var(--danger) 40%, var(--border)); }
  .pill.warn { color: var(--warn); border-color: color-mix(in oklch, var(--warn) 40%, var(--border)); }
  .pill.info { color: var(--muted); }
  .kpis { display: flex; gap: 18px; font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
  .kpis b { color: var(--fg); font-weight: 600; }
  pre { margin: 0; padding: 12px 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.65; white-space: pre; overflow-x: auto; }
  pre .ln { display: inline-block; width: 40px; color: var(--muted); user-select: none; }
  pre .hit { background: color-mix(in oklch, var(--warn) 18%, transparent); display: block; }
  .empty { padding: 24px 20px; color: var(--muted); }
  @media (max-width: 860px) { main { grid-template-columns: 1fr; height: auto; } .list { border-right: none; border-bottom: 1px solid var(--border); max-height: 50vh; } }
</style></head>
<body>
<header>
  <strong>deai</strong>
  <span class="mut">确定性预检 · 问题清单与原文对照</span>
  <code id="root"></code>
</header>
<div class="bar">
  <input id="path" type="text" spellcheck="false" placeholder="相对路径，例如 ../dsh-toolbox/src 或 ../dsh-sync-hub/PRD.md" />
  <button id="kindText" class="on">文本</button>
  <button id="kindUi">界面</button>
  <button id="go">扫描</button>
  <span class="kpis" id="kpis"></span>
</div>
<main>
  <div class="list"><table><thead><tr><th style="width:64px">级别</th><th style="width:84px">规则</th><th style="width:150px">位置</th><th>说明</th></tr></thead><tbody id="rows"><tr><td colspan="4" class="empty">输入路径后点扫描。</td></tr></tbody></table></div>
  <div class="src"><pre id="src" class="empty">选一条问题看原文。</pre></div>
</main>
<script>
  let kind = 'text';
  let current = [];
  const $ = (id) => document.getElementById(id);

  $('root').textContent = 'root: __ROOT__';

  for (const [id, k] of [['kindText', 'text'], ['kindUi', 'ui']]) {
    $(id).addEventListener('click', () => {
      kind = k;
      $('kindText').classList.toggle('on', k === 'text');
      $('kindUi').classList.toggle('on', k === 'ui');
    });
  }

  async function scan() {
    const path = $('path').value.trim();
    if (!path) return;
    $('rows').innerHTML = '<tr><td colspan="4" class="empty">扫描中…</td></tr>';
    const res = await fetch('/api/scan?kind=' + kind + '&path=' + encodeURIComponent(path));
    const data = await res.json();
    if (data.error) { $('rows').innerHTML = '<tr><td colspan="4" class="empty">' + data.error + '</td></tr>'; return; }
    current = data.findings;
    $('kpis').innerHTML = '文件 <b>' + data.files.length + '</b> · 命中 <b>' + data.findings.length + '</b> · 必改 <b>' + data.counts.error + '</b> · 建议 <b>' + data.counts.warn + '</b> · 参考 <b>' + data.counts.info + '</b>';
    if (!data.findings.length) { $('rows').innerHTML = '<tr><td colspan="4" class="empty">没有命中。这只说明机械标记没出现，不说明写得好。</td></tr>'; return; }
    $('rows').innerHTML = data.findings.map((f, i) =>
      '<tr class="row" data-i="' + i + '"><td><span class="pill ' + f.severity + '">' + f.severity + '</span></td>' +
      '<td class="mono">' + f.ruleId + '</td>' +
      '<td class="mono mut">' + f.file + ':' + f.line + '</td>' +
      '<td>' + f.message + '</td></tr>'
    ).join('');
    for (const tr of document.querySelectorAll('tr.row')) {
      tr.addEventListener('click', () => show(Number(tr.dataset.i), tr));
    }
  }

  async function show(i, tr) {
    for (const el of document.querySelectorAll('tr.row')) el.classList.remove('sel');
    tr.classList.add('sel');
    const f = current[i];
    const res = await fetch('/api/source?path=' + encodeURIComponent(f.file) + '&line=' + f.line);
    const data = await res.json();
    if (data.error) { $('src').textContent = data.error; return; }
    $('src').innerHTML = data.lines.map((l) =>
      '<span class="' + (l.hit ? 'hit' : '') + '"><span class="ln">' + l.n + '</span>' + l.text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])) + '</span>'
    ).join('');
  }

  $('go').addEventListener('click', scan);
  $('path').addEventListener('keydown', (e) => { if (e.key === 'Enter') scan(); });

  // 支持 /?path=...&kind=text&select=1，方便直接分享一次扫描
  const q = new URLSearchParams(location.search);
  if (q.get('kind') === 'ui') $('kindUi').click();
  if (q.get('path')) {
    $('path').value = q.get('path');
    scan().then(() => {
      if (q.get('select')) {
        const first = document.querySelector('tr.row');
        if (first) first.click();
      }
    });
  }
</script>
</body></html>`;

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`);
  const json = (code: number, body: unknown) => {
    res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
  };

  try {
    if (url.pathname === '/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(PAGE.replace('__ROOT__', ROOT.replaceAll('\\', '/').replace(/</g, '&lt;')));
      return;
    }

    if (url.pathname === '/api/scan') {
      const kind = url.searchParams.get('kind') === 'ui' ? 'ui' : 'text';
      const path = url.searchParams.get('path') ?? '.';
      json(200, scan(kind, path));
      return;
    }

    if (url.pathname === '/api/source') {
      const rel = url.searchParams.get('path') ?? '';
      const line = Number(url.searchParams.get('line') ?? '1');
      const full = safePath(rel);
      const all = readFileSync(full, 'utf8').split('\n');
      const from = Math.max(1, line - 3);
      const to = Math.min(all.length, line + 3);
      const lines = [];
      for (let n = from; n <= to; n += 1) lines.push({ n, text: all[n - 1] ?? '', hit: n === line });
      json(200, { path: rel, lines });
      return;
    }

    json(404, { error: `没有这个路由：${url.pathname}` });
  } catch (err) {
    json(400, { error: (err as Error).message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`deai 面板: http://127.0.0.1:${PORT}/\nroot: ${ROOT}\n`);
  process.stdout.write(`样例：node src/serve.ts --root "C:/Knowledge base/02-Project" --port ${PORT}\n`);
});
