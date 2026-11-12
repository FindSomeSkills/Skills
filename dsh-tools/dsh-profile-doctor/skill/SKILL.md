---
name: dsh-doctor
description: 装完插件或技能之后、以及每次开工之前，检查 DSH 的 profile 与 skills 里有没有断链、坏 frontmatter、解析不到的 bundle、失效的 patch 目标。凡是"装完 DSH 起不来"、界面空白、插件没生效，先用它。
---

# dsh-doctor

## 什么时候跑

- **新会话第一件事**，挡在写代码、写文案、改配置之前。它崩了，后面所有工具都用不上。
- 刚装或删过 skill、插件
- 改过 `cordis.patch.yml`、profile 的 `package.json`
- DSH 启动失败、界面空白、某个插件"装了但没反应"

## 怎么跑

```powershell
node "C:\Knowledge base\02-Project\dsh-profile-doctor\src\cli.ts"
```

参数：

- `--json` 给机器读
- `--profile web` 只看一个 profile
- `--extra-skills <path>` 追加别的 skills 根

## 怎么读报告

- `error`：先修，再开工。断链、坏 frontmatter、解析不到的 bundle 都在这一档。
- `warn`：记下来但不挡路，比如 name 与目录名不一致。
- 退出码：有 error 时返回 1，可以直接挂进 CI 或会话钩子。

## 不要做的

- 别用它证明"DSH 一定起得来"。它只做静态检查，运行时异常（端口占用、插件代码抛错）它看不见。
- 别手删 `~/.dsh/skills` 里的链接。要清就先用 `tools/clean-broken-links.ts` 导出清单，它会留档再删。

## 已修过的真实案例

2026-11-13 在本机查出 14 个断链（全部指向已不存在的 `06-Skills` 目录）。这些链接让加载器拿到空技能，是"装完崩"的直接原因。清单在 `records/broken-skill-links-*.txt`。
