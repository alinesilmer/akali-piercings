import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { EASE, IN_VIEW } from "../../lib/motion";

const RISE = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 1.2, ease: EASE } },
};

/** Masked rise: text slides up from behind a clipping line when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`mask ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      transition={{ delayChildren: delay }}
    >
      <motion.span className="mask__inner" variants={RISE}>
        {children}
      </motion.span>
    </motion.span>
  );
}
