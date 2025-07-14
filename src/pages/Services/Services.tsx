"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../../components/molecules/Services/ProductGrid/ProductGrid";
import {
  PIERCING_SERVICES,
  JEWELRY_PRODUCTS,
  PIERCING_CATEGORIES,
  JEWELRY_CATEGORIES,
} from "../../utils/servicesData";
import styles from "./Services.module.scss";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";
import Line from "../../components/molecules/ui/Line/Line";

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      className={styles.services}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <GeneralHero
          src="https://i.pinimg.com/736x/b1/82/99/b18299cb75418b9a805935e843a09ea3.jpg"
          isVideo={false}
          textTop="El piercings es tuyo, pero el momento"
          textTopBottom="lo construimos juntos"
          titleTop="SERVICIOS"
          titleEs="&"
          titleBottom="PRODUCTOS"
          textBottomTop="La joya más importante es cómo"
          textBottom="te sentís al mirarte"
        />
      </section>

      <Line />

      <ProductGrid
        title="SERVICIOS DE PIERCING"
        products={PIERCING_SERVICES}
        categories={PIERCING_CATEGORIES}
      />

      <Line />

      <ProductGrid
        title="JOYERÍA Y ACCESORIOS"
        products={JEWELRY_PRODUCTS}
        categories={JEWELRY_CATEGORIES}
      />
    </motion.div>
  );
};

export default Services;
