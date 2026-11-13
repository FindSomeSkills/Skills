// 每一对冲突「为什么不能共存」：一句话，点明争的是同一个界面位、同一行配置、同一个外部接口或同一件事。
// 键是两个包名按字母序拼起来的，a|b。
export const CLASH = {
  'dsh-dream-skin|dsh-claude-style': {
    en: 'Both write the theme row, and that row holds one value — there is no per-plugin theme layer to merge into.',
    zh: '两个都写主题那一行，而那一行只存一个值——没有可合并的分插件主题层。',
  },
  'dsh-pet|dsh-plugin-wallpaper-engine': {
    en: 'They mount into the same overlay slot, and the slot draws one layer per position; the second mount lands on top instead of beside.',
    zh: '它们挂进同一个浮层位，而那个位每个位置只画一层；第二个挂上去是叠在上面，不是并排。',
  },
  '@chengze/dsh-skill-manager|dsh-skill-browser': {
    en: 'Both claim the skills panel entry in the sidebar and both read the skill directory, so the list you toggle is not necessarily the list the agent loads.',
    zh: '两个都抢侧栏技能面板这个入口，又都读技能目录，所以你在哪个里开关，不一定是 agent 真正加载的那份。',
  },
  'dsh-skill-browser|dsh-toomuch-plugins': {
    en: 'One plugin\'s entire UI is a sidebar entry that the other folds into a collapsed group, so the surface exists but cannot be reached.',
    zh: '一个插件的全部界面就是一条侧栏入口，另一个把它折进折叠组，于是界面还在却点不到。',
  },
  'dsh-genui|deep-view': {
    en: 'Both register a renderer for the same block type in answers, and the block format has no discriminator that would let the two split the work.',
    zh: '两个都在回答里注册同一种块的渲染器，而块格式里没有能让两者分工的判别字段。',
  },
  '@yugoo-design/dsh-design-panel|dsh-genui': {
    en: 'Design panels and generated blocks share the block slot; whichever renderer registers last takes the whole slot, not just its own blocks.',
    zh: '设计面板和生成块共用同一个块位置；后注册的渲染器拿走整个位置，不只是它自己那种块。',
  },
  '@zhaoyang10/dsh-web-ide|dsh-codegraph-visualizer': {
    en: 'Both add a tab above the conversation, and the tab strip has a fixed order — the second tab pushes the first out of view on narrow windows.',
    zh: '两个都在对话上方加标签页，标签栏顺序固定，窗口一窄第二个就把第一个挤出视野。',
  },
  '@michengai/dsh-archive-manager|dsh-session-superagent': {
    en: 'Both mutate the session lifecycle: one moves a session out of the active list while the other still holds it open.',
    zh: '两个都改会话生命周期：一个把会话移出活跃列表，另一个还握着它开着。',
  },
  '@michengai/dsh-skills-manager|dsh-univer-office': {
    en: 'Both patch the `dsh-skill` row, and a patch replaces that row whole, so the second one leaves only its own skill list.',
    zh: '两个都改 `dsh-skill` 那一行，补丁整行替换，第二个装上去就只剩它自己那份技能清单。',
  },
  'dshmarket|universal-plugin-hub': {
    en: 'Both write the profile package.json, which has one dependency set — an install from one can drop an entry the other just wrote.',
    zh: '两个都写 profile 的 package.json，而依赖只有一份——一边装，可能把另一边刚写的条目挤掉。',
  },
  'dsh-better-plugin-updater|dshmarket': {
    en: 'Both rewrite version fields in the same manifest; an update planned in one is invalidated by an install from the other.',
    zh: '两个都改同一份清单里的版本字段；一边规划好的更新，会被另一边的安装作废。',
  },
  'dsh-custom-theme|dsh-syn-config': {
    en: 'One writes CSS and background files under the profile while the other copies that directory between machines — the next sync overwrites the theme.',
    zh: '一个在 profile 下写 CSS 与背景文件，另一个把这个目录在机器间复制——下次同步把主题盖掉。',
  },
  '@aiwayds/dsh-llm-proxy|dsh-providers-hub': {
    en: 'Both sit on the outbound model path: the proxy installs a global dispatcher, and a provider plugin with its own transport steps around it.',
    zh: '两个都在模型出站路径上：代理装了全局 dispatcher，而自带传输层的服务商插件会绕过它。',
  },
  'dsh-free-search|@liustack/modsearch': {
    en: 'Both register a web-search tool under the same capability, so the model picks one provider and the choice is not stable across turns.',
    zh: '两个在同一项能力下各注册一个联网搜索工具，模型只会挑一个，而且每轮挑的不稳定。',
  },
  '@tencent-connect/dsh-qqbot|@xmanrui/dsh-im': {
    en: 'Both bridge the same QQ account into sessions, so one message arrives twice and the two approval flows disagree about who answered.',
    zh: '两个把同一个 QQ 号接进会话，一条消息到两次，两套审批还各记各的「谁批的」。',
  },
  'dsh-mobile-plugin|ds-harness-remote': {
    en: 'Both open their own ingress to the same host, with separate tokens and separate route tables that nobody reconciles.',
    zh: '两个各开一条进入同一台主机的通道，令牌分开、路由表分开，没人对账。',
  },
  'ds-harness-remote|dshost-plugin': {
    en: 'Two relays expose the same local UI through different endpoints; revoking access means revoking it in two places, and one is easy to forget.',
    zh: '两个中继用不同端点暴露同一个本机界面；收回访问要在两处收，总有一处会被忘掉。',
  },
  'dsh-computers|dsh-windows-mcp': {
    en: 'Both give the agent command execution on other machines, with different sandboxes, so the same task behaves differently depending on which tool the model picks.',
    zh: '两个都给 agent 在别的机器上执行命令的能力，沙箱策略不同，同一件事取决于模型挑了哪个工具。',
  },
  '@mzzsfy/dsh-tool-gate|dsh-tool-database': {
    en: 'The gate defers every tool outside its whitelist, so the database tool is registered but never advertised until it is listed there.',
    zh: '闸门把白名单外的工具全部延后，数据库工具虽然注册了，不进白名单就不会被声明给模型。',
  },
  '@nanmicoder/dsh-agent-teams|dsh-agent-compare': {
    en: 'Both orchestrate agents from the chat surface and both patch that row — the later layer replaces the earlier one\'s controls entirely.',
    zh: '两个都从对话界面编排 agent，也都在改那一行——后加载的层把前一个的控件整行换掉。',
  },
  '@nanmicoder/dsh-agent-teams|@xirang-ai/dsh-teamflow': {
    en: 'Two role systems describe the same requirement-to-defect pipeline, so the agent gets two conflicting sets of roles for one task.',
    zh: '两套角色系统描述同一条需求到缺陷的流水线，agent 接到一个任务却拿到两套冲突的角色。',
  },
  '@logictan/dsh-tool-surface|@mzzsfy/dsh-tool-gate': {
    en: 'Two whitelists trim one tool list; the effective set is the intersection, and a tool deferred by one may never load through the other.',
    zh: '两份白名单裁同一份工具清单；实际生效的是交集，被一个延后的工具可能在另一个那里永远不加载。',
  },
  'dsh-mnemon|dsh-octop-memory': {
    en: 'Both inject a context block into the same slot before each turn, and neither marks its block as authoritative over the other.',
    zh: '两个都在每轮前把上下文块注入同一个位置，谁都没标自己比对方更权威。',
  },
  'dsh-cost-meter|dsh-whale-widget': {
    en: 'Both price the same usage through the same credentials and both draw into the header area, so the numbers compete for one place and one meaning.',
    zh: '两个用同一套凭据给同一份用量计价，又都画在头部区域，于是两组数字抢一个位置、一个含义。',
  },
  'dsh-custom-theme|dsh-exv-flat-corners': {
    en: 'Two stylesheets set the same corner-radius variables; CSS resolves by load order, so intent does not decide which wins.',
    zh: '两份样式表设同一批圆角变量；CSS 按加载顺序解决，谁赢不由意图决定。',
  },
  '@dickpy/dsh-imagegen|dsh-meme': {
    en: 'Both add an image path next to the composer, and the composer area lays out one action row — two entries push a third control out.',
    zh: '两个都在输入框旁加一条图片路径，而输入框只有一排动作位——多两个就把第三个控件挤出去。',
  },
};
