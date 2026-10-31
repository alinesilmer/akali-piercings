import { AnimatePresence } from "framer-motion";

import type { CatalogItem } from "../../types/models";
import { ProductCard } from "./ProductCard";

const SKELETONS = [0, 1, 2, 3];

export function ProductGrid({
  items,
  loading,
  onSelect,
  limit,
}: {
  items: CatalogItem[];
  loading: boolean;
  onSelect: (item: CatalogItem) => void;
  limit?: number;
}) {
  if (loading) {
    return (
      <div className="product-grid" aria-hidden>
        {SKELETONS.map((key) => (
          <div key={key} className="skeleton" />
        ))}
      </div>
    );
  }

  const visible = limit ? items.slice(0, limit) : items;
  if (visible.length === 0) return <p className="empty-note">Nada por acá. Todavía.</p>;

  return (
    <div className="product-grid">
      <AnimatePresence mode="popLayout">
        {visible.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} onSelect={onSelect} />
        ))}
      </AnimatePresence>
    </div>
  );
}
