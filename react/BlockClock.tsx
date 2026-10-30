"use client";

import { useEffect, useState } from "react";

/** Two missed polls at the 2-minute cadence — past this, a reading is no
    longer "live" and must degrade to the marked estimate (the honest-clock
    law: stale readings never wear the live dot forever). */
const STALE_MS = 5 * 60_000;

/** Current bitcoin tip reading, refreshed every two minutes. `height` is
    null until the first fetch lands — callers must never block on it.
    `stale` flips true when the feed has gone quiet past the cutoff. */
export function useTipReading(): { height: number | null; stale: boolean } {
  const [reading, setReading] = useState<{ height: number; at: number } | null>(null);
  const [, setJudge] = useState(0);
  useEffect(() => {
    let alive = true;
    const tick = () =>
      fetch("https://mempool.space/api/blocks/tip/height")
        .then((r) => r.json())
        .then((h) => {
          if (alive && typeof h === "number") setReading({ height: h, at: Date.now() });
        })
        .catch(() => {});
    tick();
    const id = setInterval(tick, 120_000);
    // re-judge freshness between polls so a dead network is noticed
    const judgeId = setInterval(() => setJudge((n) => n + 1), 30_000);
    return () => {
      alive = false;
      clearInterval(id);
      clearInterval(judgeId);
    };
  }, []);
  return {
    height: reading?.height ?? null,
    stale: reading != null && Date.now() - reading.at > STALE_MS,
  };
}

/** Current bitcoin tip height, refreshed every two minutes. Null until the
    first fetch lands — callers must never block on it. */
export function useTipHeight(): number | null {
  return useTipReading().height;
}

/* Live bitcoin block height — the arcade's wall clock, HUD style: dim BLOCK
   label, score-white number, neon live dot. Lives in SiteHeader's telemetry
   ticker, never beside the wordmark — chain telemetry is data, not brand,
   and coin gold stays reserved for money. Renders nothing until the first
   fetch lands (never a blocker). When the feed goes quiet past the cutoff
   the last-good height degrades honestly: ~ on the face, the live dot dims
   and stops claiming live. */
export default function BlockClock() {
  const { height, stale } = useTipReading();
  if (height === null) return null;
  return (
    <span
      className="inline-flex items-center gap-2 whitespace-nowrap"
      title={
        stale
          ? "Last known bitcoin block height — the live feed has gone quiet; ~ marks it as an estimate"
          : "Current bitcoin block height — live from mempool.space"
      }
    >
      <span
        aria-hidden
        className={
          stale
            ? "h-1.5 w-1.5 flex-none bg-white/30"
            : "pulse-neon h-1.5 w-1.5 flex-none bg-neon shadow-[0_0_6px_rgba(57,255,20,0.8)]"
        }
      />
      <span className="text-[8px] tracking-[0.15em] text-white/40">BLOCK</span>
      <span className="text-white">{`${stale ? "~" : ""}${height.toLocaleString()}`}</span>
    </span>
  );
}
