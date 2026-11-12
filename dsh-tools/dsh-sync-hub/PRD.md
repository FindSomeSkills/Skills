# DSH Sync Hub — 产品需求文档（PRD）

| 项 | 值 |
| --- | --- |
| 版本 | v1.0-draft |
| 日期 | 2026-11-13 |
| 状态 | 待评审 |
| 上游文档 | `PROJECT_BRIEF.md`、`09-Agent/DSH多设备同步方案调研-2026-11-13.md` |
| 关联 | `HANDOFF.md` |

## 修订说明（相对已确认的 15 章大纲）

用户 2026-11-13 追加两条要求，**不删章节，新增 2 章**：

1. **跨 DSH 运行面**：DSH 网页版（`dsh web`）、桌面版、TUI 都要能互相同步，只要它是 DSH。
2. **跨操作系统**：Windows / macOS / iOS / Android / HarmonyOS NEXT 都要能参与；平台有硬限制时**提示用户自行决策**，不静默降级。

因此：新增 §3「运行面与平台矩阵」、§13「平台限制与用户决策」，原 §3 及之后顺延为 §4–§17。其余章节结构与已确认大纲一致。

---

## 0. 术语

| 术语 | 含义 |
| --- | --- |
| DSH Home | 一个 DSH 运行面的数据根目录（本机实测有两种：`~/.dsh`、`~/.ohdsh`） |
| 运行面（Surface） | 同一 DSH 产品的不同宿主形态：web / desktop / tui / cli |
| 负载（Payload） | `sessions/<pathSlug>/<sessionDir>/` 下的会话文件，按**不透明字节**处理 |
| 格式（FormatId） | 负载的格式标识：`v4`（`session.v4.jsonl.zstd`）、`legacy`（`session.jsonl.zstd`） |
| pathSlug | 工作区绝对路径的目录名编码，如 `C:\Knowledge base` → `--C-Knowledge~0020base--` |
| 索引 | `storages/*.json`（`workspace.json`、`session_projcache.json`），**结构化数据**，可解析、需语义合并 |
| Hub | 本产品：部署在网站上的服务端 + Web 控制台 |
| Agent | 装在设备上的同步代理（Node CLI/守护进程），面向 DSH Home 而非某个运行面 |
| 冲突副本 | 无法合并时保留的两份负载，带标记，永不自动删除 |

---

## 1. 背景与问题定义

### 1.1 现状

- DSH 无官方同步能力。
- 社区两个插件各解一半：`dsh-session-sync`（git 镜像、append-only 三方合并、冲突保双份）、`dsh-remote-mobile`（单实例远程接入，手机扫码）。
- 缺口：**没有「网站化 + 多运行面 + 可视化 + 可恢复」的同步与续接产品**。

### 1.2 本机实测事实（PRD 的技术底座，非推测）

| # | 事实 | 对产品的影响 |
| --- | --- | --- |
| F1 | 桌面版**应用已于 2026-11-08 彻底卸载**（进程/安装目录/注册表/快捷方式/启动项均无残留，2026-11-13 复核确认），但数据目录 `~/.ohdsh` 被**有意保留**：114 个会话目录 / 117 个负载文件 / 112.1 MB（legacy 109 + v4 8，其中 3 个目录两格式并存）；最后写入停在 2026-11-08 00:41，此后零写入 | ①「跨运行面同步」是**回装后**的能力要求，不是当前在线状态；②由此产生一个必须支持的真实能力：**离线接管一个冻结的 DSH Home**（没有 DSH 在场也要能导入与守护）|
| F2 | 会话目录名是**路径 slug**（`--C-Knowledge~0020base--`），不是 workspaceId | 两端路径不同 → 目录名不同 → 必须按 workspaceId 重映射 |
| F3 | 桌面版 home 的会话目录名有 3 种形态：裸 UUID、`session-<uuid>`、`dsh-automation-session-<uuid>`；网页版还有 `od-<uuid>` | 不能假设 `session-` 前缀；身份必须取目录名原文 |
| F4 | 单个会话目录里**可并存两个负载文件**（`session.jsonl.zstd` + `session.v4.jsonl.zstd`，如 `session-713330f7-…`） | 同步单元是「会话目录下的文件集合」，不是「一个文件」 |
| F5 | 标题不在 `workspace.json`，在 `storages/session_projcache.json`（带单调 `seq` 的派生行） | 不同步 projcache → 会话在列表里**没有标题** |
| F6 | 单会话负载最大实测 22.8 MB，桌面版有 21.4 MB | 增量传输是核心难点 |
| F7 | `~/.dsh` 与 `~/.ohdsh` 的 `storages/` 索引**同构**（`workspace.json` v2、`session_projcache.json` v3） | 索引层可统一处理，这是「运行面无关」成立的依据 |
| F8 | `storages/schedule.json`（提醒任务，含 sessionId 引用）、`attachments/`、`logs/`、`cache/` 属设备本地或半共享数据 | 需按白名单决定同步范围 |
| F9 | 桌面版另有 `storages/dsh_automation.json`（自动化任务） | 默认不同步，见 §7 白名单 |

### 1.3 三类真实痛点

1. **换机/换面丢上下文**：网页版跑了一上午，桌面版打开看不到。
2. **手机看不到进度**：离开电脑后不知道跑到哪、要不要等。
3. **两端都改后不知谁对**：没有权威副本、没有回滚点、没有留痕。

---

## 2. 目标与非目标

### 2.1 目标（可度量）

