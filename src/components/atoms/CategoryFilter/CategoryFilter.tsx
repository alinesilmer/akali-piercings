"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Category } from "../../../types/product";
import styles from "./CategoryFilter.module.scss";
import allIcon from "../../../assets/images/allIcon.svg";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  Icon?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className={styles.categoryFilter}>
      {/* "All" button */}
      <motion.button
        className={`${styles.categoryButton} ${
          selectedCategory === null ? styles.active : ""
        }`}
        onClick={() => onCategorySelect(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={styles.iconContainer}>
          <img src={allIcon} alt="All categories" className={styles.icon} />
        </div>
      </motion.button>

      {/* Category buttons */}
      {categories.map((category, index) => (
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
            <img
              src={category.icon}
              alt={`${category.name} icon`}
              className={styles.icon}
            />
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
