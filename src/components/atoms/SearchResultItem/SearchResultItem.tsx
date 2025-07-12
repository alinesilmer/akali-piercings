"use client";

import type React from "react";

import { motion } from "framer-motion";
import type { ProductService } from "../../../types/product";
import styles from "./SearchResultItem.module.scss";

interface SearchResultItemProps {
  product: ProductService;
  onClick: () => void;
  searchQuery: string;
  index: number;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  product,
  onClick,
  searchQuery,
  index,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      className={styles.searchResultItem}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(194, 180, 138, 0.1)" }}
    >
      <div className={styles.imageContainer}>
        <img
          src={product.images[0]?.src || "/placeholder.svg?height=60&width=60"}
          alt={product.title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h4 className={styles.title}>
          {highlightText(product.title, searchQuery)}
        </h4>
        <p className={styles.description}>
          {highlightText(product.description.slice(0, 80) + "...", searchQuery)}
        </p>
        <div className={styles.meta}>
          <span className={styles.category}>
            {product.category === "piercing" ? "Piercing" : "Joyería"}
          </span>
          <span className={styles.price}>
            {product.currency}
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResultItem;
