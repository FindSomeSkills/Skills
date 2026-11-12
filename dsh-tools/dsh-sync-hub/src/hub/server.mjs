// Hub HTTP 服务：REST + 内容寻址块存储。零第三方依赖（node:http）。
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Store, sessionKey } from './store.mjs';
import { mergeIndex } from './merge.mjs';
import { sha256Hex, randomCode, randomToken, nowIso, CHUNK_SIZE } from '../shared/util.mjs';

const PROTOCOL_VERSION = 1;
const MAX_BODY = 64 * 1024 * 1024;

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload));
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'content-length': body.length });
  res.end(body);
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function readBody(req, limit = MAX_BODY) {
  const parts = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > limit) throw httpError(413, 'body too large');
    parts.push(chunk);
  }
  return Buffer.concat(parts);
}

async function readJsonBody(req) {
  const buf = await readBody(req);
  if (!buf.length) return {};
  return JSON.parse(buf.toString('utf8'));
}

export async function createHub({ dataDir, host = '127.0.0.1', port = 0 } = {}) {
  const store = new Store(dataDir);
  await store.init();

  async function requireDevice(req) {
    const header = req.headers.authorization ?? '';
    const match = /^Bearer\s+(.+)$/i.exec(header);
    if (!match) throw httpError(401, 'missing bearer token');
    const tokenHash = sha256Hex(match[1]);
    const devices = await store.load('devices', {});
    for (const [deviceId, device] of Object.entries(devices)) {
      if (device.tokenSha256 === tokenHash && !device.revokedAt) {
        device.lastSeenAt = nowIso();
        await store.save('devices', devices);
        return { deviceId, device };
      }
    }
    throw httpError(401, 'invalid token');
  }

  async function handlePlan(body, deviceId) {
    const sessions = await store.load('sessions', {});
    const key = sessionKey(body.workspaceId, body.sessionDir, body.formatId);
    const entry = sessions[key];
    const current = entry?.versions?.find((v) => v.sha === entry.current) ?? null;

    if (current && current.sha === body.sha256) return { mode: 'none' };

    const missing = [];
    for (const hash of body.chunks ?? []) {
      if (!(await store.hasBlob(hash))) missing.push(hash);
    }

    if (!current) return { mode: 'full', missing, current: null };

    if (!body.baseSha || body.baseSha !== current.sha) {
      return {
        mode: 'conflict',
        missing,
        conflictWith: current.sha,
        reason: body.baseSha ? 'base_is_stale' : 'no_base_but_server_has_version',
        current: current.sha,
      };
    }

    // 前缀增量：只比较「完整块」。末尾半块在追加写时会变，不能算进前缀。
    const prefixLen = Math.floor(current.size / CHUNK_SIZE);
    const prefixOk =
      body.size >= current.size &&
      prefixLen > 0 &&
      Array.isArray(current.chunks) &&
      current.chunks.length >= prefixLen &&
      current.chunks.slice(0, prefixLen).every((hash, i) => body.chunks[i] === hash);

    return { mode: prefixOk ? 'delta' : 'full', missing, prefixOk, current: current.sha };
  }

  async function handleCommit(body, deviceId) {
    const sessions = await store.load('sessions', {});
    const key = sessionKey(body.workspaceId, body.sessionDir, body.formatId);
    let entry = sessions[key];
    if (!entry) {
      entry = { workspaceId: body.workspaceId, sessionDir: body.sessionDir, formatId: body.formatId, versions: [], current: null };
      sessions[key] = entry;
    }
    const current = entry.versions.find((v) => v.sha === entry.current) ?? null;

    if (current && current.sha === body.sha256) {
      return { ok: true, noop: true, versionId: current.id };
    }

    // 所有块必须已在 CAS 里
    for (const hash of body.chunks ?? []) {
      if (!(await store.hasBlob(hash))) throw httpError(409, `missing chunk ${hash}`);
    }

    const conflicted = current && current.sha !== body.baseSha && body.baseSha !== body.sha256;
    const version = {
      id: `ver_${sha256Hex(`${key}:${body.sha256}:${Date.now()}`).slice(0, 16)}`,
      sha: body.sha256,
      size: body.size,
      chunks: body.chunks,
      parent: body.baseSha ?? current?.sha ?? null,
      role: conflicted ? 'conflict_copy' : 'primary',
      producedBy: deviceId,
      createdAt: nowIso(),
    };
    entry.versions.push(version);
    if (!conflicted) entry.current = version.sha;
    entry.updatedAt = nowIso();

    let conflict = null;
    if (conflicted) {
      const conflicts = await store.load('conflicts', []);
      conflict = {
        id: `cf_${sha256Hex(`${key}:${Date.now()}`).slice(0, 16)}`,
        kind: 'C1',
        workspaceId: body.workspaceId,
        sessionDir: body.sessionDir,
        formatId: body.formatId,
        incoming: { sha: body.sha256, size: body.size, versionId: version.id, deviceId, at: nowIso() },
        current: { sha: current.sha, size: current.size, versionId: current.id },
        state: 'open',
        createdAt: nowIso(),
      };
      conflicts.push(conflict);
      await store.save('conflicts', conflicts);
    }

    await store.save('sessions', sessions);
    return { ok: !conflicted, versionId: version.id, current: entry.current, conflict };
  }

  async function route(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const { pathname } = url;
    const method = req.method ?? 'GET';

    if (method === 'GET' && pathname === '/v1/health') {
      return sendJson(res, 200, { ok: true, protocol: PROTOCOL_VERSION, time: nowIso() });
    }

    // ---- 配对 ----
    if (method === 'POST' && pathname === '/v1/pair/new') {
      const body = await readJsonBody(req);
      const ttlMs = Math.min(Math.max(Number(body.ttlMs) || 10 * 60 * 1000, 60_000), 60 * 60 * 1000);
      const pairs = await store.load('pairs', {});
      const code = randomCode(8);
      pairs[code] = { createdAt: nowIso(), expiresAt: new Date(Date.now() + ttlMs).toISOString(), used: false };
      await store.save('pairs', pairs);
      return sendJson(res, 200, { code, expiresAt: pairs[code].expiresAt });
    }

    if (method === 'POST' && pathname === '/v1/pair/claim') {
      const body = await readJsonBody(req);
      const pairs = await store.load('pairs', {});
      const entry = pairs[String(body.code ?? '').toUpperCase()];
      if (!entry) throw httpError(404, 'code not found');
      if (entry.used) throw httpError(409, 'code already used');
      if (entry.expiresAt < nowIso()) throw httpError(410, 'code expired');
      entry.used = true;
      entry.usedAt = nowIso();
      await store.save('pairs', pairs);

      const devices = await store.load('devices', {});
      const deviceId = `dev_${randomToken().slice(0, 12)}`;
      const token = randomToken();
      devices[deviceId] = {
        deviceId,
        name: body.name ?? deviceId,
        os: body.os ?? 'unknown',
        tokenSha256: sha256Hex(token),
        createdAt: nowIso(),
        lastSeenAt: nowIso(),
        revokedAt: null,
      };
      await store.save('devices', devices);
      return sendJson(res, 200, { deviceId, token });
    }

    // ---- 以下都需要设备令牌 ----
    if (method === 'POST' && pathname === '/v1/sync/handshake') {
      const { deviceId } = await requireDevice(req);
      const body = await readJsonBody(req);
      const homes = await store.load('homes', {});
      const now = nowIso();
      for (const home of body.homes ?? []) {
        homes[`${deviceId}:${home.homeId}`] = { deviceId, ...home, seenAt: now };
      }
      await store.save('homes', homes);

      if (body.workspaces && typeof body.workspaces === 'object') {
        const workspaces = await store.load('workspaces', {});
        for (const [sourceId, localPath] of Object.entries(body.workspaces)) {
          workspaces[sourceId] ??= { sourceId, paths: {} };
          workspaces[sourceId].paths[deviceId] = localPath;
        }
        await store.save('workspaces', workspaces);
      }

      return sendJson(res, 200, {
        protocol: PROTOCOL_VERSION,
        compatible: true,
        mode: 'readwrite',
        server: { version: '0.1.0' },
      });
    }

    const indexMatch = /^\/v1\/index\/(workspace|projcache)$/.exec(pathname);
    if (indexMatch) {
      await requireDevice(req);
      const kind = indexMatch[1];
      const name = `index-${kind}`;
      if (method === 'GET') {
        const stored = (await store.load(name, null)) ?? { seq: 0, content: null };
        return sendJson(res, 200, { kind, seq: stored.seq, content: stored.content });
      }
      if (method === 'POST') {
        const body = await readJsonBody(req);
        const stored = (await store.load(name, null)) ?? { seq: 0, content: null };
        const { content, changed } = mergeIndex(kind, stored.content, body.content);
        const seq = changed ? stored.seq + 1 : stored.seq;
        if (changed) await store.save(name, { seq, content, updatedAt: nowIso() });
        return sendJson(res, 200, { kind, seq, content, changed });
      }
    }

    if (method === 'GET' && pathname === '/v1/manifest') {
      await requireDevice(req);
      const sessions = await store.load('sessions', {});
      const items = [];
      for (const entry of Object.values(sessions)) {
        const current = entry.versions.find((v) => v.sha === entry.current);
        if (!current) continue;
        items.push({
          workspaceId: entry.workspaceId,
          sessionDir: entry.sessionDir,
          formatId: entry.formatId,
          size: current.size,
          sha256: current.sha,
          versionId: current.id,
          updatedAt: current.createdAt,
        });
      }
      return sendJson(res, 200, { items });
    }

    if (method === 'POST' && pathname === '/v1/sync/plan') {
      const { deviceId } = await requireDevice(req);
      const body = await readJsonBody(req);
      return sendJson(res, 200, await handlePlan(body, deviceId));
    }

    if (method === 'POST' && pathname === '/v1/sync/commit') {
      const { deviceId } = await requireDevice(req);
      const body = await readJsonBody(req);
      return sendJson(res, 200, await handleCommit(body, deviceId));
    }

    const versionMatch = /^\/v1\/version\/([A-Za-z0-9_]+)$/.exec(pathname);
    if (method === 'GET' && versionMatch) {
      await requireDevice(req);
      const sessions = await store.load('sessions', {});
      for (const entry of Object.values(sessions)) {
        const version = entry.versions.find((v) => v.id === versionMatch[1]);
        if (version) {
          return sendJson(res, 200, {
            versionId: version.id,
            sha: version.sha,
            size: version.size,
            chunks: version.chunks,
            role: version.role,
          });
        }
      }
      throw httpError(404, 'version not found');
    }

    const blobMatch = /^\/v1\/blob\/([0-9a-f]{64})$/.exec(pathname);
    if (blobMatch) {
      await requireDevice(req);
      const hash = blobMatch[1];
      if (method === 'GET') {
        if (!(await store.hasBlob(hash))) throw httpError(404, 'blob not found');
        const buf = await store.getBlob(hash);
        res.writeHead(200, { 'content-type': 'application/octet-stream', 'content-length': buf.length });
        return res.end(buf);
      }
      if (method === 'PUT') {
        const buf = await readBody(req);
        const actual = sha256Hex(buf);
        if (actual !== hash) throw httpError(400, 'chunk hash mismatch');
        await store.putBlob(hash, buf);
        return sendJson(res, 200, { ok: true, hash, size: buf.length });
      }
    }

    if (method === 'GET' && pathname === '/v1/conflicts') {
      await requireDevice(req);
      const conflicts = await store.load('conflicts', []);
      return sendJson(res, 200, { items: conflicts.filter((c) => c.state === 'open') });
    }

    if (method === 'GET' && pathname === '/v1/state') {
      await requireDevice(req);
      const sessions = await store.load('sessions', {});
      return sendJson(res, 200, {
        sessions: Object.keys(sessions).length,
        conflicts: (await store.load('conflicts', [])).filter((c) => c.state === 'open').length,
      });
    }

    throw httpError(404, `no route for ${method} ${pathname}`);
  }

  const server = http.createServer((req, res) => {
    route(req, res).catch((err) => {
      const status = err.status ?? 500;
      if (status >= 500) console.error('[hub]', err);
      sendJson(res, status, { error: err.message });
    });
  });

  await new Promise((resolve) => server.listen(port, host, resolve));
  const address = server.address();
  const url = `http://${host}:${address.port}`;

  return {
    store,
    server,
    url,
    close: () => new Promise((resolve) => server.close(resolve)),
    async stats() {
      const sessions = await store.load('sessions', {});
      const conflicts = await store.load('conflicts', []);
      const versions = Object.values(sessions).reduce((n, s) => n + s.versions.length, 0);
      return { sessions: Object.keys(sessions).length, versions, conflicts: conflicts.length };
    },
  };
}

// 直接运行时：node src/hub/server.mjs
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dataDir = process.env.DSHSYNC_DATA ?? path.resolve('.dshsync-hub');
  const port = Number(process.env.PORT ?? 7788);
  const hub = await createHub({ dataDir, host: process.env.HOST ?? '0.0.0.0', port });
  console.log(`[hub] listening on ${hub.url}  data=${dataDir}`);
}
