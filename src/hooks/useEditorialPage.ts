import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

export function useEditorialPage() {
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (reduce) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduce]);
}
