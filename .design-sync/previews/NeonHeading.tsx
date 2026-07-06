import { NeonHeading } from "@pacsarcade/arcade-ui";

export function SignColors() {
  return (
    <div className="pa-screen" style={{ padding: 24, display: "grid", gap: 16 }}>
      <NeonHeading as="h3" color="coin">Defeat Boredom</NeonHeading>
      <NeonHeading as="h3" color="neon">Campaign Live</NeonHeading>
      <NeonHeading as="h3" color="pink">Bonus Stage</NeonHeading>
      <NeonHeading as="h3" color="cyan">How To Play</NeonHeading>
      <NeonHeading as="h3" color="ghost">Danger Zone</NeonHeading>
    </div>
  );
}

export function HeroTitle() {
  return (
    <div className="pa-screen" style={{ padding: 32 }}>
      <NeonHeading as="h1" color="coin">
        Save The Neon Marquee
      </NeonHeading>
      <p style={{ margin: "16px 0 0", color: "#ccc", maxWidth: 480 }}>
        Body copy under a glowing sign stays crisp — glow never touches paragraphs.
      </p>
    </div>
  );
}
