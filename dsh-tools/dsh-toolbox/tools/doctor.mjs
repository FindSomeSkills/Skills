#!/usr/bin/env node
// 命令行版「会话索引体检」，复用网页端的同一份逻辑。
// 只读：不修改任何文件。
// 用法: node tools/doctor.mjs <DSH Home> [更多 Home...]
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildInventory, diagnose, safeParse } from '../src/lib/session-index.mjs';

function walk(root) {
  const out = [];
  async function rec(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await rec(full);
      } else if (entry.isFile()) {
        const stat = await fs.stat(full);
        out.push({
          name: entry.name,
          webkitRelativePath: path.relative(root, full).replace(/\\/g, '/'),
          size: stat.size,
          _full: full,
        });
      }
    }
  }
  return rec(root).then(() => out);
}

const fmt = (n) => (n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

const homes = process.argv.slice(2);
if (!homes.length) {
  console.error('用法: node tools/doctor.mjs <DSH Home> [更多 Home...]');
  process.exit(1);
}

for (const home of homes) {
  const abs = path.resolve(home);
  const files = await walk(abs);
  const inv = buildInventory(files);

  const readJson = async (name) => {
    const file = inv.indexFiles.get(name);
    if (!file) return null;
    const parsed = safeParse(await fs.readFile(file._full, 'utf8'));
    if (!parsed.ok) throw new Error(`${name}.json 解析失败: ${parsed.error}`);
    return parsed.value;
  };

  console.log(`\n■ ${abs}`);
  const workspace = await readJson('workspace');
  const projcache = await readJson('session_projcache');
  if (!workspace) {
    console.log('  ✗ 没有 storages/workspace.json，跳过');
    continue;
  }

  const { summary, issues, health } = diagnose(inv, { workspace, projcache });
  const badge = health === 'clean' ? '✓ 干净' : health === 'degraded' ? '△ 有警告' : '✗ 有会话不会显示';
  console.log(`  状态          ${badge}`);
  console.log(`  工作区        ${summary.workspaces}`);
  console.log(`  磁盘会话      ${summary.sessionsOnDisk}  (${summary.payloads} 个负载, ${fmt(summary.bytes)})`);
  console.log(`  索引里的 ID   ${summary.listed}    projcache 行 ${summary.projcacheRows}`);
  console.log(`  格式          ${Object.entries(summary.formats).map(([k, v]) => `${k}:${v}`).join(' ') || '-'}`);

  if (!issues.length) {
    console.log('  问题          无');
    continue;
  }
  console.log(`  问题          ${issues.length}`);
  for (const issue of issues) {
    console.log(`    [${issue.severity}] ${issue.title}  × ${issue.count}`);
    for (const item of issue.items.slice(0, 5)) console.log(`        · ${item}`);
    if (issue.items.length > 5) console.log(`        · … +${issue.items.length - 5}`);
  }
}
console.log('');
