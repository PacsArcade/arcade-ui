"use client";

import { useEffect, useState } from "react";

/** Current bitcoin tip height, refreshed every two minutes. Null until the
    first fetch lands — callers must never block on it. */
export function useTipHeight(): number | null {
  const [height, setHeight] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    const tick = () =>
      fetch("https://mempool.space/api/blocks/tip/height")
        .then((r) => r.json())
        .then((h) => alive && typeof h === "number" && setHeight(h))
        .catch(() => {});
    tick();
    const id = setInterval(tick, 120_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);
  return height;
}

/* Live bitcoin block height — the arcade's wall clock, HUD style: dim BLOCK
   label, score-white number, neon live dot. Lives in SiteHeader's telemetry
   ticker, never beside the wordmark — chain telemetry is data, not brand,
   and coin gold stays reserved for money. Renders nothing until the first
   fetch lands (never a blocker). */
export default function BlockClock() {
  const height = useTipHeight();
  if (height === null) return null;
  return (
    <span
      className="inline-flex items-center gap-2 whitespace-nowrap"
      title="Current bitcoin block height — live from mempool.space"
    >
      <span
        aria-hidden
        className="pulse-neon h-1.5 w-1.5 flex-none bg-neon shadow-[0_0_6px_rgba(57,255,20,0.8)]"
      />
      <span className="text-[8px] tracking-[0.15em] text-white/40">BLOCK</span>
      <span className="text-white">{height.toLocaleString()}</span>
    </span>
  );
}
