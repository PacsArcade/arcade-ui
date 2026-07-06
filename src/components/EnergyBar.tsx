import { formatSats } from "../lib/format";

export interface EnergyBarProps {
  /** Confirmed sats raised. Progress is confirmed-only — pending never inflates the fill. */
  raisedSats: number;
  /** Funding goal in sats. */
  goalSats: number;
  /** Unconfirmed (mempool) sats, shown as a hatched sub-meter after the confirmed fill. */
  pendingSats?: number;
  /** Label above the bar. Default "PLAYER ENERGY". */
  label?: string;
  /** Show the plain-language "raised / goal" line under the bar for trust. Default true. */
  showRealNumbers?: boolean;
}

/**
 * Funding progress as a segmented player-energy bar. Fill color tracks progress:
 * ghost-red below 34%, coin-yellow to 66%, neon-green above. Confirmed sats only
 * drive the fill; pending sats render as a hatched overlay so progress is honest.
 */
export function EnergyBar({
  raisedSats,
  goalSats,
  pendingSats = 0,
  label = "PLAYER ENERGY",
  showRealNumbers = true,
}: EnergyBarProps) {
  const pct = goalSats > 0 ? Math.min(100, (raisedSats / goalSats) * 100) : 0;
  const pendingPct = goalSats > 0 ? Math.min(100, ((raisedSats + pendingSats) / goalSats) * 100) : 0;
  const level = pct < 34 ? "low" : pct < 67 ? "mid" : "high";
  return (
    <div className={`pa-energy pa-energy--${level}`}>
      <div className="pa-energy__head">
        <span className="pa-energy__label">{label}</span>
        <span className="pa-energy__percent">{Math.floor(pct)}%</span>
      </div>
      <div
        className="pa-energy__track"
        role="progressbar"
        aria-valuenow={Math.floor(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {pendingSats > 0 ? <div className="pa-energy__pending" style={{ width: `${pendingPct}%` }} /> : null}
        <div className="pa-energy__fill" style={{ width: `${pct}%` }} />
      </div>
      {showRealNumbers ? (
        <div className="pa-energy__sub">
          {formatSats(raisedSats)} / {formatSats(goalSats)} sats raised
          {pendingSats > 0 ? ` · ${formatSats(pendingSats)} pending` : ""}
        </div>
      ) : null}
    </div>
  );
}
