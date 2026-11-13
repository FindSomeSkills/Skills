// 行内代码：把 `x` 变成 <code>x</code>，同时转义 HTML，避免内容被当成标签。
export function inline(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
