// 插件详情页生成器。bundle/seam 走插件模板；shared library 走库模板（不教人单独安装或卸载）。
import { PLUGINS } from './content-plugins.mjs';
import { PLUGIN_DETAILS } from './content-plugin-details.mjs';
import { LIBRARY } from './library-pages.mjs';
import { COMMUNITY } from './content-community.mjs';

const KIND_LABEL = {
  bundle: { en: 'profile bundle', zh: 'profile bundle' },
  seam: { en: 'capability seam', zh: '能力 seam' },
  backend: { en: 'sandbox backend', zh: '沙箱后端' },
  library: { en: 'shared library', zh: '公共库' },
  service: { en: 'service', zh: '服务' },
};

export const EXPANDED = Object.keys(PLUGIN_DETAILS);

// 库页：谁在用它（来自 62 个插件页的 peers 名单）
function libraryUsers(pkg) {
  return COMMUNITY.filter((c) => (c.peerNames ?? []).includes(pkg)).map((c) => ({
    pkg: c.pkg,
    href: '/plugins/' + c.owner + '/' + c.slug + '/',
    zhHref: '/zh/plugins/' + c.owner + '/' + c.slug + '/',
  }));
}

function libraryPage(p, lib, lang, zh) {
  const users = libraryUsers(p.pkg);
  const depLine = '"' + p.pkg + '": "' + p.version + '"';

  const sections = [
    {
      h: zh ? '它是什么' : 'What it is',
      p: [zh ? lib.roleZh : lib.roleEn, zh ? lib.providesZh : lib.providesEn],
    },
    {
      h: zh ? '它随 profile 进来，不用单独装' : 'It arrives with a profile, not as an install',
      p: [
        zh
          ? (lib.profileDeps > 0
              ? '16 个 profile 包里有 ' + lib.profileDeps + ' 个直接依赖它，所以装了 profile 就有它。'
              : '16 个 profile 包里没有哪个直接依赖它，它随声明它为 peer 的插件进来。')
          : (lib.profileDeps > 0
              ? lib.profileDeps + ' of the 16 profile packages depend on it directly, so a profile that boots already has it.'
              : 'None of the 16 profile packages depends on it directly; it comes in with the plugins that declare it as a peer.'),
        zh ? lib.confirmsZh : lib.confirmsEn,
      ],
      code: depLine + '\n# $DSH_HOME/profiles/<name>/package.json',
    },
    {
      h: zh ? '谁在用它' : 'Who uses it',
      p: [
        zh
          ? '下面 ' + users.length + ' 个社区插件把它声明成 peer，点进各自页面能看到它改的是哪一块。'
          : users.length + ' community plugins declare it as a peer; each page shows what it patches.',
      ],
      links: users,
    },
    {
      h: zh ? '版本与 engines' : 'Version and engines',
      p: [zh ? lib.versionZh : lib.versionEn],
    },
  ];

  return {
    title: p.pkg + ' — ' + (zh ? lib.tailZh : lib.tailEn),
    desc: zh
      ? p.pkg + ' 是 DeepSeek Harness 的公共库：' + lib.tailZh + '。当前版本 ' + p.version + '，随 profile 或插件进来，不需要单独安装。'
      : p.pkg + ' is a DeepSeek Harness shared library: ' + lib.tailEn + '. Currently ' + p.version + '; it arrives with a profile or a plugin, not as a separate install.',
    h1: p.pkg,
    cite: zh
      ? p.pkg + ' 是 DeepSeek Harness 里的一个共享库：' + lib.tailZh + '。'
      : p.pkg + ' is a shared library inside a DeepSeek Harness profile: ' + lib.tailEn + '.',
    lead: [
      zh
        ? '当前版本 ' + p.version + '。它不是插件行，没有可安装的面板，也不该被单独卸掉——卸掉它等于拆掉别的包的地基。'
        : 'Currently ' + p.version + '. It is not a plugin row: it has no panel to install and should not be removed on its own, because other packages are built on it.',
    ],
    sections,
    faq: lib.faq.map((f) => (zh ? f.zh : f.en)),
    related: ['plugins', 'guides/what-is-deepseek-harness', 'reference'],
    noindex: false,
  };
}

