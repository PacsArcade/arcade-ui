# TASK-285B — arcade-ui rescope claim

Owner: home crew builder (sonnet), sub-lane 285-B of TASK-285.
Worktree: /home/pac/dev/worktrees/task-285b (branch feat/task-285b)
Base sha: 8e2dd386e0d541a525ac4f3c69ac75c454396e47 (arcade-ui main, `8e2dd38`)

## Own

- ~/dev/pacsarcade/arcade-ui (via this worktree only) — the whole repo:
  package.json/package-lock.json rename+bump, README/MIGRATION/THEMING/
  DESIGN-NOTES sweep, tailwind/css self-reference sweep, the pack, the
  release script (dry-run only), the consumer smoke against frens.earth
  in a scratch copy.

## Do NOT own / do not touch

- /home/pac/dev/pacsarcade/arcade-ui itself (the non-worktree checkout) —
  has an uncommitted edit in react/BlockClock.tsx that is not mine.
- Any other TASK-285 sub-lane (285-A puck-studio, 285-C consumers).
- No push, no `gh release create`, no live site, no secrets.

## Ruling this lane executes

- H108 A — the fleet packages leave the arcade's npm scope.
- The Admiral's scope ruling, 0018.06.25 a₿ · block 967,144: scope name
  is **`@frens-earth`** ("@frens-earth is fine, go with that").

## Scope of change

npm scope only: `@pacsarcade/arcade-ui` → `@frens-earth/arcade-ui`,
version 0.4.1 → 0.5.0 (first real tagged release; consumers pin a raw
commit-archive URL today). No design-language, brand-name, or CSS-token
renames — those stay Pac's Arcade / arcade brand as-is.
