// UI 规则验收：node test/ui.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { uiCases } from '../fixtures/ui-cases.mjs';
import { loadUiRules, runUiRules } from '../src/ui.ts';

const rules = loadUiRules();

for (const c of uiCases) {
  test(c.name, () => {
    const findings = runUiRules(c.file, c.src, { strict: Boolean(c.strict), rules });
    const ids = [...new Set(findings.map((f) => f.ruleId))].sort();
    assert.deepEqual(ids, [...c.expect].sort(), `命中 [${ids.join(', ')}]，期望 [${c.expect.join(', ') || '无'}]`);
  });
}

test('UI 规则元数据完整', () => {
  assert.equal(rules.length, 7);
  for (const r of rules) {
    assert.match(r.id, /^UI-\d{3}$/);
    assert.ok(r.source.startsWith('unslop'), `${r.id} 来源应指向 unslop 清单`);
    assert.ok(r.fix.length > 0);
  }
});
