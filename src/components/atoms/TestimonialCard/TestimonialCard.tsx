"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./TestimonialCard.module.scss";

interface TestimonialCardProps {
  name: string;
  text?: string;
  image?: string;
  type: "text" | "image";
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  image,
  type,
}) => {
  return (
    <motion.div
      className={`${styles.testimonialCard} ${styles[type]}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {type === "text" ? (
        <div className={styles.textContent}>
          <p className={styles.quote}>"{text}"</p>
        </div>
      ) : (
        <div className={styles.imageContent}>
          <img
            src={image || "/placeholder.svg"}
            alt={`Testimonio de ${name}`}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.author}>
        <h4 className={styles.name}>{name}</h4>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
