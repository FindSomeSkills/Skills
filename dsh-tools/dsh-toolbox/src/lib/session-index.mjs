// 会话索引体检：纯逻辑，不读会话负载，只看「索引 vs 目录」是否对得上。
// 输入是【文件清单】（路径 + 大小）加两份索引 JSON 的文本。

/** 把 <input webkitdirectory> 的 fileList 归一成清单 */
export function buildInventory(files) {
  const payloads = [];
  const indexFiles = new Map();
  const perSessionProj = new Set();
  let payloadBytes = 0;

  for (const file of files) {
    const path = (file.webkitRelativePath || file.name || '').replace(/\\/g, '/');
    // 索引文件：任意深度的 storages/<name>.json
    const idx = /(^|\/)storages\/(workspace|session_projcache)\.json$/.exec(path);
    if (idx) {
      indexFiles.set(idx[2], file);
      continue;
    }
    // 逐会话 projcache：storages/session_projcache/sessions/<id>.json
    const pj = /(^|\/)storages\/session_projcache\/sessions\/(.+)\.json$/i.exec(path);
    if (pj) {
      perSessionProj.add(pj[2]);
      continue;
    }
    // 负载：sessions/<slug>/<sessionId>/session*.jsonl.zstd
    const m = /(^|\/)sessions\/([^/]+)\/([^/]+)\/(session[^/]*\.jsonl\.zstd)$/.exec(path);
    if (!m) continue;
    const format = m[4] === 'session.v4.jsonl.zstd' ? 'v4' : 'legacy';
    payloads.push({ slug: m[2], sessionId: m[3], file: m[4], format, size: file.size ?? 0, path });
    payloadBytes += file.size ?? 0;
  }

  return { payloads, indexFiles, perSessionProj, payloadBytes };
}

export function safeParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const MAX_ITEMS = 40;

function cap(items) {
  return items.slice(0, MAX_ITEMS);
}

/**
 * @param {{payloads: Array, payloadBytes: number}} inventory
 * @param {{workspace?: any, projcache?: any}} indexes
 */
