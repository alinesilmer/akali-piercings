"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AccordionItem from "../../../atoms/AccordionItem/AccordionItem";
import Button from "../../../atoms/Button/Button";
import { useAccordion } from "../../../../hooks/useAccordion";
import { FAQ_DATA } from "../../../../utils/constants";
import styles from "./FAQSection.module.scss";
import PiercingTool from "../../../../assets/images/PiercingTool.png";

const FAQSection: React.FC = () => {
  const navigate = useNavigate();
  const { toggleItem, isOpen } = useAccordion();

  const handleContact = () => {
    navigate("/contacto");
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.contactSide}>
        <div className={styles.contactContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.contactTitle}>
              ¿NO ENCONTRASTE TU
              <br />
              RESPUESTA?
            </h2>

            <Button variant="outline" size="medium" onClick={handleContact}>
              <Mail className={styles.buttonIcon} />
              Contáctanos
            </Button>
          </motion.div>
        </div>

        <div className={styles.toolsImage}>
          <img src={PiercingTool} alt="Herramientas de piercing" />
        </div>
      </div>

      <div className={styles.faqSide}>
        <div className={styles.faqContent}>
          <motion.div
            className={styles.faqHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.faqTitle}>FAQ</h2>
            <div className={styles.titleUnderline}></div>
          </motion.div>

          <motion.div
            className={styles.faqList}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={isOpen(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
