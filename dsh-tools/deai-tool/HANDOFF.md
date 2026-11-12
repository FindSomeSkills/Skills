# 交接提示词 — De-AI Tool 专有会话

> 复制下面整段，在新会话第一句发送。工作区选 `Knowledge base`。

---

```
项目：De-AI Tool —— 把「去 AI 化」做成可调用的工具，让任何会话在写内容、做 UI、剪视频、出图之前先跑一遍检查。

工作区：C:\Knowledge base（项目目录：02-Project\deai-tool）

开工前先读：
1. 02-Project\deai-tool\PROJECT_BRIEF.md（素材来源、工具形态、规则示例、里程碑、约束）
2. ~/.dsh/skills/humanizer/SKILL.md + references/00-工作流.md、13-禁止与回退.md（中文写作去 AI 味的理论底座）
3. ~/.ohdsh/skills/unslop/references/signs.md（UI slop 的八组特征与改法）
4. %LOCALAPPDATA%\Programs\Open Design\resources\open-design\craft\anti-ai-slop.md（设计规范）
5. ~/.dsh/AGENTS.md 第 4、5 条（已有的全局规则）

任务分四步：
第 1 步：定规则集。把 humanizer 与 unslop 的特征整理成可判定的规则，每条写清：规则 ID、检测对象、判定条件、严重度、修复建议、来源章节。文本与 UI 各一套，各出 10–20 条，配正例/反例样例。
第 2 步：实现 CLI。Node + TypeScript，零重型依赖。命令：deai text <file...>、deai ui <dir...>、deai report --json。输出按严重度分组，支持 --json。
第 3 步：做会话入口。一个 skill（名字 deai），让任意会话开工前调用一次就能拿到报告；SKILL.md 里写清何时调用、怎么读报告、怎么配合 humanizer 与 unslop。
第 4 步（可选）：本地 Web 面板，展示问题清单与原文对照，界面方向用 od tools directions 取。

验收：
- 规则集有正例反例，跑测试全过，误报率为 0（在样例上）
- CLI 能在我给的一个真实 HTML 页面和一篇中文文章上跑出报告
- 新会话调用 deai 一次即可拿到可用报告
- 检查器不调模型、不出评分、不写「AI 检测」字样

硬性约束：
- 确定性优先，只报可复现的问题；规则来源必须标注
- 不做自动语义改写；--fix 只做安全替换（去 emoji 图标、间距归到 4px 栅格）
- 代码放 02-Project\deai-tool，完成后同步到 FindSomeSkills/workspace 并 push
- 界面产物优先 Open Design；检索优先 AnySearch

现在从第 1 步开始：先给我规则集的表结构（字段设计）和 10 条文本规则的初稿，我确认后再补 UI 规则。
```

---

## 当前状态

| 项 | 状态 |
| --- | --- |
| 项目目录 | `C:\Knowledge base\02-Project\deai-tool`（只有简报与本文件） |
| 规则来源 | humanizer（已装技能）、unslop signs、Open Design craft |
| 代码 | 未开始 |
| 下一步 | 新会话按四步推进 |
