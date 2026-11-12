// Agent：运行面无关。输入是一个 DSH Home 目录，输出是「负载 + 索引」的同步。
// 硬约束：负载按不透明字节处理（只 hash / 分块 / 搬运，绝不解析内容）。
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  FORMAT_BY_FILE,
  FILE_BY_FORMAT,
  CHUNK_SIZE,
  chunkFile,
  readRange,
  pathSlug,
  atomicWriteJson,
  readJson,
  fileExists,
  backupFile,
  nowIso,
  sha256Hex,
} from '../shared/util.mjs';
import { mergeIndex } from '../hub/merge.mjs';

const DENY_PATTERNS = [
  /\.credentials/i,
  /(^|[\\/])\.env$/i,
  /\.(pem|key|p12|pfx)$/i,
  /id_rsa/i,
  /(^|[\\/])profiles[\\/].*cred/i,
];

export function isDenied(relPath) {
  return DENY_PATTERNS.some((re) => re.test(relPath));
}

function normPath(p) {
  return String(p ?? '')
    .replace(/[\\/]+/g, '/')
    .replace(/\/+$/, '')
    .toLowerCase();
}

/** 探测一个 DSH Home 的形态（只读，不碰负载内容） */
export async function probeHome(home) {
  const sessionsDir = path.join(home, 'sessions');
  const storagesDir = path.join(home, 'storages');
  const warnings = [];

  const hasSessions = await fileExists(sessionsDir);
  const hasStorages = await fileExists(storagesDir);
  if (!hasSessions) warnings.push(`no sessions dir under ${home}`);
  if (!hasStorages) warnings.push(`no storages dir under ${home}`);

  const workspaceUnit = await readJson(path.join(storagesDir, 'workspace.json'), null);
  const projcacheUnit = await readJson(path.join(storagesDir, 'session_projcache.json'), null);

  const isDesktop =
    (await fileExists(path.join(home, 'desktop'))) ||
    (await fileExists(path.join(storagesDir, 'dsh_automation.json')));

  const formats = new Set();
  if (hasSessions) {
    for (const slugEntry of await fs.readdir(sessionsDir, { withFileTypes: true })) {
      if (!slugEntry.isDirectory()) continue;
      const slugDir = path.join(sessionsDir, slugEntry.name);
      for (const sessEntry of await fs.readdir(slugDir, { withFileTypes: true })) {
        if (!sessEntry.isDirectory()) continue;
        for (const fileEntry of await fs.readdir(path.join(slugDir, sessEntry.name), { withFileTypes: true })) {
          if (fileEntry.isFile() && FORMAT_BY_FILE[fileEntry.name]) formats.add(FORMAT_BY_FILE[fileEntry.name]);
        }
      }
    }
  }

  return {
    homeId: sha256Hex(normPath(home)).slice(0, 12),
    home,
    surfaceKind: isDesktop ? 'desktop' : 'web',
    formats: [...formats],
    unitVersions: {
      workspace: workspaceUnit?.unit?.version ?? null,
      projcache: projcacheUnit?.unit?.version ?? null,
    },
    warnings,
  };
}

function listWorkspaces(workspaceUnit) {
  const table = workspaceUnit?.tables?.workspaces ?? {};
  return Object.entries(table).map(([id, ws]) => ({
    id,
    path: ws?.path ?? null,
    title: ws?.title ?? null,
    slug: ws?.path ? pathSlug(ws.path) : null,
    sessionIds: Array.isArray(ws?.sessionIds) ? ws.sessionIds : [],
  }));
}

