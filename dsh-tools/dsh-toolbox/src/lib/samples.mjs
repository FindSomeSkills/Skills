// 内置示例数据：让每个工具「点一下就出结果」，不用先准备文件。
// 全部是合成数据，不含任何真实会话内容。

/** 造一个合法的 zstd 帧（单个 raw 块），payload 长度必须 ≤ 255 */
function frame(payload) {
  const size = payload.length;
  if (size > 255) throw new Error('sample frame too large');
  const head = 1 | (0 << 1) | (size << 3);
  return [
    0x28, 0xb5, 0x2f, 0xfd, // magic
    0x20, // FHD: singleSegment, fcsFlag=0
    size, // Frame_Content_Size (1 byte)
    head & 0xff, (head >> 8) & 0xff, (head >> 16) & 0xff,
    ...payload,
  ];
}

/** 三段不同大小的帧，模拟「追加写了三次」的会话文件 */
export function sampleZstdBytes() {
  const fill = (n, v) => Array.from({ length: n }, () => v);
  const bytes = [
    ...frame(fill(120, 0x41)),
    ...frame(fill(60, 0x42)),
    ...frame(fill(200, 0x43)),
  ];
  return new Uint8Array(bytes).buffer;
}

export const SAMPLE_ZSTD_NAME = 'sample-session.v4.jsonl.zstd';

// ---------------------------------------------------------------- 索引体检

const SAMPLE_WS = {
  unit: { name: 'workspace', version: 2 },
  global: {
    initialized: true,
    workspaceIds: ['w-demo'],
    archivedSessionIds: ['session-demo-4'],
    pinnedSessionIds: ['session-demo-1'],
  },
  tables: {
    workspaces: {
      'w-demo': {
        path: 'C:\\demo\\project',
        title: 'demo',
        sessionIds: ['session-demo-1', 'session-demo-2', 'session-demo-5'],
        createdAt: '2026-11-01T00:00:00.000Z',
        updatedAt: '2026-11-02T00:00:00.000Z',
      },
    },
  },
};

const SAMPLE_PC = {
  unit: { name: 'session_projcache', version: 3 },
  global: null,
  tables: {
    sessions: {
      'session-demo-1': {
        identity: { createdAt: 1793000000000, cwd: 'C:\\demo\\project' },
        rows: { title: { ver: 1, seq: 10, val: '示例：索引正常' } },
      },
    },
  },
};

/**
 * 一份「有问题」的演示清单：
 *  - session-demo-3 磁盘有、索引没有       → error
 *  - session-demo-5 索引有、磁盘没有       → warn
 *  - session-demo-2 没有 projcache 行      → warn（无标题）
 *  - session-demo-6 两种格式并存           → warn
 *  - session-demo-4 已归档但仍挂在列表外   → 静默（不报）
 */
export function sampleInventoryFiles() {
  const f = (path, size) => ({ name: path.split('/').pop(), webkitRelativePath: path, size });
  return [
    f('demo/sessions/--C-demo-project--/session-demo-1/session.v4.jsonl.zstd', 1_200),
    f('demo/sessions/--C-demo-project--/session-demo-2/session.v4.jsonl.zstd', 800),
    f('demo/sessions/--C-demo-project--/session-demo-3/session.v4.jsonl.zstd', 500),
    f('demo/sessions/--C-demo-project--/session-demo-6/session.v4.jsonl.zstd', 640),
    f('demo/sessions/--C-demo-project--/session-demo-6/session.jsonl.zstd', 720),
    f('demo/storages/workspace.json', 1_000),
    f('demo/storages/session_projcache.json', 1_000),
  ];
}

export const sampleWorkspace = () => SAMPLE_WS;
export const sampleProjcache = () => SAMPLE_PC;

// ---------------------------------------------------------------- 技能审计

const skillMd = (name, description, body) =>
  `---\nname: ${name}\ndescription: ${description}\n---\n\n${body}\n`;

export function sampleSkillFiles() {
  const lorem = (n) => 'context budget session workspace index sync. '.repeat(n);
  return [
    { path: 'skills/sample-expo-router/SKILL.md', text: skillMd('expo-router', 'File-based routing for Expo Router.', lorem(80)) },
    { path: 'skills/sample-docx/SKILL.md', text: skillMd('docx', 'Create and edit Word documents.', lorem(60)) },
    {
      path: 'skills/sample-duplicate-a/SKILL.md',
      text: skillMd('duplicate-a', 'Helps with documents and files.', lorem(20)),
    },
    {
      path: 'skills/sample-duplicate-b/SKILL.md',
      text: skillMd('duplicate-b', 'Helps with documents and files.', lorem(20)),
    },
    { path: 'skills/sample-no-desc/SKILL.md', text: skillMd('no-desc', '', lorem(10)) },
  ];
}
