import fs from 'node:fs';

const community = fs.readFileSync('src/lib/content-community.mjs', 'utf8');
const slugs = [...community.matchAll(/"slug": "([^"]+)",\s*\n\s*"owner": "([^"]+)"/g)].map((m) => `${m[2]}/${m[1]}`);

const have = new Set([
  ...[...fs.readFileSync('src/lib/content-community-conflicts.mjs', 'utf8').matchAll(/^  '([^']+)': \{/gm)].map((m) => m[1]),
  ...[...fs.readFileSync('src/lib/content-community-conflicts-b2.mjs', 'utf8').matchAll(/^  '([^']+)': \{/gm)].map((m) => m[1]),
]);

const missing = slugs.filter((s) => !have.has(s));
const extra = [...have].filter((s) => !slugs.includes(s));
console.log('插件数:', slugs.length, '有冲突说明:', slugs.length - missing.length);
console.log('缺:', missing.join(', ') || '无');
console.log('多出:', extra.join(', ') || '无');
