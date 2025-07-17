"use client";

import type React from "react";
import { motion } from "framer-motion";
import styles from "./TestimonialCard.module.scss";

interface TestimonialCardProps {
  name: string;
  text: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  image,
}) => {
  return (
    <motion.div
      className={styles.cardWrapper}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.cardInner}>
        {/* FRONT */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <img
            src={image || "/placeholder.svg"}
            alt={`Foto de ${name}`}
            className={styles.image}
          />
          <div className={styles.author}>
            <h4 className={styles.name}>{name}</h4>
          </div>
        </div>

        {/* BACK */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <p className={styles.quote}>“{text}”</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
