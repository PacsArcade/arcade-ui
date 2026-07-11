import Link from "next/link";
import type { ConsoleRoom, ConsoleSite } from "./console";

/**
 * The bridge rail — one compact row on every console room: the way BACK TO
 * THE SITE first (⌂, the door every deck needs — Pac, 2026-07-11), then the
 * deck, then every room from the site's manifest. Driven entirely by props;
 * the current room is read off `currentPath` (exact match or a sub-route).
 *
 * BOUNDARY — auth stays app-side: mount this behind the site's own gate
 * (frens.earth: OperatorGate; pacsarcade-org: console-auth). The rail never
 * checks a session — it renders wherever the app says an operator stands.
 */
export default function ConsoleNav({
  site,
  rooms,
  currentPath,
}: {
  site: ConsoleSite;
  rooms: ConsoleRoom[];
  /** The pathname being viewed — pages pass their own route. */
  currentPath: string;
}) {
  const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
  const path = strip(currentPath);
  /* the deck lights only on its exact route (rooms live under it);
     a room stays lit on its sub-routes */
  const onDeck = path === strip(site.deck);
  const inRoom = (href: string) =>
    path === strip(href) || path.startsWith(`${strip(href)}/`);
  const roomLink = (current: boolean) =>
    `min-h-9 border-2 px-3 py-1 font-pixel text-[9px] uppercase ${
      current
        ? "border-cyan text-cyan"
        : "border-edge text-white/40 hover:border-cyan/50 hover:text-white/80"
    }`;

  return (
    <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-6 pt-6">
      {/* the exit — the site this console administers */}
      <Link
        href={site.home}
        className="min-h-9 border-2 border-edge px-3 py-1 font-pixel text-[9px] uppercase text-neon/80 hover:border-neon/50 hover:text-neon"
      >
        ⌂ {site.domain.toUpperCase()}
      </Link>
      <span aria-hidden className="font-pixel text-[9px] text-white/20">▸</span>
      <Link
        href={site.deck}
        aria-current={onDeck ? "page" : undefined}
        className={roomLink(onDeck)}
      >
        ⚓ DECK
      </Link>
      {rooms.map((r) => (
        <Link
          key={r.key}
          href={r.href}
          aria-current={inRoom(r.href) ? "page" : undefined}
          className={roomLink(inRoom(r.href))}
        >
          {r.label}
        </Link>
      ))}
    </nav>
  );
}
