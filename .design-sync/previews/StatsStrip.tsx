import { StatsStrip } from "@pacsarcade/arcade-ui";

export function HeroStats() {
  return (
    <div className="pa-screen" style={{ padding: 24, maxWidth: 640 }}>
      <StatsStrip
        stats={[
          { label: "RAISED (SATS)", value: "2,600,000", accent: "coin" },
          { label: "GOAL (SATS)", value: "5,000,000" },
          { label: "BACKERS", value: "87", accent: "cyan" },
          { label: "DAYS LEFT", value: "12", accent: "neon" },
        ]}
      />
    </div>
  );
}
