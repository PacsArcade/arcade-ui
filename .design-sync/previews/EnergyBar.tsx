import { EnergyBar } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: 24, maxWidth: 520 };

export function EarlyGame() {
  return (
    <div className="pa-screen" style={wrap}>
      <EnergyBar raisedSats={900_000} goalSats={5_000_000} label="PLAYER ENERGY" />
    </div>
  );
}

export function MidGame() {
  return (
    <div className="pa-screen" style={wrap}>
      <EnergyBar raisedSats={2_600_000} goalSats={5_000_000} />
    </div>
  );
}

export function AlmostFunded() {
  return (
    <div className="pa-screen" style={wrap}>
      <EnergyBar raisedSats={4_550_000} goalSats={5_000_000} />
    </div>
  );
}

export function WithPendingSats() {
  return (
    <div className="pa-screen" style={wrap}>
      <EnergyBar raisedSats={1_800_000} goalSats={5_000_000} pendingSats={420_000} label="FUNDING" />
    </div>
  );
}
