# arcade-ui design notes — the package's own punch list

The brand system's working notes: identity display conventions the sites
must converge on, and the 0.3 wishlist. Brand changes land HERE first;
sites pull the bump.

## Identity display — two doors, one arcade (Pac, 2026-07-07)

The arcade issues identities from two spaces, and every login/identity
surface must make their relationship legible instead of confusing:

- **@frens (frens.earth) — the play account.** Free for everyone. Learn
  together, test, tinker, join classes, back campaigns. "As frens, we
  learn together." This is the account you can afford to experiment with.
- **@pacsarcade (pacsarcade.org) — the school account.** The step up when
  a fren commits to the education path: classes → etched certs → the
  artist gate → running campaigns (and one day, a verse). Enrolling =
  setting up your school account at pacsarcade.

Display conventions to build into components:

1. Anywhere an identity renders (logins, the Matrix landing page, /u/
   profiles, seat claims, the console), show WHICH space it belongs to and
   what that space is for — a space chip: `@FRENS · PLAY` (cyan) /
   `@PACSARCADE · SCHOOL` (coin? no — coin is money; use pink flair or
   cyan; decide in the icon round).
2. The Matrix landing page currently says `@yourtag:pacsarcade.org` only —
   it must present both doors: play tags come from frens.earth, school
   accounts from pacsarcade. Same fren, two hats, honest copy about why
   two accounts is a FEATURE (blast radius: experiment on one, keep the
   other clean — custody pedagogy).
3. Cross-links always: a frens.earth identity surface points at the school
   door and vice versa. Never a dead end (the profile-landing lesson).
4. One tag claim should eventually provision every protocol (nostr NIP-05,
   Matrix, game roster) — see pacsarcade-org
   docs/design/poke-federation-mud-and-protocol-icons.md §3.

## 0.3 wishlist

- **Protocol icon set** (pixel marks): bitcoin (have), nostr + client
  marks, matrix + Element, spaces protocol, lightning (reserved). Each
  icon pairs with a "why we use this" blurb — protocols are curriculum.
- **Identity components**: SpaceChip (space + purpose), IdentityCard
  (tag + space + protocols present), matching the display conventions
  above.
- **Package cleanup toward "arcade-in-a-box"** (campaign #1's theme in
  software): the kit should be the UI slice of the brand kit — anything a
  new arcade needs to look right on day one. Preview page per component,
  versioned changelog, the verse theme presets documented with real
  screenshots.

## House rules (unchanged)

Coin = money only · neon = live/success · cyan = info/identity · pink =
flair/pacBOT · ghost = danger · "fren" never "friend" · certs are ETCHED ·
no dark patterns · honest states · GG's.
