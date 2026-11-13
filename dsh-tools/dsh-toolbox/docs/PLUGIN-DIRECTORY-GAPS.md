# 插件目录：缺口与补齐计划（记于 2026-11-14）

## 现在的覆盖

- 目录收录 **60 个**第三方插件（npm 上可按关键词搜到的那批）
- 每个插件一页，中英各一，共 120 个网址
- 每页均含：一句话用途、安装命令、`engines.dsh` 区间、作者、仓库、npm 页、最后发布日、冲突说明、两条 FAQ
- 冲突说明 60/60 逐条写过，依据是各包的 `peerDependencies`、`engines.dsh`、以及「补丁替换整行 config」这条 DSH 语义

## 还没覆盖的三块（按难度排序）

### 1. DSH 官方 Discord 里流通的插件

Discord 里贴出来的包很多只在群里发 tarball 或私有 registry，npm 上搜不到。这一块当前 **0 覆盖**。

补齐办法（需要人工）：

- 进 DSH Discord 的 `#plugins` 频道，把 2026-09 之后的消息导出成文本
- 从消息里抽 `npm i` / `dsh plugin add` 后面的包名
- 逐个到 npm 核实；核不到的记进「待核实」名单，不建页

### 2. 只在 GitHub 发、没发 npm 的插件

有些插件以仓库形式分发（clone 后 `dsh plugin add ./path`）。npm 搜索覆盖不到。

补齐办法：

- GitHub 代码搜索：`"dsh" "cordis" filename:package.json`，按 `dsh.bundle.patch` 字段筛
- 只看最近 90 天有提交的仓库
- 这类包没有 `engines.dsh`，页面上的兼容区间要写「未声明，安装前先看仓库」

### 3. 描述含糊、无法判断用途的包

npm 上有 1400+ 个含 dsh/deepseek/cordis 关键词的包，其中大量是：
- 同一作者的多个子包（如 wallpaper-engine 的 9 个 `-fx`/`-glass` 子包）
- 空壳包、改名包、0.0.1 stub
- 描述只有一句「dsh plugin」且没有 README

这些**故意没建页**。判断标准：拿不到「解决什么问题」这一句，就不建。

## 下一批的候选池

已抓到元数据、暂未收录（等第二批写完后按 30 个一批推进）：

- `anywork-library-plugin` — 文件 + 笔记资料库
- `dsh-tool-antigravity` — Antigravity 能力包
- `dsh-token-usage` — token 用量统计（2026-08-21 更新，偏旧）
- `dsh-session-tags` — 会话彩色标签
- `universal-plugin-hub` 同作者的其他包
- `@huaqiu/*` 的 KiCad 系列（5 个，属专业领域，单独分组）

## 收录标准（不放松）

1. 包必须真实存在，能从 `registry.npmjs.org` 读到版本、`engines.dsh`、repository
2. 有仓库链接，且最近 90 天有发布
3. 能用一句话说清「解决什么问题」，不许拿包名直译
4. 作者、版本、日期一律从元数据取，不手写
5. 核实不到的不建页，宁缺毋滥

## 相关脚本

- `tools/check-conflicts.mjs` — 校验 60 个插件是否都有冲突说明（当前 60/60）
- 抓元数据的方式：`registry.npmjs.org/<包名>`，字段 `engines.dsh`、`peerDependencies`、`repository`、`time`