export function diagnose(inventory, indexes) {
  const { payloads } = inventory;
  const ws = indexes.workspace;
  const pc = indexes.projcache;

  const workspaces = ws?.tables?.workspaces ?? {};
  const wsIds = Object.keys(workspaces);
  const listed = new Set();
  for (const row of Object.values(workspaces)) {
    for (const id of row?.sessionIds ?? []) listed.add(id);
  }
  const archived = new Set(ws?.global?.archivedSessionIds ?? []);
  const pinned = new Set(ws?.global?.pinnedSessionIds ?? []);
  const projSessions = pc?.tables?.sessions ?? {};
  // DSH 同时用聚合表与逐会话文件保存 projcache；两者都算「有标题」
  const perProj = inventory.perSessionProj ?? new Set();
  const hasRow = (id) => Boolean(projSessions[id]) || perProj.has(id);
  const allRowIds = [...new Set([...Object.keys(projSessions), ...perProj])];

  const bySession = new Map();
  for (const p of payloads) {
    const entry = bySession.get(p.sessionId) ?? { sessionId: p.sessionId, slug: p.slug, formats: [], size: 0 };
    entry.formats.push(p.format);
    entry.size += p.size;
    bySession.set(p.sessionId, entry);
  }

  const issues = [];

  // 1. 有负载，但索引里没有 → 列表里看不见
  const orphanPayload = [...bySession.values()].filter((s) => !listed.has(s.sessionId));
  if (orphanPayload.length) {
    issues.push({
      id: 'payload-not-listed',
      severity: 'error',
      title: 'Payload on disk, missing from the session list',
      count: orphanPayload.length,
      detail:
        'This is the classic "my session file is there but DSH does not show it" case: the payload exists, but workspace.json never learned the session id.',
      items: cap(orphanPayload.map((s) => `${s.sessionId}  (${s.formats.join('+')}, ${s.size} B)`)),
      fix: 'Add each session id to the matching workspace entry in storages/workspace.json (workspaceId → tables.workspaces[id].sessionIds).',
    });
  }

  // 2. 索引里有，但磁盘没有 → 幽灵条目（点开报错）
  const ghostListed = [...listed].filter((id) => !bySession.has(id));
  if (ghostListed.length) {
    issues.push({
      id: 'listed-no-payload',
      severity: 'warn',
      title: 'Listed in the index, no payload on disk',
      count: ghostListed.length,
      detail: 'These entries open into nothing. Usually a side effect of a restored index or a half-copied folder.',
      items: cap(ghostListed.map((id) => id)),
      fix: 'Remove these ids from sessionIds, or restore the missing session folder.',
    });
  }

  // 3. 有负载，但没有 projcache 记录 → 列表里没标题
  const noTitle = [...bySession.values()].filter((s) => !hasRow(s.sessionId));
  if (noTitle.length) {
    issues.push({
      id: 'no-projcache-row',
      severity: 'warn',
      title: 'No title: payload exists without a projcache row',
      count: noTitle.length,
      detail: 'Titles and turn stats live in session_projcache.json, not in the workspace index. Missing rows show up untitled.',
      items: cap(noTitle.map((s) => s.sessionId)),
      fix: 'Sync storages/session_projcache.json alongside sessions, or let DSH rebuild the row by opening the session once.',
    });
  }

  // 4. projcache 有行，但磁盘没负载 → 统计在，内容没了
  const ghostProj = allRowIds.filter((id) => !bySession.has(id));
  if (ghostProj.length) {
    issues.push({
      id: 'projcache-no-payload',
      severity: 'info',
      title: 'Projcache row without a payload',
      count: ghostProj.length,
      detail: 'Harmless until DSH tries to open one. Then it fails silently or errors.',
      items: cap(ghostProj),
      fix: 'Drop the stale row, or restore the payload folder.',
    });
  }

  // 5. 同一会话目录两种格式并存 → 版本混用信号
  const mixed = [...bySession.values()].filter((s) => new Set(s.formats).size > 1);
  if (mixed.length) {
    issues.push({
      id: 'mixed-format',
      severity: 'warn',
      title: 'Both session formats in one folder',
      count: mixed.length,
      detail: 'v4 and legacy payloads side by side. DSH picks one; the other keeps growing or goes stale. Sync tools must treat them separately.',
      items: cap(mixed.map((s) => `${s.sessionId}  (${s.formats.join(' + ')})`)),
      fix: 'Decide which build you use, then drop the other payload once you no longer need the old one.',
    });
  }

  // 6. 已归档，但负载还在，且还挂在 sessionIds 上 → 归档没生效
  const archivedButListed = [...archived].filter((id) => listed.has(id));
  if (archivedButListed.length) {
    issues.push({
      id: 'archived-but-listed',
      severity: 'info',
      title: 'Archived and still in the active list',
      count: archivedButListed.length,
      detail: 'archivedSessionIds should not also appear in a workspace sessionIds array.',
      items: cap(archivedButListed),
      fix: 'Remove the id from sessionIds; keep it in archivedSessionIds.',
    });
  }

  // 7. 归档了但负载还在（占用空间，不一定是问题）
  const archivedWithPayload = [...archived].filter((id) => bySession.has(id));
  if (archivedWithPayload.length) {
    const bytes = archivedWithPayload.reduce((n, id) => n + (bySession.get(id)?.size ?? 0), 0);
    issues.push({
      id: 'archived-with-payload',
      severity: 'info',
      title: 'Archived sessions still take disk space',
      count: archivedWithPayload.length,
      detail: 'Archiving hides a session; it does not delete it. Useful to know before you go hunting for space.',
      items: cap(archivedWithPayload.map((id) => `${id}  (${bySession.get(id)?.size ?? 0} B)`)),
      fix: 'Nothing to fix. Delete the folder only if you are sure you will never reopen it.',
    });
  }

  // 8. 置顶但不在列表 → 置顶无效
  const pinnedNotListed = [...pinned].filter((id) => !listed.has(id));
  if (pinnedNotListed.length) {
    issues.push({
      id: 'pinned-not-listed',
      severity: 'info',
      title: 'Pinned, but not in any workspace list',
      count: pinnedNotListed.length,
      detail: 'A pin on a session that is not listed does nothing visible.',
      items: cap(pinnedNotListed),
      fix: 'Re-add the session id to its workspace, or drop the pin.',
    });
  }

  const severityRank = { error: 0, warn: 1, info: 2 };
  issues.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

  const formatCount = payloads.reduce((acc, p) => {
    acc[p.format] = (acc[p.format] ?? 0) + 1;
    return acc;
  }, {});

  return {
    summary: {
      workspaces: wsIds.length,
      sessionsOnDisk: bySession.size,
      payloads: payloads.length,
      bytes: inventory.payloadBytes,
      listed: listed.size,
      archived: archived.size,
      pinned: pinned.size,
      projcacheRows: allRowIds.length,
      formats: formatCount,
      issues: issues.length,
      errors: issues.filter((i) => i.severity === 'error').length,
    },
    issues,
    health: issues.some((i) => i.severity === 'error')
      ? 'broken'
      : issues.some((i) => i.severity === 'warn')
        ? 'degraded'
        : 'clean',
  };
}
