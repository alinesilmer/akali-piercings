import { useCallback, useEffect, useRef, useState } from "react";

/** A boolean that switches on when triggered and turns itself off after `ms` (status messages). */
export function useTransientFlag(ms = 6000) {
  const [on, setOn] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const trigger = useCallback(() => {
    setOn(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOn(false), ms);
  }, [ms]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [on, trigger] as const;
}