| # | 目标 | 度量 |
| --- | --- | --- |
| G1 | 任意两个可运行 Agent 的设备间，会话与索引可双向同步 | 端到端 ≤ 60 s（含 5 MB 增量） |
| G2 | 增量传输代价与「新增字节」同阶 | ≤ 新增字节 × 1.2（含协议开销） |
| G3 | 零静默覆盖 | 每次覆盖前必有一份可回滚版本；冲突 100% 留痕 |
| G4 | 跨运行面可用 | `v4` 与 `legacy` 两端同时在线时不损坏任一侧数据 |
| G5 | 会话「列表可见」 | 同步完成后，目标端 DSH 列表可见且有标题 |

### 2.2 非目标（明确不做，防蔓延）

- ❌ 不做实时协同编辑（两设备**同时**往一个会话写并合并成一条）。
- ❌ 不替代 `dsh-remote-mobile` 的远程接管能力（手机**跑** DSH 不在范围内）。
- ❌ 不解析 `session.*.jsonl.zstd`（不读帧、不解 zstd、不解析 JSONL 事件）。
- ❌ 不同步、不读取、不落盘 `.credentials.yaml` 及任何密钥材料。
- ❌ 不修改 DSH 本体、不要求 DSH 打补丁。
- ❌ v1 不做端到端加密（见 §2.4 取舍）。
- ❌ 不做配额与功能闸门（用户 2026-11-13：v1 不设限制，按实际使用再优化）。

### 2.3 设计原则：运行面无关（Surface-Agnostic）

**核心判断**：同步的对象不是「插件」，而是**一个 DSH Home 的磁盘状态**。
因此 Agent 的输入是 `--home <path>`，输出是「负载 + 索引」的规范化集合，与宿主是 Electron、Node、还是 TUI 无关。

推论：
- P0 交付物是 **CLI/守护进程 + Hub**，插件是**可选的 UI 入口**，不是必需依赖。
- 新增一种运行面 = 新增一条「home 探测规则」，不是重写同步逻辑。
- 同一设备可注册多个 home（本机即 2 个），互不干扰。

### 2.4 v1 工程取舍（对应上次的 D1–D12）

用户已明确「第一版不作限制，之后按实际使用优化」。落地为：**不设人为配额、不阉割功能**；但**数据完整性与安全仍然 fail-closed**（那是防损坏，不是限制）。

| # | 决策 | v1 取值 | 为什么不能后置 |
| --- | --- | --- | --- |
| D1 | 增量粒度 | 前缀哈希 + 通用分块；CDC 留接口不实现 | 可以先简后繁 |
| D2 | 同步触发 | 文件监听 + 手动；SSE 推送 P1 | 可后置 |
| D3 | 冲突落地 | 服务端留双份 + 用户选择；**不自动在本地生成 fork 会话** | 本地 fork 的会话能否被 DSH 加载**未验证**（§15 R1） |
| D4 | 索引合并 | schema 感知三方合并；未知字段 fail-closed 并保留原始快照 | 索引坏了 = 会话不显示，等于丢数据 |
| D5 | projcache | **同步**，标记为「可重建缓存」 | 不同步就没标题（F5） |
| D6 | 手机端 | 控制台（PWA）+ 可选远程跳板 | 可后置 |
| D7 | 加密 | 传输 TLS + 静态 AES-256-GCM；E2E 列 P2 | 服务端合并需要读索引 |
| D8 | 部署 | 自托管单租户优先，表结构预留 `tenantId` | 可后置 |
| D9 | 存储 | 接口抽象；MVP：本地 FS + SQLite | 可后置 |
| D10 | 同步范围 | 白名单（§7.3） | 决定「什么永不入库」，不可后置 |
| D11 | 版本闸门 | 硬闸门：格式或索引 unit 版本不兼容 → 只读 + 明确提示 | 跨格式乱合并会损坏会话 |
| D12 | 冲突保留 | 默认永久，可配 TTL | 可后置 |

---

## 3. 运行面与平台矩阵（新增）

### 3.1 运行面矩阵（同一 DSH 产品的四种宿主）

| 运行面 | 典型命令/宿主 | DSH Home（实测） | 负载格式 | Agent 可否运行 | v1 结论 |
| --- | --- | --- | --- | --- | --- |
| Web | `dsh web`（Node 服务） | `~/.dsh` | `v4` | ✅ 同机 Node | 全量同步 |
| Desktop | Electron 桌面版 | `~/.ohdsh` | `legacy`（可能并存 `v4`） | ✅ 同机 Node | **当前未安装**（2026-11-08 卸载，数据保留）；回装后即为全功能宿主 |
| TUI / CLI | `dsh`（终端） | `~/.dsh` | `v4` | ✅ | 全量同步 |
| 第三方壳 | 如 `DSH-TUI`、自定义封装 | 用户指定 `--home` | 探测 | 视环境 | 只要能给 home 路径即可 |

**产品承诺**：只要目标环境能提供 `(a) 一个 DSH Home 路径`、`(b) Node ≥ 20 或等价运行时`，就能同步。不满足 (a) 或 (b) 的环境，降级为「控制台可见」（§13）。

### 3.2 操作系统矩阵

