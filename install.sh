#!/usr/bin/env bash
# Install the website's dependencies (macOS / Linux). Run once after cloning,
# and again whenever package.json changes.
#
# Node 22+ and pnpm 10.18.1 — both pinned in package.json, and pnpm comes from
# corepack so nothing is installed system-wide.
set -u
cd "$(dirname "$0")" || exit 1

command -v node >/dev/null 2>&1 || {
  echo "no node found. Install Node 22+: https://nodejs.org (or: brew install node)" >&2; exit 1; }

major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null)"
if [ "${major:-0}" -lt 22 ]; then
  echo "Node $(node -v) is too old; package.json needs >=22." >&2
  exit 1
fi
echo "node   $(node -v)"

# corepack ships with Node and pins pnpm to the version in package.json, so the
# lockfile resolves the same way here as it does in CI.
if command -v corepack >/dev/null 2>&1; then
  export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
  corepack enable >/dev/null 2>&1 || true
  corepack prepare pnpm@10.18.1 --activate >/dev/null 2>&1 || true
  PNPM="corepack pnpm"
elif command -v pnpm >/dev/null 2>&1; then
  PNPM="pnpm"
else
  echo "no pnpm and no corepack. Install pnpm: https://pnpm.io/installation" >&2; exit 1
fi
echo "pnpm   $($PNPM -v 2>/dev/null)"

echo "installing dependencies ..."
$PNPM install --frozen-lockfile || { echo "install failed" >&2; exit 1; }

echo
echo "  done. ./start.sh runs the dev server on http://localhost:3000"
echo "  To publish for real: ~/Desktop/Services/infra/bin/coxford site"
echo
