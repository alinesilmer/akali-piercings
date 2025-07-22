"use client";

import { useState } from "react";
import { Gem } from "lucide-react";
import OfferCard from "../../../atoms/OfferCard/OfferCard";
import styles from "./OffersSection.module.scss";
import type { OfferItem } from "../../../../data/OffersData";

const PHONE = "5493794086969";
const MESSAGE =
  "¡Hola, Luz! Quiero reservar un turno para la promoción que vi en tu web.";

interface OffersSectionProps {
  offers: ReadonlyArray<OfferItem>;
}

export default function OffersSection({ offers }: OffersSectionProps) {
  const total = offers.length;
  const [open, setOpen] = useState(false);
  if (!total) return null; // nada que mostrar

  const goWhatsApp = () =>
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`,
      "_blank"
    );

  return (
    <>
      {/* ────────── título ────────── */}
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>PROMOCIÓN DEL MES</h3>
      </div>

      <section className={styles.offersSection}>
        {/* subtítulos */}
        <div className={styles.head}>
          <span className={styles.subLeft}>Cuidarte nos inspira siempre</span>
          <span className={styles.subRight}>Historias que atraviesan piel</span>
        </div>

        {/* ────────── carrusel (1 ítem) ────────── */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselRow}>
            <OfferCard
              layout /* framer‑motion layout */
              image={offers[0].image}
              size="large"
              isActive
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {/* headline de la oferta actual */}
        <p className={styles.headline}>{offers[0].headline}</p>

        {/* pie de sección */}
        <footer className={styles.foot}>
          <span className={styles.bottomText}>
            Momento único, siempre con vos
          </span>
          <Gem className={styles.gemIcon} size={22} strokeWidth={1.25} />
        </footer>
      </section>

      {/* ────────── modal reserva ────────── */}
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
