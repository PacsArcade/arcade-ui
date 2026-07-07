# Theming — arcade themes + accents

Dark is the base. Every cabinet starts from MIDNIGHT (CRT black `#050505`,
panel `#1a1a1a`, edge `#333`).

("Arcade theme", not "verse theme" — *verse* already means an operator's
whole world in the engine; the skin is just the theme.)

## The two knobs a server owner gets

1. **Arcade theme** — `data-arcade-theme="midnight | vapor | terminal |
   arctic"` on `<html>` (whole site) or any `.pa-screen` (one section).
   Themes move **surfaces** (void/panel/edge) and the **flair accent** only.
2. **Custom flair accent** — override the flair slot directly:
   `style="--pa-pink: #39a7ff"` (static/CSS core) and `--color-pink`
   (Tailwind apps). Pick something that stays clear of the locked hues.

This maps 1:1 to "theme accent" in the course console VERSE SETTINGS and
the node console's operator settings.

## What NEVER moves (the semantic contract)

- coin `#FFD700` — money and funding surfaces ONLY
- neon `#39FF14` — success / live
- cyan `#00FFFF` — info / links
- ghost `#E91E63` — danger / warnings

An arcade can look violet, phosphor-green, or ice-blue — but sats are
always gold, live is always neon, danger is always ghost. That's how a fren
can walk into any arcade and already know the rules.

## Theme table

| theme     | void     | panel    | edge     | flair    |
|-----------|----------|----------|----------|----------|
| midnight  | #050505  | #1a1a1a  | #333333  | #ff00ff  |
| vapor     | #070510  | #171226  | #3a2f55  | #ff35c8  |
| terminal  | #030803  | #101a10  | #234023  | #ff00ff  |
| arctic    | #02060a  | #0e1620  | #1f3547  | #39a7ff  |

Open `preview.html` to see all four side by side.

## Adding a theme

Add one block to `css/themes.css` (and mirror it in `tailwind/theme.css`):
override the three surfaces + optionally the flair. Keep contrast: body
text `rgba(255,255,255,.7+)` must stay readable on your panel; edges must
read against void. Never touch coin/neon/cyan/ghost.
