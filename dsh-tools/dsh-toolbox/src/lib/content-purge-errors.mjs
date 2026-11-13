// 会话清理工具与报错对照表的文案。命令与路径来自站点 reference 页已核实的 $DSH_HOME 结构。
export const PURGE = {
  en: {
    title: 'dsh-purge: delete DeepSeek Harness sessions and see the space first',
    desc: 'Point the tool at your sessions folder, see which files are large, and get the backup and delete commands. Runs in the browser; no upload, no account.',
    h1: 'Delete DeepSeek Harness sessions',
    cite: 'A DSH session is one `.zstd` file under `$DSH_HOME/sessions`, so deleting old ones is a file operation — but the list in `workspace.json` stays until it is rebuilt.',
    lead: [
      'Pick the `sessions` folder inside your `$DSH_HOME` (by default `~/.dsh`). The tool reads file names, sizes and dates locally, then gives you a backup command and a delete command.',
      'Nothing is uploaded. The browser cannot delete anything by itself — the commands are what you run.',
    ],
    pick: 'Choose your sessions folder',
    pickHint: 'Usually ~/.dsh/sessions on macOS and Linux, %USERPROFILE%\\.dsh\\sessions on Windows',
    selectAll: 'Select every session',
    colPath: 'File',
    colSize: 'Size',
    colDate: 'Modified',
    totalLabel: 'All sessions',
    selectedLabel: 'Selected',
    sessionsLabel: 'Files picked',
    empty: 'No `.zstd` or session `.jsonl` files in that folder. Pick the folder that contains them, not the profile directory.',
    planH: 'Backup, then delete',
    planP: 'Copy the whole sessions folder first. It is the only copy of the conversation payloads.',
    deleteP: 'Only after the copy finishes. These commands delete the files you selected, nothing else.',
    afterP: 'Deleting files leaves their entries in `workspace.json`. Run Session Index Doctor afterwards to see the gap, or rebuild the index from the profile.',
    nojs: 'This tool needs JavaScript to read the folder you pick. Without it, use `ls -S ~/.dsh/sessions/*/*.zstd` to sort by size.',
    js: {
      noFiles: 'No `.zstd` or session `.jsonl` files in that folder. Pick the folder that contains them.',
      picking: 'Reading folder…',
    },
  },
  zh: {
    title: 'dsh 会话怎么删除 / 清理（含备份）',
    desc: '选一下 sessions 目录，按大小列出会话文件，算出能释放多少空间，再给备份和删除命令。在浏览器里跑，不上传，不要账号。',
    h1: '删除 / 清理 DeepSeek Harness 会话',
    cite: 'DSH 的一个会话就是 `$DSH_HOME/sessions` 下的一个 `.zstd` 文件，删旧会话本质是删文件——但 `workspace.json` 里的列表不会自己消失。',
    lead: [
      '选 `$DSH_HOME` 里的 `sessions` 目录（默认 `~/.dsh`）。工具在本地读文件名、大小和日期，然后给出备份命令和删除命令。',
      '整个过程不上传。浏览器自己删不掉东西——真正执行的是你粘贴的那两条命令。',
    ],
    pick: '选择 sessions 目录',
    pickHint: 'macOS 与 Linux 通常是 ~/.dsh/sessions，Windows 是 %USERPROFILE%\\.dsh\\sessions',
    selectAll: '全选',
    colPath: '文件',
    colSize: '大小',
    colDate: '修改时间',
    totalLabel: '全部会话',
    selectedLabel: '已选中',
    sessionsLabel: '已选文件',
    empty: '这个目录里没有 `.zstd` 或会话 `.jsonl` 文件。要选装这些文件的那一层，不是 profile 目录。',
    planH: '先备份，再删',
    planP: '先把整个 sessions 目录复制一份。对话内容只有这一份。',
    deleteP: '复制完成后再执行。这些命令只删你选中的文件，别的都不动。',
    afterP: '删了文件，`workspace.json` 里的条目还在。删完跑一次会话索引体检，看差在哪；或者从 profile 重建索引。',
    nojs: '这个工具要用 JavaScript 读你选的目录。没有的话，用 `ls -S ~/.dsh/sessions/*/*.zstd` 按大小排。',
    js: {
      noFiles: '这个目录里没有 `.zstd` 或会话 `.jsonl` 文件。',
      picking: '正在读取目录…',
    },
  },
};

