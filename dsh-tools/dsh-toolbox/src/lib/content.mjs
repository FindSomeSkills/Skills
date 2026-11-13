export const SITE = {
  name: 'DSH Toolbox',
  short: 'dsh-toolbox',
  repo: 'https://github.com/FindSomeSkills/Skills',
  syncHubRepo: 'https://github.com/FindSomeSkills/Skills/tree/main/dsh-tools/dsh-sync-hub',
};

export const TOOLS = [
  {
    slug: 'sync-hub',
    name: 'DSH Sync Hub',
    kind: 'app',
    status: 'beta',
    live: true,
    meta: { en: 'Sync DSH sessions across machines', zh: '跨设备同步 DSH 会话' },
  },
  {
    slug: 'zstd-frame-inspector',
    name: 'Zstd Frame Inspector',
    kind: 'tool',
    status: 'stable',
    live: true,
    meta: { en: 'See inside a growing .zstd session file', zh: '看清 .zstd 会话文件里有哪些帧' },
  },
  {
    slug: 'context-budget',
    name: 'Context Budget',
    kind: 'tool',
    status: 'stable',
    live: true,
    meta: { en: 'How many turns before the context blows up', zh: '上下文还能撑几回合' },
  },
  {
    slug: 'session-index-doctor',
    name: 'Session Index Doctor',
    kind: 'tool',
    status: 'stable',
    live: true,
    meta: { en: 'Why a session is missing from the list', zh: '为什么会话从列表里消失' },
  },
  {
    slug: 'skill-load-audit',
    name: 'Skill Load Audit',
    kind: 'tool',
    status: 'stable',
    live: true,
    meta: { en: 'Which skill is eating your context', zh: '哪个技能在吃上下文' },
  },
  {
    slug: 'deai-kit',
    name: 'De-AI Kit',
    kind: 'tool',
    status: 'beta',
    live: true,
    meta: { en: 'Check text and UI for template traces', zh: '查文字与界面里的模板痕迹' },
  },
];

