# 待办：域名与引流

域名还没申请，以下四步等域名到位后一次做完。做完删掉本文件。

## 1. 买域名

在 Cloudflare 或 Namecheap 买，不需要贵后缀。

## 2. 填进站点配置

`dsh-tools/dsh-toolbox/` 里只有一个开关：

```powershell
$env:SITE_URL = "https://你的域名"
npm run build
```

`SITE_URL` 会同时决定 canonical、hreflang、sitemap.xml 里的绝对地址，改这一个就够。

## 3. 部署

静态站，把 `dist/` 扔到 Cloudflare Pages 即可（和 citeverge-learning 一样的做法）。

## 4. 把网址写进这几个地方（引流就靠这里）

| 位置 | 写什么 |
| --- | --- |
| 本仓库根 `README.md` 顶部 | 站点地址，第一行就能看到 |
| `dsh-tools/README.md` | 同上 |
| `dsh-sync-hub/README.md` 顶部 | 站点地址（现在写的是「公开地址待定」） |
| `dsh-toolbox/public/llms.txt` | 已含仓库地址，补站点地址，供 AI 搜索引用 |
| GitHub 仓库 About 的 Website 字段 | 指向站点，这是外链权重最高的一处 |
| 工具站每个页面的页脚 | 已有，不用改 |

## 5. 提交

```powershell
git add -A
git commit -m "docs: add site URL"
git push
```

## 为什么这件事重要

工具站的自然外链现在就靠 GitHub 这一个来源。仓库 About 里的 Website 字段是 nofollow 之外最有价值的一处，比在 README 里写十遍管用。