export function pluginPage(slug, lang) {
  const p = PLUGINS.find((x) => x.slug === slug);
  if (!p) return null;
  const zh = lang === 'zh';
  if (p.kind === 'library' && LIBRARY[slug]) return libraryPage(p, LIBRARY[slug], lang, zh);

  const kind = KIND_LABEL[p.kind][lang];
  const oneLine = zh ? p.zh : p.en;
  const detail = PLUGIN_DETAILS[slug]?.[lang];
  const expanded = Boolean(detail);

  const installLine = zh
    ? '插件管理会把参数转发给 profile 目录里的 pnpm，这条命令的行为和 `pnpm add` 一致。'
    : 'Plugin management forwards to pnpm inside the profile directory, so this behaves like `pnpm add`.';

  const whatItDoes = zh
    ? oneLine + '当前版本 ' + p.version + '。想知道它是否已经在你的 profile 里，看 `$DSH_HOME/profiles/<名字>/package.json` 的依赖，或用 `--dump-config` 读合成后的树。'
    : oneLine + ' Currently ' + p.version + '. To check whether it is already installed, read the dependencies in `$DSH_HOME/profiles/<name>/package.json`, or read the composed tree with `--dump-config`.';

  const sections = [
    { h: zh ? '安装' : 'Install', p: [installLine], code: 'dsh plugin --profile web add ' + p.pkg },
    { h: zh ? '它在 profile 里做什么' : 'What it does in a profile', p: [whatItDoes] },
  ];

  if (detail) {
    sections.push(
      { h: zh ? '什么时候你需要关注这个包' : 'When you need to look at this package', p: [detail.when] },
      { h: zh ? '移除或换掉它，什么会坏' : 'What breaks if you remove or replace it', p: [detail.breaks] },
      { h: zh ? '容易被混淆的那个包' : 'The package it gets confused with', p: [detail.confused] },
    );
  }

  const lead = zh
    ? '这个包发布在 npm 上，当前版本 ' + p.version + '，安装位置是 `$DSH_HOME/profiles/<名字>` 的依赖列表。'
    : 'Published on npm at ' + p.version + '. It installs into `$DSH_HOME/profiles/<name>` as a dependency of that profile.';

  return {
    title: p.pkg + ' — DeepSeek Harness ' + kind,
    desc: zh
      ? p.pkg + ' 是 DeepSeek Harness 的' + kind + '，当前版本 ' + p.version + '。'
      : p.pkg + ' is a DeepSeek Harness ' + kind + ', currently ' + p.version + '.',
    h1: p.pkg,
    cite: zh ? p.pkg + ' 是 dsh 的一个' + kind + '：' + oneLine : p.pkg + ' is a DeepSeek Harness ' + kind + ': ' + oneLine,
    lead: [lead],
    sections,
    faq: [
      {
        q: zh ? '装错了怎么卸掉？' : 'How do I remove it again?',
        a: zh
          ? '用 `dsh plugin --profile <名字> remove ' + p.pkg + '`，和装的时候对称。'
          : 'Use `dsh plugin --profile <name> remove ' + p.pkg + '`, the mirror of the install command.',
      },
      {
        q: zh ? '版本不匹配会怎样？' : 'What if the version does not match my dsh?',
        a: zh
          ? '插件通过 `engines.dsh` 或 DSH 的 peer 依赖声明兼容区间。不在区间内时命令行会跳过它并打印要求，而不是启动一个可能崩的组合。'
          : 'Plugins declare a compatible range through `engines.dsh` or DSH peer dependencies. Outside that range the CLI skips the plugin and prints the requirement instead of booting a combination that may crash.',
      },
    ],
    related: expanded ? ['plugins', 'guides/cli', 'reference'] : ['plugins', 'guides/what-is-deepseek-harness'],
    noindex: false,
  };
}
