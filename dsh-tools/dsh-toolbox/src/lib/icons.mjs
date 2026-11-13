// 工具图标：24×24 线性，stroke 用 currentColor，不填色。
// 参照竞品做法——图标是卡片里唯一的强调元素，保持单色比彩色更耐看。
export const ICONS = {
  'sync-hub': '<path d="M4 9h11a4 4 0 0 1 0 8H9"/><path d="M7 6 4 9l3 3"/><path d="M20 15H9a4 4 0 0 1 0-8h6"/><path d="M17 18l3-3-3-3"/>',
  'zstd-frame-inspector': '<rect x="3" y="4" width="18" height="5" rx="1.5"/><rect x="3" y="11" width="18" height="5" rx="1.5"/><path d="M3 19h18"/>',
  'context-budget': '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><path d="M4 20h16"/>',
  'session-index-doctor': '<path d="M4 5h10"/><path d="M4 11h7"/><path d="M4 17h5"/><circle cx="17" cy="16" r="4"/><path d="M20 19l2 2"/>',
  'skill-load-audit': '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  'deai-kit': '<path d="M4 6h10"/><path d="M4 12h8"/><path d="M4 18h6"/><path d="M15 15l3 3 5-5"/>',
};

export const iconFor = (slug) =>
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[slug] ?? ICONS['deai-kit']}</svg>`;