export const COPY = {
  en: {
    nav: { home: 'Home', tools: 'Tools', guides: 'Guides', github: 'GitHub', lang: '中文', deai: 'De-AI' },
    kitStrip: 'Try the De-AI Kit in your browser: paste text or CSS, get the lines that read like a template',
    footer: {
      note: 'Every tool runs entirely in your browser, nothing is uploaded — free, no account, no email, no telemetry',
      free: '',
    },
    home: {
      title: 'DeepSeek Harness Tools — Sync, Inspect and Budget Session Files',
      desc: 'Client-side tools for DeepSeek Harness: sync sessions across machines, inspect .zstd frames, plan your context budget. Nothing is uploaded.',
      h1: 'DeepSeek Harness tools that run in your browser',
      lede: 'DSH Toolbox is a free set of browser tools for DeepSeek Harness: sync sessions across machines, inspect session files, repair the session index, audit what each skill costs, and check text or UI for template traces. Everything runs in the browser — no signup, no upload, no telemetry.',
      toolsH: 'The tools',
      toolsNote: 'Six tools are live; more land as usage shows',
      whyH: 'Why these five',
      why: [
        {
          h: 'The list and the file are two different things',
          p: 'On one install with 114 sessions on disk, the workspace index knew 38 ids. The other 76 were invisible in the app. Printing that gap is what the Doctor is for.',
        },
        {
          h: 'Nobody wrote the format down',
          p: 'A session is an append-only stream of zstd frames, and one file here reached 22,832,359 bytes. The Inspector counts frames because that number explains why a sync feels slow.',
        },
        {
          h: 'These files are your conversations',
          p: 'So nothing is uploaded. Each tool is a page with JavaScript in it, and the only thing you download is a command-line tool you run yourself.',
        },
      ],
      faqH: 'FAQ',
      faq: [
        { q: 'Do I need to install anything?', a: 'No. Every tool is a static page. DSH Sync Hub itself is a command-line tool you download and self-host — still free.' },
        { q: 'Are my files uploaded?', a: 'Never. The inspector and calculator are plain JavaScript in the page; there is no backend to send to.' },
        { q: 'What is DSH?', a: 'DeepSeek Harness — a local agent runtime with web, desktop and terminal builds. It stores sessions on disk, which is why cross-machine sync is a problem at all.' },
      ],
      cta: 'Start with Sync Hub',
    },
    syncHub: {
      title: 'DeepSeek Harness Session Sync — Windows, macOS, Linux',
      desc: 'Sync DSH sessions and the workspace index across machines. Opaque-byte transfer, append-only deltas, conflicts keep both copies.',
      h1: 'Sync DeepSeek Harness sessions across machines',
      cite: 'DSH Sync Hub is a self-hosted tool that keeps DSH sessions and the workspace index identical across machines.',
      lede: 'Sync sessions and the workspace index across machines and DSH builds — web, desktop, terminal. Session files are moved as opaque bytes, never parsed.',
      status: 'Free · runs on your own machine · needs Node.js 20 or newer · no third-party packages',
      stepsH: 'Three steps',
      steps: [
        { n: '1', h: 'Start the hub', p: 'One Node process. Data lands in a directory you choose.', code: 'node src/hub/server.mjs' },
        { n: '2', h: 'Pair each device', p: 'A one-time 8-character code, valid for 10 minutes.', code: 'node src/agent/cli.mjs pair --hub http://host:7788 --code ABCD2345' },
        { n: '3', h: 'Sync', p: 'First run is full; later runs send only the changed chunks.', code: 'node src/agent/cli.mjs sync --hub http://host:7788 --home ~/.dsh' },
      ],
      syncedH: 'What syncs',
      synced: [
        ['sessions/<workspace>/<session>/session*.jsonl.zstd', 'The payload. v4 and legacy formats both supported.'],
        ['storages/workspace.json', 'Workspace + session list. Skip it and sessions do not appear.'],
        ['storages/session_projcache.json', 'Titles and stats. Skip it and sessions appear untitled.'],
      ],
      neverH: 'What never leaves your machine',
      never: '.credentials.yaml, *.pem, *.key, *.p12, id_rsa*, .env, profiles/**/cred* — these paths are skipped during scanning.',
      conflictH: 'Conflicts keep both copies',
      conflictP: 'When two machines write forward from the same version, the later one is stored as a conflict copy and the local file is left untouched. No silent overwrite, ever.',
      limitH: 'Platform reality',
      limits: [
        ['Windows / macOS / Linux', 'Full sync host.'],
        ['Android (Termux)', 'Works, but you install Node yourself and the OS may kill it in the background.'],
        ['iOS / HarmonyOS', 'Browser console only — no Node runtime, so it cannot host a session.'],
      ],
      getH: 'Get it',
      getP: 'Source and the bilingual user guide live in the repository. Clone it, read the guide, run the three commands.',
      faqH: 'FAQ',
      faq: [
        { q: 'Does it parse my sessions?', a: 'No. It hashes, chunks and moves bytes. Parsing would couple it to an internal format that changes between releases.' },
        { q: 'What if both machines edited the same session?', a: 'Both copies are kept. The hub stores the late arrival as a conflict copy; your local file stays exactly as you wrote it.' },
        { q: 'Is delta transfer real?', a: 'Yes. Sessions are append-only, so a normal turn uploads only the changed tail chunk. A measured 10 KB append cost 28,928 bytes instead of 160,000.' },
        { q: 'Does it need my DSH version to match?', a: 'Keep both sides on the same 0.2.x line. The tool refuses cross-format merging rather than guessing.' },
      ],
    },
    zstd: {
      title: 'DeepSeek Harness .zstd Viewer — Read Session Frames',
      desc: 'Drop a .zstd file to see frame boundaries, per-frame size and block counts. Runs locally; nothing is uploaded. Built for DSH sessions.',
      h1: 'DeepSeek Harness .zstd session files, frame by frame',
      lede: 'DSH sessions are append-only multi-frame zstd. When one grows to 20 MB, the useful question is not “how big” but “how many frames, and where do they end”.',

      cite: 'Zstd Frame Inspector is a browser page that reads the frame structure of a `.zstd` DSH session file without decompressing it.',
      drop: 'Drop a .zstd / .zst file here',
      pick: 'or choose a file',
      hint: 'Reads frame headers only — no decompression, nothing uploaded.',
      summary: {
        frames: 'Frames',
        bytes: 'Compressed',
        largest: 'Largest frame',
        blocks: 'Blocks',
        skippable: 'Skippable frames',
      },
      tableH: 'Frame boundaries',
      cols: ['#', 'Type', 'Offset', 'Compressed size', 'Blocks'],
      empty: 'No frames parsed yet.',
      errMagic: 'Not a zstd stream (bad magic at offset',
      errTrunc: 'Truncated or unknown bytes at offset',
      note: 'Frame offsets are exact byte positions in the file. In DSH sessions each frame typically corresponds to an append batch, so frame count is a good proxy for how many writes the file has accumulated — and the last frame size tells you how much the next sync would send.',
      faqH: 'FAQ',
      faq: [
        { q: 'Does it decompress the file?', a: 'No. It walks frame and block headers. Nothing is inflated, so even a 1 GB file stays cheap.' },
        { q: 'Why not show the uncompressed size?', a: 'Streaming writers often omit the content-size field, so the honest answer is usually unavailable. Frame boundaries are exact; invented numbers are not.' },
        { q: 'Is my file uploaded?', a: 'No. There is no backend. The file is read with the File API inside the page.' },
      ],
    },
    budget: {
      title: 'DeepSeek Harness Context Budget Calculator — How Many Turns Left',
      desc: 'Estimate how many turns remain before a DeepSeek Harness session hits its context window, and when to fork. Pure client-side arithmetic.',
      h1: 'DeepSeek Harness context budget calculator',
      lede: 'Compaction is not free: it rewrites the conversation surface and costs latency. Know how many turns you have left before you need it.',

      cite: 'Context Budget is a calculator that estimates how many turns a DSH session has left before its context window fills.',
      inputs: {
        window: 'Context window (tokens)',
        used: 'Tokens used now',
        inPerTurn: 'Input tokens per turn',
        outPerTurn: 'Output tokens per turn',
        reserve: 'Reserved for final output',
        threshold: 'Compact at (% of window)',
      },
      results: {
        left: 'Turns left',
        overflow: 'Overflow at turn',
        compactAt: 'Compact at turn',
        headroom: 'Headroom now',
        verdict: 'Verdict',
      },
      verdicts: {
        ok: 'Comfortable. Keep going.',
        tight: 'Getting tight — plan a fork before the next big task.',
        now: 'Compact or fork now.',
      },
      note: 'Numbers are estimates from your own inputs, not measurements. Token accounting differs per provider and per tool surface; treat the result as a planning aid, not a contract.',
      faqH: 'FAQ',
      faq: [
        { q: 'Where do I get “tokens used now”?', a: 'DSH shows context pressure and token usage in the session panel. Copy the numbers in; nothing is read from disk.' },
        { q: 'Why does compaction cost so much?', a: 'It is not just summarising — the whole surface gets rewritten, which is why headroom matters more than raw window size.' },
      
        { q: 'Does it send my session anywhere?', a: 'No. Paste the numbers you see and the page does the arithmetic locally.' },],
    },
  },

  zh: {
    nav: { home: '首页', tools: '工具', guides: '指南', github: 'GitHub', lang: 'English', deai: 'De-AI' },
    kitStrip: '在浏览器里试 De-AI Kit：贴文字或 CSS，直接看出哪几行像模板',
    footer: {
      note: '所有工具都在浏览器里跑完，文件不会上传——免费，不需要账号、不需要邮箱、没有埋点',
      free: '',
    },
    home: {
            title: 'DeepSeek Harness 工具合集 — 会话同步、zstd 查看、上下文预算',
      desc: '面向 DeepSeek Harness（DSH）的本地工具：跨设备同步会话、查看 .zstd 会话帧结构、估算上下文预算。全部在浏览器内完成，不上传文件。',
      h1: '给真正在用 DeepSeek Harness 的人做的工具',
      lede: 'DSH Toolbox 是一组面向 DeepSeek Harness 的免费浏览器工具：跨设备同步会话、查看会话文件、修会话索引、算技能开销、检查文字与界面里的模板痕迹。全部在浏览器里跑，不用注册、不上传、不打点。',
      toolsH: '工具',
      toolsNote: '六个工具已上线，之后按使用情况扩展',
      whyH: '为什么是这五个',
      why: [
        {
          h: '列表和文件是两回事',
          p: '一台机器上 114 个会话躺在磁盘里，工作区索引只认识 38 个 id，剩下 76 个在界面里看不见。体检工具做的就是把这个差值打印出来。',
        },
        {
          h: '格式没人写下来',
          p: '一个会话是追加写的 zstd 帧流，实测单文件到过 22,832,359 字节。帧检查器数帧，因为「同步为什么慢」的答案就在帧边界里。',
        },
        {
          h: '这些文件是你的对话',
          p: '所以不上传。每个工具都是带 JavaScript 的页面，要下载的只有一个你自己跑的 Node CLI。',
        },
      ],
      faqH: '常见问题',
      faq: [
        { q: '需要安装什么吗？', a: '不需要。每个工具都是静态页面。Sync Hub 本体是一个命令行工具，下载到自己机器上跑，同样免费。' },
        { q: '我的文件会被上传吗？', a: '不会。检查器和计算器都是页面里的纯 JavaScript，没有后端可发。' },
        { q: 'DSH 是什么？', a: 'DeepSeek Harness —— 本地 Agent 运行时，有网页版、桌面版、终端版。它把会话存在磁盘上，所以「跨机器同步」才成了问题。' },
      ],
      cta: '从 Sync Hub 开始',
    },
    syncHub: {
      title: 'DSH 会话跨设备同步怎么弄（Windows / macOS / Linux）',
      desc: '在 Windows / macOS / Linux 与 DSH 网页版/桌面版/终端版之间同步会话与工作区索引。负载按不透明字节搬运，追加写只传变化分块，冲突保留双份。',
      h1: '跨设备同步 DeepSeek Harness 会话',
      lede: '跨设备、跨 DSH 形态同步会话与工作区索引。会话文件按不透明字节搬运，从不解析内容。',
      cite: 'DSH Sync Hub 是一个自托管的同步工具，让多台机器上的 DSH 会话和工作区索引保持一致。',
      status: '免费 · 跑在你自己的机器上 · 需要 Node.js 20 或更高版本 · 不依赖第三方包',
      stepsH: '三步',
      steps: [
        { n: '1', h: '起 Hub', p: '一个 Node 进程。数据落在你指定的目录。', code: 'node src/hub/server.mjs' },
        { n: '2', h: '配对设备', p: '一次性 8 位配对码，10 分钟有效。', code: 'node src/agent/cli.mjs pair --hub http://host:7788 --code ABCD2345' },
        { n: '3', h: '同步', p: '首次全量，之后只传变化的分块。', code: 'node src/agent/cli.mjs sync --hub http://host:7788 --home ~/.dsh' },
      ],
      syncedH: '同步什么',
      synced: [
        ['sessions/<工作区>/<会话>/session*.jsonl.zstd', '会话本体。v4 与旧格式都支持。'],
        ['storages/workspace.json', '工作区与会话列表。不同步它，会话不显示。'],
        ['storages/session_projcache.json', '标题与统计。不同步它，会话没标题。'],
      ],
      neverH: '永远不离机的',
      never: '.credentials.yaml、*.pem、*.key、*.p12、id_rsa*、.env、profiles/**/cred* —— 这些路径在扫描阶段直接跳过。',
      conflictH: '冲突保留双份',
      conflictP: '两台机器从同一版本各自往下写时，后到的那份存为冲突副本，本地文件原样不动。永不静默覆盖。',
      limitH: '平台现实',
      limits: [
        ['Windows / macOS / Linux', '完整同步宿主。'],
        ['Android（Termux）', '能用，但要自己装 Node，且系统可能杀后台。'],
        ['iOS / 鸿蒙', '只能当浏览器控制台——没有 Node 运行时，无法承载会话。'],
      ],
      getH: '获取',
      getP: '源码与中英文使用手册都在仓库里。克隆、看手册、跑三条命令。',
      faqH: '常见问题',
      faq: [
        { q: '会解析我的会话吗？', a: '不会。只做哈希、分块、搬运。解析会把自己绑死在会随版本变化的内部格式上。' },
        { q: '两台机器都改了同一会话怎么办？', a: '两份都留。Hub 把后到的存成冲突副本，你本地那份保持原样。' },
        { q: '增量是真的吗？', a: '是。会话是追加写的，一个普通回合只传变化尾部那块。实测追加 10 KB 只传了 28,928 字节，而不是 160,000。' },
        { q: '两端 DSH 版本必须一致吗？', a: '请保持在同一 0.2.x 线上。工具会拒绝跨格式合并，而不是猜。' },
      ],
    },
    zstd: {
      title: 'DeepSeek Harness 会话文件怎么看（.zstd 帧查看器）',
      desc: '拖入 .zstd 会话文件，不用解压就能看到帧边界、每帧压缩后大小、块数量，以及整份文件累积了多少次追加写入。纯本地运行，文件不上传。',
      h1: 'DeepSeek Harness 会话文件，逐帧看',
      lede: 'DSH 的会话是追加写的多帧 zstd。当一个文件长到 20 MB，真正有用的问题不是「多大」，而是「多少帧、每帧到哪结束」。',

      cite: 'Zstd Frame Inspector 是一个浏览器页面，不解压就能读出 DSH 会话文件（.zstd）的帧结构。',
      drop: '把 .zstd / .zst 文件拖到这里',
      pick: '或选择文件',
      hint: '只读帧头 —— 不解压，不上传。',
      summary: {
        frames: '帧数',
        bytes: '压缩后',
        largest: '最大帧',
        blocks: '块数',
        skippable: '可跳过帧',
      },
      tableH: '帧边界',
      cols: ['#', '类型', '偏移', '压缩大小', '块数'],
      empty: '还没有解析出帧。',
      errMagic: '不是 zstd 流（magic 不符，偏移',
      errTrunc: '尾部有截断或未知字节，偏移',
      note: '偏移是文件里的精确字节位置。DSH 会话里一帧通常对应一次追加写入，所以帧数大致等于这个文件累积了多少次写；最后一帧的大小，就是下次同步大概要传多少。',
      faqH: '常见问题',
      faq: [
        { q: '会解压文件吗？', a: '不会。只走帧头和块头，所以 1 GB 的文件也很便宜。' },
        { q: '为什么不显示解压后大小？', a: '流式写入通常不带 content-size 字段，诚实的答案多半是「不知道」。帧边界是精确的，编出来的数字不是。' },
        { q: '文件会上传吗？', a: '不会。没有后端，文件由页面里的 File API 读取。' },
      ],
    },
    budget: {
      title: 'DeepSeek Harness 上下文还剩几轮（预算计算器）',
      desc: '填入窗口容量、已用 token 和每轮输入输出，算出还剩多少回合、该在第几轮压缩，以及留给你做下一件事的余量。纯本地计算，不上传任何会话内容。',
      h1: 'DeepSeek Harness 上下文预算计算器',
      lede: '压缩不是免费的：它重写整个对话表面，还带来延迟。先知道还剩几回合，再决定什么时候压。',

      cite: 'Context Budget 是一个估算工具，算出一个 DSH 会话在上下文窗口填满之前还剩几轮。',
      inputs: {
        window: '上下文窗口（tokens）',
        used: '当前已用',
        inPerTurn: '每回合输入 tokens',
        outPerTurn: '每回合输出 tokens',
        reserve: '预留给最终输出',
        threshold: '在窗口的百分之几时压缩',
      },
      results: {
        left: '剩余回合',
        overflow: '将在第几回合溢出',
        compactAt: '建议在第几回合压缩',
        headroom: '当前余量',
        verdict: '结论',
      },
      verdicts: {
        ok: '还宽裕，继续。',
        tight: '开始紧了 —— 下一个大任务前先分叉。',
        now: '现在就压缩或分叉。',
      },
      note: '结果来自你填的数字，不是实测。不同 provider、不同工具面的计费方式不一样，把它当规划辅助，别当承诺。',
      faqH: '常见问题',
      faq: [
        { q: '「当前已用」从哪来？', a: 'DSH 会话面板里有上下文压力和 token 用量，抄进来即可，工具不读磁盘。' },
        { q: '为什么压缩那么贵？', a: '它不只是做摘要——整个表面会被重写。所以余量比窗口大小更值得盯。' },
      
        { q: '会把我的会话发到别处吗？', a: '不会。你只把看到的数字填进来，计算在本地完成。' },],
    },
  },
};

