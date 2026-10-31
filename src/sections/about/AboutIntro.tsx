import { motion } from "framer-motion";

import video from "../../assets/videos/estudio.mp4";
import { PageIntro } from "../../components/layout/PageIntro";
import { Frame } from "../../components/ui/Frame";
import { ABOUT_INTRO } from "../../data/about";
import { EASE } from "../../lib/motion";

export function AboutIntro() {
  return (
    <PageIntro {...ABOUT_INTRO}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
      >
        <Frame shape="wide">
          <video src={video} autoPlay loop muted playsInline preload="metadata" aria-label="El estudio en acción" />
        </Frame>
      </motion.div>
    </PageIntro>
  );
}
