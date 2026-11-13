#!/usr/bin/env node
// 部署到 Cloudflare Pages。需要用户级环境变量 CLOUDFLARE_API_TOKEN。
// 本机访问 Cloudflare 需经本地代理（直连 DNS/连接会失败），脚本会自动带上。
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { writeFileSync } from 'node:fs';

const ROOT = 'C:/Knowledge base/02-Project/dsh-toolbox';
const PROJECT = 'dsh-toolbox';
const WRANGLER = 'C:/Knowledge base/02-Project/geo-workbench/app/node_modules/wrangler/bin/wrangler.js';
const PROXY = process.env.DEPLOY_PROXY ?? 'http://127.0.0.1:7897';

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error('缺少 CLOUDFLARE_API_TOKEN。先在终端设置用户级环境变量：setx CLOUDFLARE_API_TOKEN "<token>"');
  process.exit(1);
}
if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
  console.error('没有 dist/index.html，先跑 npm run polish。');
  process.exit(1);
}
if (!existsSync(WRANGLER)) {
  console.error(`找不到 wrangler：${WRANGLER}`);
  process.exit(1);
}

const env = {
  ...process.env,
  CLOUDFLARE_API_TOKEN: token,
  WRANGLER_SEND_METRICS: 'false',
  HTTPS_PROXY: PROXY,
  HTTP_PROXY: PROXY,
};

const args = [WRANGLER, 'pages', 'deploy', 'dist', '--project-name', PROJECT, '--commit-dirty=true'];
console.log(`部署 ${PROJECT} → Cloudflare Pages（经代理 ${PROXY}）`);
const run = spawnSync('node', args, { cwd: ROOT, env, stdio: 'inherit' });
if (run.status === 0) {
  // 部署成功后通知 Bing/Yandex 有更新（IndexNow），下次抓取会快很多
  try {
    const key = 'c5ae0e29be73606abf38fc69fb4c1013';
    const urls = ['https://www.dshtoolbox.com/', 'https://www.dshtoolbox.com/zh/'];
    const bodyFile = join(tmpdir(), 'indexnow.json');
    writeFileSync(bodyFile, JSON.stringify({
      host: 'www.dshtoolbox.com',
      key,
      keyLocation: 'https://www.dshtoolbox.com/' + key + '.txt',
      urlList: urls,
    }));
    const res = spawnSync('curl', ['-s', '-o', 'NUL', '-w', '%{http_code}', '--max-time', '20',
      '-X', 'POST', 'https://api.indexnow.org/indexnow',
      '-H', 'Content-Type: application/json; charset=utf-8',
      '--data-binary', '@' + bodyFile,
    ], { encoding: 'utf8' });
    console.log(`IndexNow: ${(res.stdout || '').trim() || 'no response'}`);
  } catch (e) {
    console.log('IndexNow 跳过：' + e.message);
  }
}
process.exit(run.status ?? 1);
