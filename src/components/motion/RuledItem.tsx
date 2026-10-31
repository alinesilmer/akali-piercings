import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { DRAW, IN_VIEW } from "../../lib/motion";

/** List item with a hairline that draws itself across the top edge. */
export function RuledItem({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"li">, "children"> & { children: ReactNode }) {
  return (
    <motion.li className={`ruled__item ${className}`} initial="hidden" whileInView="show" viewport={IN_VIEW} {...props}>
      <motion.span className="ruled__rule" variants={DRAW} />
      {children}
    </motion.li>
  );
}
