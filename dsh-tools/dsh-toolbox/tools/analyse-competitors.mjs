#!/usr/bin/env node
// 采样竞品截图的主色与版式特征（亮度、主色占比、留白比例），用于对照分析。
import { spawn } from 'node:child_process';
import { inflateSync } from 'node:zlib';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = join(process.env.TEMP, 'competitor-shots');
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
      if (filter === 1) v += a; else if (filter === 2) v += b;
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

const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function analyse(img) {
  const buckets = new Map();
  let sum = 0; let n = 0; let lightCount = 0;
  for (let y = 0; y < img.height; y += 2) {
    for (let x = 0; x < img.width; x += 2) {
      const i = (y * img.width + x) * img.channels;
      const r = img.data[i]; const g = img.data[i + 1]; const b = img.data[i + 2];
      sum += lum(r, g, b); n += 1;
      if (lum(r, g, b) > 240) lightCount += 1;
      const key = [Math.round(r / 16) * 16, Math.round(g / 16) * 16, Math.round(b / 16) * 16].join(',');
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
  }
  const top = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([k, v]) => {
      const [r, g, b] = k.split(',').map(Number);
      return `${hex(r, g, b)} ${(v / n * 100).toFixed(0)}%`;
    });
  return { mean: sum / n, white: (lightCount / n * 100).toFixed(0), top };
}

const sites = [
  ['ilovepdf', 'https://www.ilovepdf.com/'],
  ['it-tools', 'https://it-tools.tech/'],
  ['tinypng', 'https://tinypng.com/'],
  ['jsonformatter', 'https://jsonformatter.org/'],
];

for (const [name, url] of sites) {
  const file = join(OUT, `${name}.png`);
  await new Promise((done) => {
    const c = spawn(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--window-size=1280,900', '--virtual-time-budget=7000', `--screenshot=${file}`, url], { stdio: 'ignore' });
    c.on('close', done); c.on('error', done);
  });
  if (!existsSync(file)) { console.log(`${name}: 截图失败`); continue; }
  const s = analyse(decodePng(readFileSync(file)));
  console.log(`${name.padEnd(14)} 亮度 ${s.mean.toFixed(0).padStart(3)}  近白像素 ${s.white.padStart(2)}%  主色 ${s.top.slice(0, 3).join(' / ')}`);
}
console.log('\n截图目录: ' + OUT);
