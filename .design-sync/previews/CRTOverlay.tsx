import { CRTOverlay, PixelFrame, NeonHeading } from "@pacsarcade/arcade-ui";

export function OverAPanel() {
  return (
    <div className="pa-screen" style={{ position: "relative", padding: 24, overflow: "hidden" }}>
      <PixelFrame glow="coin" title="CRT Mode: ON" padding="lg">
        <NeonHeading as="h3" color="coin">
          SCANLINES OVER EVERYTHING
        </NeonHeading>
        <p style={{ margin: "12px 0 0", color: "#ccc" }}>
          The overlay multiplies subtle scanlines across the page. Body copy underneath stays readable —
          that&apos;s the rule.
        </p>
      </PixelFrame>
      <CRTOverlay position="absolute" />
    </div>
  );
}

export function Disabled() {
  return (
    <div className="pa-screen" style={{ position: "relative", padding: 24, overflow: "hidden" }}>
      <PixelFrame title="CRT Mode: OFF" padding="lg">
        <p style={{ margin: 0, color: "#ccc" }}>
          enabled=false renders nothing — the accessibility toggle for clarity.
        </p>
      </PixelFrame>
      <CRTOverlay enabled={false} position="absolute" />
    </div>
  );
}
