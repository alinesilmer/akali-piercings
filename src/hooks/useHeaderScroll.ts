import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/** Header state from scroll: solid once the page moves, hidden while scrolling down. */
export function useHeaderScroll() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 400);
    setSolid(y > 80);
  });

  return { hidden, solid };
}
