import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { fadeUp } from "../../lib/motion";
import type { IntroContent } from "../../types/content";
import { Heading } from "../ui/Heading";
import { Eyebrow, Text } from "../ui/Text";

/** Opening block of an inner page: ghost kanji, eyebrow, display title, lede and optional media. */
export function PageIntro({
  eyebrow,
  title,
  accent,
  kanji,
  lede,
  children,
}: IntroContent & { children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={ref} className="page-intro">
      <motion.span className="page-intro__ghost" style={{ y: ghostY }} lang="ja" aria-hidden>
        {kanji}
      </motion.span>

      <motion.div {...fadeUp(0)}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <Heading as="h1" size="xl" lines={[...title, <em key="accent">{accent}</em>]} delay={0.1} className="page-intro__title" />
      {lede && (
        <motion.div {...fadeUp(0.5)}>
          <Text variant="lede">{lede}</Text>
        </motion.div>
      )}
      {children && <div className="page-intro__media">{children}</div>}
    </section>
  );
}
