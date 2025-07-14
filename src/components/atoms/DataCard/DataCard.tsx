"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./DataCard.module.scss";

interface Item {
  icon: React.ElementType;
  text: string;
}

export interface DataCardProps {
  background: string;
  items: [Item, Item];
}

const DataCard: React.FC<DataCardProps> = ({ background, items }) => (
  <motion.div
    className={styles.card}
    style={{ backgroundImage: `url(${background})` }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {/* Capa oscura */}
    <span className={styles.overlay} />

    {/* Contenido */}
    <div className={styles.content}>
      {items.map(({ icon: Icon, text }, i) => (
        <React.Fragment key={i}>
          <Icon className={styles.icon} />
          <p className={styles.text}>{text}</p>
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

export default DataCard;
