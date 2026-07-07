"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import BlockClock from "./BlockClock";
import EasyModeToggle from "./EasyModeToggle";

export type SiteHeaderLink = { href: string; label: string; coin?: boolean };

/* LEARN and GROW, not the alliteration twins (Pac, 2026-07-07). */
const DEFAULT_LINKS: SiteHeaderLink[] = [
  { href: "/classes", label: "LEARN" },
  { href: "/campaigns", label: "GROW" },
];

/* The arcade's marquee, three ideas (Pac's header v3, 2026-07-07):
   — MARQUEE ROW: coin + wordmark left; desktop nav links; the identity chip
     (persistent "you're in"); and the BURGER far right on EVERY breakpoint.
   — THE MENU: one panel for all users — identity block (menuSlot, injected
     by the app: profile / login / sign out / connections), then nav links,
     then the visibility toggle tucked inside (off the bar, per Pac).
   — TELEMETRY TICKER: chain data below, never beside the brand.
   Header v4 (Pac, 2026-07-07): the chip can BE the menu — identityAsTrigger
   folds the burger into the identity chip, and menuFooterSlot lets the app
   own the panel's bottom row (sign out | easy eyes). Both optional; omitting
   them renders v3 exactly. */
export default function SiteHeader({
  links = DEFAULT_LINKS,
  wordmark = "PAC'S ARCADE",
  coinSrc = "/bitcoin.gif",
  identitySlot,
  identityAsTrigger = false,
  menuSlot,
  menuFooterSlot,
}: {
  links?: SiteHeaderLink[];
  wordmark?: string;
  coinSrc?: string;
  /** The signed-in fren chip (or a LOGIN link) — persistent on the bar. */
  identitySlot?: ReactNode;
  /** When true, the identity chip IS the menu trigger: the standalone burger
      disappears and identitySlot renders inside the trigger button. The slot
      content must contain NO interactive elements (no Link, no button) —
      nested interactives are invalid HTML. Profile navigation belongs in the
      menu rows instead. */
  identityAsTrigger?: boolean;
  /** App-injected rows at the top of the burger menu: identity header,
      profile, login/out, connections. Rendered above nav links. */
  menuSlot?: ReactNode;
  /** Replaces the built-in EASY ON THE EYES bottom row of the menu panel.
      Not wrapped in the auto-close handler — toggles inside it must not
      close the menu. When omitted, the built-in toggle row renders. */
  menuFooterSlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b-2 border-edge">
      {/* the anchor box: nav AND menu panel share this centered max-w-5xl
          container, so the panel opens under the trigger on every viewport
          width (anchoring to the full-width header put it at the far edge
          of wide screens — Pac's off-to-the-right bug, 2026-07-07) */}
      <div className="relative mx-auto max-w-5xl">
      {/* marquee row */}
      <nav className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        {/* brand mark — decorative on every breakpoint now; the burger owns the menu */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coinSrc} alt="" aria-hidden className="h-7 w-7 flex-none" />
        <Link href="/" className="min-w-0 whitespace-nowrap font-pixel text-sm text-coin glow-coin">
          {wordmark}
        </Link>

        <span className="flex-1" />

        {/* desktop nav */}
        <span className="hidden items-center gap-4 font-pixel text-xs sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.coin
                  ? "whitespace-nowrap text-coin glow-coin"
                  : "whitespace-nowrap text-cyan hover:glow-cyan"
              }
            >
              {l.label}
            </Link>
          ))}
        </span>

        {identityAsTrigger ? (
          /* the chip IS the menu — avatar + caret, one press, ≥44px target */
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
            className={`flex min-h-11 min-w-11 flex-none cursor-pointer items-center gap-2 border-2 px-2 font-pixel text-sm ${
              open ? "border-cyan text-cyan" : "border-edge text-white/70 hover:border-cyan hover:text-cyan"
            }`}
          >
            {identitySlot && <span className="flex min-w-0 items-center">{identitySlot}</span>}
            <span aria-hidden className="text-[10px] text-cyan">
              {open ? "▴" : "▾"}
            </span>
          </button>
        ) : (
          <>
            {/* who you are — persistent, like a nostr client's signed-in name */}
            {identitySlot && <span className="flex min-w-0 items-center">{identitySlot}</span>}

            {/* the burger — far right, every breakpoint, ≥44px target */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Menu"
              className={`grid h-11 w-11 flex-none cursor-pointer place-items-center border-2 font-pixel text-sm ${
                open ? "border-cyan text-cyan" : "border-edge text-white/70 hover:border-cyan hover:text-cyan"
              }`}
            >
              {open ? "✕" : "☰"}
            </button>
          </>
        )}
      </nav>

      {/* the menu — one panel for all users */}
      {open && (
        <div className="absolute right-3 top-full z-50 w-64 border-2 border-edge bg-panel shadow-[0_0_16px_rgba(0,0,0,0.7)]">
          {menuSlot && <div onClick={() => setOpen(false)}>{menuSlot}</div>}
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-11 items-center border-b-2 border-edge px-4 font-pixel text-[10px] ${
                l.coin ? "text-coin glow-coin" : "text-cyan"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {/* bottom row — app-owned when menuFooterSlot is given (kept OUT of
              the auto-close wrapper: toggles here must not close the menu) */}
          {menuFooterSlot ?? (
            <div className="flex min-h-11 items-center gap-3 px-4 py-2">
              <EasyModeToggle />
              <span className="font-pixel text-[9px] uppercase text-white/60">
                EASY ON THE EYES
              </span>
            </div>
          )}
        </div>
      )}
      </div>

      {/* telemetry ticker — chain data rides right, under the identity/menu
          corner (Pac: the block belongs beneath the login menu) */}
      <div className="border-t-2 border-edge bg-[#0a0a0a]">
        <div className="mx-auto flex min-h-8 max-w-5xl items-center justify-end px-4 py-1.5 font-pixel text-[10px] sm:px-6">
          <BlockClock />
        </div>
      </div>
    </header>
  );
}
