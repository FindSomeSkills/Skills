import fs from 'node:fs';

const community = fs.readFileSync('src/lib/content-community.mjs', 'utf8');
const arrStart = community.indexOf('export const COMMUNITY = ');
const arrBegin = community.indexOf('[', arrStart);
const arrEnd = community.indexOf('\n];', arrBegin);
const entries = JSON.parse(community.slice(arrBegin, arrEnd + 2));

const official = fs.readFileSync('src/lib/content-plugins.mjs', 'utf8');
const officialPkgs = [...official.matchAll(/pkg: '(@deepseek-ai\/[^']+)'/g)].map((m) => m[1]);

const all = [...new Set([...officialPkgs, ...entries.map((e) => e.pkg)])];
const out = {};

for (const pkg of all) {
  try {
    const m = await (await fetch(`https://registry.npmjs.org/${pkg.replace('/', '%2F')}`)).json();
    const created = m.time?.created;
    if (created) out[pkg] = created.slice(0, 10);
  } catch {
    // 拉不到就不写，结构化数据里会省略这个字段
  }
}

fs.writeFileSync('docs/pkg-created.json', JSON.stringify(out, null, 2));
console.log('拿到首次发布日:', Object.keys(out).length, '/', all.length);
console.log('样例:', Object.entries(out).slice(0, 5).map(([k, v]) => `${k}=${v}`).join(', '));