/** 扫描本地 Home：得到会话负载清单（哈希+分块）与索引原文 */
export async function scanHome(home) {
  const sessionsDir = path.join(home, 'sessions');
  const storagesDir = path.join(home, 'storages');
  const warnings = [];
  const workspaceUnit = await readJson(path.join(storagesDir, 'workspace.json'), null);
  const projcacheUnit = await readJson(path.join(storagesDir, 'session_projcache.json'), null);
  const workspaces = listWorkspaces(workspaceUnit);

  // 会话 → 工作区：projcache 的 identity.cwd 是权威；退回目录 slug 匹配
  const cwdBySession = new Map();
  for (const [sid, row] of Object.entries(projcacheUnit?.tables?.sessions ?? {})) {
    const cwd = row?.identity?.cwd;
    if (cwd) cwdBySession.set(sid, normPath(cwd));
  }
  const wsByPath = new Map(workspaces.filter((w) => w.path).map((w) => [normPath(w.path), w]));
  const wsBySlug = new Map(workspaces.filter((w) => w.slug).map((w) => [w.slug, w]));

  const sessions = [];
  if (await fileExists(sessionsDir)) {
    for (const slugEntry of await fs.readdir(sessionsDir, { withFileTypes: true })) {
      if (!slugEntry.isDirectory()) continue;
      const slugDir = path.join(sessionsDir, slugEntry.name);
      for (const sessEntry of await fs.readdir(slugDir, { withFileTypes: true })) {
        if (!sessEntry.isDirectory()) continue;
        const sessionDir = sessEntry.name;
        const dirPath = path.join(slugDir, sessionDir);
        const ws = wsByPath.get(cwdBySession.get(sessionDir)) ?? wsBySlug.get(slugEntry.name) ?? null;
        if (!ws) {
          warnings.push(`unassigned session dir: ${slugEntry.name}/${sessionDir}`);
          continue;
        }
        for (const fileEntry of await fs.readdir(dirPath, { withFileTypes: true })) {
          if (!fileEntry.isFile()) continue;
          const formatId = FORMAT_BY_FILE[fileEntry.name];
          if (!formatId) continue;
          const filePath = path.join(dirPath, fileEntry.name);
          const rel = path.relative(home, filePath);
          if (isDenied(rel)) {
            warnings.push(`denied path skipped: ${rel}`);
            continue;
          }
          const scanned = await chunkFile(filePath);
          sessions.push({
            workspaceId: ws.id,
            workspacePath: ws.path,
            sessionDir,
            formatId,
            file: filePath,
            relPath: rel,
            size: scanned.size,
            sha256: scanned.sha256,
            chunks: scanned.chunks,
            chunkHashes: scanned.chunks.map((c) => c.hash),
          });
        }
      }
    }
  }

  return { home, workspaces, workspaceUnit, projcacheUnit, sessions, warnings };
}