| OS | 可运行 Agent | 可作同步宿主 | 可作控制台 | 主要限制 |
| --- | --- | --- | --- | --- |
| Windows 10/11 | ✅ | ✅ | ✅ | 文件被 DSH 占用时的共享读；长路径 |
| macOS | ✅ | ✅ | ✅ | 完全磁盘访问授权；Gatekeeper 未签名 CLI |
| Linux | ✅ | ✅ | ✅ | 文件权限/umask |
| Android | ⚠️ 需 Termux + Node | ⚠️ 有条件 | ✅ PWA | 后台被系统杀；存储权限；需用户自行安装 |
| iOS / iPadOS | ❌ 无 Node 常驻 | ❌ | ✅ PWA | 无法后台常驻；无法本地跑 DSH |
| HarmonyOS NEXT | ❌ 无 Node / 无 Termux | ❌ | ✅ PWA | 浏览器内核差异；无本地运行时 |

### 3.3 能力分级（产品对外口径）

- **T1 全功能宿主**：跑 Agent，双向同步（Win/macOS/Linux/桌面版/网页版/TUI）。
- **T2 有条件宿主**：Android + Termux，功能同 T1 但需用户自行准备环境，且后台存活需用户决策。
- **T3 控制台**：iOS / HarmonyOS / 任意浏览器。可查看、可比对、可触发恢复、可读「下一步」，**不承载会话**。

> 明确写进产品文案：**手机不跑 DSH**。手机上的「续接」= 看进度 + 触发恢复 + 生成交接摘要 + （可选）跳到远程接入入口。这是能力边界，不是缺陷。

---

## 4. 用户与场景

### 4.1 角色

| 角色 | 描述 | 优先级 |
| --- | --- | --- |
| 单人多机（主） | 1 人 N 台设备，含网页版 + 桌面版 + 手机 | P0 |
| 单人多面 | 同机多个 home（现为在线 `~/.dsh` + 冻结 `~/.ohdsh`；桌面端回装后为真双面） | P0 |
| 团队共享 | 多人共享工作区 | P1 |
| 纯查看者 | 手机上只看 | P0（只读） |

### 4.2 场景剧本

| # | 场景 | 关键路径 |
| --- | --- | --- |
| S1 | 办公室网页版 → 家里桌面版续接 | 增量拉取负载 + 索引 → 列表可见 → 打开 |
| S2 | 桌面版离线跑完 → 网页版合并 | 双端各自追加 → 检出冲突 → 留双份 |
| S3 | 手滑删了会话 | 控制台版本历史 → 恢复 |
| S4 | 换新机迁移 | 配对 → 全量引导 → 授权路径 → 首传 |
| S5 | 地铁上用手机确认「昨晚跑到哪」 | PWA 只读 + 交接摘要 |

---

## 5. 功能清单

### 5.1 P0（MVP，必须）

| 编号 | 功能 | 验收标准 | 依赖 |
| --- | --- | --- | --- |
| P0-1 | 设备注册与配对 | 一次性码 10 min 有效、一次性；扫码或手输均可；配对后可吊销 | — |
| P0-2 | Home 探测与注册 | 自动识别 `surfaceKind` / `dshVersion` / 存在的 `formatId` / `pathSlug`；同机多 home 可并存 | §7.4 |
| P0-3 | 首次全量引导 | 预检报告（将上传的文件数/字节、被排除的路径、平台限制）→ 用户确认后才上传 | §13 |
| P0-4 | 会话负载同步 | 单元 = 会话目录下的文件集合；支持 `v4` / `legacy`；增量传输；断点续传 | §8 |
| P0-5 | 索引同步 | `workspace.json` + `session_projcache.json` 语义合并；同步后目标端列表可见且有标题 | §8.6 |
| P0-6 | 工作区路径别名映射 | 以 `workspaceId` 为真身；各设备 `path` 为别名；同一逻辑工作区在两端路径不同也能对上 | §7.2 |
| P0-7 | 冲突检测与留双份 | 检出即冻结该会话自动写；双份可见、可对比、可选其一；全过程留痕 | §9 |
| P0-8 | Web 控制台 | 设备 / 工作区 / 会话三视图；同步时间线；冲突队列；版本历史 | — |
| P0-9 | 一键恢复 | 选设备 + 时间点 → 影响面预览 → 停写 → 换入 → 校验 → 提示重启 DSH | §8.7 |
| P0-10 | 安全基线 | TLS、设备令牌、静态加密、凭据排除、审计日志 | §10 |
| P0-11 | 格式不兼容保护 | 同一会话出现 `v4` 与 `legacy` 时不合并、双份 + 明确提示 | §9 C5 |
| P0-12 | 冻结 Home 离线接管 | 不依赖任何 DSH 进程，直接读一个 DSH Home（如 `~/.ohdsh`）完成探测、清单化、入库；凭据类文件被硬排除且可报告 | §7.3、§7.4 |

### 5.2 P1

| 编号 | 功能 | 说明 |
| --- | --- | --- |
| P1-1 | PWA 手机端 | 只读三视图 + 冲突决策 + 恢复触发 + 交接摘要 |
| P1-2 | 任意时间点回滚 | 按 `SyncRun` 时间线回滚整个工作区 |
| P1-3 | 索引层摘要 diff | 只比 `storages` 元数据（标题、会话数、时间），不碰负载 |
| P1-4 | 推送通知 | SSE：会话更新、冲突打开、设备加入 |
| P1-5 | 多用户/团队 | 工作区共享、角色（owner/member/viewer） |
| P1-6 | 远程跳板入口 | 从控制台跳到 `dsh-remote-mobile` 式入口（外部链接，不内建） |

### 5.3 P2

- `attachments/` 同步（图片断链修复）
- Obsidian vault 联动（独立通道，不与会话混）
- S3 兼容后端、WebDAV
- 独立 CLI（无守护进程）
- 端到端加密

---

## 6. 用户流程

### 6.1 配对（Pairing）

