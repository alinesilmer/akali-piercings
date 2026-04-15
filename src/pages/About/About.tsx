// src/pages/About.tsx
"use client";

import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./About.module.scss";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";
import Video from "../../assets/videos/EjemploVID1.mp4";
import Line from "../../components/molecules/ui/Line/Line";
import WhyUs from "../../components/molecules/AboutUs/WhyUs/WhyUs";
import Presentation from "../../components/molecules/AboutUs/Presentation/Presentation";
import GallerySection from "../../components/molecules/AboutUs/GallerySection/GallerySection";
import PreRecommendations from "../../components/molecules/AboutUs/PreRecomendations/PreRecomendations";
import PostTreatment from "../../components/molecules/AboutUs/PostTreatment/PostTreatment";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      className={styles.about}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <GeneralHero
          src={Video}
          isVideo={true}
          textTop="Cuidarte es parte del proceso"
          textTopBottom="estamos para acompañarte"
          titleTop="Quién"
          titleEs="Es"
          titleBottom="Akali"
          textBottomTop="Hecho con amor"
          textBottom="y paciencia"
        />
      </section>
      <Line />
      <WhyUs />
      <Line />
      <Presentation />
      <Line />
      <PreRecommendations />
      <Line />
      <PostTreatment />
      <Line />
      <GallerySection />
    </motion.div>
  );
};

export default About;
