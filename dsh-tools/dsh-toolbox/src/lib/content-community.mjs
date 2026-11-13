// 第三方插件目录。作者、版本、仓库、兼容区间、peers 名单来自 npm registry 元数据。
import { CONFLICTS } from './content-community-conflicts.mjs';
import { CONFLICTS_B2 } from './content-community-conflicts-b2.mjs';
import { renderCommunityPage } from './community-render.mjs';
import { pairFor } from './content-conflicts-page.mjs';

const ALL_CONFLICTS = { ...CONFLICTS, ...CONFLICTS_B2 };

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
  },
  {
    "id": "automation",
    "en": "Scheduled automation",
    "zh": "定时自动化"
  },
  {
    "id": "network",
    "en": "Network and proxy",
    "zh": "网络与代理"
  },
  {
    "id": "data",
    "en": "Databases and assets",
    "zh": "数据库与资产"
  },
  {
    "id": "providers",
    "en": "Model providers",
    "zh": "模型服务商"
  },
  {
    "id": "devtools",
    "en": "Git and IDE",
    "zh": "Git 与编辑器"
  },
  {
    "id": "memory",
    "en": "Memory",
    "zh": "记忆"
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
    "peers": 3,
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
            "engines.dsh: not declared. peers: 3 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 3 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dshmarket`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-settings"
    ]
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
    "peers": 1,
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
            "engines.dsh: not declared. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis"
    ]
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
    "peers": 0,
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
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin-catalog`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 2,
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. peers: 2 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。peers: 2 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-cost-meter`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/dsh-home-paths",
      "@deepseek-ai/dsh-credentials"
    ]
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
    "peers": 0,
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
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-whale-widget`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 16,
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. peers: 16 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。peers: 16 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @michengai/dsh-archive-manager`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/dsh-workspace",
      "@deepseek-ai/dsh-spill-local",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-storage-domain",
      "@deepseek-ai/dsh-typert-protocol",
      "@deepseek-ai/dsh-typert-registry",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-client-ui-sidebar",
      "@deepseek-ai/dsh-client-ui-workspace",
      "@deepseek-ai/dsh-client-ui-primitives",
      "@deepseek-ai/dsh-client-ui-conversation",
      "@deepseek-ai/dsh-session-format-catalog",
      "@deepseek-ai/dsh-session-projection-cache"
    ]
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
    "peers": 1,
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
            "engines.dsh: >=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.1-rc.5 <0.2.2-0 || >=0.2.2-rc.1 <0.3.0-0。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-session-superagent`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis"
    ]
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
    "peers": 9,
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0. peers: 9 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.0-rc.1 <0.3.0-0。peers: 9 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @michengai/dsh-skills-manager`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-skill",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/dsh-web-app",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-ui-primitives"
    ]
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
    "peers": 7,
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
            "engines.dsh: not declared. peers: 7 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 7 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-free-search`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-client-ui-commands",
      "@deepseek-ai/dsh-client-ui-renderer",
      "@deepseek-ai/dsh-client-ui-plugin-manager"
    ]
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
    "peers": 0,
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
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @liustack/modsearch`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 7,
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
            "engines.dsh: not declared. peers: 7 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 7 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-dream-skin`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-client-store",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-client-runtime",
      "@deepseek-ai/dsh-client-ui-theme",
      "@deepseek-ai/dsh-client-ui-settings",
      "@deepseek-ai/dsh-client-ui-settings-general"
    ]
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
    "peers": 2,
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
            "engines.dsh: not declared. peers: 2 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 2 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-claude-style`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-client-ui-primitives"
    ]
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
    "peers": 4,
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
            "engines.dsh: ^0.2.0-rc.1. peers: 4 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: ^0.2.0-rc.1。peers: 4 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-plugin-wallpaper-engine`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-client-runtime",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-client-ui-slots"
    ]
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
    "peers": 10,
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
            "engines.dsh: not declared. peers: 10 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 10 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-pet`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-commands",
      "@deepseek-ai/dsh-home-paths",
      "@deepseek-ai/dsh-credentials",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-agent-default-model",
      "@deepseek-ai/dsh-client-ui-primitives"
    ]
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
    "peers": 1,
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
            "engines.dsh: not declared. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-meme`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/dsh-tools"
    ]
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
    "peers": 23,
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
            "engines.dsh: >=0.1.2-alpha.2. peers: 23 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.1.2-alpha.2。peers: 23 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @nanmicoder/dsh-agent-teams`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-agent",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-commands",
      "@deepseek-ai/dsh-subagent",
      "@deepseek-ai/dsh-util-values",
      "@deepseek-ai/dsh-client-store",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-system-prompt",
      "@deepseek-ai/dsh-client-ui-chat",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-ui-layout",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-client-ui-session",
      "@deepseek-ai/dsh-client-ui-renderer",
      "@deepseek-ai/dsh-session-projection",
      "@deepseek-ai/dsh-client-ui-primitives",
      "@deepseek-ai/dsh-api-session-controller",
      "@deepseek-ai/dsh-client-ui-conversation",
      "@deepseek-ai/dsh-client-ui-model-selection"
    ]
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
    "peers": 11,
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
            "engines.dsh: >=0.2.1-rc.3 <0.3.0-0. peers: 11 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.1-rc.3 <0.3.0-0。peers: 11 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-agent-compare`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-agent",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-sandbox",
      "@deepseek-ai/dsh-subprocess",
      "@deepseek-ai/dsh-win32-process",
      "@deepseek-ai/dsh-client-ui-chat",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-ui-conversation"
    ]
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
    "peers": 6,
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
            "engines.dsh: >=0.2.0. peers: 6 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.0。peers: 6 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-mobile-plugin`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-client-runtime"
    ]
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
    "peers": 8,
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
            "engines.dsh: not declared. peers: 8 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 8 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-remote`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-commands",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-system-prompt",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-client-ui-renderer"
    ]
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
    "peers": 12,
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
            "engines.dsh: not declared. peers: 12 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 12 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove ds-harness-remote`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-api-gateway",
      "@deepseek-ai/dsh-client-locale",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-client-ui-sidebar",
      "@deepseek-ai/dsh-client-ui-settings",
      "@deepseek-ai/dsh-client-ui-plugin-manager",
      "@deepseek-ai/dsh-client-ui-settings-general",
      "@deepseek-ai/dsh-client-ui-settings-plugins",
      "@deepseek-ai/dsh-client-ui-settings-plugin-inventory"
    ]
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
    "peers": 0,
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
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @xmanrui/dsh-im`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 6,
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
            "engines.dsh: not declared. peers: 6 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 6 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @tencent-connect/dsh-qqbot`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-agent",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-user-approval"
    ]
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
    "peers": 5,
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
            "engines.dsh: not declared. peers: 5 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 5 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-genui`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-system-prompt",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-client-ui-primitives"
    ]
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
    "peers": 4,
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
            "engines.dsh: not declared. peers: 4 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 4 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove deep-view`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-web",
      "@deepseek-ai/dsh-tools"
    ]
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
    "peers": 9,
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
            "engines.dsh: not declared. peers: 9 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 9 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-univer-office`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-skill",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-attachment",
      "@deepseek-ai/dsh-host-webserver"
    ]
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
    "peers": 2,
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
            "engines.dsh: >=0.2.2-rc.1 <0.2.3-0. peers: 2 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.2-rc.1 <0.2.3-0。peers: 2 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-ops`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/dsh",
      "@deepseek-ai/cordis"
    ]
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
    "peers": 0,
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
            "engines.dsh: >=0.2.0-rc.1. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: >=0.2.0-rc.1。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-unlag`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 0,
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
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-windows-mcp`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
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
    "peers": 38,
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
            "engines.dsh: not declared. peers: 38 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
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
          "q": "placeholder",
          "a": "placeholder"
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
            "engines.dsh: not declared。peers: 38 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
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
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @deepseek-harness-tui/dsh-tui`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-agent",
      "@deepseek-ai/dsh-scope",
      "@deepseek-ai/dsh-skill",
      "@deepseek-ai/dsh-cmdline",
      "@deepseek-ai/dsh-persona",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/dsh-storage",
      "@deepseek-ai/dsh-web-app",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-app-boot",
      "@deepseek-ai/dsh-commands",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-terminal",
      "@deepseek-ai/dsh-llm-pi-ai",
      "@deepseek-ai/dsh-workspace",
      "@deepseek-ai/dsh-home-paths",
      "@deepseek-ai/dsh-http-proxy",
      "@deepseek-ai/dsh-tool-cordis",
      "@deepseek-ai/dsh-atomic-write",
      "@deepseek-ai/dsh-storage-json",
      "@deepseek-ai/dsh-system-prompt",
      "@deepseek-ai/dsh-terminal-bash",
      "@deepseek-ai/dsh-tool-ask-user",
      "@deepseek-ai/dsh-tool-subagent",
      "@deepseek-ai/dsh-user-approval",
      "@deepseek-ai/dsh-host-webserver",
      "@deepseek-ai/dsh-plugin-manager",
      "@deepseek-ai/dsh-storage-domain",
      "@deepseek-ai/dsh-user-questions",
      "@deepseek-ai/dsh-deepseek-account",
      "@deepseek-ai/dsh-ptc-runtime-node",
      "@deepseek-ai/dsh-agent-instructions",
      "@deepseek-ai/dsh-cordis-host-runner",
      "@deepseek-ai/dsh-launch-environment",
      "@deepseek-ai/dsh-tool-bash-persistent",
      "@deepseek-ai/dsh-agent-preset-registry"
    ]
  },
  {
    "slug": "universal-plugin-hub",
    "owner": "Ultmebius",
    "pkg": "universal-plugin-hub",
    "group": "find-plugins",
    "version": "1.3.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/Ultmebius/universal-plugin-hub",
    "npm": "https://www.npmjs.com/package/universal-plugin-hub",
    "compat": ">=0.1.5-rc.1",
    "peers": 1,
    "install": "dsh plugin --profile web add universal-plugin-hub",
    "en": {
      "title": "universal-plugin-hub for DeepSeek Harness — Find and install plugins",
      "desc": "One hub that manages Claude Code, Codex and DSH plugins, skills and MCP connectors together. Published as universal-plugin-hub, version 1.3.1.",
      "h1": "universal-plugin-hub",
      "cite": "One hub that manages Claude Code, Codex and DSH plugins, skills and MCP connectors together.",
      "lead": [
        "Version 1.3.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add universal-plugin-hub"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.1.5-rc.1`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.1.5-rc.1. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Ultmebius. Repository: https://github.com/Ultmebius/universal-plugin-hub. Package page: https://www.npmjs.com/package/universal-plugin-hub."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove universal-plugin-hub`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "universal-plugin-hub — DeepSeek Harness 找插件、装插件",
      "desc": "一个入口同时管 Claude Code、Codex 与 DSH 的插件、技能和 MCP 连接器。 包名 universal-plugin-hub，当前版本 1.3.1。",
      "h1": "universal-plugin-hub",
      "cite": "一个入口同时管 Claude Code、Codex 与 DSH 的插件、技能和 MCP 连接器。",
      "lead": [
        "当前版本 1.3.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add universal-plugin-hub"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.1.5-rc.1`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.1.5-rc.1。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Ultmebius，仓库 https://github.com/Ultmebius/universal-plugin-hub，包页 https://www.npmjs.com/package/universal-plugin-hub。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove universal-plugin-hub`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis"
    ]
  },
  {
    "slug": "skill-mcp-market",
    "owner": "kuailexiaozixin",
    "pkg": "dsh-skill-mcp-market",
    "group": "skills",
    "version": "0.5.28",
    "updated": "2026-11-13",
    "repo": "https://github.com/kuailexiaozixin/dsh-skill-mcp-market",
    "npm": "https://www.npmjs.com/package/dsh-skill-mcp-market",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-skill-mcp-market",
    "en": {
      "title": "dsh-skill-mcp-market for DeepSeek Harness — Skills",
      "desc": "Browse skill and MCP feeds and install SKILL.md or a connector without restarting. Published as dsh-skill-mcp-market, version 0.5.28.",
      "h1": "dsh-skill-mcp-market",
      "cite": "Browse skill and MCP feeds and install SKILL.md or a connector without restarting.",
      "lead": [
        "Version 0.5.28, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-skill-mcp-market"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: kuailexiaozixin. Repository: https://github.com/kuailexiaozixin/dsh-skill-mcp-market. Package page: https://www.npmjs.com/package/dsh-skill-mcp-market."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-skill-mcp-market`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-skill-mcp-market — DeepSeek Harness 技能管理",
      "desc": "浏览技能与 MCP 源，一键装 SKILL.md 或连接器，不用重启。 包名 dsh-skill-mcp-market，当前版本 0.5.28。",
      "h1": "dsh-skill-mcp-market",
      "cite": "浏览技能与 MCP 源，一键装 SKILL.md 或连接器，不用重启。",
      "lead": [
        "当前版本 0.5.28，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-skill-mcp-market"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 kuailexiaozixin，仓库 https://github.com/kuailexiaozixin/dsh-skill-mcp-market，包页 https://www.npmjs.com/package/dsh-skill-mcp-market。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-skill-mcp-market`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "skill-manager",
    "owner": "xiechenghua01",
    "pkg": "@chengze/dsh-skill-manager",
    "group": "skills",
    "version": "0.2.5",
    "updated": "2026-11-13",
    "repo": "https://github.com/xiechenghua01/dsh-plugins",
    "npm": "https://www.npmjs.com/package/@chengze/dsh-skill-manager",
    "compat": ">=0.2.1-rc.5 <0.3.0",
    "peers": 0,
    "install": "dsh plugin --profile web add @chengze/dsh-skill-manager",
    "en": {
      "title": "@chengze/dsh-skill-manager for DeepSeek Harness — Skills",
      "desc": "A sidebar panel that lists installed skills and turns each one on or off. Published as @chengze/dsh-skill-manager, version 0.2.5.",
      "h1": "@chengze/dsh-skill-manager",
      "cite": "A sidebar panel that lists installed skills and turns each one on or off.",
      "lead": [
        "Version 0.2.5, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @chengze/dsh-skill-manager"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-rc.5 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-rc.5 <0.3.0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: xiechenghua01. Repository: https://github.com/xiechenghua01/dsh-plugins. Package page: https://www.npmjs.com/package/@chengze/dsh-skill-manager."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @chengze/dsh-skill-manager`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@chengze/dsh-skill-manager — DeepSeek Harness 技能管理",
      "desc": "侧边栏面板列出已装技能，逐个开关。 包名 @chengze/dsh-skill-manager，当前版本 0.2.5。",
      "h1": "@chengze/dsh-skill-manager",
      "cite": "侧边栏面板列出已装技能，逐个开关。",
      "lead": [
        "当前版本 0.2.5，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @chengze/dsh-skill-manager"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-rc.5 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-rc.5 <0.3.0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 xiechenghua01，仓库 https://github.com/xiechenghua01/dsh-plugins，包页 https://www.npmjs.com/package/@chengze/dsh-skill-manager。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @chengze/dsh-skill-manager`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "skill-browser",
    "owner": "loyalchiiina",
    "pkg": "dsh-skill-browser",
    "group": "skills",
    "version": "2.2.6",
    "updated": "2026-11-13",
    "repo": "https://github.com/loyalchiiina/dsh-skill-browser",
    "npm": "https://www.npmjs.com/package/dsh-skill-browser",
    "compat": ">=0.1.7-rc.1",
    "peers": 3,
    "install": "dsh plugin --profile web add dsh-skill-browser",
    "en": {
      "title": "dsh-skill-browser for DeepSeek Harness — Skills",
      "desc": "A floating panel that turns the local skill folder into something searchable, with call ledgers and MCP management. Published as dsh-skill-browser, version 2.2.6.",
      "h1": "dsh-skill-browser",
      "cite": "A floating panel that turns the local skill folder into something searchable, with call ledgers and MCP management.",
      "lead": [
        "Version 2.2.6, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-skill-browser"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.1.7-rc.1`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.1.7-rc.1. peers: 3 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: loyalchiiina. Repository: https://github.com/loyalchiiina/dsh-skill-browser. Package page: https://www.npmjs.com/package/dsh-skill-browser."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-skill-browser`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-skill-browser — DeepSeek Harness 技能管理",
      "desc": "悬浮球打开面板，把本机技能库变成可检索资产，带调用台账与 MCP 管理。 包名 dsh-skill-browser，当前版本 2.2.6。",
      "h1": "dsh-skill-browser",
      "cite": "悬浮球打开面板，把本机技能库变成可检索资产，带调用台账与 MCP 管理。",
      "lead": [
        "当前版本 2.2.6，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-skill-browser"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.1.7-rc.1`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.1.7-rc.1。peers: 3 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 loyalchiiina，仓库 https://github.com/loyalchiiina/dsh-skill-browser，包页 https://www.npmjs.com/package/dsh-skill-browser。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-skill-browser`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/dsh",
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm"
    ]
  },
  {
    "slug": "evolution-bundle",
    "owner": "lmzhen",
    "pkg": "@lmzhen/dsh-evolution-all",
    "group": "automation",
    "version": "0.46.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/lmzhen/dsh-evolution",
    "npm": "https://www.npmjs.com/package/@lmzhen/dsh-evolution-all",
    "compat": ">=0.2.2-rc.0 <0.2.3-0",
    "peers": 0,
    "install": "dsh plugin --profile web add @lmzhen/dsh-evolution-all",
    "en": {
      "title": "@lmzhen/dsh-evolution-all for DeepSeek Harness — Scheduled automation",
      "desc": "A self-evolution bundle: host automation plus model-facing tools in one install. Published as @lmzhen/dsh-evolution-all, version 0.46.0.",
      "h1": "@lmzhen/dsh-evolution-all",
      "cite": "A self-evolution bundle: host automation plus model-facing tools in one install.",
      "lead": [
        "Version 0.46.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @lmzhen/dsh-evolution-all"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.0 <0.2.3-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.0 <0.2.3-0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: lmzhen. Repository: https://github.com/lmzhen/dsh-evolution. Package page: https://www.npmjs.com/package/@lmzhen/dsh-evolution-all."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @lmzhen/dsh-evolution-all`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@lmzhen/dsh-evolution-all — DeepSeek Harness 定时自动化",
      "desc": "自进化套件：宿主自动化加模型侧工具，一次装齐。 包名 @lmzhen/dsh-evolution-all，当前版本 0.46.0。",
      "h1": "@lmzhen/dsh-evolution-all",
      "cite": "自进化套件：宿主自动化加模型侧工具，一次装齐。",
      "lead": [
        "当前版本 0.46.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @lmzhen/dsh-evolution-all"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.0 <0.2.3-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.0 <0.2.3-0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 lmzhen，仓库 https://github.com/lmzhen/dsh-evolution，包页 https://www.npmjs.com/package/@lmzhen/dsh-evolution-all。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @lmzhen/dsh-evolution-all`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "skill-health-panel",
    "owner": "lmzhen",
    "pkg": "@lmzhen/dsh-evolution-skill-health",
    "group": "skills",
    "version": "0.46.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/lmzhen/dsh-evolution",
    "npm": "https://www.npmjs.com/package/@lmzhen/dsh-evolution-skill-health",
    "compat": ">=0.2.2-rc.0 <0.2.3-0",
    "peers": 1,
    "install": "dsh plugin --profile web add @lmzhen/dsh-evolution-skill-health",
    "en": {
      "title": "@lmzhen/dsh-evolution-skill-health for DeepSeek Harness — Skills",
      "desc": "The sidebar panel that shows what the skill linter found. Published as @lmzhen/dsh-evolution-skill-health, version 0.46.0.",
      "h1": "@lmzhen/dsh-evolution-skill-health",
      "cite": "The sidebar panel that shows what the skill linter found.",
      "lead": [
        "Version 0.46.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @lmzhen/dsh-evolution-skill-health"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.0 <0.2.3-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.0 <0.2.3-0. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: lmzhen. Repository: https://github.com/lmzhen/dsh-evolution. Package page: https://www.npmjs.com/package/@lmzhen/dsh-evolution-skill-health."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @lmzhen/dsh-evolution-skill-health`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@lmzhen/dsh-evolution-skill-health — DeepSeek Harness 技能管理",
      "desc": "侧边栏面板，显示技能体检的结果。 包名 @lmzhen/dsh-evolution-skill-health，当前版本 0.46.0。",
      "h1": "@lmzhen/dsh-evolution-skill-health",
      "cite": "侧边栏面板，显示技能体检的结果。",
      "lead": [
        "当前版本 0.46.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @lmzhen/dsh-evolution-skill-health"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.0 <0.2.3-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.0 <0.2.3-0。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 lmzhen，仓库 https://github.com/lmzhen/dsh-evolution，包页 https://www.npmjs.com/package/@lmzhen/dsh-evolution-skill-health。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @lmzhen/dsh-evolution-skill-health`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis"
    ]
  },
  {
    "slug": "custom-theme",
    "owner": "Sparrived",
    "pkg": "dsh-custom-theme",
    "group": "appearance",
    "version": "0.9.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/Sparrived/dsh-custom-theme",
    "npm": "https://www.npmjs.com/package/dsh-custom-theme",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-custom-theme",
    "en": {
      "title": "dsh-custom-theme for DeepSeek Harness — Looks and themes",
      "desc": "User-editable CSS themes and background images for the web UI and the desktop app. Published as dsh-custom-theme, version 0.9.0.",
      "h1": "dsh-custom-theme",
      "cite": "User-editable CSS themes and background images for the web UI and the desktop app.",
      "lead": [
        "Version 0.9.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-custom-theme"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Sparrived. Repository: https://github.com/Sparrived/dsh-custom-theme. Package page: https://www.npmjs.com/package/dsh-custom-theme."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-custom-theme`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-custom-theme — DeepSeek Harness 界面与外观",
      "desc": "可自己改的 CSS 主题与背景图，网页版和桌面版都能用。 包名 dsh-custom-theme，当前版本 0.9.0。",
      "h1": "dsh-custom-theme",
      "cite": "可自己改的 CSS 主题与背景图，网页版和桌面版都能用。",
      "lead": [
        "当前版本 0.9.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-custom-theme"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Sparrived，仓库 https://github.com/Sparrived/dsh-custom-theme，包页 https://www.npmjs.com/package/dsh-custom-theme。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-custom-theme`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "flat-corners",
    "owner": "VMWHW",
    "pkg": "dsh-exv-flat-corners",
    "group": "appearance",
    "version": "2.4.2",
    "updated": "2026-11-13",
    "repo": "https://github.com/VMWHW/dsh-exv-theme",
    "npm": "https://www.npmjs.com/package/dsh-exv-flat-corners",
    "compat": ">=0.2.2-rc.1 <0.3.0",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-exv-flat-corners",
    "en": {
      "title": "dsh-exv-flat-corners for DeepSeek Harness — Looks and themes",
      "desc": "Removes every corner radius from the interface. Published as dsh-exv-flat-corners, version 2.4.2.",
      "h1": "dsh-exv-flat-corners",
      "cite": "Removes every corner radius from the interface.",
      "lead": [
        "Version 2.4.2, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-exv-flat-corners"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.1 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: VMWHW. Repository: https://github.com/VMWHW/dsh-exv-theme. Package page: https://www.npmjs.com/package/dsh-exv-flat-corners."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-exv-flat-corners`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-exv-flat-corners — DeepSeek Harness 界面与外观",
      "desc": "把界面里所有圆角去掉。 包名 dsh-exv-flat-corners，当前版本 2.4.2。",
      "h1": "dsh-exv-flat-corners",
      "cite": "把界面里所有圆角去掉。",
      "lead": [
        "当前版本 2.4.2，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-exv-flat-corners"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.1 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 VMWHW，仓库 https://github.com/VMWHW/dsh-exv-theme，包页 https://www.npmjs.com/package/dsh-exv-flat-corners。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-exv-flat-corners`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "sidebar-fold",
    "owner": "rivenshanghai",
    "pkg": "dsh-toomuch-plugins",
    "group": "appearance",
    "version": "0.3.3",
    "updated": "2026-11-13",
    "repo": "https://github.com/rivenshanghai/dsh-toomuch-plugins",
    "npm": "https://www.npmjs.com/package/dsh-toomuch-plugins",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-toomuch-plugins",
    "en": {
      "title": "dsh-toomuch-plugins for DeepSeek Harness — Looks and themes",
      "desc": "Collapses the growing list of global panel entries in the left sidebar into one row. Published as dsh-toomuch-plugins, version 0.3.3.",
      "h1": "dsh-toomuch-plugins",
      "cite": "Collapses the growing list of global panel entries in the left sidebar into one row.",
      "lead": [
        "Version 0.3.3, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-toomuch-plugins"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: rivenshanghai. Repository: https://github.com/rivenshanghai/dsh-toomuch-plugins. Package page: https://www.npmjs.com/package/dsh-toomuch-plugins."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-toomuch-plugins`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-toomuch-plugins — DeepSeek Harness 界面与外观",
      "desc": "把左侧栏越堆越长的全局面板收成一行。 包名 dsh-toomuch-plugins，当前版本 0.3.3。",
      "h1": "dsh-toomuch-plugins",
      "cite": "把左侧栏越堆越长的全局面板收成一行。",
      "lead": [
        "当前版本 0.3.3，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-toomuch-plugins"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 rivenshanghai，仓库 https://github.com/rivenshanghai/dsh-toomuch-plugins，包页 https://www.npmjs.com/package/dsh-toomuch-plugins。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-toomuch-plugins`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "aishell-brand",
    "owner": "yusheng-g",
    "pkg": "@huaweidevtools/aishell-dsh-brand",
    "group": "appearance",
    "version": "0.0.23",
    "updated": "2026-11-13",
    "repo": "https://github.com/yusheng-g/aishell-dsh-plugins",
    "npm": "https://www.npmjs.com/package/@huaweidevtools/aishell-dsh-brand",
    "compat": "",
    "peers": 2,
    "install": "dsh plugin --profile web add @huaweidevtools/aishell-dsh-brand",
    "en": {
      "title": "@huaweidevtools/aishell-dsh-brand for DeepSeek Harness — Looks and themes",
      "desc": "Replaces the sidebar and hero brand marks with AI Shell artwork. Published as @huaweidevtools/aishell-dsh-brand, version 0.0.23.",
      "h1": "@huaweidevtools/aishell-dsh-brand",
      "cite": "Replaces the sidebar and hero brand marks with AI Shell artwork.",
      "lead": [
        "Version 0.0.23, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @huaweidevtools/aishell-dsh-brand"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 2 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: yusheng-g. Repository: https://github.com/yusheng-g/aishell-dsh-plugins. Package page: https://www.npmjs.com/package/@huaweidevtools/aishell-dsh-brand."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @huaweidevtools/aishell-dsh-brand`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@huaweidevtools/aishell-dsh-brand — DeepSeek Harness 界面与外观",
      "desc": "把侧栏和首屏的品牌标识换成 AI Shell 的。 包名 @huaweidevtools/aishell-dsh-brand，当前版本 0.0.23。",
      "h1": "@huaweidevtools/aishell-dsh-brand",
      "cite": "把侧栏和首屏的品牌标识换成 AI Shell 的。",
      "lead": [
        "当前版本 0.0.23，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @huaweidevtools/aishell-dsh-brand"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 2 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 yusheng-g，仓库 https://github.com/yusheng-g/aishell-dsh-plugins，包页 https://www.npmjs.com/package/@huaweidevtools/aishell-dsh-brand。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @huaweidevtools/aishell-dsh-brand`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-system-prompt"
    ]
  },
  {
    "slug": "llm-proxy",
    "owner": "fan56",
    "pkg": "@aiwayds/dsh-llm-proxy",
    "group": "network",
    "version": "0.8.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/fan56/dsh-llm-proxy",
    "npm": "https://www.npmjs.com/package/@aiwayds/dsh-llm-proxy",
    "compat": "",
    "peers": 4,
    "install": "dsh plugin --profile web add @aiwayds/dsh-llm-proxy",
    "en": {
      "title": "@aiwayds/dsh-llm-proxy for DeepSeek Harness — Network and proxy",
      "desc": "A system proxy plus a traffic-splitting proxy for model calls, so one host can route several providers. Published as @aiwayds/dsh-llm-proxy, version 0.8.1.",
      "h1": "@aiwayds/dsh-llm-proxy",
      "cite": "A system proxy plus a traffic-splitting proxy for model calls, so one host can route several providers.",
      "lead": [
        "Version 0.8.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @aiwayds/dsh-llm-proxy"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 4 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: fan56. Repository: https://github.com/fan56/dsh-llm-proxy. Package page: https://www.npmjs.com/package/@aiwayds/dsh-llm-proxy."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @aiwayds/dsh-llm-proxy`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@aiwayds/dsh-llm-proxy — DeepSeek Harness 网络与代理",
      "desc": "系统代理加模型流量分流代理，一台机器上给多个服务商分路。 包名 @aiwayds/dsh-llm-proxy，当前版本 0.8.1。",
      "h1": "@aiwayds/dsh-llm-proxy",
      "cite": "系统代理加模型流量分流代理，一台机器上给多个服务商分路。",
      "lead": [
        "当前版本 0.8.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @aiwayds/dsh-llm-proxy"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 4 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 fan56，仓库 https://github.com/fan56/dsh-llm-proxy，包页 https://www.npmjs.com/package/@aiwayds/dsh-llm-proxy。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @aiwayds/dsh-llm-proxy`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-skill",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-settings"
    ]
  },
  {
    "slug": "database-tool",
    "owner": "SouleyMoni1",
    "pkg": "dsh-tool-database",
    "group": "data",
    "version": "0.3.7",
    "updated": "2026-11-13",
    "repo": "https://github.com/SouleyMoni1/dsh-tool-database",
    "npm": "https://www.npmjs.com/package/dsh-tool-database",
    "compat": "",
    "peers": 2,
    "install": "dsh plugin --profile web add dsh-tool-database",
    "en": {
      "title": "dsh-tool-database for DeepSeek Harness — Databases and assets",
      "desc": "Query SQL Server, PostgreSQL and MySQL from the agent through native drivers. Published as dsh-tool-database, version 0.3.7.",
      "h1": "dsh-tool-database",
      "cite": "Query SQL Server, PostgreSQL and MySQL from the agent through native drivers.",
      "lead": [
        "Version 0.3.7, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-tool-database"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 2 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: SouleyMoni1. Repository: https://github.com/SouleyMoni1/dsh-tool-database. Package page: https://www.npmjs.com/package/dsh-tool-database."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-tool-database`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-tool-database — DeepSeek Harness 数据库与资产",
      "desc": "让 agent 通过原生驱动查 SQL Server、PostgreSQL、MySQL。 包名 dsh-tool-database，当前版本 0.3.7。",
      "h1": "dsh-tool-database",
      "cite": "让 agent 通过原生驱动查 SQL Server、PostgreSQL、MySQL。",
      "lead": [
        "当前版本 0.3.7，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-tool-database"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 2 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 SouleyMoni1，仓库 https://github.com/SouleyMoni1/dsh-tool-database，包页 https://www.npmjs.com/package/dsh-tool-database。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-tool-database`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools"
    ]
  },
  {
    "slug": "providers-hub",
    "owner": "iJetLi",
    "pkg": "dsh-providers-hub",
    "group": "providers",
    "version": "2.24.261113",
    "updated": "2026-11-13",
    "repo": "https://gitee.com/iJetLi/deepseek-harness-codearts",
    "npm": "https://www.npmjs.com/package/dsh-providers-hub",
    "compat": "",
    "peers": 5,
    "install": "dsh plugin --profile web add dsh-providers-hub",
    "en": {
      "title": "dsh-providers-hub for DeepSeek Harness — Model providers",
      "desc": "One hub for coding providers: account login, multiple accounts, and switching between them. Published as dsh-providers-hub, version 2.24.261113.",
      "h1": "dsh-providers-hub",
      "cite": "One hub for coding providers: account login, multiple accounts, and switching between them.",
      "lead": [
        "Version 2.24.261113, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-providers-hub"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 5 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: iJetLi. Repository: https://gitee.com/iJetLi/deepseek-harness-codearts. Package page: https://www.npmjs.com/package/dsh-providers-hub."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-providers-hub`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-providers-hub — DeepSeek Harness 模型服务商",
      "desc": "一个入口管编码服务商：登录、多账号、来回切。 包名 dsh-providers-hub，当前版本 2.24.261113。",
      "h1": "dsh-providers-hub",
      "cite": "一个入口管编码服务商：登录、多账号、来回切。",
      "lead": [
        "当前版本 2.24.261113，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-providers-hub"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 5 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 iJetLi，仓库 https://gitee.com/iJetLi/deepseek-harness-codearts，包页 https://www.npmjs.com/package/dsh-providers-hub。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-providers-hub`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-commands",
      "@deepseek-ai/dsh-credentials"
    ]
  },
  {
    "slug": "permission-remote",
    "owner": "weicy98",
    "pkg": "dsh-permission-remote",
    "group": "remote",
    "version": "0.18.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/weicy98/dsh-permission-remote",
    "npm": "https://www.npmjs.com/package/dsh-permission-remote",
    "compat": ">=0.2.2-rc.1 <0.3.0",
    "peers": 12,
    "install": "dsh plugin --profile web add dsh-permission-remote",
    "en": {
      "title": "dsh-permission-remote for DeepSeek Harness — Phone and remote access",
      "desc": "SSH remote workspaces that reuse the session sandbox mode and the approval flow. Published as dsh-permission-remote, version 0.18.1.",
      "h1": "dsh-permission-remote",
      "cite": "SSH remote workspaces that reuse the session sandbox mode and the approval flow.",
      "lead": [
        "Version 0.18.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-permission-remote"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.1 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0. peers: 12 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: weicy98. Repository: https://github.com/weicy98/dsh-permission-remote. Package page: https://www.npmjs.com/package/dsh-permission-remote."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-permission-remote`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-permission-remote — DeepSeek Harness 手机与远程访问",
      "desc": "SSH 远程工作区，沿用会话的沙箱模式与审批流程。 包名 dsh-permission-remote，当前版本 0.18.1。",
      "h1": "dsh-permission-remote",
      "cite": "SSH 远程工作区，沿用会话的沙箱模式与审批流程。",
      "lead": [
        "当前版本 0.18.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-permission-remote"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.1 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0。peers: 12 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 weicy98，仓库 https://github.com/weicy98/dsh-permission-remote，包页 https://www.npmjs.com/package/dsh-permission-remote。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-permission-remote`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-fs",
      "@deepseek-ai/cosmokit",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-sandbox",
      "@deepseek-ai/schemastery",
      "@deepseek-ai/dsh-fs-patch",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-home-paths",
      "@deepseek-ai/dsh-credentials",
      "@deepseek-ai/dsh-atomic-write",
      "@deepseek-ai/dsh-typert-protocol"
    ]
  },
  {
    "slug": "simple-worktree",
    "owner": "voltage12",
    "pkg": "@voltage12/dsh-simple-worktree",
    "group": "devtools",
    "version": "0.1.3",
    "updated": "2026-11-13",
    "repo": "https://github.com/voltage12/dsh-simple-worktree",
    "npm": "https://www.npmjs.com/package/@voltage12/dsh-simple-worktree",
    "compat": ">=0.2.1-rc.2 <0.3.0",
    "peers": 0,
    "install": "dsh plugin --profile web add @voltage12/dsh-simple-worktree",
    "en": {
      "title": "@voltage12/dsh-simple-worktree for DeepSeek Harness — Git and IDE",
      "desc": "Create and remove git worktrees from the conversation. Published as @voltage12/dsh-simple-worktree, version 0.1.3.",
      "h1": "@voltage12/dsh-simple-worktree",
      "cite": "Create and remove git worktrees from the conversation.",
      "lead": [
        "Version 0.1.3, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @voltage12/dsh-simple-worktree"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-rc.2 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-rc.2 <0.3.0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: voltage12. Repository: https://github.com/voltage12/dsh-simple-worktree. Package page: https://www.npmjs.com/package/@voltage12/dsh-simple-worktree."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @voltage12/dsh-simple-worktree`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@voltage12/dsh-simple-worktree — DeepSeek Harness Git 与编辑器",
      "desc": "在对话里创建和删除 git worktree。 包名 @voltage12/dsh-simple-worktree，当前版本 0.1.3。",
      "h1": "@voltage12/dsh-simple-worktree",
      "cite": "在对话里创建和删除 git worktree。",
      "lead": [
        "当前版本 0.1.3，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @voltage12/dsh-simple-worktree"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-rc.2 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-rc.2 <0.3.0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 voltage12，仓库 https://github.com/voltage12/dsh-simple-worktree，包页 https://www.npmjs.com/package/@voltage12/dsh-simple-worktree。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @voltage12/dsh-simple-worktree`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "web-ide",
    "owner": "fengzhaoy",
    "pkg": "@zhaoyang10/dsh-web-ide",
    "group": "devtools",
    "version": "0.2.2",
    "updated": "2026-11-13",
    "repo": "https://gitee.com/fengzhaoy/dsh-web-ide",
    "npm": "https://www.npmjs.com/package/@zhaoyang10/dsh-web-ide",
    "compat": ">=0.2.0-rc.2",
    "peers": 0,
    "install": "dsh plugin --profile web add @zhaoyang10/dsh-web-ide",
    "en": {
      "title": "@zhaoyang10/dsh-web-ide for DeepSeek Harness — Git and IDE",
      "desc": "A VS Code-style read-only code tab in the web client. Published as @zhaoyang10/dsh-web-ide, version 0.2.2.",
      "h1": "@zhaoyang10/dsh-web-ide",
      "cite": "A VS Code-style read-only code tab in the web client.",
      "lead": [
        "Version 0.2.2, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @zhaoyang10/dsh-web-ide"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.2`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.2. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: fengzhaoy. Repository: https://gitee.com/fengzhaoy/dsh-web-ide. Package page: https://www.npmjs.com/package/@zhaoyang10/dsh-web-ide."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @zhaoyang10/dsh-web-ide`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@zhaoyang10/dsh-web-ide — DeepSeek Harness Git 与编辑器",
      "desc": "网页端加一个 VS Code 风格的只读代码页。 包名 @zhaoyang10/dsh-web-ide，当前版本 0.2.2。",
      "h1": "@zhaoyang10/dsh-web-ide",
      "cite": "网页端加一个 VS Code 风格的只读代码页。",
      "lead": [
        "当前版本 0.2.2，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @zhaoyang10/dsh-web-ide"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.2`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.2。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 fengzhaoy，仓库 https://gitee.com/fengzhaoy/dsh-web-ide，包页 https://www.npmjs.com/package/@zhaoyang10/dsh-web-ide。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @zhaoyang10/dsh-web-ide`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "computers",
    "owner": "9Ashwin",
    "pkg": "dsh-computers",
    "group": "remote",
    "version": "1.9.9",
    "updated": "2026-11-13",
    "repo": "https://github.com/9Ashwin/dsh-computers",
    "npm": "https://www.npmjs.com/package/dsh-computers",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-computers",
    "en": {
      "title": "dsh-computers for DeepSeek Harness — Phone and remote access",
      "desc": "Connect your own machines to a DSH deployment and run commands on them from the agent. Published as dsh-computers, version 1.9.9.",
      "h1": "dsh-computers",
      "cite": "Connect your own machines to a DSH deployment and run commands on them from the agent.",
      "lead": [
        "Version 1.9.9, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-computers"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: 9Ashwin. Repository: https://github.com/9Ashwin/dsh-computers. Package page: https://www.npmjs.com/package/dsh-computers."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-computers`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-computers — DeepSeek Harness 手机与远程访问",
      "desc": "把自己其它机器接到 DSH 上，让 agent 在上面跑命令。 包名 dsh-computers，当前版本 1.9.9。",
      "h1": "dsh-computers",
      "cite": "把自己其它机器接到 DSH 上，让 agent 在上面跑命令。",
      "lead": [
        "当前版本 1.9.9，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-computers"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 9Ashwin，仓库 https://github.com/9Ashwin/dsh-computers，包页 https://www.npmjs.com/package/dsh-computers。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-computers`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "cloud-relay",
    "owner": "NoelJudeNoel",
    "pkg": "dshost-plugin",
    "group": "remote",
    "version": "0.1.25",
    "updated": "2026-11-13",
    "repo": "https://github.com/NoelJudeNoel/dshost-plugin",
    "npm": "https://www.npmjs.com/package/dshost-plugin",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dshost-plugin",
    "en": {
      "title": "dshost-plugin for DeepSeek Harness — Phone and remote access",
      "desc": "A relay plugin that exposes the local web UI through a hosted endpoint. Published as dshost-plugin, version 0.1.25.",
      "h1": "dshost-plugin",
      "cite": "A relay plugin that exposes the local web UI through a hosted endpoint.",
      "lead": [
        "Version 0.1.25, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dshost-plugin"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: NoelJudeNoel. Repository: https://github.com/NoelJudeNoel/dshost-plugin. Package page: https://www.npmjs.com/package/dshost-plugin."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dshost-plugin`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dshost-plugin — DeepSeek Harness 手机与远程访问",
      "desc": "中继插件，把本机网页界面通过托管端点暴露出去。 包名 dshost-plugin，当前版本 0.1.25。",
      "h1": "dshost-plugin",
      "cite": "中继插件，把本机网页界面通过托管端点暴露出去。",
      "lead": [
        "当前版本 0.1.25，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dshost-plugin"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 NoelJudeNoel，仓库 https://github.com/NoelJudeNoel/dshost-plugin，包页 https://www.npmjs.com/package/dshost-plugin。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dshost-plugin`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "design-panel",
    "owner": "alibaba-damo-academy",
    "pkg": "@yugoo-design/dsh-design-panel",
    "group": "output",
    "version": "0.3.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/alibaba-damo-academy/yugoo-design",
    "npm": "https://www.npmjs.com/package/@yugoo-design/dsh-design-panel",
    "compat": "",
    "peers": 8,
    "install": "dsh plugin --profile web add @yugoo-design/dsh-design-panel",
    "en": {
      "title": "@yugoo-design/dsh-design-panel for DeepSeek Harness — Rich output",
      "desc": "Renders design files as editable panels inside the web UI. Published as @yugoo-design/dsh-design-panel, version 0.3.0.",
      "h1": "@yugoo-design/dsh-design-panel",
      "cite": "Renders design files as editable panels inside the web UI.",
      "lead": [
        "Version 0.3.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @yugoo-design/dsh-design-panel"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 8 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: alibaba-damo-academy. Repository: https://github.com/alibaba-damo-academy/yugoo-design. Package page: https://www.npmjs.com/package/@yugoo-design/dsh-design-panel."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @yugoo-design/dsh-design-panel`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@yugoo-design/dsh-design-panel — DeepSeek Harness 富输出",
      "desc": "把设计文件渲染成可编辑面板，直接在界面里改。 包名 @yugoo-design/dsh-design-panel，当前版本 0.3.0。",
      "h1": "@yugoo-design/dsh-design-panel",
      "cite": "把设计文件渲染成可编辑面板，直接在界面里改。",
      "lead": [
        "当前版本 0.3.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @yugoo-design/dsh-design-panel"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 8 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 alibaba-damo-academy，仓库 https://github.com/alibaba-damo-academy/yugoo-design，包页 https://www.npmjs.com/package/@yugoo-design/dsh-design-panel。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @yugoo-design/dsh-design-panel`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-api-remotes",
      "@deepseek-ai/dsh-client-ui-tool",
      "@deepseek-ai/dsh-client-ui-slots",
      "@deepseek-ai/dsh-typert-protocol",
      "@deepseek-ai/dsh-client-ui-session",
      "@deepseek-ai/dsh-api-session-controller",
      "@deepseek-ai/dsh-client-ui-conversation"
    ]
  },
  {
    "slug": "codegraph",
    "owner": "xuanyuanchumo",
    "pkg": "dsh-codegraph-visualizer",
    "group": "output",
    "version": "0.3.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/xuanyuanchumo/dsh-codegraph-visualizer",
    "npm": "https://www.npmjs.com/package/dsh-codegraph-visualizer",
    "compat": ">=0.2.0-rc.2 <0.3.0 || >=0.3.0-0 <0.4.0-0",
    "peers": 4,
    "install": "dsh plugin --profile web add dsh-codegraph-visualizer",
    "en": {
      "title": "dsh-codegraph-visualizer for DeepSeek Harness — Rich output",
      "desc": "Turns code-graph data into an interactive map you can click through. Published as dsh-codegraph-visualizer, version 0.3.1.",
      "h1": "dsh-codegraph-visualizer",
      "cite": "Turns code-graph data into an interactive map you can click through.",
      "lead": [
        "Version 0.3.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-codegraph-visualizer"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.2 <0.3.0 || >=0.3.0-0 <0.4.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-rc.2 <0.3.0 || >=0.3.0-0 <0.4.0-0. peers: 4 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: xuanyuanchumo. Repository: https://github.com/xuanyuanchumo/dsh-codegraph-visualizer. Package page: https://www.npmjs.com/package/dsh-codegraph-visualizer."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-codegraph-visualizer`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-codegraph-visualizer — DeepSeek Harness 富输出",
      "desc": "把代码图谱数据变成可点的交互图。 包名 dsh-codegraph-visualizer，当前版本 0.3.1。",
      "h1": "dsh-codegraph-visualizer",
      "cite": "把代码图谱数据变成可点的交互图。",
      "lead": [
        "当前版本 0.3.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-codegraph-visualizer"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.2 <0.3.0 || >=0.3.0-0 <0.4.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-rc.2 <0.3.0 || >=0.3.0-0 <0.4.0-0。peers: 4 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 xuanyuanchumo，仓库 https://github.com/xuanyuanchumo/dsh-codegraph-visualizer，包页 https://www.npmjs.com/package/dsh-codegraph-visualizer。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-codegraph-visualizer`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/schemastery"
    ]
  },
  {
    "slug": "tool-gate",
    "owner": "mzzsfy",
    "pkg": "@mzzsfy/dsh-tool-gate",
    "group": "system",
    "version": "0.2.4",
    "updated": "2026-11-13",
    "repo": "https://github.com/mzzsfy/dsh-plugin",
    "npm": "https://www.npmjs.com/package/@mzzsfy/dsh-tool-gate",
    "compat": "",
    "peers": 4,
    "install": "dsh plugin --profile web add @mzzsfy/dsh-tool-gate",
    "en": {
      "title": "@mzzsfy/dsh-tool-gate for DeepSeek Harness — System and terminal",
      "desc": "Keeps tool definitions out of the request until they are whitelisted, cutting prompt weight. Published as @mzzsfy/dsh-tool-gate, version 0.2.4.",
      "h1": "@mzzsfy/dsh-tool-gate",
      "cite": "Keeps tool definitions out of the request until they are whitelisted, cutting prompt weight.",
      "lead": [
        "Version 0.2.4, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @mzzsfy/dsh-tool-gate"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 4 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: mzzsfy. Repository: https://github.com/mzzsfy/dsh-plugin. Package page: https://www.npmjs.com/package/@mzzsfy/dsh-tool-gate."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @mzzsfy/dsh-tool-gate`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@mzzsfy/dsh-tool-gate — DeepSeek Harness 系统与终端",
      "desc": "工具定义先进白名单才注入请求，砍掉提示里的固定开销。 包名 @mzzsfy/dsh-tool-gate，当前版本 0.2.4。",
      "h1": "@mzzsfy/dsh-tool-gate",
      "cite": "工具定义先进白名单才注入请求，砍掉提示里的固定开销。",
      "lead": [
        "当前版本 0.2.4，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @mzzsfy/dsh-tool-gate"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 4 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 mzzsfy，仓库 https://github.com/mzzsfy/dsh-plugin，包页 https://www.npmjs.com/package/@mzzsfy/dsh-tool-gate。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @mzzsfy/dsh-tool-gate`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-sandbox",
      "@deepseek-ai/schemastery"
    ]
  },
  {
    "slug": "tool-surface",
    "owner": "dale0525",
    "pkg": "@logictan/dsh-tool-surface",
    "group": "system",
    "version": "0.1.3",
    "updated": "2026-11-13",
    "repo": "https://github.com/dale0525/dsh-plugins",
    "npm": "https://www.npmjs.com/package/@logictan/dsh-tool-surface",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add @logictan/dsh-tool-surface",
    "en": {
      "title": "@logictan/dsh-tool-surface for DeepSeek Harness — System and terminal",
      "desc": "Trims the tool list sent with every request to a tested whitelist and moves removed tools’ parameters into the system prompt. Published as @logictan/dsh-tool-surface, version 0.1.3.",
      "h1": "@logictan/dsh-tool-surface",
      "cite": "Trims the tool list sent with every request to a tested whitelist and moves removed tools’ parameters into the system prompt.",
      "lead": [
        "Version 0.1.3, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @logictan/dsh-tool-surface"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: dale0525. Repository: https://github.com/dale0525/dsh-plugins. Package page: https://www.npmjs.com/package/@logictan/dsh-tool-surface."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @logictan/dsh-tool-surface`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@logictan/dsh-tool-surface — DeepSeek Harness 系统与终端",
      "desc": "把每轮随请求发送的工具清单收成白名单，被撤下工具的参数写进系统提示词。 包名 @logictan/dsh-tool-surface，当前版本 0.1.3。",
      "h1": "@logictan/dsh-tool-surface",
      "cite": "把每轮随请求发送的工具清单收成白名单，被撤下工具的参数写进系统提示词。",
      "lead": [
        "当前版本 0.1.3，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @logictan/dsh-tool-surface"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 dale0525，仓库 https://github.com/dale0525/dsh-plugins，包页 https://www.npmjs.com/package/@logictan/dsh-tool-surface。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @logictan/dsh-tool-surface`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "tool-plus",
    "owner": "xiaoso456",
    "pkg": "@xiaoso/dsh-tool-plus",
    "group": "system",
    "version": "0.1.21",
    "updated": "2026-11-13",
    "repo": "https://github.com/xiaoso456/dsh-tool-plus",
    "npm": "https://www.npmjs.com/package/@xiaoso/dsh-tool-plus",
    "compat": ">=0.2.2-0 <0.3.0-0",
    "peers": 16,
    "install": "dsh plugin --profile web add @xiaoso/dsh-tool-plus",
    "en": {
      "title": "@xiaoso/dsh-tool-plus for DeepSeek Harness — System and terminal",
      "desc": "A persistent bash runtime ported from Oh My Pi, exposed as DSH tools. Published as @xiaoso/dsh-tool-plus, version 0.1.21.",
      "h1": "@xiaoso/dsh-tool-plus",
      "cite": "A persistent bash runtime ported from Oh My Pi, exposed as DSH tools.",
      "lead": [
        "Version 0.1.21, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @xiaoso/dsh-tool-plus"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-0 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-0 <0.3.0-0. peers: 16 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: xiaoso456. Repository: https://github.com/xiaoso456/dsh-tool-plus. Package page: https://www.npmjs.com/package/@xiaoso/dsh-tool-plus."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @xiaoso/dsh-tool-plus`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@xiaoso/dsh-tool-plus — DeepSeek Harness 系统与终端",
      "desc": "把 Oh My Pi 的常驻 bash 运行时移植过来，做成 DSH 工具。 包名 @xiaoso/dsh-tool-plus，当前版本 0.1.21。",
      "h1": "@xiaoso/dsh-tool-plus",
      "cite": "把 Oh My Pi 的常驻 bash 运行时移植过来，做成 DSH 工具。",
      "lead": [
        "当前版本 0.1.21，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @xiaoso/dsh-tool-plus"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-0 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-0 <0.3.0-0。peers: 16 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 xiaoso456，仓库 https://github.com/xiaoso456/dsh-tool-plus，包页 https://www.npmjs.com/package/@xiaoso/dsh-tool-plus。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @xiaoso/dsh-tool-plus`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-fs",
      "@deepseek-ai/dsh-llm",
      "@deepseek-ai/dsh-jobs",
      "@deepseek-ai/dsh-agent",
      "@deepseek-ai/dsh-shell",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-sandbox",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/dsh-settings",
      "@deepseek-ai/dsh-shell-env",
      "@deepseek-ai/dsh-attachment",
      "@deepseek-ai/dsh-agent-preset",
      "@deepseek-ai/dsh-system-prompt",
      "@deepseek-ai/dsh-client-connection",
      "@deepseek-ai/dsh-agent-preset-registry"
    ]
  },
  {
    "slug": "octop-memory",
    "owner": "ArvinQi",
    "pkg": "dsh-octop-memory",
    "group": "memory",
    "version": "0.1.7",
    "updated": "2026-11-13",
    "repo": "https://github.com/ArvinQi/dsh-octop-memory",
    "npm": "https://www.npmjs.com/package/dsh-octop-memory",
    "compat": "",
    "peers": 1,
    "install": "dsh plugin --profile web add dsh-octop-memory",
    "en": {
      "title": "dsh-octop-memory for DeepSeek Harness — Memory",
      "desc": "Recalls shared memory before each turn and writes new facts back after. Published as dsh-octop-memory, version 0.1.7.",
      "h1": "dsh-octop-memory",
      "cite": "Recalls shared memory before each turn and writes new facts back after.",
      "lead": [
        "Version 0.1.7, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-octop-memory"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: ArvinQi. Repository: https://github.com/ArvinQi/dsh-octop-memory. Package page: https://www.npmjs.com/package/dsh-octop-memory."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-octop-memory`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-octop-memory — DeepSeek Harness 记忆",
      "desc": "每轮开始前召回共享记忆，结束后把新事实写回去。 包名 dsh-octop-memory，当前版本 0.1.7。",
      "h1": "dsh-octop-memory",
      "cite": "每轮开始前召回共享记忆，结束后把新事实写回去。",
      "lead": [
        "当前版本 0.1.7，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-octop-memory"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 ArvinQi，仓库 https://github.com/ArvinQi/dsh-octop-memory，包页 https://www.npmjs.com/package/dsh-octop-memory。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-octop-memory`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/dsh"
    ]
  },
  {
    "slug": "config-sync",
    "owner": "Dreamaniax",
    "pkg": "dsh-syn-config",
    "group": "system",
    "version": "0.8.11",
    "updated": "2026-11-13",
    "repo": "https://github.com/Dreamaniax/dsh-syn-config",
    "npm": "https://www.npmjs.com/package/dsh-syn-config",
    "compat": ">=0.2.2-rc.1 <0.3.0-0",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-syn-config",
    "en": {
      "title": "dsh-syn-config for DeepSeek Harness — System and terminal",
      "desc": "Syncs DSH config — skills, prompts and settings — between macOS and Windows. Published as dsh-syn-config, version 0.8.11.",
      "h1": "dsh-syn-config",
      "cite": "Syncs DSH config — skills, prompts and settings — between macOS and Windows.",
      "lead": [
        "Version 0.8.11, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-syn-config"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0-0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Dreamaniax. Repository: https://github.com/Dreamaniax/dsh-syn-config. Package page: https://www.npmjs.com/package/dsh-syn-config."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-syn-config`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-syn-config — DeepSeek Harness 系统与终端",
      "desc": "在 macOS 与 Windows 之间同步 DSH 配置：技能、提示词、设置。 包名 dsh-syn-config，当前版本 0.8.11。",
      "h1": "dsh-syn-config",
      "cite": "在 macOS 与 Windows 之间同步 DSH 配置：技能、提示词、设置。",
      "lead": [
        "当前版本 0.8.11，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-syn-config"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0-0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Dreamaniax，仓库 https://github.com/Dreamaniax/dsh-syn-config，包页 https://www.npmjs.com/package/dsh-syn-config。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-syn-config`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "plugin-updater",
    "owner": "Mooling0602",
    "pkg": "dsh-better-plugin-updater",
    "group": "find-plugins",
    "version": "0.1.2",
    "updated": "2026-11-13",
    "repo": "https://github.com/Mooling0602/dsh-better-plugin-updater",
    "npm": "https://www.npmjs.com/package/dsh-better-plugin-updater",
    "compat": ">=0.2.1-rc.4 <0.3.0",
    "peers": 1,
    "install": "dsh plugin --profile web add dsh-better-plugin-updater",
    "en": {
      "title": "dsh-better-plugin-updater for DeepSeek Harness — Find and install plugins",
      "desc": "Manual multi-source update checks with a plan you approve before anything changes. Published as dsh-better-plugin-updater, version 0.1.2.",
      "h1": "dsh-better-plugin-updater",
      "cite": "Manual multi-source update checks with a plan you approve before anything changes.",
      "lead": [
        "Version 0.1.2, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-better-plugin-updater"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-rc.4 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-rc.4 <0.3.0. peers: 1 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Mooling0602. Repository: https://github.com/Mooling0602/dsh-better-plugin-updater. Package page: https://www.npmjs.com/package/dsh-better-plugin-updater."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-better-plugin-updater`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-better-plugin-updater — DeepSeek Harness 找插件、装插件",
      "desc": "手动多源检查插件更新，先给方案，确认了才改。 包名 dsh-better-plugin-updater，当前版本 0.1.2。",
      "h1": "dsh-better-plugin-updater",
      "cite": "手动多源检查插件更新，先给方案，确认了才改。",
      "lead": [
        "当前版本 0.1.2，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-better-plugin-updater"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-rc.4 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-rc.4 <0.3.0。peers: 1 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Mooling0602，仓库 https://github.com/Mooling0602/dsh-better-plugin-updater，包页 https://www.npmjs.com/package/dsh-better-plugin-updater。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-better-plugin-updater`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis"
    ]
  },
  {
    "slug": "whiteboard-skill",
    "owner": "JimLiu",
    "pkg": "dsh-claude-whiteboard",
    "group": "output",
    "version": "2.16.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/JimLiu/baoyu-design",
    "npm": "https://www.npmjs.com/package/dsh-claude-whiteboard",
    "compat": ">=0.2.0-0",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-claude-whiteboard",
    "en": {
      "title": "dsh-claude-whiteboard for DeepSeek Harness — Rich output",
      "desc": "The claude-whiteboard skill: the agent lays content out as a whiteboard instead of prose. Published as dsh-claude-whiteboard, version 2.16.0.",
      "h1": "dsh-claude-whiteboard",
      "cite": "The claude-whiteboard skill: the agent lays content out as a whiteboard instead of prose.",
      "lead": [
        "Version 2.16.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-claude-whiteboard"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: JimLiu. Repository: https://github.com/JimLiu/baoyu-design. Package page: https://www.npmjs.com/package/dsh-claude-whiteboard."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-claude-whiteboard`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-claude-whiteboard — DeepSeek Harness 富输出",
      "desc": "claude-whiteboard 技能：让 agent 把内容排成白板，而不是写成长段文字。 包名 dsh-claude-whiteboard，当前版本 2.16.0。",
      "h1": "dsh-claude-whiteboard",
      "cite": "claude-whiteboard 技能：让 agent 把内容排成白板，而不是写成长段文字。",
      "lead": [
        "当前版本 2.16.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-claude-whiteboard"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 JimLiu，仓库 https://github.com/JimLiu/baoyu-design，包页 https://www.npmjs.com/package/dsh-claude-whiteboard。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-claude-whiteboard`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "motion-skill",
    "owner": "JimLiu",
    "pkg": "dsh-claude-motion",
    "group": "appearance",
    "version": "2.16.0",
    "updated": "2026-11-13",
    "repo": "https://github.com/JimLiu/baoyu-design",
    "npm": "https://www.npmjs.com/package/dsh-claude-motion",
    "compat": ">=0.2.0-0",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-claude-motion",
    "en": {
      "title": "dsh-claude-motion for DeepSeek Harness — Looks and themes",
      "desc": "The claude-motion skill: the agent writes short motion specs instead of static descriptions. Published as dsh-claude-motion, version 2.16.0.",
      "h1": "dsh-claude-motion",
      "cite": "The claude-motion skill: the agent writes short motion specs instead of static descriptions.",
      "lead": [
        "Version 2.16.0, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-claude-motion"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.0-0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: JimLiu. Repository: https://github.com/JimLiu/baoyu-design. Package page: https://www.npmjs.com/package/dsh-claude-motion."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-claude-motion`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-claude-motion — DeepSeek Harness 界面与外观",
      "desc": "claude-motion 技能：让 agent 输出动效规格，而不是静态描述。 包名 dsh-claude-motion，当前版本 2.16.0。",
      "h1": "dsh-claude-motion",
      "cite": "claude-motion 技能：让 agent 输出动效规格，而不是静态描述。",
      "lead": [
        "当前版本 2.16.0，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-claude-motion"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.0-0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 JimLiu，仓库 https://github.com/JimLiu/baoyu-design，包页 https://www.npmjs.com/package/dsh-claude-motion。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-claude-motion`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "daily-reports",
    "owner": "artaniszhou",
    "pkg": "dsh-atan-daily",
    "group": "automation",
    "version": "1.2.2",
    "updated": "2026-11-13",
    "repo": "https://github.com/artaniszhou/dsh-atan-daily",
    "npm": "https://www.npmjs.com/package/dsh-atan-daily",
    "compat": ">=0.2.1-0 <0.3.0",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-atan-daily",
    "en": {
      "title": "dsh-atan-daily for DeepSeek Harness — Scheduled automation",
      "desc": "Scheduled collection tasks that each file a timestamped report. Published as dsh-atan-daily, version 1.2.2.",
      "h1": "dsh-atan-daily",
      "cite": "Scheduled collection tasks that each file a timestamped report.",
      "lead": [
        "Version 1.2.2, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-atan-daily"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.1-0 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.1-0 <0.3.0. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: artaniszhou. Repository: https://github.com/artaniszhou/dsh-atan-daily. Package page: https://www.npmjs.com/package/dsh-atan-daily."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-atan-daily`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-atan-daily — DeepSeek Harness 定时自动化",
      "desc": "定时采集任务，每跑一次落一份带时间戳的报告。 包名 dsh-atan-daily，当前版本 1.2.2。",
      "h1": "dsh-atan-daily",
      "cite": "定时采集任务，每跑一次落一份带时间戳的报告。",
      "lead": [
        "当前版本 1.2.2，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-atan-daily"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.1-0 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.1-0 <0.3.0。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 artaniszhou，仓库 https://github.com/artaniszhou/dsh-atan-daily，包页 https://www.npmjs.com/package/dsh-atan-daily。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-atan-daily`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "ue-asset",
    "owner": "Sumcam-L",
    "pkg": "dsh-ue-asset",
    "group": "data",
    "version": "0.1.10",
    "updated": "2026-11-13",
    "repo": "https://github.com/Sumcam-L/dsh-ue-asset",
    "npm": "https://www.npmjs.com/package/dsh-ue-asset",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add dsh-ue-asset",
    "en": {
      "title": "dsh-ue-asset for DeepSeek Harness — Databases and assets",
      "desc": "Browse, preview and export Unreal Engine 4/5 assets from local pak files. Published as dsh-ue-asset, version 0.1.10.",
      "h1": "dsh-ue-asset",
      "cite": "Browse, preview and export Unreal Engine 4/5 assets from local pak files.",
      "lead": [
        "Version 0.1.10, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-ue-asset"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it.",
            "engines.dsh: not declared. peers: none declared."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: Sumcam-L. Repository: https://github.com/Sumcam-L/dsh-ue-asset. Package page: https://www.npmjs.com/package/dsh-ue-asset."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove dsh-ue-asset`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "dsh-ue-asset — DeepSeek Harness 数据库与资产",
      "desc": "浏览、预览、导出本地 pak 里的 Unreal Engine 4/5 资产。 包名 dsh-ue-asset，当前版本 0.1.10。",
      "h1": "dsh-ue-asset",
      "cite": "浏览、预览、导出本地 pak 里的 Unreal Engine 4/5 资产。",
      "lead": [
        "当前版本 0.1.10，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-ue-asset"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。",
            "engines.dsh: not declared。peers: none declared。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 Sumcam-L，仓库 https://github.com/Sumcam-L/dsh-ue-asset，包页 https://www.npmjs.com/package/dsh-ue-asset。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove dsh-ue-asset`，和装的时候对称。"
        }
      ]
    },
    "peerNames": []
  },
  {
    "slug": "teamflow",
    "owner": "xirang-ai",
    "pkg": "@xirang-ai/dsh-teamflow",
    "group": "agents",
    "version": "0.1.3",
    "updated": "2026-11-13",
    "repo": "https://github.com/xirang-ai/dsh-teamflow",
    "npm": "https://www.npmjs.com/package/@xirang-ai/dsh-teamflow",
    "compat": ">=0.2.2-rc.1 <0.3.0",
    "peers": 7,
    "install": "dsh plugin --profile web add @xirang-ai/dsh-teamflow",
    "en": {
      "title": "@xirang-ai/dsh-teamflow for DeepSeek Harness — Multiple agents",
      "desc": "A workbench for the requirement → development → defect pipeline across a team. Published as @xirang-ai/dsh-teamflow, version 0.1.3.",
      "h1": "@xirang-ai/dsh-teamflow",
      "cite": "A workbench for the requirement → development → defect pipeline across a team.",
      "lead": [
        "Version 0.1.3, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @xirang-ai/dsh-teamflow"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.2-rc.1 <0.3.0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting.",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0. peers: 7 official packages."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below; it names the official package or the community plugin it collides with."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: xirang-ai. Repository: https://github.com/xirang-ai/dsh-teamflow. Package page: https://www.npmjs.com/package/@xirang-ai/dsh-teamflow."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "How do I remove it again?",
          "a": "Use `dsh plugin --profile web remove @xirang-ai/dsh-teamflow`, the mirror of the install command."
        }
      ]
    },
    "zh": {
      "title": "@xirang-ai/dsh-teamflow — DeepSeek Harness 多 agent 协作",
      "desc": "把需求、开发、缺陷这条流水线做成团队工作台。 包名 @xirang-ai/dsh-teamflow，当前版本 0.1.3。",
      "h1": "@xirang-ai/dsh-teamflow",
      "cite": "把需求、开发、缺陷这条流水线做成团队工作台。",
      "lead": [
        "当前版本 0.1.3，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @xirang-ai/dsh-teamflow"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.2-rc.1 <0.3.0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。",
            "engines.dsh: >=0.2.2-rc.1 <0.3.0。peers: 7 official packages。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条，它点名了会撞的官方包或社区插件。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 xirang-ai，仓库 https://github.com/xirang-ai/dsh-teamflow，包页 https://www.npmjs.com/package/@xirang-ai/dsh-teamflow。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        },
        {
          "q": "装坏了怎么退？",
          "a": "用 `dsh plugin --profile web remove @xirang-ai/dsh-teamflow`，和装的时候对称。"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-tools",
      "@deepseek-ai/dsh-session",
      "@deepseek-ai/dsh-home-paths",
      "@deepseek-ai/dsh-user-approval",
      "@deepseek-ai/dsh-sandbox-policy",
      "@deepseek-ai/dsh-typert-protocol"
    ]
  },
  {
    "slug": "mnemon",
    "owner": "omdsh-dev",
    "pkg": "dsh-mnemon",
    "group": "memory",
    "version": "0.5.45",
    "updated": "2026-11-12",
    "repo": "https://github.com/omdsh-dev/dsh-mnemon",
    "npm": "https://www.npmjs.com/package/dsh-mnemon",
    "compat": ">=0.2.0-rc.2 <0.2.1-0 || >=0.2.1-rc.1 <0.3.0-0",
    "peers": 3,
    "install": "dsh plugin --profile web add dsh-mnemon",
    "en": {
      "title": "dsh-mnemon for DeepSeek Harness — Memory",
      "desc": "Composable, view-based context: what the model sees is assembled from views you can swap, instead of one growing transcript. Published as dsh-mnemon, version 0.5.45.",
      "h1": "dsh-mnemon",
      "cite": "Composable, view-based context: what the model sees is assembled from views you can swap, instead of one growing transcript.",
      "lead": [
        "Version 0.5.45, last published 2026-11-12. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add dsh-mnemon"
        },
        {
          "h": "Compatibility",
          "p": [
            "`engines.dsh` declares `>=0.2.0-rc.2 <0.2.1-0 || >=0.2.1-rc.1 <0.3.0-0`. Outside that range the CLI skips the plugin and prints the requirement instead of booting."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: omdsh-dev. Repository: https://github.com/omdsh-dev/dsh-mnemon. Package page: https://www.npmjs.com/package/dsh-mnemon."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        }
      ]
    },
    "zh": {
      "title": "dsh-mnemon — DeepSeek Harness 记忆",
      "desc": "可组合的视图式上下文：模型看到的由可替换的视图拼出来，而不是一份不断变长的对话记录。 包名 dsh-mnemon，当前版本 0.5.45。",
      "h1": "dsh-mnemon",
      "cite": "可组合的视图式上下文：模型看到的由可替换的视图拼出来，而不是一份不断变长的对话记录。",
      "lead": [
        "当前版本 0.5.45，最后发布 2026-11-12。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add dsh-mnemon"
        },
        {
          "h": "兼容区间",
          "p": [
            "`engines.dsh` 声明的是 `>=0.2.0-rc.2 <0.2.1-0 || >=0.2.1-rc.1 <0.3.0-0`。超出这个区间，命令行会跳过它并打印要求，不会带着跑。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 omdsh-dev，仓库 https://github.com/omdsh-dev/dsh-mnemon，包页 https://www.npmjs.com/package/dsh-mnemon。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        }
      ]
    },
    "peerNames": [
      "@deepseek-ai/cordis",
      "@deepseek-ai/dsh-app-boot",
      "@deepseek-ai/dsh-typert-protocol"
    ]
  },
  {
    "slug": "imagegen",
    "owner": "dickpy",
    "pkg": "@dickpy/dsh-imagegen",
    "group": "output",
    "version": "1.17.1",
    "updated": "2026-11-13",
    "repo": "https://github.com/dickpy/dsh-imagegen",
    "npm": "https://www.npmjs.com/package/@dickpy/dsh-imagegen",
    "compat": "",
    "peers": 0,
    "install": "dsh plugin --profile web add @dickpy/dsh-imagegen",
    "en": {
      "title": "@dickpy/dsh-imagegen for DeepSeek Harness — Rich output",
      "desc": "Text-to-image and image-to-image inside the web client, through a configured image provider. Published as @dickpy/dsh-imagegen, version 1.17.1.",
      "h1": "@dickpy/dsh-imagegen",
      "cite": "Text-to-image and image-to-image inside the web client, through a configured image provider.",
      "lead": [
        "Version 1.17.1, last published 2026-11-13. Install command and compatibility come from the package manifest."
      ],
      "sections": [
        {
          "h": "Install",
          "p": [
            "Plugin management forwards to pnpm inside the profile directory."
          ],
          "code": "dsh plugin --profile web add @dickpy/dsh-imagegen"
        },
        {
          "h": "Compatibility",
          "p": [
            "No `engines.dsh` range is declared, so the CLI cannot pre-check compatibility. Read the npm page before you install it."
          ]
        },
        {
          "h": "If two plugins fight",
          "p": [
            "See the note below."
          ]
        },
        {
          "h": "Who made it",
          "p": [
            "Author: dickpy. Repository: https://github.com/dickpy/dsh-imagegen. Package page: https://www.npmjs.com/package/@dickpy/dsh-imagegen."
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        }
      ]
    },
    "zh": {
      "title": "@dickpy/dsh-imagegen — DeepSeek Harness 富输出",
      "desc": "在网页客户端里做文生图与图生图，走你配好的图片服务商。 包名 @dickpy/dsh-imagegen，当前版本 1.17.1。",
      "h1": "@dickpy/dsh-imagegen",
      "cite": "在网页客户端里做文生图与图生图，走你配好的图片服务商。",
      "lead": [
        "当前版本 1.17.1，最后发布 2026-11-13。安装命令与兼容区间取自包声明本身。"
      ],
      "sections": [
        {
          "h": "安装",
          "p": [
            "插件管理会把参数转发给 profile 目录里的 pnpm。"
          ],
          "code": "dsh plugin --profile web add @dickpy/dsh-imagegen"
        },
        {
          "h": "兼容区间",
          "p": [
            "没有声明 `engines.dsh` 区间，命令行无法预检兼容性，装之前先看 npm 页。"
          ]
        },
        {
          "h": "两个插件打架时",
          "p": [
            "看下面这条。"
          ]
        },
        {
          "h": "作者与仓库",
          "p": [
            "作者 dickpy，仓库 https://github.com/dickpy/dsh-imagegen，包页 https://www.npmjs.com/package/@dickpy/dsh-imagegen。"
          ]
        }
      ],
      "faq": [
        {
          "q": "placeholder",
          "a": "placeholder"
        }
      ]
    },
    "peerNames": []
  }
];


const BY_SLUG = new Map(COMMUNITY.map((p) => [p.owner + '/' + p.slug, p]));

export function communityPage(slug) {
  const page = BY_SLUG.get(slug);
  if (!page) return null;
  const note = ALL_CONFLICTS[slug] ?? null;
  const pair = pairFor(page.pkg, 'en');
  return renderCommunityPage(page, note, pair, slug);
}

export function communityByGroup() {
  return COMMUNITY_GROUPS.map((g) => ({
    ...g,
    items: COMMUNITY.filter((p) => p.group === g.id),
  })).filter((g) => g.items.length > 0);
}
