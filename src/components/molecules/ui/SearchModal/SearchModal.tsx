"use client";

import type React from "react";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SearchInput from "../../../atoms/SearchInput/SearchInput";
import SearchResultItem from "../../../atoms/SearchResultItem/SearchResultItem";
import IconButton from "../../../atoms/IconButton/IconButton";
import type { ProductService } from "../../../../types/product";
import styles from "./SearchModal.module.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  searchResults: ProductService[];
  onProductSelect: (product: ProductService) => void;
  hasQuery: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchResults,
  onProductSelect,
  hasQuery,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleProductClick = (product: ProductService) => {
    onProductSelect(product);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.searchModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.searchContainer}
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.searchHeader}>
              <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                onClear={onClearSearch}
                autoFocus
                placeholder="Buscar piercings, joyería y servicios..."
              />
              <IconButton icon={X} onClick={onClose} variant="ghost" />
            </div>

            <div className={styles.searchContent}>
              {!hasQuery && (
                <motion.div
                  className={styles.emptyState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p>Escribe para buscar productos y servicios</p>
                  <div className={styles.suggestions}>
                    <span>Sugerencias:</span>
                    <button onClick={() => onSearchChange("nostril")}>
                      Nostril
                    </button>
                    <button onClick={() => onSearchChange("anillo")}>
                      Anillos
                    </button>
                    <button onClick={() => onSearchChange("piercing")}>
                      Piercing
                    </button>
                  </div>
                </motion.div>
              )}

              {hasQuery && searchResults.length === 0 && (
                <motion.div
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <p>No se encontraron resultados para "{searchQuery}"</p>
                  <span>Intenta con otros términos de búsqueda</span>
                </motion.div>
              )}

              {hasQuery && searchResults.length > 0 && (
                <motion.div
                  className={styles.results}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={styles.resultsHeader}>
                    <span>
                      {searchResults.length} resultado
                      {searchResults.length !== 1 ? "s" : ""} para "
                      {searchQuery}"
                    </span>
                  </div>
                  <div className={styles.resultsList}>
                    {searchResults.map((product, index) => (
                      <SearchResultItem
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        searchQuery={searchQuery}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
