# DSH Sync Hub 使用手册

> 让 DeepSeek Harness（DSH）的会话在**多台设备、多个 DSH 版本形态**之间同步与续接。
> 适用 DSH 0.2.x；会话文件按不透明字节搬运，不解析内容。

---

## 1. 它解决什么问题

| 痛点 | 这个工具怎么做 |
| --- | --- |
| 办公室网页版跑到一半，回家桌面版看不到 | 会话 + 索引一起同步，回家打开列表就能接着跑 |
| 手机想知道"昨晚跑到哪了" | 手机浏览器打开控制台看进度、看待办（不承载会话） |
| 两台机器都改过同一个会话，不知道谁对 | 检出冲突，**两份都留**，等你决定；绝不静默覆盖 |
| 换新电脑，历史会话全丢 | 配对后全量拉取 |

关键设计：**它同步的是"一个 DSH 数据目录"，不是"某个 DSH 客户端"**。所以网页版、桌面版、终端版都能互相同步，将来 DSH 出新形态也不用改工具。

---

## 2. 支持范围

### 能同步的

| 路径（DSH 数据目录下） | 说明 |
| --- | --- |
| `sessions/<工作区>/<会话>/session*.jsonl.zstd` | 会话本体（`v4` 与旧格式都支持） |
| `storages/workspace.json` | 工作区与会话列表；**不同步它，会话在列表里不显示** |
| `storages/session_projcache.json` | 会话标题与统计；**不同步它，会话没有标题** |

### 永不同步的（硬黑名单）

`.credentials.yaml`、`.credentials*`、`*.pem`、`*.key`、`*.p12`、`id_rsa*`、`.env`、`profiles/**/cred*`

这些路径在扫描阶段就被跳过：不读取、不计算哈希、不上传。

### 默认不同步的

`storages/schedule.json`（提醒任务）、`storages/dsh_automation.json`（桌面版自动化）、`logs/`、`cache/`、`profiles/`、`skills/`。理由：这些是**设备本地状态**，搬过去会互相打架。

---

## 3. 支持的平台

| 平台 | 能力 | 说明 |
| --- | --- | --- |
| Windows / macOS / Linux | 完整（同步宿主） | 需要 Node ≥ 20 |
| DSH 网页版 / 桌面版 / 终端版 | 完整 | 只要给出数据目录即可，不看宿主类型 |
| Android（Termux） | 完整但需自行准备 | 需装 Termux + Node；后台可能被系统杀 |
| iOS / HarmonyOS NEXT | 只读控制台 | 无 Node 运行时，不能承载会话；可看进度、触发恢复 |

> 手机不跑 DSH。手机上的"续接"= 看进度 + 触发恢复 + 读交接摘要。这是能力边界，不是缺陷。

---

## 4. 安装

只需要 Node.js 20 或更高版本（本机验证 24.19.0）。**没有任何第三方依赖**，不需要 `npm install`。

```bash
git clone <你的仓库地址> dsh-sync-hub
cd dsh-sync-hub
node --version    # 确认 ≥ 20
```

---

## 5. 三步上手

### 第 1 步：在一台常开的机器上启动 Hub

```bash
node src/hub/server.mjs
# [hub] listening on http://0.0.0.0:7788  data=./.dshsync-hub
```

可选环境变量：`PORT`（默认 7788）、`HOST`（默认 0.0.0.0）、`DSHSYNC_DATA`（数据目录）。

> 放到公网请务必套一层 HTTPS 反向代理（Caddy / Nginx），否则设备令牌是明文传输。

### 第 2 步：生成配对码，在每台设备上配对

在 Hub 那台机器上：

```bash
node src/agent/cli.mjs code --hub http://<hub-ip>:7788
# 一次性配对码: SZWXK5Y9  (过期: 2026-11-13T04:10:00.000Z)
```

在另一台设备上：

```bash
node src/agent/cli.mjs pair --hub http://<hub-ip>:7788 --code SZWXK5Y9 --name 我的笔记本
# 已配对: deviceId=dev_xxx
# 状态目录: ~/.dshsync/<hash>
```

配对码 10 分钟有效、只能用一次。

### 第 3 步：同步

```bash
node src/agent/cli.mjs sync --hub http://<hub-ip>:7788 --home ~/.dsh
```

`--home` 指向 DSH 数据目录：

| DSH 形态 | 数据目录 |
| --- | --- |
| 网页版 / 终端版 | `~/.dsh` |
| 桌面版 | `~/.ohdsh`（以你机器实际为准） |

第一次同步是全量；之后每次只传变化的分块。

---

## 6. 命令参考

| 命令 | 作用 |
| --- | --- |
| `node src/agent/cli.mjs probe --home <目录>` | 只读探测：运行面、格式、索引版本、会话数、负载大小。**不改任何文件** |
| `node src/agent/cli.mjs code --hub <url>` | 生成一次性配对码 |
| `node src/agent/cli.mjs pair --hub <url> --code <码> [--name <名字>]` | 配对并保存设备令牌 |
| `node src/agent/cli.mjs sync --hub <url> --home <目录>` | 双向同步一次 |
| `node src/agent/cli.mjs status` | 查看本机令牌、上次同步的会话哈希 |

