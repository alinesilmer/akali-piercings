"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../../atoms/FeatureCard/FeatureCard";
import Button from "../../../atoms/Button/Button";
import { FEATURES_DATA } from "../../../../utils/constants";
import styles from "./FeaturesSection.module.scss";

const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate("/nosotros");
  };

  return (
    <section className={styles.sectionWrapper}>
      {/* TITLE */}
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>¿POR QUÉ ELEGIR AKALI?</h2>
        </motion.div>

        {/* CARDS */}
        <div className={styles.cardWrapper}>
          <div className={styles.featuresGrid}>
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={0.05 + index * 0.02}
              />
            ))}
          </div>
        </div>

        <motion.div
          className={styles.aboutSection}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="large" onClick={handleKnowMore}>
            CONOCER MÁS
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
