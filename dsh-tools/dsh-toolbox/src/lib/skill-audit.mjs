// 技能成本审计：估算技能目录会占用多少上下文。
// 只读 SKILL.md 文本，不执行任何技能代码。

/** 粗略 token 估算：CJK 按 1 token/字，其余按 4 字符/token */
export function estimateTokens(text) {
  if (!text) return 0;
  const cjk = (text.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) ?? []).length;
  const rest = Math.max(0, text.length - cjk);
  return Math.ceil(cjk + rest / 4);
}

function readField(frontmatter, key) {
  const re = new RegExp(`^${key}\\s*:\\s*(.+)$`, 'm');
  const m = re.exec(frontmatter);
  if (!m) return '';
  return m[1].trim().replace(/^["']|["']$/g, '');
}

/**
 * @param {string} path 例如 "skills/expo-router/SKILL.md"
 * @param {string} text
 */
export function parseSkillFile(path, text) {
  const normalized = String(path).replace(/\\/g, '/');
  const segments = normalized.split('/');
  const dir = segments.length >= 2 ? segments[segments.length - 2] : normalized;

  let frontmatter = '';
  let body = text;
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (fm) {
    frontmatter = fm[1];
    body = text.slice(fm[0].length);
  }

  const name = readField(frontmatter, 'name') || dir;
  const description = readField(frontmatter, 'description');

  const bytes = new TextEncoder().encode(text).length;
  const tokensResident = estimateTokens(`${name}\n${description}`);
  const tokensFull = estimateTokens(text);

  return {
    dir,
    name,
    description,
    bytes,
    chars: text.length,
    tokensResident,
    tokensFull,
    hasFrontmatter: Boolean(fm),
    descriptionLength: description.length,
    bodyLength: body.length,
  };
}

/** @param {Array<{path: string, text: string}>} files */
export function auditSkills(files) {
  const rows = files.map((f) => parseSkillFile(f.path, f.text));

  // 同名目录去重（同一技能可能被多个技能根链接进来）
  const seen = new Set();
  const unique = [];
  for (const row of rows) {
    const key = `${row.dir}::${row.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(row);
  }

  unique.sort((a, b) => b.tokensFull - a.tokensFull);

  const totalResident = unique.reduce((n, r) => n + r.tokensResident, 0);
  const totalFull = unique.reduce((n, r) => n + r.tokensFull, 0);
  const totalBytes = unique.reduce((n, r) => n + r.bytes, 0);

  // 重复描述：典型是从别的技能复制粘贴
  const byDescription = new Map();
  for (const row of unique) {
    if (!row.description) continue;
    const list = byDescription.get(row.description) ?? [];
    list.push(row.name);
    byDescription.set(row.description, list);
  }
  const duplicated = [...byDescription.entries()]
    .filter(([, names]) => names.length > 1)
    .map(([description, names]) => ({ description, names }));

  const noFrontmatter = unique.filter((r) => !r.hasFrontmatter).map((r) => r.dir);
  const noDescription = unique.filter((r) => !r.description).map((r) => r.dir);
  const longDescription = unique.filter((r) => r.descriptionLength > 300).map((r) => `${r.dir} (${r.descriptionLength} chars)`);

  for (const row of unique) {
    row.share = totalFull > 0 ? row.tokensFull / totalFull : 0;
  }

  return {
    summary: {
      skills: unique.length,
      bytes: totalBytes,
      tokensResident: totalResident,
      tokensFull: totalFull,
      duplicatedDescriptions: duplicated.length,
      noFrontmatter: noFrontmatter.length,
      noDescription: noDescription.length,
      longDescription: longDescription.length,
    },
    rows: unique,
    findings: {
      duplicated,
      noFrontmatter,
      noDescription,
      longDescription,
    },
  };
}
