#!/usr/bin/env node
// 清掉 skills 目录里指向不存在目标的链接。只删链接本身，不递归、不碰目标。
// 生成清单后再动手；清单进仓库留档。
import { existsSync, lstatSync, mkdirSync, readdirSync, readlinkSync, realpathSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const root = process.argv[2] ?? join(homedir(), '.dsh', 'skills');
const recordDir = process.argv[3] ?? join(process.cwd(), 'records');

const broken: { name: string; target: string }[] = [];
for (const name of readdirSync(root)) {
  const full = join(root, name);
  let link = false;
  try {
    link = lstatSync(full).isSymbolicLink();
  } catch {
    continue;
  }
  if (!link) continue;
  try {
    realpathSync(full);
  } catch {
    let target = '';
    try {
      target = readlinkSync(full);
    } catch {
      target = '(读不到目标)';
    }
    broken.push({ name, target });
  }
}

if (!broken.length) {
  console.log('没有断链，什么都不用做。');
  process.exit(0);
}

mkdirSync(recordDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const record = join(recordDir, `broken-skill-links-${stamp}.txt`);
const body = [
  `清理时间：${new Date().toISOString()}`,
  `目录：${root}`,
  `断链数量：${broken.length}`,
  '',
  '这些是链接本身，目标早就不在了。删除只移除链接，不触碰任何目录内容。',
  '要恢复：按下面的 target 重新建链接，或把目标目录找回来。',
  '',
  ...broken.map((b) => `${b.name}\t-> ${b.target}`),
  '',
].join('\n');
writeFileSync(record, body, 'utf8');
console.log(`清单已写入：${record}`);

let removed = 0;
for (const { name } of broken) {
  const full = join(root, name);
  try {
    // junction / 目录符号链接用 rmdir：只移除链接
    rmdirSync(full);
    removed += 1;
  } catch {
    try {
      unlinkSync(full);
      removed += 1;
    } catch (err) {
      console.error(`删不掉：${name} — ${(err as Error).message}`);
    }
  }
}

console.log(`已删除 ${removed}/${broken.length} 个断链。`);
for (const { name } of broken) console.log(`  - ${name}`);