```
设备A(已注册)                 Hub                        设备B(新)
   │ 生成一次性码(8位)          │                            │
   ├───────────────────────────>│  存 code→ttl=10min         │
   │     显示码 / 二维码         │                            │
   │                            │<──── POST /pair/claim ─────┤ {code, deviceInfo}
   │                            │  校验+消费 code             │
   │                            ├──── {deviceToken} ────────>│ 落盘到本地 keychain/文件
   │                            │                            │
   │                            │<──── POST /homes ──────────┤ 探测结果(可多个home)
   │                            │  记录 surface/format/ver   │
   │                            │<──── GET /preflight ───────┤
   │                            ├──── 预检报告 ─────────────>│ 展示：文件数/字节/排除项/限制
   │                            │<──── POST /sync/commit ────┤ 用户确认后首传
```

**失败分支**：码过期 → 重新生成；版本不兼容 → 停在预检，给「用同一版本 DSH 打开」提示；平台受限 → 弹 §13 决策卡。

### 6.2 同步（Sync）

1. **触发**：文件监听（负载或索引变化，防抖 2 s）/ 用户手动 / 控制台「立即同步」。
2. **握手**：上报 `dshVersion`、`formatId` 集合、`unitVersion`（`workspace.json` v2 / `session_projcache.json` v3）。
3. **清单比对**：按 `(workspaceId, sessionDir, formatId)` 比对 `sha256 + size`。
4. **增量传输**：见 §8.4。
5. **索引合并**：见 §8.6。
6. **落盘校验**：写后重算 `sha256`，不一致 → 回滚 + 告警。
7. **通知**：控制台时间线新增一条 `SyncRun`。

### 6.3 冲突（Conflict）

```
检出冲突 → 该会话进入「冻结」状态（不再自动写）
        → 控制台红点 + 时间线告警
        → 用户在三个选项中决策：
             ① 保留本地（远端版本转存为历史）
             ② 保留远端（本地版本转存为历史）
             ③ 两份都留（默认，最安全）
        → 决策写入 Conflict + AuditEvent → 解冻
```

**默认不自动选**：宁可停在冲突，也不猜。

### 6.4 恢复（Restore）

1. 选目标设备 + 目标时间点（或某个 `PayloadVersion`）。
2. **影响面预览**：涉及 N 个工作区 / M 个会话 / 将覆盖 K 个较新版本 / 是否有活跃会话。
3. 校验：目标 home 仍在、磁盘空间足够、DSH 未在写（能以独占方式打开文件）。
4. 停写 → 备份当前状态为「恢复前快照」→ 换入 → 校验 → 提示「请重启 DSH」。
5. 结果写 `AuditEvent`，并在时间线可查。

### 6.5 异常分支

| 异常 | 处理 |
| --- | --- |
| 版本/格式不兼容 | 只读模式，禁止写，给明确原因 |
| 令牌失效 | 提示重新配对，不自动重试无限次 |
| 断网中途 | 保留已传分块，恢复后续传 |
| 磁盘不足 | 预检拦截，给出所需空间 |
| 会话正被写入 | 跳过该会话本轮，标注「写入中」，下轮再试 |
| 本机两个 home 指向同名工作区 | 视为两个来源，分别注册，不自动合并 |

---

## 7. 数据模型

### 7.1 实体关系

```
Tenant(1) ─< Device(1) ─< DshHome(1) ─< WorkspaceAlias >─ Workspace(1) ─< Session(1) ─< PayloadVersion
                                                                  │
                                        Conflict ─────────────────┤
                                        SyncRun  ─────────────────┤
                                        AuditEvent                │
                                        PlatformNotice            │
```

### 7.2 核心表

| 表 | 关键字段 | 说明 |
| --- | --- | --- |
| `tenants` | `tenant_id`, `name`, `created_at` | v1 单租户，预留 |
| `devices` | `device_id`, `name`, `os`, `arch`, `token_hash`, `created_at`, `last_seen_at`, `revoked_at` | 令牌只存哈希 |
| `dsh_homes` | `home_id`, `device_id`, `store_root`, `surface_kind`, `dsh_version`, `formats[]`, `unit_versions`, `detected_at` | 一个设备可多个（F1） |
| `workspaces` | `workspace_id`(hub 侧), `source_workspace_id`(DSH 的 UUID), `title`, `created_at` | **逻辑真身** |
| `workspace_aliases` | `home_id`, `local_path`, `path_slug`, `workspace_id` | 每设备一套路径 |
| `sessions` | `hub_session_id`, `workspace_id`, `session_dir`(原文), `created_at`, `title_snapshot` | `session_dir` 是身份，不做前缀假设（F3） |
| `payload_versions` | `id`, `hub_session_id`, `format_id`, `size`, `sha256`, `chunk_root`, `produced_by`, `produced_at`, `parent_version_id`, `is_conflict_copy` | 一个会话目录可有多个文件 → 多版本 |
| `chunks` | `hash`(PK), `bytes`, `ref_count` | 内容寻址去重 |
| `index_snapshots` | `id`, `kind`(`workspace`/`projcache`), `unit_version`, `seq`, `sha256`, `merged_from[]`, `created_at`, `raw_blob` | 保留原始快照以便回滚 |
| `conflicts` | `id`, `scope`, `kind`(C1–C7), `session_ref`, `local_version`, `remote_version`, `state`, `resolution`, `resolved_by`, `resolved_at` | §9 |
| `sync_runs` | `id`, `device_id`, `started_at`, `ended_at`, `direction`, `bytes_in/out`, `items_ok/failed`, `result` | 时间线 |
| `audit_events` | `id`, `actor`, `action`, `target`, `meta_json`, `at` | 恢复/合并/吊销必记 |
| `platform_notices` | `id`, `device_id`, `platform`, `limitation_id`, `shown_at`, `decision` | §13 用户决策留痕 |

