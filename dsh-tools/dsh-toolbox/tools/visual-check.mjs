#!/usr/bin/env node
// 构建后视觉验收：三种渲染条件各截一张，并做内容与亮度断言。
// 目的：挡住「深色模式白字白底」「动画把内容藏了」「JS 挂了页面空白」这三类事故。
//
// 用法：node tools/visual-check.mjs [--port 4321] [--write]
// --write 只截图不判定（人工看），默认判定失败即退出 1。
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const PORT = Number(arg('port', '4321'));
const ROOT = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const OUT = join(ROOT, '.check');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('找不到 Chrome。用环境变量 CHROME_PATH 指定可执行文件。');
  process.exit(1);
}

const PAGES = [
  { path: '/', must: ['The tools', 'Why these tools', 'FAQ'], lang: 'en' },
  { path: '/zh/', must: ['七个工具已上线', '为什么做这些工具', '常见问题'], lang: 'zh' },
];

const MODES = [
  { id: 'light', flags: [], query: '' },
  { id: 'dark', flags: [], query: '?theme=dark' },
  { id: 'nojs', flags: ['--disable-javascript'], query: '' },
];

function run(args, { capture = false } = {}) {
  return new Promise((done) => {
    const child = spawn(chrome, args, { stdio: ['ignore', capture ? 'pipe' : 'ignore', 'ignore'] });
    let out = '';
    if (capture) child.stdout.on('data', (b) => { out += b.toString('utf8'); });
    child.on('close', () => done(out));
    child.on('error', () => done(''));
  });
}

async function ensureServer() {
  const probe = () => fetch(`http://127.0.0.1:${PORT}/`, { signal: AbortSignal.timeout(1500) }).then(() => true).catch(() => false);
  if (await probe()) return null;
  const server = spawn('node', ['tools/serve.mjs', String(PORT)], { cwd: ROOT, stdio: 'ignore', detached: false });
  for (let i = 0; i < 20; i += 1) {
    await new Promise((r) => setTimeout(r, 250));
    if (await probe()) return server;
  }
  throw new Error(`本地服务没起来：http://127.0.0.1:${PORT}/`);
}

// 极简 PNG 解码：只处理 8 位真彩/真彩+alpha、非隔行，够读 Chrome 截图。
function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('不是 PNG');
  let off = 8;
  let width = 0; let height = 0; let colorType = 0; let bitDepth = 0;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error('不支持隔行 PNG');
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    off += 12 + len;
  }
  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) throw new Error(`不支持 PNG 类型 ${colorType}/${bitDepth}`);
  const channels = colorType === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos]; pos += 1;
    const line = raw.subarray(pos, pos + stride); pos += stride;
    const row = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= channels ? row[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      row[x] = v & 0xff;
    }
  }
  return { width, height, channels, data: out };
}

function meanBrightness(png) {
  const { width, height, channels, data } = png;
  let sum = 0;
  let n = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * channels;
      sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      n += 1;
    }
  }
  return sum / n;
}

mkdirSync(OUT, { recursive: true });
const server = await ensureServer();
const failures = [];

for (const page of PAGES) {
  for (const mode of MODES) {
    const url = `http://127.0.0.1:${PORT}${page.path}${mode.query ?? ''}`;
    const png = join(OUT, `${page.lang}-${mode.id}.png`);

    await run([
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--window-size=1280,1200', '--virtual-time-budget=4000',
      ...mode.flags,
      `--screenshot=${png}`, url,
    ]);

    const dom = await run([
      '--headless=new', '--disable-gpu', '--virtual-time-budget=4000',
      ...mode.flags, '--dump-dom', url,
    ], { capture: true });

    // 1) 文案必须在（覆盖「动画把内容藏了」和「JS 挂了」）
    for (const marker of page.must) {
      if (!dom.includes(marker)) failures.push(`${page.path} [${mode.id}] 缺少文案「${marker}」`);
    }

    // 2) 英文页不得出现中文（正文区）
    const main = /<main[\s\S]*?<\/main>/.exec(dom)?.[0] ?? '';
    if (page.lang === 'en' && /[\u4e00-\u9fff]/.test(main)) {
      failures.push(`${page.path} [${mode.id}] 正文出现中文`);
    }

    // 3) 亮度：深色模式必须真的暗，浅色必须真的亮
    if (existsSync(png)) {
      try {
        const img = decodePng(await (await import('node:fs/promises')).readFile(png));
        const b = meanBrightness(img);
        if (mode.id === 'nojs') {
          console.log(`  ${page.lang}/${mode.id}  亮度 ${b.toFixed(1)}  （无 JS，只查内容）`);
          continue;
        }
        const limit = mode.id === 'dark' ? 70 : 140;
        const ok = mode.id === 'dark' ? b < limit : b > limit;
        if (!ok) failures.push(`${page.path} [${mode.id}] 平均亮度 ${b.toFixed(1)}，预期${mode.id === 'dark' ? '低于' : '高于'} ${limit}`);
        console.log(`  ${page.lang}/${mode.id}  亮度 ${b.toFixed(1)}  ${ok ? 'ok' : 'FAIL'}`);
      } catch (err) {
        failures.push(`${page.path} [${mode.id}] 截图解析失败：${err.message}`);
      }
    } else {
      failures.push(`${page.path} [${mode.id}] 没有生成截图`);
    }
  }
}

if (server) server.kill();

console.log('');
if (failures.length) {
  console.error(`视觉验收 ${failures.length} 项不通过：`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error(`截图在 ${OUT}，自己看一眼再改。`);
  process.exit(1);
}
console.log(`视觉验收通过：${PAGES.length} 页 × ${MODES.length} 种渲染条件，共 ${PAGES.length * MODES.length} 组。截图在 .check/`);
