// 插件详情页生成器。5 个核心包带增量段落，其余 11 个标 noindex（仍可访问，不进 sitemap）。
import { PLUGINS } from './content-plugins.mjs';
import { PLUGIN_DETAILS } from './content-plugin-details.mjs';

const KIND_LABEL = {
  bundle: { en: 'profile bundle', zh: 'profile bundle' },
  seam: { en: 'capability seam', zh: '能力 seam' },
  backend: { en: 'sandbox backend', zh: '沙箱后端' },
  service: { en: 'service', zh: '服务' },
};

export const EXPANDED = Object.keys(PLUGIN_DETAILS);

export function pluginPage(slug, lang) {
  const p = PLUGINS.find((x) => x.slug === slug);
  if (!p) return null;
  const zh = lang === 'zh';
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
