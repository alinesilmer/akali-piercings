import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import notFound from "../../assets/images/NOTFOUND.webp";
import { mainImage } from "../../domain/catalog";
import { KIND_LABELS } from "../../data/site";
import { formatPrice, pad } from "../../lib/format";
import { EASE } from "../../lib/motion";
import type { CatalogItem } from "../../types/models";
import { Button } from "../ui/Button";

function highlight(text: string, term: string): ReactNode {
  const at = text.toLowerCase().indexOf(term);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + term.length)}</mark>
      {text.slice(at + term.length)}
    </>
  );
}

export function SearchResults({
  results,
  term,
  onPick,
}: {
  results: CatalogItem[];
  term: string;
  onPick: (item: CatalogItem) => void;
}) {
  return (
    <>
      <span className="label">
        ({pad(results.length)}) resultado{results.length === 1 ? "" : "s"}
      </span>
      <ul className="search__results">
        {results.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 8) * 0.05 }}
          >
            <Button className="search__row" onClick={() => onPick(item)}>
              <img src={mainImage(item, notFound)} alt="" loading="lazy" />
              <span className="search__title">{highlight(item.title, term)}</span>
              <span className="label">{KIND_LABELS[item.kind]}</span>
              <span>{formatPrice(item.price)}</span>
              <ArrowUpRight size={18} strokeWidth={1.25} />
            </Button>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
