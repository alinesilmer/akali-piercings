import { AlertCircle, Ban, Droplet, Hand, HeartPulse, ShieldCheck, SprayCan, Utensils } from "lucide-react";

import firstTime from "../assets/images/Luz2.webp";
import postCare from "../assets/images/PostCare.webp";
import preCare from "../assets/images/PreCare.webp";
import noRush from "../assets/images/WhyUs.webp";
import detail from "../assets/images/WhyUs3.webp";
import type { IconNote, IntroContent } from "../types/content";

export const ABOUT_INTRO: IntroContent = {
  eyebrow: "Nosotros",
  title: ["Hecho"],
  accent: "con amor.",
  kanji: "私",
  lede: "Un estudio pequeño, cálido y cuidado, donde cada piercing se hace con tiempo y respeto.",
};

export const LUZ = {
  eyebrow: "Quién es Akali",
  text: "Bodypiercing desde el respeto por cada cuerpo. Amor, precisión y escucha.",
  stats: [
    { value: 5, suffix: "+", label: "Años de experiencia" },
    { value: 100, suffix: "+", label: "Clientes satisfechos" },
  ],
};

export const PROMISES = [
  { word: "Primera vez", line: "Paso a paso, con vos.", image: firstTime },
  { word: "Sin apuro", line: "Materiales seguros. Tu tiempo.", image: noRush },
  { word: "Detalle", line: "Tu esencia, en cada pieza.", image: detail },
];

export interface CareBlock {
  id: string;
  kanji: string;
  title: string;
  image: string;
  alt: string;
  tips: IconNote[];
}

export const CARE: CareBlock[] = [
  {
    id: "antes",
    kanji: "前",
    title: "Antes",
    image: preCare,
    alt: "Consulta previa al piercing",
    tips: [
      { icon: Droplet, title: "Descansá", note: "Dormí bien e hidratate" },
      { icon: Ban, title: "Evitá", note: "Alcohol, cafeína y anticoagulantes · 24 h antes" },
      { icon: Utensils, title: "Comé liviano", note: "Azúcar en sangre estable" },
      { icon: HeartPulse, title: "Contanos", note: "Alergias, condiciones y medicación" },
    ],
  },
  {
    id: "despues",
    kanji: "後",
    title: "Después",
    image: postCare,
    alt: "Limpieza de un piercing",
    tips: [
      { icon: SprayCan, title: "Limpiá", note: "Dos veces al día · solución salina estéril" },
      { icon: Hand, title: "No toques", note: "Nunca con las manos sin lavar" },
      { icon: ShieldCheck, title: "Protegé", note: "Sin golpes ni piletas · no retires la joya" },
      { icon: AlertCircle, title: "Observá", note: "¿Signos de infección? Consultá a tu piercer o médico" },
    ],
  },
];

/** Instagram posts embedded in the work feed. Only instagram.com permalinks are accepted. */
export const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DMdzPCsJUeM/",
  "https://www.instagram.com/p/DK4lEzAx5Aq/?img_index=1",
  "https://www.instagram.com/p/DK4kxYmxZA4/",
  "https://www.instagram.com/p/DDcKPvAJ7We/?img_index=1",
  "https://www.instagram.com/p/DEX-yCwJNmZ/?img_index=1",
  "https://www.instagram.com/p/DDcLkrGpGAN/?img_index=1",
  "https://www.instagram.com/p/CqF15PtOj0T/",
  "https://www.instagram.com/p/CPvfPh-nLkU/",
  "https://www.instagram.com/p/C6JSFq7LrN9/",
  "https://www.instagram.com/p/C8C5BQ8JGnl/",
  "https://www.instagram.com/p/DDPETgbJRTy/?img_index=1",
];
