"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./GalleryCard.module.scss";

interface GalleryCardProps {
  title?: string;
  image?: string;
  date?: string;
  method?: string;
  isRecent?: boolean;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  image,
  date,
  method,
  isRecent = false,
}) => {
  return (
    <motion.div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {date && <p className={styles.date}>{date}</p>}
        {method && <p className={styles.method}>{method}</p>}
        {isRecent && <span className={styles.recentBadge}>Nuevo</span>}
      </div>
    </motion.div>
  );
};

export default GalleryCard;
