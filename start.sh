#!/usr/bin/env bash
# Run the website locally (macOS / Linux).
#
#   ./start.sh            dev server with hot reload, http://localhost:3000
#   ./start.sh --build    production build, then serve it (what visitors get)
#
# This is for working on the site. The live site is served by Caddy from
# infra/www/coxford.net — deploy with: coxford site
set -u
cd "$(dirname "$0")" || exit 1

if command -v corepack >/dev/null 2>&1; then
  export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
  PNPM="corepack pnpm"
elif command -v pnpm >/dev/null 2>&1; then
  PNPM="pnpm"
else
  echo "no pnpm. Run ./install.sh first." >&2; exit 1
fi

[ -d node_modules ] || { echo "no node_modules — running ./install.sh first"; ./install.sh || exit 1; }

if [ "${1:-}" = "--build" ]; then
  $PNPM run build || exit 1
  echo
  echo "  serving the production build — http://localhost:3000"
  echo
  exec $PNPM run serve
fi

echo
echo "  dev server — http://localhost:3000  (Ctrl-C to stop)"
echo
exec $PNPM start
