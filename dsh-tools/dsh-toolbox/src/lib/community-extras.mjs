// 社区插件页的 FAQ 与两段增量正文。数据来源：npm 元数据（peers、engines.dsh）与冲突页的成对记录。
const GROUP_SURFACE = {
  'find-plugins': { en: 'a plugin browser or market entry in the web client', zh: '网页客户端里的插件浏览入口' },
  cost: { en: 'a spend readout in the web client', zh: '网页客户端里的花费读数' },
  sessions: { en: 'actions on the session list (archive, restore, delete)', zh: '会话列表上的操作（归档、恢复、删除）' },
  skills: { en: 'a skill panel listing what is installed', zh: '列出已装技能的面板' },
  search: { en: 'a web-search tool in the tool set', zh: '工具集里的联网搜索工具' },
  appearance: { en: 'a theme, background or overlay in the web client', zh: '网页客户端的主题、背景或浮层' },
  agents: { en: 'agent orchestration controls in the chat surface', zh: '对话界面上的 agent 编排控件' },
  remote: { en: 'a second route into the same runtime', zh: '进入同一套运行时的第二条路' },
  output: { en: 'a renderer that turns answers into blocks', zh: '把回答渲染成块的渲染器' },
  system: { en: 'tools the agent can call, or a shell behaviour', zh: 'agent 能调用的工具或 shell 行为' },
  providers: { en: 'provider account management in settings', zh: '设置里的服务商账号管理' },
  data: { en: 'tools that read external data', zh: '读取外部数据的工具' },
  network: { en: 'a proxy layer under the model calls', zh: '模型调用下面的一层代理' },
  memory: { en: 'a context block injected before each turn', zh: '每轮之前注入的一段上下文' },
  automation: { en: 'scheduled runs that write files on their own', zh: '按计划自己跑、自己写文件的任务' },
  devtools: { en: 'a tab or command for git and editing', zh: '给 git 与编辑用的标签页或命令' },
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
        zh: `\`engines.dsh\` 是 \`${range}\`。超出范围时启动会跳过并打印要求；愿意担风险就用 \`dsh plugin allow-version <包名>\` 放行。`,
      }
    : {
        en: `\`${pkg}\` declares no \`engines.dsh\`, so every dsh version loads it and nothing pre-checks an upgrade. Check the repository before a major bump.`,
        zh: `\`${pkg}\` 没有声明 \`engines.dsh\`，任何版本都会加载，升级时也没有检查。大版本升级前看仓库。`,
      };

  return [
    { en: { q: q1.en, a: a1.en }, zh: { q: q1.zh, a: a1.zh } },
    { en: { q: q2.en, a: a2.en }, zh: { q: q2.zh, a: a2.zh } },
  ];
}

export function sectionsFor(page, peerNames, group, pkg) {
  const surface = GROUP_SURFACE[group] ?? { en: 'a change in the web client', zh: '网页客户端里的一处变化' };
  const firstPeer = peerNames.find((p) => !/client-ui-(theme|primitives|slots|locale)/.test(p)) ?? peerNames[0] ?? '';
  const storagePeer = peerNames.find((p) => /dsh-settings|dsh-storage-domain|dsh-home-paths|dsh-credentials/.test(p)) ?? '';

  const afterEn = firstPeer
    ? `The profile gains a \`${pkg}\` row that patches \`${firstPeer}\`, and the web client gains ${surface.en}. \`dsh --profile web --dump-config\` shows that row; the CLI grows no new subcommand.`
    : `The profile gains a \`${pkg}\` row and the web client gains ${surface.en}. \`dsh --profile web --dump-config\` shows the row; the CLI grows no new subcommand.`;
  const afterZh = firstPeer
    ? `profile 里多一行 \`${pkg}\`，改的是 \`${firstPeer}\`，界面上多出${surface.zh}。\`dsh --profile web --dump-config\` 能看到这一行；命令行不会多出新子命令。`
    : `profile 里多一行 \`${pkg}\`，界面上多出${surface.zh}。\`dsh --profile web --dump-config\` 能看到这一行；命令行不会多出新子命令。`;

  const filesEn = storagePeer
    ? `It peers \`${storagePeer}\`, so whatever it persists goes through that service and lands under \`$DSH_HOME\`. The dependency itself is one line in \`$DSH_HOME/profiles/<name>/package.json\`, written by \`dsh plugin add ${pkg}\`.`
    : `The manifest declares no storage peer, so the only file it is guaranteed to touch is the \`${pkg}\` dependency line in \`$DSH_HOME/profiles/<name>/package.json\`. Any other state belongs to the surface it patches; the package description names no path.`;
  const filesZh = storagePeer
    ? `它 peer 了 \`${storagePeer}\`，所以存下来的东西走那个服务、落在 \`$DSH_HOME\` 下。依赖本身只有一行，写在 \`$DSH_HOME/profiles/<名字>/package.json\`，由 \`dsh plugin add ${pkg}\` 写入。`
    : `清单里没有声明存储相关的 peer，所以唯一确定会碰到的文件是 \`$DSH_HOME/profiles/<名字>/package.json\` 里 \`${pkg}\` 那一行依赖。其余状态属于它改的那块界面；包说明里没有写路径。`;

  return [
    { h: 'After install', zhH: '装完会看到什么', p: [afterEn], zhP: [afterZh] },
    { h: 'Files it touches', zhH: '它读写的文件', p: [filesEn], zhP: [filesZh] },
  ];
}
