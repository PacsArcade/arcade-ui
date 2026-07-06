import { TrustBadge } from "@pacsarcade/arcade-ui";

export function TrustRow() {
  return (
    <div className="pa-screen" style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <TrustBadge kind="wallet" verified detail="bc1q…arcade — creator's own xpub" />
      <TrustBadge kind="nostr" verified detail="pac@pacsarcade.org" />
      <TrustBadge kind="rewards" verified detail="Runes + ordinals are etched after confirmation" />
    </div>
  );
}

export function PendingVerification() {
  return (
    <div className="pa-screen" style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <TrustBadge kind="wallet" verified />
      <TrustBadge kind="nostr" verified={false} />
    </div>
  );
}
