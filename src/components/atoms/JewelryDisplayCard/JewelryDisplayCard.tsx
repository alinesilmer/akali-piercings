"use client";
import type React from "react";
import { motion } from "framer-motion";
import type { ProductImage } from "../../../types/product";
import styles from "./JewelryDisplayCard.module.scss";
import notFound from "../../../assets/images/NOTFOUND.png";

interface JewelryDisplayCardProps {
  image: ProductImage;
  onClick: () => void;
  index?: number;
}

const JewelryDisplayCard: React.FC<JewelryDisplayCardProps> = ({
  image,
  onClick,
  index = 0,
}) => {
  return (
    <motion.div
      className={styles.jewelryDisplayCard}
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
          src={image.src || notFound}
          alt={image.alt}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.viewText}>Ver imagen</span>
        </div>
      </div>
    </motion.div>
  );
};

export default JewelryDisplayCard;
