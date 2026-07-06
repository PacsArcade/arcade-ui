import { MilestoneBadge } from "@pacsarcade/arcade-ui";

export function FundingJourney() {
  return (
    <div className="pa-screen" style={{ padding: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
      <MilestoneBadge percent={25} label="NEW CABINET ART" unlocked />
      <MilestoneBadge percent={50} label="SIGN VENDOR BOOKED" unlocked />
      <MilestoneBadge percent={75} label="BONUS RUNE ETCHING" unlocked={false} />
      <MilestoneBadge percent={100} label="GRAND REOPENING" unlocked={false} />
    </div>
  );
}
