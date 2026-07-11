/**
 * The console manifest contract — the operator console is a MODULE, not any
 * one site's furniture (Pac, 2026-07-11). A site describes itself with one
 * ConsoleSite and one ConsoleRoom[] (its manifest, kept app-side), and
 * ConsoleNav + ConsoleDeck render the whole admin deck from it. Adding a
 * room = one manifest entry; rebranding the console = the theme.
 *
 * BOUNDARY — auth stays app-side. This module renders furniture, it never
 * guards it: each site brings its own gate and whoami (frens.earth:
 * OperatorGate + operator-auth; pacsarcade-org: console-auth +
 * /api/console/login) and mounts these components only behind that gate.
 */

/** The site a console administers — identity for the rail and the deck. */
export interface ConsoleSite {
  /** Where ⌂ leads — the public site's home route (usually "/"). */
  home: string;
  /** The exit label — the domain the operator steps back out to
      (e.g. "frens.earth", "pacsarcade.org"). Rendered uppercase. */
  domain: string;
  /** The console hub route — the ⚓ DECK link target and the page where
      ConsoleDeck lives (e.g. "/a", "/console"). */
  deck: string;
  /** Optional space handle (no @) for app-side kickers and copy. */
  space?: string;
}

/** One operator room — a door on the deck, a stop on the rail. */
export interface ConsoleRoom {
  /** Stable identity for React keys and app-side lookups. */
  key: string;
  /** The room's route. Sub-routes keep the room lit on the rail. */
  href: string;
  /** Short uppercase-styled name on rail links and deck cards. */
  label: string;
  /** One-line card copy on the deck — what the room is for. */
  blurb: string;
  /** Semantic accent classes for the deck card, e.g. "border-coin/50
      text-coin". House rule: semantic hues never move (coin = money only,
      neon = live, cyan = info, ghost = danger). Defaults to edge/cyan. */
  accent?: string;
}
