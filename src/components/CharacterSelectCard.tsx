import { formatSats } from "../lib/format";

export interface CharacterSelectCardProps {
  /** Campaign title. */
  title: string;
  /** Creator's registered nostr handle, shown as the character name. */
  creatorName: string;
  /** Campaign art URL. Falls back to a "?" placeholder block. */
  imageUrl?: string;
  /** Confirmed sats raised. */
  raisedSats: number;
  /** Funding goal in sats. */
  goalSats: number;
  /** Days remaining in the campaign. */
  daysLeft: number;
  /** Number of backers. */
  backers: number;
  /** Show the blinking P1 selector cursor (hover/focus/active state). */
  selected?: boolean;
  /** Navigate to the campaign. */
  onSelect?: () => void;
}

/**
 * A campaign as a fighter card on the character-select roster. selected shows
 * the blinking P1 cursor. The funded percent is derived from raised/goal and
 * shown with backers and days left — real numbers stay visible for trust.
 */
export function CharacterSelectCard({
  title,
  creatorName,
  imageUrl,
  raisedSats,
  goalSats,
  daysLeft,
  backers,
  selected = false,
  onSelect,
}: CharacterSelectCardProps) {
  const pct = goalSats > 0 ? Math.floor(Math.min(100, (raisedSats / goalSats) * 100)) : 0;
  return (
    <div
      className={`pa-select-card${selected ? " pa-select-card--selected" : ""}`}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      {selected ? <span className="pa-select-card__cursor">P1</span> : null}
      <div className="pa-select-card__art" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}>
        {imageUrl ? null : "?"}
      </div>
      <div className="pa-select-card__body">
        <h4 className="pa-select-card__title">{title}</h4>
        <span className="pa-select-card__creator">@{creatorName}</span>
        <div className="pa-select-card__stats">
          <span>
            FUNDED<strong>{pct}%</strong>
          </span>
          <span>
            BACKERS<strong>{backers}</strong>
          </span>
          <span>
            DAYS<strong>{daysLeft}</strong>
          </span>
        </div>
        <div className="pa-select-card__stats">
          <span>
            RAISED<strong>{formatSats(raisedSats)}</strong>
          </span>
          <span>
            GOAL<strong>{formatSats(goalSats)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
