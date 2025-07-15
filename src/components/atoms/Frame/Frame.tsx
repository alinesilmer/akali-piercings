import styles from "./Frame.module.scss";
import { motion } from "framer-motion";

interface FrameProps {
  src: string;
  size: number;
  height?: number;
  onClick?: () => void;
}

const Frame = ({ src, size, height = size, onClick }: FrameProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <div className={styles.frame} style={{ width: size, height }}>
      <img src={src} alt="Frame" />
    </div>
  </motion.div>
);

export default Frame;
