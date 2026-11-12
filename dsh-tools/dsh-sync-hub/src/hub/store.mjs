// Hub 存储层：元数据 JSON + 内容寻址块（CAS）。
// 接口刻意保持简单，后续可整体换成 SQLite / S3 而不改调用方。
import fs from 'node:fs/promises';
import path from 'node:path';

export class Store {
  constructor(root) {
    this.root = root;
  }

  get metaDir() {
    return path.join(this.root, 'meta');
  }

  get blobDir() {
    return path.join(this.root, 'blobs');
  }

  async init() {
    await fs.mkdir(this.metaDir, { recursive: true });
    await fs.mkdir(this.blobDir, { recursive: true });
  }

  async load(name, fallback) {
    try {
      const raw = await fs.readFile(path.join(this.metaDir, `${name}.json`), 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === 'ENOENT') return fallback;
      throw err;
    }
  }

  async save(name, data) {
    await fs.mkdir(this.metaDir, { recursive: true });
    const file = path.join(this.metaDir, `${name}.json`);
    const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2));
    await fs.rename(tmp, file);
  }

  blobPath(hash) {
    return path.join(this.blobDir, hash.slice(0, 2), hash);
  }

  async hasBlob(hash) {
    try {
      await fs.access(this.blobPath(hash));
      return true;
    } catch {
      return false;
    }
  }

  async putBlob(hash, buf) {
    const dest = this.blobPath(hash);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const tmp = `${dest}.tmp-${process.pid}-${Date.now()}`;
    await fs.writeFile(tmp, buf);
    await fs.rename(tmp, dest);
  }

  async getBlob(hash) {
    return fs.readFile(this.blobPath(hash));
  }
}

export function sessionKey(workspaceId, sessionDir, formatId) {
  return `${workspaceId}|${sessionDir}|${formatId}`;
}
