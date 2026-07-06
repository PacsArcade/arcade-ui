import { BossHealthBar } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: "40px 24px 24px", maxWidth: 520 };

export function MidFight() {
  return (
    <div className="pa-screen" style={wrap}>
      <BossHealthBar bossName="BOREDOM" raisedSats={2_100_000} goalSats={5_000_000} lastHitSats={25_000} />
    </div>
  );
}

export function NearlyDefeated() {
  return (
    <div className="pa-screen" style={wrap}>
      <BossHealthBar bossName="THE FUNDING GAP" raisedSats={4_800_000} goalSats={5_000_000} />
    </div>
  );
}

export function Defeated() {
  return (
    <div className="pa-screen" style={wrap}>
      <BossHealthBar bossName="BOREDOM" raisedSats={5_000_000} goalSats={5_000_000} />
    </div>
  );
}
