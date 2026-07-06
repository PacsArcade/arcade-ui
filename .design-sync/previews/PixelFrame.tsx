import { PixelFrame } from "@pacsarcade/arcade-ui";

const grid: React.CSSProperties = { padding: "40px 24px 24px", display: "grid", gap: 24, maxWidth: 420 };

export function GlowVariants() {
  return (
    <div className="pa-screen" style={grid}>
      <PixelFrame glow="coin" title="Funding">
        Money surfaces glow coin-gold.
      </PixelFrame>
      <PixelFrame glow="neon" title="Live">
        Success and live states glow neon-green.
      </PixelFrame>
      <PixelFrame glow="ghost" title="Danger Zone">
        Risks and warnings glow ghost-red — still readable.
      </PixelFrame>
    </div>
  );
}

export function PlainPanel() {
  return (
    <div className="pa-screen" style={grid}>
      <PixelFrame>A quiet panel for story sections — no glow, just the chunky edge.</PixelFrame>
    </div>
  );
}

export function PaddingScale() {
  return (
    <div className="pa-screen" style={grid}>
      <PixelFrame padding="sm" glow="cyan" title="sm">Tight.</PixelFrame>
      <PixelFrame padding="lg" glow="cyan" title="lg">Roomy.</PixelFrame>
    </div>
  );
}
