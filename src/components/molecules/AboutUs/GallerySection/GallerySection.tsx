"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./GallerySection.module.scss";
import GalleryCard from "../../../atoms/GalleryCard/GalleryCard";
import heroAboutUs from "../../../../assets/images/heroAboutUs.jpg";

interface GalleryItem {
  title?: string;
  image?: string;
  date?: string;
  method?: string;
  isRecent?: boolean;
}

interface GallerySectionProps {
  /** Lista completa de trabajos. Usa `isRecent: true` para “Trabajos Recientes” */
  items: GalleryItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const recentItems = items.filter((i) => i.isRecent);
  const otherItems = items.filter((i) => !i.isRecent);

  const worksRowRef = useRef<HTMLDivElement>(null);

  /* Desplaza el contenedor horizontalmente */
  const scrollWorksRow = (dir: "left" | "right") => {
    if (!worksRowRef.current) return;
    const offset = dir === "left" ? -300 : 300;
    worksRowRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className={styles.gallerySection}>
      {/* Columna izquierda -------------------------------------------------- */}
      <div className={styles.heroWrapper}>
        <img src={heroAboutUs} alt="Galería" className={styles.heroImage} />
        <span className={styles.verticalLabel}>Galería</span>
      </div>

      {/* Columna derecha ---------------------------------------------------- */}
      <div className={styles.rightCol}>
        {/* Trabajos recientes */}
        <h2 className={styles.heading}>Trabajos Recientes</h2>
        <motion.div className={styles.recentGrid}>
          {recentItems.map((item, idx) => (
            <GalleryCard key={idx} {...item} />
          ))}
        </motion.div>

        {/* Trabajos */}
        <h2 className={styles.heading}>Trabajos</h2>
        <div className={styles.worksRowWrapper}>
          <button
            className={styles.arrowBtn}
            onClick={() => scrollWorksRow("left")}
          >
            <ChevronLeft size={24} />
          </button>

          <motion.div
            className={styles.worksRow}
            ref={worksRowRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} /* optional framer drag */
          >
            {otherItems.map((item, idx) => (
              <GalleryCard key={idx} {...item} />
            ))}
          </motion.div>

          <button
            className={styles.arrowBtn}
            onClick={() => scrollWorksRow("right")}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
