"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <motion.div
      className={styles.about}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img src="/images/about-image.png" alt="Quién es Akali" />
        </div>

        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className={styles.subtitle}>Cuidarte es parte del proceso</p>
            <p className={styles.subtitle}>estamos para acompañarte</p>

            <h1 className={styles.title}>
              QUIÉN
              <br />
              <span className={styles.italic}>es</span>
              <br />
              AKALI
            </h1>

            <div className={styles.description}>
              <p>Hecho con amor</p>
              <p>y paciencia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
