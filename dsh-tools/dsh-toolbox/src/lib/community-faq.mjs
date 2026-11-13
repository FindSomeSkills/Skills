// 插件页 FAQ 第一问：按 peers 数量与 engines.dsh 交替生成，答案必须读正文的 Compatiblity / Conflict 段才能对上。
export function faqFor(page, idx, note) {
  const peers = page.peers ?? 0;
  const range = page.compat ?? '';
  const usePeer = idx % 2 === 0;

  if (usePeer) {
    if (peers > 0) {
      return {
        en: {
          q: 'Does it collide with the official packages it patches?',
          a: 'It peers ' + peers + ' official packages. A patch replaces a whole row config, so the collision shows up as one plugin silently losing its entry — the counterpart is named under "If two plugins fight".',
        },
        zh: {
          q: '它和改的那几个官方包会撞吗？',
          a: 'peer 了 ' + peers + ' 个官方包。补丁替换整行 config，冲突的表现是其中一个插件静默丢掉自己那一行——具体对撞对象写在「两个插件打架时」里。',
        },
      };
    }
    return {
      en: {
        q: 'No dsh range is declared here — what breaks first?',
        a: 'It declares no `engines.dsh` and no dsh peers, so the CLI loads it without a compatibility check. When something does break, it is the surface it mounts rather than an error message; the counterpart is named under "If two plugins fight".',
      },
      zh: {
        q: '没有声明 dsh 区间，先坏的是哪一步？',
        a: '既没有 `engines.dsh` 也没有 dsh peer，命令行不做兼容检查就加载。真出问题时坏的是它挂的那块界面，不是一条报错；对撞对象见「两个插件打架时」。',
      },
    };
  }

  return range
    ? {
        en: {
          q: 'Which dsh versions will actually load it?',
          a: '`engines.dsh` declares `' + range + '`. Outside that window the CLI skips it at boot; `dsh plugin allow-version <package>` is the override if you accept the risk.',
        },
        zh: {
          q: '它到底能在哪些 dsh 版本上加载？',
          a: '`engines.dsh` 声明的是 `' + range + '`。超出这个区间，启动时会被跳过并打印要求，不会带着跑。',
        },
      }
    : {
        en: {
          q: 'Which dsh versions will actually load it?',
          a: 'No `engines.dsh` is declared, so every version loads it. That is the risk: a dsh upgrade can break it and nothing pre-checks.',
        },
        zh: {
          q: '它到底能在哪些 dsh 版本上加载？',
          a: '没有声明 `engines.dsh`，任何版本都会加载。风险就在这：dsh 升级把它弄坏时，没有任何检查会拦。',
        },
      };
}
