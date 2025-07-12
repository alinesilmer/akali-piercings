"use client";

import type React from "react";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  size = "medium",
  variant = "ghost",
}) => {
  return (
    <motion.button
      className={`${styles.iconButton} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Icon />
    </motion.button>
  );
};

export default IconButton;
