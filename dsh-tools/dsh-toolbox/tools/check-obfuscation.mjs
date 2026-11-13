import fs from 'node:fs';

const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const cacheBust = `?v=${Date.now()}`;

const results = [];
let affected = 0;
let candidates = 0;

for (const u of urls) {
  const res = await fetch(u + cacheBust, { headers: { 'cache-control': 'no-cache' } });
  const html = await res.text();
  const obf = /\[email[^\]]{0,12}protected\]/.test(html) || html.includes('cdn-cgi/l/email-protection');
  const hasAt = html.includes('@deepseek-ai/');
  if (obf) affected += 1;
  if (hasAt) candidates += 1;
  results.push({ url: u.replace('https://www.dshtoolbox.com', ''), status: res.status, obf, hasAt });
}

const bad = results.filter((r) => r.obf || r.status !== 200);
console.log('检查页面数:', results.length);
console.log('仍带邮箱混淆的页面:', affected);
console.log('含 @deepseek-ai/ 的页面（原本有风险的）:', candidates);
if (bad.length) bad.slice(0, 12).forEach((r) => console.log(' 异常', r.url, r.status, 'obf=', r.obf));
else console.log('全部 200，且无混淆标记');
fs.writeFileSync('docs/obfuscation-check.json', JSON.stringify(results, null, 2));
