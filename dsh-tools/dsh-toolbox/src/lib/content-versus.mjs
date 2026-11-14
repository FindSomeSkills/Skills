// 对比页。DSH 一侧的事实来自本机 README 与 dsh --help；opencode 一侧来自 opencode.ai/docs；
// Claude Code 与 Codex 只写稳定、公开的定位与包名，具体能力以各自官方文档为准。

const HONEST = {
  en: 'What DSH does worse: it is on release candidates, its documentation lives in the repository rather than a docs site, a plugin built for another dsh version is skipped at boot, and the plugin ecosystem is small. If you want a product with a support contract and a decade of tutorials, none of these three comparisons will talk you into DSH.',
  zh: 'DSH 差在哪：还在 rc 阶段；文档在仓库里而不是文档站；为别的 dsh 版本写的插件会在启动时被跳过；插件生态小。想要有支持合同、有十年教程的产品，这三个对比都不会让你选 DSH。',
};

export const VERSUS = {
  'compare/vs-claude-code': {
    en: {
      title: 'DeepSeek Harness vs Claude Code — which terminal agent fits',
      desc: 'A side-by-side of DeepSeek Harness and Claude Code on install, extension model, session storage and interfaces, plus when each one is the wrong choice.',
      h1: 'DeepSeek Harness vs Claude Code',
      cite: 'Claude Code is a closed-source terminal agent from Anthropic; DeepSeek Harness is an open, plugin-composed CLI whose sessions stay in `~/.dsh`.',
      lead: [
        'Both run an agent loop in a terminal. The difference that matters is what you can change inside them, and where the conversation record lives.',
        'Claude Code installs from npm as `@anthropic-ai/claude-code`. DeepSeek Harness installs as `@deepseek-ai/dsh` and needs Node.js 24.9.0 or newer.',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'Claude Code'],
        rows: [
          ['Install', '`npm install -g @deepseek-ai/dsh`', '`npm install -g @anthropic-ai/claude-code`'],
          ['Source', 'Open, plugin-composed; the CLI is one launcher over profile patches', 'Closed source'],
          ['Interfaces', 'Terminal, browser UI (`dsh web`), one-shot (`dsh headless`), ACP and SDK over stdio', 'Terminal-first, with IDE integrations'],
          ['Extending it', 'npm plugin packages installed into a profile; every capability is a seam', 'Hooks, MCP servers and skills configured through settings'],
          ['Session data', 'Files in `$DSH_HOME` (`~/.dsh`), readable and inspectable', 'Local transcripts managed by the tool'],
          ['Model choice', 'Whatever the profile and provider plugins configure', 'Anthropic models'],
        ],
      },
      sections: [
        { h: 'Pick DeepSeek Harness when', p: ['You want to read and repair the session store yourself, swap the sandbox or shell implementation, or drive the agent from your own program over ACP or the SDK. The profile model is the point: every layer is a patch you can inspect with `--dump-config`.'] },
        { h: 'Pick Claude Code when', p: ['You want a finished product with Anthropic\'s own models wired in, and you do not intend to change how it works internally. Less assembly, less access.'] },
        { h: 'The honest part', p: [HONEST.en] },
      ],
      faq: [
        { q: 'Can I run both on one machine?', a: 'Yes. They install as separate npm packages and keep data in separate directories.' },
        { q: 'Is DeepSeek Harness a fork of Claude Code?', a: 'No. It is a separate Node application whose behaviour is assembled from Cordis plugin patches.' },
        { q: 'Which one is cheaper?', a: 'Neither is a subscription in the DSH case — you pay for whatever model API your profile points at. Claude Code is billed through Anthropic.' },
      ],
      related: ['guides/what-is-deepseek-harness', 'compare/vs-codex-harness', 'plugins'],
    },
    zh: {
      title: 'DeepSeek Harness 和 Claude Code 哪个好',
      desc: '从安装、扩展方式、会话存储、界面四个维度对比 DeepSeek Harness 和 Claude Code，并写清各自在什么情况下不该选。',
      h1: 'DeepSeek Harness 对比 Claude Code',
      cite: 'Claude Code 是 Anthropic 的闭源终端 agent；DeepSeek Harness 是开放的、由插件拼成的命令行工具，会话留在 `~/.dsh`。',
      lead: [
        '两者都在终端里跑 agent 循环。真正的差别是你能改它内部多少东西，以及对话记录存在哪。',
        'Claude Code 的 npm 包是 `@anthropic-ai/claude-code`。DeepSeek Harness 是 `@deepseek-ai/dsh`，要求 Node.js 24.9.0 或更高。',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'Claude Code'],
        rows: [
          ['安装', '`npm install -g @deepseek-ai/dsh`', '`npm install -g @anthropic-ai/claude-code`'],
          ['源码', '开放，本体是启动器 + profile 补丁', '闭源'],
          ['界面', '终端、浏览器界面（`dsh web`）、一次性运行（`dsh headless`）、ACP 与 SDK（stdio）', '以终端为主，另有 IDE 集成'],
          ['扩展方式', '装进 profile 的 npm 插件包，每项能力都是一个 seam', '通过设置配置 hooks、MCP 服务与技能'],
          ['会话数据', '`$DSH_HOME`（`~/.dsh`）下的文件，可直接读、可检查', '由工具管理的本地记录'],
          ['模型', '由 profile 与提供者插件配置决定', 'Anthropic 自家模型'],
        ],
      },
      sections: [
        { h: '什么时候选 DeepSeek Harness', p: ['你想自己读、自己修会话存储；想换掉沙箱或 shell 的实现；或者想在自己的程序里通过 ACP 或 SDK 驱动 agent。profile 模型的意义就在这：每一层都是补丁，可以用 `--dump-config` 看清楚。'] },
        { h: '什么时候选 Claude Code', p: ['你要一个成品，模型已经接好，也不打算改它内部怎么运作。装配少，能看到的东西也少。'] },
        { h: '实话', p: [HONEST.zh] },
      ],
      faq: [
        { q: '一台机器能同时装两个吗？', a: '能。它们是两个独立的 npm 包，数据也各放各的目录。' },
        { q: 'DeepSeek Harness 是 Claude Code 的分支吗？', a: '不是。它是一个独立的 Node 应用，行为由 Cordis 插件补丁拼出来。' },
        { q: '哪个更便宜？', a: 'DSH 本身不是订阅制，你付的是 profile 指向的模型 API。Claude Code 通过 Anthropic 计费。' },
      ],
      related: ['guides/what-is-deepseek-harness', 'compare/vs-codex-harness', 'plugins'],
    },
  },

  'compare/vs-codex-harness': {
    en: {
      title: 'DeepSeek Harness vs Codex CLI — two open terminal agents',
      desc: 'DeepSeek Harness and OpenAI Codex CLI both run in a terminal and both are open. Where they differ: profile composition, surfaces, and how much of the runtime you can replace.',
      h1: 'DeepSeek Harness vs Codex CLI',
      cite: 'Codex CLI is OpenAI\'s open terminal agent; DeepSeek Harness is an open CLI whose entire runtime is a stack of replaceable plugin patches.',
      lead: [
        'This is the closest pair in the comparison set: both open, both terminal-first, both run against a model API you configure.',
        'Codex CLI installs from npm as `@openai/codex`. DeepSeek Harness installs as `@deepseek-ai/dsh` and requires Node.js 24.9.0 or newer.',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'Codex CLI'],
        rows: [
          ['Install', '`npm install -g @deepseek-ai/dsh`', '`npm install -g @openai/codex`'],
          ['Vendor', 'DeepSeek', 'OpenAI'],
          ['Runtime shape', 'Launcher + profile patches; every capability is a seam', 'A single CLI application'],
          ['Surfaces', 'Terminal, browser UI, headless, ACP, SDK', 'Terminal and IDE integrations'],
          ['Extending', 'npm plugins in a profile; override any seam', 'Config file, MCP servers, project instructions'],
          ['Inspect before boot', '`--dump-config`, `--dump-config-schema`', 'Configuration is read at start-up'],
        ],
      },
      sections: [
        { h: 'Pick DeepSeek Harness when', p: ['You want to replace pieces of the runtime — the sandbox backend, the shell executor, the compaction strategy — or embed the agent in another program through ACP or the SDK.'] },
        { h: 'Pick Codex CLI when', p: ['You are already in OpenAI\'s ecosystem, want one binary-shaped tool, and prefer configuring behaviour over replacing internals.'] },
        { h: 'The honest part', p: [HONEST.en] },
      ],
      faq: [
        { q: 'Are both open source?', a: 'Both publish source. Codex CLI is OpenAI\'s repository; DeepSeek Harness ships as npm packages under `@deepseek-ai/`, including every seam.' },
        { q: 'Do they use the same model?', a: 'No. Each points at the providers you configure; DSH resolves them through provider plugins.' },
        { q: 'Can I move sessions between them?', a: 'Not directly. DSH stores sessions as `session*.jsonl.zstd` in `$DSH_HOME`; the formats are unrelated.' },
      ],
      related: ['compare/vs-claude-code', 'compare/vs-opencode', 'guides/cli'],
    },
    zh: {
      title: 'DeepSeek Harness 和 Codex CLI 哪个好',
      desc: 'DeepSeek Harness 和 OpenAI Codex CLI 都在终端里跑，也都开放。差别在运行时怎么拼、有几个界面、你能替换掉多少内部实现。',
      h1: 'DeepSeek Harness 对比 Codex CLI',
      cite: 'Codex CLI 是 OpenAI 的开放终端 agent；DeepSeek Harness 的整个运行时是一摞可替换的插件补丁。',
      lead: [
        '这一组是三个对比里最接近的：都开放、都以终端为主、都跑在你配置的模型 API 上。',
        'Codex CLI 的 npm 包是 `@openai/codex`。DeepSeek Harness 是 `@deepseek-ai/dsh`，要求 Node.js 24.9.0 或更高。',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'Codex CLI'],
        rows: [
          ['安装', '`npm install -g @deepseek-ai/dsh`', '`npm install -g @openai/codex`'],
          ['出品方', 'DeepSeek', 'OpenAI'],
          ['运行时形态', '启动器 + profile 补丁，每项能力都是 seam', '单个命令行应用'],
          ['界面', '终端、浏览器界面、一次性运行、ACP、SDK', '终端与 IDE 集成'],
          ['扩展', 'profile 里的 npm 插件，可替换任意 seam', '配置文件、MCP 服务、项目说明'],
          ['启动前可检查', '`--dump-config`、`--dump-config-schema`', '启动时读取配置'],
        ],
      },
      sections: [
        { h: '什么时候选 DeepSeek Harness', p: ['你想换掉运行时里的零件——沙箱后端、shell 执行器、压缩策略——或者想把 agent 嵌进别的程序，用 ACP 或 SDK。'] },
        { h: '什么时候选 Codex CLI', p: ['你已经在 OpenAI 的生态里，想要一个形态单一的工具，偏好用配置改行为而不是替换内部实现。'] },
        { h: '实话', p: [HONEST.zh] },
      ],
      faq: [
        { q: '两个都开源吗？', a: '都公开源码。Codex CLI 是 OpenAI 的仓库；DeepSeek Harness 以 `@deepseek-ai/` 下的 npm 包发布，连每个 seam 都在。' },
        { q: '用的是同一个模型吗？', a: '不是。各自指向你配置的提供者，DSH 通过提供者插件解析。' },
        { q: '会话能在两者之间搬吗？', a: '不能直接搬。DSH 把会话存成 `$DSH_HOME` 下的 `session*.jsonl.zstd`，格式互不相干。' },
      ],
      related: ['compare/vs-claude-code', 'compare/vs-opencode', 'guides/cli'],
    },
  },

  'compare/vs-opencode': {
    en: {
      title: 'DeepSeek Harness vs OpenCode — plugin models compared',
      desc: 'Both open and both extensible, but the extension unit differs: OpenCode ships plugins, skills and MCP servers over a TUI/desktop/web shell; DeepSeek Harness layers npm patch bundles.',
      h1: 'DeepSeek Harness vs OpenCode',
      cite: 'OpenCode ships a terminal, desktop and web shell with plugins and MCP; DeepSeek Harness composes its whole runtime from npm patch layers.',
      lead: [
        'OpenCode is an open source coding agent with a TUI, a desktop app and a web interface reached through `opencode pair`. DeepSeek Harness has no desktop app; its surfaces are the terminal, `dsh web`, `dsh headless`, ACP and the SDK.',
        'OpenCode installs from a shell script, Homebrew or npm, and the npm package runs a postinstall step to pick a native binary. DeepSeek Harness is plain npm and Node.js 24.9.0 or newer.',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'OpenCode'],
        rows: [
          ['Install', '`npm install -g @deepseek-ai/dsh`', '`curl -fsSL https://opencode.ai/v2/install | bash`, Homebrew, npm or a standalone binary'],
          ['Surfaces', 'Terminal, browser UI, headless, ACP, SDK', 'TUI, desktop app, web via `opencode pair`, Docker images'],
          ['Extension unit', 'npm patch bundles and capability seams', 'Plugins, skills, commands, MCP servers'],
          ['Config', '`package.json` + `cordis.patch.yml` per profile, plus a home patch', 'A single OpenCode config'],
          ['Session data', '`session*.jsonl.zstd` under `$DSH_HOME`', 'Managed by OpenCode in its own storage'],
          ['Windows', 'Supported; PowerShell executor and ACL sandbox backend available', 'Package managers on Windows are not supported; standalone binary is offered'],
        ],
      },
      sections: [
        { h: 'Pick DeepSeek Harness when', p: ['You want to own the runtime: replace the shell executor, swap the sandbox implementation, change how compaction works, and inspect the composed tree before booting.'] },
        { h: 'Pick OpenCode when', p: ['You want a desktop app as well as a terminal, Docker images for reproducibility, and a config-file extension model rather than a patch-layer one.'] },
        { h: 'The honest part', p: [HONEST.en] },
      ],
      faq: [
        { q: 'Do both support MCP servers?', a: 'Yes. OpenCode documents MCP servers as first-class config; DSH reaches them through plugins in a profile.' },
        { q: 'Which one has more plugins today?', a: 'OpenCode\'s plugin list is larger right now. DSH publishes its seams as separate packages but the third-party ecosystem is smaller.' },
        { q: 'Does either need Docker?', a: 'No. OpenCode publishes Docker images for convenience; DSH runs directly from npm.' },
      ],
      related: ['compare/vs-codex-harness', 'plugins', 'guides/what-is-deepseek-harness'],
    },
    zh: {
      title: 'DeepSeek Harness 对比 OpenCode — 插件模型不一样',
      desc: '两者都开放、都可扩展，但扩展的单位不同：OpenCode 用插件、技能、MCP 配 TUI/桌面/网页；DeepSeek Harness 用 npm 补丁层拼出整个运行时。',
      h1: 'DeepSeek Harness 对比 OpenCode',
      cite: 'OpenCode 提供终端、桌面和网页三种界面，扩展靠插件与 MCP；DeepSeek Harness 的整个运行时由 npm 补丁层拼成。',
      lead: [
        'OpenCode 是开源的编码 agent，有 TUI、桌面应用，以及用 `opencode pair` 连的网页界面。DeepSeek Harness 没有桌面应用，界面是终端、`dsh web`、`dsh headless`、ACP 和 SDK。',
        'OpenCode 可以从安装脚本、Homebrew、npm 或独立二进制安装，npm 包会用 postinstall 选平台原生包。DeepSeek Harness 就是普通 npm 包，要求 Node.js 24.9.0 或更高。',
      ],
      table: {
        head: ['', 'DeepSeek Harness', 'OpenCode'],
        rows: [
          ['安装', '`npm install -g @deepseek-ai/dsh`', '`curl -fsSL https://opencode.ai/v2/install | bash`、Homebrew、npm 或独立二进制'],
          ['界面', '终端、浏览器界面、一次性运行、ACP、SDK', 'TUI、桌面应用、`opencode pair` 网页、Docker 镜像'],
          ['扩展单位', 'npm 补丁 bundle 与能力 seam', '插件、技能、命令、MCP 服务'],
          ['配置', '每个 profile 的 `package.json` + `cordis.patch.yml`，再加一份主目录补丁', '一份 OpenCode 配置'],
          ['会话数据', '`$DSH_HOME` 下的 `session*.jsonl.zstd`', '由 OpenCode 自己管理'],
          ['Windows', '支持；有 PowerShell 执行器与 ACL 沙箱后端', '不支持 Windows 包管理器，提供独立二进制'],
        ],
      },
      sections: [
        { h: '什么时候选 DeepSeek Harness', p: ['你想自己掌握运行时：换 shell 执行器、换沙箱实现、改压缩方式，并且在启动前就能看清合成后的配置树。'] },
        { h: '什么时候选 OpenCode', p: ['你除了终端还想要桌面应用，想要 Docker 镜像保证环境一致，喜欢配置文件式的扩展而不是补丁层式的。'] },
        { h: '实话', p: [HONEST.zh] },
      ],
      faq: [
        { q: '两边都支持 MCP 服务吗？', a: '都支持。OpenCode 把 MCP 服务写进配置；DSH 通过 profile 里的插件接入。' },
        { q: '现在哪边插件多？', a: 'OpenCode 的插件列表目前更大。DSH 把每个 seam 单独发包，第三方生态更小。' },
        { q: '必须要 Docker 吗？', a: '都不需要。OpenCode 提供 Docker 镜像只是方便；DSH 直接从 npm 跑。' },
      ],
      related: ['compare/vs-codex-harness', 'plugins', 'guides/what-is-deepseek-harness'],
    },
  },
};
