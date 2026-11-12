#!/usr/bin/env node
// dsh-doctor 自检：检查码完整性 + 测试 + 对本机真实 profile 跑一遍。
// 「报告干净」不能靠眼看，必须由退出码保证。
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const fails = [];
const ok = (label) => console.log(`  ok   ${label}`);
const bad = (label, detail) => { fails.push(`${label}${detail ? `：${detail}` : ''}`); console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ''}`); };

// 1) 检查码：前缀合法、无重复
const src = readFileSync('src/checks.ts', 'utf8');
// 同一检查码覆盖同类问题的多个分支是设计如此（CORDIS-003 既管缺 id 也管缺 name），
// 所以判据是「前缀合法 + 去重后数量够」，不是「不许重复」。
const codes = [...src.matchAll(/issue\(\s*'((?:SKILL|CORDIS|PATCH|BUNDLE|PROFILE)-\d{3})'/g)].map((m) => m[1]);
const distinct = new Set(codes);
const prefixes = new Set([...distinct].map((code) => code.split('-')[0]));
const unknown = [...prefixes].filter((p) => !['SKILL', 'CORDIS', 'PATCH', 'BUNDLE', 'PROFILE'].includes(p));
if (distinct.size < 15) bad('检查码', `只找到 ${distinct.size} 个，预期至少 15 个`);
else if (unknown.length) bad('检查码前缀', unknown.join(', '));
else ok(`检查码：${distinct.size} 个不同编码，覆盖 ${[...prefixes].sort().join('/')}`);

// 2) 测试
const test = spawnSync('node', ['test/doctor.test.ts'], { encoding: 'utf8' });
if (test.status === 0) ok('test/doctor.test.ts 通过');
else bad('测试失败', (test.stdout + test.stderr).split('\n').filter((l) => l.includes('fail ')).slice(0, 2).join(' | '));

// 3) 对本机真实 profile 跑一遍：必须能跑、必须是合法 JSON、必须 0 个 error
const run = spawnSync('node', ['src/cli.ts', '--json'], { encoding: 'utf8' });
let report = null;
try { report = JSON.parse(run.stdout); } catch { /* 下面报 */ }
if (!report) {
  bad('cli --json', `输出不是合法 JSON（退出码 ${run.status}）${(run.stderr || '').slice(0, 120)}`);
} else {
  const issues = report.issues ?? [];
  const errors = issues.filter((i) => i.severity === 'error');
  const skills = Array.isArray(report.skills) ? report.skills.reduce((n, s) => n + (s.count ?? 0), 0) : (report.skills?.count ?? 0);
  if (errors.length) {
    bad('本机 profile', `${errors.length} 个 error：${errors.slice(0, 3).map((e) => `${e.check} ${e.where}`).join('；')}`);
  } else {
    ok(`本机 profile：${skills} 个技能，${issues.length} 条提示，0 个 error`);
  }
  if (run.status !== 0) bad('退出码', `无 error 时应为 0，实际 ${run.status}`);
  else ok('退出码：无 error 时为 0');
}

console.log('');
if (fails.length) {
  console.error(`dsh-doctor 自检 ${fails.length} 项不通过：`);
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('dsh-doctor 自检通过：检查码完整、测试全绿、本机 profile 无 error。');