### 7.3 同步范围白名单（**决定什么永不入库**）

| 路径 | v1 | 理由 |
| --- | --- | --- |
| `sessions/<slug>/<dir>/session*.jsonl.zstd` | ✅ 必选 | 核心负载 |
| `storages/workspace.json` | ✅ 必选 | 会话列表 |
| `storages/session_projcache.json` + `session_projcache/sessions/*.json` | ✅ 必选 | 标题/统计（F5） |
| `attachments/**` | ⚠️ P2，可选 | 图片断链 |
| `storages/schedule.json` | ❌ 排除 | 设备本地提醒（F8） |
| `storages/dsh_automation.json` | ❌ 排除 | 桌面版自动化任务（F9） |
| `logs/`、`cache/` | ❌ 排除 | 可再生/体积大 |
| `profiles/`、`skills/`、`.agent-presets/` | ❌ 排除 | 配置漂移风险，另行处理 |
| `.credentials.yaml`、`*.key`、`*.pem`、`**/id_rsa*`、`profiles/**/cred*` | ⛔ **硬黑名单** | 永不读取、永不 hash、永不上传 |

### 7.4 Home 探测规则

```text
输入: --home <path>
1. 必须是目录；读取 <home>/sessions、<home>/storages 是否存在
2. surfaceKind 判定（按优先级）:
   - 存在 <home>/desktop 或 <home>/web 子目录 → 记录为线索
   - 存在 storages/dsh_automation.json → desktop 特征
   - 默认 web/cli
3. dshVersion: 优先读 dsh 可执行文件版本；否则读 home 内可得的版本标记；都拿不到 → unknown（不阻断，仅告警）
4. formats: 列出 <home>/sessions/**/ 下出现过的负载文件名集合
5. unitVersions: 解析 storages/workspace.json 的 unit.version、session_projcache.json 的 unit.version
6. 输出 HomeProfile（只读，不修改任何文件）
```

**约束**：探测过程只做 `stat` 与索引 JSON 解析；**绝不打开负载文件内容**。

---

## 8. 同步协议

### 8.1 传输面

- 传送：HTTPS（REST，JSON）+ `Range` 分块上传/下载。
- 推送：SSE（`GET /events`）；断线由客户端轮询兜底。
- 认证：`Authorization: Bearer <deviceToken>`；控制台用独立 cookie 会话 + CSRF token。

### 8.2 握手

```http
POST /v1/sync/handshake
{
  "deviceId": "dev_...",
  "agentVersion": "0.1.0",
  "homes": [{
    "homeId": "home_...",
    "surfaceKind": "desktop",
    "dshVersion": "0.2.1-rc.2",
    "formats": ["legacy","v4"],
    "unitVersions": { "workspace": 2, "session_projcache": 3 },
    "pathSlugs": ["--C-Knowledge~0020base--"]
  }]
}
```

```json
{
  "serverProtocol": 1,
  "compatible": true,
  "mode": "readwrite",
  "warnings": [{ "code": "FORMAT_MIXED", "homeId": "home_..." }],
  "notices": [{ "id": "PLAT_WIN_FILELOCK", "severity": "info" }]
}
```

`mode` 只有两种：`readwrite` / `readonly`。判定依据：`unitVersions` 与 `formats` 都在已知集合内。

### 8.3 清单

```http
GET /v1/workspaces/{wid}/manifest?cursor=...
→ { "items": [
      { "sessionDir": "session-abc", "formatId": "v4",
        "size": 6078693, "sha256": "...", "producedAt": "2026-11-12T19:22:58Z" }
    ], "cursor": "..." }
```

### 8.4 增量（关键设计）

前提：负载是**append-only 多帧 zstd**，因此「旧版本是新版本的前缀」在多数情况下成立，但**必须验证**，不能假设。

```text
A. 两端都已有 v_old (sha256 已知)
   1. 客户端读 v_new 的 [0, size(v_old)) 前 N KB 抽样 + 尾部
   2. 上传 {baseVersionId, baseSize, baseSha256, newSize, tailChunks[]}
   3. 服务端用已存 chunk_root 验证 base 前缀 → 通过则只收 tail
   4. 不通过（真的分叉）→ 降级为全量上传，并开冲突（§9 C1）

B. 服务端没有该会话 → 全量
C. 分块策略：固定分块 4 MiB（MVP）；内容定义分块（CDC）留接口
```

代价目标：一次普通回合追加 ≤ 2 MB。

### 8.5 上传与提交

```http
POST /v1/blobs/init   { "size":..., "sha256Hint":..., "chunks":[hash...] }
→ { "uploadId":"...", "missing":[hash...] }

PUT  /v1/blobs/{uploadId}/chunks/{hash}      (binary, Range 续传)
POST /v1/blobs/{uploadId}/commit { "sha256":"..." }
→ { "blobHash":"...", "dedup": true }
```

提交为**两阶段**：先落临时对象 → 校验 → 原子改名。半写对象由 GC 回收。

### 8.6 索引合并（决定「会话能不能显示」）

