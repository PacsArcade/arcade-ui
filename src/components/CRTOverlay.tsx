export interface CRTOverlayProps {
  /** Render the scanlines. Wire this to a "CRT Mode: On/Off" accessibility toggle. Default true. */
  enabled?: boolean;
  /**
   * "fixed" covers the whole viewport (app-level use); "absolute" covers the
   * nearest positioned ancestor (scoping the effect to one panel). Default "fixed".
   */
  position?: "fixed" | "absolute";
}

/**
 * CRT scanline overlay — the tube-glass layer over the whole page. Pointer-events
 * pass through. Mount it once at the app root, last in the tree.
 */
export function CRTOverlay({ enabled = true, position = "fixed" }: CRTOverlayProps) {
  if (!enabled) return null;
  return <div aria-hidden className={`pa-crt${position === "absolute" ? " pa-crt--absolute" : ""}`} />;
}
