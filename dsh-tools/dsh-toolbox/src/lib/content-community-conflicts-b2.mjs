// 第二批（31 个）插件的冲突说明。依据同样是 peerDependencies、engines.dsh 与补丁替换整行 config 的语义。
export const CONFLICTS_B2 = {
  'Ultmebius/universal-plugin-hub': {
    en: 'It writes plugin entries into the profile package.json from git sources, which is the same file `dshmarket` edits. Two installers means the second one can overwrite the first one\'s entry without knowing it existed.',
    zh: '它从 git 源往 profile 的 package.json 里写插件条目，而 `dshmarket` 改的是同一个文件。两个安装器并存时，后写的那个会覆盖前一个，且不知道前一个存在。',
  },
  'kuailexiaozixin/skill-mcp-market': {
    en: 'No dsh peers, so nothing pre-checks it; it drops skills into the skill directory. `@chengze/dsh-skill-manager` keeps its own list of installed skills, so after an install there the new skill may not appear until it reloads.',
    zh: '没有 dsh peer，无法预检；它把技能直接写进技能目录。`@chengze/dsh-skill-manager` 自己维护一份已装清单，装完那边可能不刷新，得等它重载。',
  },
  'xiechenghua01/skill-manager': {
    en: 'A sidebar panel with its own skill inventory. Beside `dsh-skill-browser` you get two panels listing the same skills with different state, and the one you toggle in is not necessarily the one the agent loads.',
    zh: '自己的技能清单加一个侧栏面板。和 `dsh-skill-browser` 一起就是两个面板列同一批技能、状态还不一样，你在哪个里开的，不一定就是 agent 真加载的那个。',
  },
  'loyalchiiina/skill-browser': {
    en: 'Peers `dsh-client-ui-slots` and mounts a floating panel, so it competes for the same overlay layer as `dsh-plugin-wallpaper-engine` and `dsh-pet`. Whichever loads later sits on top.',
    zh: 'peer 了 `dsh-client-ui-slots` 并挂一个悬浮面板，和 `dsh-plugin-wallpaper-engine`、`dsh-pet` 抢同一层浮层。后加载的盖在上面。',
  },
  'lmzhen/evolution-bundle': {
    en: 'A bundle that pulls the other evolution packages in. Installing it beside `@lmzhen/dsh-evolution-skill-health` installs the same panel twice, and the duplicate row wins one of the two configs.',
    zh: '这是一个把同族包装进来的 bundle。和 `@lmzhen/dsh-evolution-skill-health` 一起装等于同一个面板装了两遍，重复的那行会用掉两份配置里的一份。',
  },
  'lmzhen/skill-health-panel': {
    en: 'Shows the linter output in a sidebar panel. It is a subset of the evolution bundle, so the only real conflict is installing both — you get the panel twice.',
    zh: '把体检结果放在侧栏面板里。它是自进化套件的子集，唯一真实的冲突就是两个都装——面板出现两次。',
  },
  'Sparrived/custom-theme': {
    en: 'Writes theme tokens that `dsh-dream-skin` and `dsh-claude-style` also write. Because a patch replaces the whole theme row, the last layer wins and your custom CSS can be dropped without an error.',
    zh: '它写主题 token，而 `dsh-dream-skin` 和 `dsh-claude-style` 也写同一批。补丁替换的是整行主题配置，最后加载的层生效，你自定义的 CSS 会被丢掉且不报错。',
  },
  'VMWHW/flat-corners': {
    en: 'A pure CSS override that removes corner radii. `dsh-custom-theme` also sets radii through its own stylesheet; two stylesheets with the same specificity means load order decides, not intent.',
    zh: '纯 CSS 覆盖，把圆角归零。`dsh-custom-theme` 也用自己的样式表设圆角；两个同优先级的样式表，决定结果的是加载顺序，不是你的意图。',
  },
  'rivenshanghai/sidebar-fold': {
    en: 'It folds sidebar entries into one row. Any plugin whose UI lives in that folded group (`dsh-skill-browser`, market tabs) looks missing until you expand it — the plugin is loaded, just not visible.',
    zh: '它把侧栏条目收成一行。界面落在这个折叠组里的插件（`dsh-skill-browser`、各种市场标签页）看起来像没装，其实加载了，只是没显示。',
  },
  'yusheng-g/aishell-brand': {
    en: 'Replaces the sidebar and hero brand marks. `dsh-dream-skin` also rewrites the shell chrome, so installing both gives you a mix of two brand systems rather than one.',
    zh: '替换侧栏与首屏的品牌标识。`dsh-dream-skin` 也改外壳，两个一起装会得到两套品牌混在一起，谁也不是。',
  },
  'fan56/llm-proxy': {
    en: 'Installs a process-global interceptor for outbound model calls. Any second plugin that swaps the HTTP dispatcher — another proxy, or a provider plugin with its own transport — silently bypasses it.',
    zh: '它给出去的模型请求装了一个进程级拦截器。第二个换掉 HTTP dispatcher 的插件（另一个代理，或自带传输层的服务商插件）会让它静默失效。',
  },
  'SouleyMoni1/database-tool': {
    en: 'Adds database tools to the tool set. `@mzzsfy/dsh-tool-gate` defers anything outside its whitelist, so the database tools will not be callable until you whitelist them there.',
    zh: '往工具集里加数据库工具。`@mzzsfy/dsh-tool-gate` 会把白名单外的工具全部延后加载，所以数据库工具在它那里加白名单之前调不到。',
  },
  'iJetLi/providers-hub': {
    en: 'Holds provider accounts and switches between them. `@xixka/dsh-hub` covers the same ground with a different package; two account stores means one login you cannot see from the other UI.',
    zh: '它管服务商账号并在账号间切换。`@xixka/dsh-hub` 用另一个包做同一件事；两个账号存储意味着有一份登录状态在另一个界面里看不到。',
  },
  'weicy98/permission-remote': {
    en: 'Twelve peers including the approval service; it reuses the session sandbox mode for SSH targets. `dsh-remote` and `ds-harness-remote` add more remote paths, and each one asks for approval its own way.',
    zh: '12 个 peer，含审批服务；它把会话的沙箱模式复用到 SSH 目标上。`dsh-remote` 和 `ds-harness-remote` 又各加一条远程路径，审批各问各的。',
  },
  'voltage12/simple-worktree': {
    en: 'Runs git commands that create and remove directories. Under `read-only` or `workspace-write` session modes the worktree path may be outside the allowed root, and the command is denied rather than failing in git.',
    zh: '它跑 git 命令，会创建和删除目录。会话模式是 `read-only` 或 `workspace-write` 时，worktree 的路径可能在允许根之外，于是命令被拒绝，而不是 git 报错。',
  },
  'fengzhaoy/web-ide': {
    en: 'Adds a tab to the web client. Any other tab-adding plugin (design panel, generated views) competes for the same tab strip; there is no id conflict, just crowded chrome.',
    zh: '给网页端加一个标签页。其它加标签的插件（设计面板、生成视图）抢的是同一条标签栏；不会 id 冲突，只是挤。',
  },
  '9Ashwin/computers': {
    en: 'Lets the agent run commands on your other machines. `dsh-ops` and `dsh-windows-mcp` also register command execution, so the model picks among three tools with different sandboxes and different blast radius.',
    zh: '让 agent 在你其它机器上跑命令。`dsh-ops` 与 `dsh-windows-mcp` 也注册命令执行，于是模型在三个沙箱策略不同、影响面不同的工具里挑一个。',
  },
  'NoelJudeNoel/cloud-relay': {
    en: 'Exposes the local web UI through a hosted relay. `ds-harness-remote` and `dsh-mobile-plugin` expose their own ingress; three ways in means three credentials to revoke when one leaks.',
    zh: '通过托管中继把本机网页界面暴露出去。`ds-harness-remote` 和 `dsh-mobile-plugin` 各有自己的入口；三个入口就是泄露时要吊销三套凭据。',
  },
  'alibaba-damo-academy/design-panel': {
    en: 'Eight peers including `dsh-client-ui-slots`; it renders its own panel type inside answers. `dsh-genui` and `deep-view` render rich blocks from the same replies, so one block can hit three renderers.',
    zh: '8 个 peer，含 `dsh-client-ui-slots`；它在回答里渲染自己的面板类型。`dsh-genui` 与 `deep-view` 也从同样的回复里渲染富块，同一个块会撞上三个渲染器。',
  },
  'xuanyuanchumo/codegraph': {
    en: 'Consumes graph data from dsh-codegraph / dsh-tool-lens. Without that data source it renders nothing, and installing both data sources at once gives it two feeds to reconcile.',
    zh: '吃的是 dsh-codegraph / dsh-tool-lens 的图谱数据。没有那个数据源它什么也不画；两个数据源同时装，它要自己撮合两份数据。',
  },
  'mzzsfy/tool-gate': {
    en: 'A tool gate: everything outside its whitelist is deferred. `@logictan/dsh-tool-surface` trims the same tool list by a different mechanism — two gates means tools can be deferred by one and never loaded by the other.',
    zh: '工具闸门：白名单外的一律延后。`@logictan/dsh-tool-surface` 用另一种机制裁同一份工具清单，两个一起用，工具可能被一个延后、又被另一个永远不加载。',
  },
  'dale0525/tool-surface': {
    en: 'Rewrites the tool list sent with each request. `@mzzsfy/dsh-tool-gate` does the same job; the whitelists are separate, so the effective tool set is the intersection and it is usually smaller than either author intended.',
    zh: '重写每轮随请求发送的工具清单。`@mzzsfy/dsh-tool-gate` 干同一件事；两份白名单各管各的，实际生效的是交集，通常比两位作者设想的都小。',
  },
  'xiaoso456/tool-plus': {
    en: 'Sixteen peers and its own persistent bash runtime, which replaces the shell path the sandbox wraps. Installing it beside any `dsh-shell`-based tool means two executors with different confinement.',
    zh: '16 个 peer，自带常驻 bash 运行时，换掉了沙箱包着的那条 shell 路径。和任何基于 `dsh-shell` 的工具一起装，就是两个约束策略不同的执行器。',
  },
  'ArvinQi/octop-memory': {
    en: 'Injects recalled memory before each turn. `dsh-mnemon` builds context views for the same slot, so both writing means the model gets two context blocks that can contradict each other.',
    zh: '每轮开始前注入召回的记忆。`dsh-mnemon` 也在同一处构建上下文视图，两个都装时模型会收到两段可能互相矛盾的上下文。',
  },
  'Dreamaniax/config-sync': {
    en: 'Syncs config files between machines with no dsh peers to guide it. If you also edit the home `cordis.patch.yml` by hand, the next sync is a last-writer-wins race you did not schedule.',
    zh: '在机器之间同步配置文件，且没有 dsh peer 可依。你同时手改了 home 的 `cordis.patch.yml`，下一次同步就成了一场你没安排过的「后写者赢」。',
  },
  'Mooling0602/plugin-updater': {
    en: 'Writes package versions into the profile. `dshmarket` and `universal-plugin-hub` write the same package.json, so an update can be planned from one UI and clobbered by an install from another.',
    zh: '它往 profile 里写包版本。`dshmarket` 与 `universal-plugin-hub` 写的是同一个 package.json，于是你在一个界面里规划好的更新，会被另一个界面的安装覆盖。',
  },
  'JimLiu/whiteboard-skill': {
    en: 'Adds a skill, nothing else. The conflict is with `@chengze/dsh-skill-manager`: if that panel cached the skill list before this install, the new skill stays invisible until a reload.',
    zh: '只加一个技能，不碰别的。冲突在 `@chengze/dsh-skill-manager`：如果它的面板在装之前缓存了清单，新技能要重载才看得见。',
  },
  'JimLiu/motion-skill': {
    en: 'Adds the claude-motion skill, nothing else. The conflict is with the skill list that `@chengze/dsh-skill-manager` caches: if that panel loaded before this install, the new skill stays hidden until a reload.',
    zh: '只加 claude-motion 这一个技能。冲突在 `@chengze/dsh-skill-manager` 缓存的技能清单：那个面板在装之前就加载了的话，这个技能要重载才出现。',
  },
  'artaniszhou/daily-reports': {
    en: 'Files a report on a schedule and spends tokens doing it. It has no peers to collide with; the cost shows up in `dsh-cost-meter` as usage you did not initiate.',
    zh: '按计划落报告，每次都要花 token。它没有会撞的 peer；代价会以「你没主动发起的用量」出现在 `dsh-cost-meter` 里。',
  },
  'Sumcam-L/ue-asset': {
    en: 'Reads Unreal pak files from paths outside the workspace. Under `read-only` it can list but not export; under `workspace-write` the export target must stay inside the allowed root.',
    zh: '读工作区之外的 Unreal pak。`read-only` 下能列不能导出；`workspace-write` 下导出目标必须在允许根之内。',
  },
  'xirang-ai/teamflow': {
    en: 'Seven peers and its own requirement-to-defect pipeline with roles. `@nanmicoder/dsh-agent-teams` and `dsh-agent-compare` orchestrate agents from the same chat surface, and the second orchestrator to patch that row replaces the first one\'s controls.',
    zh: '7 个 peer，自带需求到缺陷的角色流水线。`@nanmicoder/dsh-agent-teams` 与 `dsh-agent-compare` 从同一条对话界面编排 agent，后打补丁的那个会把前一个的控件整行换掉。',
  },
};
