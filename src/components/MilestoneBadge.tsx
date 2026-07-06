export interface MilestoneBadgeProps {
  /** Milestone position as percent of goal, e.g. 25, 50, 75, 100. */
  percent: number;
  /** What unlocks here, e.g. "NEW CABINET ART". Hidden behind "???" while locked. */
  label: string;
  /** Whether funding has reached this milestone. */
  unlocked: boolean;
}

/**
 * A stretch-goal crate on the funding journey. Locked crates keep their reward
 * as "???" mystery loot; unlocked ones light up coin-gold. Render a row of
 * these under the progress bar in percent order.
 */
export function MilestoneBadge({ percent, label, unlocked }: MilestoneBadgeProps) {
  return (
    <div className={`pa-milestone${unlocked ? " pa-milestone--unlocked" : ""}`}>
      <span className="pa-milestone__percent">{percent}%</span>
      <span className="pa-milestone__label">{unlocked ? label : "???"}</span>
    </div>
  );
}
