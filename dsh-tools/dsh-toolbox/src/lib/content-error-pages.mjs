// 五条报错各自的独立页。每页：报错原文、按概率排序的三个原因、一条命令、下一步看什么。
const S = (h, p, code) => ({ h, p, ...(code ? { code } : {}) });

export const ERROR_PAGES = {
  'guides/errors/messages-transport-failed': {
    en: {
      title: 'deepseek messages transport failed — what the error means and what to run',
      desc: 'The model request never completed. Proxy stream limits, a stale provider key, and a model id the profile does not have are the three usual causes, in that order.',
      h1: 'deepseek messages transport failed',
      cite: 'Transport failed means the request to the model provider never completed — the session is intact, the network path or the provider config is not.',
      lead: ['The message appears in the terminal that runs the profile, not in the browser tab.'],
      sections: [
        S('The error, verbatim', ['It arrives as a failed request on the model call, and the session keeps the events that led up to it.']),
        S('What usually causes it, most likely first', [
          'A proxy or VPN that closes long-lived streaming responses. DSH streams model output; an intermediary with a 30-second idle timeout kills the connection mid-answer.',
          'An expired or revoked provider key. The request leaves, the provider rejects it before any token is produced, and the client reports a transport failure rather than an auth error.',
          'A model id that the profile does not actually configure. Nothing listens on that name, so no response arrives.',
        ]),
        S('One command to see which provider and model the profile uses', [
          'Read the composed tree instead of guessing which layer set the model.',
        ], 'dsh --profile web --dump-config'),
        S('If that does not settle it', [
          'Try the same profile from a network without the proxy. If it works there, the proxy is the cause and the fix is a stream-friendly setting, not a DSH setting.',
          'If it fails everywhere, check the key: re-run the provider login flow. Do not edit credential files by hand.',
        ]),
      ],
      faq: [
        { q: 'Does this corrupt the session?', a: 'No. The failed request is an event like any other; the log keeps what happened before it.' },
        { q: 'Why not just a timeout message?', a: 'Because the failure is reported at the transport layer, before the provider produces a first token — there is no partial answer to attribute a timeout to.' },
      ],
      related: ['guides/errors', 'guides/cli', 'guides/install'],
    },
    zh: {
      title: 'deepseek messages transport failed 怎么修（原因按概率排序）',
      desc: '模型请求没走完。常见顺序是：代理掐了流式响应、key 过期、profile 里没有这个模型 id。每条给原因和下一步。',
      h1: 'deepseek messages transport failed',
      cite: 'transport failed 的意思是发往模型服务商的请求没走完，会话本身没事，是网络路径或服务商配置出了问题。',
      lead: ['这条报错出现在启动 profile 的那个终端里，不在浏览器标签页。'],
      sections: [
        S('报错原文', ['它以一次失败的模型调用出现，会话把之前的事件都留着。']),
        S('最可能的原因，按概率排', [
          '代理或 VPN 掐掉长连接。DSH 是流式输出，中间设备只要有 30 秒空闲超时，就会在回答中途断掉。',
          'key 过期或被吊销。请求发出去了，服务商在产出第一个 token 之前就拒绝，客户端报的是传输失败不是鉴权失败。',
          'profile 里配的模型 id 根本不存在。没有东西监听那个名字，于是什么响应都没有。',
        ]),
        S('一条命令看清用的是哪个 provider 和模型', ['读合成后的树，别猜是哪一层设的。'], 'dsh --profile web --dump-config'),
        S('这条没用就看下一步', [
          '换一条不走代理的网络跑同一个 profile。那边能用，就是代理的问题，要改的是代理解析而不是 DSH。',
          '到处都失败就看 key，重走一遍服务商登录流程，不要手改凭据文件。',
        ]),
      ],
      faq: [
        { q: '会把会话弄坏吗？', a: '不会。失败的请求也是一条事件，日志照样留着它之前发生的事。' },
        { q: '为什么不是超时报错？', a: '因为失败报在传输层，服务商还没产出第一个 token，没有半截回答可以归因成超时。' },
      ],
      related: ['guides/errors', 'guides/cli', 'guides/install'],
    },
  },

  'guides/errors/corepack-command-not-found': {
    en: {
      title: 'zsh: command not found: corepack — fix it in one command',
      desc: 'Plugin management shells out to pnpm through corepack. Node 24 bundles it, but some version managers and Linux packages strip it. Enable it, then retry the plugin command.',
      h1: 'zsh: command not found: corepack',
      cite: 'corepack is the shim that runs pnpm for `dsh plugin`. If it is missing, no plugin install works — enable it once and the command goes through.',
      lead: ['This is a broken toolchain, not a broken DSH install. The CLI itself still boots.'],
      sections: [
        S('The error, verbatim', ['The shell cannot find the shim, so the plugin command never reaches pnpm.']),
        S('Why it is missing, most likely first', [
          'A Node installed by a version manager or a distro package that excluded corepack. `nvm`, `fnm`, `volta` and several Linux packages vary here.',
          'A PATH that does not include the Node prefix where corepack lives. `npm prefix -g` shows where it should be.',
          'A corepack that exists but is disabled, which fails with a different message than this one — check `corepack --version` before assuming absence.',
        ]),
        S('The fix', ['Enable the shim, then retry the install that failed.'], 'corepack enable\ndsh plugin --profile web add @deepseek-ai/dsh-otel'),
        S('If that does not settle it', [
          'If `corepack enable` itself is not found, the binary is genuinely absent: install Node from nodejs.org or a version manager that ships it, then re-run.',
          'If it enables but pnpm still fails, let corepack download the pinned pnpm version once with `corepack prepare pnpm@latest --activate`.',
        ]),
      ],
      faq: [
        { q: 'Does this affect already-installed plugins?', a: 'No. The shim is only needed when plugin management runs; installed plugins load from the profile directory.' },
        { q: 'Can I use pnpm directly?', a: 'You can run pnpm yourself in the profile directory, but `dsh plugin add` is what records the row in the profile manifest.' },
      ],
      related: ['guides/errors', 'guides/install', 'plugins'],
    },
    zh: {
      title: 'zsh: command not found: corepack 怎么修（一条命令）',
      desc: '插件管理通过 corepack 调 pnpm。Node 24 自带，但某些版本管理器和 Linux 发行版会剥掉。启用一次再重试。',
      h1: 'zsh: command not found: corepack',
      cite: 'corepack 是替 `dsh plugin` 跑 pnpm 的那层垫片。它没了，任何插件安装都过不去——启用一次就好。',
      lead: ['这是工具链的问题，不是 DSH 装坏了。命令行本身还能启动。'],
      sections: [
        S('报错原文', ['shell 找不到这个垫片，插件命令根本没走到 pnpm。']),
        S('为什么会缺，按概率排', [
          'Node 是版本管理器或发行版包装的，把 corepack 排除了。`nvm`、`fnm`、`volta` 和部分 Linux 包各有差异。',
          'PATH 里没有 corepack 所在的 Node 前缀。`npm prefix -g` 能看到它该在哪。',
          'corepack 在但被禁用了，那种情况报的不是这条。先跑 `corepack --version` 再判断是不是真的没有。',
        ]),
        S('修法', ['启用垫片，再重试刚才失败的那条安装。'], 'corepack enable\ndash plugin --profile web add @deepseek-ai/dsh-otel'),
        S('这条没用就看下一步', [
          '`corepack enable` 本身也找不到，说明二进制真的没有：从 nodejs.org 或自带它的版本管理器重装 Node，再跑一次。',
          '能启用但 pnpm 仍然失败，让它先把固定版本的 pnpm 拉一次：`corepack prepare pnpm@latest --activate`。',
        ]),
      ],
      faq: [
        { q: '已经装好的插件会受影响吗？', a: '不会。垫片只在插件管理跑的时候需要，已装插件从 profile 目录加载。' },
        { q: '能直接用 pnpm 吗？', a: '可以在 profile 目录里自己跑 pnpm，但把这一行记进 profile 清单的是 `dsh plugin add`。' },
      ],
      related: ['guides/errors', 'guides/install', 'plugins'],
    },
  },

  'guides/errors/plugin-incompatible': {
    en: {
      title: 'Plugin X is incompatible with dsh Y — how to read the range and what allow-version does',
      desc: 'The plugin declares engines.dsh and your CLI is outside it. Upgrade dsh, install a matching plugin version, or accept the risk for one package with dsh plugin allow-version.',
      h1: 'Plugin X is incompatible with dsh Y',
      cite: 'The plugin declares an `engines.dsh` range and your CLI is outside it, so it is skipped at boot rather than loaded into a combination that may crash.',
      lead: ['The message names both versions, which is enough to decide without guessing.'],
      sections: [
        S('The error, verbatim', ['It reads like "Plugin dsh-client-ui-aqua@1.3.1 is incompatible with dsh 0.2.1-rc.2".']),
        S('What to check, most likely first', [
          'The plugin was published for a newer dsh line than yours. `engines.dsh` in its package.json is the authority, not the README.',
          'You are on a release candidate and the plugin pinned a narrow window, for example `>=0.2.2-rc.1 <0.2.3-0`.',
          'Two plugins in the same profile disagree about the range, so one of them can never load while the other is installed.',
        ]),
        S('The two real options', [
          'Upgrade dsh to a version inside the range, or install the plugin version that matched your dsh. If you accept the risk for one package, allow that single version:',
        ], 'dsh plugin allow-version <package>'),
        S('If that does not settle it', [
          'Read the range from the tarball rather than the npm page: `npm view <package> engines.dsh`.',
          'If the range excludes your dsh entirely, no allow-version will make it work; the plugin needs an update.',
        ]),
      ],
      faq: [
        { q: 'Does allow-version patch the plugin?', a: 'No. It records an exemption for that package so the boot check passes; the code is unchanged.' },
        { q: 'Where is the exemption stored?', a: 'In the profile directory, alongside the profile manifest — which is why it does not follow you to another profile.' },
      ],
      related: ['guides/errors', 'plugins', 'guides/cli'],
    },
    zh: {
      title: 'Plugin X is incompatible with dsh Y 怎么办（区间怎么看、allow-version 是什么）',
      desc: '插件声明了 engines.dsh，你的命令行不在区间内。升级 dsh、装匹配的插件版本，或用 allow-version 对单个包放行。',
      h1: 'Plugin X is incompatible with dsh Y',
      cite: '插件声明了 `engines.dsh` 区间，你的命令行在区间外，所以启动时被跳过，而不是带着一个可能崩的组合加载。',
      lead: ['报错里两个版本号都写了，够直接判断，不用猜。'],
      sections: [
        S('报错原文', ['形如 "Plugin dsh-client-ui-aqua@1.3.1 is incompatible with dsh 0.2.1-rc.2"。']),
        S('先看这几处，按概率排', [
          '插件是给更新的 dsh 线发布的。权威是它 package.json 里的 `engines.dsh`，不是 README。',
          '你在候选版上，而插件钉了很窄的窗口，比如 `>=0.2.2-rc.1 <0.2.3-0`。',
          '同一个 profile 里两个插件对区间的声明互相矛盾，只要装着一个，另一个就永远加载不了。',
        ]),
        S('只有两条真选择', ['把 dsh 升到区间内，或装回匹配你 dsh 的插件版本。愿意为单个包担风险就放行那一个版本：'], 'dsh plugin allow-version <package>'),
        S('这条没用就看下一步', [
          '从 tarball 读区间，而不是看 npm 页面：`npm view <package> engines.dsh`。',
          '区间完全不包含你的 dsh，allow-version 也救不了，得等插件更新。',
        ]),
      ],
      faq: [
        { q: 'allow-version 会改插件吗？', a: '不会。它只给这个包记一条豁免，让启动检查放行，代码没动。' },
        { q: '豁免记在哪？', a: '记在 profile 目录里、和 profile 清单放一起，所以换一个 profile 就不生效。' },
      ],
      related: ['guides/errors', 'plugins', 'guides/cli'],
    },
  },

  'guides/errors/ebadengine': {
    en: {
      title: 'EBADENGINE — the Node version is too old for DeepSeek Harness',
      desc: 'The package needs Node.js 24.9.0 or newer. npm prints EBADENGINE and may install anyway, then the CLI dies at start-up with a syntax error.',
      h1: 'EBADENGINE',
      cite: 'EBADENGINE means the Node running npm is outside the range the package declares; for DSH that floor is Node.js 24.9.0.',
      lead: ['npm often continues after this warning, which is why the failure shows up later as a syntax error.'],
      sections: [
        S('The error, verbatim', ['npm prints `EBADENGINE Unsupported engine` with the required range and your current version.']),
        S('Why it happens, most likely first', [
          'Node was installed long enough ago that the project floor moved past it.',
          'A per-project `.nvmrc` or a shell default pins an older version than the global one, so `npm install -g` runs under the wrong Node.',
          'A container image tagged `node:lts` from before the floor moved.',
        ]),
        S('The fix', ['Check what you are on, then install the current LTS and re-install DSH.'], 'node --version\nnpm install -g @deepseek-ai/dsh@latest'),
        S('If that does not settle it', [
          'If `node --version` already shows 24.9.0 or newer, the shell is resolving a different npm: compare `which npm` with `which node`.',
          'Inside a container, rebuild the image with `node:24-slim` or newer rather than mutating the running one.',
        ]),
      ],
      faq: [
        { q: 'Does EBADENGINE block the install?', a: 'Not by default. npm warns and proceeds; the failure surfaces at boot, which is why the two look unrelated.' },
        { q: 'Is Node 22 close enough?', a: 'No. The floor is 24.9.0; 22 fails at start-up with a syntax error rather than a version message.' },
      ],
      related: ['guides/errors', 'guides/install', 'guides/docker'],
    },
    zh: {
      title: 'EBADENGINE 怎么办（DeepSeek Harness 要求 Node 24.9.0）',
      desc: '这个包要求 Node.js 24.9.0 或更高。npm 打 EBADENGINE 之后照样装，然后命令行在启动时报语法错误。',
      h1: 'EBADENGINE',
      cite: 'EBADENGINE 的意思是跑 npm 的那个 Node 不在包声明的区间里；对 DSH 来说下限是 Node.js 24.9.0。',
      lead: ['npm 常常只警告不中止，所以真正的失败会晚一步以语法错误出现。'],
      sections: [
        S('报错原文', ['npm 打印 `EBADENGINE Unsupported engine`，同时给出要求的区间和你当前的版本。']),
        S('为什么会这样，按概率排', [
          'Node 装得太久，项目的下限已经从它头上越过去了。',
          '项目里的 `.nvmrc` 或 shell 默认版本钉了更老的 Node，于是 `npm install -g` 跑在错的 Node 上。',
          '容器镜像是下限提高之前打的 `node:lts`。',
        ]),
        S('修法', ['先看当前版本，再装当前 LTS，然后重装 DSH。'], 'node --version\nnpm install -g @deepseek-ai/dsh@latest'),
        S('这条没用就看下一步', [
          '`node --version` 已经是 24.9.0 以上，说明 shell 解析到了另一个 npm：对比 `which npm` 和 `which node`。',
          '在容器里的话，用 `node:24-slim` 或更新重打镜像，别在运行中的容器里改。',
        ]),
      ],
      faq: [
        { q: 'EBADENGINE 会挡住安装吗？', a: '默认不会。npm 警告后继续，失败留到启动时才出现，所以两件事看起来没关系。' },
        { q: 'Node 22 差一点行不行？', a: '不行。下限是 24.9.0，22 会在启动时报语法错误，而不是给版本提示。' },
      ],
      related: ['guides/errors', 'guides/install', 'guides/docker'],
    },
  },

  'guides/errors/host-wildcard-rejected': {
    en: {
      title: '--host refuses 0.0.0.0 — the bind address has to be a concrete interface',
      desc: 'dsh web takes one local IPv4 or IPv6 literal and rejects wildcards on purpose. Pass the LAN address, or resolve the container interface at boot.',
      h1: '--host refuses 0.0.0.0',
      cite: '`--host` accepts one concrete local interface address; `0.0.0.0` is a wildcard and is rejected, so a LAN or container setup that expects it fails at boot.',
      lead: ['The refusal is a policy, not a bug: binding every interface is how a local tool ends up on a public network by accident.'],
      sections: [
        S('The error, verbatim', ['It rejects the wildcard address when the profile boots, before the UI is served.']),
        S('Why people hit it, most likely first', [
          'Copying a container or reverse-proxy recipe that assumes `0.0.0.0` works for every server.',
          'Trying to reach the UI from a phone on the LAN and guessing the wildcard instead of the machine address.',
          'Running inside a container where the interface address is not known when the command is written.',
        ]),
        S('The fix', ['Pass the address you actually want to bind, and add it as a trusted host if the UI will be opened from another device.'],
          'dsh web --host 192.168.1.20 --port 8080 --no-open\ndsh web --host 192.168.1.20 --port 8080 --trusted-host 192.168.1.20:8080'),
        S('If that does not settle it', [
          'Inside a container, resolve the interface at start: `--host $(hostname -i)` in the CMD line, not a hard-coded value.',
          'If the UI loads but its API calls are refused, that is the trusted-host fence, not the bind address — add `--trusted-host`.',
        ]),
      ],
      faq: [
        { q: 'Is there a flag to allow wildcards?', a: 'No. The check rejects wildcard literals by design; bind a specific interface instead.' },
        { q: 'How do I find the right address?', a: '`ipconfig` on Windows, `ip -4 addr show` on Linux; pick the adapter on the same network as the client.' },
      ],
      related: ['guides/errors', 'guides/android', 'guides/docker'],
    },
    zh: {
      title: '--host 拒绝 0.0.0.0 怎么办（绑定地址必须是具体网卡）',
      desc: 'dsh web 只接受一个具体的本机 IPv4 或 IPv6 地址，通配地址是有意拒绝的。填局域网地址，或在容器启动时解析网卡地址。',
      h1: '--host 拒绝 0.0.0.0',
      cite: '`--host` 只接受一个具体的本机网卡地址，`0.0.0.0` 是通配地址会被拒绝，所以按容器或局域网配方写通配的会在启动时失败。',
      lead: ['这是策略不是 bug：绑所有网卡，正是本地工具一不小心暴露到公网的方式。'],
      sections: [
        S('报错原文', ['profile 启动时、界面还没服务出来之前就被拒。']),
        S('为什么会踩到，按概率排', [
          '照抄容器或反代的配方，默认以为 `0.0.0.0` 对任何服务都行。',
          '想让手机在局域网里打开，随手写了通配地址而不是这台机器的地址。',
          '在容器里跑，写命令时还不知道容器自己的网卡地址。',
        ]),
        S('修法', ['填你真正想绑的地址；要从另一台设备打开界面，再加可信主机。'],
          'dsh web --host 192.168.1.20 --port 8080 --no-open\ndash web --host 192.168.1.20 --port 8080 --trusted-host 192.168.1.20:8080'),
        S('这条没用就看下一步', [
          '在容器里，启动时解析网卡地址：CMD 里写 `--host $(hostname -i)`，不要写死。',
          '界面能开但接口被拒，那是可信主机那道栅栏，不是绑定地址，加 `--trusted-host`。',
        ]),
      ],
      faq: [
        { q: '有没有参数能放开通配？', a: '没有。通配字面量是被设计拒绝的，绑具体网卡。' },
        { q: '怎么找该填的地址？', a: 'Windows 用 `ipconfig`，Linux 用 `ip -4 addr show`，挑和客户端同网段的那个网卡。' },
      ],
      related: ['guides/errors', 'guides/android', 'guides/docker'],
    },
  },
};
