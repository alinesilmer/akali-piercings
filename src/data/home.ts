import {
  Banknote,
  CalendarCheck,
  Clock,
  Feather,
  HeartHandshake,
  MapPin,
  MessageCircle,
  MessageCircleHeart,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";

import couch from "../assets/images/ServicesHero.webp";
import procedure from "../assets/images/Luz2.webp";
import care from "../assets/images/WhyUs2.webp";
import sterile from "../assets/images/WhyUs.webp";
import aftercare from "../assets/images/PostCare.webp";

import ear from "../assets/images/clients/client13.webp";
import nose from "../assets/images/clients/client.webp";
import lip from "../assets/images/clients/client5.jpeg";
import brow from "../assets/images/clients/client2.jpeg";
import tongue from "../assets/images/clients/tongue.jpeg";
import navel from "../assets/images/clients/client7.webp";

import type { IconNote } from "../types/content";
import story1 from "../assets/images/testimonies/Testimonio1.jpeg";
import story2 from "../assets/images/testimonies/Testimonio2.jpeg";
import story3 from "../assets/images/testimonies/Testimonio3.jpeg";
import story4 from "../assets/images/testimonies/Testimonio4.jpeg";
import story5 from "../assets/images/testimonies/Testimonio5.jpeg";


export const HERO = {
  eyebrow: "Estudio de piercing · Corrientes",
  lineOne: "Tu piercing,",
  lineTwo: "a tu manera.",
  sub: "Seguro. Cálido. Tuyo.",
  lede: "Elegí tu joya, reservá tu turno y salí con un piercing cuidado y hermoso. Todo en un mismo lugar, con atención uno a uno.",
  quote: "Súper atenta y rápida",
  image: couch,
};

export const TRUST: { icon: LucideIcon; text: string }[] = [
  { icon: CalendarCheck, text: "Con turno" },
  { icon: MapPin, text: "Zona centro" },
  { icon: Clock, text: "Lun a sáb · 9 a 21 h" },
];

export const VALUES = [
  { id: "respeto", kanji: "敬意", word: "Respeto", line: "Tu cuerpo, tu decisión.", icon: HeartHandshake, image: care },
  {
    id: "experiencia",
    kanji: "経験",
    word: "Experiencia",
    line: "Manos expertas. Ambiente cálido.",
    icon: Sparkles,
    image: sterile,
  },
  {
    id: "presencia",
    kanji: "存在",
    word: "Presencia",
    line: "Antes, durante y después.",
    icon: MessageCircleHeart,
    image: aftercare,
  },
];

export const ZONES = [
  { id: "oreja", name: "Oreja", image: ear },
  { id: "nariz", name: "Nariz", image: nose },
  { id: "labial", name: "Labial", image: lip },
  { id: "ceja", name: "Ceja", image: brow },
  { id: "lengua", name: "Lengua", image: tongue },
  { id: "ombligo", name: "Ombligo", image: navel },
];

export const STUDIO = {
  eyebrow: "El estudio",
  text: "Cada colocación empieza con una charla: qué querés, qué te queda mejor y cómo cuidarlo. Después, manos expertas y un ambiente cálido.",
  images: { main: procedure, detail: care },
};

export const ESSENTIALS: IconNote[] = [
  { icon: MapPin, title: "Zona centro", note: "Corrientes Capital" },
  { icon: CalendarCheck, title: "Con turno", note: "O por llegada" },
  { icon: Banknote, title: "Efectivo o transferencia", note: "Sin tarjetas" },
  { icon: Store, title: "Sólo en estudio", note: "Higiene total" },
  { icon: Feather, title: "Sin anestesia", note: "Rápido y cuidado" },
  { icon: Clock, title: "Lunes a sábado", note: "9 a 21 h" },
];

export const STORIES = [story1, story2, story3, story4, story5];

export const PROMO = {
  value: "15%",
  unit: "OFF",
  note: "Efectivo",
  image: ear,
  month: new Date().toLocaleDateString("es-AR", { month: "long" }),
};

export const PROMO_STEPS: IconNote[] = [
  { icon: MessageCircle, title: "Escribí", note: "Por WhatsApp" },
  { icon: CalendarCheck, title: "Elegí", note: "Tu turno" },
  { icon: Banknote, title: "Ahorrá", note: `${PROMO.value} en efectivo` },
];
