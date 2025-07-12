"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  Circle,
  Heart,
  Ear,
  Eye,
  Zap,
  Link,
  Sparkles,
  Gift,
  Moon,
} from "lucide-react";
import type { Category } from "../../../types/product";
import styles from "./CategoryFilter.module.scss";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const iconMap = {
  nose: Circle,
  lips: Heart,
  ear: Ear,
  eyebrow: Eye,
  tongue: Zap,
  circle: Circle,
  necklace: Link,
  rings: Sparkles,
  earrings: Gift,
  horseshoe: Moon,
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className={styles.categoryFilter}>
      <motion.button
        className={`${styles.categoryButton} ${
          selectedCategory === null ? styles.active : ""
        }`}
        onClick={() => onCategorySelect(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={styles.iconContainer}>
          <Sparkles className={styles.icon} />
        </div>
      </motion.button>

      {categories.map((category, index) => {
        const IconComponent =
          iconMap[category.icon as keyof typeof iconMap] || Circle;

        return (
          <motion.button
            key={category.id}
            className={`${styles.categoryButton} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() => onCategorySelect(category.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.iconContainer}>
              <IconComponent className={styles.icon} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
