"use client";

import { useSyncExternalStore } from "react";
import { readEasyMode, subscribeEasyMode, writeEasyMode } from "./easy-mode";

/* A mini CRT monitor with matrix-fall columns — the accessibility toggle
   that sits in every header next to the nav. One toggle, one promise:
   easier on the eyes (scanlines off + OpenDyslexic body text). Pressed
   state shows the little screen switched off. */
export default function EasyModeToggle() {
  const on = useSyncExternalStore(subscribeEasyMode, readEasyMode, () => false);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label="Easier on the eyes — turn CRT scanlines off and use the OpenDyslexic font"
      title="EASIER ON THE EYES — CRT OFF + OPENDYSLEXIC BODY TEXT"
      onClick={() => writeEasyMode(!on)}
      className={`grid h-11 w-12 flex-none cursor-pointer place-items-center border-2 bg-panel ${
        on ? "border-neon shadow-[0_0_8px_rgba(57,255,20,0.5)]" : "border-edge hover:border-cyan"
      }`}
    >
      <span className="flex flex-col items-center gap-0.5">
        <span className="flex h-[17px] w-[26px] justify-center gap-[3px] overflow-hidden border-2 border-white/40 bg-void">
          {[0, -0.5, -0.9].map((delay) => (
            <span
              key={delay}
              className={on ? "h-[9px] w-[3px] translate-y-[40%] bg-white/40" : "matrix-col h-[9px] w-[3px] bg-neon"}
              style={on ? undefined : { animationDelay: `${delay}s` }}
            />
          ))}
        </span>
        <span className="h-0.5 w-3 bg-white/40" />
      </span>
    </button>
  );
}
