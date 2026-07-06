import { CharacterSelectCard } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: "40px 24px 24px", maxWidth: 300 };

export function Roster() {
  return (
    <div className="pa-screen" style={wrap}>
      <CharacterSelectCard
        title="SAVE THE NEON MARQUEE"
        creatorName="pac"
        raisedSats={2_600_000}
        goalSats={5_000_000}
        daysLeft={12}
        backers={87}
        onSelect={() => {}}
      />
    </div>
  );
}

export function Selected() {
  return (
    <div className="pa-screen" style={wrap}>
      <CharacterSelectCard
        title="HOMEBREW CABINET BUILD"
        creatorName="gothmommy"
        raisedSats={4_100_000}
        goalSats={4_500_000}
        daysLeft={3}
        backers={203}
        selected
        onSelect={() => {}}
      />
    </div>
  );
}

export function NoArtPlaceholder() {
  return (
    <div className="pa-screen" style={wrap}>
      <CharacterSelectCard
        title="LEARN-TO-NODE COURSE"
        creatorName="fren21"
        raisedSats={150_000}
        goalSats={2_000_000}
        daysLeft={28}
        backers={9}
      />
    </div>
  );
}
