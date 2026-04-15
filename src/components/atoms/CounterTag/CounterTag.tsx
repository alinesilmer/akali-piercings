import { motion } from "framer-motion";
import styles from "./CounterTag.module.scss";

interface CounterTagProps {
  number: number;
  pill: string;
  text: string;
}

const CounterTag = ({ number, pill, text }: CounterTagProps) => (
  <motion.div
    className={styles.counterTag}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <span className={styles.number}>{number}+</span>

    <span className={styles.pill}>{pill}</span>

    <span className={styles.text}>{text}</span>
  </motion.div>
);

export default CounterTag;
