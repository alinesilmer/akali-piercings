import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { EASE, IN_VIEW } from "../../lib/motion";

/** Image that drifts slowly against the scroll and unveils itself on entry. */
export function Parallax({
  src,
  alt = "",
  amount = 8,
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  amount?: number;
  /** Above-the-fold image: load eagerly and at high priority. */
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <motion.div
      ref={ref}
      className={`parallax ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={IN_VIEW}
      transition={{ duration: 1.5, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ y: reduce ? 0 : y, scale: 1 + (amount * 2 + 2) / 100 }}
      />
    </motion.div>
  );
}
