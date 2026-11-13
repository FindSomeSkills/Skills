# 明天的执行清单：SEO + GEO + 搜索引擎接入

状态：待执行（2026-11-13 夜整理，用户睡前指定）

---

## 0. 先收尾：根域打不开

`https://dshtoolbox.com` 仍是 TLS 000，`www` 已正常。

**方案 A（推荐，5 分钟）**：Namecheap Advanced DNS
- 删掉根域的 `ALIAS @`
- 加 `URL Redirect Record @ → https://www.dshtoolbox.com`，类型 Permanent (301)
- 回 Cloudflare Pages → 自定义域 → 删掉 `dshtoolbox.com`（只留 www）

**方案 B（更干净，30 分钟）**：把 DNS 迁到 Cloudflare
- Cloudflare 后台 Add a site → 拿两个 nameserver
- Namecheap → Nameservers → Custom DNS 填进去
- 之后根域 CNAME flattening 自动生效，我可以全自动配记录

验证：`curl -I https://dshtoolbox.com` 返回 301 且 Location 指向 www；`https://www` 200。

---

## 1. Google Search Console

**我做**：
- 在 `<head>` 加 `google-site-verification` meta（需要他给的验证串）
- 或部署一个 `googleXXXX.html` 验证文件到 `public/`，重新 deploy

**需要用户**：
- 用 Google 账号打开 https://search.google.com/search-console
- 选「网域」或「网址前缀」→ 选 `https://www.dshtoolbox.com`
- 复制验证串发我（HTML 标记方式最快）

**验证后我做**：
- 提交 `https://www.dshtoolbox.com/sitemap.xml`
- 请求编入索引（中英首页各一次）
- 检查「网页」报告里的抓取错误

---

## 2. Bing Webmaster Tools

**需要用户**：https://www.bing.com/webmasters
- 可从 GSC 直接导入（最快，一次授权两站同步）
- 否则同样给我验证串

**验证后我做**：提交 sitemap；开启 IndexNow（每次 deploy 后 ping 一次，脚本可加进 `deploy-pages.mjs`）。

---

## 3. SEO 优化（我能全部做完）

| 项 | 现状 | 要做 |
| --- | --- | --- |
| `<title>` | 每页有 | 检查长度 50–60 字符，核心词前置 |
| `description` | 每页有 | 检查 120–155 字符，带动作词 |
| canonical | 已指向 www | 校验 18 页全覆盖、无自相矛盾 |
| hreflang | en / zh-Hans / x-default | 校验双向互指正确 |
| 结构化数据 | WebSite + Organization | 加 `SoftwareApplication`（每个工具）、`FAQPage`（常见问题）、`BreadcrumbList` |
| OG / Twitter 卡 | 有 og:title/desc | 补 `og:image`（1200×630，做一张通用的）+ `twitter:card` |
| robots.txt | 有 | 补 `Sitemap:` 绝对地址；确认无 `Disallow` 误伤 |
| sitemap | 18 条，绝对地址 | 加 `lastmod`；确认 `priority`/`changefreq`（Google 已忽略，可省） |
| 内链 | 卡片 + 相关推荐 | 每页至少 3 条站内链接，锚文本带关键词 |
| 图片 | 无图 | 加 favicon 各尺寸、og 图；`alt` 全部填写 |
| 性能 | 静态、单文件 CSS | Lighthouse 跑一遍，目标 Performance ≥ 95、CLS = 0 |
| 404 | 有页面吗 | 确认存在自定义 404，且返回真正 404 状态码 |

---

## 4. GEO 优化（面向 AI 搜索/生成式引擎）

目标是让 ChatGPT、Perplexity、Google AI Overviews、Bing Copilot 引用这个站，而不是只做传统排名。

| 项 | 做法 |
| --- | --- |
| 实体清晰 | 每页首段用一句话说明「是什么 + 给谁 + 解决什么」，句子可被直接摘录 |
| 问答块 | 每个工具页加 3–5 个真实问题（H3 问句 + 2–3 句答案），加 `FAQPage` 结构 |
| 事实密度 | 具体数字（18 页、8 条规则、23 个检查码、130 个技能）写进正文，AI 更爱引用可验证数字 |
| 可引用句子 | 每节开头一句结论式陈述，独立成句，不依赖上下文 |
| `llms.txt` | 已有，补每个工具的简介与入口链接 |
| 更新日期 | 页面显示「最后更新」并进 JSON-LD `dateModified` |
| 外部一致性 | GitHub README、About、社交简介用同一句 description，便于实体归并 |
| 反 AI 味 | 内容已经过 deai 预检；GEO 不等于堆关键词，答案要短、要具体 |

---

## 5. 我明天会跑的验证

1. `verify-all`（三项目）
2. 线上六组渲染验收（中英 × 浅/深/无 JS）
3. 结构化数据校验：Rich Results Test 的替代 —— 本地 JSON-LD 解析 + 必填字段检查
4. `curl` 全站状态码：18 页全部 200，随机 URL 返回 404
5. robots.txt / sitemap.xml / llms.txt 内容检查
6. Lighthouse（headless Chrome）三项分数

---

## 6. 需要用户提供的东西（明天只需要两样）

1. GSC 验证串（或授权我部署 HTML 文件后他自己点验证）
2. Bing 验证串（或从 GSC 导入）

其余我全包。
