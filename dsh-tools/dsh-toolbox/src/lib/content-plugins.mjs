// 插件目录。条目全部来自 npm registry 上 @deepseek-ai/dsh-* 的真实元数据（版本、description、仓库）。
// 一行说明按包的自我描述改写，没有编造功能。

export const PLUGIN_INDEX = {
  en: {
    title: 'DeepSeek Harness plugins — what ships and how to install one',
    desc: 'The dsh plugin model in one page: bundles vs seams, the install command, how versions are checked, and the 14 packages that make up a profile.',
    h1: 'DeepSeek Harness plugins',
    cite: 'A dsh plugin is an npm package added to a profile; `dsh plugin --profile <name> add <package>` installs it and pnpm owns the rest.',
    lead: [
      'A profile is a stack of patch layers. `dsh-base` is the first layer every profile gets; `dsh-web-app` and `dsh-headless` add a surface on top of it. Everything else is a seam: a swap-in point for one capability, like the filesystem, the shell, or the sandbox.',
      'This page lists the packages published under `@deepseek-ai/dsh-*` that make up a default profile, and the two commands that add or remove one.',
    ],
    sections: [
      { h: 'Install or remove one', p: ['Plugin management forwards to pnpm inside the profile directory, so argument order and package specs behave the way pnpm behaves.'], code: 'dsh plugin --profile web add @deepseek-ai/dsh-otel\ndsh plugin --profile web remove @deepseek-ai/dsh-otel' },
      { h: 'Two kinds of package', p: ['Bundles (`dsh-base`, `dsh-web-app`, `dsh-headless`, `dsh-sdk-app`, `dsh-sdk-minimal`, `dsh-acp-app`) are patch layers named in `dsh.profile.bundles`. Seams (`dsh-fs`, `dsh-shell`, `dsh-sandbox`, `dsh-compaction`, `dsh-session`, …) provide one capability and are selected by the bundle that needs them.'] },
      { h: 'Versions and compatibility', p: ['A plugin declares a compatible dsh range through `engines.dsh`, or through its DSH peer dependencies. When the range does not include your runtime, the CLI skips the plugin and prints the requirement instead of booting something that may crash.'] },
    ],
    faq: [
      { q: 'Where do plugins get installed?', a: 'Into the profile directory: `$DSH_HOME/profiles/<name>`, as dependencies in its `package.json`.' },
      { q: 'Can I install the same plugin into two profiles?', a: 'Yes. Each profile has its own `package.json` and `node_modules`; they do not share installs.' },
      { q: 'What happens if a plugin is incompatible?', a: 'It is skipped with a message naming the requirement. You can update it or grant an exact-version exemption with `dsh plugin allow-version`.' },
    ],
    related: ['guides/cli', 'guides/what-is-deepseek-harness', 'reference'],
  },
  zh: {
    title: 'DeepSeek Harness 插件 — 有哪些、怎么装',
    desc: '一页讲清 dsh 的插件模型：bundle 与 seam 的区别、安装命令、版本怎么检查，以及组成一个 profile 的 14 个包。',
    h1: 'DeepSeek Harness 插件',
    cite: 'dsh 的插件就是一个装进 profile 的 npm 包；`dsh plugin --profile <名字> add <包名>` 负责装，其余交给 pnpm。',
    lead: [
      'profile 是一摞补丁层。`dsh-base` 是每个 profile 的第一层，`dsh-web-app` 和 `dsh-headless` 在它上面加一个界面。剩下的都是 seam：某一项能力的可替换点，比如文件系统、shell、沙箱。',
      '这一页列出组成默认 profile 的那些 `@deepseek-ai/dsh-*` 包，以及添加和移除它们的两条命令。',
    ],
    sections: [
      { h: '装一个，或卸一个', p: ['插件管理会把参数转发给 profile 目录里的 pnpm，所以参数顺序和包名写法跟 pnpm 一样。'], code: 'dsh plugin --profile web add @deepseek-ai/dsh-otel\ndsh plugin --profile web remove @deepseek-ai/dsh-otel' },
      { h: '两类包', p: ['bundle（`dsh-base`、`dsh-web-app`、`dsh-headless`、`dsh-sdk-app`、`dsh-sdk-minimal`、`dsh-acp-app`）是补丁层，写在 `dsh.profile.bundles` 里。seam（`dsh-fs`、`dsh-shell`、`dsh-sandbox`、`dsh-compaction`、`dsh-session` 等）只提供一项能力，由需要它的 bundle 选走。'] },
      { h: '版本与兼容', p: ['插件通过 `engines.dsh` 或 DSH 的 peer 依赖声明自己兼容的 dsh 区间。运行版本不在区间内时，命令行会跳过这个插件并打印要求，而不是启动一个可能崩的组合。'] },
    ],
    faq: [
      { q: '插件装到哪？', a: '装进 profile 目录：`$DSH_HOME/profiles/<名字>`，作为它 `package.json` 里的依赖。' },
      { q: '同一个插件能同时装进两个 profile 吗？', a: '能。每个 profile 有自己的 `package.json` 和 `node_modules`，互不共享。' },
      { q: '插件不兼容会怎样？', a: '会被跳过，并打印它要求的版本区间。可以升级插件，或用 `dsh plugin allow-version` 给这一对版本开精确豁免。' },
    ],
    related: ['guides/cli', 'guides/what-is-deepseek-harness', 'reference'],
  },
};

