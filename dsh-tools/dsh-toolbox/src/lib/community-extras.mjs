// 社区插件页的 FAQ 与增量正文。逐包生成，句子里带包名，避免跨页逐字重复。
const GROUP_SURFACE = {
  'find-plugins': { en: 'a plugin browser', zh: '插件浏览入口' },
  cost: { en: 'a spend readout', zh: '花费读数' },
  sessions: { en: 'archive, restore and delete actions', zh: '归档、恢复、删除三个操作' },
  skills: { en: 'a skill list with toggles', zh: '带开关的技能列表' },
  search: { en: 'a search tool', zh: '一个搜索工具' },
  appearance: { en: 'a theme and background picker', zh: '主题与背景选择' },
  agents: { en: 'agent controls', zh: 'agent 编排控件' },
  remote: { en: 'a remote entry point', zh: '远程入口' },
  output: { en: 'a renderer for answer blocks', zh: '回答块的渲染器' },
  system: { en: 'a new callable tool', zh: '一个新的可调用工具' },
  providers: { en: 'an account list', zh: '账号列表' },
  data: { en: 'a data-access tool', zh: '一个数据访问工具' },
  network: { en: 'a proxy entry under model calls', zh: '模型调用下面的代理入口' },
  memory: { en: 'a recalled-memory block', zh: '召回记忆块' },
  automation: { en: 'scheduled run entries', zh: '定时任务入口' },
  devtools: { en: 'a git or editor tab', zh: 'git 或编辑器标签页' },
};

const GROUP_LOCATION = {
  'find-plugins': { en: 'the left sidebar', zh: '左侧栏' },
  cost: { en: 'the session header', zh: '会话头部' },
  sessions: { en: 'each row of the session list', zh: '会话列表的每一行' },
  skills: { en: 'the skills panel in the sidebar', zh: '侧栏的技能面板' },
  search: { en: 'the tool list', zh: '工具清单' },
  appearance: { en: 'the settings page', zh: '设置页' },
  agents: { en: 'the composer toolbar', zh: '输入框工具栏' },
  remote: { en: 'the profile a client connects to', zh: '客户端要连的那个 profile' },
  output: { en: 'conversation replies', zh: '对话回复区' },
  system: { en: 'the tool list', zh: '工具清单' },
  providers: { en: 'the settings page', zh: '设置页' },
  data: { en: 'the tool list', zh: '工具清单' },
  network: { en: 'the model request path', zh: '模型请求链路上' },
  memory: { en: 'the context sent with every turn', zh: '每轮发出的上下文里' },
  automation: { en: 'the sidebar', zh: '侧栏' },
  devtools: { en: 'the tab strip above the conversation', zh: '对话上方的标签栏' },
};

export function faqFor(page, pair, pkg) {
  const range = page.compat ?? '';
  const q1 = pair
    ? { en: `Does it collide with ${pair.other}?`, zh: `它和 ${pair.other} 会打架吗？` }
    : { en: 'What does it hook into, and how do I check that slot is free?', zh: '它挂在哪一行，怎么确认那一行没被占？' };

  const a1 = pair
    ? { en: `Keep ${pair.keep}. ${pair.why}`, zh: `留 ${pair.keep}。${pair.whyZh}` }
    : {
        en: `Its manifest names no community counterpart, so the check is manual: after \`dsh plugin add ${pkg}\`, run \`dsh --profile web --dump-config\` and look for two rows claiming the same slot.`,
        zh: `它的清单里没有点名对撞的社区插件，只能手工核：装好 \`${pkg}\` 之后跑 \`dsh --profile web --dump-config\`，看有没有两行抢同一个位置。`,
      };

  const q2 = range
    ? { en: 'Which dsh versions load it, and what happens outside that window?', zh: '哪些 dsh 版本会加载它，区间外会怎样？' }
    : { en: 'What happens when dsh upgrades?', zh: 'dsh 升级之后会怎样？' };
  const a2 = range
    ? {
        en: `On \`${range}\` the CLI loads \`${pkg}\`; outside it, boot stops with the requirement instead of running the plugin. \`dsh plugin allow-version <package>\` is the override if you accept the risk.`,
        zh: `在 \`${range}\` 里，命令行会加载 \`${pkg}\`；超出这个范围时启动会停下并打印要求，不会带着它跑。愿意担风险就用 \`dsh plugin allow-version <包名>\` 放行。`,
      }
    : {
        en: `Nothing declares a version window for \`${pkg}\`: \`dsh --version\` tells you what you are running, and no check will tell you whether \`${pkg}\` matches it.`,
        zh: `\`${pkg}\` 没有声明版本区间：\`dsh --version\` 只能告诉你自己在跑哪个版本，没有任何检查会告诉你 \`${pkg}\` 配不配它。`,
      };

  return [
    { en: { q: q1.en, a: a1.en }, zh: { q: q1.zh, a: a1.zh } },
    { en: { q: q2.en, a: a2.en }, zh: { q: q2.zh, a: a2.zh } },
  ];
}

