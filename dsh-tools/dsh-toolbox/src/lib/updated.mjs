// 页面最后更新时间。改动过的页面用当天日期；新增页面同理。
export const UPDATED_DEFAULT = '2026-11-14';

export const UPDATED = {
  '': '2026-11-14',
  'sync-hub': '2026-11-14',
  'reference': '2026-11-14',
  'compare/sync-hub-vs-plugins': '2026-11-14',
  'tools/zstd-frame-inspector': '2026-11-14',
  'tools/context-budget': '2026-11-14',
  'tools/session-index-doctor': '2026-11-14',
  'tools/skill-load-audit': '2026-11-14',
  'tools/deai-kit': '2026-11-14',
  'plugins': '2026-11-14',
  'guides/what-is-deepseek-harness': '2026-11-14',
  'guides/install': '2026-11-14',
  'guides/cli': '2026-11-14',
  'guides/desktop': '2026-11-14',
  'guides/android': '2026-11-14',
  'guides/docker': '2026-11-14',
  'compare/vs-claude-code': '2026-11-14',
  'compare/vs-codex-harness': '2026-11-14',
  'compare/vs-opencode': '2026-11-14',
};

export function updatedFor(slug) {
  const key = String(slug ?? '').replace(/^zh\/?/, '').replace(/\/$/, '');
  return UPDATED[key] ?? UPDATED_DEFAULT;
}
