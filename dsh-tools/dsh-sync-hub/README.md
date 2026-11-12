# DSH Sync Hub

跨 **DSH 运行面**（网页版 / 桌面版 / TUI）与跨 **操作系统**（Windows / macOS / Linux / Android+Termux）的 DSH 工作区与会话同步中枢。手机（iOS / HarmonyOS）作为只读控制台参与。

> **配套站点**：`projects/dsh-toolbox/`（DSH Toolbox，双语静态站，含在线工具与存储结构参考）。
> 站点：https://dshtoolbox.com

> 状态：**MVP 骨架已跑通端到端同步链路**（第 3 步验收通过）。控制台 UI、恢复流程、PWA 尚未实现。

## 文档

| 文件 | 内容 |
| --- | --- |
| [`PRD.md`](PRD.md) | 产品需求：功能清单、流程、数据模型、同步协议、冲突策略、安全、平台矩阵 |
| [`docs/SELECTION.md`](docs/SELECTION.md) | 技术选型对比（A/B/C）与 ADR 决策记录 |
| [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) | 立项简报（原始） |
| [`HANDOFF.md`](HANDOFF.md) | 会话交接与当前状态 |

## 核心约束（写进代码，不是口号）

1. **负载是不透明字节**：`session*.jsonl.zstd` 只做 hash / 分块 / 搬运，从不解析 zstd 或 JSONL。
2. **索引必须语义合并**：`workspace.json` + `session_projcache.json`；禁止整文件 last-write-wins（会丢会话 = 列表里消失）。
3. **绝不静默覆盖**：冲突时 Hub 留双份（`conflict_copy`），本地文件保持原样。
4. **凭据永不入库**：`.credentials*` / `*.pem` / `*.key` / `id_rsa` / `profiles/**/cred*` 硬黑名单。
5. **运行面无关**：Agent 的输入只是一个 `--home <DSH Home>` 目录。

## 快速开始

零第三方依赖，Node ≥ 20 即可。

```bash
# 1) 起 Hub（默认 0.0.0.0:7788，数据落在 ./.dshsync-hub）
npm run hub

# 2) 生成一次性配对码
node src/agent/cli.mjs code --hub http://127.0.0.1:7788

# 3) 另一台设备配对（令牌落到 ~/.dshsync/<home 哈希>/state.json）
node src/agent/cli.mjs pair --hub http://127.0.0.1:7788 --code <码> --name my-pc

# 4) 同步（--home 指向 DSH 数据根：~/.dsh 或 ~/.ohdsh）
node src/agent/cli.mjs sync --hub http://127.0.0.1:7788 --home ~/.dsh
```

## 验证

```bash
# 只读探测一个 DSH Home：运行面 / 格式 / 索引版本 / 会话数 / 负载量
node tools/probe.mjs ~/.dsh ~/.ohdsh

# 两台模拟设备的端到端演示（配对→首传→拉取→增量→冲突）
node tools/demo.mjs

# 测试（直接跑文件；node --test 的 runner 会 spawn 子进程，受限环境会 EPERM）
node test/e2e.test.mjs
```

## 目录

```
src/shared/util.mjs   sha256 / 定长分块 / 原子写 / DSH pathSlug 规则
src/hub/store.mjs     元数据 JSON + 内容寻址块（CAS）
src/hub/merge.mjs     索引语义合并（workspace / projcache）
src/hub/server.mjs    REST：配对、握手、清单、plan/commit、块收发
src/agent/agent.mjs   Home 探测、扫描、双向同步、配对
src/agent/cli.mjs     probe / code / pair / sync / status
test/harness.mjs      造两个模拟设备的 DSH Home
test/e2e.test.mjs     4 组端到端断言
tools/demo.mjs        可复跑的演示
tools/probe.mjs       只读探测真实 Home
```

## 同步的一次往返

```
Agent                          Hub
  │ handshake（运行面/格式/索引版本/工作区路径）
  ├──────────────────────────────►│
  │ GET+POST /v1/index/{kind}      │  语义合并，返回 canonical
  ├──────────────────────────────►│
  │ GET /v1/manifest               │
  ├──────────────────────────────►│
  │ POST /v1/sync/plan             │  判定 none / full / delta / conflict
  ├──────────────────────────────►│
  │ PUT /v1/blob/{chunkHash} × N   │  只传缺失块
  ├──────────────────────────────►│
  │ POST /v1/sync/commit           │  建版本；冲突则存 conflict_copy 并记录
  ├──────────────────────────────►│
```

增量判定：比较**完整块**前缀（末尾半块在追加写时会变，不参与比较）。实测追加 10 KB 时只传 28,928 B，节省 81.9%。

## 尚未实现（对应 PRD）

- Web 控制台 / PWA（PRD §5.1 P0-8、§11）
- 版本历史与一键恢复（P0-9）
- SSE 推送、冲突解决交互（P1-4）
- 附件同步、多用户、E2E 加密（P2）
- 平台限制提示卡（§13）——探测已能识别运行面，但未做 UI 提示
