// 第三方插件目录。每条的作者、版本、仓库、兼容区间都来自 npm registry 元数据（docs/plugin-metadata.json）。
export const COMMUNITY_GROUPS = [
  {
    "id": "find-plugins",
    "en": "Find and install plugins",
    "zh": "找插件、装插件"
  },
  {
    "id": "cost",
    "en": "Cost and usage",
    "zh": "花费与用量"
  },
  {
    "id": "sessions",
    "en": "Sessions and archives",
    "zh": "会话与归档"
  },
  {
    "id": "skills",
    "en": "Skills",
    "zh": "技能管理"
  },
  {
    "id": "search",
    "en": "Web search",
    "zh": "联网搜索"
  },
  {
    "id": "appearance",
    "en": "Looks and themes",
    "zh": "界面与外观"
  },
  {
    "id": "agents",
    "en": "Multiple agents",
    "zh": "多 agent 协作"
  },
  {
    "id": "remote",
    "en": "Phone and remote access",
    "zh": "手机与远程访问"
  },
  {
    "id": "output",
    "en": "Rich output",
    "zh": "富输出"
  },
  {
    "id": "system",
    "en": "System and terminal",
    "zh": "系统与终端"
  }
];

export const COMMUNITY = [
  {
    "slug": "dsh-plugin-market",
    "owner": "dsh-market",
    "pkg": "dshmarket",
    "group": "find-plugins",
    "version": "1.73.19",
    "updated": "2026-11-12",
    "repo": "https://github.com/dsh-market/dsh-market",
    "npm": "https://www.npmjs.com/package/dshmarket",
    "compat": "",
    "install": "dsh plugin --profile web add dshmarket",
    "en": {
      "title": "dshmarket for DeepSeek Harness — Find and install plugins",
      "desc": "Browse and install community plugins without leaving the DSH web UI. Published as dshmarket, version 1.73.19.",
      "h1": "dshmarket",
      "cite": "Browse and install community plugins without leaving the DSH web UI.",
      "lead": [
        "Version 1.73.19, last published 2026-11-12. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dshmarket"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on undici, js-yaml. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: dsh-market. Repository: https://github.com/dsh-market/dsh-market. Package page: https://www.npmjs.com/package/dshmarket."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Browse and install community plugins without leaving the DSH web UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dshmarket`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dshmarket — DeepSeek Harness 找插件、装插件",
      "desc": "在 DSH 网页界面里浏览、搜索并安装社区插件，不用去 npm 手抄包名。 包名 dshmarket，当前版本 1.73.19。",
      "h1": "dshmarket",
      "cite": "在 DSH 网页界面里浏览、搜索并安装社区插件，不用去 npm 手抄包名。",
      "lead": [
        "当前版本 1.73.19，最后发布 2026-11-12。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dshmarket"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 undici, js-yaml。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 dsh-market，仓库 https://github.com/dsh-market/dsh-market，包页 https://www.npmjs.com/package/dshmarket。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在 DSH 网页界面里浏览、搜索并安装社区插件，不用去 npm 手抄包名。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dshmarket`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "community-marketplace",
    "owner": "dshplugin",
    "pkg": "dsh-plugin",
    "group": "find-plugins",
    "version": "2.3.9",
    "updated": "2026-11-11",
    "repo": "https://github.com/dshplugin/dsh-plugin-hub",
    "npm": "https://www.npmjs.com/package/dsh-plugin",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-plugin",
    "en": {
      "title": "dsh-plugin for DeepSeek Harness — Find and install plugins",
      "desc": "A community plugin marketplace packaged as a DSH plugin. Published as dsh-plugin, version 2.3.9.",
      "h1": "dsh-plugin",
      "cite": "A community plugin marketplace packaged as a DSH plugin.",
      "lead": [
        "Version 2.3.9, last published 2026-11-11. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-plugin"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.6."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: dshplugin. Repository: https://github.com/dshplugin/dsh-plugin-hub. Package page: https://www.npmjs.com/package/dsh-plugin."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A community plugin marketplace packaged as a DSH plugin."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-plugin`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-plugin — DeepSeek Harness 找插件、装插件",
      "desc": "把社区插件市场做成了一个 DSH 插件，装上就能在界面里翻。 包名 dsh-plugin，当前版本 2.3.9。",
      "h1": "dsh-plugin",
      "cite": "把社区插件市场做成了一个 DSH 插件，装上就能在界面里翻。",
      "lead": [
        "当前版本 2.3.9，最后发布 2026-11-11。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-plugin"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.6。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 dshplugin，仓库 https://github.com/dshplugin/dsh-plugin-hub，包页 https://www.npmjs.com/package/dsh-plugin。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把社区插件市场做成了一个 DSH 插件，装上就能在界面里翻。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "plugin-catalog",
    "owner": "awesome-dsh-plugin",
    "pkg": "dsh-plugin-catalog",
    "group": "find-plugins",
    "version": "2026.1113.20393",
    "updated": "2026-11-13",
    "repo": "https://github.com/awesome-dsh-plugin/awesome-dsh-plugin",
    "npm": "https://www.npmjs.com/package/dsh-plugin-catalog",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-plugin-catalog",
    "en": {
      "title": "dsh-plugin-catalog for DeepSeek Harness — Find and install plugins",
      "desc": "A searchable catalog of DSH plugins, published as a plugin. Published as dsh-plugin-catalog, version 2026.1113.20393.",
      "h1": "dsh-plugin-catalog",
      "cite": "A searchable catalog of DSH plugins, published as a plugin.",
      "lead": [
        "Version 2026.1113.20393, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-plugin-catalog"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: awesome-dsh-plugin. Repository: https://github.com/awesome-dsh-plugin/awesome-dsh-plugin. Package page: https://www.npmjs.com/package/dsh-plugin-catalog."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A searchable catalog of DSH plugins, published as a plugin."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-plugin-catalog`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-plugin-catalog — DeepSeek Harness 找插件、装插件",
      "desc": "把 DSH 插件目录打包成插件，装完可以按关键词查。 包名 dsh-plugin-catalog，当前版本 2026.1113.20393。",
      "h1": "dsh-plugin-catalog",
      "cite": "把 DSH 插件目录打包成插件，装完可以按关键词查。",
      "lead": [
        "当前版本 2026.1113.20393，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-plugin-catalog"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 awesome-dsh-plugin，仓库 https://github.com/awesome-dsh-plugin/awesome-dsh-plugin，包页 https://www.npmjs.com/package/dsh-plugin-catalog。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把 DSH 插件目录打包成插件，装完可以按关键词查。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin-catalog`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "cost-meter",
    "owner": "Han-1413141",
    "pkg": "dsh-cost-meter",
    "group": "cost",
    "version": "1.9.64",
    "updated": "2026-11-10",
    "repo": "https://github.com/Han-1413141/dsh-cost-meter",
    "npm": "https://www.npmjs.com/package/dsh-cost-meter",
    "compat": ">=0.2.0-rc.1 <0.3.0-0",
    "install": "dsh plugin --profile web add dsh-cost-meter",
    "en": {
      "title": "dsh-cost-meter for DeepSeek Harness — Cost and usage",
      "desc": "Session cost and daily spend, with provider price tables. Published as dsh-cost-meter, version 1.9.64.",
      "h1": "dsh-cost-meter",
      "cite": "Session cost and daily spend, with provider price tables.",
      "lead": [
        "Version 1.9.64, last published 2026-11-10. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-cost-meter"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. node: >=20."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on zod, acorn. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Han-1413141. Repository: https://github.com/Han-1413141/dsh-cost-meter. Package page: https://www.npmjs.com/package/dsh-cost-meter."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Session cost and daily spend, with provider price tables."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-cost-meter`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-cost-meter — DeepSeek Harness 花费与用量",
      "desc": "统计本次会话花费与当日费用，按厂商价格表折算。 包名 dsh-cost-meter，当前版本 1.9.64。",
      "h1": "dsh-cost-meter",
      "cite": "统计本次会话花费与当日费用，按厂商价格表折算。",
      "lead": [
        "当前版本 1.9.64，最后发布 2026-11-10。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-cost-meter"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。node: >=20。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 zod, acorn。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Han-1413141，仓库 https://github.com/Han-1413141/dsh-cost-meter，包页 https://www.npmjs.com/package/dsh-cost-meter。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "统计本次会话花费与当日费用，按厂商价格表折算。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-cost-meter`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "balance-widget",
    "owner": "MeteorNOX",
    "pkg": "dsh-whale-widget",
    "group": "cost",
    "version": "0.4.2",
    "updated": "2026-10-11",
    "repo": "https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget",
    "npm": "https://www.npmjs.com/package/dsh-whale-widget",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-whale-widget",
    "en": {
      "title": "dsh-whale-widget for DeepSeek Harness — Cost and usage",
      "desc": "A small DeepSeek balance widget docked in the DSH web UI. Published as dsh-whale-widget, version 0.4.2.",
      "h1": "dsh-whale-widget",
      "cite": "A small DeepSeek balance widget docked in the DSH web UI.",
      "lead": [
        "Version 0.4.2, last published 2026-10-11. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-whale-widget"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: MeteorNOX. Repository: https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget. Package page: https://www.npmjs.com/package/dsh-whale-widget."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A small DeepSeek balance widget docked in the DSH web UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-whale-widget`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-whale-widget — DeepSeek Harness 花费与用量",
      "desc": "在网页界面右下角挂一个余额小组件，顺带显示今日用量与峰谷价。 包名 dsh-whale-widget，当前版本 0.4.2。",
      "h1": "dsh-whale-widget",
      "cite": "在网页界面右下角挂一个余额小组件，顺带显示今日用量与峰谷价。",
      "lead": [
        "当前版本 0.4.2，最后发布 2026-10-11。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-whale-widget"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 MeteorNOX，仓库 https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget，包页 https://www.npmjs.com/package/dsh-whale-widget。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在网页界面右下角挂一个余额小组件，顺带显示今日用量与峰谷价。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-whale-widget`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "archive-manager",
    "owner": "MichengAI",
    "pkg": "@michengai/dsh-archive-manager",
    "group": "sessions",
    "version": "1.3.5",
    "updated": "2026-11-13",
    "repo": "https://github.com/MichengAI/dsh-archive-manager",
    "npm": "https://www.npmjs.com/package/@michengai/dsh-archive-manager",
    "compat": ">=0.2.0-rc.1 <0.3.0-0",
    "install": "dsh plugin --profile web add @michengai/dsh-archive-manager",
    "en": {
      "title": "@michengai/dsh-archive-manager for DeepSeek Harness — Sessions and archives",
      "desc": "Archive, restore, favorite and permanently delete sessions, plus damaged-log diagnosis. Published as @michengai/dsh-archive-manager, version 1.3.5.",
      "h1": "@michengai/dsh-archive-manager",
      "cite": "Archive, restore, favorite and permanently delete sessions, plus damaged-log diagnosis.",
      "lead": [
        "Version 1.3.5, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @michengai/dsh-archive-manager"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. node: ^22.19.0 || >=24.0.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: MichengAI. Repository: https://github.com/MichengAI/dsh-archive-manager. Package page: https://www.npmjs.com/package/@michengai/dsh-archive-manager."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Archive, restore, favorite and permanently delete sessions, plus damaged-log diagnosis."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @michengai/dsh-archive-manager`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@michengai/dsh-archive-manager — DeepSeek Harness 会话与归档",
      "desc": "归档、恢复、收藏、永久删除会话，并能诊断损坏的会话日志。 包名 @michengai/dsh-archive-manager，当前版本 1.3.5。",
      "h1": "@michengai/dsh-archive-manager",
      "cite": "归档、恢复、收藏、永久删除会话，并能诊断损坏的会话日志。",
      "lead": [
        "当前版本 1.3.5，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @michengai/dsh-archive-manager"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。node: ^22.19.0 || >=24.0.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 MichengAI，仓库 https://github.com/MichengAI/dsh-archive-manager，包页 https://www.npmjs.com/package/@michengai/dsh-archive-manager。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "归档、恢复、收藏、永久删除会话，并能诊断损坏的会话日志。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @michengai/dsh-archive-manager`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "session-superagent",
    "owner": "MYCF711",
    "pkg": "dsh-session-superagent",
    "group": "sessions",
    "version": "0.10.12",
    "updated": "2026-11-09",
    "repo": "https://github.com/MYCF711/dsh-session-superagent",
    "npm": "https://www.npmjs.com/package/dsh-session-superagent",
    "compat": ">=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0",
    "install": "dsh plugin --profile web add dsh-session-superagent",
    "en": {
      "title": "dsh-session-superagent for DeepSeek Harness — Sessions and archives",
      "desc": "A session-level supervisor that watches a GitHub issue and keeps working. Published as dsh-session-superagent, version 0.10.12.",
      "h1": "dsh-session-superagent",
      "cite": "A session-level supervisor that watches a GitHub issue and keeps working.",
      "lead": [
        "Version 0.10.12, last published 2026-11-09. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-session-superagent"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0. node: >=22.19.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on @mycf711/dsh-gate, @deepseek-ai/schemastery. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: MYCF711. Repository: https://github.com/MYCF711/dsh-session-superagent. Package page: https://www.npmjs.com/package/dsh-session-superagent."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A session-level supervisor that watches a GitHub issue and keeps working."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-session-superagent`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-session-superagent — DeepSeek Harness 会话与归档",
      "desc": "会话级的看护 agent：盯着一个 GitHub issue，按状态继续干活。 包名 dsh-session-superagent，当前版本 0.10.12。",
      "h1": "dsh-session-superagent",
      "cite": "会话级的看护 agent：盯着一个 GitHub issue，按状态继续干活。",
      "lead": [
        "当前版本 0.10.12，最后发布 2026-11-09。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-session-superagent"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0。node: >=22.19.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 @mycf711/dsh-gate, @deepseek-ai/schemastery。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 MYCF711，仓库 https://github.com/MYCF711/dsh-session-superagent，包页 https://www.npmjs.com/package/dsh-session-superagent。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "会话级的看护 agent：盯着一个 GitHub issue，按状态继续干活。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-session-superagent`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "skills-manager",
    "owner": "MichengAI",
    "pkg": "@michengai/dsh-skills-manager",
    "group": "skills",
    "version": "1.4.6",
    "updated": "2026-11-13",
    "repo": "https://github.com/MichengAI/dsh-skills-manager",
    "npm": "https://www.npmjs.com/package/@michengai/dsh-skills-manager",
    "compat": ">=0.2.0-rc.1 <0.3.0-0",
    "install": "dsh plugin --profile web add @michengai/dsh-skills-manager",
    "en": {
      "title": "@michengai/dsh-skills-manager for DeepSeek Harness — Skills",
      "desc": "Load and manage local agent skills from one screen inside DSH. Published as @michengai/dsh-skills-manager, version 1.4.6.",
      "h1": "@michengai/dsh-skills-manager",
      "cite": "Load and manage local agent skills from one screen inside DSH.",
      "lead": [
        "Version 1.4.6, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @michengai/dsh-skills-manager"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. node: ^22.19.0 || >=24.0.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on fflate. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: MichengAI. Repository: https://github.com/MichengAI/dsh-skills-manager. Package page: https://www.npmjs.com/package/@michengai/dsh-skills-manager."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Load and manage local agent skills from one screen inside DSH."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @michengai/dsh-skills-manager`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@michengai/dsh-skills-manager — DeepSeek Harness 技能管理",
      "desc": "在 DSH 里统一加载、管理本机 agent 技能，避免手改目录。 包名 @michengai/dsh-skills-manager，当前版本 1.4.6。",
      "h1": "@michengai/dsh-skills-manager",
      "cite": "在 DSH 里统一加载、管理本机 agent 技能，避免手改目录。",
      "lead": [
        "当前版本 1.4.6，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @michengai/dsh-skills-manager"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。node: ^22.19.0 || >=24.0.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 fflate。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 MichengAI，仓库 https://github.com/MichengAI/dsh-skills-manager，包页 https://www.npmjs.com/package/@michengai/dsh-skills-manager。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在 DSH 里统一加载、管理本机 agent 技能，避免手改目录。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @michengai/dsh-skills-manager`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "free-search",
    "owner": "DDDMUC",
    "pkg": "dsh-free-search",
    "group": "search",
    "version": "0.9.48",
    "updated": "2026-11-13",
    "repo": "https://github.com/DDDMUC/dsh-free-search",
    "npm": "https://www.npmjs.com/package/dsh-free-search",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-free-search",
    "en": {
      "title": "dsh-free-search for DeepSeek Harness — Web search",
      "desc": "Web search across many engines with no API key. Published as dsh-free-search, version 0.9.48.",
      "h1": "dsh-free-search",
      "cite": "Web search across many engines with no API key.",
      "lead": [
        "Version 0.9.48, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-free-search"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=20."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: DDDMUC. Repository: https://github.com/DDDMUC/dsh-free-search. Package page: https://www.npmjs.com/package/dsh-free-search."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Web search across many engines with no API key."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-free-search`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-free-search — DeepSeek Harness 联网搜索",
      "desc": "不需要 API key 的联网搜索，聚合多个搜索引擎。 包名 dsh-free-search，当前版本 0.9.48。",
      "h1": "dsh-free-search",
      "cite": "不需要 API key 的联网搜索，聚合多个搜索引擎。",
      "lead": [
        "当前版本 0.9.48，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-free-search"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=20。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 DDDMUC，仓库 https://github.com/DDDMUC/dsh-free-search，包页 https://www.npmjs.com/package/dsh-free-search。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "不需要 API key 的联网搜索，聚合多个搜索引擎。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-free-search`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "modsearch",
    "owner": "liustack",
    "pkg": "@liustack/modsearch",
    "group": "search",
    "version": "5.10.12",
    "updated": "2026-11-07",
    "repo": "https://github.com/liustack/modsearch",
    "npm": "https://www.npmjs.com/package/@liustack/modsearch",
    "compat": "",
    "install": "dsh plugin --profile web add @liustack/modsearch",
    "en": {
      "title": "@liustack/modsearch for DeepSeek Harness — Web search",
      "desc": "A free web-search plugin aimed at coding agents. Published as @liustack/modsearch, version 5.10.12.",
      "h1": "@liustack/modsearch",
      "cite": "A free web-search plugin aimed at coding agents.",
      "lead": [
        "Version 5.10.12, last published 2026-11-07. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @liustack/modsearch"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.13."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on undici, commander. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: liustack. Repository: https://github.com/liustack/modsearch. Package page: https://www.npmjs.com/package/@liustack/modsearch."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A free web-search plugin aimed at coding agents."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @liustack/modsearch`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@liustack/modsearch — DeepSeek Harness 联网搜索",
      "desc": "面向编码 agent 的免费联网搜索插件。 包名 @liustack/modsearch，当前版本 5.10.12。",
      "h1": "@liustack/modsearch",
      "cite": "面向编码 agent 的免费联网搜索插件。",
      "lead": [
        "当前版本 5.10.12，最后发布 2026-11-07。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @liustack/modsearch"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.13。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 undici, commander。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 liustack，仓库 https://github.com/liustack/modsearch，包页 https://www.npmjs.com/package/@liustack/modsearch。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "面向编码 agent 的免费联网搜索插件。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @liustack/modsearch`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "dream-skin",
    "owner": "LLLAAAAA",
    "pkg": "dsh-dream-skin",
    "group": "appearance",
    "version": "11.7.0",
    "updated": "2026-11-06",
    "repo": "https://gitcode.com/LLLAAAAA/dsh-dream-skin",
    "npm": "https://www.npmjs.com/package/dsh-dream-skin",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-dream-skin",
    "en": {
      "title": "dsh-dream-skin for DeepSeek Harness — Looks and themes",
      "desc": "Swappable themes for the DSH web UI. Published as dsh-dream-skin, version 11.7.0.",
      "h1": "dsh-dream-skin",
      "cite": "Swappable themes for the DSH web UI.",
      "lead": [
        "Version 11.7.0, last published 2026-11-06. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-dream-skin"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=18."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: LLLAAAAA. Repository: https://gitcode.com/LLLAAAAA/dsh-dream-skin. Package page: https://www.npmjs.com/package/dsh-dream-skin."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Swappable themes for the DSH web UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-dream-skin`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-dream-skin — DeepSeek Harness 界面与外观",
      "desc": "给网页界面换肤，内置多套主题。 包名 dsh-dream-skin，当前版本 11.7.0。",
      "h1": "dsh-dream-skin",
      "cite": "给网页界面换肤，内置多套主题。",
      "lead": [
        "当前版本 11.7.0，最后发布 2026-11-06。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-dream-skin"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=18。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 LLLAAAAA，仓库 https://gitcode.com/LLLAAAAA/dsh-dream-skin，包页 https://www.npmjs.com/package/dsh-dream-skin。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "给网页界面换肤，内置多套主题。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-dream-skin`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "claude-style",
    "owner": "Nwflower",
    "pkg": "dsh-claude-style",
    "group": "appearance",
    "version": "0.21.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/Nwflower/dsh-claude-style",
    "npm": "https://www.npmjs.com/package/dsh-claude-style",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-claude-style",
    "en": {
      "title": "dsh-claude-style for DeepSeek Harness — Looks and themes",
      "desc": "A Claude Code desktop look for the DSH web UI. Published as dsh-claude-style, version 0.21.0.",
      "h1": "dsh-claude-style",
      "cite": "A Claude Code desktop look for the DSH web UI.",
      "lead": [
        "Version 0.21.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-claude-style"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Nwflower. Repository: https://github.com/Nwflower/dsh-claude-style. Package page: https://www.npmjs.com/package/dsh-claude-style."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A Claude Code desktop look for the DSH web UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-claude-style`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-claude-style — DeepSeek Harness 界面与外观",
      "desc": "把 DSH 网页界面做成 Claude Code 桌面版的观感。 包名 dsh-claude-style，当前版本 0.21.0。",
      "h1": "dsh-claude-style",
      "cite": "把 DSH 网页界面做成 Claude Code 桌面版的观感。",
      "lead": [
        "当前版本 0.21.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-claude-style"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Nwflower，仓库 https://github.com/Nwflower/dsh-claude-style，包页 https://www.npmjs.com/package/dsh-claude-style。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把 DSH 网页界面做成 Claude Code 桌面版的观感。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-claude-style`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "wallpaper-engine",
    "owner": "elysia395",
    "pkg": "dsh-plugin-wallpaper-engine",
    "group": "appearance",
    "version": "1.4.2",
    "updated": "2026-11-05",
    "repo": "https://github.com/elysia395/dsh-wallpaper-engine",
    "npm": "https://www.npmjs.com/package/dsh-plugin-wallpaper-engine",
    "compat": "^0.2.0-rc.1",
    "install": "dsh plugin --profile web add dsh-plugin-wallpaper-engine",
    "en": {
      "title": "dsh-plugin-wallpaper-engine for DeepSeek Harness — Looks and themes",
      "desc": "Wallpaper Engine backgrounds behind the DSH web UI. Published as dsh-plugin-wallpaper-engine, version 1.4.2.",
      "h1": "dsh-plugin-wallpaper-engine",
      "cite": "Wallpaper Engine backgrounds behind the DSH web UI.",
      "lead": [
        "Version 1.4.2, last published 2026-11-05. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-plugin-wallpaper-engine"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `^0.2.0-rc.1`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: ^0.2.0-rc.1. node: >=22.12.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on x11, webwallgl, dsh-plugin-wallpaper-engine-fx, dsh-plugin-wallpaper-engine-fonts, dsh-plugin-wallpaper-engine-glass, dsh-plugin-wallpaper-engine-parallax. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: elysia395. Repository: https://github.com/elysia395/dsh-wallpaper-engine. Package page: https://www.npmjs.com/package/dsh-plugin-wallpaper-engine."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Wallpaper Engine backgrounds behind the DSH web UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-plugin-wallpaper-engine`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-plugin-wallpaper-engine — DeepSeek Harness 界面与外观",
      "desc": "把 Wallpaper Engine 的动态壁纸铺在网页界面背后。 包名 dsh-plugin-wallpaper-engine，当前版本 1.4.2。",
      "h1": "dsh-plugin-wallpaper-engine",
      "cite": "把 Wallpaper Engine 的动态壁纸铺在网页界面背后。",
      "lead": [
        "当前版本 1.4.2，最后发布 2026-11-05。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-plugin-wallpaper-engine"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `^0.2.0-rc.1`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: ^0.2.0-rc.1。node: >=22.12.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 x11, webwallgl, dsh-plugin-wallpaper-engine-fx, dsh-plugin-wallpaper-engine-fonts, dsh-plugin-wallpaper-engine-glass, dsh-plugin-wallpaper-engine-parallax。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 elysia395，仓库 https://github.com/elysia395/dsh-wallpaper-engine，包页 https://www.npmjs.com/package/dsh-plugin-wallpaper-engine。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把 Wallpaper Engine 的动态壁纸铺在网页界面背后。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin-wallpaper-engine`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "pet",
    "owner": "PC2005-cloud",
    "pkg": "dsh-pet",
    "group": "appearance",
    "version": "0.4.8",
    "updated": "2026-11-12",
    "repo": "https://github.com/PC2005-cloud/dsh-pet",
    "npm": "https://www.npmjs.com/package/dsh-pet",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-pet",
    "en": {
      "title": "dsh-pet for DeepSeek Harness — Looks and themes",
      "desc": "A desktop-pet companion that lives in the DSH UI. Published as dsh-pet, version 0.4.8.",
      "h1": "dsh-pet",
      "cite": "A desktop-pet companion that lives in the DSH UI.",
      "lead": [
        "Version 0.4.8, last published 2026-11-12. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-pet"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.12.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on zod, openai, @electron/get, @anthropic-ai/sdk, @andresaya/edge-tts, @electron-internal/extract-zip. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: PC2005-cloud. Repository: https://github.com/PC2005-cloud/dsh-pet. Package page: https://www.npmjs.com/package/dsh-pet."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A desktop-pet companion that lives in the DSH UI."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-pet`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-pet — DeepSeek Harness 界面与外观",
      "desc": "养在界面里的小宠物，会自己玩、自己吃零食。 包名 dsh-pet，当前版本 0.4.8。",
      "h1": "dsh-pet",
      "cite": "养在界面里的小宠物，会自己玩、自己吃零食。",
      "lead": [
        "当前版本 0.4.8，最后发布 2026-11-12。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-pet"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.12.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 zod, openai, @electron/get, @anthropic-ai/sdk, @andresaya/edge-tts, @electron-internal/extract-zip。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 PC2005-cloud，仓库 https://github.com/PC2005-cloud/dsh-pet，包页 https://www.npmjs.com/package/dsh-pet。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "养在界面里的小宠物，会自己玩、自己吃零食。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-pet`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "meme",
    "owner": "yyh-001",
    "pkg": "dsh-meme",
    "group": "appearance",
    "version": "0.1.81",
    "updated": "2026-11-12",
    "repo": "https://github.com/yyh-001/dsh-meme",
    "npm": "https://www.npmjs.com/package/dsh-meme",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-meme",
    "en": {
      "title": "dsh-meme for DeepSeek Harness — Looks and themes",
      "desc": "Send memes from the message box with an image library. Published as dsh-meme, version 0.1.81.",
      "h1": "dsh-meme",
      "cite": "Send memes from the message box with an image library.",
      "lead": [
        "Version 0.1.81, last published 2026-11-12. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-meme"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.13.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: yyh-001. Repository: https://github.com/yyh-001/dsh-meme. Package page: https://www.npmjs.com/package/dsh-meme."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Send memes from the message box with an image library."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-meme`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-meme — DeepSeek Harness 界面与外观",
      "desc": "输入框一键发表情包，带图库与情绪筛选。 包名 dsh-meme，当前版本 0.1.81。",
      "h1": "dsh-meme",
      "cite": "输入框一键发表情包，带图库与情绪筛选。",
      "lead": [
        "当前版本 0.1.81，最后发布 2026-11-12。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-meme"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.13.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 yyh-001，仓库 https://github.com/yyh-001/dsh-meme，包页 https://www.npmjs.com/package/dsh-meme。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "输入框一键发表情包，带图库与情绪筛选。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-meme`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "agent-teams",
    "owner": "NanmiCoder",
    "pkg": "@nanmicoder/dsh-agent-teams",
    "group": "agents",
    "version": "0.1.30",
    "updated": "2026-11-13",
    "repo": "https://github.com/NanmiCoder/dsh-agent-teams",
    "npm": "https://www.npmjs.com/package/@nanmicoder/dsh-agent-teams",
    "compat": ">=0.1.2-alpha.2",
    "install": "dsh plugin --profile web add @nanmicoder/dsh-agent-teams",
    "en": {
      "title": "@nanmicoder/dsh-agent-teams for DeepSeek Harness — Multiple agents",
      "desc": "Multi-agent teams that split one task across roles. Published as @nanmicoder/dsh-agent-teams, version 0.1.30.",
      "h1": "@nanmicoder/dsh-agent-teams",
      "cite": "Multi-agent teams that split one task across roles.",
      "lead": [
        "Version 0.1.30, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @nanmicoder/dsh-agent-teams"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.1.2-alpha.2`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.1.2-alpha.2. node: ^22.19.0 || >=24."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: NanmiCoder. Repository: https://github.com/NanmiCoder/dsh-agent-teams. Package page: https://www.npmjs.com/package/@nanmicoder/dsh-agent-teams."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Multi-agent teams that split one task across roles."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @nanmicoder/dsh-agent-teams`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@nanmicoder/dsh-agent-teams — DeepSeek Harness 多 agent 协作",
      "desc": "把一件事拆给多个 agent 角色分头做，再汇总。 包名 @nanmicoder/dsh-agent-teams，当前版本 0.1.30。",
      "h1": "@nanmicoder/dsh-agent-teams",
      "cite": "把一件事拆给多个 agent 角色分头做，再汇总。",
      "lead": [
        "当前版本 0.1.30，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @nanmicoder/dsh-agent-teams"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.1.2-alpha.2`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.1.2-alpha.2。node: ^22.19.0 || >=24。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 NanmiCoder，仓库 https://github.com/NanmiCoder/dsh-agent-teams，包页 https://www.npmjs.com/package/@nanmicoder/dsh-agent-teams。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把一件事拆给多个 agent 角色分头做，再汇总。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @nanmicoder/dsh-agent-teams`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "agent-compare",
    "owner": "lijiaqi-AI-Product-Manager",
    "pkg": "dsh-agent-compare",
    "group": "agents",
    "version": "2.0.0",
    "updated": "2026-11-10",
    "repo": "https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare",
    "npm": "https://www.npmjs.com/package/dsh-agent-compare",
    "compat": ">=0.2.1-rc.3 <0.3.0-0",
    "install": "dsh plugin --profile web add dsh-agent-compare",
    "en": {
      "title": "dsh-agent-compare for DeepSeek Harness — Multiple agents",
      "desc": "Run the same request through several attempts and compare answers, files and pages. Published as dsh-agent-compare, version 2.0.0.",
      "h1": "dsh-agent-compare",
      "cite": "Run the same request through several attempts and compare answers, files and pages.",
      "lead": [
        "Version 2.0.0, last published 2026-11-10. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-agent-compare"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-rc.3 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-rc.3 <0.3.0-0. node: ^22.22.2 || ^24.15.0 || >=26.0.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: lijiaqi-AI-Product-Manager. Repository: https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare. Package page: https://www.npmjs.com/package/dsh-agent-compare."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Run the same request through several attempts and compare answers, files and pages."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-agent-compare`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-agent-compare — DeepSeek Harness 多 agent 协作",
      "desc": "同一个需求跑 2–4 版，比较回答、文件与网页，再决定采用哪版。 包名 dsh-agent-compare，当前版本 2.0.0。",
      "h1": "dsh-agent-compare",
      "cite": "同一个需求跑 2–4 版，比较回答、文件与网页，再决定采用哪版。",
      "lead": [
        "当前版本 2.0.0，最后发布 2026-11-10。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-agent-compare"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-rc.3 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-rc.3 <0.3.0-0。node: ^22.22.2 || ^24.15.0 || >=26.0.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 lijiaqi-AI-Product-Manager，仓库 https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare，包页 https://www.npmjs.com/package/dsh-agent-compare。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "同一个需求跑 2–4 版，比较回答、文件与网页，再决定采用哪版。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-agent-compare`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "mobile-plugin",
    "owner": "WNLUO",
    "pkg": "dsh-mobile-plugin",
    "group": "remote",
    "version": "0.5.49",
    "updated": "2026-11-13",
    "repo": "https://github.com/WNLUO/dsh-mobile-plugin",
    "npm": "https://www.npmjs.com/package/dsh-mobile-plugin",
    "compat": ">=0.2.0",
    "install": "dsh plugin --profile web add dsh-mobile-plugin",
    "en": {
      "title": "dsh-mobile-plugin for DeepSeek Harness — Phone and remote access",
      "desc": "A mobile API and relay client so a phone can drive DSH. Published as dsh-mobile-plugin, version 0.5.49.",
      "h1": "dsh-mobile-plugin",
      "cite": "A mobile API and relay client so a phone can drive DSH.",
      "lead": [
        "Version 0.5.49, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-mobile-plugin"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on ws, qrcode. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: WNLUO. Repository: https://github.com/WNLUO/dsh-mobile-plugin. Package page: https://www.npmjs.com/package/dsh-mobile-plugin."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A mobile API and relay client so a phone can drive DSH."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-mobile-plugin`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-mobile-plugin — DeepSeek Harness 手机与远程访问",
      "desc": "给手机用的接口与中继客户端，让手机端能连上本机 DSH。 包名 dsh-mobile-plugin，当前版本 0.5.49。",
      "h1": "dsh-mobile-plugin",
      "cite": "给手机用的接口与中继客户端，让手机端能连上本机 DSH。",
      "lead": [
        "当前版本 0.5.49，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-mobile-plugin"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 ws, qrcode。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 WNLUO，仓库 https://github.com/WNLUO/dsh-mobile-plugin，包页 https://www.npmjs.com/package/dsh-mobile-plugin。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "给手机用的接口与中继客户端，让手机端能连上本机 DSH。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-mobile-plugin`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "remote",
    "owner": "flymysql",
    "pkg": "dsh-remote",
    "group": "remote",
    "version": "1.1.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/flymysql/dsh-remote",
    "npm": "https://www.npmjs.com/package/dsh-remote",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-remote",
    "en": {
      "title": "dsh-remote for DeepSeek Harness — Phone and remote access",
      "desc": "Remote SSH development on top of DSH, with an optional IDE launcher. Published as dsh-remote, version 1.1.1.",
      "h1": "dsh-remote",
      "cite": "Remote SSH development on top of DSH, with an optional IDE launcher.",
      "lead": [
        "Version 1.1.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-remote"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on asn1, ssh2, yaml, tweetnacl, iconv-lite, bcrypt-pbkdf. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: flymysql. Repository: https://github.com/flymysql/dsh-remote. Package page: https://www.npmjs.com/package/dsh-remote."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Remote SSH development on top of DSH, with an optional IDE launcher."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-remote`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-remote — DeepSeek Harness 手机与远程访问",
      "desc": "在 DSH 上做远程 SSH 开发，可选拉起 IDE。 包名 dsh-remote，当前版本 1.1.1。",
      "h1": "dsh-remote",
      "cite": "在 DSH 上做远程 SSH 开发，可选拉起 IDE。",
      "lead": [
        "当前版本 1.1.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-remote"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 asn1, ssh2, yaml, tweetnacl, iconv-lite, bcrypt-pbkdf。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 flymysql，仓库 https://github.com/flymysql/dsh-remote，包页 https://www.npmjs.com/package/dsh-remote。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在 DSH 上做远程 SSH 开发，可选拉起 IDE。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-remote`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "harness-remote",
    "owner": "liguobao",
    "pkg": "ds-harness-remote",
    "group": "remote",
    "version": "0.6.4",
    "updated": "2026-11-08",
    "repo": "https://github.com/liguobao/ds-harness-remote",
    "npm": "https://www.npmjs.com/package/ds-harness-remote",
    "compat": "",
    "install": "dsh plugin --profile web add ds-harness-remote",
    "en": {
      "title": "ds-harness-remote for DeepSeek Harness — Phone and remote access",
      "desc": "Peer-to-peer, end-to-end encrypted remote access to DSH. Published as ds-harness-remote, version 0.6.4.",
      "h1": "ds-harness-remote",
      "cite": "Peer-to-peer, end-to-end encrypted remote access to DSH.",
      "lead": [
        "Version 0.6.4, last published 2026-11-08. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add ds-harness-remote"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on ws, zod, qrcode, @xterm/headless, @xterm/addon-serialize, @deepseek-ai/schemastery. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: liguobao. Repository: https://github.com/liguobao/ds-harness-remote. Package page: https://www.npmjs.com/package/ds-harness-remote."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Peer-to-peer, end-to-end encrypted remote access to DSH."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove ds-harness-remote`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "ds-harness-remote — DeepSeek Harness 手机与远程访问",
      "desc": "点对点、端到端加密地远程访问 DSH。 包名 ds-harness-remote，当前版本 0.6.4。",
      "h1": "ds-harness-remote",
      "cite": "点对点、端到端加密地远程访问 DSH。",
      "lead": [
        "当前版本 0.6.4，最后发布 2026-11-08。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add ds-harness-remote"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 ws, zod, qrcode, @xterm/headless, @xterm/addon-serialize, @deepseek-ai/schemastery。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 liguobao，仓库 https://github.com/liguobao/ds-harness-remote，包页 https://www.npmjs.com/package/ds-harness-remote。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "点对点、端到端加密地远程访问 DSH。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove ds-harness-remote`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "im-bridge",
    "owner": "xmanrui",
    "pkg": "@xmanrui/dsh-im",
    "group": "remote",
    "version": "5.10.0",
    "updated": "2026-11-03",
    "repo": "https://github.com/xmanrui/dsh-im",
    "npm": "https://www.npmjs.com/package/@xmanrui/dsh-im",
    "compat": "",
    "install": "dsh plugin --profile web add @xmanrui/dsh-im",
    "en": {
      "title": "@xmanrui/dsh-im for DeepSeek Harness — Phone and remote access",
      "desc": "Talk to DSH from WeChat, Feishu, DingTalk, QQ, Telegram, Slack and others. Published as @xmanrui/dsh-im, version 5.10.0.",
      "h1": "@xmanrui/dsh-im",
      "cite": "Talk to DSH from WeChat, Feishu, DingTalk, QQ, Telegram, Slack and others.",
      "lead": [
        "Version 5.10.0, last published 2026-11-03. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @xmanrui/dsh-im"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.19."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on qrcode, undici, imapflow, mailparser, nodemailer, @matrix-org/olm. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: xmanrui. Repository: https://github.com/xmanrui/dsh-im. Package page: https://www.npmjs.com/package/@xmanrui/dsh-im."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Talk to DSH from WeChat, Feishu, DingTalk, QQ, Telegram, Slack and others."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @xmanrui/dsh-im`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@xmanrui/dsh-im — DeepSeek Harness 手机与远程访问",
      "desc": "把微信、飞书、企微、钉钉、QQ、Telegram、Slack 等接进 DSH。 包名 @xmanrui/dsh-im，当前版本 5.10.0。",
      "h1": "@xmanrui/dsh-im",
      "cite": "把微信、飞书、企微、钉钉、QQ、Telegram、Slack 等接进 DSH。",
      "lead": [
        "当前版本 5.10.0，最后发布 2026-11-03。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @xmanrui/dsh-im"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.19。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 qrcode, undici, imapflow, mailparser, nodemailer, @matrix-org/olm。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 xmanrui，仓库 https://github.com/xmanrui/dsh-im，包页 https://www.npmjs.com/package/@xmanrui/dsh-im。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把微信、飞书、企微、钉钉、QQ、Telegram、Slack 等接进 DSH。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @xmanrui/dsh-im`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "qq-bot",
    "owner": "tencent-connect",
    "pkg": "@tencent-connect/dsh-qqbot",
    "group": "remote",
    "version": "0.5.5",
    "updated": "2026-10-30",
    "repo": "https://github.com/tencent-connect/dsh-qqbot",
    "npm": "https://www.npmjs.com/package/@tencent-connect/dsh-qqbot",
    "compat": "",
    "install": "dsh plugin --profile web add @tencent-connect/dsh-qqbot",
    "en": {
      "title": "@tencent-connect/dsh-qqbot for DeepSeek Harness — Phone and remote access",
      "desc": "Chat with DSH inside QQ private and group chats. Published as @tencent-connect/dsh-qqbot, version 0.5.5.",
      "h1": "@tencent-connect/dsh-qqbot",
      "cite": "Chat with DSH inside QQ private and group chats.",
      "lead": [
        "Version 0.5.5, last published 2026-10-30. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @tencent-connect/dsh-qqbot"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=20.3.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on yaml, qrcode, js-yaml, @tencent-connect/qqbot-nodejs, @tencent-connect/qqbot-connector. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: tencent-connect. Repository: https://github.com/tencent-connect/dsh-qqbot. Package page: https://www.npmjs.com/package/@tencent-connect/dsh-qqbot."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Chat with DSH inside QQ private and group chats."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @tencent-connect/dsh-qqbot`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@tencent-connect/dsh-qqbot — DeepSeek Harness 手机与远程访问",
      "desc": "在 QQ 私聊和群里直接跟 DSH 对话。 包名 @tencent-connect/dsh-qqbot，当前版本 0.5.5。",
      "h1": "@tencent-connect/dsh-qqbot",
      "cite": "在 QQ 私聊和群里直接跟 DSH 对话。",
      "lead": [
        "当前版本 0.5.5，最后发布 2026-10-30。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @tencent-connect/dsh-qqbot"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=20.3.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 yaml, qrcode, js-yaml, @tencent-connect/qqbot-nodejs, @tencent-connect/qqbot-connector。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 tencent-connect，仓库 https://github.com/tencent-connect/dsh-qqbot，包页 https://www.npmjs.com/package/@tencent-connect/dsh-qqbot。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在 QQ 私聊和群里直接跟 DSH 对话。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @tencent-connect/dsh-qqbot`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "genui",
    "owner": "lhuans",
    "pkg": "dsh-genui",
    "group": "output",
    "version": "0.3.3",
    "updated": "2026-11-06",
    "repo": "https://github.com/lhuans/dsh-genui",
    "npm": "https://www.npmjs.com/package/dsh-genui",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-genui",
    "en": {
      "title": "dsh-genui for DeepSeek Harness — Rich output",
      "desc": "Interactive charts, forms and calculators in the conversation. Published as dsh-genui, version 0.3.3.",
      "h1": "dsh-genui",
      "cite": "Interactive charts, forms and calculators in the conversation.",
      "lead": [
        "Version 0.3.3, last published 2026-11-06. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-genui"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=20."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: lhuans. Repository: https://github.com/lhuans/dsh-genui. Package page: https://www.npmjs.com/package/dsh-genui."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Interactive charts, forms and calculators in the conversation."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-genui`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-genui — DeepSeek Harness 富输出",
      "desc": "在对话里生成可交互的图表、表单和计算器。 包名 dsh-genui，当前版本 0.3.3。",
      "h1": "dsh-genui",
      "cite": "在对话里生成可交互的图表、表单和计算器。",
      "lead": [
        "当前版本 0.3.3，最后发布 2026-11-06。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-genui"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=20。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 lhuans，仓库 https://github.com/lhuans/dsh-genui，包页 https://www.npmjs.com/package/dsh-genui。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在对话里生成可交互的图表、表单和计算器。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-genui`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "deep-view",
    "owner": "Fei2411",
    "pkg": "deep-view",
    "group": "output",
    "version": "0.1.2",
    "updated": "2026-11-05",
    "repo": "https://github.com/Fei2411/deep-view",
    "npm": "https://www.npmjs.com/package/deep-view",
    "compat": "",
    "install": "dsh plugin --profile web add deep-view",
    "en": {
      "title": "deep-view for DeepSeek Harness — Rich output",
      "desc": "Rich views — charts, tables, inputs — inside an answer. Published as deep-view, version 0.1.2.",
      "h1": "deep-view",
      "cite": "Rich views — charts, tables, inputs — inside an answer.",
      "lead": [
        "Version 0.1.2, last published 2026-11-05. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add deep-view"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Fei2411. Repository: https://github.com/Fei2411/deep-view. Package page: https://www.npmjs.com/package/deep-view."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Rich views — charts, tables, inputs — inside an answer."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove deep-view`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "deep-view — DeepSeek Harness 富输出",
      "desc": "把回答里的内容渲染成图表、表格、输入框这类可交互视图。 包名 deep-view，当前版本 0.1.2。",
      "h1": "deep-view",
      "cite": "把回答里的内容渲染成图表、表格、输入框这类可交互视图。",
      "lead": [
        "当前版本 0.1.2，最后发布 2026-11-05。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add deep-view"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Fei2411，仓库 https://github.com/Fei2411/deep-view，包页 https://www.npmjs.com/package/deep-view。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把回答里的内容渲染成图表、表格、输入框这类可交互视图。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove deep-view`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "univer-office",
    "owner": "dream-num",
    "pkg": "dsh-univer-office",
    "group": "output",
    "version": "0.4.0",
    "updated": "2026-11-02",
    "repo": "https://github.com/dream-num/dsh-univer-office",
    "npm": "https://www.npmjs.com/package/dsh-univer-office",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-univer-office",
    "en": {
      "title": "dsh-univer-office for DeepSeek Harness — Rich output",
      "desc": "Spreadsheet and document editing inside DSH, backed by Univer. Published as dsh-univer-office, version 0.4.0.",
      "h1": "dsh-univer-office",
      "cite": "Spreadsheet and document editing inside DSH, backed by Univer.",
      "lead": [
        "Version 0.4.0, last published 2026-11-02. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-univer-office"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22.19.0."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on puppeteer-core, @puppeteer/browsers, @univerjs-pro/cli-assets, @univerjs-pro/exchange-node-binding, @univerjs-pro/engine-formula-rust-binding. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: dream-num. Repository: https://github.com/dream-num/dsh-univer-office. Package page: https://www.npmjs.com/package/dsh-univer-office."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Spreadsheet and document editing inside DSH, backed by Univer."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-univer-office`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-univer-office — DeepSeek Harness 富输出",
      "desc": "在 DSH 里直接编辑表格与文档，底层是 Univer。 包名 dsh-univer-office，当前版本 0.4.0。",
      "h1": "dsh-univer-office",
      "cite": "在 DSH 里直接编辑表格与文档，底层是 Univer。",
      "lead": [
        "当前版本 0.4.0，最后发布 2026-11-02。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-univer-office"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22.19.0。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 puppeteer-core, @puppeteer/browsers, @univerjs-pro/cli-assets, @univerjs-pro/exchange-node-binding, @univerjs-pro/engine-formula-rust-binding。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 dream-num，仓库 https://github.com/dream-num/dsh-univer-office，包页 https://www.npmjs.com/package/dsh-univer-office。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "在 DSH 里直接编辑表格与文档，底层是 Univer。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-univer-office`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "ops",
    "owner": "T-Auto",
    "pkg": "dsh-ops",
    "group": "system",
    "version": "0.5.4",
    "updated": "2026-11-11",
    "repo": "https://github.com/T-Auto/dsh-ops",
    "npm": "https://www.npmjs.com/package/dsh-ops",
    "compat": ">=0.2.2-rc.1 <0.2.3-0",
    "install": "dsh plugin --profile web add dsh-ops",
    "en": {
      "title": "dsh-ops for DeepSeek Harness — System and terminal",
      "desc": "Native file and process tools for Windows and Linux. Published as dsh-ops, version 0.5.4.",
      "h1": "dsh-ops",
      "cite": "Native file and process tools for Windows and Linux.",
      "lead": [
        "Version 0.5.4, last published 2026-11-11. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-ops"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.1 <0.2.3-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.1 <0.2.3-0. node: ^22.19 || >=24."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: T-Auto. Repository: https://github.com/T-Auto/dsh-ops. Package page: https://www.npmjs.com/package/dsh-ops."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Native file and process tools for Windows and Linux."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-ops`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-ops — DeepSeek Harness 系统与终端",
      "desc": "给 Windows 与 Linux 补上原生文件与进程操作工具。 包名 dsh-ops，当前版本 0.5.4。",
      "h1": "dsh-ops",
      "cite": "给 Windows 与 Linux 补上原生文件与进程操作工具。",
      "lead": [
        "当前版本 0.5.4，最后发布 2026-11-11。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-ops"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.1 <0.2.3-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.1 <0.2.3-0。node: ^22.19 || >=24。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 T-Auto，仓库 https://github.com/T-Auto/dsh-ops，包页 https://www.npmjs.com/package/dsh-ops。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "给 Windows 与 Linux 补上原生文件与进程操作工具。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-ops`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "unlag",
    "owner": "regrevia",
    "pkg": "dsh-unlag",
    "group": "system",
    "version": "1.17.5",
    "updated": "2026-11-07",
    "repo": "https://github.com/regrevia/dsh-unlag",
    "npm": "https://www.npmjs.com/package/dsh-unlag",
    "compat": ">=0.2.0-rc.1",
    "install": "dsh plugin --profile web add dsh-unlag",
    "en": {
      "title": "dsh-unlag for DeepSeek Harness — System and terminal",
      "desc": "A reload button for the DSH desktop app, so plugin changes apply without restarting. Published as dsh-unlag, version 1.17.5.",
      "h1": "dsh-unlag",
      "cite": "A reload button for the DSH desktop app, so plugin changes apply without restarting.",
      "lead": [
        "Version 1.17.5, last published 2026-11-07. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-unlag"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.1`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.1. node: not declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: regrevia. Repository: https://github.com/regrevia/dsh-unlag. Package page: https://www.npmjs.com/package/dsh-unlag."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "A reload button for the DSH desktop app, so plugin changes apply without restarting."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-unlag`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-unlag — DeepSeek Harness 系统与终端",
      "desc": "给 DSH 桌面端加一个刷新按钮，改完插件不用重启。 包名 dsh-unlag，当前版本 1.17.5。",
      "h1": "dsh-unlag",
      "cite": "给 DSH 桌面端加一个刷新按钮，改完插件不用重启。",
      "lead": [
        "当前版本 1.17.5，最后发布 2026-11-07。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-unlag"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.1`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.1。node: not declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 regrevia，仓库 https://github.com/regrevia/dsh-unlag，包页 https://www.npmjs.com/package/dsh-unlag。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "给 DSH 桌面端加一个刷新按钮，改完插件不用重启。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-unlag`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "windows-mcp",
    "owner": "helloHub1212",
    "pkg": "dsh-windows-mcp",
    "group": "system",
    "version": "0.2.10",
    "updated": "2026-11-13",
    "repo": "https://github.com/helloHub1212/dsh-windows-mcp",
    "npm": "https://www.npmjs.com/package/dsh-windows-mcp",
    "compat": "",
    "install": "dsh plugin --profile web add dsh-windows-mcp",
    "en": {
      "title": "dsh-windows-mcp for DeepSeek Harness — System and terminal",
      "desc": "Windows desktop automation exposed to DSH as tools. Published as dsh-windows-mcp, version 0.2.10.",
      "h1": "dsh-windows-mcp",
      "cite": "Windows desktop automation exposed to DSH as tools.",
      "lead": [
        "Version 0.2.10, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-windows-mcp"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: >=22."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Declares no runtime dependencies, so clashes come from what it mounts rather than from packages. Install it alone first and read `dsh --profile web --dump-config` before adding another plugin that touches the same surface."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: helloHub1212. Repository: https://github.com/helloHub1212/dsh-windows-mcp. Package page: https://www.npmjs.com/package/dsh-windows-mcp."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "Windows desktop automation exposed to DSH as tools."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-windows-mcp`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-windows-mcp — DeepSeek Harness 系统与终端",
      "desc": "把 Windows 桌面自动化做成 DSH 能调用的工具。 包名 dsh-windows-mcp，当前版本 0.2.10。",
      "h1": "dsh-windows-mcp",
      "cite": "把 Windows 桌面自动化做成 DSH 能调用的工具。",
      "lead": [
        "当前版本 0.2.10，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-windows-mcp"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: >=22。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "没有声明运行时依赖，冲突来自它挂载的东西而不是包本身。先单独装它，读一遍 `dsh --profile web --dump-config`，再加另一个动同一块界面的插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 helloHub1212，仓库 https://github.com/helloHub1212/dsh-windows-mcp，包页 https://www.npmjs.com/package/dsh-windows-mcp。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "把 Windows 桌面自动化做成 DSH 能调用的工具。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-windows-mcp`，和装的时候对称。"
        }
      ]
    }
  },
  {
    "slug": "tui",
    "owner": "ccch1mneyyy",
    "pkg": "@deepseek-harness-tui/dsh-tui",
    "group": "system",
    "version": "0.20.0",
    "updated": "2026-11-12",
    "repo": "https://github.com/ccch1mneyyy/dsh-TUI",
    "npm": "https://www.npmjs.com/package/@deepseek-harness-tui/dsh-tui",
    "compat": "",
    "install": "dsh plugin --profile web add @deepseek-harness-tui/dsh-tui",
    "en": {
      "title": "@deepseek-harness-tui/dsh-tui for DeepSeek Harness — System and terminal",
      "desc": "An interactive terminal interface for DSH agents. Published as @deepseek-harness-tui/dsh-tui, version 0.20.0.",
      "h1": "@deepseek-harness-tui/dsh-tui",
      "cite": "An interactive terminal interface for DSH agents.",
      "lead": [
        "Version 0.20.0, last published 2026-11-12. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @deepseek-harness-tui/dsh-tui"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. node: ^22.19 || >=24."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "Depends on ws, zod, diff, yaml, chalk, react. Because plugin rows are patched by id, a second plugin that registers the same service id is the usual clash — install one, check `dsh --profile web --dump-config`, then add the next."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: ccch1mneyyy. Repository: https://github.com/ccch1mneyyy/dsh-TUI. Package page: https://www.npmjs.com/package/@deepseek-harness-tui/dsh-tui."
          ]
        }
      ],
      "faq": [
        {
          "q": "Who needs this?",
          "a": "An interactive terminal interface for DSH agents."
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @deepseek-harness-tui/dsh-tui`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@deepseek-harness-tui/dsh-tui — DeepSeek Harness 系统与终端",
      "desc": "给 DSH agent 用的交互式终端界面。 包名 @deepseek-harness-tui/dsh-tui，当前版本 0.20.0。",
      "h1": "@deepseek-harness-tui/dsh-tui",
      "cite": "给 DSH agent 用的交互式终端界面。",
      "lead": [
        "当前版本 0.20.0，最后发布 2026-11-12。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @deepseek-harness-tui/dsh-tui"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。node: ^22.19 || >=24。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "依赖 ws, zod, diff, yaml, chalk, react。插件行是按 id 打补丁的，第二个注册同一个服务 id 的插件就是典型冲突——先装一个，用 `dsh --profile web --dump-config` 看一眼，再加下一个。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 ccch1mneyyy，仓库 https://github.com/ccch1mneyyy/dsh-TUI，包页 https://www.npmjs.com/package/@deepseek-harness-tui/dsh-tui。"
          ]
        }
      ],
      "faq": [
        {
          "q": "谁需要它？",
          "a": "给 DSH agent 用的交互式终端界面。"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @deepseek-harness-tui/dsh-tui`，和装的时候对称。"
        }
      ]
    }
  }
];

const BY_SLUG = new Map(COMMUNITY.map((p) => [p.owner + '/' + p.slug, p]));

export function communityPage(slug) {
  return BY_SLUG.get(slug) ?? null;
}

export function communityByGroup() {
  return COMMUNITY_GROUPS.map((g) => ({
    ...g,
    items: COMMUNITY.filter((p) => p.group === g.id),
  })).filter((g) => g.items.length > 0);
}
