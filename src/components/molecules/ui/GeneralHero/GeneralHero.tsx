"use client";

import React from "react";
import styles from "./GeneralHero.module.scss";

interface GeneralHeroProps {
  src: string;
  isVideo?: boolean;
  alt?: string;
  textTop?: string;
  textTopBottom?: string;
  textBottomTop?: string;
  textBottom?: string;
  titleTop?: string;
  titleEs?: string;
  titleBottom?: string;
}

const GeneralHero: React.FC<GeneralHeroProps> = ({
  src,
  isVideo = true,
  alt = "Hero media",
  textTop,
  textTopBottom,
  textBottomTop,
  textBottom,
  titleTop,
  titleEs,
  titleBottom,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroMediaContainer}>
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroMedia}
            aria-label="Background video"
          >
            Tu navegador no soporta la reproducción de este video.
          </video>
        ) : (
          <img
            src={src}
            alt={alt}
            className={styles.heroMedia}
            aria-label="Background image"
          />
        )}
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroTextTop}>
          <p>{textTop}</p>
          <p>{textTopBottom}</p>
        </div>
        <div className={styles.heroTitleContainer}>
          <h2 className={styles.heroTitleTop}>{titleTop}</h2>
          <span className={styles.heroTitleEs}>{titleEs}</span>
          <h2 className={styles.heroTitleBottom}>{titleBottom}</h2>
        </div>
        <div className={styles.heroTextBottom}>
          <p>{textBottom}</p>
          <p>{textBottomTop}</p>
        </div>
      </div>
    </section>
  );
};

export default GeneralHero;
