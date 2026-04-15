"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./PriceTag.module.scss";

interface PriceTagProps {
  price: number;
  currency?: string;
  size?: "small" | "medium" | "large";
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  currency = "$",
  size = "medium",
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price);
  };

  return (
    <motion.div
      className={`${styles.priceTag} ${styles[size]}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <span className={styles.currency}>{currency}</span>
      <span className={styles.amount}>{formatPrice(price)}</span>
    </motion.div>
  );
};

export default PriceTag;
