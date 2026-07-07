"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import BlockClock from "./BlockClock";
import EasyModeToggle from "./EasyModeToggle";

export type SiteHeaderLink = { href: string; label: string; coin?: boolean };

/* LEARN and GROW, not the alliteration twins (Pac, 2026-07-07). LOGIN is
   the door; the identitySlot replaces it once a fren is recognized. */
const DEFAULT_LINKS: SiteHeaderLink[] = [
  { href: "/classes", label: "LEARN" },
  { href: "/campaigns", label: "GROW" },
];

/* The arcade's marquee, two decks:
   — MARQUEE ROW: wordmark left; controls right (EasyModeToggle, then the
     coin). On mobile the coin IS the menu button (28px art in a 44px
     target, right corner = thumb zone); on desktop the coin sits beside
     the wordmark as the brand mark and the nav expands as links.
   — TELEMETRY TICKER: thin strip below for chain data (BlockClock, HUD
     white). The wordmark never shares a row with data. Future stats join
     the ticker, not the marquee. */
export default function SiteHeader({
  links = DEFAULT_LINKS,
  wordmark = "PAC'S ARCADE",
  coinSrc = "/bitcoin.gif",
  identitySlot,
}: {
  links?: SiteHeaderLink[];
  wordmark?: string;
  coinSrc?: string;
  /** The signed-in fren chip (or a LOGIN link) — apps inject it so the
      header shows who you are, persistently, on every page. */
  identitySlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative border-b-2 border-edge">
      {/* marquee row — brand left, controls right, visibility toggle FAR right */}
      <nav className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        {/* desktop brand mark (decorative — the menu is expanded as links) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coinSrc} alt="" aria-hidden className="hidden h-7 w-7 flex-none sm:block" />
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

        {/* mobile menu button — the coin */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className={`grid h-11 w-11 flex-none cursor-pointer place-items-center sm:hidden ${
            open ? "outline-3 outline-dashed outline-cyan -outline-offset-1" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coinSrc} alt="" aria-hidden className="h-7 w-7" />
        </button>

        {/* visibility toggle — far right, always (Pac, 2026-07-07) */}
        <EasyModeToggle />
      </nav>

      {/* mobile menu — right-aligned panel dropped from the coin */}
      {open && (
        <div className="absolute right-3 top-full z-50 w-56 border-2 border-edge bg-panel font-pixel text-[11px] shadow-[0_0_16px_rgba(0,0,0,0.7)] sm:hidden">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-11 items-center px-4 ${
                i < links.length - 1 ? "border-b-2 border-edge" : ""
              } ${l.coin ? "text-coin glow-coin" : "text-cyan"}`}
            >
              {l.label}
            </Link>
          ))}
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
