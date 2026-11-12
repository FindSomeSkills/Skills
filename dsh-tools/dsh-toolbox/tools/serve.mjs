#!/usr/bin/env node
// 静态预览服务器：node tools/serve.mjs [端口]
// 只服务 dist/，用于本地查看构建结果（生产部署用任意静态托管即可）。
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = clean.endsWith('/')
    ? [path.join(root, clean, 'index.html')]
    : [path.join(root, clean), path.join(root, clean, 'index.html'), path.join(root, `${clean}.html`)];
  for (const candidate of candidates) {
    if (!candidate.startsWith(root)) continue;
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) return candidate;
    } catch {
      /* keep trying */
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? '/');
  if (!file) {
    const notFound = path.join(root, '404.html');
    try {
      const body = await fs.readFile(notFound);
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      return res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': TYPES['.txt'] });
      return res.end('404');
    }
  }
  const body = await fs.readFile(file);
  res.writeHead(200, {
    'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-cache',
  });
  res.end(body);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`[site] http://127.0.0.1:${port}/  (root=${root})`);
});
