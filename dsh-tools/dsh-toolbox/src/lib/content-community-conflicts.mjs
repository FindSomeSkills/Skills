// 每个插件页的「冲突」段。依据：包的 peerDependencies（挂哪些官方包）、engines.dsh 区间、
// 以及 DSH 的补丁语义——补丁会替换整行 config，后加载的层会盖掉前一层的同一行。
export const CONFLICTS = {
  'dsh-market/dsh-plugin-market': {
    en: 'It patches rows of `@deepseek-ai/dsh-settings` and adds its own market view. Two market plugins cost you one of them: a later layer replaces the whole config of the same row, so whichever loads second wins the panel and the first silently stops drawing.',
    zh: '它改的是 `@deepseek-ai/dsh-settings` 的行，并自己加一个市场界面。装两个市场插件等于只留一个：补丁替换的是整行 config，后加载的层把同一行盖掉，先装的那个会静默不渲染。',
  },
  'dshplugin/community-marketplace': {
    en: 'Shares no official package with the other markets beyond cordis, so nothing crashes when you install both — you just get two marketplace tabs with different inventories, and the one you did not configure looks empty.',
    zh: '除了 cordis，它和别的市场插件没有共用的官方包，所以两个一起装不会崩——只是多出两个插件市场标签页，目录不一样，没配的那个看起来是空的。',
  },
  'awesome-dsh-plugin/plugin-catalog': {
    en: 'A data package: no peers, no patch, no runtime row. It cannot conflict with anything you install, and it also cannot enforce that the versions it lists exist in your profile.',
    zh: '这是纯数据包：没有 peer、不打补丁、不占运行时的行。它不会和你装的任何东西冲突，反过来也管不了目录里列的版本在你 profile 里存不存在。',
  },
  'Han-1413141/cost-meter': {
    en: 'Peers `dsh-credentials` and `dsh-home-paths`, so it reads the same key material as any balance widget. With `dsh-whale-widget` installed you get two spend readouts on the same screen and both hit the account API — the second one is redundant, not broken.',
    zh: '它 peer 了 `dsh-credentials` 与 `dsh-home-paths`，读的是和余额挂件同一套凭据。和 `dsh-whale-widget` 一起装，屏幕上会出现两个花费读数、两边都打账户接口——多出来的那个是冗余，不是坏了。',
  },
  'MeteorNOX/balance-widget': {
    en: 'Declares no dsh peers at all, so the CLI cannot pre-check it; it mounts a fixed corner overlay. Two corner widgets (this plus `dsh-pet` or `dsh-meme`) stack on top of each other because neither declares a slot id.',
    zh: '完全没声明 dsh peer，命令行无法预检；它挂的是一个固定角落的浮层。两个角落组件（它加 `dsh-pet` 或 `dsh-meme`）会叠在一起，因为谁都没声明 slot id。',
  },
  'MichengAI/archive-manager': {
    en: 'Sixteen peers, including `dsh-session-projection-cache` and `dsh-storage-domain`: it writes session state, not just views. Running it beside `dsh-session-superagent` means two plugins mutating the same session lifecycle — archive first, then check the workspace list before trusting either.',
    zh: '16 个 peer，包含 `dsh-session-projection-cache` 和 `dsh-storage-domain`：它写会话状态，不只是显示。和 `dsh-session-superagent` 一起跑就是两个插件同时改同一套会话生命周期——先归档，再核对工作区列表。',
  },
  'MYCF711/session-superagent': {
    en: 'Its range is `>=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0`. On a `0.2.1-rc.2` CLI it is skipped at boot with the incompatibility message, so a "nothing happened after install" report is the range, not the plugin.',
    zh: '它声明的区间是 `>=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0`。在 `0.2.1-rc.2` 的命令行上，启动时就会被跳过并打印不兼容，所以“装完没反应”是区间问题，不是插件坏了。',
  },
  'MichengAI/skills-manager': {
    en: 'Peers `dsh-skill`, `dsh-tools` and `dsh-web-app`; it patches skill rows. `dsh-univer-office` peers `dsh-skill` too, and a patch replaces the whole row config, so configure the skill list in one place and let the other only read.',
    zh: 'peer 了 `dsh-skill`、`dsh-tools`、`dsh-web-app`，改的是技能相关的行。`dsh-univer-office` 也 peer 了 `dsh-skill`，而补丁替换整行 config，所以技能清单只在一处配，另一处只读。',
  },
  'DDDMUC/free-search': {
    en: 'Adds search tools into `dsh-tools` and peers `dsh-client-ui-commands`. With `@liustack/modsearch` installed you have two web-search providers registered; the model picks one, and the pick is not deterministic — keep one.',
    zh: '往 `dsh-tools` 里加搜索工具，并 peer `dsh-client-ui-commands`。再装 `@liustack/modsearch` 就有两个联网搜索提供者，模型挑哪个不确定——留一个。',
  },
  'liustack/modsearch': {
    en: 'Declares no peers and no dsh range, so nothing pre-checks it. It competes with `dsh-free-search` for the same job; two providers on the same profile is the conflict you will actually notice.',
    zh: '没有 peer、没有声明 dsh 区间，没有任何预检。它和 `dsh-free-search` 干同一件事；同一个 profile 里放两个搜索提供者，这才是你会实际感觉到的冲突。',
  },
  'LLLAAAAA/dream-skin': {
    en: 'Peers `dsh-client-ui-theme`, `dsh-client-store` and the settings pages, and it writes theme tokens. `dsh-claude-style` also restyles the same UI, and the later layer replaces the theme row — you get one look, not a blend.',
    zh: 'peer 了 `dsh-client-ui-theme`、`dsh-client-store` 和设置页，写的是主题 token。`dsh-claude-style` 也改同一套界面，后加载的层替换主题那一行——得到的是一个外观，不是混合。',
  },
  'Nwflower/claude-style': {
    en: 'Only peers `dsh-client-ui-primitives`, so it is light, but it restyles components that `dsh-dream-skin` also themes. Install both and the skin you configured last wins while the other still loads its stylesheet.',
    zh: '只 peer 了 `dsh-client-ui-primitives`，很轻，但它改的组件和 `dsh-dream-skin` 的主题重叠。两个都装，最后配置的那个生效，另一个的样式表仍然会加载。',
  },
  'elysia395/wallpaper-engine': {
    en: 'Pulls nine sibling packages (`-fx`, `-glass`, `-mascot-avatar`, `-parallax` …) and peers `dsh-client-ui-slots` + `dsh-host-webserver`. Installing it beside `dsh-pet` puts two overlays on the same surface; update both together or the shared slot version drifts.',
    zh: '它带九个同族包（`-fx`、`-glass`、`-mascot-avatar`、`-parallax` 等），peer 了 `dsh-client-ui-slots` 与 `dsh-host-webserver`。和 `dsh-pet` 一起装就是同一层界面上两个浮层；两个要一起升级，否则共用的 slot 版本会错开。',
  },
  'PC2005-cloud/pet': {
    en: 'Ten peers including `dsh-llm` and `dsh-commands`: the pet is an agent that spends tokens. Beside `dsh-plugin-wallpaper-engine` you have two overlay mounts; beside `dsh-meme` both sit near the composer, so the lower one gets covered.',
    zh: '10 个 peer，包含 `dsh-llm` 和 `dsh-commands`：这只宠物本身是个会烧 token 的 agent。和 `dsh-plugin-wallpaper-engine` 一起是两个浮层；和 `dsh-meme` 一起都挤在输入框附近，下面那个会被盖住。',
  },
  'yyh-001/meme': {
    en: 'Peers only `dsh-tools` and registers a tool plus an image library in the composer. `dsh-image-gen` adds image generation to the same composer area; two image buttons is the visible symptom, not an error.',
    zh: '只 peer 了 `dsh-tools`，注册一个工具加一个图库到输入框区域。`dsh-image-gen` 也在同一块加图片能力；症状是两个图片按钮，不是报错。',
  },
  'NanmiCoder/agent-teams': {
    en: 'Twenty-three peers, `dsh-subagent` and `dsh-client-ui-chat` among them: it spawns agents and patches the chat UI. `dsh-agent-compare` spawns agents from the same surface, and the second one to patch the chat row replaces the first one\'s controls.',
    zh: '23 个 peer，包含 `dsh-subagent` 与 `dsh-client-ui-chat`：它起子 agent 并且改对话界面。`dsh-agent-compare` 从同一层起 agent，后打补丁的那个会把前一个的控件整行替换掉。',
  },
  'lijiaqi-AI-Product-Manager/agent-compare': {
    en: 'Eleven peers including `dsh-sandbox` and `dsh-subprocess`; one request becomes 2–4 real runs, so it multiplies token spend. With `@nanmicoder/dsh-agent-teams` both are spawning agents from the chat surface, and the shared chat row is the collision point.',
    zh: '11 个 peer，含 `dsh-sandbox` 与 `dsh-subprocess`；一个需求会真的跑 2–4 遍，token 花费翻倍。和 `@nanmicoder/dsh-agent-teams` 一起，两边都从对话界面起 agent，共用的那一行就是冲突点。',
  },
  'WNLUO/mobile-plugin': {
    en: 'Adds `/api/mobile/v1` routes on `dsh-host-webserver` and requires dsh `>=0.2.0`. `ds-harness-remote` and `dsh-remote` open their own channels; three remote paths on one profile means three tokens and three places to rotate them.',
    zh: '在 `dsh-host-webserver` 上加 `/api/mobile/v1`，要求 dsh `>=0.2.0`。`ds-harness-remote` 和 `dsh-remote` 各开各的通道；一个 profile 上三条远程路径就是三套 token、三个轮换的地方。',
  },
  'flymysql/remote': {
    en: 'Peers `dsh-system-prompt` and `dsh-commands`, so it changes what the agent is told and which commands exist. Beside `ds-harness-remote` you have two remote stacks; pick one, because both add prompt sections and the model sees both.',
    zh: 'peer 了 `dsh-system-prompt` 与 `dsh-commands`，也就是改系统提示和可用命令。和 `ds-harness-remote` 一起就是两套远程栈；选一套，因为两边都往提示里加段落，模型会同时看到。',
  },
  'liguobao/harness-remote': {
    en: 'Twelve peers including `dsh-api-gateway` and the settings pages; it exposes the gateway over P2P. `dsh-mobile-plugin` exposes its own gateway routes, so both mean two entry points into the same host — one of them will be the one you forget to lock down.',
    zh: '12 个 peer，含 `dsh-api-gateway` 与设置页；它把网关通过点对点暴露出去。`dsh-mobile-plugin` 也开自己的网关路由，等于两个入口指向同一台主机——总有一个你会忘了关。',
  },
  'xmanrui/im-bridge': {
    en: 'No dsh peers declared, so it cannot be pre-checked. It bridges chat platforms into sessions; `@tencent-connect/dsh-qqbot` does the same for QQ specifically, so installing both gives you two QQ paths with different approval behaviour.',
    zh: '没有声明 dsh peer，无法预检。它把聊天平台接进会话；`@tencent-connect/dsh-qqbot` 专门做 QQ，两个一起装就有两条 QQ 路径，审批行为还不一样。',
  },
  'tencent-connect/qq-bot': {
    en: 'Peers `dsh-agent`, `dsh-llm`, `dsh-session` and `dsh-user-approval`: it drives real agents and asks for approval in QQ. With `@xmanrui/dsh-im` installed, QQ messages arrive twice through two different bridges.',
    zh: 'peer 了 `dsh-agent`、`dsh-llm`、`dsh-session`、`dsh-user-approval`：它驱动真 agent，并在 QQ 里请求审批。装了 `@xmanrui/dsh-im`，同一条 QQ 消息会经两条桥各到一次。',
  },
  'lhuans/genui': {
    en: 'Peers `dsh-client-ui-slots` and `dsh-system-prompt`; it teaches the model to emit interactive blocks. `deep-view` renders rich views from the same replies, so a reply that contains both kinds of block gets two different renderers guessing.',
    zh: 'peer 了 `dsh-client-ui-slots` 与 `dsh-system-prompt`；它教模型输出可交互块。`deep-view` 从同样的回复里渲染富视图，一条回复里两种块都有时，两个渲染器各猜一次。',
  },
  'Fei2411/deep-view': {
    en: 'Peers `dsh-tools` and `dsh-web`, and it parses view blocks out of answers. `dsh-genui` produces blocks from the same prompt section; when both are loaded, a malformed block fails in one renderer and renders in the other.',
    zh: 'peer 了 `dsh-tools` 与 `dsh-web`，从回答里解析视图块。`dsh-genui` 从同一段提示里生产块；两个都装时，一个畸形块可能在一个渲染器里报错、在另一个里正常显示。',
  },
  'dream-num/univer-office': {
    en: 'Nine peers: `dsh-attachment`, `dsh-skill`, `dsh-settings` and the web server among them. `@michengai/dsh-skills-manager` patches the same `dsh-skill` rows, and a patch replaces the row config, so declare skills in one of the two only.',
    zh: '9 个 peer：`dsh-attachment`、`dsh-skill`、`dsh-settings` 和 web server 都在内。`@michengai/dsh-skills-manager` 改的是同一批 `dsh-skill` 行，补丁替换整行 config，所以技能只在这两个里的一个里声明。',
  },
  'T-Auto/ops': {
    en: 'Requires dsh `>=0.2.2-rc.1 <0.2.3-0`, and ships native binaries per platform. On a `0.2.1` CLI it is skipped at boot; beside `dsh-windows-mcp` you have two native Windows tool providers registering overlapping capabilities.',
    zh: '要求 dsh `>=0.2.2-rc.1 <0.2.3-0`，并按平台带原生二进制。在 `0.2.1` 的命令行上会被跳过；和 `dsh-windows-mcp` 一起就是两个原生 Windows 工具提供者，能力有重叠。',
  },
  'regrevia/unlag': {
    en: 'Range `>=0.2.0-rc.1`, and it only makes sense in the desktop app — the `desktop` profile name is reserved, so from the npm CLI it cannot even be configured. Next to a browser-only setup it does nothing you can observe.',
    zh: '区间 `>=0.2.0-rc.1`，而且只对桌面应用有意义——`desktop` 这个 profile 名是保留的，从 npm 版命令行根本配不了。在纯浏览器用法里，它不产生任何你能观察到的效果。',
  },
  'helloHub1212/windows-mcp': {
    en: 'No peers and no dsh range, so no pre-check. It registers Windows automation tools next to whatever `dsh-ops` already provides; two tools with overlapping intent is a prompt-level conflict — the model may pick the weaker one.',
    zh: '没有 peer、没有 dsh 区间，没有预检。它注册的 Windows 自动化工具会和 `dsh-ops` 已有的能力重叠；两个意图相近的工具是提示层的冲突——模型可能挑了弱的那一个。',
  },
  'ccch1mneyyy/tui': {
    en: 'Thirty-eight peers: it is a second front end over the same runtime, not a panel inside the web UI. Anything you patch for the web surface (themes, overlays, composer buttons) has no effect there, and a dsh upgrade that changes an internal package breaks it first.',
    zh: '38 个 peer：它是同一套运行时的第二个前端，不是网页界面里的面板。你给网页界面打的补丁（主题、浮层、输入框按钮）在它那里统统无效；dsh 一升级动了内部包，它最先坏。',
  },
};
