---
created: 2026-11-14
updated: 2026-11-14
tags: [dsh-toolbox, seo, keyword-intent-map]
status: 候选词与证据已整理；搜索量列全部为未知
---

# Keyword-intent map（2026-11-14）

搜索量一列没有数据：本机代理不可用，Google / Keyword Planner / Search Console 报表都取不到。本表只记录“谁在什么场景下需要什么”，不据此推断流量。

| 候选查询（中/英） | 语言 | 地区 | 意图 | 目标 URL | 需求证据 | 搜索量来源 | 现有能力 | 缺口 | 验收方式 |
|---|---|---|---|---|---|---|---|---|---|
| deepseek harness 安装 / install deepseek harness | zh+en | CN/全球 | 装好并跑起来 | `/guides/install/` | 讨论 #5542 安装卡死、pnpm 报错；百度下拉“安装卡住/安装命令/安装路径” | 未获取 | 官方 npm 命令 + Node 版本 + 常见失败分流 | 桌面安装包与 CLI 的关系要写清（见下） | 新用户按页完成一次 `dsh web` 启动 |
| deepseek harness 桌面版 / desktop | zh+en | CN | 要图形安装包，不想用命令行 | `/guides/desktop/` | 百度下拉“手机端/安卓下载”外，桌面端提问存在 | 未获取 | 说明 desktop 名字留给 Electron | 需核对官方 Releases 是否有桌面安装包，当前页面未给来源 | 页面给出一条官方链接并能打开 |
| deepseek harness 会话怎么删除 / delete DSH sessions | zh+en | CN/全球 | 删掉会话、释放磁盘 | `/tools/session-purge/` | 讨论 #3339、#4441；十几个删除类插件；百度下拉整组“怎么删/删不掉” | 未获取 | 选目录、勾选、按填写路径生成备份与删除命令 | 静态占位命令仍是默认路径；无真实浏览器流程验收 | 用合成目录跑通“选目录→填路径→生成命令” |
| DSH 会话列表消失 / sessions disappeared | zh+en | CN/全球 | 文件在但列表没有，想恢复可见 | `/tools/session-index-doctor/` | 讨论 #12454、#6342；社区“工作区全空”复盘 | 未获取 | 读磁盘、workspace.json、projcache 并比对 | 只诊断不修复；页面需先分流五种情况 | 用合成目录复现四种缺项并看到对应说明 |
| deepseek harness 上下文满了 / context full | zh+en | CN | 还能聊几轮、何时压缩 | `/tools/context-budget/` | 讨论 #1933（请求压缩上下文）、#10953、#8442；百度下拉整组 | 未获取 | 手填六参数估算 | 参数来源与“每轮新增”语义需在页内解释 | 按页面示例输入，结果与手算一致 |
| SKILL.md token 占用 / skill context cost | zh+en | CN/全球 | 哪些技能在占上下文 | `/tools/skill-load-audit/` | 讨论 #11732；竞品 `dsh-context-optimize` | 未获取 | 读最多 400 个 SKILL.md，按体积粗估 | 目录开销 / 全文开销 / 真实注入未分层说明 | 用合成技能目录验证三类计数 |
| deepseek harness 插件推荐 / dsh 插件市场 | zh+en | CN | 按任务找插件、怎么装 | `/plugins/`、`/plugins/conflicts/` | 百度下拉“插件商店/市场索引源/推荐安装”；市场包月下载 125 万 | 未获取 | 83 页目录 + 26 对冲突 | 只“查”不“装”；冲突分类需分四档 | 从“我想做 X”能落到一个包页 |
| zstd viewer / open .zstd | en | 全球 | 想看会话正文 | `/tools/zstd-frame-inspector/` | Stack Overflow / Reddit 的 `.zst` 读取提问 | 未获取 | 只读帧结构，不解压 | 泛词意图与能力不匹配，标题已限定 “frame” | 页面明确写“不解压、不导出” |
| ai 味检测 / AI slop detector | zh+en | CN/全球 | 判断文字像不像 AI 写的 | `/tools/de-ai-kit/` | 百度下拉整组；竞品 sloplint、去AI味 Pro | 未获取 | 规则检查 + UI 规则扫描 | 不判断作者身份、不改写 | 贴一段文本得到行号级结果 |
| 两台电脑同步会话 / sync sessions | zh+en | CN/全球 | 换机后看到同一批会话 | `/sync-hub/` | 讨论 #12619（48 个会话同步后不显示） | 未获取 | 自托管 CLI、单次增量同步 | 需验证目标机“可见、可打开、可继续” | 两台隔离环境跑通并截图 |
| 插件冲突 / plugin conflict | zh+en | CN/全球 | 装之前知道会不会打架 | `/plugins/conflicts/` | 市场提交记录、兼容性文档 | 未获取 | 26 对冲突说明 | 需分“已复现 / 配置风险 / 功能重叠 / 未验证” | 每对标注证据等级 |
| deepseek harness vs claude code | en | 全球 | 选工具 | `/compare/vs-claude-code/` | 中文教程与对比文大量存在 | 未获取 | 功能差异对比 | 未做同任务实测，不写成功率/速度 | 页面只保留有来源的差异 |

## 备注

- “百度下拉”只能证明有这种问法，不能证明月搜索量；表中一律写“未获取”。
- 插件下载量、GitHub 星数、讨论编号都不等于关键词搜索量，未写入本表任何一行。
- 中文翻译词不代表中文需求已验证；同一意图的中英行分开列。