function makeClient(hubUrl, token) {
  const call = async (method, routePath, body, raw = false) => {
    const res = await fetch(new URL(routePath, hubUrl), {
      method,
      headers: {
        authorization: `Bearer ${token}`,
        ...(body && !raw ? { 'content-type': 'application/json' } : {}),
      },
      body: raw ? body : body ? JSON.stringify(body) : undefined,
    });
    if (raw) {
      if (!res.ok) throw new Error(`${method} ${routePath} → ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    }
    const payload = await res.json();
    if (!res.ok) throw new Error(`${method} ${routePath} → ${res.status} ${payload.error ?? ''}`);
    return payload;
  };
  return {
    handshake: (body) => call('POST', '/v1/sync/handshake', body),
    getIndex: (kind) => call('GET', `/v1/index/${kind}`),
    mergeIndex: (kind, content) => call('POST', `/v1/index/${kind}`, { content }),
    manifest: () => call('GET', '/v1/manifest'),
    version: (id) => call('GET', `/v1/version/${id}`),
    plan: (body) => call('POST', '/v1/sync/plan', body),
    commit: (body) => call('POST', '/v1/sync/commit', body),
    putChunk: (hash, buf) => call('PUT', `/v1/blob/${hash}`, buf, true),
    getChunk: (hash) => call('GET', `/v1/blob/${hash}`, undefined, true),
    conflicts: () => call('GET', '/v1/conflicts'),
  };
}

async function assembleChunks(client, destFile, chunks, chunkCacheDir) {
  await fs.mkdir(chunkCacheDir, { recursive: true });
  await fs.mkdir(path.dirname(destFile), { recursive: true });
  const tmp = `${destFile}.tmp-${process.pid}-${Date.now()}`;
  const fh = await fs.open(tmp, 'w');
  try {
    for (const hash of chunks) {
      const cachePath = path.join(chunkCacheDir, hash);
      let buf;
      if (await fileExists(cachePath)) {
        buf = await fs.readFile(cachePath);
      } else {
        buf = await client.getChunk(hash);
        if (sha256Hex(buf) !== hash) throw new Error(`chunk corrupt: ${hash}`);
        await fs.writeFile(cachePath, buf);
      }
      await fh.write(buf);
    }
  } finally {
    await fh.close();
  }
  return tmp;
}

function keyOf(item) {
  return `${item.workspaceId}|${item.sessionDir}|${item.formatId}`;
}

export async function syncOnce({ home, stateDir, hubUrl, token }) {
  const stateFile = path.join(stateDir, 'state.json');
  const state = (await readJson(stateFile, null)) ?? { lastSynced: {} };
  state.lastSynced ??= {};
  state.hubUrl = hubUrl ?? state.hubUrl;
  state.token = token ?? state.token;
  if (!state.hubUrl) throw new Error('missing hub url');
  if (!state.token) throw new Error('missing device token');

  const client = makeClient(state.hubUrl, state.token);
  const report = {
    home,
    uploaded: [],
    downloaded: [],
    conflicts: [],
    indexes: [],
    warnings: [],
    skipped: [],
    bytesUp: 0,
    bytesDown: 0,
  };

  const probe = await probeHome(home);
  const scan = await scanHome(home);
  report.warnings.push(...probe.warnings, ...scan.warnings);

  const workspacesMap = {};
  for (const ws of scan.workspaces) if (ws.path) workspacesMap[ws.id] = ws.path;

  await client.handshake({
    agentVersion: '0.1.0',
    homes: [{ ...probe, pathSlugs: scan.workspaces.map((w) => w.slug).filter(Boolean) }],
    workspaces: workspacesMap,
  });

  // ---- 1. 索引双向合并（先做，保证「会话在列表里能显示」）----
  for (const [kind, file] of [
    ['workspace', path.join(home, 'storages', 'workspace.json')],
    ['projcache', path.join(home, 'storages', 'session_projcache.json')],
  ]) {
    const localRaw = await readJson(file, null);
    const remote = await client.getIndex(kind);
    // 本地落盘用「本地化」的合并结果（path 永远 local 优先）；
    // 同时把结果推给 Hub 做跨设备canonical 记录，但不拿服务端返回的 path 覆盖本地。
    const { content } = mergeIndex(kind, localRaw, remote.content);
    const posted = await client.mergeIndex(kind, content);
    const changed = JSON.stringify(content) !== JSON.stringify(localRaw);
    if (changed) {
      await backupFile(file);
      await atomicWriteJson(file, content);
    }
    report.indexes.push({ kind, seq: posted.seq, changed });
  }

  // 索引合并后重扫：远端带来的新工作区现在也在本地索引里了
  const after = await scanHome(home);
  const wsById = new Map(after.workspaces.map((w) => [w.id, w]));
  const localByKey = new Map(after.sessions.map((s) => [keyOf(s), s]));
  const remoteByKey = new Map((await client.manifest()).items.map((s) => [keyOf(s), s]));
  const allKeys = new Set([...localByKey.keys(), ...remoteByKey.keys()]);

  for (const key of allKeys) {
    const local = localByKey.get(key);
    const remote = remoteByKey.get(key);
    const baseSha = state.lastSynced[key]?.sha ?? null;

    if (local && remote && local.sha256 === remote.sha256) {
      state.lastSynced[key] = { sha: local.sha256, at: nowIso() };
      report.skipped.push({ key, reason: 'in-sync' });
      continue;
    }

    const localChanged = Boolean(local) && local.sha256 !== baseSha;
    const remoteChanged = Boolean(remote) && remote.sha256 !== baseSha;

    // ---- 下载：仅当本地没有，或「远端变了而本地没变」----
    if (remote && (!local || (remoteChanged && !localChanged))) {
      const version = await client.version(remote.versionId);
      const ws = wsById.get(remote.workspaceId);
      if (!ws?.path) {
        report.warnings.push(`no local path for workspace ${remote.workspaceId}; skipped ${key}`);
        continue;
      }
      const destFile = path.join(home, 'sessions', pathSlug(ws.path), remote.sessionDir, FILE_BY_FORMAT[remote.formatId]);
      const tmp = await assembleChunks(client, destFile, version.chunks, path.join(stateDir, 'chunks'));
      await backupFile(destFile);
      await fs.rename(tmp, destFile);
      state.lastSynced[key] = { sha: remote.sha256, at: nowIso() };
      report.downloaded.push({ key, bytes: remote.size, dest: path.relative(home, destFile) });
      report.bytesDown += remote.size;
      continue;
    }

    // ---- 上传：本地有差异就试；若 base 过期，服务端会判冲突并保留双份 ----
    if (local) {
      const plan = await client.plan({
        workspaceId: local.workspaceId,
        sessionDir: local.sessionDir,
        formatId: local.formatId,
        size: local.size,
        sha256: local.sha256,
        chunks: local.chunkHashes,
        baseSha,
      });

      if (plan.mode === 'none') {
        state.lastSynced[key] = { sha: local.sha256, at: nowIso() };
        report.skipped.push({ key, reason: 'server-has-same' });
        continue;
      }

      // 冲突时也要把字节传上去：服务端会存成 conflict_copy 并记录冲突（留双份，
      // 但绝不把本地文件覆盖成远端版本）。
      const chunkByHash = new Map(local.chunks.map((c) => [c.hash, c]));
      let uploadedBytes = 0;
      for (const hash of plan.missing ?? []) {
        const meta = chunkByHash.get(hash);
        if (!meta) throw new Error(`missing local chunk ${hash}`);
        const buf = await readRange(local.file, meta.offset, meta.length);
        await client.putChunk(hash, buf);
        uploadedBytes += meta.length;
      }

      const commit = await client.commit({
        workspaceId: local.workspaceId,
        sessionDir: local.sessionDir,
        formatId: local.formatId,
        size: local.size,
        sha256: local.sha256,
        chunks: local.chunkHashes,
        baseSha,
      });
      if (!commit.ok && commit.conflict) {
        report.conflicts.push({
          key,
          reason: plan.mode === 'conflict' ? 'base-is-stale' : 'commit-conflict',
          conflictId: commit.conflict.id,
          conflictWith: commit.conflict.current.sha,
        });
        report.bytesUp += uploadedBytes;
        continue;
      }
      state.lastSynced[key] = { sha: local.sha256, at: nowIso() };
      report.uploaded.push({ key, mode: plan.mode, bytes: uploadedBytes, total: local.size });
      report.bytesUp += uploadedBytes;
    }
  }

  await atomicWriteJson(stateFile, state);
  return report;
}

export async function createPairCode(hubUrl) {
  const res = await fetch(new URL('/v1/pair/new', hubUrl), { method: 'POST' });
  const payload = await res.json();
  if (!res.ok) throw new Error(`pair code failed: ${payload.error ?? res.status}`);
  return payload;
}

export async function pairDevice({ hubUrl, code, name, os = process.platform }) {
  const res = await fetch(new URL('/v1/pair/claim', hubUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code, name, os }),
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(`pair failed: ${payload.error ?? res.status}`);
  return payload;
}

export async function saveDeviceState(stateDir, data) {
  await atomicWriteJson(path.join(stateDir, 'state.json'), data);
}

export { CHUNK_SIZE };