// slug → 包名、版本、一行说明（中英）、类别
export const PLUGINS = [
  {
    slug: 'dsh-base', pkg: '@deepseek-ai/dsh-base', version: '0.0.1-rc.1', kind: 'bundle',
    en: 'The shared core as a profile bundle: every profile\'s first patch layer, inserting the base plugin rows over the empty profile root.',
    zh: '共享内核，以 bundle 形式提供：每个 profile 的第一层补丁，往空根上插入基础插件行。',
  },
  {
    slug: 'dsh-web-app', pkg: '@deepseek-ai/dsh-web-app', version: '0.0.1-rc.1', kind: 'bundle',
    en: 'The browser-surface bundle: the web patch layer over dsh-base, plus the runtime glue that serves the frontend, prints the URL line and sets bash runtime variables.',
    zh: '浏览器界面 bundle：在 dsh-base 之上叠 web 补丁层，外加负责提供前端文件、打印地址行、设置 bash 运行时变量的胶水插件。',
  },
  {
    slug: 'dsh-headless', pkg: '@deepseek-ai/dsh-headless', version: '0.0.1-rc.1', kind: 'bundle',
    en: 'The one-shot bundle: a direct Agent/Session runner over dsh-base with no host, HTTP or browser layer.',
    zh: '一次性运行 bundle：直接在 dsh-base 上跑 Agent/Session，没有宿主、HTTP 或浏览器层。',
  },
  {
    slug: 'dsh-session', pkg: '@deepseek-ai/dsh-session', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Event-sourced session store. Sessions are appended as events, which is why a session file grows by frames rather than being rewritten.',
    zh: '事件溯源的会话存储。会话以事件追加写入，所以会话文件是逐帧变大的，而不是整份重写。',
  },
  {
    slug: 'dsh-compaction', pkg: '@deepseek-ai/dsh-compaction', version: '0.0.1-rc.5', kind: 'seam',
    en: 'The compaction seam (`ctx.compaction`): the swap-in point for how a session gets shortened when the context window fills.',
    zh: '压缩能力的 seam（`ctx.compaction`）：上下文窗口满了以后，会话以什么方式被压缩，从这里替换。',
  },
  {
    slug: 'dsh-tools', pkg: '@deepseek-ai/dsh-tools', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Tool registry and execution pipeline: how tools are declared, resolved and run.',
    zh: '工具注册表与执行管线：工具怎么声明、怎么解析、怎么执行。',
  },
  {
    slug: 'dsh-skill', pkg: '@deepseek-ai/dsh-skill', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Agent skill provider registry. Every installed skill costs context before you use it, which is what the Skill Load Audit tool measures.',
    zh: '技能提供者注册表。每个装上的技能在你用它之前就占上下文，Skill Load Audit 量的就是这个。',
  },
  {
    slug: 'dsh-fs', pkg: '@deepseek-ai/dsh-fs', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Filesystem capability seam (`ctx.fs`): text IO plus optional version-guarded atomic mutations, and the `fs/*` policy events.',
    zh: '文件系统能力 seam（`ctx.fs`）：文本读写，可选带版本校验的原子修改，以及 `fs/*` 策略事件。',
  },
  {
    slug: 'dsh-shell', pkg: '@deepseek-ai/dsh-shell', version: '0.0.1-rc.5', kind: 'seam',
    en: 'Bash executor seam (`ctx.shell`). On Windows, `dsh-pwsh-local` supplies the PowerShell implementation instead.',
    zh: 'bash 执行器 seam（`ctx.shell`）。Windows 上由 `dsh-pwsh-local` 提供 PowerShell 实现。',
  },
  {
    slug: 'dsh-sandbox', pkg: '@deepseek-ai/dsh-sandbox', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Process-sandbox seam (`ctx.sandbox`): the confinement vocabulary and the SandboxProvider contract that backends implement.',
    zh: '进程沙箱 seam（`ctx.sandbox`）：约束词汇表，以及后端要实现的那份 SandboxProvider 契约。',
  },
  {
    slug: 'dsh-sandbox-local', pkg: '@deepseek-ai/dsh-sandbox-local', version: '0.0.1-rc.1', kind: 'backend',
    en: 'Local sandbox backends: bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner. Probed at runtime and fail-closed.',
    zh: '本地沙箱后端：bwrap、npm 分发的 landlock-run 启动器、macOS Seatbelt，或 Windows ACL 受限令牌。运行时探测，探测失败就拒绝执行。',
  },
  {
    slug: 'dsh-acp', pkg: '@deepseek-ai/dsh-acp', version: '0.0.1-rc.1', kind: 'bundle',
    en: 'Automation-only Agent Client Protocol server: drive a DSH agent over JSON-RPC stdio. Boot it with `dsh --profile acp`.',
    zh: '只面向自动化的 Agent Client Protocol 服务：通过 JSON-RPC stdio 驱动 DSH agent，用 `dsh --profile acp` 启动。',
  },
  {
    slug: 'dsh-jobs', pkg: '@deepseek-ai/dsh-jobs', version: '0.0.1-rc.3', kind: 'seam',
    en: 'Background job registry (`ctx.jobs`): shared ids, owner isolation, polling, cancellation and completion listeners for long-running tool work.',
    zh: '后台任务注册表（`ctx.jobs`）：共享 id、按所有者隔离、轮询、取消，以及长任务完成时的监听。',
  },
  {
    slug: 'dsh-web', pkg: '@deepseek-ai/dsh-web', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Web access seam (`ctx.web`): a search/fetch provider registry with order-independent selection and a typed error taxonomy.',
    zh: '联网能力 seam（`ctx.web`）：搜索与抓取的提供者注册表，选择与注册顺序无关，并带一套类型化的错误分类。',
  },
  {
    slug: 'dsh-workspace', pkg: '@deepseek-ai/dsh-workspace', version: '0.0.1-rc.1', kind: 'seam',
    en: 'Workspace entity registry (`ctx.workspace`): durable workspace records with validated session attachment — the index behind the session list.',
    zh: '工作区实体注册表（`ctx.workspace`）：持久的工作区记录，加上经过校验的会话挂载——会话列表背后的那份索引。',
  },
  {
    slug: 'dsh-otel', pkg: '@deepseek-ai/dsh-otel', version: '0.2.0-rc.1', kind: 'service',
    en: 'OTLP telemetry: independent ordinary-event and byte-bounded session-log channels.',
    zh: 'OTLP 遥测：普通事件与会话日志两条独立通道，会话日志按字节封顶。',
  },
];

export function pluginBySlug(slug) {
  return PLUGINS.find((p) => p.slug === slug);
}

const KIND_LABEL = {
  bundle: { en: 'profile bundle', zh: 'profile bundle' },
  seam: { en: 'capability seam', zh: '能力 seam' },
  backend: { en: 'sandbox backend', zh: '沙箱后端' },
  service: { en: 'service', zh: '服务' },
};

export { pluginPage } from './plugin-page.mjs';
