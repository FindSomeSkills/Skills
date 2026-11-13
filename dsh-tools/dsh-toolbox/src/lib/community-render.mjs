// 插件页渲染后处理：冲突说明、FAQ、增量正文、页尾链接块、Title 后缀。
import { faqFor, sectionsFor } from './community-extras.mjs';

const CONFLICT_HEAD = { en: 'If two plugins fight', zh: '两个插件打架时' };

// 有详情页的官方包：16 个 profile 包 + 5 个被反复引用的支撑包
const OFFICIAL_HREF = {
  cordis: '/plugins/dsh-cordis/',
  schemastery: '/plugins/dsh-schemastery/',
};
const OFFICIAL_SLUGS = new Set([
  'dsh-base', 'dsh-web-app', 'dsh-headless', 'dsh-session', 'dsh-compaction', 'dsh-tools',
  'dsh-skill', 'dsh-fs', 'dsh-shell', 'dsh-sandbox', 'dsh-sandbox-local', 'dsh-acp',
  'dsh-jobs', 'dsh-web', 'dsh-workspace', 'dsh-otel',
  'dsh-home-paths', 'dsh-credentials', 'dsh-client-ui-primitives', 'dsh-schemastery', 'dsh-cordis',
]);

function peerHref(pkg) {
  const short = pkg.replace('@deepseek-ai/', '');
  if (OFFICIAL_HREF[short]) return OFFICIAL_HREF[short];
  return OFFICIAL_SLUGS.has(short) ? '/plugins/' + short + '/' : '';
}

// Title 后缀：用这个包自己的用途短语，不再共用分类名
const TAIL_STOP = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'with', 'for', 'that', 'it', 'in', 'on', 'is', 'are', 'by',
  'from', 'as', 'they', 'them', 'their', 'this', 'these', 'those', 'be', 'can', 'will', 'which',
  'when', 'while', 'at', 'into', 'over', 'under', 'than', 'then', 'so', 'but', 'or', 'not',
]);

function titleTail(page) {
  const src = page.solvesEn ?? page.en?.cite ?? '';
  let cut = src.split(/[.;:]/)[0].trim();
  if (cut.length > 62) cut = cut.slice(0, 62);
  const words = cut.split(/\s+/);
  while (words.length > 3 && TAIL_STOP.has(words[words.length - 1].toLowerCase().replace(/[^a-z]/g, ''))) {
    words.pop();
  }
  cut = words.join(' ');
  return cut.charAt(0).toLowerCase() + cut.slice(1);
}

function footerFor(page, pair) {
  return {
    allHref: '/plugins/',
    allZhHref: '/zh/plugins/',
    allLabel: 'All 83 plugin pages',
    allZhLabel: '全部 83 个插件页',
    conflict: pair
      ? {
          href: '/plugins/conflicts/',
          zhHref: '/zh/plugins/conflicts/',
          label: `Conflicts with ${pair.other} — the pair is on the conflicts page`,
          zhLabel: `和 ${pair.other} 冲突——这一对写在冲突页`,
        }
      : null,
    peers: (page.peerNames ?? []).map((p) => ({ pkg: p, href: peerHref(p) })),
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

  const leadPkg = {
    en: { lead: `Version ${page.version} of \`${page.pkg}\`, last published ${page.updated}; the install command and the range come from its own manifest.` },
    zh: { lead: `\`${page.pkg}\` 当前版本 ${page.version}，最后发布 ${page.updated}；安装命令与区间取自它自己的清单。` },
  };
  const compatPkg = page.compat
    ? {
        en: `\`engines.dsh\` in ${page.pkg} declares \`${page.compat}\`; run \`dsh --version\` and compare it, because outside that range the CLI skips the plugin at boot and prints the requirement instead of booting.`,
        zh: `\`${page.pkg}\` 的 \`engines.dsh\` 声明的是 \`${page.compat}\`；先跑 \`dsh --version\` 对一下——超出这个区间，启动时会跳过它并打印要求，不会带着跑。`,
      }
    : null;

  for (const lang of ['en', 'zh']) {
    const sections = (out[lang].sections ?? []).map((s) => {
      if (note && s.h === CONFLICT_HEAD[lang]) return { ...s, p: [note[lang]] };
      const isInstall = s.h === 'Install' || s.h === '安装';
      const isCompat = s.h === 'Compatibility' || s.h === '兼容区间';
      if (isInstall) return { ...s, p: [pkgUnique[lang].install] };
      if (isCompat && compatPkg) return { ...s, p: [compatPkg[lang]] };
      if (isCompat && !page.compat) return { ...s, p: [pkgUnique[lang].noRange] };
      return s;
    });
    const added = extras.map((x) => ({ h: lang === 'en' ? x.h : x.zhH, p: lang === 'en' ? x.p : x.zhP }));
    out[lang] = {
      ...out[lang],
      lead: [leadPkg[lang].lead],
      sections: [...sections, ...added],
      faq: faq.map((x) => x[lang]),
      footer: footerFor(page, pair),
    };
  }

  out.en.title = `${page.pkg} — ${titleTail(page)}`;
  return out;
}
