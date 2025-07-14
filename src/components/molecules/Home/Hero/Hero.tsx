"use client";

import type React from "react";

import { motion } from "framer-motion";
import Button from "../../../atoms/Button/Button";
import styles from "./Hero.module.scss";
import HeroImage from "../../../../assets/images/HERO.png";

interface HeroProps {
  backgroundImage?: string;
  subtitle1?: string;
  subtitle2?: string;
  title1?: string;
  title2?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage = HeroImage,
  subtitle1 = "Bienvenidx a un espacio",
  subtitle2 = "para sentirte vos",
  title1 = "Akali",
  title2 = "Piercing",
  buttonText = "AGENDAR TURNO",
  onButtonClick,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImage}>
        <img src={backgroundImage} alt="Akali Piercing Hero" />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle1}
          </motion.p>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle2}
          </motion.p>

          <motion.div
            className={styles.titleContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className={styles.title}>
              <span className={styles.titleLine}>{title1}</span>
              <span className={styles.titleLine}>{title2}</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button variant="outline" size="large" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
