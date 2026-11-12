// 协议边界测试：鉴权、配对、块校验、索引合并、冲突查询。
// 直接跑：node test/protocol.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHub } from '../src/hub/server.mjs';
import { createPairCode, pairDevice } from '../src/agent/agent.mjs';
import { setChunkSize, sha256Hex } from '../src/shared/util.mjs';

const CHUNK = 64 * 1024;

async function freshHub(t) {
  setChunkSize(CHUNK);
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dshsync-proto-'));
  const hub = await createHub({ dataDir: path.join(dir, 'hub') });
  t.after(async () => {
    await hub.close();
    await fs.rm(dir, { recursive: true, force: true });
  });
  const code = await createPairCode(hub.url);
  const device = await pairDevice({ hubUrl: hub.url, code: code.code, name: 'proto', os: 'linux' });
  return { hub, device, dir };
}

const call = (hub, route, { method = 'GET', token, body } = {}) =>
  fetch(new URL(route, hub.url), {
    method,
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

test('鉴权：缺令牌 / 错令牌都拒绝', async (t) => {
  const { hub } = await freshHub(t);
  assert.equal((await call(hub, '/v1/manifest')).status, 401);
  assert.equal((await call(hub, '/v1/manifest', { token: 'deadbeef' })).status, 401);
});

test('配对码：只能用一次；未知码 404', async (t) => {
  const { hub } = await freshHub(t);
  const code = await createPairCode(hub.url);
  const first = await call(hub, '/v1/pair/claim', { method: 'POST', body: { code: code.code, name: 'x' } });
  assert.equal(first.status, 200);
  const second = await call(hub, '/v1/pair/claim', { method: 'POST', body: { code: code.code, name: 'y' } });
  assert.equal(second.status, 409, '同一配对码不能二次使用');
  const unknown = await call(hub, '/v1/pair/claim', { method: 'POST', body: { code: 'ZZZZZZZZ', name: 'z' } });
  assert.equal(unknown.status, 404);
});

test('块校验：哈希不符必须拒绝', async (t) => {
  const { hub, device } = await freshHub(t);
  const good = Buffer.from('hello world');
  const hash = sha256Hex(good);
  const bad = await fetch(new URL(`/v1/blob/${hash}`, hub.url), {
    method: 'PUT',
    headers: { authorization: `Bearer ${device.token}`, 'content-type': 'application/octet-stream' },
    body: Buffer.from('tampered'),
  });
  assert.equal(bad.status, 400, '内容与声明的哈希不一致必须拒绝');

  const ok = await fetch(new URL(`/v1/blob/${hash}`, hub.url), {
    method: 'PUT',
    headers: { authorization: `Bearer ${device.token}`, 'content-type': 'application/octet-stream' },
    body: good,
  });
  assert.equal(ok.status, 200);
});

test('多块文件：plan 报全量、commit 后可按块取回', async (t) => {
  const { hub, device } = await freshHub(t);
  const payload = Buffer.alloc(CHUNK * 2 + 1234, 7);
  const chunks = [];
  for (let off = 0; off < payload.length; off += CHUNK) {
    const slice = payload.subarray(off, Math.min(off + CHUNK, payload.length));
    chunks.push({ hash: sha256Hex(slice), buf: slice });
  }
  const sha = sha256Hex(payload);

  await call(hub, '/v1/sync/handshake', { method: 'POST', token: device.token, body: { homes: [] } });
  const plan = await (await call(hub, '/v1/sync/plan', {
    method: 'POST',
    token: device.token,
    body: { workspaceId: 'ws', sessionDir: 's1', formatId: 'v4', size: payload.length, sha256: sha, chunks: chunks.map((c) => c.hash) },
  })).json();
  assert.equal(plan.mode, 'full');
  assert.equal(plan.missing.length, 3, '3 个块都应缺失');

  for (const c of chunks) {
    await fetch(new URL(`/v1/blob/${c.hash}`, hub.url), {
      method: 'PUT',
      headers: { authorization: `Bearer ${device.token}` },
      body: c.buf,
    });
  }
  const commit = await (await call(hub, '/v1/sync/commit', {
    method: 'POST',
    token: device.token,
    body: { workspaceId: 'ws', sessionDir: 's1', formatId: 'v4', size: payload.length, sha256: sha, chunks: chunks.map((c) => c.hash) },
  })).json();
  assert.equal(commit.ok, true);

  const manifest = await (await call(hub, '/v1/manifest', { token: device.token })).json();
  assert.equal(manifest.items.length, 1);
  assert.equal(manifest.items[0].sha256, sha);

  const version = await (await call(hub, `/v1/version/${commit.versionId}`, { token: device.token })).json();
  assert.deepEqual(version.chunks, chunks.map((c) => c.hash));
});

test('索引合并：保留未知字段、集合取并集、时间戳取极值', async (t) => {
  const { hub, device } = await freshHub(t);
  const base = {
    unit: { name: 'workspace', version: 2 },
    global: { workspaceIds: ['w1'], archivedSessionIds: ['s-old'], pinnedSessionIds: [] },
    tables: { workspaces: { w1: { path: 'C:\\A', title: 'A', sessionIds: ['s1'], createdAt: '2026-11-02T00:00:00Z', updatedAt: '2026-11-03T00:00:00Z' } } },
  };
  await call(hub, '/v1/index/workspace', { method: 'POST', token: device.token, body: { content: base } });

  const incoming = structuredClone(base);
  incoming.global.archivedSessionIds = ['s-new'];
  incoming.global.pinnedSessionIds = ['s1'];
  incoming.tables.workspaces.w1.sessionIds = ['s2'];
  incoming.tables.workspaces.w1.updatedAt = '2026-11-01T00:00:00Z';
  incoming.tables.workspaces.w1.futureField = { keep: true };

  const merged = await (await call(hub, '/v1/index/workspace', { method: 'POST', token: device.token, body: { content: incoming } })).json();
  const c = merged.content;
  assert.deepEqual(c.global.archivedSessionIds.sort(), ['s-new', 's-old'], '归档集合应并集');
  assert.deepEqual(c.global.pinnedSessionIds, ['s1']);
  assert.deepEqual(c.tables.workspaces.w1.sessionIds.sort(), ['s1', 's2'], '会话集合应并集');
  assert.equal(c.tables.workspaces.w1.updatedAt, '2026-11-03T00:00:00Z', 'updatedAt 应取大');
  assert.equal(c.tables.workspaces.w1.createdAt, '2026-11-02T00:00:00Z');
  assert.deepEqual(c.tables.workspaces.w1.futureField, { keep: true }, '未知字段不能丢');
});

test('冲突：两端基于同一旧 base 各走一步，后到者不覆盖并登记冲突', async (t) => {
  const { hub, device } = await freshHub(t);
  const X = Buffer.alloc(1000, 1);
  const Y = Buffer.alloc(1000, 2);
  const Z = Buffer.alloc(1000, 3);
  const hashOf = [X, Y, Z].map((b) => sha256Hex(b));

  for (const [i, buf] of [X, Y, Z].entries()) {
    await fetch(new URL(`/v1/blob/${hashOf[i]}`, hub.url), {
      method: 'PUT',
      headers: { authorization: `Bearer ${device.token}` },
      body: buf,
    });
  }

  const mk = (idx, baseSha) =>
    call(hub, '/v1/sync/commit', {
      method: 'POST',
      token: device.token,
      body: {
        workspaceId: 'ws',
        sessionDir: 'sc',
        formatId: 'v4',
        size: 1000,
        sha256: hashOf[idx],
        chunks: [hashOf[idx]],
        baseSha,
      },
    });

  const v1 = await (await mk(0, null)).json(); // X 落库
  assert.equal(v1.ok, true);
  const v2 = await (await mk(1, hashOf[0])).json(); // 设备 A 从 X 前进到 Y
  assert.equal(v2.ok, true);

  // 设备 B 仍以为最新是 X，提交 Z → 必须判冲突，且不覆盖 Y
  const v3 = await (await mk(2, hashOf[0])).json();
  assert.equal(v3.ok, false, 'base 落后于当前版本时应判冲突');
  assert.ok(v3.conflict?.id, '应生成冲突记录');
  assert.equal(v3.current, hashOf[1], '当前版本不应被覆盖');

  const open = await (await call(hub, '/v1/conflicts', { token: device.token })).json();
  assert.equal(open.items.length, 1);
  assert.equal(open.items[0].incoming.sha, hashOf[2], '冲突记录应保留后到者的字节');
  assert.equal(open.items[0].current.sha, hashOf[1]);

  // 冲突副本必须真的落进版本表，否则“留双份”是空的
  const stats = await hub.stats();
  assert.ok(stats.versions >= 3, `版本数应含冲突副本，实际 ${stats.versions}`);
});
