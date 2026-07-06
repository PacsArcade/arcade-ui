import { RewardTierCard } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: 24, maxWidth: 360 };

export function Browsing() {
  return (
    <div className="pa-screen" style={wrap}>
      <RewardTierCard
        name="GOLD CARTRIDGE"
        amountSats={100_000}
        rewardType="ordinal"
        description="A 1-of-50 pixel-art cartridge inscribed as an ordinal — proof you helped light the marquee, fren."
        supplyCap={50}
        remaining={37}
        detail="MINTS AFTER GOAL"
        onSelect={() => {}}
      />
    </div>
  );
}

export function Locked() {
  return (
    <div className="pa-screen" style={wrap}>
      <RewardTierCard
        name="BOSS KEY"
        amountSats={500_000}
        rewardType="access"
        description="Lifetime free-play pass to the arcade floor. Unlocks once your donation confirms on-chain."
        status="locked"
        detail="NEEDS 500K SATS"
      />
    </div>
  );
}

export function Claimable() {
  return (
    <div className="pa-screen" style={wrap}>
      <RewardTierCard
        name="ARCADE RUNE"
        amountSats={25_000}
        rewardType="rune"
        description="The campaign rune drops straight to the wallet tied to your fren tag — donate first, receive after."
        status="claimable"
        supplyCap={500}
        remaining={212}
        onSelect={() => {}}
      />
    </div>
  );
}

export function Claimed() {
  return (
    <div className="pa-screen" style={wrap}>
      <RewardTierCard
        name="PIXEL SWORD"
        amountSats={50_000}
        rewardType="digital"
        description="High-res sprite pack + your fren tag carved into the cabinet's credits screen."
        status="claimed"
        detail="TX 8F3A…C21D"
      />
    </div>
  );
}
