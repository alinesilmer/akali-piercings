"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Gem } from "lucide-react";
import OfferCard from "../../../atoms/OfferCard/OfferCard";
import { useCarousel } from "../../../../hooks/useCarousel";
import styles from "./OffersSection.module.scss";
import type { OfferItem } from "../../../../data/OffersData";

const PHONE = "5493794532535";
const MESSAGE =
  "¡Hola, Luz! Quiero reservar un turno para la promoción que vi en tu web.";

interface OffersSectionProps {
  offers: ReadonlyArray<OfferItem>;
}

export default function OffersSection({ offers }: OffersSectionProps) {
  const total = offers.length;
  const { currentIndex, goToNext, goToPrevious } = useCarousel(total, false);
  const [open, setOpen] = useState(false);
  if (total < 5) return null;

  const idx = (i: number) => (i + total) % total;
  const visibleOffsets = [-2, -1, 0, 1, 2] as const;
  const visible = visibleOffsets.map((o) => idx(currentIndex + o));
  const sizes = ["small", "medium", "large", "medium", "small"] as const;

  const goWhatsApp = () =>
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`,
      "_blank"
    );

  return (
    <>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>PROMOCIONES</h3>
      </div>

      <section className={styles.offersSection}>
        <div className={styles.head}>
          <span className={styles.subLeft}>Cuidarte nos inspira siempre</span>
          <span className={styles.subRight}>Historias que atraviesan piel</span>
        </div>

        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.arrowBtn} ${styles.left}`}
            onClick={goToPrevious}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>

          <div className={styles.carouselRow}>
            {visible.map((v, i) => (
              <OfferCard
                key={v}
                layout
                image={offers[v].image}
                size={sizes[i]}
                isActive={i === 2}
                onClick={() => setOpen(true)}
              />
            ))}
          </div>

          <button
            className={`${styles.arrowBtn} ${styles.right}`}
            onClick={goToNext}
            aria-label="Siguiente"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
        </div>

        <p className={styles.headline}>{offers[currentIndex].headline}</p>

        <footer className={styles.foot}>
          <span className={styles.bottomText}>
            Momento único, siempre con vos
          </span>
          <Gem className={styles.gemIcon} size={22} strokeWidth={1.25} />
        </footer>
      </section>

      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalText}>
              ¿Desea reservar un turno para esta promoción?
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalBtnPrimary} onClick={goWhatsApp}>
                Reservar
              </button>
              <button
                className={styles.modalBtnSecondary}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
