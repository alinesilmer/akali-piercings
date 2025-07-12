"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./Home.module.scss";
import FeaturesSection from "../../components/molecules/FeaturesSection/FeaturesSection";
import FAQSection from "../../components/molecules/FAQSection/FAQSection";
import TestimonialsSection from "../../components/molecules/TestimonialsSection/TestimonialsSection";
import Hero from "../../components/molecules/Hero/Hero";

const Home: React.FC = () => {
  return (
    <motion.div
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero onButtonClick={() => console.log("Agendar turno clicked")} />

      <FeaturesSection />
      <FAQSection />
      <TestimonialsSection />
    </motion.div>
  );
};

export default Home;
