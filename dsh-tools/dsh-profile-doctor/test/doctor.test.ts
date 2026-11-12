// 校验器验收：node test/doctor.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkSkillsDir, validateComposition, validatePatch } from '../src/checks.ts';

const codes = (issues: { code: string }[]) => issues.map((i) => i.code).sort();
const ids = (...xs: string[]) => new Set(xs);

// ---------------- patch 层 ----------------
test('合法 patch 不报', () => {
  const yml = `- insert:\n    - id: rea-mcp\n      name: "@deepseek-ai/dsh-mcp-client"\n      config:\n        serverName: rea\n`;
  assert.deepEqual(codes(validatePatch(yml, 'p', ids('other'))), []);
});

test('YAML 写坏：报解析失败', () => {
  assert.deepEqual(codes(validatePatch('a:\n  - b\n c: d', 'p', ids())), ['YAML-001']);
});

test('顶层不是数组', () => {
  assert.deepEqual(codes(validatePatch('insert: []', 'p', ids())), ['PATCH-001']);
});

test('条目没有可识别操作键', () => {
  assert.deepEqual(codes(validatePatch('- id: x\n  config: {}\n', 'p', ids())), ['PATCH-003']);
});

test('insert 缺 id / 缺 name', () => {
  assert.deepEqual(codes(validatePatch('- insert:\n    - name: pkg\n', 'p', ids())), ['PATCH-005']);
  assert.deepEqual(codes(validatePatch('- insert:\n    - id: x\n', 'p', ids())), ['PATCH-007']);
});

test('同一 patch 重复插入 id', () => {
  const yml = '- insert:\n    - id: a\n      name: p1\n    - id: a\n      name: p2\n';
  assert.deepEqual(codes(validatePatch(yml, 'p', ids())), ['PATCH-010']);
});

test('插入 id 与已有插件冲突', () => {
  assert.deepEqual(codes(validatePatch('- insert:\n    - id: dup\n      name: p\n', 'p', ids('dup'))), ['PATCH-006']);
});

test('override 目标不存在：静默失效要警告', () => {
  const issues = validatePatch('- override:\n    id: nope\n', 'p', ids('real'));
  assert.deepEqual(codes(issues), ['PATCH-009']);
  assert.equal(issues[0].severity, 'warn');
});

test('已知 id 为空时不做目标校验（避免全量误报）', () => {
  assert.deepEqual(codes(validatePatch('- override:\n    id: nope\n', 'p', ids())), []);
});

test('!!js 表达式不算解析错误', () => {
  const yml = '- override:\n    id: a\n    config:\n      port: !!js Number(process.env.PORT)\n';
  assert.deepEqual(codes(validatePatch(yml, 'p', ids('a'))), []);
});

// ---------------- composition ----------------
test('cordis.yml 顶层不是数组', () => {
  assert.deepEqual(codes(validateComposition('a: 1', 'c').issues), ['CORDIS-001']);
});

test('条目缺 id / 缺 name', () => {
  assert.deepEqual(codes(validateComposition('- {}\n', 'c').issues), ['CORDIS-003', 'CORDIS-003']);
});

test('id 重复', () => {
  assert.deepEqual(codes(validateComposition('- id: a\n  name: p\n- id: a\n  name: q\n', 'c').issues), ['CORDIS-004']);
});

// ---------------- skills ----------------
test('skills 目录：断链 / 缺 SKILL.md / frontmatter 坏 / 正常', () => {
  const root = mkdtempSync(join(tmpdir(), 'doctor-skills-'));
  const good = join(root, 'good-skill');
  mkdirSync(good);
  writeFileSync(join(good, 'SKILL.md'), '---\nname: good-skill\ndescription: does things\n---\n\nbody\n');

  const noMd = join(root, 'no-md');
  mkdirSync(noMd);

  const badFm = join(root, 'bad-fm');
  mkdirSync(badFm);
  writeFileSync(join(badFm, 'SKILL.md'), '---\nname: bad-fm\ndescription: [unclosed\n---\n');

  let linked = false;
  try {
    symlinkSync(join(root, 'does-not-exist'), join(root, 'dangling'), 'junction');
    linked = true;
  } catch {
    linked = false;
  }

  const { issues } = checkSkillsDir(root, 't');
  const got = codes(issues);
  assert.ok(got.includes('SKILL-003'), '缺 SKILL.md 要报');
  assert.ok(got.includes('SKILL-004'), 'frontmatter 坏要报');
  if (linked) assert.ok(got.includes('SKILL-001'), '断链要报');
  assert.equal(got.filter((c) => c.startsWith('SKILL-00') && c !== 'SKILL-003' && c !== 'SKILL-004' && c !== 'SKILL-001').length, 0, '正常技能不该报错');
});
