#!/usr/bin/env node
// dsh-doctor —— 装完 skills 或改完 profile 之后，先跑这个。
// 只读静态文件，不改任何东西，不启动 DSH。
// 用法：dsh-doctor [--home <DSH Home>] [--profile <名字>] [--json]
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import {
  checkDuplicates,
  checkSkillsDir,
  validateComposition,
  validatePatch,
  type Issue,
} from './checks.ts';

const SEV_ORDER = ['error', 'warn', 'info'] as const;
const SEV_LABEL: Record<string, string> = {
  error: '会让 DSH 起不来或静默失效',
  warn: '能起来，但行为不可预期',
  info: '只是提醒',
};

interface Args {
  home: string;
  profile?: string;
  json: boolean;
  extraSkills: string[];
}

function parseArgs(argv: string[]): Args {
  let home = join(homedir(), '.dsh');
  let profile: string | undefined;
  let json = false;
  const extraSkills: string[] = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--home') {
      home = resolve(argv[i + 1]);
      i += 1;
    } else if (a === '--profile') {
      profile = argv[i + 1];
      i += 1;
    } else if (a === '--extra-skills') {
      extraSkills.push(resolve(argv[i + 1]));
      i += 1;
    } else if (a === '--json') json = true;
  }
  return { home, profile, json, extraSkills };
}

function checkProfile(dir: string, name: string): Issue[] {
  const issues: Issue[] = [];
  const known = new Set<string>();
  const pkgPath = join(dir, 'package.json');

  if (!existsSync(pkgPath)) {
    issues.push({
      code: 'BUNDLE-000',
      severity: 'warn',
      where: name,
      message: '这个 profile 没有 package.json',
      fix: '没有 package.json 就无法解析 bundles，确认它是不是 profile 目录。',
    });
  } else {
    let bundles: string[] = [];
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      const declared = pkg?.dsh?.profile?.bundles;
      if (Array.isArray(declared)) bundles = declared.filter((x: unknown) => typeof x === 'string');
      if (!bundles.length) {
        issues.push({
          code: 'BUNDLE-001',
          severity: 'warn',
          where: `${name}/package.json`,
          message: '没有 dsh.profile.bundles',
          fix: '这个 profile 目前只有 patch 层；要组合插件就得声明 bundles。',
        });
      }
    } catch (err) {
      issues.push({
        code: 'BUNDLE-002',
        severity: 'error',
        where: `${name}/package.json`,
        message: `package.json 解析失败：${(err as Error).message}`,
        fix: 'JSON 不能有注释和尾逗号。',
      });
    }

    for (const bundle of bundles) {
      // 用 Node 的解析链判断；pnpm 会把依赖提到上层 node_modules，朴素路径会误判
      let pkgDir: string | null = null;
      const req = createRequire(join(dir, 'package.json'));
      try {
        pkgDir = dirname(req.resolve(`${bundle}/package.json`));
      } catch {
        try {
          pkgDir = dirname(req.resolve(bundle));
        } catch {
          pkgDir = null;
        }
      }

      if (!pkgDir) {
        issues.push({
          code: 'BUNDLE-003',
          severity: 'error',
          where: `${name}/package.json`,
          message: `bundle 已声明但解析不到：${bundle}`,
          fix: '在 profile 目录跑 pnpm install，或把这条从 bundles 里去掉。',
        });
        continue;
      }

      for (const f of ['cordis.yml', 'cordis.yaml']) {
        const p = join(pkgDir, f);
        if (!existsSync(p)) continue;
        const res = validateComposition(readFileSync(p, 'utf8'), `${bundle}/${f}`);
        issues.push(...res.issues);
        for (const id of res.ids) known.add(id);
      }
    }
  }

  const compPath = join(dir, 'cordis.yml');
  if (existsSync(compPath)) {
    const res = validateComposition(readFileSync(compPath, 'utf8'), `${name}/cordis.yml`);
    issues.push(...res.issues);
    for (const id of res.ids) known.add(id);
  }

  const patchPath = join(dir, 'cordis.patch.yml');
  if (existsSync(patchPath)) {
    issues.push(...validatePatch(readFileSync(patchPath, 'utf8'), `${name}/cordis.patch.yml`, known));
  }

  return issues;
}

