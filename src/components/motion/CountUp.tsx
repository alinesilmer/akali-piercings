import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { EASE } from "../../lib/motion";

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
