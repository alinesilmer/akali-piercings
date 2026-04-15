"use client";
import type React from "react";
import { motion } from "framer-motion";
import Modal from "../../../atoms/Modal/Modal";
import Button from "../../../atoms/Button/Button";
import type { ProductImage } from "../../../../types/product";
import styles from "./JewelryDisplayModal.module.scss";
import notFound from "../../../../assets/images/NOTFOUND.png";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_JEWELRY_CONSULT_TEXT,
} from "../../../../utils/constants";

interface JewelryDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ProductImage;
}

const JewelryDisplayModal: React.FC<JewelryDisplayModalProps> = ({
  isOpen,
  onClose,
  image,
}) => {
  const handleConsultAvailability = () => {
    const text = encodeURIComponent(WHATSAPP_JEWELRY_CONSULT_TEXT);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className={styles.jewelryDisplayModal}>
        <motion.div
          className={styles.mainImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image.src || notFound} alt={image.alt} />
        </motion.div>
        <div className={styles.infoSection}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className={styles.consultText}>
              Para consultar disponibilidad de esta pieza, por favor
              contáctanos:
            </p>
            <motion.div
              className={styles.actionSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="large"
                onClick={handleConsultAvailability}
              >
                CONSULTAR DISPONIBILIDAD
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};

export default JewelryDisplayModal;
