# @pacsarcade/arcade-ui

Pac's Arcade 8-bit crowdfunding UI kit — the shared component library behind the
campaign pages. CRT-authentic but readable: glow lives on headings and banners,
body copy stays crisp. `coin` yellow is for money surfaces only; `neon` green is
success/live; `ghost` pink-red is danger.

## Use

```tsx
import { PixelFrame, ArcadeButton, EnergyBar, CRTOverlay } from "@pacsarcade/arcade-ui";
import "@pacsarcade/arcade-ui/styles.css";

<PixelFrame glow="coin" title="Funding">
  <EnergyBar raisedSats={1_250_000} goalSats={5_000_000} pendingSats={50_000} />
  <ArcadeButton variant="coin" size="lg">INSERT COIN</ArcadeButton>
</PixelFrame>
<CRTOverlay />
```

## Build

```sh
npm ci
npm run build   # tsc → dist/ + copies arcade.css
```

Consumed by frens.earth and pacsarcade.org campaign pages, and synced to
claude.ai/design via `/design-sync`.
