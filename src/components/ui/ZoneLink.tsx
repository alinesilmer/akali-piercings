import { motion } from "framer-motion";

import { EASE, IN_VIEW } from "../../lib/motion";
import { Button } from "./Button";
import { Frame } from "./Frame";

/** Round photo with the zone name beneath; an ember ring draws around it on hover. */
export function ZoneLink({
  name,
  image,
  to,
  index = 0,
}: {
  name: string;
  image: string;
  to: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 1.1, ease: EASE, delay: index * 0.08 }}
    >
      <Button to={to} className="zone">
        <Frame shape="round" className="zone__ring">
          <img src={image} alt={`Piercing en ${name.toLowerCase()}`} loading="lazy" decoding="async" />
        </Frame>
        <span className="zone__name">{name}</span>
      </Button>
    </motion.div>
  );
}
