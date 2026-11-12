// 纯函数：遍历 zstd 帧与块头，返回帧边界。不解压。
// 参考 RFC 8878 §3.1（帧头）与 §3.1.1.3（块头）。
const ZSTD_MAGIC = 0xfd2fb528;

/**
 * @param {ArrayBuffer} buffer
 * @returns {{ frames: Array<{type:string,offset:number,size:number,blocks:number}>, problem: null | {type:'magic'|'trunc', off:number} }}
 */
export function parseFrames(buffer) {
  const buf = new Uint8Array(buffer);
  const dv = new DataView(buffer);
  const frames = [];
  let off = 0;
  let problem = null;

  while (off + 4 <= buf.byteLength) {
    const magic = dv.getUint32(off, true);

    // 可跳过帧：0x184D2A50 + n，后面跟 4 字节长度
    if ((magic & 0xfffffff0) === 0x184d2a50) {
      if (off + 8 > buf.byteLength) {
        problem = { type: 'trunc', off };
        break;
      }
      const size = dv.getUint32(off + 4, true);
      frames.push({ type: 'skippable', offset: off, size: size + 8, blocks: 0 });
      off += size + 8;
      continue;
    }

    if (magic !== ZSTD_MAGIC) {
      problem = { type: 'magic', off };
      break;
    }

    const start = off;
    off += 4;
    const fhd = buf[off];
    off += 1;

    const fcsFlag = fhd >> 6;
    const singleSegment = (fhd >> 5) & 1;
    const hasChecksum = (fhd >> 2) & 1;
    const dictFlag = fhd & 3;

    if (!singleSegment) off += 1; // Window_Descriptor
    if (dictFlag === 3) off += 4;
    else if (dictFlag === 2) off += 2;
    else if (dictFlag === 1) off += 1;

    // Frame_Content_Size
    if (fcsFlag === 0) {
      if (singleSegment) off += 1;
    } else if (fcsFlag === 1) off += 2;
    else if (fcsFlag === 2) off += 4;
    else off += 8;

    let blocks = 0;
    let last = false;
    while (!last) {
      if (off + 3 > buf.byteLength) {
        problem = { type: 'trunc', off: start };
        break;
      }
      const head = buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16);
      last = (head & 1) === 1;
      const blockType = (head >> 1) & 3;
      const blockSize = head >> 3;
      // RLE 块只带 1 字节负载；其它类型带 blockSize 字节
      off += 3 + (blockType === 1 ? 1 : blockSize);
      blocks += 1;
      if (off > buf.byteLength) {
        problem = { type: 'trunc', off: start };
        break;
      }
    }
    if (problem) break;

    if (hasChecksum) off += 4;
    if (off > buf.byteLength) {
      problem = { type: 'trunc', off: start };
      break;
    }
    frames.push({ type: 'zstd', offset: start, size: off - start, blocks });
  }

  if (!problem && off < buf.byteLength) problem = { type: 'trunc', off };
  return { frames, problem };
}

export function summarize(frames) {
  const real = frames.filter((f) => f.type === 'zstd');
  return {
    frames: real.length,
    skippable: frames.length - real.length,
    bytes: real.reduce((n, f) => n + f.size, 0),
    largest: real.reduce((n, f) => Math.max(n, f.size), 0),
    blocks: real.reduce((n, f) => n + f.blocks, 0),
  };
}
