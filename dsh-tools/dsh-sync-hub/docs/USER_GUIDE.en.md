# DSH Sync Hub — User Guide

> Synchronize and continue DeepSeek Harness (DSH) sessions across machines and across DSH builds.
> Supports DSH 0.2.x. Session files are moved as **opaque bytes** — never parsed.

---

## 1. What it solves

| Problem | What this does |
| --- | --- |
| You paused mid-task in the web build; the desktop build can't see it | Sessions **and** indexes sync, so the list looks the same on both |
| You want to know "how far did it get last night" from your phone | Read-only console in the browser (your phone never hosts a session) |
| Both machines edited the same session — who wins? | It detects the conflict and **keeps both**, then asks you. It never silently overwrites. |
| New laptop, all history gone | Pair it and pull everything |

The core design: **it syncs a DSH data directory, not a DSH client.** That is why web, desktop, and terminal builds can all sync with each other — and why a future DSH build won't require a rewrite.

---

## 2. What gets synced

### Synced

| Path (under the DSH data directory) | Why it matters |
| --- | --- |
| `sessions/<workspace>/<session>/session*.jsonl.zstd` | The session payload (`v4` and legacy formats) |
| `storages/workspace.json` | Workspace and session lists — **skip it and sessions will not appear** |
| `storages/session_projcache.json` | Session titles and stats — **skip it and sessions show up untitled** |

### Never synced (hard deny-list)

`.credentials.yaml`, `.credentials*`, `*.pem`, `*.key`, `*.p12`, `id_rsa*`, `.env`, `profiles/**/cred*`

These are skipped during scanning: never read, never hashed, never uploaded.

### Not synced by default

`storages/schedule.json` (reminders), `storages/dsh_automation.json` (desktop automation), `logs/`, `cache/`, `profiles/`, `skills/`. These are **machine-local state**; copying them causes conflicts.

---

## 3. Supported platforms

| Platform | Capability | Notes |
| --- | --- | --- |
| Windows / macOS / Linux | Full (sync host) | Requires Node ≥ 20 |
| DSH web / desktop / terminal builds | Full | Only the data directory matters, not the host |
| Android (Termux) | Full, with manual setup | Install Termux + Node; the OS may kill it in the background |
| iOS / HarmonyOS NEXT | Read-only console | No Node runtime, so it cannot host sessions |

> Phones do not run DSH. "Continue on your phone" means: see progress, trigger a restore, read a handoff summary. That is the boundary, not a bug.

---

## 4. Install

Node.js 20 or newer (verified on 24.19.0). **Zero third-party dependencies** — no `npm install` needed.

```bash
git clone <your-repo-url> dsh-sync-hub
cd dsh-sync-hub
node --version    # must be >= 20
```

---

## 5. Quick start

### Step 1 — Start the Hub on an always-on machine

```bash
node src/hub/server.mjs
# [hub] listening on http://0.0.0.0:7788  data=./.dshsync-hub
```

Optional env vars: `PORT` (7788), `HOST` (0.0.0.0), `DSHSYNC_DATA` (storage directory).

> If you expose it publicly, put it behind HTTPS (Caddy / Nginx). Otherwise device tokens travel in clear text.

### Step 2 — Create a pairing code and pair each device

On the Hub machine:

```bash
node src/agent/cli.mjs code --hub http://<hub-ip>:7788
# Pairing code: SZWXK5Y9  (expires: 2026-11-13T04:10:00.000Z)
```

On the other device:

```bash
node src/agent/cli.mjs pair --hub http://<hub-ip>:7788 --code SZWXK5Y9 --name my-laptop
# Paired: deviceId=dev_xxx
# State dir: ~/.dshsync/<hash>
```

The code is valid for 10 minutes and works once.

### Step 3 — Sync

```bash
node src/agent/cli.mjs sync --hub http://<hub-ip>:7788 --home ~/.dsh
```

`--home` points at the DSH data directory:

| DSH build | Data directory |
| --- | --- |
| Web / terminal | `~/.dsh` |
| Desktop | `~/.ohdsh` (check your machine) |

The first sync is a full transfer; later runs only move changed chunks.

---

## 6. Command reference

| Command | Purpose |
| --- | --- |
| `node src/agent/cli.mjs probe --home <dir>` | Read-only inspection: build, formats, index versions, session count, payload size. **Modifies nothing.** |
| `node src/agent/cli.mjs code --hub <url>` | Create a one-time pairing code |
| `node src/agent/cli.mjs pair --hub <url> --code <code> [--name <name>]` | Pair and store the device token |
| `node src/agent/cli.mjs sync --hub <url> --home <dir>` | Run one bidirectional sync |
| `node src/agent/cli.mjs status` | Show this machine's token and last-synced hashes |

