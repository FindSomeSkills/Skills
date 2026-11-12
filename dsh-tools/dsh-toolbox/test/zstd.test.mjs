import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrames, summarize } from '../src/lib/zstd.mjs';

/** 造一个合法的单帧：magic + FHD(singleSegment, fcsFlag=0) + 1 字节 FCS + 一个 last/raw/0 块 */
function oneEmptyFrame() {
  return new Uint8Array([
    0x28, 0xb5, 0x2f, 0xfd, // magic
    0x20, // FHD: fcsFlag=0, singleSegment=1, checksum=0, dictFlag=0
    0x00, // Frame_Content_Size (1 byte, required when singleSegment && fcsFlag=0)
    0x01, 0x00, 0x00, // block header: last=1, type=raw(0), size=0
  ]);
}

/** 造一个带 3 字节 raw 负载的帧 */
function oneRawFrame(payload) {
  const size = payload.length;
  const head = 1 | (0 << 1) | (size << 3);
  return new Uint8Array([
    0x28, 0xb5, 0x2f, 0xfd,
    0x20,
    0x00,
    head & 0xff, (head >> 8) & 0xff, (head >> 16) & 0xff,
    ...payload,
  ]);
}

test('单帧：帧数 1、边界精确、块数 1', () => {
  const buf = oneEmptyFrame();
  const { frames, problem } = parseFrames(buf.buffer);
  assert.equal(problem, null);
  assert.equal(frames.length, 1);
  assert.equal(frames[0].offset, 0);
  assert.equal(frames[0].size, buf.byteLength);
  assert.equal(frames[0].blocks, 1);
});

test('多帧追加：帧边界按顺序累加，大小正确', () => {
  const a = oneRawFrame([1, 2, 3]);
  const b = oneRawFrame([4, 5, 6, 7]);
  const buf = new Uint8Array([...a, ...b]);
  const { frames, problem } = parseFrames(buf.buffer);
  assert.equal(problem, null);
  assert.equal(frames.length, 2);
  assert.equal(frames[0].offset, 0);
  assert.equal(frames[0].size, a.byteLength);
  assert.equal(frames[1].offset, a.byteLength);
  assert.equal(frames[1].size, b.byteLength);
});

test('尾部有垃圾字节：报告 trunc，但不丢已解析的帧', () => {
  const buf = new Uint8Array([...oneRawFrame([9]), 0xde, 0xad]);
  const { frames, problem } = parseFrames(buf.buffer);
  assert.equal(frames.length, 1);
  assert.equal(problem?.type, 'trunc');
  assert.equal(problem.off, oneRawFrame([9]).byteLength);
});

test('不是 zstd：首字节即报 magic 错', () => {
  const buf = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const { frames, problem } = parseFrames(buf.buffer);
  assert.equal(frames.length, 0);
  assert.equal(problem?.type, 'magic');
  assert.equal(problem.off, 0);
});

test('summary 汇总：总字节、最大帧、块数', () => {
  const a = oneRawFrame([1, 2, 3]);
  const b = oneRawFrame([4, 5, 6, 7]);
  const { frames } = parseFrames(new Uint8Array([...a, ...b]).buffer);
  const s = summarize(frames);
  assert.equal(s.frames, 2);
  assert.equal(s.bytes, a.byteLength + b.byteLength);
  assert.equal(s.largest, Math.max(a.byteLength, b.byteLength));
  assert.equal(s.blocks, 2);
  assert.equal(s.skippable, 0);
});
