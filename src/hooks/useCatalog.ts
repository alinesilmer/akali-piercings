import { useEffect, useState } from "react";

import { catalogRepository } from "../repositories/catalogRepository";
import type { Catalog } from "../types/catalog";

const EMPTY: Catalog = { piercings: [], jewelry: [], jewelryCategories: [] };

// One request shared by every component and every page visit.
let request: Promise<Catalog> | null = null;

const loadOnce = () => (request ??= catalogRepository.load());

export function useCatalog(enabled = true) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let current = true;

    loadOnce()
      .catch((error) => {
        console.error(error);
        request = null;
        return EMPTY;
      })
      .then((loaded) => {
        if (current) setCatalog(loaded);
      });

    return () => {
      current = false;
    };
  }, [enabled]);

  return { ...(catalog ?? EMPTY), loading: !catalog };
}
