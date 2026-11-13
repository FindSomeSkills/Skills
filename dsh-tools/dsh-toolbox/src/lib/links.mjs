// 内链目标：id → 路径与显示名。工具页、Guide、对比页、插件目录共用一份，避免各写一套。
export const TOOL_IDS = ['sync-hub', 'zstd-frame-inspector', 'context-budget', 'session-index-doctor', 'skill-load-audit', 'deai-kit', 'session-purge'];

const TOOL_LABEL = {
  'sync-hub': { en: 'DSH Sync Hub', zh: 'DSH Sync Hub' },
  'zstd-frame-inspector': { en: 'Zstd Frame Inspector', zh: '会话文件帧查看器' },
  'context-budget': { en: 'Context Budget', zh: '上下文预算' },
  'session-index-doctor': { en: 'Session Index Doctor', zh: '会话索引体检' },
  'skill-load-audit': { en: 'Skill Load Audit', zh: '技能开销审计' },
  'session-purge': { en: 'Clean up session files', zh: '清理会话文件' },
  'tools/session-purge': { en: 'Clean up session files', zh: '清理会话文件' },
  'plugins/conflicts': { en: 'The plugin conflict list', zh: '插件冲突清单' },
  'guides/errors': { en: 'Error reference', zh: '报错对照' },
  'deai-kit': { en: 'De-AI Kit', zh: 'De-AI Kit' },
  reference: { en: 'Storage reference', zh: '存储结构参考' },
  plugins: { en: 'Plugin directory', zh: '插件目录' },
  'guides/what-is-deepseek-harness': { en: 'What is DeepSeek Harness', zh: 'DeepSeek Harness 是什么' },
  'guides/install': { en: 'Install DeepSeek Harness', zh: '安装 DeepSeek Harness' },
  'guides/cli': { en: 'dsh CLI cheat sheet', zh: 'dsh 命令速查表' },
  'guides/desktop': { en: 'Desktop vs dsh web', zh: '桌面版与 dsh web' },
  'guides/android': { en: 'On Android', zh: '在安卓上用' },
  'guides/docker': { en: 'In Docker', zh: '用 Docker 跑' },
  'compare/vs-claude-code': { en: 'vs Claude Code', zh: '对比 Claude Code' },
  'compare/vs-codex-harness': { en: 'vs Codex CLI', zh: '对比 Codex CLI' },
  'compare/vs-opencode': { en: 'vs OpenCode', zh: '对比 OpenCode' },
  'compare/sync-hub-vs-plugins': { en: 'Sync Hub vs plugins', zh: 'Sync Hub 与插件对比' },
};

export function linkFor(id, lang) {
  const prefix = lang === 'zh' ? '/zh' : '';
  const label = TOOL_LABEL[id]?.[lang] ?? id;
  if (TOOL_IDS.includes(id)) {
    return { href: id === 'sync-hub' ? `${prefix}/sync-hub/` : `${prefix}/tools/${id}/`, label };
  }
  if (id === 'reference') return { href: `${prefix}/reference/`, label };
  if (id === 'plugins') return { href: `${prefix}/plugins/`, label };
  return { href: `${prefix}/${id}/`, label };
}

export function pluginLink(slug, lang) {
  const prefix = lang === 'zh' ? '/zh' : '';
  return `${prefix}/plugins/${slug}/`;
}
