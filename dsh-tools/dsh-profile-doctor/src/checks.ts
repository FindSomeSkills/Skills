// 校验逻辑：纯函数优先（方便测），文件系统只在外层。
import { lstatSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';

export type Severity = 'error' | 'warn' | 'info';

export interface Issue {
  code: string;
  severity: Severity;
  where: string;
  message: string;
  fix: string;
}

const issue = (code: string, severity: Severity, where: string, message: string, fix: string): Issue => ({
  code,
  severity,
  where,
  message,
  fix,
});

/** !!js 表达式不是标准 YAML，校验前先中性化，避免误判断言「解析失败」 */
const neutralise = (text: string) => text.replace(/!!js\s*/g, '!!str ');

export function parseYaml(text: string, label: string): { value: unknown; issues: Issue[] } {
  try {
    return { value: YAML.parse(neutralise(text)), issues: [] };
  } catch (err) {
    return {
      value: null,
      issues: [issue('YAML-001', 'error', label, `YAML 解析失败：${(err as Error).message.split('\n')[0]}`, '修好缩进或引号；这一处会让整个 profile 加载中止。')],
    };
  }
}

/** 从 cordis.yml / bundle 里收集已定义的插件 id */
export function collectIds(value: unknown): Set<string> {
  const ids = new Set<string>();
  const walkEntry = (e: unknown) => {
    if (!e || typeof e !== 'object') return;
    const obj = e as Record<string, unknown>;
    if (typeof obj.id === 'string' && obj.id) ids.add(obj.id);
    if (Array.isArray(obj.insert)) obj.insert.forEach(walkEntry);
    if (Array.isArray(obj.group)) obj.group.forEach(walkEntry);
  };
  if (Array.isArray(value)) value.forEach(walkEntry);
  return ids;
}

/** 校验 cordis.yml：必须是数组，条目要有 id，id 不能重复 */
export function validateComposition(text: string, label: string): { issues: Issue[]; ids: Set<string> } {
  const { value, issues } = parseYaml(text, label);
  if (!value) return { issues, ids: new Set() };

  if (!Array.isArray(value)) {
    issues.push(issue('CORDIS-001', 'error', label, '顶层不是数组', 'cordis.yml 必须是一个条目数组；dsh 会按数组逐条装载。'));
    return { issues, ids: new Set() };
  }

  const seen = new Map<string, number>();
  value.forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      issues.push(issue('CORDIS-002', 'error', `${label}[${i}]`, '条目不是对象', '每个条目应是 { id, name, ... } 的映射。'));
      return;
    }
    const obj = entry as Record<string, unknown>;
    if (typeof obj.id !== 'string' || !obj.id) {
      issues.push(issue('CORDIS-003', 'error', `${label}[${i}]`, '缺 id', '每个条目都要有唯一 id，patch 才能定位到它。'));
    } else {
      seen.set(obj.id, (seen.get(obj.id) ?? 0) + 1);
    }
    if (typeof obj.name !== 'string' || !obj.name) {
      issues.push(issue('CORDIS-003', 'error', `${label}[${i}]`, `条目 ${String(obj.id ?? i)} 缺 name`, 'name 是插件包名，缺了就装不上。'));
    }
  });

  for (const [id, n] of seen) {
    if (n > 1) issues.push(issue('CORDIS-004', 'error', label, `插件 id 重复 ${n} 次：${id}`, '重复 id 会让后一条覆盖前一条，装载顺序不可预测。'));
  }

  return { issues, ids: collectIds(value) };
}

const OPS = ['insert', 'override', 'disable', 'group', 'isolate'];

/** 校验 patch 层：结构、insert 的 id、override 的目标是否存在 */
export function validatePatch(text: string, label: string, knownIds: Set<string>): Issue[] {
  const { value, issues } = parseYaml(text, label);
  if (!value) return issues;
  if (!Array.isArray(value)) {
    issues.push(issue('PATCH-001', 'error', label, '顶层不是数组', 'patch 文件必须是条目数组；空 patch 写 []。'));
    return issues;
  }

  const inserted = new Map<string, number>();

  value.forEach((entry, i) => {
    const at = `${label}[${i}]`;
    if (!entry || typeof entry !== 'object') {
      issues.push(issue('PATCH-002', 'error', at, '条目不是对象', 'patch 条目应为 { insert: [...] } 或 { override: {...} }。'));
      return;
    }
    const obj = entry as Record<string, unknown>;
    const present = OPS.filter((op) => obj[op] !== undefined);
    if (!present.length) {
      issues.push(issue('PATCH-003', 'error', at, '没有可识别的操作键', `只认 ${OPS.join(' / ')}；写错键名等于这条 patch 不存在。`));
      return;
    }

    if (obj.insert !== undefined) {
      if (!Array.isArray(obj.insert)) {
        issues.push(issue('PATCH-004', 'error', at, 'insert 不是数组', 'insert 必须是条目数组。'));
        return;
      }
      obj.insert.forEach((raw, j) => {
        const item = raw as Record<string, unknown>;
        const at2 = `${at}.insert[${j}]`;
        if (!item || typeof item !== 'object') {
          issues.push(issue('PATCH-004', 'error', at2, '插入项不是对象', '每个插入项要有 id 和 name。'));
          return;
        }
        if (typeof item.id !== 'string' || !item.id) {
          issues.push(issue('PATCH-005', 'error', at2, '插入项缺 id', '没有 id 就无法被后续 override 定位。'));
        } else {
          inserted.set(item.id, (inserted.get(item.id) ?? 0) + 1);
          if (knownIds.has(item.id)) {
            issues.push(issue('PATCH-006', 'error', at2, `id 与已有插件冲突：${item.id}`, '换一个 id，或改用 override 修改已有插件。'));
          }
        }
        if (typeof item.name !== 'string' || !item.name) {
          issues.push(issue('PATCH-007', 'error', at2, `插入项 ${String(item.id ?? j)} 缺 name`, 'name 是 npm 包名，缺了加载时直接报错。'));
        }
      });
    }

    for (const op of ['override', 'disable'] as const) {
      if (obj[op] === undefined) continue;
      const ids = Array.isArray(obj[op]) ? (obj[op] as unknown[]).map((x) => (typeof x === 'string' ? x : (x as Record<string, unknown>)?.id)) : [(obj[op] as Record<string, unknown>)?.id ?? obj[op]];
      for (const id of ids) {
        if (typeof id !== 'string' || !id) {
          issues.push(issue('PATCH-008', 'warn', at, `${op} 目标不是字符串 id`, '用插件 id 指定目标。'));
          continue;
        }
        if (knownIds.size && !knownIds.has(id)) {
          issues.push(issue('PATCH-009', 'warn', at, `${op} 的目标不存在：${id}`, '这条会静默失效——你以为改了配置，实际没生效。'));
        }
      }
    }
  });

  for (const [id, n] of inserted) {
    if (n > 1) issues.push(issue('PATCH-010', 'error', label, `同一 patch 里重复插入 id：${id}（${n} 次）`, '只保留一条。'));
  }

  return issues;
}

