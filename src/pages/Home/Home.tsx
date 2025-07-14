"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./Home.module.scss";
import FeaturesSection from "../../components/molecules/Home/FeaturesSection/FeaturesSection";
import FAQSection from "../../components/molecules/Home/FAQSection/FAQSection";
import TestimonialsSection from "../../components/molecules/Home/TestimonialsSection/TestimonialsSection";
import Hero from "../../components/molecules/Home/Hero/Hero";
import OffersSection from "../../components/molecules/Home/OffersSection/OffersSection";
import { offersData } from "../../data/OffersData";
import Line from "../../components/molecules/ui/Line/Line";

const Home: React.FC = () => {
  const PHONE_NUMBER = "543794532535"; //
  const DEFAULT_MESSAGE =
    "¡Hola! Quiero agendar un turno para un piercing. ¿Podrían ayudarme?";

  const handleAgendarTurno = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
      DEFAULT_MESSAGE
    )}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero onButtonClick={handleAgendarTurno} />
      <Line />
      <OffersSection offers={offersData} />
      <Line />
      <FeaturesSection />
      <Line />
      <TestimonialsSection />
      <Line />
      <FAQSection />
    </motion.div>
  );
};

export default Home;
