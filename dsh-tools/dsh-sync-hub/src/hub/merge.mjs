// 索引语义合并。绝不做整文件 last-write-wins（那会丢会话 = 会话在列表里消失）。
//
// 两类索引的合并规则不同：
//   workspace.json   —— 集合字段并集；path 属设备本地，永远 local 优先；时间戳取极值
//   session_projcache —— 行级 {ver, seq, val}，按 (ver, seq) 大者胜

function unionList(...lists) {
  const seen = new Set();
  const out = [];
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

function minIso(a, b) {
  if (!a) return b ?? null;
  if (!b) return a;
  return a <= b ? a : b;
}

function maxIso(a, b) {
  if (!a) return b ?? null;
  if (!b) return a;
  return a >= b ? a : b;
}

export function mergeWorkspaceJson(local, remote) {
  const base = local && typeof local === 'object' ? structuredClone(local) : { unit: { name: 'workspace', version: 2 }, global: {}, tables: { workspaces: {} } };
  if (!base.unit) base.unit = structuredClone(remote?.unit ?? { name: 'workspace', version: 2 });
  if (!base.global) base.global = {};
  if (!base.tables) base.tables = {};
  if (!base.tables.workspaces) base.tables.workspaces = {};

  const rGlobal = remote?.global ?? {};
  base.global.initialized = Boolean(base.global.initialized || rGlobal.initialized);
  base.global.workspaceIds = unionList(base.global.workspaceIds, rGlobal.workspaceIds);
  base.global.archivedSessionIds = unionList(base.global.archivedSessionIds, rGlobal.archivedSessionIds);
  base.global.pinnedSessionIds = unionList(base.global.pinnedSessionIds, rGlobal.pinnedSessionIds);

  const rWorkspaces = remote?.tables?.workspaces ?? {};
  for (const [wid, rws] of Object.entries(rWorkspaces)) {
    const lws = base.tables.workspaces[wid];
    if (!lws) {
      // 远端独有：先照搬（path 是远端的，调用方决定是否本地化）
      base.tables.workspaces[wid] = structuredClone(rws);
      if (!base.global.workspaceIds.includes(wid)) base.global.workspaceIds.push(wid);
      continue;
    }
    const merged = { ...lws };
    merged.sessionIds = unionList(lws.sessionIds, rws.sessionIds);
    merged.createdAt = minIso(lws.createdAt, rws.createdAt);
    merged.updatedAt = maxIso(lws.updatedAt, rws.updatedAt);
    // path / title 本地优先：缺失时才用远端的
    merged.path = lws.path || rws.path;
    merged.title = lws.title || rws.title;
    // 未知字段：远端独有的一并保留（fail-open 只在“新增字段”这种无损情况）
    for (const [k, v] of Object.entries(rws)) {
      if (!(k in merged)) merged[k] = structuredClone(v);
    }
    base.tables.workspaces[wid] = merged;
  }
  return base;
}

function betterRow(a, b) {
  const av = a?.ver ?? 0;
  const bv = b?.ver ?? 0;
  if (av !== bv) return av > bv ? a : b;
  const as = a?.seq ?? 0;
  const bs = b?.seq ?? 0;
  return as >= bs ? a : b;
}

export function mergeProjcache(local, remote) {
  const base = local && typeof local === 'object' ? structuredClone(local) : { unit: { name: 'session_projcache', version: 3 }, global: null, tables: { sessions: {} } };
  if (!base.tables) base.tables = {};
  if (!base.tables.sessions) base.tables.sessions = {};

  const rSessions = remote?.tables?.sessions ?? {};
  for (const [sid, rrow] of Object.entries(rSessions)) {
    const lrow = base.tables.sessions[sid];
    if (!lrow) {
      base.tables.sessions[sid] = structuredClone(rrow);
      continue;
    }
    const merged = { ...lrow };
    if (!merged.identity && rrow.identity) merged.identity = structuredClone(rrow.identity);
    const lRows = lrow.rows ?? {};
    const rRows = rrow.rows ?? {};
    const rows = { ...lRows };
    for (const [field, rval] of Object.entries(rRows)) {
      rows[field] = field in lRows ? betterRow(lRows[field], rval) : structuredClone(rval);
    }
    merged.rows = rows;
    for (const [k, v] of Object.entries(rrow)) {
      if (!(k in merged)) merged[k] = structuredClone(v);
    }
    base.tables.sessions[sid] = merged;
  }
  return base;
}

export const MERGERS = {
  workspace: mergeWorkspaceJson,
  projcache: mergeProjcache,
};

export function mergeIndex(kind, local, remote) {
  const fn = MERGERS[kind];
  if (!fn) throw new Error(`unknown index kind: ${kind}`);
  const merged = fn(local, remote);
  const changed = JSON.stringify(merged) !== JSON.stringify(local ?? null);
  return { content: merged, changed };
}
