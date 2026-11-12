#!/usr/bin/env node
// 只读探测：node tools/probe.mjs <DSH Home> [更多 Home...]
// 只做 stat / 读索引 / 算哈希，绝不修改任何文件，也不会解析负载内容。
import path from 'node:path';
import { probeHome, scanHome } from '../src/agent/agent.mjs';

function human(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const homes = process.argv.slice(2);
if (!homes.length) {
  console.error('用法: node tools/probe.mjs <DSH Home> [更多 Home...]');
  process.exit(1);
}

for (const home of homes) {
  const abs = path.resolve(home);
  const probe = await probeHome(abs);
  const scan = await scanHome(abs);
  const byFormat = scan.sessions.reduce((acc, s) => {
    acc[s.formatId] = (acc[s.formatId] ?? 0) + 1;
    return acc;
  }, {});
  const total = scan.sessions.reduce((n, s) => n + s.size, 0);
  const unassigned = scan.warnings.filter((w) => w.startsWith('unassigned')).length;

  console.log(`\n■ ${abs}`);
  console.log(`  运行面        ${probe.surfaceKind}`);
  console.log(`  格式          ${probe.formats.length ? probe.formats.join(', ') : '(无负载)'}`);
  console.log(`  索引版本      workspace=${probe.unitVersions.workspace} projcache=${probe.unitVersions.projcache}`);
  console.log(`  工作区        ${scan.workspaces.length}`);
  for (const ws of scan.workspaces) {
    console.log(`    - ${ws.title ?? '(无标题)'}  ${ws.path}`);
  }
  console.log(`  会话负载      ${scan.sessions.length} 个  (${Object.entries(byFormat).map(([k, v]) => `${k}:${v}`).join(' ') || '-'})`);
  console.log(`  负载总量      ${human(total)}`);
  if (unassigned) console.log(`  ⚠ 无法归属    ${unassigned} 个会话目录（索引里没记录）`);
  const denied = scan.warnings.filter((w) => w.startsWith('denied')).length;
  if (denied) console.log(`  ⛔ 已排除      ${denied} 个凭据类路径`);
}
console.log('');
