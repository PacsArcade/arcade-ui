import type { ReactNode } from "react";

export interface NeonHeadingProps {
  children: ReactNode;
  /** Neon tube color. Default "coin". */
  color?: "coin" | "neon" | "pink" | "cyan" | "ghost";
  /** Heading level to render. Default "h2". */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Play the one-shot tube flicker on mount (marquee moments only). Default false. */
  flicker?: boolean;
  className?: string;
}

/**
 * Neon-sign display heading in the Retronoid arcade face. Glow is reserved for
 * headings like this one — never apply glow classes to body copy.
 */
export function NeonHeading({ children, color = "coin", as = "h2", flicker = false, className }: NeonHeadingProps) {
  const Tag = as;
  const cls = ["pa-heading", `pa-heading--${color}`, flicker ? "pa-flicker" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
