import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Heavily damped on purpose: it glides toward the cursor and settles without overshoot.
const SPRING = { stiffness: 110, damping: 24, mass: 0.7 };

export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const follow = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className="magnetic" style={{ x: springX, y: springY }} onMouseMove={follow} onMouseLeave={release}>
      {children}
    </motion.div>
  );
}
