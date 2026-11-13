// 五个核心包的增量内容。事实来自各自 npm 包内的 README（@deepseek-ai/dsh-base / dsh-session /
// dsh-compaction / dsh-shell / dsh-sandbox），包括 API 名称、事件名、Windows 补丁层与报错原文。

export const PLUGIN_DETAILS = {
  'dsh-base': {
    en: {
      when: 'You notice it when a profile boots oddly: a row that should apply does not, or a Windows host runs bash when you expected PowerShell. `dsh --profile web --dump-config` prints the composed tree; the base rows are the ones you never added by hand — model adapters, `agent-default-model`, tools, persistence, policy, settings and credentials, telemetry, subagent providers.',
      breaks: 'Removing it leaves nothing to patch: every later bundle overrides rows by id, and those ids come from this layer. On Windows it also ships `windows.cordis.patch.yml`, which disables the POSIX bash stack (`bash-sandbox`, `tool-bash`) and mounts `dsh-pwsh-sandbox` and `dsh-tool-pwsh` instead. A half-restored bash recipe fails at load, because both executor families register the same `bash` service.',
      confused: 'It gets confused with `dsh-tools`. `dsh-base` is a patch layer: it inserts rows. `dsh-tools` is the registry those rows point at. You can replace the registry; removing the layer removes the pointers. Also note that mounting `dsh-fs-local` next to `fs-sandbox` double-registers `ctx.fs` and fails the load.',
    },
    zh: {
      when: '症状是 profile 启动不对劲：该生效的行没生效，或者 Windows 上跑起了 bash 而不是 PowerShell。用 `dsh --profile web --dump-config` 打印合成树，里面那些不是你手写的行就来自这一层——模型适配器、`agent-default-model`、工具、持久化、策略、设置与凭据、遥测、子 agent 提供者。',
      breaks: '删掉它，后面就没有可覆盖的对象了：每个 bundle 都按 id 覆盖行，而那些 id 是本层插入的。Windows 上它还附带 `windows.cordis.patch.yml`，关掉 POSIX 的 bash 栈（`bash-sandbox`、`tool-bash`），换成 `dsh-pwsh-sandbox` 与 `dsh-tool-pwsh`。想恢复 bash 必须整套改回来，两套执行器都注册同一个 `bash` 服务，改一半会在加载时直接报错。',
      confused: '常被和 `dsh-tools` 搞混。`dsh-base` 是补丁层，负责插入行；`dsh-tools` 是那些行指向的注册表。注册表可以换，这一层删了就没了指针。另外，把 `dsh-fs-local` 和 `fs-sandbox` 一起挂会重复注册 `ctx.fs`，加载直接失败。',
    },
  },
  'dsh-session': {
    en: {
      when: 'Symptom: the list shows a session id that will not open, or the transcript you see stops matching the log. `SessionStore` (ctx key `sessions`) is the append-only source of truth, and the model message history is derived from it — a mismatch is a derivation problem, not a missing file.',
      breaks: 'Without it there is no append-only log, so compaction has no surface to project and nothing is durable. The package also ships the chunk-row codec that writes the on-disk rows, and the lossless JSON utilities used when reading them back.',
      confused: 'It is not `dsh-workspace`. The workspace registry holds the list and attachment records; the session store holds the events. A session can exist as events and still be absent from the workspace list — that is exactly the state Session Index Doctor reports.',
    },
    zh: {
      when: '症状是列表里有个会话 id 打不开，或者你看到的对话跟日志对不上。`SessionStore`（ctx 键 `sessions`）是追加写的唯一事实来源，模型的对话历史是从它推导出来的——对不上是推导问题，不是文件丢了。',
      breaks: '没有它就没有追加日志：压缩没有 surface 可投影，也没有东西被持久化。这个包还带着把记录写成磁盘行的 chunk-row 编解码器，以及读回来时用的无损 JSON 工具。',
      confused: '它不是 `dsh-workspace`。工作区注册表负责列表和挂载记录，会话存储负责事件。一个会话可以只有事件、不出现在工作区列表里——会话索引体检报的就是这个状态。',
    },
  },
  'dsh-compaction': {
    en: {
      when: 'Symptom: a long session suddenly loses detail, or `compactNow` appears to do nothing. The engine (`ctx.compaction`) decides when history is too large and summarizes an older range into a single surface node; the surface contract is what gets rewritten, which is why compaction costs latency.',
      breaks: 'Without it nothing shortens. The window fills and the session cannot go past the model limit. It is also the only supported path to force a range: `compactRegion(start, end, agent, signal?)`. `compactIfNeeded` and `compactNow` require a `signal`; the range call does not.',
      confused: 'It defines what compaction does, not how. A backend is a subclass implementing `compactIfNeeded`, `compactNow` and `compactRegion`; the summarisation call lives there. The `./checkpoint` export is what lets a program outside the host turn a compaction record back into a user message.',
    },
    zh: {
      when: '症状是长会话突然丢细节，或者 `compactNow` 看起来什么也没做。引擎（`ctx.compaction`）决定历史什么时候算太大、把较早的一段压成一个 surface 节点；被重写的是 surface 契约，这就是压缩有延迟成本的原因。',
      breaks: '没有它就没有任何东西会变短：窗口填满，会话走不过模型上限。它也是唯一支持强制压缩指定区间的路径：`compactRegion(start, end, agent, signal?)`。`compactIfNeeded` 和 `compactNow` 必须传 `signal`，区间调用可以不传。',
      confused: '它定义压缩做什么，不定义怎么做。后端是一个子类，实现 `compactIfNeeded`、`compactNow`、`compactRegion`，真正调模型的地方在那里。`./checkpoint` 这个导出，是让宿主程序之外的代码把压缩记录还原成一条 user 消息。',
    },
  },
  'dsh-shell': {
    en: {
      when: 'Symptom: a command runs and never comes back, or background work vanishes. `run(spec)` resolves when the command finishes and rejects only for infrastructure failures — a nonzero exit is a result, not a rejection. `start(spec)` returns a `ShellProcess` handle immediately and applies no timeout.',
      breaks: 'Remove it and every tool that shells out fails. On Windows the shipped profile does not use this package: `windows.cordis.patch.yml` disables `tool-bash` and mounts the PowerShell executor instead, so a “bash is broken on Windows” report is usually this swap, not a fault.',
      confused: 'It is not `dsh-jobs`. The executor runs a command; jobs tracks it. Job ids, ownership, collection, cancellation and completion notices belong to `ctx.jobs`. The per-session sandbox override rides the `sandbox/mode` event and the `effectiveSandboxMode(events)` fold, not the shell call.',
    },
    zh: {
      when: '症状是命令跑出去回不来，或者后台任务凭空消失。`run(spec)` 在命令结束时 resolve，只在基础设施故障时 reject——退出码非零是结果，不是失败。`start(spec)` 立刻返回一个 `ShellProcess` 句柄，不设超时。',
      breaks: '删掉它，所有需要执行命令的工具都会失败。Windows 上随包 profile 根本不用这个包：`windows.cordis.patch.yml` 关掉 `tool-bash`，换成 PowerShell 执行器。所以“Windows 上 bash 坏了”通常只是这次替换，不是故障。',
      confused: '它不是 `dsh-jobs`。执行器负责跑，jobs 负责跟踪。任务 id、归属、收集、取消、完成通知都属于 `ctx.jobs`。按会话覆盖沙箱模式走的是 `sandbox/mode` 事件和 `effectiveSandboxMode(events)` 折叠，不挂在 shell 调用上。',
    },
  },
  'dsh-sandbox': {
    en: {
      when: 'Symptom: a command is refused with `sandbox mode "<mode>" is requested but no sandbox backend is usable on this host; refusing to run the command unconfined`. That message is this package declining to degrade silently — better than running unconfined and calling it a success.',
      breaks: 'Remove the seam and policy has nowhere to attach. `SandboxMode` is `read-only`, `workspace-write` or `danger-full-access` and governs file effects only; `SandboxEnforcement` reports `full` or `partial` per kernel ABI instead of pretending the confinement is equal everywhere. Policy rides each call, so two consumers can confine under different policies at the same instant.',
      confused: 'It is not `dsh-sandbox-local`. This package owns the contract and the vocabulary; the local package supplies the backends — bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner — and probes them at runtime. Installing backends changes no policy by itself.',
    },
    zh: {
      when: '症状是命令被拒绝，报 `sandbox mode "<mode>" is requested but no sandbox backend is usable on this host; refusing to run the command unconfined`。这句话就是这个包在拒绝悄悄降级——总比不约束地跑完还报成功强。',
      breaks: '删掉这个 seam，策略就没有挂载点。`SandboxMode` 只有 `read-only`、`workspace-write`、`danger-full-access` 三个值，且只管文件影响；`SandboxEnforcement` 按内核 ABI 报 `full` 或 `partial`，不假装各平台约束力一样。策略随每次调用传递，所以同一时刻两个调用方可以用不同策略。',
      confused: '它不是 `dsh-sandbox-local`。这个包持有契约和词汇，local 包提供后端——bwrap、npm 分发的 landlock-run 启动器、macOS Seatbelt、Windows ACL 受限令牌——并在运行时探测。装后端本身不改变任何策略。',
    },
  },
};

export const EXPANDED_PLUGINS = Object.keys(PLUGIN_DETAILS);
