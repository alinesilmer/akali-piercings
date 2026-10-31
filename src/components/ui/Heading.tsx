import type { ReactNode } from "react";

import { Reveal } from "../motion";

type Size = "hero" | "xl" | "lg" | "md" | "sm";

/**
 * Every title in the site. Size maps to the global `title-*` scale; each line rises
 * from behind a mask, one after the other.
 */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  lines,
  delay = 0,
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: Size;
  /** Several lines that reveal in sequence. Use `children` for a single line. */
  lines?: ReactNode[];
  delay?: number;
  className?: string;
  children?: ReactNode;
}) {
  const items = lines ?? [children];

  return (
    <Tag className={`title-${size} ${className}`}>
      {items.map((line, i) => (
        <Reveal key={i} delay={delay + i * 0.14}>
          {line}
        </Reveal>
      ))}
    </Tag>
  );
}
