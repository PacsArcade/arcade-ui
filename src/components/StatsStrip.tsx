export interface StatChipProps {
  /** Small pixel-font caption under the value, e.g. "RAISED", "DAYS LEFT". */
  label: string;
  /** The big arcade-font number/string, e.g. "1,250,000". */
  value: string;
  /** Value color. coin for money values only. Default undefined = white. */
  accent?: "coin" | "neon" | "pink" | "cyan" | "ghost";
}

/** One stat tile — big arcade-font value over a pixel-font label. */
export function StatChip({ label, value, accent }: StatChipProps) {
  return (
    <div className={`pa-stat${accent ? ` pa-stat--${accent}` : ""}`}>
      <span className="pa-stat__value">{value}</span>
      <span className="pa-stat__label">{label}</span>
    </div>
  );
}

export interface StatsStripProps {
  /** The key stats row: raised, goal, backers, days left. Order is display order. */
  stats: StatChipProps[];
}

/**
 * The hero key-stats strip — raised / goal / backers / days left as a row of
 * score tiles. Money values get accent="coin"; keep 3–5 stats for one row.
 */
export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="pa-stats">
      {stats.map((s) => (
        <StatChip key={s.label} {...s} />
      ))}
    </div>
  );
}
