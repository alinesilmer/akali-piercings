import type { CatalogFilter, CatalogItem } from "./models";

/** Everything the public storefront needs, regardless of where it comes from. */
export interface Catalog {
  piercings: CatalogItem[];
  jewelry: CatalogItem[];
  jewelryCategories: CatalogFilter[];
}
