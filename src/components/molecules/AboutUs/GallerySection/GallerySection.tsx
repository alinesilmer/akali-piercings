declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process(): void;
      };
    };
  }
}

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Frame from "../../../atoms/Frame/Frame";
import styles from "./GallerySection.module.scss";
import HeroImg from "../../../../assets/images/heroAboutUs.jpg";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const recentPostUrls = [
  "https://www.instagram.com/p/DK4lEzAx5Aq/?img_index=1",
  "https://www.instagram.com/p/DK4kxYmxZA4/",
  "https://www.instagram.com/p/DKPpjFyRHx3/",
];

const allPostUrls = [
  "https://www.instagram.com/p/DK4lEzAx5Aq/?img_index=1",
  "https://www.instagram.com/p/DK4kxYmxZA4/",
  "https://www.instagram.com/p/DKPpjFyRHx3/",
  "https://www.instagram.com/p/DKPXf--t7Un/?img_index=1",
  "https://www.instagram.com/p/DKPWMaURYzV/",
];

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // re-run Instagram embed script after React renders
  useEffect(() => {
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.leftPane}>
        <Frame src={HeroImg} size={400} height={600} />
        <h2 className={styles.verticalTitle}>GALERIA</h2>
      </div>

      <div className={styles.rightPane}>
        <h3 className={styles.recentWorks}>Trabajos Recientes</h3>
        <motion.div
          className={styles.cardRow}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {recentPostUrls.map((url) => (
            <motion.div
              key={url}
              variants={itemVariants}
              className={styles.frame}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  margin: "1rem",
                  maxWidth: "100px",
                  maxHeight: "150px",
                }}
              ></blockquote>
            </motion.div>
          ))}
        </motion.div>

        <h3 className={styles.works}>Trabajos</h3>
        <div className={styles.cardRowScroll} ref={scrollRef}>
          {allPostUrls.map((url) => (
            <motion.div
              key={url}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ margin: "1rem", maxWidth: "320px" }}
              ></blockquote>
            </motion.div>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={() => scroll(-300)}
          aria-label="Prev"
        >
          ‹
        </button>
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={() => scroll(300)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}