```text
workspace.json 合并规则:
  global.workspaceIds         → 并集
  global.archivedSessionIds   → 并集（归档是幂等的「软删除」）
  global.pinnedSessionIds     → 并集
  tables.workspaces[wid].path → 不合并到同一值；由 workspace_aliases 做设备本地化
  .sessionIds                 → 并集（去重）
  .createdAt                  → 取小
  .updatedAt                  → 取大
  未知字段                      → fail-closed：整份索引写只读快照，暂停该工作区自动合并，告警

session_projcache.json 合并规则:
  按 sessionId 逐条；
  行级 {ver, seq, val}：
    - 同 ver：seq 大者胜
    - ver 不同：取 ver 大者；若 ver 大但 seq 小 → 标记「需人工确认」并留旧值
    - 缺失字段：不删除，保留原值
```

**为什么不能整文件 LWW**：一台设备加会话 A、另一台加会话 B，LWW 会丢掉其中一个 → 会话消失。

### 8.7 应用与回滚

- 写入策略：先写 `*.tmp` → `fsync` → 原子替换；替换前把旧文件挪到 `.<name>.bak-<ts>`。
- 每轮结束记录 `sync_runs`；`payload_versions` 保留所有历史，支持按时间点恢复。
- 回滚 = 把指定版本写回 → 同样走归档与校验流程。

### 8.8 失败语义

| 场景 | 语义 |
| --- | --- |
| 网络中断 | 已提交分块保留；`uploadId` 可续 |
| 校验失败 | 该条目标记 failed，不推进 cursor，下轮重试（指数退避，上限 10 min） |
| 幂等 | `Idempotency-Key: <deviceId>:<runId>:<itemIdx>`，服务端 24 h 去重 |
| 部分成功 | 允许「部分应用」但必须写清 items_ok / items_failed，且不静默 |

---

## 9. 冲突处理策略

### 9.1 冲突类别矩阵

| 类 | 触发 | 检测方式 | 默认动作 | 用户可见 |
| --- | --- | --- | --- | --- |
| **C1** 同源分叉 | 两端从同一 `baseVersion` 各自追加，前缀校验失败 | 前缀 sha256 不匹配 | **留双份**；本地版继续用，远端版存为 `conflict_copy` | 红点 + 两版本并排 |
| **C2** 无共同祖先 | 两端出现同名 `sessionDir` 但内容完全不同 | 无共享 chunk_root | 视为两条会话，双份保留，不合并 | 提示「可能不是同一个会话」 |
| **C3** 索引并发 | 两端都新增会话/归档 | JSON 层比对 | **自动并集合并**，无需用户干预 | 时间线可见 |
| **C4** 删/改并发 | 一端删除或归档，另一端修改 | `archivedSessionIds` vs 新 `payload_version` | 保留修改版；恢复该会话并标注「曾被归档」 | 需决策 |
| **C5** 格式不匹配 | 同一 `sessionDir`，一端 `v4`、一端 `legacy` | `formatId` 不同 | **永不合并**，两份并存，各自写回各自格式目录 | 强提示（§13） |
| **C6** 路径别名冲突 | 同 `workspaceId` 两端 `path` 不同；或同 `path` 不同 `workspaceId` | `workspace_aliases` 比对 | 以 `workspaceId` 为准；`path` 本地化；同 path 不同 id → 拆成两个工作区 | 需告知 |
| **C7** 标题冲突 | `projcache.title` 两端不同 | 行级 `ver/seq` | `seq` 大者胜；相同则后写胜；旧值留历史 | 时间线可见 |

### 9.2 「绝不静默覆盖」的落地机制

1. **写前必存**：任何覆盖前，旧负载先成为一条 `payload_version`。
2. **写前必检**：目标文件是否被 DSH 独占打开（能以共享方式读写才继续）。
3. **冲突即冻结**：该会话退出自动同步队列，直到用户决策。
4. **留痕**：`Conflict` + `AuditEvent` + 控制台时间线三处一致。
5. **不可解时降级**：整工作区进只读 + 导出原始字节 + 告警，绝不猜。

### 9.3 冲突副本命名（服务端侧）

```text
同一 hub_session_id 下:
  payload_versions[].role = "primary" | "conflict_copy"
  文件名不落地到 DSH 目录（避免生成 DSH 读不懂的会话）
```

> 关键取舍（D3）：**不在本地 DSH 目录里造 fork 文件**。因为无法验证 DSH 会不会加载一个「文件名带后缀、内部 ID 不变」的会话；一旦读不出还可能污染列表。冲突副本只活在 Hub，用户从控制台选择「落哪个」。

---

## 10. 安全设计

### 10.1 威胁模型

| # | 威胁 | 缓解 |
| --- | --- | --- |
| T1 | 服务端被拖库 | 静态加密（每工作区数据密钥 + 主密钥）；令牌只存哈希 |
| T2 | 设备令牌泄露 | 可吊销；最小作用域（只能读写自己注册的 home） |
| T3 | 恶意/失陷设备 | 上传体校验（size/sha256/chunk）；索引合并 fail-closed；速率限制 |
| T4 | 传输窃听 | TLS 1.3 + HSTS；禁止明文回退 |
| T5 | 误传凭据 | 路径硬黑名单 + 上传前 dry-run 报告 + 服务端二次拒绝 |

### 10.2 凭据隔离（红线）

- Agent **不打开**任何命中黑名单的文件（`stat` 之后直接跳过，不读字节、不 hash）。
- 黑名单：`.credentials.yaml`、`.credentials*`、`*.key`、`*.pem`、`*.p12`、`**/id_rsa*`、`**/.env`、`profiles/**/cred*`。
- 上传清单在预检阶段**明示**「已排除 N 个文件」，用户可见。
- 服务端对上传路径做二次白名单校验，只接受 `sessions/` 与 `storages/` 前缀。
- 审计日志中不记录文件内容，只记录路径与摘要。

