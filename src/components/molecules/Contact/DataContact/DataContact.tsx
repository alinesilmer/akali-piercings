"use client";

import React from "react";
import { motion } from "framer-motion";
import DataCard from "../../../atoms/DataCard/DataCard";
import { Phone, Mail, Instagram, Linkedin, MapPin, Clock } from "lucide-react";
import styles from "./DataContact.module.scss";
import CardImage from "../../../../assets/images/Card1.png";
import CardImage2 from "../../../../assets/images/Card2.png";
import CardImage3 from "../../../../assets/images/Card3.png";

const DataContact: React.FC = () => (
  <motion.section
    className={styles.section}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    {/* ───── DATA CARDS ───── */}
    <div className={styles.cardsWrapper}>
      <DataCard
        background={CardImage}
        items={[
          { icon: Phone, text: "+3794086969" },
          { icon: Mail, text: "Mensaje Privado de Instagram" },
        ]}
      />

      <DataCard
        background={CardImage2}
        items={[
          { icon: Instagram, text: "@akalipiercing" },
          { icon: Linkedin, text: "Luz Fernandez" },
        ]}
      />

      <DataCard
        background={CardImage3}
        items={[
          { icon: MapPin, text: "Zona Centro" },
          {
            icon: Clock,
            text: "Lun a Sáb 9-21 h\nsólo con turno",
          },
        ]}
      />
    </div>

    {/* ───── MAP ───── */}
    <iframe
      title="Ubicación Akali Piercing"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.0495055700694!2d-58.83557779999999!3d-27.467718100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456ca3f8507ea5%3A0x85b532d9bb5a206b!2sJunin%2C%20W3400%20Corrientes!5e0!3m2!1ses!2sar!4v1752512591116!5m2!1ses!2sar"
      className={styles.map}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </motion.section>
);

export default DataContact;
