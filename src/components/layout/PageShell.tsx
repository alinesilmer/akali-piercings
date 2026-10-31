import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { useEditorialPage } from "../../hooks/useEditorialPage";
import { Grain } from "../deco";

/** Wrapper for every public route: smooth scrolling, film grain and a soft fade-in. */
export function PageShell({ children }: { children: ReactNode }) {
  useEditorialPage();

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      <Grain />
      {children}
    </motion.main>
  );
}