`sync` 的退出码：`0` 正常，`2` 有冲突待处理，`1` 出错。

返回示例：

```json
{
  "indexes": [{ "kind": "workspace", "seq": 3, "changed": true }],
  "uploaded":   [{ "key": "…|session-abc|v4", "mode": "delta", "bytes": 28928, "total": 160000 }],
  "downloaded": [{ "key": "…|session-xyz|v4", "bytes": 6078693 }],
  "conflicts": [],
  "bytesUp": 28928,
  "bytesDown": 6078693
}
```

---

## 7. 冲突怎么处理

**默认行为：两份都留，本地文件不动。**

当两台设备从同一个版本各自往下写，后同步的那台会拿到冲突：

```json
{ "conflicts": [{ "key": "…|session-abc|v4", "reason": "base-is-stale", "conflictId": "cf_xxx" }] }
```

- 服务端把后到的那份存成**冲突副本**（不会丢），当前版本保持先到者；
- 你本地那份**原封不动**，不会变成别人的版本；
- 处理方式：用 `--home` 分别在那两台设备上看一下哪份是你要的，留一个、另一个从 Hub 侧丢弃即可（具体交互在控制台里做，CLI 暂时只报告）。

**为什么不做自动合并**：会话是追加写的压缩帧，跨设备真正分叉后，自动合并可能产出 DSH 读不出的文件。宁可停下来问你，也不猜。

---

## 8. 平台限制（会明确提示，不静默降级）

| 场景 | 表现 | 处理 |
| --- | --- | --- |
| Windows 文件正被 DSH 占用 | 该会话本轮跳过 | 关掉对应会话后重跑 |
| Windows 路径过长（>260） | 写入失败 | 启用长路径支持，或换较短的工作区路径 |
| macOS 未授权磁盘访问 | 读目录报 `EACCES` | 系统设置 → 隐私与安全性 → 完全磁盘访问 |
| Android Termux 后台被回收 | 同步中断 | 给 Termux 加电池白名单 |
| iOS / 鸿蒙 | 无法运行 Agent | 用浏览器做只读控制台 |
| 两端 DSH 版本差异过大 | 只读模式 | 把两端升到同一 0.2.x 版本 |

---

## 9. 安全说明

- **传输**：自签名不够，请用 HTTPS 反代；Hub 默认只监听内网更安全。
- **令牌**：设备令牌保存在 `~/.dshsync/<hash>/state.json`，等于密码，别提交到任何仓库。
- **服务端存储**：会话以内容寻址块存储，默认落盘在 `DSHSYNC_DATA` 指定目录。
- **凭据**：见 §2 硬黑名单，永不进入同步链路。
- **吊销**：删除 Hub 侧 `meta/devices.json` 里对应条目即吊销该设备（后续会做成控制台按钮）。

---

## 10. 故障排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| `401 invalid token` | 令牌失效或配对未完成 | 重新 `pair` |
| `404 code not found` | 配对码输错/已用 | 重新生成 |
| `409 code already used` | 同一码被用过 | 重新生成 |
| 会话同步了但列表里没有 | `workspace.json` 没同步 | 检查同步范围是否包含 `storages/` |
| 会话在列表里但没标题 | `session_projcache.json` 没同步 | 同上 |
| `EADDRINUSE` | 端口被占 | 换 `PORT` |
| `EPERM` 运行测试时 | 受限环境禁止 spawn | 直接 `node test/e2e.test.mjs`，别用 `node --test` |
| 同步后 DSH 里看不到新会话 | DSH 有内存缓存 | 重启 DSH |

---

## 11. 自测与试用（不碰真实数据）

```bash
# 造两个假 DSH 目录，跑完整链路
node tools/demo.mjs

# 只读探测真实 DSH 目录（不改任何文件）
node tools/probe.mjs ~/.dsh

# 造一个最小假 Home 自己试
node tools/make-fixture.mjs ./try
node src/agent/cli.mjs sync --hub http://127.0.0.1:7788 --home ./try/home

# 测试
node test/e2e.test.mjs        # 4 项：端到端 / 增量 / 冲突 / 凭据
node test/protocol.test.mjs   # 6 项：鉴权 / 配对 / 块校验 / 索引合并 / 冲突
```

---

## 12. 现状与边界

**已实现**：设备配对、Home 探测、会话与索引双向同步、增量传输（追加写只传尾块）、冲突留双份、只读探测、CLI。

**尚未实现**：Web 控制台 / 手机 PWA、版本历史与一键恢复、SSE 实时推送、冲突解决交互、`attachments/` 同步、多用户。

**明确不做**：解析会话内容、替代远程接管、自动合并分叉会话。
