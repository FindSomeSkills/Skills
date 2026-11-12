import test from 'node:test';
import assert from 'node:assert/strict';
import { auditSkills, estimateTokens, parseSkillFile } from '../src/lib/skill-audit.mjs';

const skill = (dir, name, description, body = 'x'.repeat(400)) =>
  `skills/${dir}/SKILL.md`;

const md = (name, description, body) => `---\nname: ${name}\ndescription: ${description}\n---\n\n${body}\n`;

test('token 估算：中文按字、英文按 4 字符', () => {
  assert.equal(estimateTokens(''), 0);
  assert.equal(estimateTokens('abcd'), 1);
  assert.equal(estimateTokens('中文测试'), 4);
  assert.equal(estimateTokens('中文 abcd'), 4); // 2 CJK + 5 ASCII 字符 → ceil(2 + 5/4)
});

test('frontmatter 解析：name/description 取出，正文单独计算', () => {
  const row = parseSkillFile(skill('alpha', 'alpha', 'Does a thing'), md('alpha', 'Does a thing', 'body text'));
  assert.equal(row.name, 'alpha');
  assert.equal(row.description, 'Does a thing');
  assert.equal(row.hasFrontmatter, true);
  assert.ok(row.bodyLength > 0);
});

test('没有 frontmatter：回落目录名，并标记', () => {
  const row = parseSkillFile('skills/beta/SKILL.md', 'plain markdown body');
  assert.equal(row.name, 'beta');
  assert.equal(row.hasFrontmatter, false);
  assert.equal(row.description, '');
});

test('审计：按体积降序、算出占比与汇总', () => {
  const files = [
    { path: skill('small', 'small', 'tiny'), text: md('small', 'tiny', 'y'.repeat(200)) },
    { path: skill('big', 'big', 'huge'), text: md('big', 'huge', 'y'.repeat(4000)) },
  ];
  const out = auditSkills(files);
  assert.equal(out.summary.skills, 2);
  assert.equal(out.rows[0].dir, 'big');
  assert.ok(out.rows[0].share > 0.5);
  assert.ok(out.summary.tokensFull > out.summary.tokensResident);
});

test('审计：重复描述被识别（复制粘贴的技能）', () => {
  const dup = 'Same description copy-pasted';
  const out = auditSkills([
    { path: skill('a', 'a', dup), text: md('a', dup, 'body') },
    { path: skill('b', 'b', dup), text: md('b', dup, 'body') },
    { path: skill('c', 'c', 'unique'), text: md('c', 'unique', 'body') },
  ]);
  assert.equal(out.summary.duplicatedDescriptions, 1);
  assert.deepEqual(out.findings.duplicated[0].names.sort(), ['a', 'b']);
});

test('审计：同名目录去重（多技能根链接同一技能）', () => {
  const text = md('alpha', 'd', 'body');
  const out = auditSkills([
    { path: 'skills/alpha/SKILL.md', text },
    { path: 'other/alpha/SKILL.md', text },
  ]);
  assert.equal(out.summary.skills, 1);
});

test('审计：缺描述与超长描述被标记', () => {
  const out = auditSkills([
    { path: skill('nodesc', 'nodesc', ''), text: md('nodesc', '', 'body') },
    { path: skill('long', 'long', 'z'.repeat(400)), text: md('long', 'z'.repeat(400), 'body') },
  ]);
  assert.deepEqual(out.findings.noDescription, ['nodesc']);
  assert.equal(out.findings.longDescription.length, 1);
});
