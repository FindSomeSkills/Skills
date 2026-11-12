// 规则集验收：bad 必须命中且只命中 expect；good 必须零命中。
// 直接跑：node test/text.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { cases } from '../fixtures/text-cases.mjs';
import { loadRules, runRules } from '../src/core.ts';

const rules = loadRules('text');

for (const c of cases) {
  test(c.name, () => {
    const findings = runRules(c.text, { strict: Boolean(c.strict), rules, file: c.name });
    const ids = [...new Set(findings.map((f) => f.ruleId))].sort();
    assert.deepEqual(
      ids,
      [...c.expect].sort(),
      `命中 [${ids.join(', ')}]，期望 [${c.expect.join(', ') || '无'}]`,
    );

    if (c.assertSeverity) {
      for (const [ruleId, sev] of Object.entries(c.assertSeverity)) {
        const got = findings.filter((f) => f.ruleId === ruleId).map((f) => f.severity);
        assert.ok(got.includes(sev as string), `${ruleId} 期望严重度 ${sev}，实际 ${got.join('/')}`);
      }
    }
  });
}

test('规则元数据完整：来源、改法、谓词齐全', () => {
  assert.equal(rules.length, 10);
  for (const r of rules) {
    assert.match(r.id, /^TXT-\d{3}$/);
    assert.ok(r.source && r.source.length > 0, `${r.id} 缺来源`);
    assert.ok(r.fix && r.fix.length > 0, `${r.id} 缺改法`);
    assert.ok(r.predicate && typeof r.predicate.type === 'string', `${r.id} 缺谓词`);
    assert.ok(['error', 'warn', 'info'].includes(r.severity));
  }
});

test('默认关闭的规则不会被默认启用', () => {
  const off = rules.filter((r) => !r.defaultOn).map((r) => r.id).sort();
  assert.deepEqual(off, ['TXT-003', 'TXT-004', 'TXT-006']);
});
