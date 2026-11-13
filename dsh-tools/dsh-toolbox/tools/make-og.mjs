// 生成 1200×630 的社交分享图：用 Chrome 渲染一张 HTML 卡片再截图。
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  :root { color-scheme: light; }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 72px;
    font-family: "Segoe UI", -apple-system, "Helvetica Neue", sans-serif;
    background: radial-gradient(900px 460px at 20% -10%, #eef2f8, #f5f5f7 60%);
    color: #1d1d1f; display: flex; flex-direction: column; justify-content: space-between;
  }
  .brand { display: flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #0071e3; }
  h1 { font-size: 68px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 700; margin-top: 28px; max-width: 940px; }
  p { font-size: 26px; color: #6e6e73; margin-top: 20px; max-width: 900px; line-height: 1.35; }
  .row { display: flex; gap: 16px; font-size: 19px; color: #3a3a3c; }
  .chip { padding: 8px 16px; border-radius: 999px; background: rgba(0,0,0,0.05); }
  .url { font-size: 20px; color: #0071e3; }
</style></head><body>
  <div>
    <div class="brand"><span class="dot"></span>DSH Toolbox</div>
    <h1>Tools for people who actually run DeepSeek Harness</h1>
    <p>Session sync, frame inspector, context budget, index doctor, skill audit, template checker.</p>
  </div>
  <div>
    <div class="row">
      <span class="chip">runs in your browser</span>
      <span class="chip">no upload</span>
      <span class="chip">no account</span>
    </div>
    <div class="url" style="margin-top: 24px">www.dshtoolbox.com</div>
  </div>
</body></html>`;

fs.writeFileSync('og-card.html', html);
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const out = 'C:/Knowledge base/02-Project/dsh-toolbox/public/og.png';
const r = spawnSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1200,630', '--virtual-time-budget=3000',
  `--screenshot=${out}`,
  'file:///C:/Knowledge%20base/02-Project/dsh-toolbox/og-card.html',
], { encoding: 'utf8' });
console.log('exit', r.status, 'size', fs.existsSync(out) ? Math.round(fs.statSync(out).size / 1024) + ' KB' : 'missing');
