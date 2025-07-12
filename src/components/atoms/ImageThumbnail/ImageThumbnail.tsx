"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./ImageThumbnail.module.scss";

interface ImageThumbnailProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  isSelected,
  onClick,
  index,
}) => {
  return (
    <motion.button
      className={`${styles.thumbnail} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <img src={src || "/placeholder.svg"} alt={alt} className={styles.image} />
      <div className={styles.overlay}></div>
    </motion.button>
  );
};

export default ImageThumbnail;
