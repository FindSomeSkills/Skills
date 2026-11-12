// UI 规则的正例与反例。bad 必须命中且只命中 expect；good 必须零命中。
export const uiCases = [
  {
    name: 'UI-001 紫蓝渐变',
    file: 'a.css',
    expect: ['UI-001'],
    src: '.hero { background: linear-gradient(135deg, #6d5efc 0%, #2f8fff 100%); }',
  },
  {
    name: 'UI-002 渐变文字',
    file: 'b.css',
    expect: ['UI-002'],
    src: '.title { -webkit-background-clip: text; color: transparent; }',
  },
  {
    name: 'UI-003 玻璃拟态',
    file: 'c.css',
    expect: ['UI-003'],
    src: '.nav { backdrop-filter: blur(12px); background: rgba(255,255,255,0.6); }',
  },
  {
    name: 'UI-004 彩色发光阴影',
    file: 'd.css',
    expect: ['UI-004'],
    src: '.card { box-shadow: 0 8px 32px rgba(109,94,252,0.45); }',
  },
  {
    name: 'UI-005 按钮里的 emoji',
    file: 'e.html',
    expect: ['UI-005'],
    src: '<button class="btn">🚀 开始使用</button>',
  },
  {
    name: 'UI-006 间距 14px',
    file: 'f.css',
    expect: ['UI-006'],
    src: '.row { padding: 14px 20px; }',
  },
  {
    name: 'UI-007 假价格',
    file: 'g.html',
    expect: ['UI-007'],
    src: '<p class="price">$123,456</p>',
  },
  {
    name: 'UI-008 首屏三按钮（strict）',
    strict: true,
    file: 'h.html',
    expect: ['UI-008'],
    src: '<header><a class="btn" href="/a">开始</a><a class="btn" href="/b">文档</a><a class="btn" href="/c">价格</a></header><h2>后面</h2>',
  },

  // ---------------- 正例 ----------------
  {
    name: 'GOOD 中性灰渐变',
    file: 'g1.css',
    expect: [],
    src: '.hero { background: linear-gradient(180deg, #0f0f0f, #1c1c1c); }',
  },
  {
    name: 'GOOD background-clip 不是 text',
    file: 'g2.css',
    expect: [],
    src: '.box { background-clip: padding-box; }',
  },
  {
    name: 'GOOD backdrop-filter 关了',
    file: 'g3.css',
    expect: [],
    src: '.nav { backdrop-filter: none; }',
  },
  {
    name: 'GOOD 中性黑阴影',
    file: 'g4.css',
    expect: [],
    src: '.card { box-shadow: 0 8px 32px rgba(0,0,0,0.35); }',
  },
  {
    name: 'GOOD 按钮只有文字',
    file: 'g5.html',
    expect: [],
    src: '<button class="btn">开始使用</button>',
  },
  {
    name: 'GOOD 间距在栅格上',
    file: 'g6.css',
    expect: [],
    src: '.row { padding: 16px 24px; }',
  },
  {
    name: 'GOOD 真实数字',
    file: 'g7.html',
    expect: [],
    src: '<p class="note">本月 12 次构建，2 次失败。</p>',
  },
  {
    name: 'GOOD 单个主操作',
    file: 'g8.html',
    strict: true,
    expect: [],
    src: '<header><a class="btn" href="/start">开始</a></header><h2>后面</h2>',
  },
];
