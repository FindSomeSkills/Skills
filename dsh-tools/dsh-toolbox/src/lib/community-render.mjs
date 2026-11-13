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

// Title 后缀：按词边界截，尾巴不许停在标点、介词、连词、冠词或裸动词上。
const TAIL_STOP = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'with', 'for', 'that', 'it', 'in', 'on', 'is', 'are', 'by',
  'from', 'as', 'they', 'them', 'their', 'this', 'these', 'those', 'be', 'can', 'will', 'which',
  'when', 'while', 'at', 'into', 'over', 'under', 'than', 'then', 'so', 'but', 'or', 'not',
  'without', 'plus', 'your', 'its',
]);
// 裸及物动词：后面没宾语就断了，不能当尾巴
const TAIL_VERB = new Set([
  'archive', 'restore', 'install', 'browse', 'manage', 'track', 'search', 'create', 'remove',
  'edit', 'delete', 'open', 'run', 'see', 'show', 'reuse', 'replaces', 'renders', 'turns',
]);

// 机器截不干净的页面：人工短描述（完整名词短语或祈使句，≤45 字符）
const MANUAL_TAIL = {
  'dsh-archive-manager': 'archive or delete sessions',
  'dsh-plugin-catalog': 'a searchable plugin catalog',
  dshmarket: 'install plugins from the web UI',
  'dsh-permission-remote': 'SSH remote workspaces',
  'dsh-design-panel': 'renders design files in the chat',
  'dsh-llm-proxy': 'a system-wide proxy for model calls',
  'dsh-remote': 'SSH development on top of DSH',
  'dsh-skill-health-panel': 'a sidebar panel for skill health',
  'skill-health-panel': 'a sidebar panel for skill health',
  'dsh-unlag': 'a reload button for the desktop app',
  'universal-plugin-hub': 'one hub for Claude Code and more',
  'dsh-simple-worktree': 'create and remove git worktrees',
  'dsh-im-bridge': 'talk to DSH from chat apps',
  'dsh-im': 'talk to DSH from chat apps',
  'dsh-codegraph-visualizer': 'turns code-graph data into views',
  'aishell-dsh-brand': 'replaces the sidebar branding',
  'dsh-evolution-skill-health': 'a sidebar panel for skill health',
  'dsh-codegraph': 'turns code-graph data into views',
  'dsh-aishell-brand': 'replaces the sidebar branding',
};

function titleTail(page, budget = 58) {
  const key = page.pkg.replace(/^@[^/]+\//, '');
  const manual = MANUAL_TAIL[key] ?? MANUAL_TAIL['dsh-' + key] ?? MANUAL_TAIL[key.replace(/^dsh-/, '')];
  if (manual) return manual;
  const src = page.solvesEn ?? page.en?.cite ?? '';
  let cut = src.split(/[.;:]/)[0].trim().replace(/,$/, '');
  if (cut.length > budget) {
    cut = cut.slice(0, budget);
    cut = cut.slice(0, cut.lastIndexOf(' '));
  }
  const words = cut.split(/\s+/).filter(Boolean);
  const bare = (w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    return TAIL_STOP.has(clean) || TAIL_VERB.has(clean) || /,$/.test(w);
  };
  while (words.length > 2 && bare(words[words.length - 1])) words.pop();
  cut = words.join(' ').replace(/[,;:]$/, '');
  // 首词是全大写缩写（SSH / DSH / API…）时不动大小写
  const first = words[0] ?? '';
  const isAcronym = first.length > 1 && first === first.toUpperCase() && /[A-Z]/.test(first);
  if (!isAcronym) cut = cut.charAt(0).toLowerCase() + cut.slice(1);
  return cut;
}

// 分组 → 工具页（不逐包判断，按目录页已有的分组映射）
const TOOL_BY_GROUP = {
  sessions: {
    href: '/tools/session-purge/',
    zhHref: '/zh/tools/session-purge/',
    label: 'Session Purge — see which session files are large, then back up and delete',
    zhLabel: 'Session Purge — 先看清哪些会话文件大，再备份和删',
  },
  remote: {
    href: '/sync-hub/',
    zhHref: '/zh/sync-hub/',
    label: 'DSH Sync Hub — move sessions to another machine instead of deleting them',
    zhLabel: 'DSH Sync Hub — 不想删就搬到另一台机器',
  },
  skills: {
    href: '/tools/skill-load-audit/',
    zhHref: '/zh/tools/skill-load-audit/',
    label: 'Skill Load Audit — which skill is eating your context',
    zhLabel: '技能开销审计 — 看哪个技能在吃上下文',
  },
  memory: {
    href: '/tools/skill-load-audit/',
    zhHref: '/zh/tools/skill-load-audit/',
    label: 'Skill Load Audit — what each recalled block and skill costs per turn',
    zhLabel: '技能开销审计 — 看每轮回召内容与技能各占多少',
  },
  appearance: {
    href: '/tools/deai-kit/',
    zhHref: '/zh/tools/deai-kit/',
    label: 'De-AI Kit — check the UI text and styles for template traces',
    zhLabel: 'De-AI Kit — 查界面文案与样式里的模板痕迹',
  },
  'find-plugins': {
    href: '/plugins/conflicts/',
    zhHref: '/zh/plugins/conflicts/',
    label: 'Which plugins cannot share a profile — check before adding a second one',
    zhLabel: '哪些插件不能一起装 — 装第二个之前先对一下',
  },
};

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
    tool: TOOL_BY_GROUP[page.group] ?? null,
    peersUnlinked: (page.peerNames ?? []).filter((p) => !peerHref(p)),
    peers: (page.peerNames ?? []).filter((p) => peerHref(p)).map((p) => {
      const href = peerHref(p);
      return { pkg: p, href, zhHref: href ? '/zh' + href : '' };
    }),
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

  out.en.title = `${page.pkg} — ${titleTail(page, Math.max(24, 58 - page.pkg.length))}`;
  return out;
}
