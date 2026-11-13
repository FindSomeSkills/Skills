// 五个共享库页的专属内容。事实来源：npm registry（版本、发布时间、依赖关系）与 62 个插件页的 peers 名单。
export const LIBRARY = {
  'dsh-cordis': {
    tailEn: 'the plugin framework every profile package is built on',
    tailZh: '每个 profile 包都建在它上面的插件框架',
    roleEn: 'It owns the context object (ctx), the plugin lifecycle, dependency injection, and the loader that reads the patch stack.',
    roleZh: '上下文对象 ctx、插件生命周期、依赖注入、读取补丁栈的加载器，都归它。',
    providesEn: 'Everything else calls into it: a bundle inserts rows, a seam provides a capability, and each of those is a cordis plugin with a ctx.',
    providesZh: '其余一切都调它：bundle 插行、seam 提供能力，这两样都是挂在 ctx 上的 cordis 插件。',
    profileDeps: 16,
    confirmsEn: 'The dependency line is in `$DSH_HOME/profiles/<name>/package.json`; the composed tree from `dsh --profile web --dump-config` is what cordis produced after reading the patch stack.',
    confirmsZh: '依赖行在 `$DSH_HOME/profiles/<名字>/package.json`；`dsh --profile web --dump-config` 打印的合成树，就是 cordis 读完补丁栈之后的产物。',
    versionEn: 'npm publishes 4.1.0 (2026-11-04), replacing 4.0.6-alpha.2 the day before. It declares no `engines.dsh`, because it is not a dsh plugin — its compatibility contract is the `@deepseek-ai/cordis` peer range the packages write (`>=4.0.1 <5.0.0` in most manifests).',
    versionZh: 'npm 上最新是 4.1.0（2026-11-04），前一天是 4.0.6-alpha.2。它没有 `engines.dsh`，因为它不是 dsh 插件——兼容契约写在各个包的 `@deepseek-ai/cordis` peer 区间里（多数清单写 `>=4.0.1 <5.0.0`）。',
    faq: [
      {
        en: { q: 'Why do all 16 profile packages depend on it?', a: 'Because it supplies the ctx each one registers into. `dsh-base` inserts the first rows through it, `dsh-web-app` mounts a surface through it, and a seam like `dsh-fs` replaces one capability through it. Nothing in a profile runs outside that context.' },
        zh: { q: '为什么 16 个 profile 包都依赖它？', a: '因为它们注册进去的那个 ctx 由它提供。`dsh-base` 通过它插第一批行，`dsh-web-app` 通过它挂界面，`dsh-fs` 这类 seam 通过它替换一项能力。profile 里没有东西跑在那个上下文之外。' },
      },
      {
        en: { q: 'What happens if two cordis versions end up in one profile?', a: 'The peers are declared, so pnpm resolves one copy per profile. Two copies means two contexts: a plugin registered in one is invisible to the other, and the symptom is a panel that installs cleanly and never appears.' },
        zh: { q: '一个 profile 里出现两份 cordis 会怎样？', a: 'peer 是声明式依赖，pnpm 在一个 profile 里只解析一份。出现两份就是两个上下文：注册在其中一个里的插件，另一个看不到，症状是装得很干净但界面永远不出现。' },
      },
    ],
  },
  'dsh-schemastery': {
    tailEn: 'schema validation for plugin configuration',
    tailZh: '插件配置的 schema 校验',
    roleEn: 'A plugin declares its options once; the settings UI renders the form from that declaration, and a value outside it is rejected before the plugin starts.',
    roleZh: '插件只声明一次选项，设置界面据此渲染表单，不合声明的值在插件启动之前就被拒绝。',
    providesEn: 'Seven of the 16 profile packages depend on it directly, which is what makes the settings pages of different plugins look and behave the same.',
    providesZh: '16 个 profile 包里有 7 个直接依赖它，这也是不同插件的设置页看起来、用起来一致的原因。',
    profileDeps: 7,
    confirmsEn: 'The dependency line is in `$DSH_HOME/profiles/<name>/package.json`. In `--dump-config`, a plugin\'s settings appear as the options object that this schema validated.',
    confirmsZh: '依赖行在 `$DSH_HOME/profiles/<名字>/package.json`。`--dump-config` 里，插件的设置就是被这个 schema 校验过的那个选项对象。',
    versionEn: 'npm publishes 3.19.0 (2026-11-04), up from 3.18.6-alpha.2 the day before. No `engines.dsh`: it is a validator, not a plugin. Its own dependencies are `@deepseek-ai/cosmokit` and `@standard-schema/spec`.',
    versionZh: 'npm 上最新是 3.19.0（2026-11-04），前一天是 3.18.6-alpha.2。没有 `engines.dsh`：它是校验器，不是插件。它自己的依赖是 `@deepseek-ai/cosmokit` 与 `@standard-schema/spec`。',
    faq: [
      {
        en: { q: 'Do I configure it directly?', a: 'No. You configure the plugin, and the plugin declares its options as a schema; this package is what rejects a bad value. Editing its own config would mean editing a validator, which changes nothing about what the plugin accepts.' },
        zh: { q: '需要直接配置它吗？', a: '不需要。你配的是插件，插件把选项声明成 schema，坏值由这个包拒绝。去改它自己的配置等于改一个校验器，对插件接受什么没有任何影响。' },
      },
      {
        en: { q: 'What does a schema rejection look like?', a: 'The plugin does not start with the value it was given: the boot prints the requirement from the schema, and the profile continues without that row. It is the same class of failure as an `engines.dsh` mismatch, reported at a different layer.' },
        zh: { q: 'schema 拒绝一个值是什么表现？', a: '插件不会带着那个值启动：启动时会打印 schema 要求的内容，profile 少掉那一行继续跑。它和 `engines.dsh` 不匹配是同一类失败，只是报在不同的层。' },
      },
    ],
  },
  'dsh-home-paths': {
    tailEn: 'path resolution shared by profiles and plugins',
    tailZh: 'profile 与插件共用的路径解析',
    roleEn: 'A plugin that writes a file and the CLI that later looks for it resolve the DSH home directory the same way, so they agree on where it went.',
    roleZh: '插件写文件的位置和之后命令行去找的位置用同一套解析，所以它们指向同一个地方。',
    providesEn: 'Any plugin that stores something under `$DSH_HOME` should resolve it through this package instead of hard-coding a path; that is what makes the same profile work on Windows and macOS.',
    providesZh: '凡是要在 `$DSH_HOME` 下存东西的插件，都应该通过它解析，而不是写死路径——同一个 profile 在 Windows 和 macOS 上都能用，靠的就是这一点。',
    profileDeps: 0,
    confirmsEn: 'None of the 16 profile packages lists it as a dependency; it arrives with the plugins that declare it as a peer. Check your own `$DSH_HOME/profiles/<name>/package.json` — if a plugin that needs it is installed and it is absent, that plugin is the one to look at.',
    confirmsZh: '16 个 profile 包里没有哪个把它写成依赖；它随声明它为 peer 的插件进来。查你自己的 `$DSH_HOME/profiles/<名字>/package.json`——如果装了需要它的插件却没有它，先看那个插件。',
    versionEn: 'npm publishes 0.2.2-rc.3 (2026-11-13); the previous publish was 0.2.2-rc.2 on 2026-11-12. Note the `latest` tag still points at 0.0.1-rc.3, so `npm view` without a version is misleading here.',
    versionZh: 'npm 上最新是 0.2.2-rc.3（2026-11-13），前一版 0.2.2-rc.2（2026-11-12）。注意 `latest` 标签仍停在 0.0.1-rc.3，直接 `npm view` 不指定版本会看到错的。',
    faq: [
      {
        en: { q: 'Why not just hard-code ~/.dsh in a plugin?', a: 'Because the home directory is relocatable: `$DSH_HOME` can point somewhere else, and on Windows the separator differs. A hard-coded path works on the machine it was written on and fails on the next one.' },
        zh: { q: '插件为什么不能直接写死 ~/.dsh？', a: '因为这个目录是可改的：`$DSH_HOME` 可以指向别处，Windows 上分隔符也不一样。写死路径在那台机器上能用，换一台就断。' },
      },
      {
        en: { q: 'Which community plugins pull it in?', a: 'The five listed above, and they are the ones that persist something of their own — a cost ledger, a remote session token, a team pipeline state. A plugin with no storage peer will not ask for it.' },
        zh: { q: '哪些社区插件会把它带进来？', a: '就是上面列的那五个，它们都有自己的东西要落盘——花费台账、远程会话令牌、团队流水线状态。没有存储需求的插件不会要它。' },
      },
    ],
  },
  'dsh-credentials': {
    tailEn: 'the credential seam plugins read provider keys through',
    tailZh: '插件读取服务商密钥的凭据 seam',
    roleEn: 'A plugin asks for a provider key instead of keeping its own copy in its settings, so one login can serve several plugins.',
    roleZh: '插件通过它要服务商密钥，而不是把 key 自己存一份在设置里，于是一个登录能服务多个插件。',
    providesEn: 'That is what lets one login serve several plugins, and what makes revoking a key a single action instead of a hunt through every plugin that copied it.',
    providesZh: '一个登录能服务多个插件靠它，吊销一把 key 是一个动作而不是去每个抄过它的插件里翻，也靠它。',
    profileDeps: 0,
    confirmsEn: 'No profile package lists it directly; plugins that need a key declare it as a peer. To see whether a given plugin is wired to the seam, check its `peerDependencies` in the installed `package.json` — a plugin reading keys another way will not list it.',
    confirmsZh: '没有 profile 包直接列它；需要密钥的插件把它声明成 peer。想知道某个插件有没有接上这个 seam，看已安装的 `package.json` 里它的 `peerDependencies`——用别的办法读 key 的插件不会列它。',
    versionEn: 'npm publishes 0.2.2-rc.3 (2026-11-13), one day after 0.2.2-rc.2. The `latest` tag is stale at 0.0.1-rc.1, same problem as the other two dsh support packages.',
    versionZh: 'npm 上最新是 0.2.2-rc.3（2026-11-13），前一天是 0.2.2-rc.2。`latest` 标签同样停在 0.0.1-rc.1，和另外两个 dsh 支撑包一个毛病。',
    faq: [
      {
        en: { q: 'Where does the key actually live?', a: 'Not here. This package is the interface, not the store; the implementation behind the seam decides where the value sits. What the seam guarantees is that a plugin asks instead of holding a copy.' },
        zh: { q: 'key 到底存在哪？', a: '不在这里。这个包是接口不是存储，值放在哪由 seam 背后的实现决定。seam 保证的是：插件来问，而不是自己留一份。' },
      },
      {
        en: { q: 'Can a plugin read the raw key text?', a: 'A plugin that gets the credential value can. The seam does not sandbox a plugin from its own process — it removes the need for each plugin to persist a second copy, which is the part that leaks in practice.' },
        zh: { q: '插件能读到 key 原文吗？', a: '拿到凭据值的插件能。seam 不做进程内沙箱——它去掉的是每个插件各存一份的必要，而重复存储正是实际会漏的那一环。' },
      },
    ],
  },
  'dsh-client-ui-primitives': {
    tailEn: 'React atoms shared by every web-UI plugin',
    tailZh: '所有网页界面插件共用的 React 原子组件',
    roleEn: 'Controls, icons, markdown rendering, and the KaTeX and Shiki pieces come from one place, so a panel written by a third party looks like it belongs to the app.',
    roleZh: '控件、图标、Markdown 渲染，以及 KaTeX 与 Shiki 那部分都来自同一处，所以第三方写的面板看起来像应用自带的。',
    providesEn: 'Its own dependencies list React, clsx, anser, katex, shiki and a set of markdown/micromark packages — that is the actual surface a web-UI plugin builds on.',
    providesZh: '它自己的依赖里有 React、clsx、anser、katex、shiki，以及一组 markdown/micromark 包——这就是网页界面插件真正建在上面的那层。',
    profileDeps: 0,
    confirmsEn: 'No profile package depends on it directly; it comes in with web-UI plugins that declare it as a peer. A CLI-only profile can have none of it, which is why it is not part of the 16.',
    confirmsZh: '没有 profile 包直接依赖它；它随声明它为 peer 的网页界面插件进来。只用命令行的 profile 可以完全没有它，这也是它不在那 16 个里的原因。',
    versionEn: 'npm publishes 0.2.2-rc.3 (2026-11-13), after 0.2.2-rc.2 on 2026-11-12. `latest` is stale at 0.0.1-rc.1. No `engines.dsh`: it is a component library, and the dsh range is enforced by the plugins that use it.',
    versionZh: 'npm 上最新是 0.2.2-rc.3（2026-11-13），前一版 0.2.2-rc.2（2026-11-12）。`latest` 停在 0.0.1-rc.1。没有 `engines.dsh`：它是组件库，dsh 区间由用它的插件去约束。',
    faq: [
      {
        en: { q: 'Do I need to know React to use a plugin that builds on it?', a: 'No. It matters when you write or patch a plugin: the components are already there, and re-implementing a control instead of importing it is how a third-party panel starts looking foreign.' },
        zh: { q: '用基于它的插件需要懂 React 吗？', a: '不需要。它在你写或改插件时才有意义：组件已经在那儿了，而自己重写一个控件、不去 import 现成的，正是第三方面板看起来格格不入的原因。' },
      },
      {
        en: { q: 'Why do two unrelated plugins look consistent?', a: 'Because they render the same atoms. Buttons, focus rings, code blocks and math come from this package, so a theme change reaches both without either plugin knowing about the other.' },
        zh: { q: '两个不相关的插件为什么看起来一致？', a: '因为它们渲染的是同一批原子组件。按钮、焦点环、代码块、公式都来自这个包，所以换主题时两边一起变，谁都不用知道对方存在。' },
      },
    ],
  },
};
