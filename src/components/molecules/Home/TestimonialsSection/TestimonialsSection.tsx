"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../../../atoms/TestimonialCard/TestimonialCard";
import IconButton from "../../../atoms/IconButton/IconButton";
import { TESTIMONIALS_DATA } from "../../../../utils/constants";
import styles from "./TestimonialsSection.module.scss";

const VISIBLE_CARDS = 3;

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<
    null | (typeof TESTIMONIALS_DATA)[0]
  >(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - VISIBLE_CARDS : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev + VISIBLE_CARDS >= TESTIMONIALS_DATA.length ? 0 : prev + 1
    );
  };

  const visibleTestimonials = TESTIMONIALS_DATA.slice(
    currentIndex,
    currentIndex + VISIBLE_CARDS
  );

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* HEADER */}
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

        {/* CAROUSEL */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.carouselWrapper}>
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
                  {visibleTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className={styles.testimonialSlide}
                    >
                      <TestimonialCard
                        image={testimonial.image ?? ""}
                        onClick={() => setSelectedTestimonial(testimonial)}
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

        {/* MODAL */}
        <AnimatePresence>
          {selectedTestimonial && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
            >
              <motion.div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={selectedTestimonial.image}
                  className={styles.modalImage}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TestimonialsSection;
