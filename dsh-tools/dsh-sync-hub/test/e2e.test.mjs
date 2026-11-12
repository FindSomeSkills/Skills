import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { setupTwoDevices, payloadSha, readIndex } from './harness.mjs';
import { setChunkSize } from '../src/shared/util.mjs';
import { isDenied } from '../src/agent/agent.mjs';

const CHUNK = 64 * 1024;

test('端到端：配对 → 首传 → 拉取 → 字节一致 → 索引可见', async (t) => {
  setChunkSize(CHUNK);
  const env = await setupTwoDevices({ chunkSize: CHUNK });
  t.after(() => env.cleanup());

  // 1. A 首传
  const reportA = await env.sync(env.A);
  assert.equal(reportA.uploaded.length, 2, 'A 应上传 2 个会话');
  assert.ok(reportA.uploaded.every((u) => u.mode === 'full'), '首次应为全量');
  assert.equal(reportA.downloaded.length, 0);

  // 2. B 拉取
  const reportB = await env.sync(env.B);
  assert.equal(reportB.downloaded.length, 2, 'B 应下载 2 个会话');
  assert.equal(reportB.uploaded.length, 1, 'B 应上传自己的 1 个会话');

  // 3. 字节一致（按不透明字节比对，不解析）
  for (const sessionDir of ['session-aaaa-0001', 'session-aaaa-0002']) {
    const shaA = await payloadSha(env.A.home, env.paths.A, sessionDir, 'v4');
    const shaB = await payloadSha(env.B.home, env.paths.B, sessionDir, 'v4');
    assert.equal(shaB, shaA, `${sessionDir} 两端字节应一致`);
  }

  // 4. 索引：会话并集 + 本机 path 不被远端覆盖
  const wsB = await readIndex(env.B.home, 'workspace');
  const wsId = Object.keys(wsB.tables.workspaces)[0];
  const ids = wsB.tables.workspaces[wsId].sessionIds;
  assert.deepEqual(
    [...new Set(ids)].sort(),
    ['session-aaaa-0001', 'session-aaaa-0002', 'session-bbbb-0001'].sort(),
    'B 的会话列表应为并集',
  );
  assert.equal(wsB.tables.workspaces[wsId].path, env.paths.B, 'B 的 path 必须保持本地值');

  // 5. projcache：远端会话在 B 上有标题（否则列表里没标题）
  const pcB = await readIndex(env.B.home, 'projcache');
  assert.equal(pcB.tables.sessions['session-aaaa-0001'].rows.title.val, 'A 的会话一');
  assert.equal(pcB.tables.sessions['session-bbbb-0001'].rows.title.val, 'B 的旧格式会话');

  // 6. A 再同步：应无事可做（幂等）
  const reportA2 = await env.sync(env.A);
  assert.equal(reportA2.uploaded.length, 0);
  assert.equal(reportA2.downloaded.length, 1, 'A 应拉取 B 上传的那个会话');
});

test('增量：只传变更分块', async (t) => {
  setChunkSize(CHUNK);
  const env = await setupTwoDevices({ chunkSize: CHUNK });
  t.after(() => env.cleanup());

  await env.sync(env.A);
  await env.sync(env.B);

  // A 在会话尾部追加 10 KB（模拟 DSH 追加写）
  const file = path.join(env.A.home, 'sessions', '--C-Users-A-projects-demo--', 'session-aaaa-0002', 'session.v4.jsonl.zstd');
  await fs.appendFile(file, Buffer.alloc(10_000, 9));

  const report = await env.sync(env.A);
  const upload = report.uploaded.find((u) => u.key.includes('session-aaaa-0002'));
  assert.ok(upload, '应上传被改的会话');
  assert.equal(upload.mode, 'delta', '应为增量模式');
  assert.ok(upload.bytes < CHUNK * 2, `增量上传应远小于全量，实际 ${upload.bytes}`);

  // B 拉取后与 A 一致
  await env.sync(env.B);
  const shaA = await payloadSha(env.A.home, env.paths.A, 'session-aaaa-0002', 'v4');
  const shaB = await payloadSha(env.B.home, env.paths.B, 'session-aaaa-0002', 'v4');
  assert.equal(shaB, shaA);
});

test('冲突：两端都改 → 留双份，本地不被静默覆盖', async (t) => {
  setChunkSize(CHUNK);
  const env = await setupTwoDevices({ chunkSize: CHUNK });
  t.after(() => env.cleanup());

  await env.sync(env.A);
  await env.sync(env.B);

  const sessionDir = 'session-aaaa-0002';
  const payload = 'session.v4.jsonl.zstd';
  const fileA = path.join(env.A.home, 'sessions', '--C-Users-A-projects-demo--', sessionDir, payload);
  const fileB = path.join(env.B.home, 'sessions', '--D-work-demo--', sessionDir, payload);

  await fs.appendFile(fileA, Buffer.alloc(5_000, 0xaa));
  await fs.appendFile(fileB, Buffer.alloc(7_000, 0xbb));

  await env.sync(env.A); // 服务端先接受 A 的版本
  const reportB = await env.sync(env.B); // B 的 base 已过期

  assert.ok(reportB.conflicts.length >= 1, 'B 应报出冲突而不是覆盖');
  const stats = await env.hub.stats();
  assert.ok(stats.conflicts >= 1, 'Hub 应记录冲突');
  assert.ok(stats.versions >= 4, 'Hub 应保留双份版本');

  // B 的本地文件必须还是 B 自己写的那份
  const shaLocal = await import('../src/shared/util.mjs').then((m) => m.sha256File(fileB));
  const bytes = await fs.readFile(fileB);
  assert.equal(bytes.subarray(-7000).every((b) => b === 0xbb), true, 'B 本地尾部应仍是自己的数据');
  assert.ok(shaLocal.length === 64);
});

test('凭据路径：一律拒绝，不上传', () => {
  assert.equal(isDenied('.credentials.yaml'), true);
  assert.equal(isDenied('.ohdsh/.credentials.yaml'), true);
  assert.equal(isDenied('profiles/desktop/credentials.json'), true);
  assert.equal(isDenied('sessions/x/session.v4.jsonl.zstd'), false);
});
