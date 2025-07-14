"use client";

import type React from "react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import Logo from "../../../atoms/Logo/Logo";
import IconButton from "../../../atoms/IconButton/IconButton";
import SearchModal from "../SearchModal/SearchModal";
import ProductModal from "../../Services/ProductModal/ProductModal";
import { useSearch } from "../../../../hooks/useSearch";
import { useModal } from "../../../../hooks/useModal";
import {
  PIERCING_SERVICES,
  JEWELRY_PRODUCTS,
} from "../../../../utils/servicesData";
import type { ProductService } from "../../../../types/product";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductService | null>(
    null
  );
  const location = useLocation();

  // Combine all products for search
  const allProducts = [...PIERCING_SERVICES, ...JEWELRY_PRODUCTS];

  // Search functionality
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    openSearch,
    closeSearch,
    clearSearch,
    hasQuery,
  } = useSearch(allProducts);

  // Product modal
  const {
    isOpen: isProductModalOpen,
    openModal: openProductModal,
    closeModal: closeProductModal,
  } = useModal();

  const navItems = [
    { path: "/", label: "INICIO" },
    { path: "/nosotros", label: "NOSOTROS" },
    { path: "/servicios", label: "SERVICIOS" },
    { path: "/contacto", label: "CONTACTO" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProductSelect = (product: ProductService) => {
    setSelectedProduct(product);
    openProductModal();
  };

  const handleScheduleAppointment = () => {
    // Handle appointment scheduling logic here
    console.log("Schedule appointment for:", selectedProduct?.title);
  };

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.container}>
          <Link to="/" className={styles.logoContainer}>
            <Logo size="small" />
          </Link>

          <div className={styles.searchContainer}>
            <IconButton icon={Search} variant="ghost" onClick={openSearch} />
          </div>

          <div
            className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileMenuButton}>
            <IconButton
              icon={isMenuOpen ? X : Menu}
              onClick={toggleMenu}
              variant="ghost"
            />
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
        searchResults={searchResults}
        onProductSelect={handleProductSelect}
        hasQuery={hasQuery}
      />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          product={selectedProduct}
          onScheduleAppointment={handleScheduleAppointment}
        />
      )}
    </>
  );
};

export default Navbar;