function main(): number {
  const args = parseArgs(process.argv.slice(2));
  const issues: Issue[] = [];

  const roots: { label: string; skills: ReturnType<typeof checkSkillsDir>['skills'] }[] = [];
  const skillRoots: [string, string][] = [['skills', join(args.home, 'skills')]];
  args.extraSkills.forEach((p, i) => skillRoots.push([`extra${i + 1}`, p]));

  for (const [label, path] of skillRoots) {
    if (!existsSync(path)) continue;
    const res = checkSkillsDir(path, label);
    issues.push(...res.issues);
    roots.push({ label, skills: res.skills });
  }
  if (roots.length > 1) issues.push(...checkDuplicates(roots));

  const profilesDir = join(args.home, 'profiles');
  let profiles: string[] = [];
  if (existsSync(profilesDir)) {
    profiles = readdirSync(profilesDir).filter((n) => {
      if (n === 'node_modules' || n.startsWith('.')) return false;
      try {
        return statSync(join(profilesDir, n)).isDirectory();
      } catch {
        return false;
      }
    });
  }
  const targets = args.profile ? profiles.filter((p) => p === args.profile) : profiles;
  for (const p of targets) issues.push(...checkProfile(join(profilesDir, p), p));

  const rootPatch = join(args.home, 'cordis.patch.yml');
  if (existsSync(rootPatch)) {
    const known = new Set<string>();
    for (const p of profiles) {
      const compPath = join(profilesDir, p, 'cordis.yml');
      if (!existsSync(compPath)) continue;
      const res = validateComposition(readFileSync(compPath, 'utf8'), `${p}/cordis.yml`);
      for (const id of res.ids) known.add(id);
    }
    issues.push(...validatePatch(readFileSync(rootPatch, 'utf8'), 'cordis.patch.yml', known));
  }

  const counts: Record<string, number> = { error: 0, warn: 0, info: 0 };
  for (const i of issues) counts[i.severity] += 1;

  if (args.json) {
    process.stdout.write(
      `${JSON.stringify(
        {
          home: args.home,
          profiles: targets,
          skills: roots.map((r) => ({ root: r.label, count: r.skills.length })),
          counts,
          issues,
        },
        null,
        2,
      )}\n`,
    );
  } else {
    const lines: string[] = [''];
    lines.push('dsh-doctor · profile 与 skills 预检');
    lines.push(`home: ${args.home}`);
    lines.push(`skills: ${roots.map((r) => `${r.label}(${r.skills.length})`).join('  ') || '无'}`);
    lines.push(`profiles: ${targets.join(', ') || '无'}`);
    lines.push(`问题 ${issues.length} 条（必改 ${counts.error} / 警告 ${counts.warn} / 提醒 ${counts.info}）`);
    for (const sev of SEV_ORDER) {
      const group = issues.filter((i) => i.severity === sev);
      if (!group.length) continue;
      lines.push('');
      lines.push(`── ${sev} · ${SEV_LABEL[sev]}（${group.length}）`);
      for (const i of group) {
        lines.push(`  [${i.code}] ${i.where}`);
        lines.push(`      ${i.message}`);
        lines.push(`      改法：${i.fix}`);
      }
    }
    if (!issues.length) {
      lines.push('');
      lines.push('静态检查通过。这不代表 DSH 一定能启动，只说明这些已知的坑没踩到。');
    }
    lines.push('');
    process.stdout.write(lines.join('\n'));
  }

  return counts.error > 0 ? 1 : 0;
}

process.exitCode = main();
