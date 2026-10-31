import type { ReactNode } from "react";

type Shape = "arch" | "round" | "soft" | "wide" | "tall";

/** Clips its content (image, parallax, video) to one of the site's signature shapes. */
export function Frame({
  shape = "soft",
  className = "",
  children,
}: {
  shape?: Shape;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`frame frame--${shape} ${className}`}>{children}</div>;
}