Exit codes for `sync`: `0` ok, `2` conflicts pending, `1` error.

Sample output:

```json
{
  "indexes": [{ "kind": "workspace", "seq": 3, "changed": true }],
  "uploaded":   [{ "key": "…|session-abc|v4", "mode": "delta", "bytes": 28928, "total": 160000 }],
  "downloaded": [{ "key": "…|session-xyz|v4", "bytes": 6078693 }],
  "conflicts": [],
  "bytesUp": 28928,
  "bytesDown": 6078693
}
```

---

## 7. How conflicts work

**Default: keep both. The local file is not touched.**

When two devices write forward from the same version, the later one gets a conflict:

```json
{ "conflicts": [{ "key": "…|session-abc|v4", "reason": "base-is-stale", "conflictId": "cf_xxx" }] }
```

- The Hub stores the late arrival as a **conflict copy** (nothing is lost); the current version stays with the earlier writer;
- Your local file stays exactly as you wrote it — it is never replaced by someone else's version;
- To resolve, inspect both devices with `--home`, keep the one you want, discard the other on the Hub side. (A console UI for this is planned; the CLI only reports today.)

**Why no auto-merge:** sessions are append-only compressed frames. Once two devices genuinely diverge, merging automatically can produce a file DSH cannot read. Better to stop and ask than to guess.

---

## 8. Platform limits (reported, never silently downgraded)

| Situation | Symptom | Fix |
| --- | --- | --- |
| Windows: file held by DSH | That session is skipped this round | Close the session and rerun |
| Windows: path longer than 260 chars | Write fails | Enable long paths or use a shorter workspace path |
| macOS: disk access not granted | `EACCES` while reading | System Settings → Privacy & Security → Full Disk Access |
| Android/Termux: killed in background | Sync interrupted | Whitelist Termux from battery optimization |
| iOS / HarmonyOS | Agent cannot run | Use the browser as a read-only console |
| Very different DSH versions | Read-only mode | Bring both sides to the same 0.2.x release |

---

## 9. Security notes

- **Transport:** a self-signed setup is not enough — use an HTTPS reverse proxy, and prefer binding the Hub to a private network.
- **Tokens:** the device token lives in `~/.dshsync/<hash>/state.json`. Treat it like a password; never commit it.
- **Server storage:** sessions are stored as content-addressed chunks under `DSHSYNC_DATA`.
- **Credentials:** see the deny-list in §2 — they never enter the sync path.
- **Revocation:** remove the entry from `meta/devices.json` on the Hub (a console button is planned).

---

## 10. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `401 invalid token` | Token invalid or pairing incomplete | Pair again |
| `404 code not found` | Wrong or unused code | Create a new one |
| `409 code already used` | Code already redeemed | Create a new one |
| Sessions synced but missing from the list | `workspace.json` not synced | Ensure `storages/` is in scope |
| Sessions listed but untitled | `session_projcache.json` not synced | Same as above |
| `EADDRINUSE` | Port taken | Change `PORT` |
| `EPERM` when running tests | Restricted env blocks spawning | Run `node test/e2e.test.mjs` directly instead of `node --test` |
| DSH doesn't show new sessions | In-memory cache | Restart DSH |

---

## 11. Try it without touching real data

```bash
# Two fake devices, full round trip
node tools/demo.mjs

# Read-only inspection of a real DSH directory
node tools/probe.mjs ~/.dsh

# Make a minimal fake home and sync it
node tools/make-fixture.mjs ./try
node src/agent/cli.mjs sync --hub http://127.0.0.1:7788 --home ./try/home

# Tests
node test/e2e.test.mjs        # 4: end-to-end / delta / conflict / credentials
node test/protocol.test.mjs   # 6: auth / pairing / chunk integrity / index merge / conflicts
```

---

## 12. Status and boundaries

**Implemented:** pairing, home detection, bidirectional session + index sync, delta transfer (append-only writes send only the tail chunk), conflict copies, read-only probe, CLI.

**Not implemented yet:** web console / mobile PWA, version history and one-click restore, SSE push, conflict resolution UI, `attachments/` sync, multi-user.

**Deliberately out of scope:** parsing session contents, replacing remote takeover, auto-merging diverged sessions.
