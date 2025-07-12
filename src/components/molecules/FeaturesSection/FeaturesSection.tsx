"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../atoms/FeatureCard/FeatureCard";
import Button from "../../atoms/Button/Button";
import { FEATURES_DATA } from "../../../utils/constants";
import styles from "./FeaturesSection.module.scss";

const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate("/nosotros");
  };

  return (
    <section className={styles.featuresSection}>
      <div className={styles.heroImage}>
        <img src="/images/features-hero.png" alt="Piercing labial" />
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.title}>OFRECEMOS SÓLO LO MEJOR</h2>
          </motion.div>

          <div className={styles.featuresGrid}>
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>

          <motion.div
            className={styles.aboutSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.aboutTitle}>
              CONOCÉ
              <br />
              AKALI
            </h3>
            <Button variant="outline" onClick={handleKnowMore}>
              CONOCER
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
