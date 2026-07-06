import { ArcadeButton } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" };

export function Variants() {
  return (
    <div className="pa-screen" style={wrap}>
      <ArcadeButton variant="coin">INSERT COIN</ArcadeButton>
      <ArcadeButton variant="neon">ETCH IT</ArcadeButton>
      <ArcadeButton variant="cyan">VIEW WALLET</ArcadeButton>
      <ArcadeButton variant="ghost">ABANDON RUN</ArcadeButton>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="pa-screen" style={wrap}>
      <ArcadeButton size="sm">1UP</ArcadeButton>
      <ArcadeButton size="md">CONTINUE</ArcadeButton>
      <ArcadeButton size="lg">PRESS START</ArcadeButton>
    </div>
  );
}

export function States() {
  return (
    <div className="pa-screen" style={wrap}>
      <ArcadeButton loading>SENDING</ArcadeButton>
      <ArcadeButton disabled>SOLD OUT</ArcadeButton>
      <ArcadeButton blink>PRESS START</ArcadeButton>
    </div>
  );
}

export function StickyCTA() {
  return (
    <div className="pa-screen" style={{ padding: 24, maxWidth: 420 }}>
      <ArcadeButton variant="coin" size="lg" fullWidth>
        INSERT COIN — BACK THIS RUN
      </ArcadeButton>
    </div>
  );
}
