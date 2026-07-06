import { StatChip } from "@pacsarcade/arcade-ui";

export function SingleStat() {
  return (
    <div className="pa-screen" style={{ padding: 24, maxWidth: 200 }}>
      <StatChip label="RAISED (SATS)" value="2,600,000" accent="coin" />
    </div>
  );
}

export function Accents() {
  return (
    <div className="pa-screen" style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <StatChip label="RAISED" value="2.6M" accent="coin" />
      <StatChip label="STATUS" value="LIVE" accent="neon" />
      <StatChip label="DAYS LEFT" value="12" />
    </div>
  );
}
