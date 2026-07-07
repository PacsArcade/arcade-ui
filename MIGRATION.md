# Migration — pointing the three sites at arcade-ui

Goal: one brand source. Components and tokens live HERE; the sites stop
carrying diverging copies. (FrenProfile/TagClaim/RegistrationPage already
differ between org and frens.earth by hundreds of bytes — that rot is what
this repo ends.)

## 0. Publish

Push this folder as `PacsArcade/arcade-ui`. No registry needed:

```bash
npm i github:PacsArcade/arcade-ui
```

## 1. pacsarcade-org

1. `npm i github:PacsArcade/arcade-ui`, and in `next.config.ts`:
   `transpilePackages: ["@pacsarcade/arcade-ui"]`.
2. `globals.css`: delete the `@theme` block, glow utilities, blink/pulse/
   matrix keyframes, easy-mode rules — replace with
   `@import "@pacsarcade/arcade-ui/tailwind";` right after
   `@import "tailwindcss";`. KEEP app-specific pieces local: crt-letter-on,
   flicker-once, danger-pulse, nsec-blur/reveal, screen-shake, and the
   legacy `@layer base` styles.
   **⚠ REQUIRED — add the `@source` line or the header breaks** (Tailwind
   v4 never scans node_modules, so utilities used only by packaged
   components don't generate: the coin renders at natural gif size and
   nav gaps vanish — found the hard way on pacsarcade.org, 2026-07-07):
   ```css
   @source "../../node_modules/@pacsarcade/arcade-ui/react";
   ```
   (Path is relative to your globals.css.)
3. Delete `src/components/SiteHeader.tsx`, `BlockClock.tsx`,
   `EasyModeToggle.tsx`, `CRTOverlay.tsx`, `src/lib/easy-mode.ts`.
   Re-import from `@pacsarcade/arcade-ui` (named exports; SiteHeader takes
   optional `links`/`wordmark`/`coinSrc` props — org's defaults match).
   Note: the packaged SiteHeader/BlockClock are the PATCHED versions
   (marquee + ticker, coin menu right at 28px, HUD-white block) — applying
   this migration ships the header fix.
4. Add `ez-reflow` to the HOW-THE-ARCADE-WORKS grid (one-line page.tsx
   edit; see handoff/patches/PATCHES.md).
5. Icons: `icons/icon.svg` → `src/app/icon.svg`, `icons/apple-icon.png` →
   `src/app/apple-icon.png`, delete `src/app/favicon.ico` + the
   create-next-app svgs in `public/`, add og-image metadata
   (see handoff/icons/ICONS.md).
6. `README.md` is still stock create-next-app — replace with a Pac's
   Arcade one while you're in there.

## 2. frens.earth

Same steps 1–3 and 5 (its own og-image). It has no SiteHeader today — when
one lands, take it from the package with
`links={[...]} wordmark="FRENS.EARTH"`. Phase 2: reconcile FrenProfile /
TagClaim / RegistrationPage against org's copies and move the merged
versions here.

## 3. pacsarcade-com (static)

1. Vendor the package (no build step): copy `css/`, `fonts/`, `icons/` in,
   or add the repo as a git submodule.
2. Replace the token/`:root` section of `styles.css` with
   `<link rel="stylesheet" href="arcade-ui/css/index.css">` and migrate
   page styles to `pa-*` classes over time.
3. Favicon links per `handoff/icons/ICONS.md`.

## 4. proof-of-knowledge-engine

The node console (`services/mud/admin.html`) stays self-contained (an
operator's node must not depend on npm) — but it MUST follow this repo's
tokens verbatim. Spec: `handoff/poke-node-console/DESIGN-DOC.md`. When the
webclient/admin pages get a build step someday, they consume `css/index.css`
directly.

## Versioning

- 0.1.0 — published campaign components (ArcadeButton … TrustBadge) + pa-* CSS.
- 0.2.0 (this) — adds header suite (SiteHeader/BlockClock/EasyModeToggle/
  CRTOverlay + easy-mode store), Tailwind theme layer, verse presets,
  easy-mode CSS, fonts, pixel-₿ icon set.

Rule going forward: brand changes land HERE first, sites pull the bump.
GG's.
