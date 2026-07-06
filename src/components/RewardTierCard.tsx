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

export interface RewardTierCardProps {
  /** Arcade item name, e.g. "PIXEL SWORD" or "GOLD CARTRIDGE". */
  name: string;
  /** Minimum contribution in sats to earn this drop. */
  amountSats: number;
  /** What kind of on-chain reward this tier mints. */
  rewardType: "ordinal" | "rune" | "digital" | "access";
  /** What the backer gets, in plain language. */
  description: ReactNode;
  /** Remaining supply, when the tier is capped. */
  remaining?: number;
  /** Total supply cap, when the tier is capped. */
  supplyCap?: number;
  /**
   * Claim lifecycle: locked (not eligible), claimable (eligible + confirmed on-chain),
   * claimed (done — show the txid via claimedDetail). Omit for a browsing/pre-donation card.
   */
  status?: "locked" | "claimable" | "claimed";
  /** Extra status line, e.g. estimated delivery or the claim txid. */
  detail?: string;
  /** CTA label. Default depends on status. */
  ctaLabel?: string;
  /** Called when the backer picks/claims this tier. Omit to hide the button. */
  onSelect?: () => void;
}

/**
 * A reward tier as a weapon pickup / item drop. The three claim states must
 * always be visually distinct: locked (dim), claimable (neon pulse), claimed
 * (cyan check). Contribution amounts are sats and render in coin yellow.
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
  const cls = `pa-tier${status ? ` pa-tier--${status}` : ""}`;
  const statusText = status === "locked" ? "LOCKED" : status === "claimable" ? "CLAIMABLE" : status === "claimed" ? "✓ CLAIMED" : null;
  const defaultCta = status === "claimable" ? "CLAIM DROP" : "PICK UP";
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
      {onSelect && status !== "locked" && status !== "claimed" ? (
        <ArcadeButton variant={status === "claimable" ? "neon" : "coin"} size="sm" fullWidth onClick={onSelect}>
          {ctaLabel ?? defaultCta}
        </ArcadeButton>
      ) : null}
    </div>
  );
}
