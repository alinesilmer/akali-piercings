"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../../../atoms/TestimonialCard/TestimonialCard";
import IconButton from "../../../atoms/IconButton/IconButton";
import { useCarousel } from "../../../../hooks/useCarousel";
import { TESTIMONIALS_DATA } from "../../../../utils/constants";
import styles from "./TestimonialsSection.module.scss";

const TestimonialsSection: React.FC = () => {
  const { currentIndex, goToNext, goToPrevious } = useCarousel(
    TESTIMONIALS_DATA.length
  );

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* encabezado animado */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>TESTIMONIOS</h2>
          <div className={styles.titleUnderline} />
          <p className={styles.subtitle}>
            Esto es lo que cuentan quienes ya confiaron en nosotros.
          </p>
        </motion.div>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.carouselWrapper}>
            {/* carrusel principal */}
            <IconButton
              icon={ChevronLeft}
              onClick={goToPrevious}
              variant="ghost"
              size="large"
              className={styles.navButton}
            />

            <div className={styles.carouselContainer}>
              <motion.div
                className={styles.carousel}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.testimonialsGrid}>
                  {TESTIMONIALS_DATA.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`${styles.testimonialSlide} ${
                        index === currentIndex ? styles.active : ""
                      }`}
                    >
                      <TestimonialCard
                        name={testimonial.name}
                        text={testimonial.text ?? ""}
                        image={testimonial.image ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <IconButton
              icon={ChevronRight}
              onClick={goToNext}
              variant="ghost"
              size="large"
              className={styles.navButton}
            />
          </div>
        </motion.div>
        {/* indicadores inferiores */}
        <div className={styles.indicators}>
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
