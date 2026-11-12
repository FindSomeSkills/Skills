#!/usr/bin/env node
// 造一个最小可用的假 DSH Home（不含任何真实会话内容）。
// 用法: node tools/make-fixture.mjs <目录> [工作区路径] [会话ID] [v4|legacy] [字节数]
import path from 'node:path';
import { createHome } from '../test/harness.mjs';

const [dir, wsPath = 'C:\\tmp\\demo', sessionId = 'session-fixture-1', formatId = 'v4', size = '5000'] =
  process.argv.slice(2);

if (!dir) {
  console.error('用法: node tools/make-fixture.mjs <目录> [工作区路径] [会话ID] [v4|legacy] [字节数]');
  process.exit(1);
}

const home = path.join(dir, 'home');
await createHome({
  root: home,
  wsPath,
  title: path.basename(wsPath) || 'demo',
  sessions: [
    {
      sessionDir: sessionId,
      formatId: formatId === 'legacy' ? 'legacy' : 'v4',
      bytes: Buffer.alloc(Number(size), sessionId.length),
      title: `${sessionId} 的标题`,
    },
  ],
});
console.log(home);
