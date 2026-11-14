// 需求页（Guide）内容。事实来自：本机 @deepseek-ai/dsh 0.2.1-rc.2 的 README 与 dsh --help 输出、
// npm registry 上的 @deepseek-ai/dsh 元数据（engines / dist-tags）。没有引用未经核实的文档。

import { MORE_GUIDES } from './content-guides-more.mjs';

export const GUIDES = {
  'guides/what-is-deepseek-harness': {
    en: {
      title: 'What Is DeepSeek Harness — the dsh CLI explained',
      desc: 'DeepSeek Harness (DSH) is a Node command-line tool that boots a profile of plugin layers and runs an agent session. What it installs, where it puts files, what dsh web does.',
      h1: 'What is DeepSeek Harness (DSH)',
      cite: 'DeepSeek Harness is the Node command line tool `dsh`: it boots a profile of layered plugins and runs agent sessions on your machine.',
      lead: [
        'DeepSeek Harness is the program behind the `dsh` command. It runs an agent loop on your own machine, keeps each conversation in a session file on disk, and is assembled from plugins rather than shipped as one fixed binary.',
        'The npm package is `@deepseek-ai/dsh`. Its `bin` entry is `dsh`, and it declares Node.js 24.9.0 or newer. At the time of writing the published versions are 0.2.2-rc.1 (`latest`), 0.2.2-rc.3 (`next`) and 0.2.2-alpha.3 (`alpha`).',
        'Three names for one thing: the npm package is @deepseek-ai/dsh, the command is dsh, and people shorten it to DSH in issues, posts and plugin docs. If you searched for dsh or DSH, this is the page.',
      ],
      sections: [
        {
          h: 'A profile, not a single mode',
          p: [
            '`dsh <name>` boots the profile stored under `$DSH_HOME/profiles/<name>`. A profile is a directory with two files: `package.json` (plugin dependencies plus a `dsh.profile.bundles` list) and `cordis.patch.yml` (your own patch layer).',
            'The shipped profiles are `web`, `headless`, `sdk`, `sdk-minimal` and `acp`. The name `desktop` is reserved for the Electron app, so the CLI refuses to boot it. On first use, the shipped profiles initialise themselves from templates.',
          ],
        },
        {
          h: 'Where your files go',
          p: [
            'Everything lives under `$DSH_HOME`, which defaults to `~/.dsh`. Profiles sit in `profiles/`, sessions under `sessions/`, and the workspace index under `storages/`.',
            'A session is not one file. The payload is `session*.jsonl.zstd`, the list entry is an id inside `storages/workspace.json`, and the title and statistics live in `storages/session_projcache.json`. Treating those three as one thing is why "my session disappeared" reports keep happening.',
          ],
        },
        {
          h: 'How it is put together',
          p: [
            'The profile tree composes over an empty root: each bundle patch in `dsh.profile.bundles` order, then the profile\'s `cordis.patch.yml`, then `$DSH_HOME/cordis.patch.yml`, then any `--patch` overlay you pass.',
            '`--dump-default-config`, `--dump-config` and `--dump-config-schema` print that composed tree without booting it, which is the fastest way to see what a plugin actually changed.',
          ],
        },
      ],
      faq: [
        { q: 'Is DeepSeek Harness the same as the DeepSeek chat app?', a: 'No. The chat app is a hosted product. DeepSeek Harness is a local command line tool that runs agent sessions on your machine and stores them in your own `~/.dsh` directory.' },
        { q: 'Do I need Node.js?', a: 'Yes. The package declares Node.js 24.9.0 or newer. There is no standalone installer that avoids Node.' },
        { q: 'What does the web profile do?', a: '`dsh web` serves the browser UI from your machine. It accepts `--port`, `--host`, `--no-open`, `--public-url` and optional TLS certificate flags.' },
        { q: 'Where are sessions stored?', a: 'Under `$DSH_HOME/sessions/`, as `session*.jsonl.zstd`. The session list is a separate index in `storages/workspace.json`.' },
      ],
      related: ['guides/install', 'guides/cli', 'reference'],
    },
    zh: {
      title: 'dsh 命令怎么用（常用命令速查）',
      desc: 'DeepSeek Harness（DSH）是一个 Node 命令行工具：启动由插件层组成的 profile，在本机跑 agent 会话。装了什么、文件放在哪、dsh web 是做什么的。',
      h1: 'DeepSeek Harness 是什么（dsh）',
      cite: 'DeepSeek Harness 就是 `dsh` 这个 Node 命令行工具：它启动一组分层的插件（profile），在本机跑 agent 会话。',
      lead: [
        'DeepSeek Harness 是 `dsh` 命令背后的程序。它在本机跑 agent 循环，把每段对话存成磁盘上的会话文件，本体由插件拼成，而不是一个固定的二进制。',
        'npm 包名是 `@deepseek-ai/dsh`，`bin` 指向 `dsh`，要求 Node.js 24.9.0 或更高版本。目前发布版本：0.2.2-rc.1（latest）、0.2.2-rc.3（next）、0.2.2-alpha.3（alpha）。',
        '它在群里和帖子里常被简写成 dsh 或 DSH，指的是同一个东西。',
      ],
      sections: [
        {
          h: '它是一个 profile，不是一种模式',
          p: [
            '`dsh <名字>` 启动 `$DSH_HOME/profiles/<名字>` 下的 profile。一个 profile 就是一个目录，里面两个文件：`package.json`（插件依赖，加一份 `dsh.profile.bundles` 清单）和 `cordis.patch.yml`（你自己的补丁层）。',
            '随包提供的是 `web`、`headless`、`sdk`、`sdk-minimal`、`acp` 五个。`desktop` 这个名字留给 Electron 应用，命令行会拒绝启动它。这五个首次使用时会从模板自动初始化。',
          ],
        },
        {
          h: '文件都放在哪',
          p: [
            '所有东西都在 `$DSH_HOME` 下，默认是 `~/.dsh`。profile 在 `profiles/`，会话在 `sessions/`，工作区索引在 `storages/`。',
            '一个会话不是一个文件：负载是 `session*.jsonl.zstd`，列表条目是 `storages/workspace.json` 里的一个 id，标题和统计在 `storages/session_projcache.json`。把这三样当成一样，就是「我的会话不见了」的来源。',
          ],
        },
        {
          h: '它怎么拼起来',
          p: [
            'profile 树从空根开始叠：按 `dsh.profile.bundles` 顺序叠每个 bundle 的补丁，然后叠 profile 的 `cordis.patch.yml`，再叠 `$DSH_HOME/cordis.patch.yml`，最后叠你传的 `--patch`。',
            '`--dump-default-config`、`--dump-config`、`--dump-config-schema` 可以在不启动的情况下打印这棵合成树，这是看某个插件到底改了什么最快的办法。',
          ],
        },
      ],
      faq: [
        { q: 'DeepSeek Harness 和 DeepSeek 的聊天应用是一回事吗？', a: '不是。聊天应用是托管服务。DeepSeek Harness 是本机命令行工具，会话跑在你自己的机器上，存在你自己的 `~/.dsh` 目录里。' },
        { q: '需要装 Node.js 吗？', a: '需要。这个包要求 Node.js 24.9.0 或更高版本，没有绕开 Node 的独立安装包。' },
        { q: 'web profile 是做什么的？', a: '`dsh web` 从本机提供浏览器界面，支持 `--port`、`--host`、`--no-open`、`--public-url` 和可选的 TLS 证书参数。' },
        { q: '会话存在哪？', a: '在 `$DSH_HOME/sessions/` 下，文件名是 `session*.jsonl.zstd`。会话列表是另一个文件 `storages/workspace.json`。' },
      ],
      related: ['guides/install', 'guides/cli', 'reference'],
    },
  },

  'guides/install': {
    en: {
      title: 'Install DeepSeek Harness — Node.js 24.9.0+ Required (v22 Fails)',
      desc: 'Install the dsh CLI on Node.js 24.9.0 or newer. Node 22 and older fail at start-up with a syntax error; this page gives the exact versions, commands and the two first-boot failures.',
      h1: 'Install DeepSeek Harness',
      cite: 'Install with `npm install -g @deepseek-ai/dsh` on Node.js 24.9.0 or newer, then run `dsh web` to open the browser UI.',
      lead: [
        'One npm package, one global command. The rest is Node version and a profile directory that fills itself in on first run.',
        'The package declares Node.js 24.9.0 or newer. Check with `node --version` before you start; an older Node fails at install time with an `EBADENGINE` warning and usually at boot with a syntax error.',
      ],
      sections: [
        {
          h: 'Windows',
          p: [
            'Install Node.js 24.9.0 or newer, then in PowerShell run `npm install -g @deepseek-ai/dsh`.',
            'npm writes `dsh.cmd` and `dsh.ps1` next to `node.exe` in the global prefix. If `dsh` is not found afterwards, that prefix is missing from `PATH` — run `npm prefix -g` to see where it went.',
            'Start with `dsh web`. Pass `--no-open` on a machine where you do not want a browser window to appear, and `--port 8080` to pin the port.',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web --port 8080',
        },
        {
          h: 'macOS',
          p: [
            'Same package. If npm installs into a root-owned prefix you will get `EACCES`; either fix the prefix ownership or install Node through a version manager so the global prefix belongs to your user.',
            'After install, `dsh web` boots the web profile and opens the browser; `dsh web --no-open` prints the URL instead.',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web',
        },
        {
          h: 'Linux',
          p: [
            'Install Node.js 24.9.0 or newer from your distribution or from nodejs.org, then install the package globally.',
            'On a headless server, use `dsh web --host 127.0.0.1 --port 8080 --no-open` and reach it through a tunnel or a reverse proxy. `--host` takes one concrete local address; wildcard addresses are rejected.',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web --host 127.0.0.1 --port 8080 --no-open',
        },
        {
          h: 'If the first boot complains about a plugin',
          p: [
            'Plugins declare a compatible dsh range. When the installed dsh is outside it, the CLI skips that plugin and prints the requirement, the way you would see `Plugin dsh-client-ui-aqua@1.3.1 is incompatible with dsh 0.2.1-rc.2`.',
            'Two fixes: install a plugin version that matches your dsh, or grant an exact-version exemption with `dsh plugin allow-version`, which accepts the risk for that one pair.',
          ],
        },
      ],
      faq: [
        { q: 'What Node version does dsh need?', a: 'Node.js 24.9.0 or newer. That is what the published package declares in `engines.node`.' },
        { q: 'Do I need to install anything else?', a: 'No. The npm package brings the CLI; profiles initialise themselves from shipped templates on first use.' },
        { q: 'Where does it put its data?', a: 'In `$DSH_HOME`, default `~/.dsh` on every platform: `profiles/`, `sessions/`, `storages/`, `logs/`.' },
        { q: 'Can I install it without admin rights?', a: 'Yes, if npm\'s global prefix is writable by you. Set one with `npm config set prefix` and add it to PATH.' },
        { q: 'How do I check it worked?', a: '`dsh --version` prints the version, and `dsh --help` prints the launcher grammar including `dsh web` and `dsh headless`.' },
      ],
      related: ['guides/what-is-deepseek-harness', 'guides/cli', 'session-index-doctor'],
    },
    zh: {
      title: 'DeepSeek Harness 安装 — 需要 Node.js 24.9.0 以上（v22 会失败）',
      desc: '用 npm 在 Node.js 24.9.0 或更高版本上装 dsh。Node 22 及更老版本会在启动时报语法错误；这页给出版本要求、命令，以及最先遇到的两种失败。',
      h1: 'DeepSeek Harness 安装',
      cite: '在 Node.js 24.9.0 或更高版本上执行 `npm install -g @deepseek-ai/dsh`，然后 `dsh web` 打开浏览器界面。',
      lead: [
        '一个 npm 包，一条全局命令。剩下要注意的只有 Node 版本，和首次运行时自己填好的 profile 目录。',
        '这个包要求 Node.js 24.9.0 或更高。装之前先 `node --version`；版本低了会在安装时给出 `EBADENGINE` 警告，启动时通常直接报语法错误。',
      ],
      sections: [
        {
          h: 'Windows',
          p: [
            '装 Node.js 24.9.0 或更高版本，然后在 PowerShell 里执行 `npm install -g @deepseek-ai/dsh`。',
            'npm 会把 `dsh.cmd` 和 `dsh.ps1` 写到全局前缀目录（和 `node.exe` 同级）。装完提示找不到 `dsh`，通常就是这个目录没在 `PATH` 里——用 `npm prefix -g` 看它在哪。',
            '先用 `dsh web` 起界面。不想自动弹浏览器就加 `--no-open`，要固定端口加 `--port 8080`。',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web --port 8080',
        },
        {
          h: 'macOS',
          p: [
            '同一个包。如果 npm 的全局前缀属于 root，会报 `EACCES`；改前缀归属，或者用版本管理工具装 Node，让全局前缀属于你自己。',
            '装好后 `dsh web` 启动 web profile 并打开浏览器；`dsh web --no-open` 只打印地址。',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web',
        },
        {
          h: 'Linux',
          p: [
            '从发行版仓库或 nodejs.org 装 Node.js 24.9.0 以上，然后全局安装这个包。',
            '服务器上没有显示器时用 `dsh web --host 127.0.0.1 --port 8080 --no-open`，再通过隧道或反向代理访问。`--host` 只接受一个具体的本机地址，通配地址会被拒绝。',
          ],
          code: 'node --version\nnpm install -g @deepseek-ai/dsh\ndsh --version\ndsh web --host 127.0.0.1 --port 8080 --no-open',
        },
        {
          h: '首次启动报插件不兼容怎么办',
          p: [
            '插件会声明自己兼容的 dsh 版本区间。装着的 dsh 不在区间内时，命令行会跳过这个插件并打印要求，类似 `Plugin dsh-client-ui-aqua@1.3.1 is incompatible with dsh 0.2.1-rc.2`。',
            '两种处理：换成匹配当前 dsh 的插件版本，或者用 `dsh plugin allow-version` 给这一对版本开一个精确版本豁免——等于明确接受风险。',
          ],
        },
      ],
      faq: [
        { q: 'dsh 需要哪个 Node 版本？', a: 'Node.js 24.9.0 或更高。这是发布包在 `engines.node` 里声明的要求。' },
        { q: '还要装别的东西吗？', a: '不用。npm 包装好命令行，profile 首次使用时会从随包模板自动初始化。' },
        { q: '数据放在哪？', a: '在 `$DSH_HOME` 下，各平台默认都是 `~/.dsh`：`profiles/`、`sessions/`、`storages/`、`logs/`。' },
        { q: '没有管理员权限能装吗？', a: '能，只要 npm 全局前缀目录你有写权限。用 `npm config set prefix` 换一个目录，再加进 PATH。' },
        { q: '怎么确认装好了？', a: '`dsh --version` 打印版本；`dsh --help` 打印启动器语法，包括 `dsh web` 和 `dsh headless`。' },
      ],
      related: ['guides/what-is-deepseek-harness', 'guides/cli', 'session-index-doctor'],
    },
  },

  'guides/cli': {
    en: {
      title: 'dsh CLI commands — a cheat sheet for DeepSeek Harness',
      desc: 'The dsh command grammar in one page: boot a profile, serve the web UI, run one headless task, manage plugins, dump the config tree, and pass app arguments.',
      h1: 'dsh CLI cheat sheet',
      cite: 'The `dsh` launcher boots a named profile, forwards unknown flags to that profile\'s app, and uses `dsh plugin` for plugin management.',
      lead: [
        'The launcher parses only its own flags. The first token it does not recognise starts the booted app\'s arguments — which is why `dsh web --port 8080` puts `--port` in the web app, not the launcher.',
        'Everything below is from `dsh --help` and `dsh web --help` on dsh 0.2.1-rc.2.',
      ],
      sections: [
        {
          h: 'Boot something',
          p: [
            '`dsh <name>` and `dsh --profile <name>` are the same call: boot the profile under `$DSH_HOME/profiles/<name>`.',
            '`dsh web` is the web profile; `dsh headless "run the tests"` answers one task, prints the result and exits; `dsh --profile acp` serves automation clients over stdio.',
          ],
          code: 'dsh web\ndsh --profile web --port 8080\ndsh headless "run the tests"\ndsh --profile acp',
        },
        {
          h: 'Web app flags',
          p: [
            'These belong to the web app, so they go after the profile name: `--host`, `--port`, `--no-open`, `--public-url`, `--trusted-host`, `--tls-cert`, `--tls-key`.',
            '`--host` takes one concrete local address; wildcard addresses are rejected. `--port 0` lets the OS pick a free port.',
          ],
          code: 'dsh web --host 127.0.0.1 --port 8080 --no-open\ndsh web --help',
        },
        {
          h: 'Profiles and plugins',
          p: [
            '`dsh plugin --profile <name> <pnpm args>` forwards to pnpm inside the profile directory, so `add`, `remove` and `update` behave like pnpm.',
            '`--from-default-profile <template>` replaces a custom profile with a fresh copy of a shipped template, then boots it — useful when a profile is wedged.',
          ],
          code: 'dsh plugin --profile web add <package>\ndsh rescue --from-default-profile web',
        },
        {
          h: 'Inspect without booting',
          p: [
            '`--dump-default-config` prints the profile tree without your layer, `--dump-config` prints the composed tree, and `--dump-config-schema` prints JSON Schema for entries and patches.',
            '`--patch <path>` adds one more overlay after the profile layer; it is repeatable.',
          ],
          code: 'dsh --profile web --dump-config\ndsh --profile web --dump-config-schema\ndsh tui --patch ./extra.yml',
        },
      ],
      faq: [
        { q: 'Why does `dsh --port 8080` not work?', a: '`--port` belongs to the web app, not the launcher. Write `dsh web --port 8080`.' },
        { q: 'How do I see what a plugin changed?', a: 'Compare `dsh --profile <name> --dump-default-config` with `--dump-config`; the difference is your layer plus the plugin patches.' },
        { q: 'How do I recover a broken profile?', a: '`dsh <name> --from-default-profile <template>` rebuilds it from the shipped template, then boots it.' },
        { q: 'What is the difference between headless and web?', a: 'Headless runs one task and exits with the answer on stdout. Web serves the browser UI and keeps sessions open.' },
        { q: 'Is there a plain `dsh --help`?', a: 'Yes, that is the launcher help. `dsh web --help` shows the web app\'s own flags.' },
      ],
      related: ['guides/install', 'guides/what-is-deepseek-harness', 'plugins'],
    },
    zh: {
      title: 'dsh 命令速查表 — DeepSeek Harness CLI',
      desc: '一页看完 dsh 的命令语法：启动 profile、起 web 界面、跑一次 headless 任务、管理插件、打印配置树，以及应用参数怎么传。',
      h1: 'dsh 命令速查表',
      cite: '`dsh` 启动器只解析自己的参数，其余全部转给它启动的应用；插件管理走 `dsh plugin`。',
      lead: [
        '启动器只解析自己的参数。它认不出的第一个词开始，就是被启动应用的参数——所以 `dsh web --port 8080` 里的 `--port` 属于 web 应用，不属于启动器。',
        '下面所有内容来自 dsh 0.2.1-rc.2 的 `dsh --help` 与 `dsh web --help`。',
      ],
      sections: [
        {
          h: '启动',
          p: [
            '`dsh <名字>` 和 `dsh --profile <名字>` 是同一个调用：启动 `$DSH_HOME/profiles/<名字>` 下的 profile。',
            '`dsh web` 是 web profile；`dsh headless "run the tests"` 回答一个任务、打印结果后退出；`dsh --profile acp` 通过 stdio 提供自动化客户端接口。',
          ],
          code: 'dsh web\ndsh --profile web --port 8080\ndsh headless "run the tests"\ndsh --profile acp',
        },
        {
          h: 'web 应用的参数',
          p: [
            '这些参数属于 web 应用，所以写在 profile 名字后面：`--host`、`--port`、`--no-open`、`--public-url`、`--trusted-host`、`--tls-cert`、`--tls-key`。',
            '`--host` 只接受一个具体的本机地址，通配地址会被拒绝；`--port 0` 让系统自己挑一个空闲端口。',
          ],
          code: 'dsh web --host 127.0.0.1 --port 8080 --no-open\ndsh web --help',
        },
        {
          h: 'profile 与插件',
          p: [
            '`dsh plugin --profile <名字> <pnpm 参数>` 会把参数转发给 profile 目录里的 pnpm，所以 `add`、`remove`、`update` 的行为和 pnpm 一致。',
            '`--from-default-profile <模板>` 用随包模板重建一个自定义 profile 再启动，profile 卡住时用这个。',
          ],
          code: 'dsh plugin --profile web add <包名>\ndsh rescue --from-default-profile web',
        },
        {
          h: '不启动也能看配置',
          p: [
            '`--dump-default-config` 打印不带你自己那层的配置树，`--dump-config` 打印合成后的树，`--dump-config-schema` 打印条目与补丁的 JSON Schema。',
            '`--patch <路径>` 在 profile 层之后再叠一个补丁，可以重复传。',
          ],
          code: 'dsh --profile web --dump-config\ndsh --profile web --dump-config-schema\ndsh tui --patch ./extra.yml',
        },
      ],
      faq: [
        { q: '为什么 `dsh --port 8080` 没用？', a: '`--port` 属于 web 应用，不属于启动器。要写成 `dsh web --port 8080`。' },
        { q: '怎么知道某个插件改了什么？', a: '把 `dsh --profile <名字> --dump-default-config` 和 `--dump-config` 的输出对比，差出来的就是你那层加插件补丁。' },
        { q: 'profile 坏了怎么恢复？', a: '`dsh <名字> --from-default-profile <模板>` 用随包模板重建它，然后启动。' },
        { q: 'headless 和 web 有什么区别？', a: 'headless 跑一个任务、把答案打到标准输出就退出；web 提供浏览器界面并保持会话。' },
        { q: '有没有单独的 `dsh --help`？', a: '有，那是启动器的帮助。`dsh web --help` 显示 web 应用自己的参数。' },
      ],
      related: ['guides/install', 'guides/what-is-deepseek-harness', 'plugins'],
    },
  },

  'guides/desktop': {
    en: {
      title: 'DeepSeek Harness Desktop — why dsh desktop fails and what to run',
      desc: 'The desktop profile name belongs to the Electron app, so the CLI rejects dsh desktop. What the desktop build adds over dsh web, and the two commands that actually start a UI.',
      h1: 'DeepSeek Harness desktop',
      cite: '\`desktop\` is a reserved profile name: the Electron app owns it, so the CLI rejects \`dsh desktop\`. The shipped CLI profiles are web, headless, sdk, sdk-minimal and acp.',
      lead: [
        'If you typed \`dsh desktop\` and got an error, that is not a missing install. The name is taken by the Electron application, and the launcher refuses boot and config-dump requests for it on purpose.',
        'There are two different things people mean by "desktop": an Electron app that wraps the same runtime, and the browser UI that ships inside the CLI. Only one of them starts from the npm package.',
      ],
      sections: [
        {
          h: 'Why \`dsh desktop\` fails',
          p: [
            'The \`desktop\` profile name is reserved for the Electron-owned profile. The CLI rejects boot and config-dump requests for that name, and the npm CLI also rejects plugin-management requests for it — so \`dsh plugin --profile desktop add <package>\` will not work either.',
            'The desktop-installed command can manage the initialized Desktop profile, because it runs with that installation\'s runtime. From the npm package, tooling for that profile is simply unavailable.',
          ],
        },
        {
          h: 'Desktop app vs \`dsh web\`',
          p: [
            '\`dsh web\` boots the \`web\` profile and serves the browser UI from your machine. It takes \`--host\`, \`--port\`, \`--no-open\`, \`--public-url\`, \`--trusted-host\` and optional TLS flags.',
            'The desktop app is a separate carrier around the same runtime: it ships its own profile and its own command, and it is where the reserved name comes from. Running \`dsh web\` gives you the same sessions and the same \`$DSH_HOME\` directory, just in a browser tab instead of a native window.',
          ],
        },
        {
          h: 'What to run instead',
          p: [
            'Start the browser UI on the default port, or pin one and skip the auto-open:',
          ],
          code: 'dsh web\ndash web --port 8080 --no-open',
        },
        {
          h: 'If you need to inspect what the profile actually composes',
          p: [
            'Use a real shipped profile name. \`desktop\` will refuse; \`web\` works:',
          ],
          code: 'dsh --profile web --dump-config\ndash --profile web --dump-config-schema',
        },
      ],
      faq: [
        { q: 'Does the npm package include the desktop app?', a: 'No. The npm package installs the \`dsh\` launcher and the shipped CLI profiles. The desktop app is a separate download with its own command.' },
        { q: 'Can I rename my profile to desktop?', a: 'No. The name is reserved: boot and config-dump requests for \`desktop\` are rejected, so pick another name when you copy a template.' },
        { q: 'Is \`dsh web\` the same UI as the desktop app?', a: 'It is the browser surface of the same runtime. Sessions, \`$DSH_HOME\` and the profile model are the same; the window is not.' },
      ],
      related: ['guides/what-is-deepseek-harness', 'guides/cli', 'guides/install'],
    },
    zh: {
      title: 'DeepSeek Harness 桌面版怎么用 / dsh desktop 为什么失败',
      desc: 'desktop 这个名字被 Electron 应用占用，命令行会拒绝 dsh desktop。桌面版和 dsh web 差在哪，想用界面该跑哪两条命令。',
      h1: 'DeepSeek Harness 桌面版',
      cite: '\`desktop\` 是保留的 profile 名：Electron 应用占用它，所以命令行会拒绝 \`dsh desktop\`。随 CLI 出货的是 web、headless、sdk、sdk-minimal、acp。',
      lead: [
        '敲 \`dsh desktop\` 报错，不是没装好。这个名字归 Electron 应用所有，启动器对它的 boot 与配置导出请求一律拒绝。',
        '大家说的“桌面版”其实是两样东西：一个是包着同一套运行时的 Electron 应用，一个是 CLI 自带的浏览器界面。npm 包里只能启动后者。',
      ],
      sections: [
        {
          h: '\`dsh desktop\` 为什么失败',
          p: [
            '\`desktop\` 这个 profile 名留给 Electron。命令行会拒绝它的 boot 和配置导出请求，npm 版的 CLI 还会拒绝它的插件管理请求——所以 \`dsh plugin --profile desktop add <包名>\` 同样不行。',
            '桌面版自带的那条命令可以管理已初始化的 Desktop profile，因为它用的是那个安装自己的运行时。从 npm 包装的 CLI 里，针对这个 profile 的工具是关掉的。',
          ],
        },
        {
          h: '桌面应用和 \`dsh web\` 的区别',
          p: [
            '\`dsh web\` 启动 \`web\` profile，从本机提供浏览器界面。它接受 \`--host\`、\`--port\`、\`--no-open\`、\`--public-url\`、\`--trusted-host\` 以及可选的 TLS 参数。',
            '桌面应用是包在同一套运行时外面的独立载体：它有自己的 profile 和自己的命令，那个保留名就是从这来的。跑 \`dsh web\` 用的是同一批会话、同一个 \`$DSH_HOME\` 目录，只是窗口从原生换成浏览器标签页。',
          ],
        },
        {
          h: '那该跑什么',
          p: ['起默认端口的浏览器界面，或者固定端口并跳过自动打开：'],
          code: 'dsh web\ndash web --port 8080 --no-open',
        },
        {
          h: '想看清 profile 到底合成成什么样',
          p: ['用真实存在的 profile 名。\`desktop\` 会被拒绝，\`web\` 可以：'],
          code: 'dsh --profile web --dump-config\ndash --profile web --dump-config-schema',
        },
      ],
      faq: [
        { q: 'npm 包里带桌面应用吗？', a: '不带。npm 包装的是 \`dsh\` 启动器和随包的几个 CLI profile；桌面应用是另一个下载，有自己的命令。' },
        { q: '能把自己的 profile 改名成 desktop 吗？', a: '不能。这个名字是保留的，boot 与配置导出请求都会被拒绝，复制模板时换个名字。' },
        { q: '\`dsh web\` 和桌面应用是同一个界面吗？', a: '是同一套运行时的浏览器界面。会话、\`$DSH_HOME\` 和 profile 模型都一样，只有窗口不一样。' },
      ],
      related: ['guides/what-is-deepseek-harness', 'guides/cli', 'guides/install'],
    },
  },
};

Object.assign(GUIDES, MORE_GUIDES);

