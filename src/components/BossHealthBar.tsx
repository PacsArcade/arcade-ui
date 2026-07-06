import { formatSats } from "../lib/format";

export interface BossHealthBarProps {
  /** The boss being defeated, e.g. "BOREDOM" or "THE FUNDING GAP". */
  bossName: string;
  /** Confirmed sats raised so far. */
  raisedSats: number;
  /** Funding goal in sats — the boss's total HP. */
  goalSats: number;
  /** A recent contribution to flash as a damage number, e.g. 25000 renders "-25,000". */
  lastHitSats?: number;
  /** Show the plain-language "remaining" line under the bar for trust. Default true. */
  showRealNumbers?: boolean;
}

/**
 * The final-goal moment: remaining funding as a boss HP bar. Contributions are
 * hits — the bar drains toward zero as the goal is met, and lastHitSats pops a
 * damage number. Boss defeated = campaign funded.
 */
export function BossHealthBar({
  bossName,
  raisedSats,
  goalSats,
  lastHitSats,
  showRealNumbers = true,
}: BossHealthBarProps) {
  const remaining = Math.max(0, goalSats - raisedSats);
  const hpPct = goalSats > 0 ? (remaining / goalSats) * 100 : 0;
  return (
    <div className="pa-bosshp">
      <div className="pa-bosshp__head">
        <span className="pa-bosshp__name pa-glow-ghost">{bossName}</span>
        <span className="pa-bosshp__hp">{Math.ceil(hpPct)}% HP</span>
      </div>
      <div
        className="pa-bosshp__track"
        role="progressbar"
        aria-valuenow={Math.ceil(hpPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${bossName} health remaining`}
      >
        <div className="pa-bosshp__fill" style={{ width: `${hpPct}%` }} />
        {lastHitSats ? <span className="pa-bosshp__damage">-{formatSats(lastHitSats)}</span> : null}
      </div>
      {showRealNumbers ? (
        <div className="pa-bosshp__sub">
          {hpPct <= 0 ? "BOSS DEFEATED — GOAL REACHED" : `${formatSats(remaining)} sats to defeat`}
        </div>
      ) : null}
    </div>
  );
}
