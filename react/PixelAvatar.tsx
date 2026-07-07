import type { CSSProperties } from "react";

/**
 * PixelAvatar — the arcade's face when a fren has no kind-0 picture (or no
 * key at all). Two variants:
 *
 *   "ghost"  — the vacant cabinet: a dim ghost with hollow eyes. Used as the
 *              signed-out chip face — nobody's home yet.
 *   "player" — a pac-man head on a pixel body. The body and its color are
 *              picked deterministically from `seed` (the fren's handle), so
 *              the same fren always wears the same body on every visit.
 *
 * Pure inline SVG on a 16×16 grid — no assets, themes apply through the
 * --color-* tokens.
 */

const BODY_COLORS = ["var(--color-cyan)", "var(--color-pink)", "var(--color-neon)", "var(--color-ghost)"];

type Px = [x: number, y: number, w: number, h: number];

/* Four pixel bodies, drawn in rows 9–15 under the pac head. */
const BODIES: Px[][] = [
  /* classic — square shirt, stub arms and legs */
  [[5, 9, 6, 4], [3, 10, 2, 2], [11, 10, 2, 2], [5, 13, 2, 2], [9, 13, 2, 2]],
  /* caped — widens downward like a hero cape */
  [[6, 9, 4, 2], [5, 11, 6, 2], [4, 13, 8, 2]],
  /* round — a comfy belly */
  [[6, 9, 4, 1], [5, 10, 6, 2], [4, 12, 8, 2], [6, 14, 4, 1]],
  /* bot — shoulder pads and a broad chassis */
  [[3, 9, 2, 2], [11, 9, 2, 2], [5, 9, 6, 6]],
];

/* Tiny deterministic hash — same handle, same body, every session. */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export default function PixelAvatar({
  variant,
  seed = "",
  size = 32,
  className = "",
  style,
}: {
  variant: "ghost" | "player";
  /** Deterministic body picker — pass the fren's handle. */
  seed?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const h = hashSeed(seed);
  const body = BODIES[h % BODIES.length];
  const bodyColor = BODY_COLORS[(h >>> 2) % BODY_COLORS.length];

  return (
    <span
      aria-hidden
      className={`grid flex-none place-items-center border-2 bg-panel ${
        variant === "ghost" ? "border-edge" : "border-cyan"
      } ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        width={Math.round(size * 0.75)}
        height={Math.round(size * 0.75)}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        role="img"
        aria-hidden
      >
        {variant === "ghost" ? (
          <>
            {/* the vacant ghost — dim body, hollow eyes: nobody's home yet */}
            <rect x="5" y="2" width="6" height="1" fill="var(--color-edge)" />
            <rect x="4" y="3" width="8" height="1" fill="var(--color-edge)" />
            <rect x="3" y="4" width="10" height="8" fill="var(--color-edge)" />
            {/* skirt feet */}
            <rect x="3" y="12" width="2" height="2" fill="var(--color-edge)" />
            <rect x="7" y="12" width="2" height="2" fill="var(--color-edge)" />
            <rect x="11" y="12" width="2" height="2" fill="var(--color-edge)" />
            {/* hollow eyes */}
            <rect x="5" y="6" width="2" height="3" fill="rgba(255,255,255,0.35)" />
            <rect x="9" y="6" width="2" height="3" fill="rgba(255,255,255,0.35)" />
            <rect x="5" y="7" width="1" height="1" fill="var(--color-void)" />
            <rect x="9" y="7" width="1" height="1" fill="var(--color-void)" />
          </>
        ) : (
          <>
            {/* the body — seeded pick, worn forever */}
            {body.map(([x, y, w, hh], i) => (
              <rect key={i} x={x} y={y} width={w} height={hh} fill={bodyColor} />
            ))}
            {/* pac head — coin circle with a wedge mouth, facing right */}
            <circle cx="8" cy="5" r="4" fill="var(--color-coin)" />
            <polygon points="8,5 13,2.6 13,7.4" fill="var(--color-panel)" />
            <rect x="7" y="2" width="1" height="1" fill="var(--color-void)" />
          </>
        )}
      </svg>
    </span>
  );
}
