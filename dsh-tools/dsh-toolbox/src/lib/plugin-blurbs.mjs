// 62 个社区插件在 /plugins/ 列表里的一句话说明。
// 事实来源：各包 npm 的 description 字段（docs/plugin-descriptions.json，逐条核对）。
export const BLURBS = {
  dshmarket: {
    en: 'Adds a visual plugin market inside DeepSeek Harness, so you can browse, search and install community plugins from the web UI in one click.',
    zh: '在 DeepSeek Harness 里加一个可视化插件市场，社区插件可以浏览、搜索，点一下从网页界面装上。',
  },
  'dsh-plugin': {
    en: 'Adds a community plugin marketplace built to the official plugin spec, with browse, search and install for thousands of hand-verified npm plugins.',
    zh: '加一个按官方插件规范做的社区市场，几千个经过人工核对的 npm 插件都能在里面浏览、搜索、安装。',
  },
  'dsh-plugin-catalog': {
    en: 'Ships the DeepSeek Harness plugin catalog as one JSON file with 10778 entries, so other tools can read the index without scraping a website.',
    zh: '把 DeepSeek Harness 插件目录打成一份 JSON，里面 10778 条，别的工具直接读文件，不用去爬网页。',
  },
  'dsh-cost-meter': {
    en: 'Adds a session cost readout to the web UI: this session, today, history, and per-model pricing from a built-in table of 170 model prices.',
    zh: '在界面里加一块花费读数：本次会话、今日合计、历史记录，价格来自内置的 170 个模型价目表。',
  },
  'dsh-whale-widget': {
    en: 'Puts a DeepSeek balance widget in the bottom-right corner, showing balance, today usage and peak pricing, with a configurable bubble click sequence.',
    zh: '在右下角放一只余额挂件，显示余额、今日已用与峰谷价，气泡点一下显示什么可以自己配顺序。',
  },
  'dsh-archive-manager': {
    en: 'Adds archive, restore, favorite and permanent delete actions to every session row, and diagnoses damaged session logs so broken entries can be repaired.',
    zh: '给会话列表的每一行加上归档、恢复、收藏、永久删除，另外诊断损坏的会话日志，坏掉的条目能定位。',
  },
  'dsh-session-superagent': {
    en: 'Watches a GitHub repository and wakes a session when something needs doing, keeping credentials on the host instead of sending them to the model.',
    zh: '盯着一个 GitHub 仓库，有事要做时唤醒会话；凭据留在本机，不会跟着提示发到模型那边。',
  },
  'dsh-skills-manager': {
    en: 'Adds a sidebar panel that loads and manages local Agent Skills, so you can enable, disable and inspect them without editing files by hand.',
    zh: '侧栏多一个面板，统一加载和管理本机技能，开关、查看都在界面里，不用手工改文件。',
  },
  'dsh-free-search': {
    en: 'Gives the agent free web search across 39 engines, including keyless providers, so answers can cite pages the model could not reach on its own.',
    zh: '给 agent 加上联网搜索，后端有 39 个引擎、含免密钥的那些，回答可以引用模型本身够不到的页面。',
  },
  'dsh-modsearch': {
    en: 'Adds web search, X search and page fetch for models without native web access, using free providers so it works without an API key.',
    zh: '给没有原生联网能力的模型补上网页搜索、X 搜索和取页，走免费通道，不需要 API key 就能用。',
  },
  'dsh-dream-skin': {
    en: 'Installs eight cool-toned iOS and Linear style themes with diffuse wallpapers, accent colours and per-skin backgrounds, switchable from the settings page.',
    zh: '装上八套冷调主题，iOS 与 Linear 两种风格，配弥散光壁纸、强调色和每套皮肤各自的背景，在设置页切换。',
  },
  'dsh-claude-style': {
    en: 'Reworks the web client look and interaction to match Claude Code Desktop, changing colours, spacing and controls together rather than one at a time.',
    zh: '把网页版的观感和交互改成 Claude Code 桌面版那一套，颜色、间距、控件一起换，不是只改一样。',
  },
  'dsh-plugin-wallpaper-engine': {
    en: 'Renders local Wallpaper Engine wallpapers behind the chat, playing Scene and Web backgrounds in real time through the desktop runtime.',
    zh: '把本机 Wallpaper Engine 的壁纸渲染到对话背景上，Scene 与 Web 两类都能实时播放，靠桌面端运行时。',
  },
  'dsh-pet': {
    en: 'Adds a small animated fish that wanders the screen, plays with objects, naps, follows your work and keeps the balance wallet in view.',
    zh: '加一条会动的蓝色胖鱼，在屏幕上溜达、玩东西、打盹，你忙时它跟着忙，还顺手看着余额钱包。',
  },
  'dsh-meme': {
    en: 'Adds a meme picker beside the message box plus a tool the agent calls to send an image, with multiple galleries, mood filters and AI-learned images.',
    zh: '输入框旁多一个表情包选择器，另给 agent 一个发图工具，支持多个图库、按情绪筛图，还能让 AI 学图。',
  },
  'dsh-agent-teams': {
    en: 'Adds multi-agent teamwork with a captain, members and dependent tasks, driven by natural language so one request can be split across several agents.',
    zh: '加上多 agent 协作：队长、成员、带依赖的任务，用自然语言下指令，一个需求可以拆给几个 agent 做。',
  },
  'dsh-agent-compare': {
    en: 'Runs the same request through two to four models and shows answers, files or live pages side by side, with blind or open comparison before you adopt one.',
    zh: '同一个需求同时跑 2–4 个版本，回答、文件、网页并排比，可以盲选也可以公开对比，选定后再采用。',
  },
  'dsh-mobile-plugin': {
    en: 'Exposes a mobile API and relay client so the DSH mobile app can reach a desktop profile, resolving peers through the host instead of bundling them.',
    zh: '开一套手机端 API 和中继客户端，让手机 App 能连到桌面 profile，peer 依赖交给宿主解析，不打包进去。',
  },
  'dsh-remote': {
    en: 'Adds remote SSH development to the client: IDE layout, remote search, editor and terminal tabs, Git diffs and agent access to the remote machine.',
    zh: '加上远程 SSH 开发：IDE 布局、远程搜索、编辑器与终端标签、Git 差异，agent 也能在远程机器上动手。',
  },
  'ds-harness-remote': {
    en: 'Gives you peer-to-peer, end-to-end encrypted remote access to DeepSeek Harness workspaces from web and mobile clients, without exposing a port.',
    zh: '提供点对点、端到端加密的远程访问，网页和手机都能连进 DSH 工作区，不用对外开端口。',
  },
  'dsh-im': {
    en: 'Bridges WeChat, Feishu, WeCom, DingTalk, QQ, Telegram, WhatsApp, Slack, Discord and Matrix into DSH, so you can talk to an agent from any of them.',
    zh: '把微信、飞书、企微、钉钉、QQ、Telegram、WhatsApp、Slack、Discord、Matrix 接进 DSH，从哪个聊天软件都能对话。',
  },
  'dsh-qqbot': {
    en: 'Connects DSH to QQ private and group chats, so a session can be driven from QQ and answers arrive where the conversation already happens.',
    zh: '把 DSH 接进 QQ 私聊和群聊，会话可以在 QQ 里驱动，回答直接落在本来就在聊的那个窗口。',
  },
  'dsh-genui': {
    en: 'Renders interactive charts, forms, calculators, dashboards and small apps inline in replies, with actions that report results back to the agent.',
    zh: '在回答里直接渲染可交互的图表、表单、计算器、仪表盘和小应用，操作结果还能回传给 agent。',
  },
  'deep-view': {
    en: 'Renders interactive charts, tables, inputs and answers inside any chat, so data in a reply can be inspected rather than read as plain text.',
    zh: '在任何对话里渲染可交互的图表、表格、输入框和答案，回复里的数据能点开看，而不是只当文字读。',
  },
  'dsh-univer-office': {
    en: 'Previews spreadsheets and documents inline, opens them in floating worktree windows, and adds a session-end review step through a bundled gateway.',
    zh: '表格和文档可以在对话里预览，也能开成浮动的 worktree 窗口，会话结束时还有一步复核，走内置的网关。',
  },
  'dsh-ops': {
    en: 'Adds native file and process tools on Windows, Linux and macOS, with an optional Bash payload and PowerShell integration on Windows only.',
    zh: '在 Windows、Linux、macOS 上补上原生文件与进程工具；Bash 载荷和 PowerShell 集成只在 Windows 提供。',
  },
  'dsh-unlag': {
    en: 'Adds a reload button to the desktop client, so plugin changes apply without a restart and a long-running window can be refreshed in place.',
    zh: '给桌面端加一个刷新按钮，改完插件不用重启就生效，开久卡住了也能就地刷一下。',
  },
  'dsh-windows-mcp': {
    en: 'Connects Windows-MCP to DSH, giving the agent screenshots, UI automation, input, clipboard, process and registry access on a Windows desktop.',
    zh: '把 Windows-MCP 接进 DSH，agent 在 Windows 桌面上能截屏、自动操作界面、输入、读写剪贴板、查进程和注册表。',
  },
  'dsh-tui': {
    en: 'Adds an interactive terminal interface for agents, sessions and tools, so a whole session can run in the terminal instead of the browser.',
    zh: '加一套终端交互界面，agent、会话、工具都能在终端里操作，整个会话不一定要开浏览器。',
  },
  'universal-plugin-hub': {
    en: 'Brings Claude Code and Codex plugin sources into DSH, managing plugins, skills and MCP servers from one panel, including Git sources and local uploads.',
    zh: '把 Claude Code、Codex 那套插件源接进 DSH，插件、Skills、MCP 在一个面板里管，支持 Git 源和本地上传。',
  },
  'dsh-skill-mcp-market': {
    en: 'Adds a skills and MCP marketplace: browse live sources, install SKILL.md skills and MCP connectors, and use them immediately without restarting.',
    zh: '加一个技能与 MCP 市场：浏览实时源，一键装 SKILL.md 技能和 MCP 连接器，装完立刻可用，不用重启。',
  },
  'dsh-skill-manager': {
    en: 'Adds a sidebar panel that lists skills by install location, edits and disables them, and reports skills that fail to load silently.',
    zh: '侧栏多一个面板，按安装位置列技能，能改、能禁用，加载失败却不报错的技能也会被指出来。',
  },
  'dsh-skill-browser': {
    en: 'Turns the local skill library into a browsable panel with five tabs, tree and grid views, call ledgers and charts, plus market and MCP management.',
    zh: '把本机技能库变成可浏览的面板：五个标签页、树状与平铺两种视图、调用台账与排行图，还能管市场与 MCP。',
  },
  'dsh-evolution-all': {
    en: 'Installs the full evolution bundle: host automation plus model tools at the profile root, as the default build of this community project.',
    zh: '装的是整套 evolution：宿主自动化加模型侧工具，都放在 profile 根目录，是这个社区项目的默认版本。',
  },
  'dsh-evolution-skill-health': {
    en: 'Adds a sidebar panel that shows what the skill linter found, listing parse and load problems for the skills installed in this profile.',
    zh: '侧栏多一个面板，显示技能检查器发现的问题，把当前 profile 里解析或加载失败的技能列出来。',
  },
  'dsh-custom-theme': {
    en: 'Adds user-editable CSS themes and background images for the web and desktop clients, with the pickers placed in the settings page.',
    zh: '加上可自己改的 CSS 主题和背景图，网页版与桌面端都生效，选择器放在设置页里。',
  },
  'dsh-exv-flat-corners': {
    en: 'Removes every corner radius from the web interface, turning rounded buttons, cards and inputs into square ones across the whole client.',
    zh: '把界面里的圆角全部去掉，按钮、卡片、输入框在整个客户端里统一变成直角。',
  },
  'dsh-toomuch-plugins': {
    en: 'Collapses the sidebar entries above the workspace into a single toggle, with a settings page that controls how the folded group is displayed.',
    zh: '把工作区上方那一排侧栏入口折成一个开关，折叠后怎么显示由设置页里的一组网格选项决定。',
  },
  'aishell-dsh-brand': {
    en: 'Replaces the sidebar and hero brand marks with AI Shell SVG artwork, so the client carries that product identity instead of the default one.',
    zh: '把侧栏和首页的品牌标记换成 AI Shell 的 SVG，客户端带的是那个产品的标识，不是默认那套。',
  },
  'dsh-llm-proxy': {
    en: 'Installs a process-wide HTTP proxy plus an LLM traffic-splitting dispatcher, so model calls from different providers can be routed separately.',
    zh: '装一套进程级 HTTP 代理和 LLM 分流调度器，不同服务商的模型请求可以走各自的路由。',
  },
  'dsh-tool-database': {
    en: 'Adds SQL Server, PostgreSQL and MySQL tools over native drivers, with multiple data sources, read-only queries by default and credentials kept on the host.',
    zh: '加上 SQL Server、PostgreSQL、MySQL 的数据库工具，走原生驱动，可配多个数据源，默认只读，凭据留在本机。',
  },
  'dsh-providers-hub': {
    en: 'Adds one hub for AI coding providers: account login, multi-account pools, silent credential refresh, credit claiming and a local provider list.',
    zh: '把 AI 编码服务商收进一个面板：账号登录、多账号池、凭据静默刷新、领取额度，还有本地服务商清单。',
  },
  'dsh-permission-remote': {
    en: 'Adds SSH remote workspaces to the web client, reusing the session sandbox mode and the existing approval flow for every command.',
    zh: '给网页版加 SSH 远程工作区，沿用会话的沙箱模式和原有的审批流程，每条命令都要过一遍。',
  },
  'dsh-simple-worktree': {
    en: 'Creates and removes git worktrees from the conversation interface, so a task can run in its own checkout without leaving the chat.',
    zh: '在对话界面里直接建和删 git worktree，一个任务用自己的一份检出，不用离开聊天窗口。',
  },
  'dsh-web-ide': {
    en: 'Adds an IDE tab with a VSCode-style read-only code viewer in the Dark Modern theme, registered into the conversation view ring.',
    zh: '加一个 IDE 标签页，里面是 VSCode 风格、Dark Modern 主题的只读代码查看器，挂在对话视图那一圈里。',
  },
  'dsh-computers': {
    en: 'Connects your own machines to a DSH deployment and lets the agent run commands on them, extending a session past the local host.',
    zh: '把你自己的机器接进 DSH 部署，agent 能在那些机器上执行命令，会话不再局限在本机。',
  },
  'dshost-plugin': {
    en: 'Relays the dsh web UI through the DSHost cloud service, so you can reach your local interface from anywhere without opening a port.',
    zh: '通过 DSHost 云端中继 dsh 网页界面，人在外面也能连回本机，不用自己开端口。',
  },
  'dsh-design-panel': {
    en: 'Interprets declarative design files as editable panels inside a conversation workspace, so a layout can be adjusted and reviewed in place.',
    zh: '把声明式的设计文件解释成对话工作区里的可编辑面板，版式就地调整、就地看效果。',
  },
  'dsh-codegraph-visualizer': {
    en: 'Turns code-graph data from the codegraph and tool-lens sources into an interactive graph, aggregating the input before rendering it.',
    zh: '把 codegraph 与 tool-lens 的数据聚合成可交互的代码图谱，先转换再渲染，不是直接画原始数据。',
  },
  'dsh-tool-gate': {
    en: 'Keeps only whitelisted tools in the request and defers everything else to the host deferred loading chain, preserving an undo journal for each removal.',
    zh: '请求里只留白名单内的工具，其余交给宿主的延迟加载链，每次撤下都记进 undo journal 以便还原。',
  },
  'dsh-tool-surface': {
    en: 'Trims the tool definitions sent with each turn to a measured whitelist, and writes the parameters of removed tools into the system prompt.',
    zh: '把每轮随请求发出的工具定义收到一份实测白名单，被撤下工具的参数改写进系统提示词。',
  },
  'dsh-tool-plus': {
    en: 'Ports the Oh My Pi bash runtime into a tool plugin, adding a persistent shell, output minimisation, managed background jobs and command interception.',
    zh: '把 Oh My Pi 的 bash 运行时搬成工具插件：常驻 shell、输出压缩、后台任务托管、命令拦截。',
  },
  'dsh-octop-memory': {
    en: 'Recalls shared memory before each turn and reports the turn afterwards, so context from earlier sessions can reach the current one.',
    zh: '每轮开始前召回共享记忆，轮末再把这一轮写回去，早先会话里的上下文能带到当前这轮。',
  },
  'dsh-syn-config': {
    en: 'Syncs skills, profile settings and AGENTS.md with a private config repository on macOS and Windows, keeping two machines on one configuration.',
    zh: '把技能、profile 配置和 AGENTS.md 同步到一个私有配置仓库，macOS 与 Windows 两台机器用同一份配置。',
  },
  'dsh-better-plugin-updater': {
    en: 'Checks several sources for plugin bundle updates and produces an update plan, leaving the actual installation for you to approve.',
    zh: '从多个源检查插件版本，产出一份更新计划；真正动手安装还是等你确认。',
  },
  'dsh-claude-whiteboard': {
    en: 'Adds the claude-whiteboard skill, so the agent lays out diagrams, flows and plans on a whiteboard and plays the result back in the session.',
    zh: '装上 claude-whiteboard 技能，agent 把图、流程和方案画在小白板上，画完在会话里回放。',
  },
  'dsh-claude-motion': {
    en: 'Adds the claude-motion skill, so the agent writes short animated films as code, scene by scene, and plays them inside the session.',
    zh: '装上 claude-motion 技能，agent 用代码一段段写短片，逐场景生成，在会话里播出来。',
  },
  'dsh-atan-daily': {
    en: 'Adds scheduled collection tasks that each file a timestamped report, so recurring checks leave a dated trail without manual runs.',
    zh: '加上定时采集任务，每次运行留下一份带时间戳的报告，例行检查不用手动跑也有记录。',
  },
  'dsh-ue-asset': {
    en: 'Browses, previews and exports Unreal Engine 4 and 5 assets from local PAK archives through CUE4Parse, without opening the editor.',
    zh: '不用开虚幻编辑器，靠 CUE4Parse 浏览、预览、导出本地 PAK 里的 UE4 / UE5 资源。',
  },
  'dsh-teamflow': {
    en: 'Adds a workbench for the requirement to development to defect pipeline, tracking each stage inside DSH rather than across separate tools.',
    zh: '加一套工作台，把需求、开发、缺陷这条流水线放进 DSH 里跟，不用在几个工具之间来回倒。',
  },
  'dsh-mnemon': {
    en: 'Provides composable view-based context with pluggable sources and strategies, plus layered memory and self-evolving skills available on install.',
    zh: '提供可组合的视图式上下文，来源与策略都能换，分层记忆和自进化技能装好就能用。',
  },
  'dsh-imagegen': {
    en: 'Generates and edits images in the web client through configurable provider channels, covering text-to-image and image-to-image from the chat.',
    zh: '在网页版里生成和改图，走你配好的图片服务商通道，文生图与图生图都能在对话里完成。',
  },
};
