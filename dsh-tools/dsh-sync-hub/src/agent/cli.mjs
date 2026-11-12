#!/usr/bin/env node
// Agent CLI：node src/agent/cli.mjs <command> [options]
import os from 'node:os';
import path from 'node:path';
import { createPairCode, pairDevice, probeHome, scanHome, syncOnce, saveDeviceState } from './agent.mjs';
import { readJson, sha256Hex } from '../shared/util.mjs';

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        out[key] = true;
      } else {
        out[key] = next;
        i += 1;
      }
    } else {
      out._.push(token);
    }
  }
  return out;
}

function defaultStateDir(home) {
  const key = home ? sha256Hex(path.resolve(home)).slice(0, 12) : 'default';
  return path.join(os.homedir(), '.dshsync', key);
}

function requireArg(args, name) {
  if (!args[name]) throw new Error(`missing --${name}`);
  return args[name];
}

const HELP = `dsh-sync-hub agent

用法:
  node src/agent/cli.mjs probe   --home <DSH Home>
  node src/agent/cli.mjs code    --hub <url>
  node src/agent/cli.mjs pair    --hub <url> --code <一次性码> [--name <设备名>] [--state <dir>]
  node src/agent/cli.mjs sync    --hub <url> --home <DSH Home> [--state <dir>] [--token <t>]
  node src/agent/cli.mjs status  [--state <dir>]

说明:
  · --home 指向 DSH 数据根目录（如 ~/.dsh 或 ~/.ohdsh），Agent 不关心宿主是网页版/桌面版/TUI
  · 负载按不透明字节处理，从不解析 zstd/JSONL
  · 凭据类文件被硬黑名单排除，永不上传
`;

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  if (!command || command === 'help') {
    console.log(HELP);
    return;
  }

  if (command === 'probe') {
    const home = requireArg(args, 'home');
    const probe = await probeHome(home);
    const scan = await scanHome(home);
    console.log(
      JSON.stringify(
        {
          ...probe,
          workspaces: scan.workspaces.map((w) => ({ id: w.id, path: w.path, title: w.title })),
          sessions: scan.sessions.length,
          payloadBytes: scan.sessions.reduce((n, s) => n + s.size, 0),
          warnings: scan.warnings,
        },
        null,
        2,
      ),
    );
    return;
  }

  if (command === 'code') {
    const hub = requireArg(args, 'hub');
    const pair = await createPairCode(hub);
    console.log(`一次性配对码: ${pair.code}  (过期: ${pair.expiresAt})`);
    return;
  }

  if (command === 'pair') {
    const hub = requireArg(args, 'hub');
    const code = requireArg(args, 'code');
    const stateDir = args.state ?? defaultStateDir(args.home);
    const device = await pairDevice({ hubUrl: hub, code, name: args.name ?? os.hostname() });
    await saveDeviceState(stateDir, {
      hubUrl: hub,
      deviceId: device.deviceId,
      token: device.token,
      lastSynced: {},
    });
    console.log(`已配对: deviceId=${device.deviceId}\n状态目录: ${stateDir}`);
    return;
  }

  if (command === 'sync') {
    const hub = requireArg(args, 'hub');
    const home = requireArg(args, 'home');
    const stateDir = args.state ?? defaultStateDir(home);
    const state = await readJson(path.join(stateDir, 'state.json'), {});
    const token = args.token ?? state.token;
    if (!token) throw new Error('没有令牌：先跑 pair，或用 --token');
    const report = await syncOnce({ home, stateDir, hubUrl: hub, token });
    console.log(
      JSON.stringify(
        {
          home: report.home,
          indexes: report.indexes,
          uploaded: report.uploaded,
          downloaded: report.downloaded,
          conflicts: report.conflicts,
          warnings: report.warnings,
          bytesUp: report.bytesUp,
          bytesDown: report.bytesDown,
        },
        null,
        2,
      ),
    );
    if (report.conflicts.length) process.exitCode = 2;
    return;
  }

  if (command === 'status') {
    const stateDir = args.state ?? defaultStateDir(args.home);
    const state = await readJson(path.join(stateDir, 'state.json'), null);
    console.log(JSON.stringify(state, null, 2));
    return;
  }

  throw new Error(`unknown command: ${command}`);
}

main().catch((err) => {
  console.error(`错误: ${err.message}`);
  process.exitCode = 1;
});
