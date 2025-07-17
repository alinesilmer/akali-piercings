"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import styles from "./Form.module.scss";

const WHATSAPP_NUMBER = "5493794532535";

const Form: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const motive = data.get("motive") as string;
    const msg = data.get("message") as string;

    /* Texto para WhatsApp */
    const text = [
      `👋 Hola Luz, soy ${name}.`,
      email ? `📧 ${email}` : "",
      phone ? `📞 ${phone}` : "",
      motive ? `📝 Motivo: ${motive}` : "",
      `📝 Consulta:\n${msg}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    console.log("WA URL →", waURL);

    window.open(waURL, "_blank", "noopener,noreferrer");

    e.currentTarget.reset();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <>
      {showPopup && (
        <div className={styles.popup}>¡Mensaje enviado con éxito!</div>
      )}

      <motion.section
        className={styles.wrapper}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>Formulario de contacto</h2>

        <form className={styles.form} onSubmit={sendMessage}>
          {/* ───── Fila 1 ───── */}
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" />
            </div>
          </div>

          {/* ───── Fila 2 ───── */}
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" name="phone" type="tel" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="motive">Motivo</label>
              <input id="motive" name="motive" type="text" />
            </div>
          </div>

          {/* ───── Mensaje ───── */}
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={6} required />
          </div>

          {/* ───── Botón ───── */}
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.sendButton}>
              Enviar
              <Send className={styles.sendIcon} />
            </button>
          </div>
        </form>
      </motion.section>
    </>
  );
};

export default Form;
