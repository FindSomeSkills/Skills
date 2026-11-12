#!/usr/bin/env node
// deai —— 确定性去 AI 化预检。不调模型、不评分、不判断文章好坏。
// 用法：deai text <file...> [--json] [--strict] [--rules <file>]
//       deai report <file...> [--json]       与 text 等价，给 report 用
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';
import { loadRules, runRules, type Finding } from './core.ts';
import { loadUiRules, runUiRules, snapSpacingToGrid } from './ui.ts';

const UI_EXTS = new Set(['.html', '.htm', '.css', '.astro', '.tsx', '.jsx', '.vue', '.svg']);

const SEV_ORDER = ['error', 'warn', 'info'] as const;
const SEV_LABEL: Record<string, string> = { error: '必改', warn: '建议', info: '参考' };

interface Args {
  cmd: string;
  files: string[];
  json: boolean;
  strict: boolean;
  fix: boolean;
  rules?: string;
}

function parseArgs(argv: string[]): Args {
  const files: string[] = [];
  let cmd = '';
  let json = false;
  let strict = false;
  let fix = false;
  let rules: string | undefined;
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (!cmd && !a.startsWith('-')) {
      cmd = a;
      continue;
    }
    if (a === '--json') json = true;
    else if (a === '--strict') strict = true;
    else if (a === '--fix') fix = true;
    else if (a === '--rules') {
      rules = argv[i + 1];
      i += 1;
    } else if (!a.startsWith('-')) files.push(a);
  }
  return { cmd, files, json, strict, fix, rules };
}

const HELP = `deai ${'0.1.0'} —— 确定性去 AI 化预检

用法：
  deai text <file...> [--json] [--strict] [--rules <file>]
  deai ui <file|dir...> [--json] [--strict]
  deai report <file...> [--json]

说明：
  · 只报机械可复现的标记，不评分、不判断好坏、不引用「检测」。
  · 报告干净不等于写得好；报告有问题也不等于写得差。
  · --strict 额外启用默认关闭的规则（文本 TXT-003/004/006；界面 UI-008）。
  · --json 输出机器可读结果，退出码：有 error 时为 1，否则 0。
`;

function collectFiles(inputs: string[]): string[] {
  const out: string[] = [];
  for (const p of inputs) {
    const abs = resolve(p);
    const st = statSync(abs);
    if (st.isDirectory()) {
      throw new Error(`暂不支持目录：${p}（先传具体文件）`);
    }
    out.push(abs);
  }
  return out;
}

function collectUiFiles(inputs: string[]): string[] {
  const out: string[] = [];
  for (const p of inputs) {
    const abs = resolve(p);
    const st = statSync(abs);
    if (!st.isDirectory()) {
      out.push(abs);
      continue;
    }
    for (const name of readdirSync(abs, { recursive: true }) as string[]) {
      const full = resolve(abs, name);
      if (!UI_EXTS.has(extname(full).toLowerCase())) continue;
      try {
        if (statSync(full).isFile()) out.push(full);
      } catch {
        // 断裂的符号链接跳过
      }
    }
  }
  return out;
}

function renderText(findings: Finding[], files: string[], isUi = false): string {
  const lines: string[] = [];
  const counts: Record<string, number> = { error: 0, warn: 0, info: 0 };
  for (const f of findings) counts[f.severity] += 1;

  lines.push('');
  lines.push(isUi ? 'deai · 界面预检' : 'deai · 文本预检');
  lines.push(`文件 ${files.length} 个 · 命中 ${findings.length} 条（必改 ${counts.error} / 建议 ${counts.warn} / 参考 ${counts.info}）`);
  lines.push('报告干净不等于写得好，有问题也不等于写得差。这里只报机械标记。');

  for (const sev of SEV_ORDER) {
    const group = findings.filter((f) => f.severity === sev);
    if (!group.length) continue;
    lines.push('');
    lines.push(`── ${SEV_LABEL[sev]}（${sev}）${group.length} 条`);
    for (const f of group) {
      lines.push(`  ${basename(f.file)}:${f.line}  ${f.ruleId}  ${f.message}`);
      lines.push(`      片段：${f.evidence}`);
      lines.push(`      改法：${f.fix}`);
      lines.push(`      来源：${f.source}`);
    }
  }

  if (!findings.length) {
    lines.push('');
    lines.push('没有命中任何规则。这只说明机械标记没出现，不说明文章好。');
  }
  lines.push('');
  return lines.join('\n');
}

function main(): number {
  const args = parseArgs(process.argv.slice(2));
  if (!args.cmd || args.cmd === 'help' || args.cmd === '--help') {
    process.stdout.write(HELP);
    return 0;
  }
  if (args.cmd !== 'text' && args.cmd !== 'report' && args.cmd !== 'ui') {
    process.stderr.write(`未知命令：${args.cmd}\n\n${HELP}`);
    return 2;
  }
  if (!args.files.length) {
    process.stderr.write('缺少参数。\n\n' + HELP);
    return 2;
  }

  const isUi = args.cmd === 'ui';
  const rules = args.rules
    ? JSON.parse(readFileSync(resolve(args.rules), 'utf8')).rules
    : isUi
      ? loadUiRules()
      : loadRules('text');

  const files = isUi ? collectUiFiles(args.files) : collectFiles(args.files);
  const findings: Finding[] = [];

  // --fix：只动间距数值（向上取整到 4 的倍数），不改结构、不改文字
  const fixed: string[] = [];
  if (isUi && args.fix) {
    for (const file of files) {
      const raw = readFileSync(file, 'utf8');
      const { text, changes } = snapSpacingToGrid(raw, 4);
      if (!changes.length) continue;
      writeFileSync(file, text, 'utf8');
      fixed.push(`${basename(file)}  ${changes.length} 处`);
    }
  }

  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    findings.push(
      ...(isUi ? runUiRules(file, raw, { strict: args.strict, rules }) : runRules(raw, { file, strict: args.strict, rules })),
    );
  }

  if (isUi && args.fix && !args.json) {
    process.stdout.write(`\n已按 4px 栅格修正：${fixed.length ? fixed.join('，') : '没有需要改的数值'}\n`);
  }

  if (args.json) {
    process.stdout.write(`${JSON.stringify({ version: '0.1.0', cmd: args.cmd, strict: args.strict, files, findings }, null, 2)}\n`);
  } else {
    process.stdout.write(renderText(findings, files, isUi));
  }

  return findings.some((f) => f.severity === 'error') ? 1 : 0;
}

process.exitCode = main();
