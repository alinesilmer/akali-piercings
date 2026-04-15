"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./FormContact.module.scss";
import Form from "../../../atoms/Form/Form";
import { Heart } from "lucide-react";

const FormContact: React.FC = () => (
  <motion.section
    className={styles.wrapper}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>¿Tenés una{"\n"}Duda?</h2>
        <p className={styles.description}>
          ¡No te preocupes! Escribila en el{"\n"}formulario de contacto y te
          {"\n"}asesoraremos lo más pronto posible.
          <Heart />
        </p>
      </div>
      <Form />
    </div>
  </motion.section>
);

export default FormContact;
