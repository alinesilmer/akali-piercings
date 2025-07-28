declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process(): void;
      };
    };
  }
}

import { useEffect, useState, useRef } from "react";
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
  "https://www.instagram.com/p/DMdzPCsJUeM/",
  "https://www.instagram.com/p/DK4lEzAx5Aq/?img_index=1",
  "https://www.instagram.com/p/DK4kxYmxZA4/",
];
const allPostUrls = [
  ...recentPostUrls,
  "https://www.instagram.com/p/DDcKPvAJ7We/?img_index=1",
  "https://www.instagram.com/p/DEX-yCwJNmZ/?img_index=1",
  "https://www.instagram.com/p/DDcLkrGpGAN/?img_index=1",
  "https://www.instagram.com/p/CqF15PtOj0T/",
  "https://www.instagram.com/p/CPvfPh-nLkU/",
  "https://www.instagram.com/p/C6JSFq7LrN9/",
  "https://www.instagram.com/p/C8C5BQ8JGnl/",
  "https://www.instagram.com/p/DDPETgbJRTy/?img_index=1",
];

function InstagramEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!window.instgrm?.Embeds?.process) return;

    // trigger IG embed parsing
    window.instgrm.Embeds.process();

    // Poll until the iframe appears, then listen for its load
    const interval = setInterval(() => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", () => {
          setLoaded(true);
        });
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        visibility: loaded ? "visible" : "hidden",
        minHeight: "300px",
      }}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0 }}
      />
    </div>
  );
}

export default function GallerySection() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  let visibleCount = 3;
  if (width < 768) visibleCount = allPostUrls.length;
  else if (width < 1024) visibleCount = 2;
  const maxIndex = allPostUrls.length - visibleCount;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
  }, [index, width]);

  const visibleUrls =
    visibleCount === allPostUrls.length
      ? allPostUrls
      : allPostUrls.slice(index, index + visibleCount);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.leftPane}>
        <h2 className={styles.verticalTitle}>Galería</h2>
        <Frame src={HeroImg} size={400} height={800} />
      </div>

      <div className={styles.rightPane}>
        <h3 className={styles.recentWorks}>Trabajos Recientes</h3>
        <motion.div
          className={styles.cardRowScroll}
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
              <InstagramEmbed url={url} />
            </motion.div>
          ))}
        </motion.div>

        <h3 className={styles.works}>Trabajos</h3>
        <motion.div
          className={styles.cardRowScroll}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleUrls.map((url) => (
            <motion.div
              key={url}
              variants={itemVariants}
              className={styles.frame}
            >
              <InstagramEmbed url={url} />
            </motion.div>
          ))}
        </motion.div>

        {width >= 768 && visibleCount < allPostUrls.length && (
          <>
            <button
              className={`${styles.navButton} ${styles.prev}`}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${styles.next}`}
              onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={index === maxIndex}
              aria-label="Siguiente"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
}
