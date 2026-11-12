# 交接提示词 — DSH Sync Hub 专有会话

> 用途：在新会话中作为第一句话粘贴（或让 Agent 先读本文件），确保上下文完整、不丢信息。

---

## 交接提示词（直接复制下面整段）

```
项目：DSH Sync Hub —— 一个可部署到网站上的工具，解决 DeepSeek Harness（DSH）工作区与会话在多设备（多台电脑 + 手机）之间的自动同步与续接问题。

工作区：C:\Knowledge base（项目目录：02-Project\dsh-sync-hub）

开工前先读这三份文件：
1. 02-Project\dsh-sync-hub\PROJECT_BRIEF.md（目标、需求草案、技术方向、约束）
2. 09-Agent\DSH多设备同步方案调研-2026-11-13.md（现有工具调研结论）
3. 09-Agent\自我进化\操作记录.md 中 2026-11-13 的条目（Sync Hub 立项与规则变更）

本次任务：
第 1 步：产出 PRD —— 功能清单（P0/P1）、用户流程（配对→同步→冲突→恢复）、数据模型、同步协议、冲突处理策略、安全设计、手机端形态。
第 2 步：技术选型对比（A 自建 Node 服务 + Web 控制台 / B 基于 git 镜像的托管服务 / C 组合现有插件 + 轻量控制台）。
第 3 步：搭 MVP 骨架，跑通一条端到端同步链路（两台模拟设备之间）。

硬性约束：
- 会话文件（session.v4.jsonl.zstd）按不透明字节处理，不解析 zstd/JSONL
- 必须同时同步 sessions 与 storages（workspace.json 索引），否则会话在列表中不显示
- 两端 DSH 版本需一致（0.2.x 用 v4 格式）
- 凭据（.credentials.yaml）绝不入库
- 代码放在 02-Project\dsh-sync-hub，完成后同步到 FindSomeSkills/workspace 并 push
- 界面类产物优先走 Open Design（od CLI），检索优先走 AnySearch

现在从第 1 步开始：先给我 PRD 大纲（章节结构 + 关键决策点），我确认后再展开。
```

---

## 当前状态（2026-11-13 更新）

| 项 | 状态 |
| --- | --- |
| 项目目录 | `C:\Knowledge base\02-Project\dsh-sync-hub` |
| 文档 | `PROJECT_BRIEF.md`、`PRD.md`（17 章）、`docs/SELECTION.md`（A 骨架 + C 入口）、`README.md` |
| 第 1 步 PRD | ✅ 完成（含新增 §3 平台矩阵、§13 平台限制与用户决策、P0-12 离线接管） |
| 第 2 步 选型 | ✅ 完成，结论 A 骨架 + C 入口（B 因二进制增量失效与索引冲突否决） |
| 第 3 步 MVP | ✅ 端到端链路跑通：配对 → 首传 → 拉取 → 增量 → 冲突；`node tools/demo.mjs`、`node test/e2e.test.mjs`（4/4） |
| 代码 | `src/{shared,hub,agent}`、`test/`、`tools/`，零第三方依赖 |
| 未做 | 控制台 UI/PWA、版本历史与恢复、SSE、平台限制提示卡、push 到 FindSomeSkills/workspace |
| 待决 | `~/.ohdsh` 处置→**已决**：先用后删，分三阶段，见下节；待你决定 push 时机 |

## 实测结论（2026-11-13 复核）

- 桌面版**应用**已于 2026-11-08 彻底卸载（进程/安装目录/注册表/快捷方式/启动项均无残留）。
- 数据目录 `~/.ohdsh` 按当时决定保留：114 个会话目录 / 117 个负载 / 112.1 MB（legacy 109 + v4 8），最后写入 2026-11-08 00:41。
- `~/.ohdsh\.credentials.yaml` 仍在（应用已卸载 → 死密钥），建议单独清理。
- `~/.dsh`：25 个负载 / 53.5 MB（v4 23 + legacy 2），其中 4 个会话目录无法归属到索引里的工作区。

## `~/.ohdsh` 数据处置（2026-11-13 决定：先用后删）

