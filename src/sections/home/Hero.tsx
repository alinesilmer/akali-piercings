import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Magnetic, Parallax } from "../../components/motion";
import { Button } from "../../components/ui/Button";
import { Frame } from "../../components/ui/Frame";
import { Heading } from "../../components/ui/Heading";
import { Eyebrow, Text } from "../../components/ui/Text";
import { HERO, TRUST } from "../../data/home";
import { fadeUp } from "../../lib/motion";
import { BOOK_URL } from "../../lib/whatsapp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={ref} className="hero">
      <motion.span className="hero__ghost" style={{ y: ghostY }} lang="ja" aria-hidden>
        輝
      </motion.span>

      <div>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </motion.div>

        <Heading
          as="h1"
          size="hero"
          lines={[HERO.lineOne, <em key="accent">{HERO.lineTwo}</em>]}
          delay={0.1}
          className="hero__title"
        />

        <motion.div {...fadeUp(0.5)}>
          <Text variant="lede">{HERO.lede}</Text>
        </motion.div>

        <motion.div className="hero__actions" {...fadeUp(0.62)}>
          <Magnetic>
            <Button variant="solid" to="/servicios">
              Ver catálogo <ArrowUpRight size={16} strokeWidth={1.5} />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="line" href={BOOK_URL}>
              <MessageCircle size={16} strokeWidth={1.5} /> Reservar turno
            </Button>
          </Magnetic>
        </motion.div>

        <motion.ul className="hero__trust" {...fadeUp(0.74)}>
          {TRUST.map((item) => (
            <li key={item.text}>
              <item.icon size={16} strokeWidth={1.4} /> {item.text}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="hero__stage">
        <motion.span className="hero__sun" style={{ y: sunY }} aria-hidden />
        <Frame shape="arch">
          <Parallax src={HERO.image} alt="Retrato con piercings y joyería" amount={5} priority className="fill" />
        </Frame>
        <div className="hero__spin" aria-hidden>
          <svg viewBox="0 0 132 132">
            <defs>
              <path id="akali-spin" d="M66 66m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0" />
            </defs>
            <text>
              <textPath href="#akali-spin">Reservá tu turno · Reservá tu turno · </textPath>
            </text>
          </svg>
          <span lang="ja">輝</span>
        </div>
      </div>
    </section>
  );
}
