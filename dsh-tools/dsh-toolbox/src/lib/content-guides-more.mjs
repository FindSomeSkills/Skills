// 两个新 Guide：android、docker。命令与参数来自本机 dsh web --help 的实际输出。
export const MORE_GUIDES = {
  'guides/android': {
    en: {
      title: 'DeepSeek Harness Android — no app, open dsh web in a browser',
      desc: 'No Android app exists. You run the web profile on a computer, bind it to a LAN address, and open it from the phone browser. Two commands plus the flag that makes the phone reachable.',
      h1: 'DeepSeek Harness on Android',
      cite: 'There is no DeepSeek Harness Android app: you run `dsh web` on a machine, bind it to a LAN address, and open that URL in the phone browser.',
      lead: [
        'The question people actually ask is whether they can use DSH from a phone. The answer is yes, as a browser client — the runtime stays on the computer.',
        'That matters because sessions live under `$DSH_HOME` on that machine. The phone is a viewer with a keyboard, not a second copy of the data.',
      ],
      sections: [
        {
          h: 'There is no app to install',
          p: [
            'The shipped profiles are `web`, `headless`, `sdk`, `sdk-minimal` and `acp`. None of them is a mobile build, and the npm package installs a CLI, not an APK.',
            'What you get instead is the browser surface: the same UI you see on the desktop, served from your own machine.',
          ],
        },
        {
          h: 'Bind it to an address the phone can see',
          p: [
            '`--host` takes one concrete local IPv4 or IPv6 literal — wildcard addresses are rejected, so `0.0.0.0` will not work. Use the machine\'s LAN address, then open the same URL on the phone.',
            'If the UI loads but its API calls are refused, add the authority the phone uses as a trusted host: `--trusted-host 192.168.1.20:8080`.',
          ],
          code: 'dsh web --host 192.168.1.20 --port 8080 --no-open\ndsh web --host 192.168.1.20 --port 8080 --trusted-host 192.168.1.20:8080',
        },
        {
          h: '先查这台机器的局域网地址',
          p: [
            'Windows 上用 `ipconfig` 看活动网卡的 IPv4 地址；Linux 上用 `ip -4 addr show`。要挑和手机同一网段的那个——VPN 或第二块网卡给出的地址，手机路由不到。',
          ],
          code: 'ipconfig\nip -4 addr show',
        },
        {
          h: 'Finding the address to pass',
          p: [
            'On Windows, `ipconfig` lists the IPv4 address of the active adapter. On Linux, `ip -4 addr show` does the same. Use the one on the same network as the phone — a VPN or a second adapter will give you an address the phone cannot route to.',
          ],
          code: 'ipconfig\nip -4 addr show',
        },
        {
          h: 'What the phone can and cannot do',
          p: [
            'It can read sessions, send messages and use the tools the profile exposes, because all of that happens on the host machine.',
            'It cannot run the CLI. Anything that needs `dsh plugin`, `--dump-config` or a local file drop still needs a terminal on the host.',
          ],
        },
      ],
      faq: [
        { q: 'Is there an official Android app?', a: 'No. The npm package installs the `dsh` CLI, and the shipped profiles are web, headless, sdk, sdk-minimal and acp — none is a mobile build.' },
        { q: 'Why does 0.0.0.0 not work?', a: '`--host` accepts one concrete local interface literal; wildcard addresses are rejected on purpose. Pass the LAN address instead.' },
        { q: 'Do sessions sync to the phone?', a: 'No. The phone is a browser client; sessions stay in `$DSH_HOME` on the machine running `dsh web`.' },
      ],
      related: ['guides/desktop', 'guides/install', 'guides/cli'],
    },
    zh: {
      title: 'DeepSeek Harness 安卓 — 没有 App，用 dsh web 在手机浏览器里开',
      desc: 'DSH 没有安卓 App。在电脑上跑 web profile，绑到局域网地址，手机浏览器打开同一个地址。两条命令，外加让手机能连上的那个参数。',
      h1: 'DeepSeek Harness 在安卓上用',
      cite: 'DeepSeek Harness 没有安卓 App：在电脑上跑 `dsh web`，绑到局域网地址，手机浏览器打开那个地址。',
      lead: [
        '大家真正想问的是能不能用手机用 DSH。可以，但手机只是浏览器客户端，运行时还在电脑上。',
        '这一点很关键：会话存在那台机器的 `$DSH_HOME` 下。手机是带键盘的显示器，不是第二份数据。',
      ],
      sections: [
        {
          h: '没有 App 可装',
          p: [
            '随包出货的 profile 是 `web`、`headless`、`sdk`、`sdk-minimal`、`acp`，其中没有移动端构建；npm 包装的是命令行，不是 APK。',
            '你得到的是浏览器界面：和在桌面看到的是同一个，只是由你自己的机器提供。',
          ],
        },
        {
          h: '绑到手机能访问的地址',
          p: [
            '`--host` 只接受一个具体的本机 IPv4 或 IPv6 地址，通配地址会被拒绝，所以 `0.0.0.0` 不行。填这台机器的局域网地址，然后在手机上打开同一个地址。',
            '如果界面能打开但接口被拒，把手机用的那个地址加进可信主机：`--trusted-host 192.168.1.20:8080`。',
          ],
          code: 'dsh web --host 192.168.1.20 --port 8080 --no-open\ndsh web --host 192.168.1.20 --port 8080 --trusted-host 192.168.1.20:8080',
        },
        {
          h: '先查这台机器的局域网地址',
          p: [
            'Windows 上用 `ipconfig` 看活动网卡的 IPv4 地址；Linux 上用 `ip -4 addr show`。挑和手机同网段的那个——VPN 或第二块网卡给出的地址，手机路由不到。',
          ],
          code: 'ipconfig\nip -4 addr show',
        },
        {
          h: '手机能做什么、不能做什么',
          p: [
            '能读会话、发消息、用 profile 暴露出来的工具，因为这些都发生在宿主机上。',
            '不能跑命令行。凡是需要 `dsh plugin`、`--dump-config` 或者拖本地文件的，还得在宿主机终端里做。',
          ],
        },
      ],
      faq: [
        { q: '官方有安卓 App 吗？', a: '没有。npm 装的是 `dsh` 命令行，随包 profile 是 web、headless、sdk、sdk-minimal、acp，没有移动端构建。' },
        { q: '为什么 `0.0.0.0` 不行？', a: '`--host` 只接受一个具体的本机地址，通配地址是有意拒绝的。填局域网地址。' },
        { q: '会话会同步到手机吗？', a: '不会。手机是浏览器客户端，会话留在跑 `dsh web` 那台机器的 `$DSH_HOME` 里。' },
      ],
      related: ['guides/desktop', 'guides/install', 'guides/cli'],
    },
  },

  'guides/docker': {
    en: {
      title: 'DeepSeek Harness in Docker — a Dockerfile that actually boots',
      desc: 'A minimal Dockerfile for the dsh CLI on Node 24, the port mapping command, and the one flag you need because --host rejects 0.0.0.0.',
      h1: 'DeepSeek Harness in Docker',
      cite: 'There is no official DSH image: build one from `node:24-slim`, install `@deepseek-ai/dsh`, and publish port 8080 from `dsh web`.',
      lead: [
        'DSH needs Node.js 24.9.0 or newer, so the base image is `node:24-slim` rather than an older tag. Everything else is one npm install and one command.',
        'The one trap is binding: `--host` refuses wildcard addresses, so a container that runs `--host 0.0.0.0` will not start. Resolve the container interface at boot instead.',
      ],
      sections: [
        {
          h: 'Dockerfile',
          p: [
            'Sessions live in `$DSH_HOME`, which defaults to `~/.dsh` — inside the container that is `/root/.dsh`. Mount it, or every rebuild loses the session list.',
          ],
          code: 'FROM node:24-slim\nRUN npm install -g @deepseek-ai/dsh\nWORKDIR /work\nEXPOSE 8080\nCMD ["sh", "-c", "dsh web --port 8080 --no-open --host $(hostname -i)"]',
        },
        {
          h: 'Build and run',
          p: [
            'Two volumes: `dsh-home` keeps sessions between runs, and the current directory is mounted as the workspace so the agent sees your project.',
          ],
          code: 'docker build -t dsh-web .\ndocker run --rm -p 8080:8080 -v dsh-home:/root/.dsh -v "$PWD:/work" dsh-web',
        },
        {
          h: 'Why not --host 0.0.0.0',
          p: [
            '`--host` takes one concrete IPv4 or IPv6 literal of a local interface and rejects wildcard addresses. In a container the interface address is not known when you write the command, so pass `$(hostname -i)` and let the shell resolve it at start-up.',
            'If you need TLS, mount the PEM chain and key and add `--tls-cert` and `--tls-key`; both flags must be given together.',
          ],
        },
      ],
      faq: [
        { q: 'Is there an official DeepSeek Harness Docker image?', a: 'Not from the published packages we checked. The Dockerfile here builds from `node:24-slim` and installs `@deepseek-ai/dsh` from npm.' },
        { q: 'Why does the container exit immediately?', a: 'Most often the host flag: `--host 0.0.0.0` is rejected by design. Use the container interface address, or `$(hostname -i)` as above.' },
        { q: 'Where do sessions go after a rebuild?', a: 'They stay if you mount a volume at `/root/.dsh`, which is `$DSH_HOME` inside the container. Without the volume they go away with the container.' },
      ],
      related: ['guides/install', 'guides/cli', 'guides/android'],
    },
    zh: {
      title: '用 Docker 跑 DeepSeek Harness — 一份能起来的 Dockerfile',
      desc: '给 dsh 命令行用的最小 Dockerfile（Node 24）、端口映射命令，以及因为 --host 拒绝 0.0.0.0 而必须处理的那个参数。',
      h1: '用 Docker 跑 DeepSeek Harness',
      cite: 'DSH 没有官方镜像：用 `node:24-slim` 自己构建，装 `@deepseek-ai/dsh`，从 `dsh web` 映射 8080 端口。',
      lead: [
        'DSH 要求 Node.js 24.9.0 或更高，所以基础镜像是 `node:24-slim`，不能用更老的 tag。剩下就是一次 npm 安装加一条命令。',
        '唯一的坑在绑定地址：`--host` 拒绝通配地址，容器里写 `--host 0.0.0.0` 起不来。要在启动时解析容器自己的接口地址。',
      ],
      sections: [
        {
          h: 'Dockerfile',
          p: [
            '会话存在 `$DSH_HOME`，默认 `~/.dsh`——容器里就是 `/root/.dsh`。挂出来，否则每次重建都丢会话列表。',
          ],
          code: 'FROM node:24-slim\nRUN npm install -g @deepseek-ai/dsh\nWORKDIR /work\nEXPOSE 8080\nCMD ["sh", "-c", "dsh web --port 8080 --no-open --host $(hostname -i)"]',
        },
        {
          h: '构建与运行',
          p: [
            '两个挂载：`dsh-home` 让会话跨次保留，当前目录挂成工作区，agent 就能看到你的项目。',
          ],
          code: 'docker build -t dsh-web .\ndocker run --rm -p 8080:8080 -v dsh-home:/root/.dsh -v "$PWD:/work" dsh-web',
        },
        {
          h: '为什么不能用 --host 0.0.0.0',
          p: [
            '`--host` 只接受一个具体的本机 IPv4 或 IPv6 地址，通配地址会被拒绝。容器里的接口地址写命令时还不知道，所以传 `$(hostname -i)`，让 shell 在启动时解析。',
            '要 TLS 就挂上 PEM 证书链和私钥，再加 `--tls-cert` 与 `--tls-key`；这两个参数必须一起给。',
          ],
        },
      ],
      faq: [
        { q: '官方有 DeepSeek Harness 的 Docker 镜像吗？', a: '我们核过的发布包里没有。这里的 Dockerfile 从 `node:24-slim` 构建，再从 npm 装 `@deepseek-ai/dsh`。' },
        { q: '容器刚起来就退出？', a: '多半是 host 参数：`--host 0.0.0.0` 被有意拒绝。用容器接口地址，或者像上面那样写 `$(hostname -i)`。' },
        { q: '重建后会话还在吗？', a: '挂了 `/root/.dsh` 卷就在，那是容器里的 `$DSH_HOME`；没挂就跟容器一起没了。' },
      ],
      related: ['guides/install', 'guides/cli', 'guides/android'],
    },
  },
};
