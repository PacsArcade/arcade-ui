/**
 * EASY ON THE EYES — the accessibility mode behind the mini-CRT toggle:
 * scanline overlay off + OpenDyslexic body text (display faces stay).
 *
 * State lives in ONE place: `data-ez` on <html>, persisted in localStorage.
 * CSS reacts to the attribute (tailwind/theme.css or css/easy-mode.css), so
 * the overlay and the font swap need no React state — inject
 * EASY_MODE_BOOT_SCRIPT in the root layout so saved users never see a
 * scanline flash before hydration.
 */
export const EASY_MODE_KEY = "pa-easy-mode";

/** Runs before hydration so easy-mode users never see a scanline flash. */
export const EASY_MODE_BOOT_SCRIPT = `try{if(localStorage.getItem("${EASY_MODE_KEY}")==="1")document.documentElement.dataset.ez="true"}catch(e){}`;

export function readEasyMode(): boolean {
  try {
    return localStorage.getItem(EASY_MODE_KEY) === "1";
  } catch {
    return false;
  }
}

/* useSyncExternalStore wiring so every toggle on a page shows one truth */
const listeners = new Set<() => void>();

export function subscribeEasyMode(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function writeEasyMode(on: boolean): void {
  try {
    localStorage.setItem(EASY_MODE_KEY, on ? "1" : "0");
  } catch {
    // storage unavailable — the attribute still applies for this visit
  }
  document.documentElement.dataset.ez = on ? "true" : "false";
  listeners.forEach((l) => l());
}
