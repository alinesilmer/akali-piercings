import type { CatalogFilter, CatalogItem } from "../types/models";

// Pure catalog rules: no React, no I/O. Everything here is unit-testable.

export const filterByCategory = (items: CatalogItem[], categoryId: string | null) =>
  categoryId ? items.filter((item) => item.categoryId === categoryId) : items;

/** Keeps only the filters that still have at least one item, so the UI never offers an empty tab. */
export const categoriesInUse = (categories: CatalogFilter[], items: CatalogItem[]) =>
  categories.filter((category) => items.some((item) => item.categoryId === category.id));

export const matchesTerm = (item: CatalogItem, term: string, kindLabel: string) =>
  [item.title, item.description, kindLabel, ...item.features].some((text) => text.toLowerCase().includes(term));

export const searchItems = (items: CatalogItem[], term: string, kindLabels: Record<CatalogItem["kind"], string>) => {
  const needle = term.trim().toLowerCase();
  return needle ? items.filter((item) => matchesTerm(item, needle, kindLabels[item.kind])) : [];
};

export const mainImage = (item: CatalogItem, fallback: string) => item.images[0]?.url || fallback;