### 10.3 认证与会话

| 项 | 设计 |
| --- | --- |
| 配对码 | 8 位（去混淆字符集），TTL 10 min，一次性，每 IP 5 次/分钟限流 |
| 设备令牌 | 32 字节随机，`argon2id` 哈希存库，可吊销，轮换 |
| 控制台 | 密码/TOTP（P1）+ HttpOnly cookie + CSRF token |
| 权限 | 设备只能访问自己注册的 `home_id` 与已授权 `workspace_id` |

### 10.4 加密

- 传输：TLS 1.3（反代终止，可选 mTLS）。
- 静态：AES-256-GCM；对象键 = `sha256(chunk)`，数据密钥按工作区包裹。
- 密钥管理：环境变量或文件挂载；**不入库、不入日志、不进同步范围**。
- E2E：P2；代价是服务端无法做索引语义合并，需改为「客户端合并 + 密文存储」，会削弱冲突自动解决能力。

---

## 11. 手机端形态

### 11.1 三个候选

| 方案 | 形态 | 优点 | 缺点 | 结论 |
| --- | --- | --- | --- | --- |
| A | 纯 PWA 控制台 | 零安装、跨 iOS/Android/鸿蒙、成本最低 | 不能跑会话 | **v1 采用** |
| B | A + 远程接入跳板 | 能真正在手机上"用"DSH | 依赖常开电脑 + 隧道；安全面变大 | P1，做入口不做内建 |
| C | 原生壳/小程序 | 体验最好 | 三端各做一遍，成本高 | 不做 |

### 11.2 PWA 必做界面

1. **我的设备**：在线状态、最后同步、版本与格式、吊销。
2. **工作区与会话**：树形浏览、标题、最后活跃、来源设备、格式标签（`v4`/`legacy`）。
3. **冲突队列**：待决策列表 + 两版本摘要（只比索引元数据，不解析负载）。
4. **恢复**：选时间点 → 预览 → 触发（在目标设备上执行，手机只发指令）。
5. **交接摘要**：从索引层生成「最近 N 个回合的时间线 + 未完成任务」，供手机快速读。

### 11.3 移动端体验约束

- 首屏 ≤ 1.5 s（3G 下 ≤ 3 s）；只渲染首屏 50 条。
- 无横向滚动；触控目标 ≥ 44 px。
- 断网可读缓存的上次状态（Service Worker 只缓存控制台壳，不缓存负载）。

---

## 12. 非功能需求

| 类别 | 要求 |
| --- | --- |
| 首传性能 | 20 MB 会话：局域网（100 Mbps）≤ 10 s；公网（10 Mbps）≤ 40 s |
| 增量性能 | 一次普通回合追加 ≤ 2 MB 上传；≤ 3 s 完成（10 Mbps） |
| 控制台性能 | 1000 会话下首屏 ≤ 1.5 s；列表虚拟滚动 |
| 容量 | v1 不设硬限；实测目标：单工作区 500 会话、单会话 100 MB 不崩 |
| 并发 | 单 home 单写者（租约）；跨设备并发由冲突机制兜底 |
| 可靠性 | 任一步失败不得产生「半写会话」；校验失败必须回滚 |
| 可观测 | 每轮 `SyncRun` 有字节数/耗时/失败项；服务端结构化日志；关键指标可导出 |
| 兼容 | DSH 0.2.x（v4）与 legacy 双格式；`workspace.json` v2、`session_projcache.json` v3 |
| 可移植 | Hub 单二进制/Compose 部署；无云厂商锁定 |

---

## 13. 平台限制与用户决策（新增）

**原则**：遇到平台硬限制，**不静默降级、不假装成功**。弹「能力说明卡」→ 用户选择「继续（我了解风险）」或「取消」→ 决策写入 `platform_notices` + `audit_events`。

| ID | 平台 | 限制 | 检测方法 | 提示要点 | 用户可选项 |
| --- | --- | --- | --- | --- | --- |
| PLAT-WIN-01 | Windows | DSH 占用文件导致读写失败 | 以 `FileShare.ReadWrite` 打开；失败计数 | 「该会话正被 DSH 使用，本轮跳过」 | 稍后重试 / 跳过该会话 |
| PLAT-WIN-02 | Windows | 长路径 > 260 字符 | 路径长度检查 | 「路径过长，建议启用长路径支持」 | 继续 / 取消 |
| PLAT-MAC-01 | macOS | 未授予「完全磁盘访问」 | 读取 home 时 `EACCES` | 「需在系统设置授权，否则无法读取会话」 | 去授权 / 取消 |
| PLAT-MAC-02 | macOS | 未签名 CLI 被 Gatekeeper 拦 | 启动失败码 | 「首次运行需在隐私与安全性中允许」 | 继续 / 取消 |
| PLAT-IOS-01 | iOS | 无 Node，无法本地运行 | 环境探测 | 「iOS 只能作为查看端，不能承载会话」 | 我知道了（转 T3 控制台） |
| PLAT-AND-01 | Android | 需 Termux + 手动装 Node | `node -v` 缺失 | 「需自行安装 Termux 与 Node，且后台可能被杀」 | 我已装好 / 取消 |
| PLAT-AND-02 | Android | 后台被系统回收 | 心跳中断 | 「同步可能中断，建议加白名单/前台服务」 | 继续 / 取消 |
| PLAT-HAR-01 | HarmonyOS NEXT | 无 Node/Termux | 环境探测 | 「仅支持浏览器控制台」 | 我知道了 |
| PLAT-FMT-01 | 全平台 | 同会话存在 `v4` 与 `legacy` | `formatId` 比对 | 「两种格式并存，不会合并；请用同一版本 DSH」 | 双份保留（唯一选项）/ 取消 |
| PLAT-VER-01 | 全平台 | DSH 版本跨越不兼容代 | 版本比较 | 「版本不一致，进入只读」 | 只读继续 / 取消 |

