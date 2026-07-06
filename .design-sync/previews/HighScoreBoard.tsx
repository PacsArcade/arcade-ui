import { HighScoreBoard } from "@pacsarcade/arcade-ui";

export function TopContributors() {
  return (
    <div className="pa-screen" style={{ padding: 24, maxWidth: 420 }}>
      <HighScoreBoard
        title="TOP FRENS"
        entries={[
          { initials: "PAC", sats: 500_000 },
          { initials: "GTH", sats: 250_000 },
          { initials: "SAT", sats: 125_000 },
          { initials: "???", sats: 100_000 },
          { initials: "NKO", sats: 75_000 },
          { initials: "BIT", sats: 50_000 },
        ]}
      />
    </div>
  );
}
