"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.scss";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";
import Line from "../../components/molecules/ui/Line/Line";
import HeroImage from "../../assets/images/ContactHero.png";
import DataContact from "../../components/molecules/Contact/DataContact/DataContact";
import FormContact from "../../components/molecules/Contact/FormContact/FormContact";

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      className={styles.contact}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <GeneralHero
          src={HeroImage}
          isVideo={false}
          textTop="Siempre cerca, acompañamos"
          textTopBottom="cada paso"
          titleTop="DATOS"
          titleEs="&"
          titleBottom="CONTACTO"
          textBottomTop="Aquí para vos,"
          textBottom="resolvemos todo juntos"
        />
      </section>

      <Line />

      <FormContact />

      <Line />
      <DataContact />
    </motion.div>
  );
};

export default Contact;
