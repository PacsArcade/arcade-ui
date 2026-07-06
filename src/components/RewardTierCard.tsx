import type { ReactNode } from "react";
import { formatSats } from "../lib/format";
import { ArcadeButton } from "./ArcadeButton";

const TYPE_GLYPHS: Record<string, string> = {
  ordinal: "◆",
  rune: "ᚱ",
  digital: "▓",
  access: "🔑",
};

const TYPE_LABELS: Record<string, string> = {
  ordinal: "ORDINAL",
  rune: "RUNE",
  digital: "DIGITAL ITEM",
  access: "ACCESS",
};

/** Etch lifecycle states; the last two are deprecated back-compat aliases. */ // copy-lint-ignore
export type RewardTierStatus = "locked" | "ready" | "etched" | "claimable" | "claimed"; // copy-lint-ignore

export interface RewardTierCardProps {
  /** Arcade item name, e.g. "PIXEL SWORD" or "GOLD CARTRIDGE". */
  name: string;
  /** Minimum contribution in sats to earn this reward. */
  amountSats: number;
  /** What kind of on-chain reward this tier etches. */
  rewardType: "ordinal" | "rune" | "digital" | "access";
  /** What the backer gets, in plain language. */
  description: ReactNode;
  /** Remaining supply, when the tier is capped. */
  remaining?: number;
  /** Total supply cap, when the tier is capped. */
  supplyCap?: number;
  /**
   * Etch lifecycle: locked (not eligible), ready (eligible + donation confirmed
   * on-chain — the etch can run), etched (inscribed/etched and delivered — show
   * the reveal txid via detail). Omit for a browsing/pre-donation card.
   */
  status?: RewardTierStatus;
  /** Extra status line, e.g. estimated delivery or the reveal txid. */
  detail?: string;
  /** CTA label. Default depends on status. */
  ctaLabel?: string;
  /** Called when the backer picks this tier / starts the etch. Omit to hide the button. */
  onSelect?: () => void;
}

/**
 * A reward tier as a weapon pickup — the loot a backer earns. The three etch
 * states must always be visually distinct: locked (dim), ready (neon pulse),
 * etched (cyan check). Contribution amounts are sats and render in coin yellow.
 * House verb is ETCH — see the conventions banned-verbiage table before writing copy.
 */
export function RewardTierCard({
  name,
  amountSats,
  rewardType,
  description,
  remaining,
  supplyCap,
  status,
  detail,
  ctaLabel,
  onSelect,
}: RewardTierCardProps) {
  // normalize deprecated aliases
  const state = status === "claimable" ? "ready" : status === "claimed" ? "etched" : status; // copy-lint-ignore
  const cls = `pa-tier${state ? ` pa-tier--${state}` : ""}`;
  const statusText =
    state === "locked" ? "LOCKED" : state === "ready" ? "READY TO ETCH" : state === "etched" ? "✓ ETCHED" : null;
  const defaultCta = state === "ready" ? "ETCH TO WALLET" : "PICK UP";
  return (
    <div className={cls}>
      {statusText ? <span className="pa-tier__status">{statusText}</span> : null}
      <div className="pa-tier__head">
        <span className="pa-tier__icon" aria-hidden>
          {TYPE_GLYPHS[rewardType]}
        </span>
        <div>
          <div className="pa-tier__name">{name}</div>
          <div className="pa-tier__amount">{formatSats(amountSats)} sats</div>
        </div>
      </div>
      <div className="pa-tier__desc">{description}</div>
      <div className="pa-tier__meta">
        <span>{TYPE_LABELS[rewardType]}</span>
        {supplyCap != null ? <span>{remaining ?? supplyCap} / {supplyCap} LEFT</span> : null}
        {detail ? <span>{detail}</span> : null}
      </div>
      {onSelect && state !== "locked" && state !== "etched" ? (
        <ArcadeButton variant={state === "ready" ? "neon" : "coin"} size="sm" fullWidth onClick={onSelect}>
          {ctaLabel ?? defaultCta}
        </ArcadeButton>
      ) : null}
    </div>
  );
}