用户授权自决：需要就留，不需要就删，**最终要完全删除**。采用「分阶段删除」，因为一次性删会误伤两样东西。

### 现状体积（788 MB）

| 子目录 | 大小 | 处置 |
| --- | --- | --- |
| `desktop/` | 364.6 MB（其中 `Cache` 341.3 MB 是 Electron HTTP 缓存） | 阶段 2 删 |
| `profiles/` | 169.8 MB（桌面 profile 运行时残留） | 阶段 2 删 |
| `sessions/` | 112.1 MB（117 负载：legacy 109 + v4 8） | **保留到 M3**，作跨格式测试语料 |
| `attachments/` | 105.8 MB | 与 sessions 绑定，阶段 3 一起删 |
| `skills-archive/` | 20.6 MB（135 目录 + `RESTORE.md`，1304 文件） | ⚠ **删前必须迁移**：这是 109+ 归档技能的**唯一副本** |
| `plugin-marketplace/` | 6.8 MB | 阶段 2 删 |
| `storages/` | 3.9 MB | 保留到 M3，之后删 |
| `cache/`、`logs/`、`web/`、`.agent-presets/` | 共 ~2.9 MB | 阶段 2 删 |
| `skills/` | 1.4 MB（32 项，31 个 Junction） | 阶段 3 删；**Junction 只删链接，勿删目标** |
| `llm-deepseek/`、`.credentials.yaml` | ~0 | 阶段 3 删（应用已卸载 → 死密钥） |

### 删除闸门

1. **阶段 1（当前）**：全留。用途：M3 跨格式验证、R2（v4/legacy 并存）取证、离线接管回归。
2. **阶段 2**（M3 通过后）：删会话无关的应用残留——`desktop/`、`profiles/`、`plugin-marketplace/`、`cache/`、`logs/`、`web/`、`.agent-presets/`。
3. **阶段 3**（确认 `skills-archive` 去向 + 不再需要语料后）：删 `sessions/`、`storages/`、`attachments/`、`skills/`、`profiles/`、`llm-deepseek/`、`.credentials.yaml`，最后删整个目录。

### ⚠ 两条执行红线

- **不得把会话负载复制进本仓库**：`session*.jsonl.zstd` 是会话内容，属隐私数据，push 到 GitHub 等于泄露。测试样本用 `test/harness.mjs` 生成的合成字节。
- **删 `~/.ohdsh/skills` 时用 `cmd /c rmdir`，不要用 `Remove-Item -Recurse`**：那 31 项是 Junction，指向 `C:\Knowledge base\06-Skills`，递归删除存在跟进目标目录的风险。

### 未完成：删除动作需要具备写权限的终端

Agent 的会话工作区是 `C:\Knowledge base`，`~/.ohdsh` 在工作区之外，沙箱拒绝写入（全部 `Access denied`）。因此分阶段删除需由用户在自己的终端执行，脚本见下：

```powershell
$root = "$env:USERPROFILE\.ohdsh"   # 先核对路径再执行

# 阶段 2：应用残留（无测试价值）
Remove-Item "$root\desktop","$root\profiles","$root\plugin-marketplace","$root\cache","$root\logs","$root\web","$root\.agent-presets" -Recurse -Force

# 阶段 3a：先把 skills-archive 迁出（或确认可弃），再删 Junction（只删链接）
Get-ChildItem "$root\skills" -Force | ForEach-Object { cmd /c rmdir $_.FullName }

# 阶段 3b：会话与凭据
Remove-Item "$root\sessions","$root\storages","$root\attachments","$root\llm-deepseek","$root\.credentials.yaml" -Recurse -Force

# 收尾
Remove-Item $root -Recurse -Force
```

## 相关规则（本会话已生效）

- 新项目工作区默认放知识库（`~/.dsh/AGENTS.md` 第 3 条）
- UI 生成优先 Open Design（第 2 条）
- 检索优先 AnySearch（第 1 条）
- 代码须同步 `FindSomeSkills/workspace` 并 push（知识库第 11 条）
