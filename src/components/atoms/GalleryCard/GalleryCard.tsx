import { useState } from "react";
import { motion } from "framer-motion";
import Frame from "../Frame/Frame";
import styles from "./GalleryCard.module.scss";

interface GalleryCardProps {
  src: string;
  title: string;
  date: string;
}

const GalleryCard = ({ src, title, date }: GalleryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <motion.div
        className={styles.galleryCard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Frame src={src} size={200} height={300} onClick={openModal} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{date}</p>
      </motion.div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              aria-label="Close"
              onClick={closeModal}
            >
              ×
            </button>
            <img src={src} alt={title} />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryCard;
