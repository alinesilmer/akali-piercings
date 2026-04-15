"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Heart, Target, MessageCircle } from "lucide-react";
import styles from "./FeatureCard.module.scss";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const iconMap = {
  heart: Heart,
  target: Target,
  "message-circle": MessageCircle,
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
}) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Heart;

  return (
    <motion.div
      className={styles.featureCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.iconContainer}>
        <IconComponent className={styles.icon} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
