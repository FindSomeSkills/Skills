#!/usr/bin/env node
// deai 自检：规则完整性 + 测试 + 真实输入的端到端输出。
// 目标是把「规则少了个字段，结果英文页显示中文」「扫描器对真文件崩了」挡在提交前。
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const fails = [];
const ok = (label) => console.log(`  ok   ${label}`);
const bad = (label, detail) => { fails.push(`${label}${detail ? `：${detail}` : ''}`); console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ''}`); };

// 1) 规则完整性：每条规则必须双语齐全，否则英文页会掉回中文
for (const layer of ['text', 'ui']) {
  const file = `rules/${layer}.json`;
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const ids = new Set();
  for (const rule of data.rules) {
    const problems = [];
    for (const field of ['id', 'title', 'title_en', 'severity', 'fix', 'fix_en', 'predicate']) {
      if (!rule[field]) problems.push(`缺 ${field}`);
    }
    if (!['error', 'warn', 'info'].includes(rule.severity)) problems.push(`severity 非法：${rule.severity}`);
    if (ids.has(rule.id)) problems.push('id 重复');
    ids.add(rule.id);
    if (problems.length) bad(`${layer}/${rule.id}`, problems.join('、'));
  }
  if (!data.rules.some((r) => r.defaultOn)) bad(`${layer}`, '没有任何默认开启的规则');
  else ok(`${layer}：${data.rules.length} 条规则，字段完整、id 唯一`);
}

// 2) 测试套件
for (const test of ['test/text.test.ts', 'test/ui.test.ts']) {
  const run = spawnSync('node', [test], { encoding: 'utf8' });
  if (run.status === 0) ok(`${test} 通过`);
  else bad(`${test} 失败`, (run.stdout + run.stderr).split('\n').filter((l) => l.includes('fail ') || l.includes('not ok')).slice(0, 2).join(' | '));
}

// 3) 端到端：拿一份已知有问题的文本，确认 CLI 真的报出来、退出码真的变
const dir = mkdtempSync(join(tmpdir(), 'deai-verify-'));
const sample = join(dir, 'bad.md');
writeFileSync(sample, [
  '首先梳理需求，其次拆任务，最后排期。',
  '',
  '通过赋能业务闭环，实现全方位助力，效率提升 45%。',
  '',
  '值得注意的是，这个方案不仅更快，而且更稳。',
].join('\n'));

const text = spawnSync('node', ['src/cli.ts', 'text', sample, '--json'], { encoding: 'utf8' });
let parsed = null;
try { parsed = JSON.parse(text.stdout); } catch { /* 下面统一报 */ }
if (!parsed) bad('cli text --json', '输出不是合法 JSON');
else if (!Array.isArray(parsed.findings) || parsed.findings.length === 0) bad('cli text 端到端', '已知有问题的文本零命中');
else ok(`cli text 端到端：命中 ${parsed.findings.length} 条，规则 ${[...new Set(parsed.findings.map((f) => f.ruleId))].join(',')}`);

// 4) UI 端到端：紫蓝渐变 + 卡片玻璃 + 跑偏间距，应各命中
const css = join(dir, 'bad.css');
writeFileSync(css, [
  '.hero { background: linear-gradient(135deg, #6d5efc, #2f8fff); padding: 14px; }',
  '.card { backdrop-filter: blur(20px); }',
  '.title { -webkit-background-clip: text; }',
].join('\n'));
const ui = spawnSync('node', ['src/cli.ts', 'ui', css, '--json'], { encoding: 'utf8' });
let uiParsed = null;
try { uiParsed = JSON.parse(ui.stdout); } catch { /* 下面统一报 */ }
if (!uiParsed) bad('cli ui --json', '输出不是合法 JSON');
else {
  const hits = new Set((uiParsed.findings ?? []).map((f) => f.ruleId));
  const want = ['UI-001', 'UI-002', 'UI-003', 'UI-006'];
  const missing = want.filter((id) => !hits.has(id));
  if (missing.length) bad('cli ui 端到端', `没抓到 ${missing.join(', ')}`);
  else ok(`cli ui 端到端：抓到 ${want.join(', ')}`);
}

// 5) 有 error 时退出码必须是 1，否则挂不了 CI
const strict = spawnSync('node', ['src/cli.ts', 'ui', css], { encoding: 'utf8' });
if (strict.status === 1) ok('退出码：有 error 时为 1');
else bad('退出码', `期望 1，实际 ${strict.status}`);

console.log('');
if (fails.length) {
  console.error(`deai 自检 ${fails.length} 项不通过：`);
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('deai 自检通过：规则完整、测试全绿、端到端输出符合预期。');
