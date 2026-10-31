import { motion } from "framer-motion";

import { useLastDefined } from "../../hooks/useLastDefined";
import { EASE } from "../../lib/motion";
import { Modal } from "./Modal";

export function Lightbox({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  const shown = useLastDefined(src);

  return (
    <Modal open={Boolean(src)} onClose={onClose} label={alt} variant="plain">
      {shown && (
        <motion.img
          src={shown}
          alt={alt}
          initial={{ scale: 0.94, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      )}
    </Modal>
  );
}
