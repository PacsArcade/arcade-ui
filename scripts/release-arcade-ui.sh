#!/usr/bin/env bash
# release-arcade-ui.sh — cut the arcade-ui GitHub release for @frens-earth/arcade-ui.
#
# arcade-ui has never had a tagged release: consumers today pin a raw
# `/archive/<sha>.tar.gz` commit-archive URL. This is the first real
# release, v0.5.0, the same version that carries the npm-scope rescope
# (@pacsarcade/arcade-ui -> @frens-earth/arcade-ui, TASK-285B).
#
# DRY-RUN BY DEFAULT. Nothing is created, uploaded, or pushed unless you
# pass --run. The Admiral confirms the publish in one line; only then does
# this script get run for real (by the Admiral or by Number One if ruled).
#
# Usage:
#   scripts/release-arcade-ui.sh            # dry run — prints the exact gh command
#   scripts/release-arcade-ui.sh --run       # executes it for real

set -euo pipefail

REPO="PacsArcade/arcade-ui"
TAG="arcade-ui-v0.5.0"
TITLE="arcade-ui v0.5.0 — @frens-earth/arcade-ui"
TARBALL_DEFAULT="/home/pac/dev/home/outbox/task-285b/packs/frens-earth-arcade-ui-0.5.0.tgz"
TARBALL="${TARBALL:-$TARBALL_DEFAULT}"

NOTES="First tagged release of arcade-ui, and its first release under the
neutral npm scope: \`@pacsarcade/arcade-ui\` -> \`@frens-earth/arcade-ui\`
(the Admiral's scope ruling, 0018.06.25 a₿ · block 967,144; H108 A).

Consumers previously pinned a raw commit-archive URL
(\`/archive/<sha>.tar.gz\`). From this release forward, install the
attached tarball or point at this release asset instead.

No design-language, brand-name, or CSS-token changes — scope rename only.
See MIGRATION.md for the updated import string.

Asset: \`frens-earth-arcade-ui-0.5.0.tgz\` (\`npm pack\` output, sha256
in the release notes / CI log — verify against the outbox copy before
trusting)."

RUN=0
for arg in "$@"; do
  case "$arg" in
    --run) RUN=1 ;;
    *) echo "unknown arg: $arg" >&2; exit 1 ;;
  esac
done

if [ ! -f "$TARBALL" ]; then
  echo "error: tarball not found at $TARBALL" >&2
  echo "  (set TARBALL=/path/to/frens-earth-arcade-ui-0.5.0.tgz to override)" >&2
  exit 1
fi

CMD=(gh release create "$TAG" "$TARBALL" --repo "$REPO" --title "$TITLE" --notes "$NOTES")

if [ "$RUN" -eq 0 ]; then
  echo "DRY RUN — would execute:"
  printf '  %q' "${CMD[@]}"
  echo
  echo
  echo "Re-run with --run to execute for real. Requires: gh auth'd as the fleet uploader, push access to PacsArcade/arcade-ui, and Admiral confirmation."
  exit 0
fi

echo "Executing release for real: $TAG -> $REPO"
"${CMD[@]}"
