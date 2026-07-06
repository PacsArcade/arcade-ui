import type { ReactNode } from "react";

export interface PixelFrameProps {
  children: ReactNode;
  /** Neon edge color. coin = money/funding surfaces, neon = success/live, ghost = danger. Default "none". */
  glow?: "none" | "coin" | "neon" | "pink" | "cyan" | "ghost";
  /** Nameplate text rendered on the top border, like a cabinet label. */
  title?: string;
  /** Inner padding. Default "md". */
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * Chunky 8-bit panel — the base surface every campaign section sits on.
 * Give money-related panels glow="coin", live/success panels glow="neon",
 * danger/warning panels glow="ghost".
 */
export function PixelFrame({ children, glow = "none", title, padding = "md", className }: PixelFrameProps) {
  const cls = [
    "pa-frame",
    glow !== "none" ? `pa-frame--${glow}` : "",
    padding !== "none" ? `pa-frame--pad-${padding}` : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      {title ? <span className="pa-frame__title">{title}</span> : null}
      {children}
    </div>
  );
}
