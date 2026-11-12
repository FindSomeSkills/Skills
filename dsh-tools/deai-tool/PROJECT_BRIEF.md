# De-AI Tool — 项目简报

> 把「去 AI 化」从规则变成可调用的工具，让任意会话在写内容、做 UI、剪视频、出图之前先过一遍。

## 一、已有的素材（不要重造）

| 素材 | 位置 | 内容 |
| --- | --- | --- |
| 中文写作理论库 | `~/.dsh/skills/humanizer/`（SKILL.md + references 21 篇） | dsh-humanizer v0.3.0-rc.2 理论：作者感、复杂度模型、十五层语言分析、禁止与回退、后处理禁令 |
| UI slop 清单 | `~/.ohdsh/skills/unslop/references/signs.md` | 颜色、字体、图标、间距、文案、组件、落地页、视觉八组特征与对应改法 |
| UI 反模式 | `impeccable` 技能 | 界面审查清单 |
| 设计规范 | `%LOCALAPPDATA%\Programs\Open Design\resources\open-design\craft\anti-ai-slop.md` | Open Design 的去 AI 味设计文档 |
| 规则 | `~/.dsh/AGENTS.md` 第 4、5 条 | 全局去 AI 化要求与开工前置动作 |

## 二、要做的工具

### 形态（建议，可调整）
1. **确定性检查器（核心）**：不依赖模型，扫文本与前端代码，输出问题清单。
2. **CLI**：`deai text <file>`、`deai ui <dir>`、`deai report`，可接进 CI 或 pre-commit。
3. **会话入口**：一个 skill（`deai`），任何会话在开工前调用，自动跑检查并把结果带进写作/设计决策。
4. **可选 Web 面板**：本地网页展示问题清单、原文对照、修复建议（用 Open Design 定方向）。

### 文本检查规则（示例，需补全）
- 模板词命中：首先/其次/最后、值得注意的是、综上所述、在当今数字化时代、赋能、闭环、抓手、全方位、助力
- 结构性指标：段落长度方差（过小=等长）、句长方差、排比三段、小标题密度
- 空话密度：形容词占比、"重要性/意义/价值"类抽象名词占比
- 复述检测：结尾是否重复开头的结论

### UI 检查规则（示例，需补全）
- 渐变：`linear-gradient` 中出现紫色/蓝色/粉色组合；`background-clip: text`
- 发光：`box-shadow` 带模糊与高饱和色、`drop-shadow`、`filter: blur` 叠在图标上
- 玻璃拟态：`backdrop-filter: blur` + 半透明白 + 彩色阴影
- Emoji 当图标：`aria-hidden` 缺失且出现在 nav/button 内的 emoji 字符
- 魔法数字：非 4px 倍数的 spacing/min-height
- 模板布局：居中大标题 + 副标题 + 三个按钮；满屏同尺寸圆角卡片
- 假数据：`$123,456`、`Lorem`、`[X]`、`10,000+ teams` 无来源

### 输出
- 终端：按严重度分组的问题列表（文件:行:规则:建议）
- JSON：供其它工具消费
- 可选：`--fix` 只做安全替换（去 emoji 图标、修正间距到 4px 栅格），不做语义改写

## 三、里程碑

| 阶段 | 交付 | 验收 |
| --- | --- | --- |
| M1 | 规则集 + 测试样例（含正例反例） | 20 个样例，全部命中/不误报 |
| M2 | CLI 实现（Node/TypeScript，零重型依赖） | `deai text`、`deai ui` 在真实项目上跑通 |
| M3 | 会话入口 skill + 规则接线 | 新会话调用一次即可拿到报告 |
| M4（可选） | Web 面板 | 本地起服务，可视化对照 |

## 四、硬性约束

- **确定性优先**：检查器不调模型、不出评分、不引用"AI 检测"，只报可复现的问题。
- 规则来源必须标注（humanizer 章节 / unslop 清单），便于回溯。
- 代码放本目录，完成后同步到 `FindSomeSkills/workspace` 并 push（知识库规则第 11 条）。
- 不做"越改越 AI"的改写：默认只提示，改写由人/模型按 humanizer 姿态完成。
- UI 产物优先走 Open Design（规则第 2 条）。

## 五、目录

`C:\Knowledge base\02-Project\deai-tool`
