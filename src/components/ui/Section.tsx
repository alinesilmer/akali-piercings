import type { ReactNode } from "react";

import { Heading } from "./Heading";
import { KanjiLabel } from "./Text";

export function Section({
  id,
  tone = "default",
  flush,
  defer = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: "default" | "panel";
  /** Remove the vertical padding on one side to chain with the previous/next section. */
  flush?: "top" | "bottom";
  /** Let the browser skip rendering this section until it is near the viewport. */
  defer?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    "section",
    tone === "panel" && "section--panel",
    flush && `section--flush-${flush}`,
    defer && "section--defer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}

export function SectionHead({
  kanji,
  title,
  aside,
}: {
  kanji?: string;
  title: ReactNode;
  /** Optional action or note aligned to the right of the title. */
  aside?: ReactNode;
}) {
  return (
    <header className="section-head">
      <div>
        {kanji && <KanjiLabel>{kanji}</KanjiLabel>}
        <Heading size="lg">{title}</Heading>
      </div>
      {aside}
    </header>
  );
}
