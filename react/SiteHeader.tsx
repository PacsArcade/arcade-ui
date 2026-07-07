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
   — TELEMETRY TICKER: chain data below, never beside the brand. */
export default function SiteHeader({
  links = DEFAULT_LINKS,
  wordmark = "PAC'S ARCADE",
  coinSrc = "/bitcoin.gif",
  identitySlot,
  menuSlot,
}: {
  links?: SiteHeaderLink[];
  wordmark?: string;
  coinSrc?: string;
  /** The signed-in fren chip (or a LOGIN link) — persistent on the bar. */
  identitySlot?: ReactNode;
  /** App-injected rows at the top of the burger menu: identity header,
      profile, login/out, connections. Rendered above nav links. */
  menuSlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative border-b-2 border-edge">
      {/* marquee row */}
      <nav className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
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
          {/* visibility toggle lives in the menu, off the bar (Pac) */}
          <div className="flex min-h-11 items-center gap-3 px-4 py-2">
            <EasyModeToggle />
            <span className="font-pixel text-[9px] uppercase text-white/60">
              EASY ON THE EYES
            </span>
          </div>
        </div>
      )}

      {/* telemetry ticker — chain data lives here on every breakpoint */}
      <div className="border-t-2 border-edge bg-[#0a0a0a]">
        <div className="mx-auto flex min-h-8 max-w-5xl items-center px-4 py-1.5 font-pixel text-[10px] sm:px-6">
          <BlockClock />
        </div>
      </div>
    </header>
  );
}
