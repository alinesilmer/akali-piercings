import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { NAV_LINKS } from "../../data/site";
import { EASE } from "../../lib/motion";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="menu"
          data-lenis-prevent
          aria-label="Menú"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
            >
              <Link to={link.path} onClick={onClose}>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
