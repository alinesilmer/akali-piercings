import React from "react";
import { motion } from "framer-motion";
import styles from "./Line.module.scss";

const Line: React.FC = () => {
  return <motion.div className={styles.divider} />;
};

export default Line;
