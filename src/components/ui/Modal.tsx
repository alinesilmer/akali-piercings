import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useOverlay } from "../../hooks/useOverlay";
import { EASE } from "../../lib/motion";
import { Button } from "./Button";

type Variant = "sheet" | "top" | "plain";

const SHEET_MOTION = {
  sheet: { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 24, opacity: 0 } },
  top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
};

/**
 * The one overlay. `sheet` is a centred card (product detail), `top` is a drawer that drops
 * from the top (search) and `plain` shows bare content (lightbox). Esc and backdrop click close it.
 * It renders into `document.body`: inside the sticky header, `backdrop-filter` would turn `position: fixed`
 * into "fixed to the header" and clip the overlay.
 */
export function Modal({
  open,
  onClose,
  label,
  variant = "sheet",
  closeButton = variant === "sheet",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: Variant;
  closeButton?: boolean;
  children: ReactNode;
}) {
  useOverlay(open, onClose);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`modal modal--${variant}`}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={onClose}
        >
          {variant === "plain" ? (
            children
          ) : (
            <motion.div
              className="modal__sheet"
              role="dialog"
              aria-modal="true"
              aria-label={label}
              {...SHEET_MOTION[variant]}
              transition={{ duration: 0.8, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              {closeButton && (
                <Button variant="icon" className="modal__close" onClick={onClose} aria-label="Cerrar">
                  <X size={20} strokeWidth={1.5} />
                </Button>
              )}
              {children}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
