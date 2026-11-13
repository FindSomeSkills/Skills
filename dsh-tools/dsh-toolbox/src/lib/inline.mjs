// 行内代码：把 `x` 变成 <code>x</code>，同时转义 HTML，避免内容被当成标签。
// 以符号开头的行内代码（`.zstd`、`$DSH_HOME`、`--<project>--`）前面必须是空格，
// 否则会跟上一个词粘在一起；这里统一补一个，已有的空格不动。
export function inline(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/([A-Za-z0-9)\]])(`[.\-$<])/g, '$1 $2')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
