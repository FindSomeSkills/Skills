#!/usr/bin/env node
// 可复跑的端到端演示：两台模拟设备（A=Windows 路径 / B=macOS 路径），
// 走完 配对 → 首传 → 拉取 → 增量 → 冲突 五步，并打印可核对的事实。
import fs from 'node:fs/promises';
import path from 'node:path';
import { setupTwoDevices, payloadSha, readIndex } from '../test/harness.mjs';
import { setChunkSize, sha256File } from '../src/shared/util.mjs';

const CHUNK = 64 * 1024;

function line(label, value) {
  console.log(`  ${label.padEnd(26)} ${value}`);
}

function header(title) {
  console.log(`\n=== ${title} ===`);
}

const env = await setupTwoDevices({ chunkSize: CHUNK });
setChunkSize(CHUNK);

try {
  header('0. 环境');
  line('Hub', env.hub.url);
  line('设备 A home', env.A.home);
  line('设备 B home', env.B.home);
  line('工作区 A 路径', env.paths.A);
  line('工作区 B 路径', env.paths.B);

  header('1. A 首传（全量）');
  const a1 = await env.sync(env.A);
  line('上传会话', a1.uploaded.length);
  line('上传字节', a1.bytesUp);
  line('索引合并', a1.indexes.map((i) => `${i.kind}:seq=${i.seq}`).join(' '));

  header('2. B 拉取（跨路径 + 跨格式）');
  const b1 = await env.sync(env.B);
  line('下载会话', b1.downloaded.length);
  line('上传会话（B 自己那个 legacy）', b1.uploaded.length);

  const wsB = await readIndex(env.B.home, 'workspace');
  const wsId = Object.keys(wsB.tables.workspaces)[0];
  line('B 的会话列表', wsB.tables.workspaces[wsId].sessionIds.join(', '));
  line('B 的 path（应为本地值）', wsB.tables.workspaces[wsId].path);
  const pcB = await readIndex(env.B.home, 'projcache');
  line('B 上 A 会话的标题', pcB.tables.sessions['session-aaaa-0001'].rows.title.val);

  const shaA = await payloadSha(env.A.home, env.paths.A, 'session-aaaa-0002', 'v4');
  const shaB = await payloadSha(env.B.home, env.paths.B, 'session-aaaa-0002', 'v4');
  line('负载字节一致', shaA === shaB ? 'YES' : `NO (${shaA} vs ${shaB})`);

  header('3. 增量：A 追加 10 KB');
  const fileA = path.join(env.A.home, 'sessions', '--C-Users-A-projects-demo--', 'session-aaaa-0002', 'session.v4.jsonl.zstd');
  await fs.appendFile(fileA, Buffer.alloc(10_000, 9));
  const a2 = await env.sync(env.A);
  const up = a2.uploaded.find((u) => u.key.includes('session-aaaa-0002'));
  line('模式', up?.mode ?? '(none)');
  line('仅上传字节', up?.bytes ?? 0);
  line('全量本应为', up?.total ?? 0);
  line('节省比例', up ? `${(100 - (up.bytes / up.total) * 100).toFixed(1)}%` : '-');

  header('4. 冲突：两端在同一 base 上各改各的');
  const fileB = path.join(env.B.home, 'sessions', '--D-work-demo--', 'session-aaaa-0002', 'session.v4.jsonl.zstd');
  await fs.appendFile(fileA, Buffer.alloc(5_000, 0xaa));
  await fs.appendFile(fileB, Buffer.alloc(7_000, 0xbb));
  await env.sync(env.A);
  const b2 = await env.sync(env.B);
  line('B 报出冲突', b2.conflicts.length);
  if (b2.conflicts[0]) line('冲突对象', b2.conflicts[0].key);
  const stats = await env.hub.stats();
  line('Hub 会话数', stats.sessions);
  line('Hub 版本数（含冲突副本）', stats.versions);
  line('Hub 冲突数', stats.conflicts);

  const bytesB = await fs.readFile(fileB);
  const tailOk = bytesB.subarray(-7000).every((b) => b === 0xbb);
  line('B 本地未被覆盖', tailOk ? 'YES' : 'NO');
  line('B 本地 sha', (await sha256File(fileB)).slice(0, 16) + '…');

  header('5. 结论');
  console.log('  · 跨路径：A/B 工作区路径不同，会话与索引仍能对上（按 workspaceId 归并）');
  console.log('  · 跨格式：v4 与 legacy 在同一工作区共存，互不覆盖');
  console.log('  · 增量：追加写只传变更分块');
  console.log('  · 冲突：两端都改 → Hub 留双份 + 报冲突，本地文件未被静默覆盖');
} finally {
  await env.cleanup();
}
