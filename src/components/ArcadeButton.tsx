import type { ButtonHTMLAttributes } from "react";

export interface ArcadeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** coin = primary money action (INSERT COIN), neon = success/confirm, cyan = secondary, ghost = danger. Default "coin". */
  variant?: "coin" | "neon" | "cyan" | "ghost";
  /** Default "md". */
  size?: "sm" | "md" | "lg";
  /** Shows a blinking "..." and disables the button. */
  loading?: boolean;
  /** Blink the label like an attract-mode PRESS START prompt. */
  blink?: boolean;
  /** Stretch to the container width (sticky CTAs, mobile). */
  fullWidth?: boolean;
}

/**
 * The INSERT COIN button. Primary campaign CTA ("PRESS START", "INSERT COIN")
 * uses variant="coin"; hard-shadow offset gives the cabinet-button press feel.
 */
export function ArcadeButton({
  variant = "coin",
  size = "md",
  loading = false,
  blink = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...rest
}: ArcadeButtonProps) {
  const cls = [
    "pa-btn",
    `pa-btn--${variant}`,
    `pa-btn--${size}`,
    fullWidth ? "pa-btn--full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="pa-blink" aria-label="loading">
          ...
        </span>
      ) : blink ? (
        <span className="pa-blink">{children}</span>
      ) : (
        children
      )}
    </button>
  );
}
