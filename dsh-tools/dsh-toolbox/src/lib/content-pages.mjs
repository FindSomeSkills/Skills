// 新增页面的文案：存储结构参考、竞品对比、首页卡片补充、相关工具内链。
// 与 content.mjs 合并使用。

export const COPY_PAGES = {
  en: {
    homeExtra: {
      demoCta: 'See a sample result →',
      outcomes: {
        'sync-hub': {
          outcome: 'You get: the same session list on both machines, with titles, and a conflict copy instead of a lost session.',
          demo: '/sync-hub/',
          demoLabel: 'How it works →',
        },
        'zstd-frame-inspector': {
          outcome: 'You get: how many append batches a session file holds, and how big the next sync would be.',
          demo: '/tools/zstd-frame-inspector/?demo=1',
        },
        'context-budget': {
          outcome: 'You get: the turn number where you should compact, and whether you have room for one more task.',
          demo: '/tools/context-budget/?demo=1',
        },
        'session-index-doctor': {
          outcome: 'You get: the exact session ids that exist on disk but will never appear in the list.',
          demo: '/tools/session-index-doctor/?demo=1',
        },
        'skill-load-audit': {
          outcome: 'You get: tokens per skill, ranked, so you know what to archive before it costs you a window.',
          demo: '/tools/skill-load-audit/?demo=1',
        },
        'deai-kit': {
          outcome: 'You get: the exact lines that read like a template, and one sentence on how to fix each.',
          demo: '/tools/deai-kit/?demo=1',
        },
      },
    },

    related: {
      h: 'Related',
      items: {
        'sync-hub': ['session-index-doctor', 'zstd-frame-inspector', 'reference'],
        'zstd-frame-inspector': ['sync-hub', 'session-index-doctor', 'reference'],
        'context-budget': ['skill-load-audit', 'sync-hub', 'compare'],
        'session-index-doctor': ['sync-hub', 'zstd-frame-inspector', 'reference'],
        'skill-load-audit': ['context-budget', 'session-index-doctor', 'compare'],
        reference: ['session-index-doctor', 'sync-hub', 'compare'],
        compare: ['sync-hub', 'reference', 'session-index-doctor'],
      },
    },

    reference: {
      title: 'DSH storage layout reference — session formats, indexes, and what breaks',
      desc: 'A structured reference for DeepSeek Harness on-disk storage: the v4 and legacy session formats, the directory layout, workspace.json and session_projcache fields, and the failure modes that follow. Measured on DSH 0.2.1-rc.2.',
      h1: 'DSH storage layout reference',
      lede: 'What DSH writes to disk, measured on a real install (0.2.1-rc.2). The payload, the list entry and the title are three separate things on disk. Treat them as one and you get an empty-looking session list while every file is still there.',
      updated: 'Measured 2026-11-13 on DSH 0.2.1-rc.2, Windows.',
      formatH: 'Session formats',
      formatNote: 'Both formats are streams of independently decompressible zstd frames, appended as the session grows. Tools should treat them as opaque bytes.',
      formatCols: ['', 'v4', 'legacy'],
      formatRows: [
        ['File name', 'session.v4.jsonl.zstd', 'session.jsonl.zstd'],
        ['Produced by', 'DSH 0.2.x web / CLI / TUI', 'Older desktop runtime'],
        ['Frame layout', 'Multi-frame, append-only', 'Multi-frame, append-only'],
        ['Coexistence', 'A single session folder can hold both files', ''],
        ['Largest observed', '22,832,359 bytes in one file', '21,360,396 bytes in one file'],
      ],
      layoutH: 'Directory layout',
      layoutNote: 'The workspace directory name is a slug of the absolute workspace path, not the workspace id. Two machines with different paths get different directory names for the same workspace.',
      layoutTree: `~/.dsh                          DSH data root (web / CLI / TUI)
├─ sessions/
│  └─ --C-Knowledge~0020base--/  slug of "C:\\Knowledge base"
│     └─ session-<uuid>/         one folder per session, name used verbatim
│        ├─ session.v4.jsonl.zstd
│        └─ session.jsonl.zstd   (legacy, may coexist)
└─ storages/
   ├─ workspace.json             workspaces + session list
   ├─ session_projcache.json     titles + per-turn stats (aggregate)
   ├─ session_projcache/sessions/<id>.json   same data, per session
   └─ schedule.json              device-local reminders (do not sync)`,
      slugH: 'Path slug rule',
      slugNote: 'Derived from the absolute path: drop the colon, turn backslashes into hyphens, encode spaces as ~0020, wrap in double hyphens. C:\\Knowledge base → --C-Knowledge~0020base--',
      wsH: 'workspace.json (unit version 2)',
      wsNote: 'This is the file that decides whether a session appears in the list. Syncing payloads without it makes sessions invisible.',
      wsCols: ['Field', 'Meaning', 'Merge rule'],
      wsRows: [
        ['global.workspaceIds', 'Registered workspaces', 'Union'],
        ['global.archivedSessionIds', 'Hidden sessions', 'Union (idempotent)'],
        ['global.pinnedSessionIds', 'Pinned sessions', 'Union'],
        ['tables.workspaces.<id>.path', 'Absolute path on this machine', 'Keep local; never take the remote value'],
        ['tables.workspaces.<id>.title', 'Display name', 'Local if set'],
        ['tables.workspaces.<id>.sessionIds', 'Ordered session list', 'Union'],
        ['tables.workspaces.<id>.createdAt / updatedAt', 'Timestamps', 'min / max'],
      ],
      pcH: 'session_projcache.json (unit version 3)',
      pcNote: 'Titles, turn counts and token usage live here, not in workspace.json. DSH keeps an aggregate table and a per-session file for the same data; both count as “has a title”. Rows carry {ver, seq, val}, so merging compares ver first, then seq.',
      pcCols: ['Field', 'Meaning'],
      pcRows: [
        ['tables.sessions.<id>.identity.cwd', 'Absolute path of the session workspace (authoritative for mapping sessions to workspaces)'],
        ['tables.sessions.<id>.rows.title', 'Display title; null means untitled'],
        ['tables.sessions.<id>.rows.sessionStats', 'turns, steps, llmMs, decodeTokens…'],
        ['tables.sessions.<id>.rows.tokenUsage', 'Cumulative and last-turn token buckets'],
      ],
      symptomH: 'Symptom → cause',
      symptomCols: ['Symptom', 'Cause'],
      symptomRows: [
        ['Session file exists, DSH does not list it', 'The session id is missing from tables.workspaces.<id>.sessionIds'],
        ['Session listed but untitled', 'No projcache row (aggregate or per-session) for that id'],
        ['Entry opens into nothing', 'Listed id has no payload folder on disk'],
        ['Session shows an old state', 'Two formats coexist; DSH reads one, the other went stale'],
        ['Archived session still takes space', 'Archiving hides, it does not delete'],
        ['A sync “worked” but the list is empty', 'storages/ was not synced with sessions/'],
      ],
      noteH: 'How to check your own install',
      noteP: 'The Session Index Doctor runs these checks locally: pick your DSH data root, get the mismatched ids and the one-line fix for each.',
      cta: 'Open the Session Index Doctor',
    },

    compare: {
      title: 'DSH session sync: Sync Hub vs dsh-session-sync vs dsh-remote-mobile',
      desc: 'An honest comparison of three ways to continue DeepSeek Harness work across devices: git-mirrored session sync, single-instance remote access, and a self-hosted sync hub. Includes where each one fails.',
      h1: 'Three ways to continue DSH work on another device',
      lede: 'They are not competitors so much as different answers to different questions. This page says which question each one answers, and where each one breaks — including ours.',
      verdictH: 'One-line answer',
      verdict: 'If you want one machine’s sessions on another machine, you need a sync engine (Sync Hub or dsh-session-sync). If you want to drive one running machine from your phone, you need remote access (dsh-remote-mobile). Pick by question, not by star count.',
      cols: ['', 'DSH Sync Hub', 'dsh-session-sync', 'dsh-remote-mobile'],
      rows: [
        ['The question it answers', 'How do two machines hold the same session state?', 'How do I mirror sessions through git?', 'How do I use my running DSH from my phone?'],
        ['Mechanism', 'A hub you run yourself, plus an agent; data moves in hashed chunks', 'Private git repo as the transport', 'Secure proxy in front of one live instance'],
        ['Session data', 'Opaque bytes, moved and hashed only', 'Opaque bytes, appended to a repo', 'Never moves; one copy stays on the host machine'],
        ['Workspace index', 'Semantic merge of workspace.json + projcache', 'Same file, git three-way merge', 'Not involved'],
        ['Incremental transfer', 'Only missing chunks (measured: 10 KB append → 28,928 bytes)', 'Git delta on binary files, near full size in practice', 'Not applicable'],
        ['Conflict handling', 'Both versions kept on the hub, local file untouched', 'Both kept as fork files, never force-pushed', 'Not applicable'],
        ['Cross-build (web / desktop / TUI)', 'Yes — reads a data root, not a client', 'Yes, if each build writes to the same path', 'Only the single running instance'],
        ['Phone', 'Read-only console', 'No', 'Yes — designed for it'],
        ['Needs on your side', 'A machine to run the hub (or a hosted one later)', 'A private git repo + credentials', 'An always-on machine + a tunnel (e.g. Tailscale)'],
        ['Works offline', 'Yes, syncs when connected', 'Yes', 'No'],
        ['Team / multi-user', 'Planned', 'Per-repo access', 'Single operator'],
        ['Main failure mode', 'Hub must be reachable; conflicts need a human', 'Index conflicts are manual and can hide sessions', 'Host sleeps → nothing works'],
      ],
      whenH: 'When each one is the right answer',
      when: [
        { h: 'Use DSH Sync Hub when', p: 'You work on two or more machines and want the same list, with titles, in both — and you would rather run one small service than reconcile git conflicts in a JSON file that decides whether sessions appear.' },
        { h: 'Use dsh-session-sync when', p: 'You already treat a private git repo as your source of truth, you want every device to work offline, and you are comfortable resolving a merge by hand when it happens.' },
        { h: 'Use dsh-remote-mobile when', p: 'Your problem is “continue on my phone right now”, not “keep two machines in sync”. One always-on machine plus a tunnel beats any sync engine for that question.' },
      ],
      honestH: 'Where ours is weaker',
      honest: [
        'It needs a reachable hub. If the hub is down, nothing syncs — git keeps working offline.',
        'No remote takeover. If you want to drive a running session from a phone, this is the wrong tool.',
        'Automatic conflict resolution does not exist yet: it keeps both copies and waits for you.',
        'Attachments are not synced yet, so images referenced by an old session can break on the other machine.',
        'Single-tenant. Multi-user workspaces are planned, not shipped.',
      ],
      matrixH: 'Pick in three questions',
      matrix: [
        ['Do you need to drive a session that is already running, from another device?', 'dsh-remote-mobile'],
        ['Do you need automatic sync between machines that are sometimes offline?', 'dsh-session-sync (git)'],
        ['Do you need the session list to be identical, with titles, and you can run one small service?', 'DSH Sync Hub'],
      ],
      sourcesH: 'Sources',
      sources: [
        ['dsh-session-sync', 'https://github.com/PerryLink/dsh-session-sync'],
        ['dsh-remote-mobile', 'https://github.com/IceApriler/dsh-remote-mobile'],
        ['Measurement notes', '/reference/'],
      ],
      faqH: 'FAQ',
      faq: [
        { q: 'Can I combine them?', a: 'Yes, with one rule: do not let two mechanisms write the same session folder. Phone-only remote access plus machine-to-machine sync is a sane combination.' },
        { q: 'Why not just use git?', a: 'Git is fine for text and poor for a 22 MB binary that changes every turn, and the workspace index is a single JSON file whose merge conflicts decide whether sessions appear. That is the specific weak point this tool exists for.' },
        { q: 'Is the comparison biased?', a: 'It is written by the author of Sync Hub, so read the “where ours is weaker” section first. The measurements are reproducible with the tools on this site.' },
      ],
    },
  },

  zh: {
    homeExtra: {
      demoCta: '看示例结果 →',
      outcomes: {
        'sync-hub': {
          outcome: '你会得到：两台机器上同一份会话列表（带标题），以及冲突时的一份副本，而不是丢一个会话。',
          demo: '/zh/sync-hub/',
          demoLabel: '看怎么用 →',
        },
        'zstd-frame-inspector': {
          outcome: '你会得到：这个会话文件里累积了多少次追加写入，以及下次同步大概要传多少字节。',
          demo: '/zh/tools/zstd-frame-inspector/?demo=1',
        },
        'context-budget': {
          outcome: '你会得到：该在第几回合压缩，以及还够不够再做一件事。',
          demo: '/zh/tools/context-budget/?demo=1',
        },
        'session-index-doctor': {
          outcome: '你会得到：哪些会话 id 在磁盘上存在、却永远不会出现在列表里。',
          demo: '/zh/tools/session-index-doctor/?demo=1',
        },
        'skill-load-audit': {
          outcome: '你会得到：每个技能的 token 成本排名，以及该在吃掉一个窗口之前归档哪些。',
          demo: '/zh/tools/skill-load-audit/?demo=1',
        },
        'deai-kit': {
          outcome: '你会得到：哪些行读起来像模板，每一处配一句改法。',
          demo: '/zh/tools/deai-kit/?demo=1',
        },
      },
    },

    related: {
      h: '相关',
      items: {
        'sync-hub': ['session-index-doctor', 'zstd-frame-inspector', 'reference'],
        'zstd-frame-inspector': ['sync-hub', 'session-index-doctor', 'reference'],
        'context-budget': ['skill-load-audit', 'sync-hub', 'compare'],
        'session-index-doctor': ['sync-hub', 'zstd-frame-inspector', 'reference'],
        'skill-load-audit': ['context-budget', 'session-index-doctor', 'compare'],
        reference: ['session-index-doctor', 'sync-hub', 'compare'],
        compare: ['sync-hub', 'reference', 'session-index-doctor'],
      },
    },

    reference: {
      title: 'DSH 存储结构参考 — 会话格式、索引结构、以及它们怎么坏',
      desc: 'DeepSeek Harness 磁盘存储的结构化参考：v4 与旧格式会话、目录布局、workspace.json 与 session_projcache 字段、以及对应的故障现象。基于 DSH 0.2.1-rc.2 实测。',
      h1: 'DSH 存储结构参考',
      lede: 'DSH 往磁盘上写了什么。基于真机实测（0.2.1-rc.2）。负载、列表条目、标题在磁盘上是三样东西；把它们当成一件，就会看到「文件都在、列表是空的」。',
      updated: '实测时间 2026-11-13，DSH 0.2.1-rc.2，Windows。',
      formatH: '会话格式对照',
      formatNote: '两种格式都是「可独立解压的 zstd 帧」顺序追加而成。任何工具都应该把它们当不透明字节处理。',
      formatCols: ['', 'v4', 'legacy'],
      formatRows: [
        ['文件名', 'session.v4.jsonl.zstd', 'session.jsonl.zstd'],
        ['由谁产生', 'DSH 0.2.x 网页版 / CLI / TUI', '旧桌面版运行时'],
        ['帧结构', '多帧、追加写', '多帧、追加写'],
        ['能否并存', '同一个会话目录里可以两个文件都在', ''],
        ['实测最大', '单文件 22,832,359 字节', '单文件 21,360,396 字节'],
      ],
      layoutH: '目录布局',
      layoutNote: '工作区目录名是「绝对路径的 slug」，不是 workspace id。两台机器路径不同，同一个工作区会得到两个不同的目录名。',
      layoutTree: `~/.dsh                          DSH 数据根（网页版 / CLI / TUI）
├─ sessions/
│  └─ --C-Knowledge~0020base--/  "C:\\Knowledge base" 的 slug
│     └─ session-<uuid>/         一个会话一个目录，目录名原样使用
│        ├─ session.v4.jsonl.zstd
│        └─ session.jsonl.zstd   旧格式，可能与 v4 并存
└─ storages/
   ├─ workspace.json             工作区 + 会话列表
   ├─ session_projcache.json     标题与逐回合统计（聚合）
   ├─ session_projcache/sessions/<id>.json   同样的数据，逐会话一份
   └─ schedule.json              设备本地提醒（不要同步）`,
      slugH: '路径 slug 规则',
      slugNote: '由绝对路径推导：去掉冒号，反斜杠换成连字符，空格编码为 ~0020，两端各加两个连字符。C:\\Knowledge base → --C-Knowledge~0020base--',
      wsH: 'workspace.json（unit 版本 2）',
      wsNote: '这个文件决定「会话在不在列表里」。只同步会话负载而不同步它，会话就是不可见的。',
      wsCols: ['字段', '含义', '合并规则'],
      wsRows: [
        ['global.workspaceIds', '已注册的工作区', '并集'],
        ['global.archivedSessionIds', '被隐藏的会话', '并集（幂等）'],
        ['global.pinnedSessionIds', '置顶会话', '并集'],
        ['tables.workspaces.<id>.path', '本机绝对路径', '保留本地值，永不采用远端'],
        ['tables.workspaces.<id>.title', '显示名', '本地有值就用本地'],
        ['tables.workspaces.<id>.sessionIds', '有序会话列表', '并集'],
        ['tables.workspaces.<id>.createdAt / updatedAt', '时间戳', '取小 / 取大'],
      ],
      pcH: 'session_projcache.json（unit 版本 3）',
      pcNote: '标题、回合数与 token 用量在这里，不在 workspace.json。DSH 同时保存聚合表与逐会话文件，两者的记录都算「有标题」。行结构是 {ver, seq, val}，合并时先比 ver，再比 seq。',
      pcCols: ['字段', '含义'],
      pcRows: [
        ['tables.sessions.<id>.identity.cwd', '该会话工作区的绝对路径（把会话映射到工作区的权威依据）'],
        ['tables.sessions.<id>.rows.title', '显示标题；null 表示无标题'],
        ['tables.sessions.<id>.rows.sessionStats', 'turns、steps、llmMs、decodeTokens 等'],
        ['tables.sessions.<id>.rows.tokenUsage', '累计与最后一回合的 token 分桶'],
      ],
      symptomH: '现象 → 原因',
      symptomCols: ['现象', '原因'],
      symptomRows: [
        ['会话文件在，DSH 列表里没有', '该 session id 不在 tables.workspaces.<id>.sessionIds 里'],
        ['会话在列表里，但没有标题', '该 id 没有 projcache 记录（聚合或逐会话都算）'],
        ['点开条目是空的', '索引里的 id 在磁盘上没有对应的负载目录'],
        ['会话显示的是旧状态', '两种格式并存，DSH 只读其中一个，另一个变旧'],
        ['归档了还占空间', '归档只是隐藏，并不删除'],
        ['同步「成功」了但列表是空的', '只同步了 sessions/，没有同步 storages/'],
      ],
      noteH: '怎么检查你自己的安装',
      noteP: '会话索引体检在本机跑完这些检查：选一个 DSH 数据根目录，得到不一致的 id 清单和每条的一行修法。',
      cta: '打开会话索引体检',
    },

    compare: {
      title: 'DSH 会话同步方案对比：Sync Hub vs dsh-session-sync vs dsh-remote-mobile',
      desc: '三种「在另一台设备上继续 DSH 工作」的方式的诚实对比：git 镜像同步、单实例远程接入、自建同步枢纽。也写清每一种在哪里会坏。',
      h1: '在另一台设备上继续 DSH 工作，三种方案',
      lede: '它们不是同一个问题的竞品，而是三个不同问题的答案。这一页说清各自回答什么问题、各自在哪里坏——包括我们自己。',
      verdictH: '一句话结论',
      verdict: '要把一台机器的会话搬到另一台，你需要同步引擎（Sync Hub 或 dsh-session-sync）。要从手机操作正在运行的那台机器，你需要远程接入（dsh-remote-mobile）。按问题选，不要按 star 数选。',
      cols: ['', 'DSH Sync Hub', 'dsh-session-sync', 'dsh-remote-mobile'],
      rows: [
        ['回答的问题', '两台机器怎么拥有同一份会话状态？', '怎么用 git 镜像会话？', '怎么用手机操作正在运行的那个 DSH？'],
        ['机制', '你自己跑的 Hub + Agent，数据按块哈希搬运', '私有 git 仓库当传输层', '在单个运行实例前加安全代理'],
        ['会话数据', '不透明字节，只做搬运与哈希', '不透明字节，追加进仓库', '完全不搬，只有宿主机一份'],
        ['工作区索引', 'workspace.json 与 projcache 语义合并', '同一文件，靠 git 三方合并', '不涉及'],
        ['增量传输', '只传缺失分块（实测：追加 10 KB 传 28,928 字节）', 'git 对二进制的 delta，实测近似全量', '不适用'],
        ['冲突处理', '双份都留在 Hub，本地文件不动', '双份都留成 fork 文件，永不 force-push', '不适用'],
        ['跨形态（网页/桌面/TUI）', '支持——读的是数据根目录，不是某个客户端', '各形态写同一路径时支持', '仅限正在运行的那一个实例'],
        ['手机', '只读控制台', '不支持', '支持——就是为它设计的'],
        ['你需要准备', '一台机器跑 Hub（以后也可托管）', '一个私有 git 仓库 + 凭据', '一台常开机器 + 隧道（如 Tailscale）'],
        ['离线可用', '可，联网后同步', '可', '不可'],
        ['团队 / 多用户', '计划中', '按仓库授权', '单操作者'],
        ['主要失效模式', 'Hub 不可达；冲突需要人来定', '索引冲突要手工解，解错会让会话消失', '宿主机关机就全不可用'],
      ],
      whenH: '各自什么时候是对的',
      when: [
        { h: '什么时候用 DSH Sync Hub', p: '你在两台以上机器上工作，希望两边是同一份列表、都带标题；并且比起手工解一个「决定会话显不显示」的 JSON 文件冲突，你更愿意跑一个小服务。' },
        { h: '什么时候用 dsh-session-sync', p: '你本来就把私有 git 仓库当权威副本，希望每台设备都能离线工作，并且接受偶尔手工解一次合并。' },
        { h: '什么时候用 dsh-remote-mobile', p: '你的问题是「现在就在手机上接着干」，不是「让两台机器同步」。这种问题下，一台常开机器加隧道胜过任何同步引擎。' },
      ],
      honestH: '我们弱在哪',
      honest: [
        '必须有一个可达的 Hub。Hub 挂了就什么都不同步；git 方案还能离线继续。',
        '没有远程接管。想在手机上操作正在运行的会话，这个工具不合适。',
        '目前没有自动冲突解决：双份都留，等你决定。',
        '附件还没同步，旧会话里引用的图片在另一台机器上可能断链。',
        '单租户。多用户工作区是计划，不是已交付。',
      ],
      matrixH: '三个问题决定选型',
      matrix: [
        ['你需要从另一台设备操作一个已经在跑的会话吗？', 'dsh-remote-mobile'],
        ['你需要多台机器之间有自动同步，且经常离线吗？', 'dsh-session-sync（git）'],
        ['你需要两边会话列表完全一致、带标题，并且能跑一个小服务吗？', 'DSH Sync Hub'],
      ],
      sourcesH: '来源',
      sources: [
        ['dsh-session-sync', 'https://github.com/PerryLink/dsh-session-sync'],
        ['dsh-remote-mobile', 'https://github.com/IceApriler/dsh-remote-mobile'],
        ['实测记录', '/zh/reference/'],
      ],
      faqH: '常见问题',
      faq: [
        { q: '能组合使用吗？', a: '能，但有一条规则：不要让两套机制同时写同一个会话目录。手机只走远程接入 + 机器之间走同步，是合理的组合。' },
        { q: '为什么不用 git 就够了？', a: 'git 对文本很好，对一个每回合都在变的 22 MB 二进制很差；更要紧的是，工作区索引是单个 JSON，它的合并冲突直接决定会话显不显示。这个工具就是为这个弱点存在的。' },
        { q: '这个对比有偏向吗？', a: '作者就是 Sync Hub 的作者，所以请先读「我们弱在哪」那一节。所有测量都可以用本站工具复现。' },
      ],
    },
  },
};
