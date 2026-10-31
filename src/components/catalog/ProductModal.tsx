import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";

import notFound from "../../assets/images/NOTFOUND.webp";
import { KIND_LABELS } from "../../data/site";
import { useLastDefined } from "../../hooks/useLastDefined";
import { formatPrice } from "../../lib/format";
import { EASE } from "../../lib/motion";
import { MESSAGES, whatsappUrl } from "../../lib/whatsapp";
import type { CatalogItem } from "../../types/models";
import { Badges } from "../ui/Badges";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Modal } from "../ui/Modal";
import { Text } from "../ui/Text";

function Gallery({ product }: { product: CatalogItem }) {
  const [selected, setSelected] = useState(0);
  const images = product.images.length ? product.images : [{ id: "none", url: notFound, alt: product.title }];
  const image = images[selected] ?? images[0];

  return (
    <div>
      <div className="product-sheet__stage">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={image.id}
            src={image.url}
            alt={image.alt || product.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </AnimatePresence>
        <Badges item={product} />
      </div>
      {images.length > 1 && (
        <div className="product-sheet__thumbs">
          {images.map((thumb, i) => (
            <Button
              key={thumb.id}
              className={`product-sheet__thumb ${i === selected ? "is-on" : ""}`}
              onClick={() => setSelected(i)}
              aria-label={`Foto ${i + 1}`}
              aria-pressed={i === selected}
            >
              <img src={thumb.url} alt="" loading="lazy" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({ product, onClose }: { product: CatalogItem; onClose: () => void }) {
  const isPiercing = product.kind === "piercing";

  return (
    <div className="product-sheet__info">
      <Text variant="label">{KIND_LABELS[product.kind]}</Text>
      <Heading size="md">{product.title}</Heading>
      <p className="product-sheet__price">
        {formatPrice(product.price)}
        {product.originalPrice && <s>{formatPrice(product.originalPrice)}</s>}
      </p>
      {product.description && <Text>{product.description}</Text>}
      {product.features.length > 0 && (
        <ul className="product-sheet__features">
          {product.features.map((feature) => (
            <li key={feature}>
              <Check size={16} strokeWidth={1.5} /> {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="product-sheet__actions">
        <Button
          variant="solid"
          href={whatsappUrl((isPiercing ? MESSAGES.book : MESSAGES.jewelry) + product.title)}
          onClick={onClose}
        >
          <MessageCircle size={17} strokeWidth={1.75} />
          {isPiercing ? "Agendar turno" : "Lo quiero"}
        </Button>
        {isPiercing && (
          <Button variant="link" href={whatsappUrl(MESSAGES.change + product.title)} onClick={onClose}>
            Cambio de pieza <ArrowUpRight size={15} strokeWidth={1.5} />
          </Button>
        )}
      </div>
    </div>
  );
}

export function ProductModal({ product, onClose }: { product: CatalogItem | null; onClose: () => void }) {
  const shown = useLastDefined(product);

  return (
    <Modal open={Boolean(product)} onClose={onClose} label={shown?.title ?? "Producto"}>
      {shown && (
        <div className="product-sheet" key={shown.id}>
          <Gallery product={shown} />
          <Info product={shown} onClose={onClose} />
        </div>
      )}
    </Modal>
  );
}
