import type { ReactNode } from "react";

type Variant = "lede" | "muted" | "label";

/** Body copy. One component so paragraph styles never get re-declared. */
export function Text({
  variant = "muted",
  as: Tag = "p",
  className = "",
  children,
}: {
  variant?: Variant;
  as?: "p" | "span";
  className?: string;
  children: ReactNode;
}) {
  const classes = { lede: "lede", muted: "text-muted", label: "label" }[variant];
  return <Tag className={`${classes} ${className}`}>{children}</Tag>;
}

export function Eyebrow({ ember = false, children }: { ember?: boolean; children: ReactNode }) {
  return <p className={`eyebrow ${ember ? "eyebrow--ember" : ""}`}>{children}</p>;
}

/** Decorative Japanese label above a section title. Hidden from assistive tech. */
export function KanjiLabel({ children }: { children: string }) {
  return (
    <span className="kanji-label" lang="ja" aria-hidden>
      {children}
    </span>
  );
}