export interface SkillInfo {
  dir: string;
  name?: string;
  description?: string;
  linksTo?: string;
}

const frontmatter = (text: string): { ok: boolean; data: Record<string, unknown>; error?: string } => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return { ok: false, data: {}, error: '没有 frontmatter' };
  try {
    const data = (YAML.parse(m[1]) ?? {}) as Record<string, unknown>;
    return { ok: true, data };
  } catch (err) {
    return { ok: false, data: {}, error: (err as Error).message.split('\n')[0] };
  }
};

/** 扫一个 skills 根目录：断链、缺 SKILL.md、frontmatter、name 与目录名 */
export function checkSkillsDir(root: string, label = root): { issues: Issue[]; skills: SkillInfo[] } {
  const issues: Issue[] = [];
  const skills: SkillInfo[] = [];
  let entries: string[];
  try {
    entries = readdirSync(root);
  } catch {
    return { issues: [issue('SKILL-000', 'error', label, 'skills 目录读不到', '确认路径存在且有读权限。')], skills };
  }

  for (const name of entries) {
    const full = join(root, name);
    let isLink = false;
    try {
      isLink = lstatSync(full).isSymbolicLink();
    } catch {
      continue;
    }

    let real = full;
    if (isLink) {
      try {
        real = realpathSync(full);
      } catch {
        issues.push(
          issue('SKILL-001', 'error', `${label}/${name}`, '链接目标不存在（断链）', '删掉这个链接，或把目标目录恢复回来。加载器读到这里会拿到空技能。'),
        );
        skills.push({ dir: name, linksTo: 'missing' });
        continue;
      }
    }

    let isDir = false;
    try {
      isDir = statSync(real).isDirectory();
    } catch {
      isDir = false;
    }
    if (!isDir) {
      issues.push(issue('SKILL-002', 'error', `${label}/${name}`, '链接指向的不是目录', '技能必须是一个目录。'));
      continue;
    }

    const mdPath = join(real, 'SKILL.md');
    let text: string;
    try {
      text = readFileSync(mdPath, 'utf8');
    } catch {
      issues.push(issue('SKILL-003', 'error', `${label}/${name}`, '目录里没有 SKILL.md', '补一个 SKILL.md，或删掉这个目录。'));
      skills.push({ dir: name, linksTo: isLink ? real : undefined });
      continue;
    }

    const fm = frontmatter(text);
    if (!fm.ok) {
      issues.push(
        issue('SKILL-004', 'error', `${label}/${name}`, `frontmatter 不可用：${fm.error ?? '缺失'}`, 'SKILL.md 开头要有 --- 包起来的 name 和 description。'),
      );
      skills.push({ dir: name, linksTo: isLink ? real : undefined });
      continue;
    }

    const skillName = typeof fm.data.name === 'string' ? fm.data.name : undefined;
    const desc = typeof fm.data.description === 'string' ? fm.data.description : undefined;
    if (!skillName) {
      issues.push(issue('SKILL-005', 'warn', `${label}/${name}`, 'frontmatter 缺 name', 'name 用于调用，缺了只能靠目录名兜底。'));
    } else if (skillName !== name) {
      issues.push(issue('SKILL-006', 'warn', `${label}/${name}`, `name（${skillName}）与目录名不一致`, '调用时按 name 找，目录改名后容易对不上。'));
    }
    if (!desc) {
      issues.push(issue('SKILL-007', 'warn', `${label}/${name}`, '缺 description', 'description 决定模型何时会自动加载这个技能。'));
    }

    skills.push({ dir: name, name: skillName, description: desc, linksTo: isLink ? real : undefined });
  }

  return { issues, skills };
}

/** 跨根目录重名：同名技能会互相覆盖 */
export function checkDuplicates(roots: { label: string; skills: SkillInfo[] }[]): Issue[] {
  const seen = new Map<string, string[]>();
  for (const { label, skills } of roots) {
    for (const s of skills) {
      const key = s.name ?? s.dir;
      seen.set(key, [...(seen.get(key) ?? []), label]);
    }
  }
  const issues: Issue[] = [];
  for (const [key, where] of seen) {
    if (where.length > 1) {
      issues.push(issue('SKILL-008', 'warn', key, `同名技能出现在 ${where.length} 个根：${where.join(' / ')}`, '只保留一份，否则加载哪个取决于顺序。'));
    }
  }
  return issues;
}
