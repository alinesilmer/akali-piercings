"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./OfferCard.module.scss";

type Img = string | { src: string };

interface Props {
  size?: "small" | "medium" | "large";
  image: Img;
  isActive?: boolean;
  onClick?: () => void;
  layout?: boolean /* passed from parent */;
}

export default function OfferCard({
  size = "medium",
  image,
  isActive = false,
  onClick,
  layout,
}: Props) {
  return (
    <motion.button
      layout={layout}
      type="button"
      className={`${styles.offerCard} ${styles[size]} ${
        isActive ? styles.active : ""
      }`}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onClick={onClick}
    >
      <div className={styles.imageWrapper}>
        <img
          src={typeof image === "string" ? image : image.src}
          alt="Oferta"
          loading="lazy"
        />
      </div>
    </motion.button>
  );
}
