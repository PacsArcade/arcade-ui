const KIND_LABELS: Record<string, string> = {
  wallet: "WALLET LINKED",
  nostr: "NOSTR VERIFIED",
  rewards: "REWARDS LIVE",
};

export interface TrustBadgeProps {
  /** What is being attested: on-chain wallet link, nostr handle, or the ordinals/runes reward program. */
  kind: "wallet" | "nostr" | "rewards";
  /** Verified state — verified badges get the neon dot, unverified stay dim. */
  verified: boolean;
  /** Override the default label text. */
  label?: string;
  /** Tooltip detail (native title), e.g. the linked address or npub. */
  detail?: string;
}

/**
 * Small trust indicator for the hero trust row. These carry the platform's
 * credibility — never render one verified unless the underlying check passed.
 */
export function TrustBadge({ kind, verified, label, detail }: TrustBadgeProps) {
  return (
    <span className={`pa-trust${verified ? " pa-trust--verified" : ""}`} title={detail}>
      <span className="pa-trust__dot" aria-hidden />
      {label ?? KIND_LABELS[kind]}
      {verified ? "" : " — PENDING"}
    </span>
  );
}
