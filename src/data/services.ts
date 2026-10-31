import jewelryImage from "../assets/images/ProductsOption2.jpg";
import piercingImage from "../assets/images/ProductsOption.jpg";
import type { IntroContent } from "../types/content";

export const SERVICES_INTRO: IntroContent = {
  eyebrow: "Catálogo",
  title: ["Elegí"],
  accent: "lo tuyo.",
  kanji: "選",
  lede: "Piercings con colocación en el estudio y joyería lista para elegir. Se reserva por WhatsApp.",
};

/** The two catalogs, as jump tabs under the intro. `id` matches the section id on the page. */
export const CATALOG_DOORS = [
  { id: "servicios", title: "Piercings", image: piercingImage, list: "piercings" },
  { id: "productos", title: "Joyería", image: jewelryImage, list: "jewelry" },
] as const;
