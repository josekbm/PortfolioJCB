#!/usr/bin/env bash
# Reproduce the baseline measurements for commit 039e839.
# Requirements: curl, git, node, npx and a Chrome/Chromium.
#
# The scripts live in the current tree; commit 039e839 identifies the code
# that was measured. The live site must still be running that baseline (it is
# until Phase 1 is deployed). This script overwrites the artifacts in
# docs/seo/baseline/.
#
# Install puppeteer-core somewhere and expose it via NODE_PATH:
#   npm --prefix /tmp/seo-tools install puppeteer-core
#   CHROME_PATH="/path/to/chrome" \
#     NODE_PATH=/tmp/seo-tools/node_modules \
#     bash docs/seo/baseline/reproduce.sh
set -euo pipefail

SITE="${SITE:-https://blancodev.es}"
OUT="${OUT:-docs/seo/baseline}"
LIGHTHOUSE_VERSION="13.6.0"
mkdir -p "$OUT"

{
  echo "=== date ==="
  date -u
  echo "=== commit ==="
  git rev-parse HEAD
  echo "=== baseline commit ==="
  echo "039e839de565f5b6e30c75d8b45d71bbbc877e4f"
  for path in / /es/ /index.html /es/index.html /CV_Jose_Carlos_Blanco.pdf /robots.txt /sitemap.xml /esto-no-existe; do
    echo "=== $path ==="
    curl -sS -D - -o /dev/null "$SITE$path"
  done
  echo "=== canonical /index.html ==="
  curl -sS "$SITE/index.html" | grep -o '<link rel="canonical"[^>]*>'
  echo "=== canonical /es/index.html ==="
  curl -sS "$SITE/es/index.html" | grep -o '<link rel="canonical"[^>]*>'
  echo "=== gzip home ==="
  curl -sS -I -H 'Accept-Encoding: gzip' "$SITE/" | grep -iE 'content-encoding|vary'
  echo "=== gzip asset ==="
  ASSET="$(curl -sS "$SITE/" | grep -o '/assets/main-[^"]*\.js' | head -1)"
  echo "asset=$ASSET"
  curl -sS -I -H 'Accept-Encoding: gzip' "$SITE$ASSET" | grep -iE 'content-encoding|cache-control|vary'
  echo "=== asset headers ==="
  curl -sS -D - -o /dev/null "$SITE$ASSET"
  echo "=== www https ==="
  curl -sS -D - -o /dev/null "https://www.blancodev.es/"
  echo "=== www http ==="
  curl -sS -D - -o /dev/null "http://www.blancodev.es/"
  echo "=== apex http ==="
  curl -sS -D - -o /dev/null "http://blancodev.es/"
} > "$OUT/live-checks-full.txt" 2>&1

if [ -n "${CHROME_PATH:-}" ]; then
  if ! node -e "require('puppeteer-core')" >/dev/null 2>&1; then
    echo "puppeteer-core not found. Install it and set NODE_PATH, e.g.:" >&2
    echo "  npm --prefix /tmp/seo-tools install puppeteer-core" >&2
    echo "  NODE_PATH=/tmp/seo-tools/node_modules ..." >&2
    exit 1
  fi

  echo "==> Lighthouse $LIGHTHOUSE_VERSION (mobile EN, mobile ES, desktop EN)"
  npx --yes "lighthouse@$LIGHTHOUSE_VERSION" "$SITE/" \
    --only-categories=performance,seo,accessibility,best-practices \
    --output=json --output-path="$OUT/lighthouse-mobile.json" \
    --chrome-flags="--headless=new --no-sandbox" --quiet
  npx --yes "lighthouse@$LIGHTHOUSE_VERSION" "$SITE/es/" \
    --only-categories=performance,seo,accessibility,best-practices \
    --output=json --output-path="$OUT/lighthouse-mobile-es.json" \
    --chrome-flags="--headless=new --no-sandbox" --quiet
  npx --yes "lighthouse@$LIGHTHOUSE_VERSION" "$SITE/" --preset=desktop \
    --only-categories=performance,seo,accessibility,best-practices \
    --output=json --output-path="$OUT/lighthouse-desktop.json" \
    --chrome-flags="--headless=new --no-sandbox" --quiet

  echo "==> Rendered DOM metrics"
  node "$OUT/metrics.cjs"
else
  echo "CHROME_PATH not set: skipping Lighthouse and rendered DOM metrics."
fi

echo "Done. Artifacts in $OUT/"
