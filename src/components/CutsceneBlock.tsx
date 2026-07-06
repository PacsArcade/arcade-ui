import type { ReactNode } from "react";

export interface CutsceneBlockProps {
  /** Update title, e.g. "LEVEL 2 UNLOCKED". */
  title: string;
  /** Display date for the update, e.g. "2026-07-07". */
  date: string;
  /** Sequence tag over the border, e.g. "UPDATE 03". */
  tag?: string;
  /** The update body — paragraphs, images, patch notes. */
  children: ReactNode;
}

/**
 * A campaign update as an intermission cutscene dialogue box: double border,
 * sequence tag, coin-yellow title. Stack newest-first for the devlog.
 */
export function CutsceneBlock({ title, date, tag, children }: CutsceneBlockProps) {
  return (
    <article className="pa-cutscene">
      {tag ? <span className="pa-cutscene__tag">{tag}</span> : null}
      <header className="pa-cutscene__head">
        <h4 className="pa-cutscene__title">{title}</h4>
        <span className="pa-cutscene__date">{date}</span>
      </header>
      <div className="pa-cutscene__body">{children}</div>
    </article>
  );
}
