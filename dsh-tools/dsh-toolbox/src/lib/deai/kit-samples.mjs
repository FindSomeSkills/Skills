// 页面示例数据。放 .mjs 里是为了不被 deai ui 自己扫到——
// 示例代码故意包含违规写法，那是演示用的数据，不是站点样式。
export const SAMPLE_TEXT = {
  en: 'First we scope it, then we split it, finally we ship it.\n\nWe leverage a closed loop to enable 45% faster delivery.\n\nIt is not only faster but more robust and cheaper.',
  zh: '首先梳理需求，其次拆任务，最后排期。\n\n通过赋能业务闭环，实现全方位助力，效率提升 45%。\n\n这个方案不仅更快，而且更稳，更省钱。',
};

export const SAMPLE_UI = [
  '.hero {',
  '  background: linear-gradient(135deg, #6d5efc 0%, #2f8fff 100%);',
  '  padding: 14px 18px;',
  '}',
  '.title { -webkit-background-clip: text; color: transparent; }',
  '.nav { backdrop-filter: blur(12px); }',
  '.card { box-shadow: 0 8px 32px rgba(109,94,252,0.45); }',
  '<p class="price">$123,456</p>',
].join('\n');
