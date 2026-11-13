// 8 行 What you see 的症状改写：只描述屏幕上看到的现象，不写机制。
// 键按 Package A|Package B 原样（与 content-conflicts-page.mjs 的 P() 顺序一致），渲染时覆盖。
export const SYMPTOM_OVERRIDE = {
  'dsh-free-search|@liustack/modsearch': {
    en: 'Ask the same question twice and the answers come from different search engines, with no way for you to say which one.',
    zh: '同一个问题问两次，答案来自不同的搜索引擎，你也没法指定用哪个。',
  },
  '@nanmicoder/dsh-agent-teams|dsh-agent-compare': {
    en: 'Install the second one and the button the first plugin added is simply gone.',
    zh: '装完第二个，第一个插件加的那个按钮就不见了。',
  },
  'dsh-octop-memory|dsh-mnemon': {
    en: 'The agent brings up a memory you have no recollection of, or two plugins\' memories contradict each other in the same answer.',
    zh: 'agent 会引用一条你完全没印象的旧记忆，或者两个插件的记忆在同一条回答里互相打架。',
  },
  'dsh-skill-browser|dsh-toomuch-plugins': {
    en: 'After you install it the plugin\'s panel looks like it never arrived — the entry is there but clicking it goes nowhere.',
    zh: '装完之后那个插件的面板像没装，入口点不进去。',
  },

  'dshmarket|universal-plugin-hub': {
    en: 'Install a plugin from one of the two, then look at the list: the entry you just added is gone, or the count is one short.',
    zh: '从其中一个装完插件，回到列表一看：刚装的那个不见了，或者总数少一个。',
  },
  'dsh-better-plugin-updater|dshmarket': {
    en: 'You plan an update in one screen; after installing something in the other, that plugin is back on the old version.',
    zh: '在一个界面里规划好更新，另一个界面装完东西再回去看，那个插件又变回旧版本。',
  },
  '@mzzsfy/dsh-tool-gate|@logictan/dsh-tool-surface': {
    en: 'The agent can call fewer tools than either plugin promised you — some you enabled never show up in a run.',
    zh: 'agent 能调的工具比这两个插件各自承诺的都少，你明明开了的几个，跑起来根本没出现。',
  },
  '@michengai/dsh-archive-manager|dsh-session-superagent': {
    en: 'An archived session reappears in the list, or a session you expected to see is missing entirely.',
    zh: '归档过的会话又回到列表里，或者你预期会看到的一个会话干脆不显示。',
  },
  '@michengai/dsh-skills-manager|dsh-univer-office': {
    en: 'The skill list shows fewer skills than you installed — the ones from one of the two are gone.',
    zh: '技能清单里的条目比你装的少，其中一个插件的技能不见了。',
  },
  '@aiwayds/dsh-llm-proxy|dsh-providers-hub': {
    en: 'Calls from one provider go out without passing the proxy, so your split routing silently stops applying to them.',
    zh: '某个服务商的请求没走代理就出去了，你的分流对它们悄悄失效。',
  },
  'dsh-tool-database|@mzzsfy/dsh-tool-gate': {
    en: 'The database tools never appear in a run, even though the plugin says it installed fine.',
    zh: '数据库工具在跑的时候根本不出现，虽然插件那边显示装好了。',
  },
  'dsh-dream-skin|dsh-claude-style': {
    en: 'Both restyle the same components. You get one look, and changing the theme in settings only moves part of the page.',
    zh: '两个都在改同一批组件。你只会看到一个外观，而且在设置里换主题时只有一部分界面跟着变。',
  },
};
