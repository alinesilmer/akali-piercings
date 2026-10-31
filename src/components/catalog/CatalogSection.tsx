import { useState, type ReactNode } from "react";

import { categoriesInUse, filterByCategory } from "../../domain/catalog";
import type { CatalogFilter, CatalogItem } from "../../types/models";
import { Section, SectionHead } from "../ui/Section";
import { FilterBar } from "./FilterBar";
import { ProductGrid } from "./ProductGrid";

/**
 * A titled, filterable product grid. Home's shop and both Services catalogs are this component
 * with different data, so the look and behaviour can never drift apart.
 */
export function CatalogSection({
  id,
  kanji,
  title,
  aside,
  items,
  categories,
  loading,
  limit,
  tone,
  onSelect,
  footer,
}: {
  id?: string;
  kanji?: string;
  title: ReactNode;
  aside?: ReactNode;
  items: CatalogItem[];
  categories: CatalogFilter[];
  loading: boolean;
  limit?: number;
  tone?: "default" | "panel";
  onSelect: (item: CatalogItem) => void;
  footer?: ReactNode;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const options = categoriesInUse(categories, items);

  return (
    <Section id={id} tone={tone}>
      <SectionHead kanji={kanji} title={title} aside={aside} />
      {options.length > 0 && <FilterBar label="Filtrar" options={options} value={filter} onChange={setFilter} />}
      <ProductGrid items={filterByCategory(items, filter)} loading={loading} onSelect={onSelect} limit={limit} />
      {footer && <div className="section-foot">{footer}</div>}
    </Section>
  );
}
