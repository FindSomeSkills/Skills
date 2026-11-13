// 插件页的渲染后处理：冲突说明、FAQ、两段增量正文、页尾链接块。
import { faqFor, sectionsFor } from './community-extras.mjs';

const CONFLICT_HEAD = { en: 'If two plugins fight', zh: '两个插件打架时' };

// 页尾链接块需要的数据：目录页、冲突页、peer 的官方包
function footerFor(page, pair) {
  const peerNames = page.peerNames ?? [];
  return {
    allHref: '/plugins/',
    allZhHref: '/zh/plugins/',
    allLabel: 'All 78 plugins',
    allZhLabel: '全部 78 个插件',
    conflict: pair
      ? {
          href: '/plugins/conflicts/',
          zhHref: '/zh/plugins/conflicts/',
          label: `Conflicts with ${pair.other} — the pair is on the conflicts page`,
          zhLabel: `和 ${pair.other} 冲突——这一对写在冲突页`,
        }
      : null,
    peers: peerNames.map((p) => ({
      pkg: p,
      href: '/plugins/' + p.replace('@deepseek-ai/', '') + '/',
    })),
  };
}

export function renderCommunityPage(page, note, pair, slug) {
  const extras = sectionsFor(page, page.peerNames ?? [], page.group, page.pkg);
  const faq = faqFor(page, pair, page.pkg);
  const out = { en: { ...page.en }, zh: { ...page.zh } };

  const pkgUnique = {
    en: {
      install: `\`dsh plugin add ${page.pkg}\` writes one dependency line into the profile manifest; pnpm then unpacks it under \`$DSH_HOME/profiles/<name>/node_modules\`.`,
      noRange: `${page.pkg} ships no \`engines.dsh\` entry, so nothing checks it against your CLI version at boot. Read the npm page before installing.`,
    },
    zh: {
      install: `\`dsh plugin add ${page.pkg}\` 只往 profile 清单里写一行依赖，随后 pnpm 把它解到 \`$DSH_HOME/profiles/<名字>/node_modules\`。`,
      noRange: `${page.pkg} 没有 \`engines.dsh\` 字段，启动时不会拿它和你的命令行版本做检查，装之前先看 npm 页。`,
    },
  };

  for (const lang of ['en', 'zh']) {
    const sections = (out[lang].sections ?? []).map((s) => {
      if (note && s.h === CONFLICT_HEAD[lang]) return { ...s, p: [note[lang]] };
      const isInstall = s.h === 'Install' || s.h === '安装';
      const isCompat = s.h === 'Compatibility' || s.h === '兼容区间';
      if (isInstall) return { ...s, p: [pkgUnique[lang].install] };
      if (isCompat && !page.compat) return { ...s, p: [pkgUnique[lang].noRange] };
      return s;
    });
    const added = extras.map((x) => ({
      h: lang === 'en' ? x.h : x.zhH,
      p: lang === 'en' ? x.p : x.zhP,
    }));
    out[lang] = {
      ...out[lang],
      sections: [...sections, ...added],
      faq: faq.map((x) => x[lang]),
      footer: footerFor(page, pair),
    };
  }
  return out;
}
