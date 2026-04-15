"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../../components/molecules/Services/ProductGrid/ProductGrid";
import { PIERCING_CATEGORIES } from "../../utils/servicesData";
import { serviceService } from "../../services/serviceService";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import type { Service, Category, Product } from "../../types/models";
import type { ProductService, Category as UICategory } from "../../types/product";
import styles from "./Services.module.scss";
import GeneralHero from "../../components/molecules/ui/GeneralHero/GeneralHero";
import ServicesOptions from "../../components/molecules/Services/ServicesOptions/ServicesOptions";
import HeroImage from "../../assets/images/ServicesHero.png";
import Line from "../../components/molecules/ui/Line/Line";

// ── Adapters ──────────────────────────────────────────────────────────────────

function serviceToUI(s: Service): ProductService {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    price: s.price,
    originalPrice: s.originalPrice ?? undefined,
    currency: "$",
    features: s.features,
    images: s.images.map((img) => ({
      id: img.id,
      src: img.url,
      alt: img.alt,
      type: img.type as "main" | "detail" | "result",
    })),
    category: "piercing",
    categoryId: s.bodyPart,
    isOnSale: s.isOnSale,
    isNew: s.isNew,
  };
}

function productToUI(p: Product): ProductService {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    currency: "$",
    features: p.features,
    images: p.images.map((img) => ({
      id: img.id,
      src: img.url,
      alt: img.alt,
      type: img.type as "main" | "detail" | "result",
    })),
    category: "jewelry",
    categoryId: p.categoryId,
    isOnSale: p.isOnSale,
    isNew: p.isNew,
  };
}

/** Map a Firestore Category to the UI Category shape (no SVG icon — shows name text). */
function categoryToUI(c: Category): UICategory {
  return { id: c.id, name: c.name, icon: "" };
}

// ── Component ─────────────────────────────────────────────────────────────────

const Services: React.FC = () => {
  const [piercingServices, setPiercingServices] = useState<ProductService[]>([]);
  const [jewelryProducts, setJewelryProducts] = useState<ProductService[]>([]);
  const [jewelryCategories, setJewelryCategories] = useState<UICategory[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch piercing services
    serviceService
      .listActive()
      .then((data) => setPiercingServices(data.map(serviceToUI)))
      .catch(console.error);

    // Fetch jewelry products + their categories in parallel
    Promise.all([
      productService.listPublished(),
      categoryService.listActive(),
    ])
      .then(([productResult, cats]) => {
        setJewelryProducts(productResult.items.map(productToUI));
        setJewelryCategories(cats.map(categoryToUI));
      })
      .catch(console.error);
  }, []);

  return (
    <motion.div
      className={styles.services}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section>
        <GeneralHero
          src={HeroImage}
          isVideo={false}
          textTop="El piercings es tuyo, pero el momento"
          textTopBottom="lo construimos juntos"
          titleTop="SERVICIOS"
          titleEs="&"
          titleBottom="PRODUCTOS"
          textBottomTop="La joya más importante es cómo"
          textBottom="te sentís al mirarte"
        />
      </section>

      <Line />

      <ServicesOptions />

      <Line />

      <section id="servicios">
        <ProductGrid
          title="SERVICIOS DE PIERCING"
          products={piercingServices}
          categories={PIERCING_CATEGORIES}
        />
      </section>

      <Line />

      <section id="productos">
        <ProductGrid
          title="JOYERÍA"
          products={jewelryProducts}
          categories={jewelryCategories}
        />
      </section>
    </motion.div>
  );
};

export default Services;
