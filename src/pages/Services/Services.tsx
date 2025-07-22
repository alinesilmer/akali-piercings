"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../../components/molecules/Services/ProductGrid/ProductGrid";
import {
  PIERCING_SERVICES,
  PIERCING_CATEGORIES,
} from "../../utils/servicesData";
import { JEWELRY_DISPLAY_IMAGES } from "../../utils/jewelryData";
import styles from "./Services.module.scss";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";
import ServicesOptions from "../../components/molecules/Services/ServicesOptions/ServicesOptions";
import HeroImage from "../../assets/images/ServicesHero.png";
import Line from "../../components/molecules/ui/Line/Line";
import JewelryDisplayGrid from "../../components/molecules/Services/JewelryDisplayGrid/JewelryDisplayGrid";

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
          src={HeroImage}
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

      <ServicesOptions />

      <Line />

      <section id="servicios">
        <ProductGrid
          title="SERVICIOS DE PIERCING"
          products={PIERCING_SERVICES}
          categories={PIERCING_CATEGORIES}
        />
      </section>

      <Line />

      <section id="productos">
        <JewelryDisplayGrid title="JOYERÍA" images={JEWELRY_DISPLAY_IMAGES} />
      </section>
    </motion.div>
  );
};

export default Services;
