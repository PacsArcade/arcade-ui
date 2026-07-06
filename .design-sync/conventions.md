# Pac's Arcade — build conventions

This kit renders 8-bit beat-'em-up crowdfunding UI. **Dark-first**: every layout sits on the
CRT-black surface — wrap the page (or any standalone section) in `class="pa-screen"`. Components
are illegible on a white background. Mount `<CRTOverlay />` once, last in the tree, for the
scanline layer (give users a "CRT Mode" toggle via its `enabled` prop).

## Styling idiom

Plain CSS classes (`pa-*`) + CSS custom properties — no utility framework. Style your own layout
glue with inline styles or small style blocks that reference the tokens:

- Colors: `var(--pa-void)` page black, `var(--pa-panel)` surface, `var(--pa-edge)` borders,
  `var(--pa-fg)` text, `var(--pa-fg-dim)` muted, and the neons: `var(--pa-coin)` gold,
  `var(--pa-neon)` green, `var(--pa-pink)`, `var(--pa-cyan)`, `var(--pa-ghost)` pink-red.
- **Color semantics are strict**: coin gold = money/funding surfaces ONLY; neon green =
  success/live; ghost = danger/warnings; cyan = secondary info/links; pink = bonus/flair.
- Fonts: `var(--pa-font-arcade)` (Retronoid — big display numbers/titles), `var(--pa-font-pixel)`
  (Press Start 2P — labels, buttons, micro-copy, always uppercase), `var(--pa-font-body)`
  (Roboto — paragraphs; never pixel-font body copy).
- Glow: `.pa-glow-coin|neon|pink|cyan|ghost` on short accents/labels only — never on body copy.
  `NeonHeading` has its own softer glow built in.
- Motion helpers: `.pa-blink` (attract-mode), `.pa-pulse`, `.pa-flicker` (one-shot tube flicker).

## Crowdfunding rules baked into the components

- Progress (`EnergyBar`, `BossHealthBar`) is driven by **confirmed sats only**; pass unconfirmed
  amounts as `pendingSats` (hatched sub-meter). Keep `showRealNumbers` on — arcade skin never
  hides Goal/Raised/Days-left truth.
- `RewardTierCard` etch states (`locked`/`ready`/`etched`) must stay visually distinct.
- `TrustBadge verified` only when the underlying check (wallet link, nostr handle) actually passed.
- Amounts are sats — format with the exported `formatSats(n)`.
- Voice: say **"fren"**, never "friend"; game language over finance language ("INSERT COIN", not
  "Checkout").
- **Banned verbiage (NFT-era words never appear in copy you write):** mint/minting → etch/inscribe;
  claim → "sent to your wallet" / "etch to wallet"; drop/airdrop → "arrives after confirmation" /
  "etching"; NFT/token → artifact / inscription / rune; gas → network fee (sats/vB). House verb is
  **ETCH** (runes are etched; inscriptions are inscribed — both display as ETCH).

## Where the truth lives

Read `styles.css` (tokens + every `pa-*` class) and each component's `.d.ts` / prompt doc before
inventing anything. If a piece of UI has no component here, compose it from `PixelFrame` +
tokens rather than writing new chrome.

## Idiomatic example

```tsx
import {
  PixelFrame, NeonHeading, StatsStrip, EnergyBar, ArcadeButton, TrustBadge,
} from "@pacsarcade/arcade-ui";

<div className="pa-screen" style={{ minHeight: "100vh", padding: 24 }}>
  <NeonHeading as="h1" color="coin">Save The Neon Marquee</NeonHeading>
  <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
    <TrustBadge kind="wallet" verified />
    <TrustBadge kind="nostr" verified />
  </div>
  <PixelFrame glow="coin" title="Funding">
    <StatsStrip stats={[
      { label: "RAISED (SATS)", value: "2,600,000", accent: "coin" },
      { label: "GOAL (SATS)", value: "5,000,000" },
      { label: "BACKERS", value: "87", accent: "cyan" },
      { label: "DAYS LEFT", value: "12", accent: "neon" },
    ]} />
    <div style={{ marginTop: 16 }}>
      <EnergyBar raisedSats={2_600_000} goalSats={5_000_000} pendingSats={120_000} />
    </div>
    <div style={{ marginTop: 16 }}>
      <ArcadeButton variant="coin" size="lg" fullWidth>INSERT COIN — BACK THIS RUN</ArcadeButton>
    </div>
  </PixelFrame>
</div>
```
