// 测试/演示用：造两个「模拟设备」的 DSH Home，跑通端到端同步链路。
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHub } from '../src/hub/server.mjs';
import { createPairCode, pairDevice, syncOnce } from '../src/agent/agent.mjs';
import { pathSlug, atomicWriteJson, sha256File } from '../src/shared/util.mjs';

const WS_ID = '11111111-1111-4111-8111-111111111111';

export function workspaceUnit({ path: wsPath, title, sessionIds = [] }) {
  return {
    unit: { name: 'workspace', version: 2 },
    global: { initialized: true, workspaceIds: [WS_ID], archivedSessionIds: [], pinnedSessionIds: [] },
    tables: {
      workspaces: {
        [WS_ID]: {
          path: wsPath,
          title,
          sessionIds,
          createdAt: '2026-11-01T00:00:00.000Z',
          updatedAt: '2026-11-02T00:00:00.000Z',
        },
      },
    },
  };
}

export function projcacheUnit({ path: wsPath, entries = [] }) {
  const sessions = {};
  for (const entry of entries) {
    sessions[entry.sessionDir] = {
      identity: { createdAt: 1793000000000, cwd: wsPath },
      rows: {
        title: { ver: 1, seq: entry.titleSeq ?? 10, val: entry.title ?? null },
        sessionStats: { ver: 1, seq: entry.titleSeq ?? 10, val: { turns: 1, steps: 1 } },
      },
    };
  }
  return { unit: { name: 'session_projcache', version: 3 }, global: null, tables: { sessions } };
}

/** 造一个 DSH Home（结构对齐实测布局，负载是随机不透明字节） */
export async function createHome({ root, wsPath, title, sessions = [] }) {
  await fs.mkdir(path.join(root, 'storages'), { recursive: true });
  await fs.mkdir(path.join(root, 'sessions'), { recursive: true });

  for (const session of sessions) {
    const dir = path.join(root, 'sessions', pathSlug(wsPath), session.sessionDir);
    await fs.mkdir(dir, { recursive: true });
    const fileName = session.formatId === 'v4' ? 'session.v4.jsonl.zstd' : 'session.jsonl.zstd';
    const bytes = session.bytes ?? Buffer.from(`opaque-bytes:${session.sessionDir}`, 'utf8');
    await fs.writeFile(path.join(dir, fileName), bytes);
  }

  await atomicWriteJson(
    path.join(root, 'storages', 'workspace.json'),
    workspaceUnit({ path: wsPath, title, sessionIds: sessions.map((s) => s.sessionDir) }),
  );
  await atomicWriteJson(
    path.join(root, 'storages', 'session_projcache.json'),
    projcacheUnit({
      path: wsPath,
      entries: sessions.map((s) => ({ sessionDir: s.sessionDir, title: s.title, titleSeq: s.titleSeq ?? 10 })),
    }),
  );
  return root;
}

export async function setupTwoDevices({ chunkSize, sessionBytes } = {}) {
  if (chunkSize) process.env.DSHSYNC_CHUNK_SIZE = String(chunkSize);
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'dshsync-e2e-'));
  const hub = await createHub({ dataDir: path.join(base, 'hub') });

  const pathA = 'C:\\Users\\A\\projects\\demo';
  const pathB = 'D:\\work\\demo';

  // A：两个 v4 会话（其中一个较大，用于验证分块/增量）
  const homeA = await createHome({
    root: path.join(base, 'A'),
    wsPath: pathA,
    title: 'demo',
    sessions: [
      { sessionDir: 'session-aaaa-0001', formatId: 'v4', bytes: Buffer.alloc(40_000, 1), title: 'A 的会话一' },
      { sessionDir: 'session-aaaa-0002', formatId: 'v4', bytes: sessionBytes ?? Buffer.alloc(150_000, 2), title: 'A 的会话二' },
    ],
  });

  // B：一个 legacy 会话（验证跨格式共存 + 会话并集）
  const homeB = await createHome({
    root: path.join(base, 'B'),
    wsPath: pathB,
    title: 'demo',
    sessions: [{ sessionDir: 'session-bbbb-0001', formatId: 'legacy', bytes: Buffer.alloc(30_000, 3), title: 'B 的旧格式会话' }],
  });

  const codeA = await createPairCode(hub.url);
  const deviceA = await pairDevice({ hubUrl: hub.url, code: codeA.code, name: 'device-A', os: 'win32' });
  const codeB = await createPairCode(hub.url);
  const deviceB = await pairDevice({ hubUrl: hub.url, code: codeB.code, name: 'device-B', os: 'darwin' });

  return {
    base,
    hub,
    paths: { A: pathA, B: pathB },
    A: { home: homeA, stateDir: path.join(base, 'state-A'), ...deviceA },
    B: { home: homeB, stateDir: path.join(base, 'state-B'), ...deviceB },
    async sync(device) {
      return syncOnce({ home: device.home, stateDir: device.stateDir, hubUrl: hub.url, token: device.token });
    },
    async cleanup() {
      await hub.close();
      await fs.rm(base, { recursive: true, force: true });
    },
  };
}

/** 读某个 home 下某会话负载的真实 sha，用于断言字节一致 */
export async function payloadSha(home, wsPath, sessionDir, formatId) {
  const name = formatId === 'v4' ? 'session.v4.jsonl.zstd' : 'session.jsonl.zstd';
  return sha256File(path.join(home, 'sessions', pathSlug(wsPath), sessionDir, name));
}

export async function readIndex(home, kind) {
  const file = kind === 'workspace' ? 'workspace.json' : 'session_projcache.json';
  return JSON.parse(await fs.readFile(path.join(home, 'storages', file), 'utf8'));
}
