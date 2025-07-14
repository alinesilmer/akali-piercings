"use client";

import type React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram } from "lucide-react";
import Logo from "../../../atoms/Logo/Logo";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contacto", label: "Contacto" },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "Calle 13, Corrientes Capital, Argentina",
    },
    {
      icon: Clock,
      text: "Lunes a Sábado, de 9 a.m. a 21 p.m.",
    },
    {
      icon: Phone,
      text: "+3794 111111",
    },
  ];

  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.divider}></div>
      <motion.div
        className={styles.topSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className={styles.tagline}>Calidad y Calidez</p>
        <p className={styles.tagline}>en un único lugar</p>
      </motion.div>

      <div className={styles.divider}></div>

      {/* Main Footer Content */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Links Section */}
          <motion.div
            className={styles.linksSection}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>LINKS</h3>
            <nav className={styles.navLinks}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={link.path} className={styles.navLink}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Logo Section */}
          <motion.div
            className={styles.logoSection}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Logo size="large" />
            <h2 className={styles.brandName}>
              AKALI
              <br />
              PIERCING
            </h2>
          </motion.div>

          {/* Information Section */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>INFORMACIÓN</h3>
            <div className={styles.contactInfo}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className={styles.contactItem}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <info.icon className={styles.contactIcon} />
                  <span className={styles.contactText}>{info.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Social Section */}
      <motion.div
        className={styles.socialSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className={styles.socialTitle}>SEGUINOS EN INSTAGRAM</h3>
        <motion.a
          href="https://www.instagram.com/akalipiercing/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Instagram className={styles.socialIcon} />
        </motion.a>
      </motion.div>
    </footer>
  );
};

export default Footer;
