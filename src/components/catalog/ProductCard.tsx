import { Plus } from "lucide-react";

import notFound from "../../assets/images/NOTFOUND.webp";
import { mainImage } from "../../domain/catalog";
import { formatPrice } from "../../lib/format";
import { EASE } from "../../lib/motion";
import type { CatalogItem } from "../../types/models";
import { MotionButton } from "../ui/Button";
import { Badges } from "../ui/Badges";

export function ProductCard({
  item,
  index,
  onSelect,
}: {
  item: CatalogItem;
  index: number;
  onSelect: (item: CatalogItem) => void;
}) {
  return (
    <MotionButton
      layout
      className="product-card"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.9, ease: EASE, delay: Math.min(index, 8) * 0.05 }}
      onClick={() => onSelect(item)}
    >
      <span className="product-card__image">
        <img src={mainImage(item, notFound)} alt={item.title} loading="lazy" decoding="async" />
        <Badges item={item} />
        <span className="product-card__quick">
          Ver detalle <Plus size={18} strokeWidth={1.5} />
        </span>
      </span>
      <span className="product-card__caption">
        <span className="product-card__title">{item.title}</span>
        <span className="product-card__price">
          {item.originalPrice && <s>{formatPrice(item.originalPrice)}</s>}
          {formatPrice(item.price)}
        </span>
      </span>
    </MotionButton>
  );
}
