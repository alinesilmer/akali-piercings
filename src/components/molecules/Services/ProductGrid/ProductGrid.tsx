"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../../atoms/ProductCard/ProductCard";
import CategoryFilter from "../../../atoms/CategoryFilter/CategoryFilter";
import ProductModal from "../ProductModal/ProductModal";
import { useModal } from "../../../../hooks/useModal";
import type { ProductService, Category } from "../../../../types/product";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  title: string;
  products: ProductService[];
  categories: Category[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductService | null>(
    null
  );
  const { isOpen, openModal, closeModal } = useModal();

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  const handleProductClick = (product: ProductService) => {
    setSelectedProduct(product);
    openModal();
  };

  return (
    <section className={styles.productGrid}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>{title}</h2>
        </motion.div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <motion.div
          className={styles.grid}
          layout
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
              index={index}
            />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>No se encontraron productos en esta categoría.</p>
          </motion.div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={isOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </section>
  );
};

export default ProductGrid;
