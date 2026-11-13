// 社区插件页的 FAQ 与增量正文。数据来源：npm 元数据（peers、engines.dsh）与冲突页的成对记录。
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

// 界面位置：句子以位置开头，不再用「界面上」
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
        en: `It patches ${GROUP_SURFACE[page.group]?.en ?? 'a row in the profile'} through \`dsh plugin add\`. Before adding a second plugin that touches the same surface, run \`dsh --profile web --dump-config\` and look for the row it would take over.`,
        zh: `它通过 \`dsh plugin add\` 接管${GROUP_SURFACE[page.group]?.zh ?? 'profile 里的一行'}。再装第二个动同一处的插件之前，先跑 \`dsh --profile web --dump-config\`，看它要接管的那行是否已经存在。`,
      };

  const q2 = range
    ? { en: 'Which dsh versions load it, and what happens outside that window?', zh: '哪些 dsh 版本会加载它，区间外会怎样？' }
    : { en: 'What happens when dsh upgrades?', zh: 'dsh 升级之后会怎样？' };
  const a2 = range
    ? {
        en: `\`engines.dsh\` is \`${range}\`. Outside it the CLI skips the plugin at boot and prints the requirement; \`dsh plugin allow-version <package>\` overrides it if you accept the risk.`,
        zh: `\`engines.dsh\` 声明的是 \`${range}\`。超出这个区间时，启动会跳过它并打印要求的版本；愿意担风险就用 \`dsh plugin allow-version <包名>\` 放行。`,
      }
    : {
        en: `\`${pkg}\` declares no \`engines.dsh\`, so every dsh version loads it and nothing pre-checks an upgrade. Check the repository before a major bump.`,
        zh: `\`${pkg}\` 没有声明 \`engines.dsh\`，任何版本都会加载，升级时也没有检查。大版本升级前先看仓库。`,
      };

  return [
    { en: { q: q1.en, a: a1.en }, zh: { q: q1.zh, a: a1.zh } },
    { en: { q: q2.en, a: a2.en }, zh: { q: q2.zh, a: a2.zh } },
  ];
}

export function sectionsFor(page, peerNames, group, pkg) {
  const surface = GROUP_SURFACE[group] ?? { en: 'a new panel', zh: '一个新面板' };
  const where = GROUP_LOCATION[group] ?? { en: 'the web client', zh: '网页客户端' };
  const firstPeer = peerNames.find((p) => !/client-ui-(theme|primitives|slots|locale)/.test(p)) ?? peerNames[0] ?? '';
  const storagePeer = peerNames.find((p) => /dsh-settings|dsh-storage-domain|dsh-home-paths|dsh-credentials/.test(p)) ?? '';

  const afterEn = firstPeer
    ? `It patches \`${firstPeer}\`; ${where.en} gains ${surface.en}. Nothing is added to the CLI output — \`dsh --profile web --dump-config\` shows the row, and the client shows the surface after a reload.`
    : `It adds a row named \`${pkg}\`; ${where.en} gains ${surface.en}. \`dsh --profile web --dump-config\` shows the row, and the client shows the surface after a reload.`;
  const afterZh = firstPeer
    ? `它改的是 \`${firstPeer}\`；${where.zh}多出${surface.zh}。命令行输出不变——\`dsh --profile web --dump-config\` 能看到这一行，客户端刷新后出现这块界面。`
    : `它新增一行 \`${pkg}\`；${where.zh}多出${surface.zh}。\`dsh --profile web --dump-config\` 能看到这一行，客户端刷新后出现这块界面。`;

  const rangeEn = page.compat
    ? `Before installing, run \`dsh --version\` and compare it with the declared window. Outside that window the CLI skips the package at boot and prints the requirement instead of starting a combination it cannot vouch for.`
    : `No window is declared to compare against: \`dsh --version\` tells you what you are running, and nothing checks whether this package matches it.`;
  const rangeZh = page.compat
    ? `装之前先跑 \`dsh --version\`，和声明的区间对一下。不在区间内时，启动会跳过这个包并打印它要求的版本，而不是带着一个它担保不了的组合跑起来。`
    : `没有声明区间可比：\`dsh --version\` 只能告诉你自己在跑哪个版本，没有任何检查会告诉你这个包配不配它。`;

  const filesEn = storagePeer
    ? `It peers \`${storagePeer}\`, so whatever it persists goes through that service and lands under \`$DSH_HOME\`. The dependency itself is one line in \`$DSH_HOME/profiles/<name>/package.json\`, written by \`dsh plugin add ${pkg}\`.`
    : `The manifest declares no storage peer, so the only file it is guaranteed to touch is the \`${pkg}\` dependency line in \`$DSH_HOME/profiles/<name>/package.json\`. Any other state belongs to the surface it patches; the package description names no path.`;
  const filesZh = storagePeer
    ? `它 peer 了 \`${storagePeer}\`，所以存下来的东西走那个服务、落在 \`$DSH_HOME\` 下。依赖本身只有一行，写在 \`$DSH_HOME/profiles/<名字>/package.json\`，由 \`dsh plugin add ${pkg}\` 写入。`
    : `清单里没有声明存储相关的 peer，所以唯一确定会碰到的文件是 \`$DSH_HOME/profiles/<名字>/package.json\` 里 \`${pkg}\` 那一行依赖。其余状态属于它改的那块界面；包说明里没有写路径。`;

  const removeEn = `Removing it is the mirror command: \`dsh plugin --profile web remove ${pkg}\`. That drops the dependency line and the surface it added; anything the plugin stored under \`$DSH_HOME\` stays where it is and has to be deleted by hand.`;
  const removeZh = `卸载是对称的那条命令：\`dsh plugin --profile web remove ${pkg}\`。它会去掉依赖行和它加的那块界面；插件存在 \`$DSH_HOME\` 下的东西不会跟着消失，得自己删。`;

  return [
    { h: 'After install', zhH: '装完会看到什么', p: [afterEn], zhP: [afterZh] },
    { h: 'Files it touches', zhH: '它读写的文件', p: [filesEn], zhP: [filesZh] },
    { h: 'Checking the version window', zhH: '怎么对版本', p: [rangeEn], zhP: [rangeZh] },
    { h: 'Removing it', zhH: '怎么卸掉', p: [removeEn], zhP: [removeZh] },
  ];
}
