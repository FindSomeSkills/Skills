// 页面最后更新时间：按内容真实改动的那一批分配，不要全站写构建日。
export const UPDATED_DEFAULT = '2026-11-12';

export const UPDATED = {
  '': '2026-11-14',
  'sync-hub': '2026-11-13',
  'reference': '2026-11-12',
  'compare/sync-hub-vs-plugins': '2026-11-12',
  'compare/vs-claude-code': '2026-11-12',
  'compare/vs-codex-harness': '2026-11-12',
  'compare/vs-opencode': '2026-11-12',
  'tools/zstd-frame-inspector': '2026-11-13',
  'tools/context-budget': '2026-11-13',
  'tools/session-index-doctor': '2026-11-13',
  'tools/skill-load-audit': '2026-11-13',
  'tools/deai-kit': '2026-11-13',
  'tools/session-purge': '2026-11-14',
  'plugins': '2026-11-14',
  'guides/what-is-deepseek-harness': '2026-11-12',
  'guides/install': '2026-11-12',
  'guides/cli': '2026-11-12',
  'guides/desktop': '2026-11-12',
  'guides/android': '2026-11-12',
  'guides/docker': '2026-11-12',
  'guides/errors': '2026-11-14',
  'guides/errors/messages-transport-failed': '2026-11-14',
  'guides/errors/corepack-command-not-found': '2026-11-14',
  'guides/errors/plugin-incompatible': '2026-11-14',
  'guides/errors/ebadengine': '2026-11-14',
  'guides/errors/host-wildcard-rejected': '2026-11-14',
  'plugins/conflicts': '2026-11-14',
  'plugins/dsh-cordis': '2026-11-14',
  'plugins/dsh-schemastery': '2026-11-14',
  'plugins/dsh-home-paths': '2026-11-14',
  'plugins/dsh-credentials': '2026-11-14',
  'plugins/dsh-client-ui-primitives': '2026-11-14',
};

export function updatedFor(slug) {
  const key = String(slug ?? '').replace(/^zh\/?/, '').replace(/\/$/, '');
  if (UPDATED[key]) return UPDATED[key];
  if (/^plugins\/[^/]+\/[^/]+$/.test(key)) return '2026-11-14'; // 社区插件页：上一轮逐页改写
  if (/^plugins\/[^/]+$/.test(key)) return '2026-11-13'; // 官方包页：更早一批
  return UPDATED_DEFAULT;
}

// 层级权重：首页 1.0、sync-hub 0.9、工具与指南 0.8、插件页 0.5、其余 0.6
export function priorityFor(page) {
  const slug = String(page.slug ?? '').replace(/^zh\/?/, '').replace(/\/$/, '');
  if (slug === '') return '1.0';
  if (slug === 'sync-hub') return '0.9';
  if (slug.startsWith('tools/') || slug.startsWith('guides/')) return '0.8';
  if (slug.startsWith('plugins')) return '0.5';
  return '0.6';
}