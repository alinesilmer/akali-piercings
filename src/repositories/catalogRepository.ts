import type { Catalog } from "../types/catalog";

/** Port: the UI only ever talks to this, never to Firestore or to mock files directly. */
export interface CatalogRepository {
  load(): Promise<Catalog>;
}

const mock: CatalogRepository = {
  load: () => import("../data/mock/catalog").then((module) => module.MOCK_CATALOG),
};

const firebase: CatalogRepository = {
  load: () => import("../services/catalog").then((module) => module.loadCatalog()),
};

/** Frontend-only by default. Set `VITE_DATA_SOURCE=firebase` to read the live catalog instead. */
export const catalogRepository: CatalogRepository = import.meta.env.VITE_DATA_SOURCE === "firebase" ? firebase : mock;
