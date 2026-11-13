import fs from 'node:fs';

const sm = fs.readFileSync('dist/sitemap.xml', 'utf8');
const locs = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const idx = fs.readFileSync('dist/plugins/index.html', 'utf8');
const links = [...new Set([...idx.matchAll(/href="(\/plugins\/[^"]+)"/g)].map((m) => 'https://www.dshtoolbox.com' + m[1]))];
const missing = links.filter((l) => !locs.has(l));

console.log('sitemap 总数:', locs.size);
console.log('sitemap /plugins/ 条数:', [...locs].filter((l) => l.includes('/plugins/')).length);
console.log('octop-memory:', locs.has('https://www.dshtoolbox.com/plugins/ArvinQi/octop-memory/') ? '在' : '不在');
console.log('daily-reports:', locs.has('https://www.dshtoolbox.com/plugins/artaniszhou/daily-reports/') ? '在' : '不在');
console.log('目录页链接数:', links.length, '不在 sitemap:', missing.length);
missing.slice(0, 15).forEach((m) => console.log('  ', m));
