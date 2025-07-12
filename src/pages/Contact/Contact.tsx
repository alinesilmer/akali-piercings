"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  return (
    <motion.div
      className={styles.contact}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img src="/images/contact-image.png" alt="Datos y Contacto" />
        </div>

        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className={styles.subtitle}>Siempre cerca, acompañamos</p>
            <p className={styles.subtitle}>cada paso</p>

            <h1 className={styles.title}>
              DATOS
              <br />
              <span className={styles.ampersand}>&</span>
              <br />
              CONTACTO
            </h1>

            <div className={styles.description}>
              <p>Aquí para vos,</p>
              <p>resolvemos todo juntos</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
