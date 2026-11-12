// 共享工具：哈希、分块、原子写、DSH Home 路径规则
import { createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';

// 分块大小：客户端与服务端必须一致。测试可调小以便快速验证增量。
export let CHUNK_SIZE = Number(process.env.DSHSYNC_CHUNK_SIZE || 1024 * 1024);

export function setChunkSize(bytes) {
  CHUNK_SIZE = Number(bytes);
}

// 负载文件名 → 格式标识
export const FORMAT_BY_FILE = {
  'session.v4.jsonl.zstd': 'v4',
  'session.jsonl.zstd': 'legacy',
};
export const FILE_BY_FORMAT = {
  v4: 'session.v4.jsonl.zstd',
  legacy: 'session.jsonl.zstd',
};

export function sha256Hex(input) {
  return createHash('sha256').update(input).digest('hex');
}

export async function sha256File(file) {
  const h = createHash('sha256');
  await new Promise((resolve, reject) => {
    createReadStream(file)
      .on('data', (d) => h.update(d))
      .on('end', resolve)
      .on('error', reject);
  });
  return h.digest('hex');
}

/** 把文件按固定大小切块；同时算出整文件 sha256（一次读盘完成两件事） */
export async function chunkFile(file) {
  const fh = await fs.open(file, 'r');
  const whole = createHash('sha256');
  try {
    const stat = await fh.stat();
    const size = stat.size;
    const chunks = [];
    for (let offset = 0; offset < size; offset += CHUNK_SIZE) {
      const length = Math.min(CHUNK_SIZE, size - offset);
      const buf = Buffer.allocUnsafe(length);
      await fh.read(buf, 0, length, offset);
      whole.update(buf);
      chunks.push({ index: chunks.length, offset, length, hash: sha256Hex(buf) });
    }
    return { size, sha256: whole.digest('hex'), chunks };
  } finally {
    await fh.close();
  }
}

export async function readRange(file, offset, length) {
  const fh = await fs.open(file, 'r');
  try {
    const buf = Buffer.allocUnsafe(length);
    await fh.read(buf, 0, length, offset);
    return buf;
  } finally {
    await fh.close();
  }
}

/**
 * DSH 的会话目录名 = 工作区绝对路径的 slug。
 * 实测：C:\Knowledge base → --C-Knowledge~0020base--
 * 规则：去掉冒号，反斜杠转 -，空格转 ~0020
 */
export function pathSlug(p) {
  const body = String(p)
    .replace(/:/g, '')
    .replace(/\\/g, '-')
    .replace(/ /g, '~0020');
  return `--${body}--`;
}

export async function atomicWrite(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, file);
}

export async function atomicWriteJson(file, value) {
  await atomicWrite(file, JSON.stringify(value, null, 2));
}

export async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

export async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

/** 备份为 .bak-<时间戳>，返回备份路径（不存在源文件时返回 null） */
export async function backupFile(file) {
  if (!(await fileExists(file))) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dest = `${file}.bak-${stamp}`;
  await fs.copyFile(file, dest);
  return dest;
}

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 去掉 I/O/0/1
export function randomCode(length = 8) {
  const bytes = randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i += 1) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

export function randomToken() {
  return randomBytes(32).toString('hex');
}

export function nowIso() {
  return new Date().toISOString();
}
