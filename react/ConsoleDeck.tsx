import Link from "next/link";
import type { ReactNode } from "react";
import type { ConsoleRoom, ConsoleSite } from "./console";

/**
 * The admin deck — the console hub: one door to every operator room, as a
 * grid of manifest-driven cards. Lives on the site's `site.deck` route with
 * ConsoleNav above it; extra hub furniture (shelves, specimen cases) rides
 * in as children below the grid.
 *
 * BOUNDARY — auth stays app-side: the deck lists doors, it never opens
 * them. Mount it behind the site's own gate (frens.earth: OperatorGate;
 * pacsarcade-org: console-auth) — whoami, sessions, and allowlists are the
 * app's business, never this module's.
 */
export default function ConsoleDeck({
  site,
  rooms,
  title = "ADMIN DECK",
  tagline = "EVERY OPERATOR ROOM, ONE DOOR — KEYS OPEN ALL OF THEM",
  children,
}: {
  site: ConsoleSite;
  rooms: ConsoleRoom[];
  /** The hub's marquee line. */
  title?: string;
  /** The line under the marquee — what this deck promises. */
  tagline?: string;
  /** App-owned hub extras, rendered below the room grid. */
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <p className="mb-2 font-pixel text-[10px] uppercase tracking-widest text-white/40">
        OPERATOR CONSOLE ▸ {site.domain.toUpperCase()}
      </p>
      <h1 className="mb-3 font-arcade text-4xl text-cyan glow-cyan">{title}</h1>
      <p className="mb-8 font-mono text-[11px] text-white/50">{tagline}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {rooms.map((r) => (
          <Link
            key={r.key}
            href={r.href}
            className={`border-2 bg-panel p-5 ${r.accent ?? "border-edge text-cyan"}`}
          >
            <p className="mb-1 font-pixel text-xs uppercase">{r.label} ▸</p>
            <p className="font-body text-sm text-white/70">{r.blurb}</p>
          </Link>
        ))}
      </div>
      {children}
    </section>
  );
}
