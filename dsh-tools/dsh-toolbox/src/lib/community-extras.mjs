// 社区插件页的 FAQ 与两段增量正文。数据来源：npm 元数据（peers、engines.dsh）与各页已写过的冲突说明。
// 每个包的第一问都点名它自己的对撞对象，第二问用它的真实区间——不同包答案不同。
const GROUP_SURFACE = {
  'find-plugins': { en: 'a plugin browser or market panel in the web client', zh: '网页客户端里的插件浏览或市场面板' },
  cost: { en: 'a spend or balance readout in the web client', zh: '网页客户端里的花费或余额读数' },
  sessions: { en: 'session actions (archive, restore, delete) on the session list', zh: '会话列表上的操作（归档、恢复、删除）' },
  skills: { en: 'a skill panel that lists and toggles installed skills', zh: '列出并开关已装技能的面板' },
  search: { en: 'a web-search tool in the tool set', zh: '工具集里的联网搜索工具' },
  appearance: { en: 'a theme, background or overlay in the web client', zh: '网页客户端的主题、背景或浮层' },
  agents: { en: 'agent orchestration controls in the chat surface', zh: '对话界面上的 agent 编排控件' },
  remote: { en: 'a second way into the same runtime: routes, relay or bot', zh: '进入同一套运行时的第二条路：路由、中继或机器人' },
  output: { en: 'a renderer that turns answers into interactive blocks', zh: '把回答渲染成可交互块的渲染器' },
  system: { en: 'tools or shell behaviour the agent can call', zh: 'agent 能调用的工具或 shell 行为' },
  providers: { en: 'provider account management in the settings area', zh: '设置里的服务商账号管理' },
  data: { en: 'tools that read external data (databases, pak files)', zh: '读取外部数据的工具（数据库、pak 文件）' },
  network: { en: 'a proxy layer under the model calls', zh: '模型调用下面的一层代理' },
  memory: { en: 'a context block injected before each turn', zh: '每轮之前注入的一段上下文' },
  automation: { en: 'scheduled runs that produce files on their own', zh: '按计划自己跑、自己产出文件的任务' },
  devtools: { en: 'a tab or command for git and editing', zh: '给 git 与编辑用的标签页或命令' },
};

function shortOf(pkg) { return pkg.split('/').pop(); }

export function sectionsFor(page, peersList, group) {
  const surface = GROUP_SURFACE[group] ?? { en: 'a change in the web client', zh: '网页客户端里的一处变化' };
  const storagePeer = peersList.find((p) => /dsh-settings|dsh-storage-domain|dsh-home-paths|dsh-credentials/.test(p));

  const after = {
    en: `Installing it adds ${surface.en}; nothing in the CLI output changes, so ` + '`dsh --profile web --dump-config`' + ' shows the new row rather than a new command. Remove it and that surface is gone, with the rest of the profile untouched.',
    zh: `装完会多出${surface.zh}；命令行输出不变，所以看 ` + '`dsh --profile web --dump-config`' + ' 看到的是新增的一行，不是新命令。删掉它，这块界面消失，profile 其余部分不动。',
  };

  const files = storagePeer
    ? {
        en: `It peers ` + '`' + storagePeer + '`' + `, so what it stores goes through that service and lands under ` + '`$DSH_HOME`' + ` — the dependency row itself is written into ` + '`$DSH_HOME/profiles/<name>/package.json`' + ' by `dsh plugin add`.',
        zh: `它 peer 了 ` + '`' + storagePeer + '`' + `，所以它存的东西走那个服务，落在 ` + '`$DSH_HOME`' + ` 下；依赖那一行由 ` + '`dsh plugin add`' + ' 写进 `$DSH_HOME/profiles/<名字>/package.json`。',
      }
    : {
        en: 'Its manifest declares no storage peer, so the only file it is guaranteed to touch is the dependency row in `$DSH_HOME/profiles/<name>/package.json`. Anything else it keeps is the surface it patches — check the repository before assuming a path.',
        zh: '它的清单里没有声明存储相关的 peer，所以唯一确定会动到的文件是 `$DSH_HOME/profiles/<名字>/package.json` 里的依赖行。其余状态属于它改的那块界面——要确认路径请看仓库。',
      };

  return [
    { h: 'After install', zhH: '装完会看到什么', p: [after.en], zhP: [after.zh] },
    { h: 'Files it touches', zhH: '它读写的文件', p: [files.en], zhP: [files.zh] },
  ];
}

export function faqFor(page, note, counterpart) {
  const range = page.compat ?? '';
  const q1 = counterpart
    ? { en: `Does it collide with ${counterpart}?`, zh: `它和 ${counterpart} 会打架吗？` }
    : { en: 'Does it collide with any other plugin?', zh: '它和别的插件会打架吗？' };
  const a1 = counterpart
    ? {
        en: (note?.en ?? 'It competes for the same surface as ' + counterpart + '.') + ' Keep one of the two: a patch replaces the whole row config, so the other loses its entry without an error.',
        zh: (note?.zh ?? '它和 ' + counterpart + ' 抢同一块界面。') + ' 两个留一个：补丁替换整行 config，另一个会静默丢掉自己那一行，不报错。',
      }
    : {
        en: 'No counterpart is named for it, which usually means it mounts something unique. The check is still `dsh --profile web --dump-config` after installing.',
        zh: '没有点名对撞对象，通常说明它挂的东西是独有的。装完仍旧用 `dsh --profile web --dump-config` 核一遍。',
      };

  const q2 = range
    ? { en: 'Which dsh versions load it, and what happens outside that window?', zh: '哪些 dsh 版本会加载它，区间外会怎样？' }
    : { en: 'What happens when dsh upgrades?', zh: 'dsh 升级之后会怎样？' };
  const a2 = range
    ? {
        en: `\`engines.dsh\` is \`${range}\`. Outside it the CLI skips the plugin at boot and prints the requirement; \`dsh plugin allow-version <package>\` is the override if you accept the risk.`,
        zh: `\`engines.dsh\` 是 \`${range}\`。超出范围时启动会跳过它并打印要求；愿意担风险就用 \`dsh plugin allow-version <包名>\` 放行。`,
      }
    : {
        en: 'No `engines.dsh` is declared, so every dsh version loads it and nothing pre-checks the upgrade. That is why the repository, not the npm page, is the place to look before a major bump.',
        zh: '没有声明 `engines.dsh`，任何版本都会加载，升级时也不会有任何检查。所以大版本升级前要看仓库，不是 npm 页面。',
      };

  return [
    { en: { q: q1.en, a: a1.en }, zh: { q: q1.zh, a: a1.zh } },
    { en: { q: q2.en, a: a2.en }, zh: { q: q2.zh, a: a2.zh } },
  ];
}
