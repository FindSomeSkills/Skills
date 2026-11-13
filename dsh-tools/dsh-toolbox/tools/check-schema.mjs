// 结构化数据自检：解析每个页面的 JSON-LD，检查必填字段
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const REQUIRED = {
  WebSite: ['url', 'name'],
  Organization: ['name', 'url'],
  WebApplication: ['name', 'url', 'applicationCategory'],
  SoftwareApplication: ['name', 'url'],
  FAQPage: ['mainEntity'],
  HowTo: ['name', 'step'],
  BreadcrumbList: ['itemListElement'],
  ItemList: ['itemListElement'],
};

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === 'index.html' || e.name === '404.html') files.push(full);
  }
})(DIST);

let errors = 0;
let objects = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) { console.log(`${file}: 没有 JSON-LD`); continue; }
  for (const [, raw] of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch (e) { errors += 1; console.log(`${file}: JSON 解析失败 — ${e.message}`); continue; }
    const graph = data['@graph'] ?? (Array.isArray(data) ? data : [data]);
    for (const node of graph) {
      objects += 1;
      const type = node['@type'];
      if (!type) { errors += 1; console.log(`${file}: 节点缺 @type`); continue; }
      const req = REQUIRED[type];
      if (!req) continue;
      for (const key of req) {
        const v = node[key];
        const empty = v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
        if (empty) { errors += 1; console.log(`${file}: ${type} 缺 ${key}`); }
      }
    }
  }
}

console.log(`\n检查 ${files.length} 个页面，${objects} 个节点，问题 ${errors} 处`);
process.exit(errors ? 1 : 0);
