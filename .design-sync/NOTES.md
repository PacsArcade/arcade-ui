# design-sync notes — @pacsarcade/arcade-ui

- This package was purpose-built (2026-07-05) for the design sync + the campaign-page work; the
  Next.js apps (frens-earth, pacsarcade-org) don't consume it yet. Tokens were ported from their
  shared `globals.css` (`--color-*` → `--pa-*`).
- Build is plain `tsc` + a CSS copy script (`npm run build`). No bundler, no watcher — always
  one-shot. `--entry ./dist/index.js`.
- Fonts: Retronoid ships in `fonts/` (TTF, taken from frens-earth/public/fonts); Press Start 2P +
  Roboto load via a Google Fonts `@import` at the top of `arcade.css` → validate prints
  `[FONT_REMOTE] "Press Start 2P"` — expected, not a problem. `extraFonts: ["dist/fonts.css"]`
  carries the Retronoid @font-face.
- Previews wrap everything in `.pa-screen` (the kit's dark surface class). Components are
  designed dark-first and are unreadable on white — any new preview needs that wrapper.
- Hover/press button states and the one-shot `pa-flicker` can't be captured statically — skipped
  by design.
- Known render warns: none.

## Re-sync risks

- Preview content (campaign names, sats figures) is invented example data inside
  `.design-sync/previews/*.tsx` — safe, nothing references app code.
- Grades were captured on Playwright Chromium installed 2026-07-05 under
  `%LOCALAPPDATA%\ms-playwright` (pinned by the playwright version in `.ds-sync/`, which is
  gitignored and reinstalled per clone — a newer playwright there may need a browser reinstall).
- The Google Fonts @import means offline render checks lose Press Start 2P/Roboto — cells would
  look different but still grade; don't chase that as a regression.
- First sync uploaded 2026-07-05 to project cf3c6360-6e0f-415f-b789-84c6d9748b8b ("Pac's Arcade —
  Arcade UI"), 81 files verified by post-upload list. Re-syncs are anchored: fetch the project's
  `_ds_sync.json` → `.design-sync/.cache/remote-sync.json` and run the driver with `--remote`.