---

## 14. 部署与运维

| 项 | v1 方案 |
| --- | --- |
| 形态 | Docker Compose：`hub`（Node）+ SQLite + 卷（对象存储目录） |
| 反代 | Caddy/Nginx 终止 TLS，开 HSTS |
| 备份 | SQLite 每日快照 + 对象目录 rsync；恢复演练脚本 |
| 升级 | 语义化版本 + 迁移脚本；协议版本独立于产品版本 |
| 迁移 | 导出为「清单 + 对象包」，可迁到 S3 后端（P2） |
| 代码交付 | 源码在 `02-Project/dsh-sync-hub`；交付前同步到 `FindSomeSkills/workspace` 并 push（知识库规则第 11 条） |

---

## 15. 风险与未验证假设

| # | 假设 | 风险 | 验证方式 | 未验证的后果 |
| --- | --- | --- | --- | --- |
| R1 | 在本地生成 fork 会话可被 DSH 正常加载 | 高 | 造测试会话，改目录名/文件后缀，观察 DSH 列表与打开行为 | 决定了「冲突是否只能留在 Hub」（当前按不可行处理） |
| R2 | 同一会话目录下同时存在 `v4` 与 `legacy` 时，DSH 的选取规则 | 高 | 用实测目录（`session-713330f7…`）观察 | 决定是否必须清理旧格式 |
| R3 | `session_projcache` 能否由负载重建 | 中 | 删一条 projcache 记录，重启 DSH 看是否自愈 | 若能自愈，索引冲突可自动修复 |
| R4 | DSH 是否对负载文件加独占锁 | 中 | 同步时以共享方式打开 | 决定「边写边传」是否安全 |
| R5 | append-only 前缀假设是否普遍成立（压缩帧是否重写） | 高 | 对同一会话多次快照做前缀比对 | 决定增量收益；不成立则退回分块 |
| R6 | `workspace.json` unit 版本升级（v2→v3）的破坏面 | 中 | 模拟新版本结构，跑合并 | 决定 fail-closed 策略是否足够 |
| R7 | 同机两 home（`.dsh` + `.ohdsh`）同时同步是否互相踩 | 中 | 本机双开实测 | 可能需要「同机互斥」开关 |
| R8 | 会话目录名与内部 ID 不一致时的行为 | 中 | 对比目录名与 projcache key | 决定身份是否只能取目录名（当前是） |

---

## 16. 里程碑与验收

| 里程碑 | 内容 | 验收 |
| --- | --- | --- |
| M0 骨架 | 两个模拟 home 目录 + 本地 hub（文件存储）+ 单会话单格式 | `sync` 一次，两目录负载一致 |
| M1 增量 + 索引 | 前缀增量、workspace/projcache 合并 | 目标端列表可见、有标题；增量 ≤ 变更 × 1.2 |
| M2 冲突 + 恢复 | C1/C3 检出、留双份、一键恢复 | 构造分叉，双份可见可选；恢复后可打开 |
| M3 跨格式 | `v4` ↔ `legacy` 识别与拒绝合并 | 同会话双格式不互相覆盖 |
| M4 平台矩阵 | Win/macOS 实测 + Android Termux 试跑 + iOS/鸿蒙 PWA | 限制卡正确弹出并留痕 |
| M5 团队 | 多用户、角色、共享工作区 | 两账号共享同一工作区不串数据 |

---

## 17. 附录

### A. 本机 DSH 存储实测清单（2026-11-13）

| Home | 运行面 | 负载文件名 | 会话目录命名 | storages |
| --- | --- | --- | --- | --- |
| `~/.dsh` | web/cli | `session.v4.jsonl.zstd`（另有少量 `session.jsonl.zstd` 残留） | `session-<uuid>`、`od-<uuid>` | `workspace.json`(v2)、`session_projcache.json`(v3)、`schedule.json` |
| `~/.ohdsh` | desktop（**已卸载，数据冻结**） | `session.jsonl.zstd` 109 个（部分目录并存 `session.v4.jsonl.zstd` 8 个） | 裸 `<uuid>`、`session-<uuid>`、`dsh-automation-session-<uuid>` | `workspace.json`(v2)、`session_projcache.json`(v3)、`dsh_automation.json` |

- DSH 版本：`0.2.1-rc.2`；Node：`v24.19.0`。
- 最大单会话负载：`22,832,359` 字节（`~/.dsh`）。

### B. 协议消息索引

`/v1/pair/claim`、`/v1/homes`、`/v1/preflight`、`/v1/sync/handshake`、`/v1/workspaces/{id}/manifest`、`/v1/blobs/init|chunks|commit`、`/v1/sync/commit`、`/v1/events`（SSE）、`/v1/conflicts`、`/v1/restore`。

### C. 参考

- 调研笔记：`09-Agent/DSH多设备同步方案调研-2026-11-13.md`
- `PerryLink/dsh-session-sync`（append-only 三方合并、冲突保双份）
- `IceApriler/dsh-remote-mobile`（单实例远程接入、扫码配对）
