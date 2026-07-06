import { formatSats } from "../lib/format";

export interface HighScoreEntry {
  /** Classic 3-letter arcade initials (or a short fren tag). */
  initials: string;
  /** Contribution total in sats — the score. */
  sats: number;
}

export interface HighScoreBoardProps {
  /** Top contributors, highest first. Top 3 get gold/cyan/pink rows. */
  entries: HighScoreEntry[];
  /** Board title. Default "HIGH SCORES". */
  title?: string;
}

/**
 * Top contributors as an attract-mode high-score table: RANK / NAME / SATS.
 * Anonymous donors show as "???". Keep it to ~10 rows.
 */
export function HighScoreBoard({ entries, title = "HIGH SCORES" }: HighScoreBoardProps) {
  return (
    <div className="pa-hiscore">
      <h3 className="pa-hiscore__title">{title}</h3>
      <table className="pa-hiscore__table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Sats</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={`${e.initials}-${i}`} className={i < 3 ? `pa-hiscore__row--${i + 1}` : undefined}>
              <td>{String(i + 1).padStart(2, "0")}</td>
              <td>{e.initials}</td>
              <td>{formatSats(e.sats)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