export const ERRORS = {
  en: {
    title: 'DeepSeek Harness error overview — five failures and the page for each',
    desc: 'Five failures people hit: transport failed, corepack missing, plugin incompatible with this dsh, EBADENGINE, and a host flag that refuses 0.0.0.0. Each with the cause and one command.',
    h1: 'DeepSeek Harness errors',
    links: [
      { label: 'deepseek messages transport failed', href: '/guides/errors/messages-transport-failed/', note: 'the request never finished' },
      { label: 'zsh: command not found: corepack', href: '/guides/errors/corepack-command-not-found/', note: 'plugin installs stop here' },
      { label: 'Plugin X is incompatible with dsh Y', href: '/guides/errors/plugin-incompatible/', note: 'range mismatch at boot' },
      { label: 'EBADENGINE', href: '/guides/errors/ebadengine/', note: 'Node older than 24.9.0' },
      { label: '--host refuses 0.0.0.0', href: '/guides/errors/host-wildcard-rejected/', note: 'wildcard bind address' },
    ],
    cite: 'Most DSH failures are one of five: the transport to the model provider, a missing corepack, a plugin built for another dsh, an old Node, or a wildcard host flag.',
    lead: [
      'Each section is the message you saw, why it happens, and one command to run. No theories.',
    ],
    sections: [
      {
        h: 'DeepSeek messages transport failed',
        p: [
          'The session is fine; the request to the model provider never completed. Usually the network path, a proxy that drops long-lived streams, or a provider key that expired.',
          'Check which profile and provider are configured before touching anything else:',
        ],
        code: 'dsh --profile web --dump-config',
      },
      {
        h: 'zsh: command not found: corepack',
        p: [
          'Plugin management runs pnpm through corepack. Node 24 ships corepack, but some version managers and Linux packages strip it.',
          'Enable it once, then retry the plugin command:',
        ],
        code: 'corepack enable && dsh plugin --profile web add @deepseek-ai/dsh-otel',
      },
      {
        h: 'Plugin X is incompatible with dsh Y',
        p: [
          'The plugin declares `engines.dsh`, and your dsh is outside that range. The CLI skips the plugin at boot instead of running a combination that may crash.',
          'Upgrade dsh, or accept the risk for that one package:',
        ],
        code: 'dsh plugin allow-version <package>',
      },
      {
        h: 'EBADENGINE (Node version too old)',
        p: [
          'The package requires Node.js 24.9.0 or newer. npm prints EBADENGINE and installs anyway, then the CLI fails at start-up with a syntax error.',
          'Check the version, then install the current LTS:',
        ],
        code: 'node --version\nnpm install -g @deepseek-ai/dsh@latest',
      },
      {
        h: '--host refuses 0.0.0.0',
        p: [
          '`--host` takes one concrete local IPv4 or IPv6 literal. Wildcard addresses are rejected on purpose, so a container or a LAN setup that expects `0.0.0.0` fails at boot.',
          'Pass the address you actually want to bind:',
        ],
        code: 'dsh web --host 192.168.1.20 --port 8080 --no-open',
      },
    ],
    faq: [
      { q: 'Where do I see the error text?', a: 'In the terminal that started the profile. `dsh web` prints the stack there, not in the browser tab.' },
      { q: 'Do these fix a logged-out state?', a: 'No. Credentials live in the profile; re-run the login flow for the provider instead of editing files by hand.' },
      { q: 'What if none of these match?', a: 'Run `dsh --profile web --dump-config` and read the composed tree. A row that does not exist yet is usually the answer.' },
    ],
    related: ['guides/install', 'guides/cli', 'plugins'],
  },
  zh: {
    title: 'DSH 报错总览 — 五种常见故障，各有一页',
    desc: '五个最常见的失败：模型请求 transport failed、找不到 corepack、插件和当前 dsh 不兼容、Node 版本太低、--host 拒绝 0.0.0.0。每条给原因和一条命令。',
    h1: 'DeepSeek Harness 报错对照',
    links: [
      { label: 'deepseek messages transport failed', href: '/zh/guides/errors/messages-transport-failed/', note: '请求没走完' },
      { label: 'zsh: command not found: corepack', href: '/zh/guides/errors/corepack-command-not-found/', note: '插件装不上' },
      { label: 'Plugin X is incompatible with dsh Y', href: '/zh/guides/errors/plugin-incompatible/', note: '启动时区间不匹配' },
      { label: 'EBADENGINE', href: '/zh/guides/errors/ebadengine/', note: 'Node 低于 24.9.0' },
      { label: '--host 拒绝 0.0.0.0', href: '/zh/guides/errors/host-wildcard-rejected/', note: '通配绑定地址' },
    ],
    cite: 'DSH 起不来，九成是这五种：连模型的那条传输断了、corepack 没了、插件是给别的 dsh 版本写的、Node 太老、host 参数写了通配地址。',
    lead: ['每一节就是你看到的报错、为什么会这样、以及该跑的那一条命令。不猜。'],
    sections: [
      {
        h: 'deepseek messages transport failed',
        p: [
          '会话本身没事，是发往模型服务商的请求没走完。常见原因是网络路径、会掐长连接的代理、或者过期的 key。',
          '先看清当前 profile 用的是哪个 provider：',
        ],
        code: 'dsh --profile web --dump-config',
      },
      {
        h: 'zsh: command not found: corepack',
        p: [
          '插件管理通过 corepack 调 pnpm。Node 24 自带 corepack，但某些版本管理器和 Linux 发行版会把它剥掉。',
          '启用一次，再重试插件命令：',
        ],
        code: 'corepack enable && dsh plugin --profile web add @deepseek-ai/dsh-otel',
      },
      {
        h: 'Plugin X is incompatible with dsh Y',
        p: [
          '插件声明了 `engines.dsh`，你当前的 dsh 不在这个区间里。命令行会在启动时跳过它，而不是带着一个可能崩的组合跑。',
          '要么升级 dsh，要么只对这一个包放行：',
        ],
        code: 'dsh plugin allow-version <package>',
      },
      {
        h: 'EBADENGINE（Node 版本太低）',
        p: [
          '这个包要求 Node.js 24.9.0 或更高。npm 打了 EBADENGINE 还是装上了，然后命令行在启动时报语法错误。',
          '先看版本，再装当前 LTS：',
        ],
        code: 'node --version\nnpm install -g @deepseek-ai/dsh@latest',
      },
      {
        h: '--host 拒绝 0.0.0.0',
        p: [
          '`--host` 只接受一个具体的本机 IPv4 或 IPv6 地址，通配地址是有意拒绝的。所以容器里、局域网里写 `0.0.0.0` 会在启动时失败。',
          '填你真正想绑的地址：',
        ],
        code: 'dsh web --host 192.168.1.20 --port 8080 --no-open',
      },
    ],
    faq: [
      { q: '报错文字在哪看？', a: '在启动 profile 的那个终端里。`dsh web` 把堆栈打在终端，不在浏览器标签页。' },
      { q: '这些能修好登录失效吗？', a: '不能。凭据在 profile 里，重新走一遍对应服务商的登录流程，不要手改文件。' },
      { q: '都不匹配怎么办？', a: '跑 `dsh --profile config --dump-config` 看合成后的树。某一行根本不存在，通常就是答案。' },
    ],
    related: ['guides/install', 'guides/cli', 'plugins'],
  },
};
