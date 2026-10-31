import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/** Endless ticker. Scroll speed gently pushes it faster, easing back when you stop. */
export function Marquee({
  children,
  speed = -2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 60, stiffness: 260 });
  const boost = useTransform(velocity, [0, 1000], [0, 3], { clamp: false });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * speed * (delta / 1000);
    if (boost.get() < 0) direction.current = -1;
    else if (boost.get() > 0) direction.current = 1;
    move += direction.current * move * boost.get();
    base.set(base.get() + move);
  });

  const x = useTransform(base, (value) => `${wrap(-25, 0, value)}%`);

  return (
    <div className={`marquee ${className}`} aria-hidden>
      <motion.div className="marquee__track" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="marquee__item">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
