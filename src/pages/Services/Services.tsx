"use client";

import type React from "react";

import { motion } from "framer-motion";
import ProductGrid from "../../components/molecules/Services/ProductGrid/ProductGrid";
import {
  PIERCING_SERVICES,
  JEWELRY_PRODUCTS,
  PIERCING_CATEGORIES,
  JEWELRY_CATEGORIES,
} from "../../utils/servicesData";
import styles from "./Services.module.scss";

const Services: React.FC = () => {
  return (
    <motion.div
      className={styles.services}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img src="/images/services-image.png" alt="Servicios y Productos" />
        </div>

        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className={styles.subtitle}>
              El piercings es tuyo, pero el momento
            </p>
            <p className={styles.subtitle}>lo construimos juntos</p>

            <h1 className={styles.title}>
              SERVICIOS
              <br />
              <span className={styles.ampersand}>&</span>
              <br />
              PRODUCTOS
            </h1>

            <div className={styles.description}>
              <p>La joya más importante es cómo</p>
              <p>te sentís al mirarte</p>
            </div>
          </motion.div>
        </div>
      </div>

      <ProductGrid
        title="SERVICIOS DE PIERCING"
        products={PIERCING_SERVICES}
        categories={PIERCING_CATEGORIES}
      />

      <ProductGrid
        title="JOYERÍA Y ACCESORIOS"
        products={JEWELRY_PRODUCTS}
        categories={JEWELRY_CATEGORIES}
      />
    </motion.div>
  );
};

export default Services;
