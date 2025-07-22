"use client";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import JewelryDisplayCard from "../../../atoms/JewelryDisplayCard/JewelryDisplayCard";
import JewelryDisplayModal from "../JewelryDisplayModal/JewelryDisplayModal";
import { useModal } from "../../../../hooks/useModal";
import type { ProductImage } from "../../../../types/product";
import styles from "./JewelryDisplayGrid.module.scss";

interface JewelryDisplayGridProps {
  title: string;
  images: ProductImage[];
}

const JewelryDisplayGrid: React.FC<JewelryDisplayGridProps> = ({
  title,
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleImageClick = (image: ProductImage) => {
    setSelectedImage(image);
    openModal();
  };

  return (
    <section className={styles.jewelryDisplayGrid}>
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
        <motion.div
          className={styles.grid}
          layout
          transition={{ duration: 0.3 }}
        >
          {images.map((image, index) => (
            <JewelryDisplayCard
              key={image.id}
              image={image}
              onClick={() => handleImageClick(image)}
              index={index}
            />
          ))}
        </motion.div>
        {images.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>No se encontraron imágenes de joyería.</p>
          </motion.div>
        )}
      </div>
      {selectedImage && (
        <JewelryDisplayModal
          isOpen={isOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </section>
  );
};

export default JewelryDisplayGrid;
