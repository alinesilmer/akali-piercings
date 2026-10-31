import { EASE, IN_VIEW } from "../../lib/motion";
import { MotionButton } from "./Button";

/** Row of tilted screenshots; each one opens in the lightbox. */
export function PolaroidStrip({ images, onOpen }: { images: string[]; onOpen: (src: string) => void }) {
  return (
    <div className="polaroids">
      {images.map((src, i) => (
        <MotionButton
          key={src}
          className="polaroid"
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
          onClick={() => onOpen(src)}
          aria-label={`Ver testimonio ${i + 1}`}
        >
          <img src={src} alt="" loading="lazy" decoding="async" />
        </MotionButton>
      ))}
    </div>
  );
}
