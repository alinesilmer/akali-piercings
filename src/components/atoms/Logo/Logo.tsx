"use client";

import type React from "react";

import { motion } from "framer-motion";
import styles from "./Logo.module.scss";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  return (
    <motion.div
      className={`${styles.logo} ${styles[size]}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.logoIcon}>
        <a href="/">
          <img src="/LogoAkali.png" alt="Akali Piercing Logo" />
        </a>
      </div>
    </motion.div>
  );
};

export default Logo;
