import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInventory, diagnose, safeParse } from '../src/lib/session-index.mjs';

const WS = {
  unit: { name: 'workspace', version: 2 },
  global: { initialized: true, workspaceIds: ['w1'], archivedSessionIds: [], pinnedSessionIds: [] },
  tables: {
    workspaces: {
      w1: { path: 'C:\\demo', title: 'demo', sessionIds: ['session-a', 'session-b'], createdAt: 'x', updatedAt: 'y' },
    },
  },
};

const PC = {
  unit: { name: 'session_projcache', version: 3 },
  global: null,
  tables: { sessions: { 'session-a': { identity: { cwd: 'C:\\demo' }, rows: {} } } },
};

const file = (path, size = 100) => ({ name: path.split('/').pop(), webkitRelativePath: path, size });

test('清单归一：只认 sessions 负载与两份索引', () => {
  const inv = buildInventory([
    file('dsh/sessions/--C-demo--/session-a/session.v4.jsonl.zstd', 500),
    file('dsh/sessions/--C-demo--/session-b/session.jsonl.zstd', 300),
    file('dsh/sessions/--C-demo--/session-c/SKILL.md', 10),
    file('dsh/storages/workspace.json', 200),
    file('dsh/storages/session_projcache.json', 200),
    file('dsh/logs/desktop.log', 999),
  ]);
  assert.equal(inv.payloads.length, 2);
  assert.equal(inv.payloadBytes, 800);
  assert.deepEqual([...inv.indexFiles.keys()].sort(), ['session_projcache', 'workspace']);
  assert.deepEqual(inv.payloads.map((p) => p.format).sort(), ['legacy', 'v4']);
});

test('健康：索引与磁盘一一对应时无 error', () => {
  const inv = buildInventory([
    file('d/sessions/s1/session-a/session.v4.jsonl.zstd'),
    file('d/sessions/s1/session-b/session.v4.jsonl.zstd'),
  ]);
  const out = diagnose(inv, { workspace: WS, projcache: PC });
  assert.equal(out.health, 'degraded'); // session-b 没有 projcache 行 → warn
  assert.equal(out.summary.errors, 0);
  assert.deepEqual(out.issues.map((i) => i.id), ['no-projcache-row']);
});

test('有负载但不在列表：报 error 并给出可修项', () => {
  const inv = buildInventory([
    file('d/sessions/s1/session-zzz/session.v4.jsonl.zstd', 42),
  ]);
  const out = diagnose(inv, { workspace: WS, projcache: PC });
  assert.equal(out.health, 'broken');
  const issue = out.issues.find((i) => i.id === 'payload-not-listed');
  assert.equal(issue.severity, 'error');
  assert.equal(issue.count, 1);
  assert.match(issue.items[0], /session-zzz/);
});

test('索引有、磁盘无：报幽灵条目', () => {
  const inv = buildInventory([file('d/sessions/s1/session-a/session.v4.jsonl.zstd')]);
  const out = diagnose(inv, { workspace: WS, projcache: PC });
  const ghost = out.issues.find((i) => i.id === 'listed-no-payload');
  assert.deepEqual(ghost.items, ['session-b']);
});

test('同目录两种格式并存：单独报出', () => {
  const inv = buildInventory([
    file('d/sessions/s1/session-a/session.v4.jsonl.zstd'),
    file('d/sessions/s1/session-a/session.jsonl.zstd'),
    file('d/sessions/s1/session-b/session.v4.jsonl.zstd'),
  ]);
  const out = diagnose(inv, { workspace: WS, projcache: PC });
  const mixed = out.issues.find((i) => i.id === 'mixed-format');
  assert.equal(mixed.count, 1);
});

test('归档同时挂在列表里：提示归档未生效', () => {
  const ws = structuredClone(WS);
  ws.global.archivedSessionIds = ['session-a'];
  const inv = buildInventory([file('d/sessions/s1/session-a/session.v4.jsonl.zstd')]);
  const out = diagnose(inv, { workspace: ws, projcache: PC });
  assert.ok(out.issues.some((i) => i.id === 'archived-but-listed'));
});

test('逐会话 projcache 文件也算有标题（DSH 的真实布局）', () => {
  const inv = buildInventory([
    file('d/sessions/s1/session-a/session.v4.jsonl.zstd'),
    file('d/storages/session_projcache/sessions/session-a.json', 500),
  ]);
  assert.equal(inv.perSessionProj.has('session-a'), true);
  const out = diagnose(inv, { workspace: WS, projcache: { tables: { sessions: {} } } });
  assert.equal(out.issues.some((i) => i.id === 'no-projcache-row'), false, '不该误报没标题');
  assert.equal(out.summary.projcacheRows, 1);
});

test('索引损坏：safeParse 不抛异常', () => {
  const bad = safeParse('{ not json');
  assert.equal(bad.ok, false);
  assert.ok(bad.error.length > 0);
  const good = safeParse('{"a":1}');
  assert.deepEqual(good.value, { a: 1 });
});
