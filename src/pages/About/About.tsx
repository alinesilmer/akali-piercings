// src/pages/About.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.scss";
import GallerySection from "../../components/molecules/AboutUs/GallerySection/GallerySection";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";

const galleryItems = [
  {
    title: "Labret",
    image:
      "https://images.unsplash.com/photo-1592194996305-3a0c3db6ee99?auto=format&fit=crop&w=300&q=60",
    date: "12/04/2025",
    isRecent: true,
  },
  {
    title: "Nostril",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=60",
    date: "06/03/2025",
    isRecent: true,
  },
  {
    title: "Navel",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=60",
    date: "22/01/2025",
    isRecent: true,
  },
  {
    title: "Labret",
    image:
      "https://images.unsplash.com/photo-1592194996305-3a0c3db6ee99?auto=format&fit=crop&w=300&q=60",
    date: "12/04/2025",
  },
  {
    title: "Nostril",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=60",
    date: "06/03/2025",
  },
  {
    title: "Navel",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=60",
    date: "22/01/2025",
  },
  {
    title: "Industrial",
    image:
      "https://images.unsplash.com/photo-1542353436-bb2a1c0dcd9b?auto=format&fit=crop&w=300&q=60",
    date: "02/01/2025",
  },
];

const About: React.FC = () => {
  return (
    <motion.div
      className={styles.about}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <GeneralHero />
      </section>

      <section className={styles.gallerySection}>
        <GallerySection items={galleryItems} />
      </section>
    </motion.div>
  );
};

export default About;
