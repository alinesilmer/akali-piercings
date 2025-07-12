"use client";

import type React from "react";

import { motion } from "framer-motion";
import type { ProductService } from "../../../types/product";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: ProductService;
  onClick: () => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  index = 0,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price);
  };

  return (
    <motion.div
      className={styles.productCard}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.imageContainer}>
        <img
          src={
            product.images[0]?.src || "/placeholder.svg?height=300&width=300"
          }
          alt={product.title}
          className={styles.image}
        />

        {/* Badges */}
        {product.isOnSale && <div className={styles.saleBadge}>Oferta</div>}
        {product.isNew && <div className={styles.newBadge}>¡Nuevo!</div>}

        <div className={styles.overlay}>
          <span className={styles.viewText}>Ver detalles</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.priceContainer}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              {product.currency}
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className={styles.price}>
            {product.currency}
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
