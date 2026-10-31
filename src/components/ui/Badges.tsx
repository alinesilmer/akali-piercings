import type { CatalogItem } from "../../types/models";

/** "Oferta" / "Nuevo" pills, stacked over the top-left corner of an image. */
export function Badges({ item }: { item: Pick<CatalogItem, "isOnSale" | "isNew"> }) {
  if (!item.isOnSale && !item.isNew) return null;

  return (
    <span className="badge-stack">
      {item.isOnSale && <span className="badge badge--sale">Oferta</span>}
      {item.isNew && <span className="badge">Nuevo</span>}
    </span>
  );
}
