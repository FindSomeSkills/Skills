import { pageList } from '../lib/content.mjs';

export function GET({ site }) {
  const base = site?.href?.replace(/\/$/, '') ?? 'http://127.0.0.1:4321';
  const urls = pageList()
    .map((p) => {
      const loc = `${base}/${p.slug ? `${p.slug}/` : ''}`;
      const alt = p.slug.startsWith('zh')
        ? `${base}/${p.slug.replace(/^zh\/?/, '') ? `${p.slug.replace(/^zh\/?/, '')}/` : ''}`
        : `${base}/zh/${p.slug ? `${p.slug}/` : ''}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <xhtml:link rel="alternate" hreflang="${p.lang === 'zh' ? 'zh-Hans' : 'en'}" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="${p.lang === 'zh' ? 'en' : 'zh-Hans'}" href="${alt}"/>
    <changefreq>weekly</changefreq>
    <priority>${p.page === 'syncHub' ? '0.9' : p.page === 'home' ? '1.0' : '0.7'}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
