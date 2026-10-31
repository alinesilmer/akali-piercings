import { useCallback, useState } from "react";

/** Holds the currently opened thing (a product, an image) with a stable `clear` for modal onClose. */
export function useSelection<T>() {
  const [selected, setSelected] = useState<T | null>(null);
  const clear = useCallback(() => setSelected(null), []);
  return { selected, select: setSelected, clear };
}
