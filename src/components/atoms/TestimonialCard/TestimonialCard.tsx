"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./TestimonialCard.module.scss";

interface TestimonialCardProps {
  image: string;
  onClick?: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className={styles.cardWrapper}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
        onClick={onClick}
      >
        <div className={styles.cardContent}>
          <img
            src={image || "/placeholder.svg"}
            alt={`Foto de ${name}`}
            className={styles.image}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={image}
                alt={`Foto de ${name}`}
                className={styles.modalImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialCard;
