// 会话清理页的深度内容 + 五条报错的独立页。事实来源：$DSH_HOME 目录结构、dsh-session 的追加日志语义、
// 以及各包 engines.dsh / 报错原文。

export const PURGE_SECTIONS = {
  en: [
    {
      h: 'Why one session grows to tens of megabytes',
      p: [
        'A DSH session is an event-sourced append-only log: every message, tool call, tool result and approval is appended as a new frame, and the model-facing message history is derived from that log rather than stored beside it. Nothing is rewritten in place, so a file only grows.',
        'The frames are zstd-compressed individually, which is why a 22 MB session can still be a few thousand frames. Tool output is the usual bulk: a single `bash` result that printed a large file lands in the log verbatim.',
      ],
    },
    {
      h: 'Three signals for deciding what can go',
      p: [
        'Last access time: sessions you have not opened in months are the safest candidates, and the file mtime in this table is that signal.',
        'Workspace membership: a session whose project folder no longer exists on disk cannot be resumed usefully. Session Index Doctor lists exactly these orphans, file on disk with no workspace entry and the reverse.',
        'Single-file size: sort by size and look at the top few. One 30 MB session from a single long debugging run is worth more than fifty 200 KB sessions, and it is also the one a backup will hurt to copy.',
      ],
    },
    {
      h: 'Verify the backup before deleting anything',
      p: [
        'Compare two numbers, not one: how many `.zstd` files you copied, and the total byte count. If either number is short, the copy was interrupted.',
      ],
      code: '# macOS / Linux\nfind ~/.dsh/sessions -name "*.zstd" | wc -l\ndu -sb ~/.dsh/sessions | cut -f1\n\n# Windows PowerShell\n(Get-ChildItem -Recurse -Filter *.zstd "$env:USERPROFILE\\.dsh\\sessions").Count\n(Get-ChildItem -Recurse "$env:USERPROFILE\\.dsh\\sessions" | Measure-Object Length -Sum).Sum',
    },
    {
      h: 'The list entry stays after the file is gone',
      p: [
        'Deleting a session file does not remove its row from `storages/workspace.json`, and the per-session cache under `storages/session_projcache/` keeps its own row too. That is why a session can show up in the list and fail to open.',
        'Session Index Doctor reads both sides and prints the gap. There is no documented rebuild command in the shipped packages, so the honest route after a bad delete is restoring the file from the backup you just verified — which is why the order above matters.',
      ],
      code: '# after deleting, see what the list still claims\n# open /tools/session-index-doctor/ and pick your $DSH_HOME',
    },
    {
      h: 'What happens to a session that is running right now',
      p: [
        'Do not delete it. The file is appended to while the agent works, and on POSIX a deleted file stays open until the process closes it, so you can end up with a session that writes to a file no longer in the directory.',
        'Close the session in the UI first, confirm the process is gone, then delete. If you only need space back, archiving through `@michengai/dsh-archive-manager` moves the session out of the active list without touching the payload.',
      ],
    },
  ],
  zh: [
    {
      h: '一个会话为什么会涨到几十 MB',
      p: [
        'DSH 的会话是事件溯源的追加日志：每条消息、每次工具调用、每个工具结果、每次审批都追加成一帧，给模型看的对话历史是从这份日志推导出来的，不是另存一份。日志不原地重写，所以文件只会变大。',
        '帧是分别做 zstd 压缩的，所以 22 MB 的会话可能只有几千帧。体积通常来自工具输出：某次 `bash` 打出一个大文件，整段原样进了日志。',
      ],
    },
    {
      h: '判断哪些能删的三个依据',
      p: [
        '最后访问时间：几个月没打开的会话是最安全的候选，这张表里的修改时间就是这个信号。',
        '工作区归属：项目目录已经从磁盘上消失的会话，即使打开也接不上。会话索引体检专门列这种孤儿——磁盘上有、列表里没有，以及反过来。',
        '单文件大小：按大小排序看前几个。一次长调试留下的 30 MB 会话，价值高于五十个 200 KB 的，也是备份时最疼的那个。',
      ],
    },
    {
      h: '删之前先验备份',
      p: [
        '要比两个数，不是一个：复制过去的 `.zstd` 文件数，和总字节数。哪个数短了，说明复制被打断过。',
      ],
      code: '# macOS / Linux\nfind ~/.dsh/sessions -name "*.zstd" | wc -l\ndu -sb ~/.dsh/sessions | cut -f1\n\n# Windows PowerShell\n(Get-ChildItem -Recurse -Filter *.zstd "$env:USERPROFILE\\.dsh\\sessions").Count\n(Get-ChildItem -Recurse "$env:USERPROFILE\\.dsh\\sessions" | Measure-Object Length -Sum).Sum',
    },
    {
      h: '文件删了，列表里的条目还在',
      p: [
        '删掉会话文件不会删掉 `storages/workspace.json` 里那一行，`storages/session_projcache/` 下的单会话缓存也有自己的一行。所以会出现「列表里有、打不开」。',
        '会话索引体检会两边都读一遍，把差值打出来。随包发布的包里没有文档化的重建索引命令，所以误删之后最靠谱的路是拿刚验过的备份还原——这也是上面顺序的原因。',
      ],
      code: '# 删完想知道列表还认哪些\n# 打开 /zh/tools/session-index-doctor/ 选你的 $DSH_HOME',
    },
    {
      h: '正在跑的会话会怎样',
      p: [
        '不要删。agent 干活时会持续往这个文件追加，而 POSIX 上被删的文件要等进程关闭才真正释放，结果可能是它还在往一个目录里已经不存在的文件写。',
        '先在界面里关掉会话，确认进程没了，再删。如果只是想要回空间，用 `@michengai/dsh-archive-manager` 归档，会话会从活跃列表里移走，负载不动。',
      ],
    },
  ],
};