export function sectionsFor(page, peerNames, group, pkg) {
  const surface = GROUP_SURFACE[group] ?? { en: 'a new panel', zh: '一个新面板' };
  const where = GROUP_LOCATION[group] ?? { en: 'the web client', zh: '网页客户端' };
  const peer = peerNames[0] ?? '';
  const internal = peerNames.find((p) => !/client-ui-(theme|primitives|slots|locale)/.test(p)) ?? peer;
  const storagePeer = peerNames.find((p) => /dsh-settings|dsh-storage-domain|dsh-home-paths|dsh-credentials/.test(p)) ?? '';

  // 不声称 patch 谁：只说从哪个 peer 拿到东西，装完在哪儿多出什么
  const afterEn = internal
    ? `It declares \`${internal}\` as a peer and renders ${surface.en} in ${where.en}; after \`dsh plugin add ${pkg}\`, \`dsh --profile web --dump-config\` lists the row that mounts it.`
    : `It declares no dsh peer and renders ${surface.en} in ${where.en}; after \`dsh plugin add ${pkg}\`, \`dsh --profile web --dump-config\` lists the \`${pkg}\` row that mounts it.`;
  const afterZh = internal
    ? `它把 \`${internal}\` 声明成 peer，在${where.zh}渲染${surface.zh}；装完 \`dsh plugin add ${pkg}\`，\`dsh --profile web --dump-config\` 能列出挂载它的那一行。`
    : `它没有声明 dsh peer，在${where.zh}渲染${surface.zh}；装完 \`dsh plugin add ${pkg}\`，\`dsh --profile web --dump-config\` 能列出挂载它的 \`${pkg}\` 那一行。`;

  const filesEn = storagePeer
    ? `It declares \`${storagePeer}\` as a peer, so what it persists is routed through that service under \`$DSH_HOME\`. The dependency itself is one line in \`$DSH_HOME/profiles/<name>/package.json\`, written by \`dsh plugin add ${pkg}\`.`
    : `No storage peer appears in the manifest of \`${pkg}\`, so the dependency line in \`$DSH_HOME/profiles/<name>/package.json\` is the only file you can point at; the package description names nothing else.`;
  const filesZh = storagePeer
    ? `它把 \`${storagePeer}\` 声明成 peer，落盘的东西走那个服务、存在 \`$DSH_HOME\` 下。依赖本身只有一行，在 \`$DSH_HOME/profiles/<名字>/package.json\`，由 \`dsh plugin add ${pkg}\` 写入。`
    : `\`${pkg}\` 的清单里没有存储相关的 peer，所以能指认的文件只有 \`$DSH_HOME/profiles/<名字>/package.json\` 里那一行依赖；包说明里没写别的。`;

  const removeEn = `Removing \`${pkg}\` is the mirror command, \`dsh plugin --profile web remove ${pkg}\`; the surface goes with it, and anything it stored under \`$DSH_HOME\` stays until you delete it.`;
  const removeZh = `卸掉 \`${pkg}\` 用对称的那条命令 \`dsh plugin --profile web remove ${pkg}\`；它加的那块界面跟着消失，存在 \`$DSH_HOME\` 下的东西留着，得自己删。`;

  return [
    { h: 'After install', zhH: '装完会看到什么', p: [afterEn], zhP: [afterZh] },
    { h: 'Files it touches', zhH: '它读写的文件', p: [filesEn], zhP: [filesZh] },
    { h: 'Removing it', zhH: '怎么卸掉', p: [removeEn], zhP: [removeZh] },
  ];
}
