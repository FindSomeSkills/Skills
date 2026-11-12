#!/usr/bin/env node
// 采样工具站的真实背景亮度：headless 截图 → 解 PNG → 算平均亮度与四角像素。
import { spawn } from 'node:child_process';
import { inflateSync } from 'node:zlib';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => existsSync(p));
const OUT = join(process.cwd(), '.check-sample');
mkdirSync(OUT, { recursive: true });

function decodePng(buf) {
  let off = 8; let width = 0; let height = 0; let colorType = 0; const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
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
        const p = a + b - c; const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      row[x] = v & 0xff;
    }
  }
  return { width, height, channels, data: out };
}

const pix = (img, x, y) => {
  const i = (y * img.width + x) * img.channels;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function stats(img) {
  let sum = 0; let n = 0;
  const hist = new Map();
  for (let y = 0; y < img.height; y += 3) {
    for (let x = 0; x < img.width; x += 3) {
      const p = pix(img, x, y);
      sum += lum(p); n += 1;
      const key = p.map((v) => Math.round(v / 8) * 8).join(',');
      hist.set(key, (hist.get(key) ?? 0) + 1);
    }
  }
  const top = [...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 1)[0];
  const [r, g, b] = top[0].split(',').map(Number);
  return {
    mean: sum / n,
    dominant: `rgb(${r}, ${g}, ${b})`,
    dominantShare: top[1] / n,
    corner: pix(img, 2, 2),
  };
}

const sites = [
  ['it-tools.tech', 'https://it-tools.tech/'],
  ['regex101.com', 'https://regex101.com/'],
  ['jsonformatter.org', 'https://jsonformatter.org/'],
  ['caniuse.com', 'https://caniuse.com/'],
  ['tinypng.com', 'https://tinypng.com/'],
  ['remove.bg', 'https://www.remove.bg/'],
  ['tinywow.com', 'https://tinywow.com/'],
  ['CyberChef', 'https://gchq.github.io/CyberChef/'],
  ['excalidraw.com', 'https://excalidraw.com/'],
  ['squoosh.app', 'https://squoosh.app/'],
  ['tools.pdf24.org', 'https://tools.pdf24.org/en/'],
  ['convertio.co', 'https://convertio.co/'],
];

for (const [name, url] of sites) {
  const file = join(OUT, `${name.replace(/[^\w.-]/g, '_')}.png`);
  await new Promise((done) => {
    const c = spawn(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--window-size=1280,900', '--virtual-time-budget=6000', `--screenshot=${file}`, url], { stdio: 'ignore' });
    c.on('close', done); c.on('error', done);
  });
  try {
    const img = decodePng(readFileSync(file));
    const s = stats(img);
    console.log(`${name.padEnd(20)} 平均亮度 ${s.mean.toFixed(0).padStart(3)}  主色 ${s.dominant.padEnd(18)} 占比 ${(s.dominantShare * 100).toFixed(0)}%  左上角 rgb(${s.corner.join(',')})`);
  } catch (err) {
    console.log(`${name.padEnd(20)} 失败：${err.message}`);
  }
}
