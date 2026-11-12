import { defineConfig } from 'astro/config';

// 站点根 URL：暂时本地预览；申请域名后只改这一处（或构建时传 SITE_URL）
const site = process.env.SITE_URL ?? 'https://dshtoolbox.com';

export default defineConfig({
  site,
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
});
