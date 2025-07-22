"use client";

import type React from "react";
import { motion } from "framer-motion";
import Modal from "../../../atoms/Modal/Modal";
import ImageThumbnail from "../../../atoms/ImageThumbnail/ImageThumbnail";
import PriceTag from "../../../atoms/PriceTag/PriceTag";
import Button from "../../../atoms/Button/Button";
import Logo from "../../../atoms/Logo/Logo";
import { useImageGallery } from "../../../../hooks/useImageGallery";
import type { ProductService } from "../../../../types/product";
import styles from "./ProductModal.module.scss";
import notFound from "../../../../assets/images/NOTFOUND.png";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductService;
}

const WHATSAPP_NUMBER = "5493794086969";
const WHATSAPP_TEXT = "¡Hola, Luz! Quiero agendar un turno para el servicio: ";
const WHATSAPP_TEXT_CHANGE = "¡Hola, Luz! Quiero cambiar la pieza de: ";

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const images = product.images.map((img) => img.src);
  const { selectedIndex, selectedImage, selectImage } = useImageGallery(images);

  const handleSchedule = () => {
    const text = encodeURIComponent(WHATSAPP_TEXT + product.title);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
    onClose();
  };

  const handleScheduleChange = () => {
    const text = encodeURIComponent(WHATSAPP_TEXT_CHANGE + product.title);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="fullscreen">
      <div className={styles.productModal}>
        {/* Image Gallery Section */}
        <div className={styles.gallerySection}>
          <div className={styles.thumbnailList}>
            {product.images.map((image, index) => (
              <ImageThumbnail
                key={image.id}
                src={image.src || notFound}
                alt={image.alt}
                isSelected={index === selectedIndex}
                onClick={() => selectImage(index)}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className={styles.mainImage}
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={selectedImage || "/placeholder.svg"}
              alt={product.title}
            />
          </motion.div>
        </div>

        {/* Product Info Section */}
        <div className={styles.infoSection}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="small" />
          </motion.div>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.serviceSection}>
              <div className={styles.priceServiceWrapper}>
                <div className={styles.serviceDetailsWrapper}>
                  <h2 className={styles.serviceTitle}>SERVICIO</h2>
                  <ul className={styles.featureList}>
                    {product.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className={styles.feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className={styles.priceSection}>
                  <PriceTag
                    price={product.price}
                    currency={product.currency}
                    size="large"
                  />
                </div>
              </div>
            </div>

            <motion.div
              className={styles.actionSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button variant="outline" size="large" onClick={handleSchedule}>
                AGENDAR TURNO
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={handleScheduleChange}
              >
                CAMBIO DE PIEZA
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
