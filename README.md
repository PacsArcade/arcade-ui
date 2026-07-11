# @pacsarcade/arcade-ui

One brand, every cabinet. The shared Pac's Arcade UI system: CSS core
(framework-free), a Tailwind v4 theme layer, React components, fonts, and
the pixel-&#8383; icon set. Dark-first — everything sits on CRT black.

## What's inside

- `css/` — framework-free core. `index.css` pulls tokens + every `pa-*`
  component class + arcade themes + the visibility toggle mode. Works in
  plain HTML (pacsarcade-com) with zero build.
- `tailwind/theme.css` — the `@theme` token block + glow/motion utilities +
  visibility-toggle rules for the Next apps (org, frens.earth). Import it
  right after `@import "tailwindcss";`.
- `react/` — shared components: `SiteHeader`, `BlockClock`,
  `EasyModeToggle` (the mini-CRT visibility toggle), `CRTOverlay`, the
  `easy-mode` store, plus the console module (`ConsoleNav`, `ConsoleDeck`,
  the `ConsoleSite`/`ConsoleRoom` manifest types). The 14
  campaign components (ArcadeButton, PixelFrame, EnergyBar…) ship compiled
  in the published 0.1.0 bundle and as `pa-*` classes in `css/arcade.css`.
- `fonts/` — Retronoid (self-hosted), OpenDyslexic (easy mode). Press
  Start 2P + Roboto load from Google in `fonts.css` for static sites; Next
  apps keep using `next/font`.
- `icons/` — `bitcoin.gif` (the canonical spinning coin — headers, menu
  buttons, gates) + the favicon PNG family derived from its first frame.
- `preview.html` — open directly in a browser: tokens, components, and all
  arcade themes side by side.

## Quick start — static site

```html
<link rel="stylesheet" href="arcade-ui/css/index.css">
<body class="pa-screen">…</body>
```

## Quick start — Next.js (Tailwind v4)

```bash
npm i github:PacsArcade/arcade-ui
```

```css
/* globals.css */
@import "tailwindcss";
@import "@pacsarcade/arcade-ui/tailwind";
```

```ts
// next.config.ts
const nextConfig = { transpilePackages: ["@pacsarcade/arcade-ui"] };
```

```tsx
import { SiteHeader, CRTOverlay } from "@pacsarcade/arcade-ui";
```

## The console module

Every cabinet gets the same admin deck: generic operator-console
primitives, driven entirely by a manifest the APP owns.

- `ConsoleSite` / `ConsoleRoom` — the manifest types. A site declares its
  identity (`home`, `domain`, `deck` hub route) and its rooms once, in its
  own `lib/console` file.
- `ConsoleNav` — the bridge rail on every room page: ⌂ site exit ▸ ⚓ DECK
  ▸ room links, current room lit from `currentPath`.
- `ConsoleDeck` — the hub: kicker + marquee + the grid of room cards, with
  app-owned extras as children.

The BOUNDARY: auth stays app-side. Each site brings its own gate and
whoami (frens.earth: OperatorGate + operator-auth; pacsarcade-org:
console-auth) and mounts these components behind it — the module renders
furniture, it never guards it. First consumer: pacsarcade-org's
`/console`. frens.earth migrates its `/a` deck onto it round 2 (its
`AdminNav` + deck page are the reference this module was extracted from —
see `docs/operator-console.md` in that repo).

## Theming — arcade themes + accents

Dark is the base. A server owner picks a theme cabinet and/or a flair
accent — **semantic hues never move** (coin = money, neon = live, cyan =
info, ghost = danger). See `THEMING.md`.

```html
<html data-arcade-theme="vapor">     <!-- theme cabinet -->
<html style="--pa-pink:#39a7ff">     <!-- or just re-accent the flair slot -->
```

## House rules (short form)

Dark-first `pa-screen`; coin gold for money ONLY; "fren" never "friend";
certs are ETCHED; no countdowns, no scarcity theater; ≥44px touch targets;
no border radius. Full contract lives in the org repo's design docs.

GG's 💛
