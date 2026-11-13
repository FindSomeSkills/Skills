// 内链深度（按语言各自的首页计）+ hreflang 三向自检
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === 'index.html') files.push(full);
  }
})(DIST);

const urlOf = (file) =>
  '/' + file.replace(/^dist[\\/]/, '').replace(/\\/g, '/').replace(/index\.html$/, '');

const pages = new Map();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const links = new Set();
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/')) continue;
    if (href.startsWith('/_astro/')) continue;
    links.add(href.split('#')[0].split('?')[0]);
  }
  pages.set(urlOf(file), { links, html });
}

const norm = (u) => (u.endsWith('/') ? u : `${u}/`);

function bfs(start) {
  const depth = new Map([[start, 0]]);
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift();
    const node = pages.get(cur);
    if (!node) continue;
    for (const raw of node.links) {
      const t = norm(raw);
      if (!pages.has(t) || depth.has(t)) continue;
      depth.set(t, depth.get(cur) + 1);
      queue.push(t);
    }
  }
  return depth;
}

const enDepth = bfs('/');
const zhDepth = bfs('/zh/');

let worst = 0;
const problems = [];
for (const url of pages.keys()) {
  const isZh = url === '/zh/' || url.startsWith('/zh/');
  const d = isZh ? zhDepth.get(url) : enDepth.get(url);
  if (d === undefined) { problems.push(`不可达 ${url}`); continue; }
  worst = Math.max(worst, d);
  if (d > 2) problems.push(`${url} 距离其语言首页 ${d} 跳`);
}

console.log(`页面 ${pages.size} 个；英文从 / 出发、中文从 /zh/ 出发计算跳数`);
console.log(`最深 ${worst} 跳`);
problems.slice(0, 12).forEach((p) => console.log(' ', p));
if (!problems.length) console.log('全部页面 ≤2 跳');

// hreflang
let bad = 0;
for (const [url, node] of pages) {
  const tags = [...node.html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
  const ok = ['en', 'zh-Hans', 'x-default'].every((l) => tags.includes(l));
  if (!ok) { bad += 1; console.log('hreflang 不全:', url, tags.join(',')); }
}
console.log(`hreflang 不完整页面: ${bad}`);
process.exit(problems.length || bad ? 1 : 0);