import { PLUGINS } from './content-plugins.mjs';
import { EXPANDED as EXPANDED_PLUGINS } from './plugin-page.mjs';
import { COMMUNITY } from './content-community.mjs';

export function pageList() {
  return [
    { slug: '', lang: 'en', page: 'home' },
    { slug: 'zh', lang: 'zh', page: 'home' },
    { slug: 'sync-hub', lang: 'en', page: 'syncHub' },
    { slug: 'zh/sync-hub', lang: 'zh', page: 'syncHub' },
    { slug: 'tools/zstd-frame-inspector', lang: 'en', page: 'zstd' },
    { slug: 'zh/tools/zstd-frame-inspector', lang: 'zh', page: 'zstd' },
    { slug: 'tools/context-budget', lang: 'en', page: 'budget' },
    { slug: 'zh/tools/context-budget', lang: 'zh', page: 'budget' },
    { slug: 'tools/session-index-doctor', lang: 'en', page: 'doctor' },
    { slug: 'zh/tools/session-index-doctor', lang: 'zh', page: 'doctor' },
    { slug: 'tools/skill-load-audit', lang: 'en', page: 'skills' },
    { slug: 'zh/tools/skill-load-audit', lang: 'zh', page: 'skills' },
    { slug: 'tools/session-purge', lang: 'en', page: 'purge' },
    { slug: 'zh/tools/session-purge', lang: 'zh', page: 'purge' },
    { slug: 'tools/deai-kit', lang: 'en', page: 'kit' },
    { slug: 'zh/tools/deai-kit', lang: 'zh', page: 'kit' },
    { slug: 'reference', lang: 'en', page: 'reference' },
    { slug: 'zh/reference', lang: 'zh', page: 'reference' },
    { slug: 'compare/sync-hub-vs-plugins', lang: 'en', page: 'compare' },
    { slug: 'zh/compare/sync-hub-vs-plugins', lang: 'zh', page: 'compare' },

    // —— 需求页（Guide）——
    { slug: 'guides/what-is-deepseek-harness', lang: 'en', page: 'article' },
    { slug: 'zh/guides/what-is-deepseek-harness', lang: 'zh', page: 'article' },
    { slug: 'guides/install', lang: 'en', page: 'article' },
    { slug: 'zh/guides/install', lang: 'zh', page: 'article' },
    { slug: 'guides/cli', lang: 'en', page: 'article' },
    { slug: 'zh/guides/cli', lang: 'zh', page: 'article' },
    { slug: 'guides/desktop', lang: 'en', page: 'article' },
    { slug: 'zh/guides/desktop', lang: 'zh', page: 'article' },
    { slug: 'guides/android', lang: 'en', page: 'article' },
    { slug: 'zh/guides/android', lang: 'zh', page: 'article' },
    { slug: 'guides/errors', lang: 'en', page: 'article' },
    { slug: 'zh/guides/errors', lang: 'zh', page: 'article' },
    { slug: 'guides/docker', lang: 'en', page: 'article' },
    { slug: 'zh/guides/docker', lang: 'zh', page: 'article' },
    // —— 插件目录 ——
    { slug: 'plugins', lang: 'en', page: 'article' },
    { slug: 'zh/plugins', lang: 'zh', page: 'article' },
    // —— 对比页 ——
    { slug: 'compare/vs-claude-code', lang: 'en', page: 'article' },
    { slug: 'zh/compare/vs-claude-code', lang: 'zh', page: 'article' },
    { slug: 'compare/vs-codex-harness', lang: 'en', page: 'article' },
    { slug: 'zh/compare/vs-codex-harness', lang: 'zh', page: 'article' },
    { slug: 'compare/vs-opencode', lang: 'en', page: 'article' },
    { slug: 'zh/compare/vs-opencode', lang: 'zh', page: 'article' },
    ...COMMUNITY.flatMap((p) => [
      { slug: `plugins/${p.owner}/${p.slug}`, lang: 'en', page: 'community' },
      { slug: `zh/plugins/${p.owner}/${p.slug}`, lang: 'zh', page: 'community' },
    ]),
    ...PLUGINS.flatMap((p) => [
      { slug: `plugins/${p.slug}`, lang: 'en', page: 'article', noindex: !EXPANDED_PLUGINS.includes(p.slug) },
      { slug: `zh/plugins/${p.slug}`, lang: 'zh', page: 'article', noindex: !EXPANDED_PLUGINS.includes(p.slug) },
    ]),
  ];
}

/** 返回某页对应的另一种语言路径（hreflang 用） */
export function alternateFor(slug) {
  if (slug.startsWith('zh')) {
    const rest = slug.replace(/^zh\/?/, '');
    return rest ? `/${rest}/` : '/';
  }
  return slug ? `/zh/${slug}/` : '/zh/';
}

// 两个新工具的文案单独放在 content-tools.mjs，运行时并进来（避免这个文件无限膨胀）
import { EXTRA_COPY } from './content-tools.mjs';
Object.assign(COPY.en, EXTRA_COPY.en);
Object.assign(COPY.zh, EXTRA_COPY.zh);

import { COPY_PAGES } from './content-pages.mjs';
import { COPY_KIT } from './content-kit.mjs';
for (const lang of ['en', 'zh']) {
  COPY[lang].reference = COPY_PAGES[lang].reference;
  COPY[lang].compare = COPY_PAGES[lang].compare;
  COPY[lang].homeExtra = COPY_PAGES[lang].homeExtra;
  COPY[lang].related = COPY_PAGES[lang].related;
  COPY[lang].kit = COPY_KIT[lang];
}
