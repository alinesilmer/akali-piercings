import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { PROMO } from "../../data/home";
import { BOOK_URL, PROMO_URL } from "../../lib/whatsapp";
import { RingMark, Seigaiha } from "../deco";
import { ExternalLink, Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Magnetic } from "../motion";

/** Ember closing band used at the bottom of every page: promo chip, title and the WhatsApp button. */
export function ClosingCta({
  title,
  text = "Escribinos por WhatsApp, elegí tu joya y coordinamos día y hora. Lunes a sábado, de 9 a 21 h.",
  showPromo = true,
}: {
  title: ReactNode;
  text?: string;
  showPromo?: boolean;
}) {
  return (
    <section className="cta-band">
      <Seigaiha className="cta-band__waves" />

      {showPromo && (
        <ExternalLink className="cta-band__chip" href={PROMO_URL}>
          <RingMark size={18} />
          {PROMO.value} {PROMO.unit} en {PROMO.note.toLowerCase()} · {PROMO.month}
        </ExternalLink>
      )}

      <Heading size="hero">{title}</Heading>
      <p>{text}</p>

      <Magnetic>
        <Button variant="white" href={BOOK_URL}>
          Escribir por WhatsApp <ArrowUpRight size={16} strokeWidth={1.5} />
        </Button>
      </Magnetic>
    </section>
  );
}
