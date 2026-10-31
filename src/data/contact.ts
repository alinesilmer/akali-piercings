import { Clock, Instagram, Linkedin, MapPin, MessageCircle, type LucideIcon } from "lucide-react";

import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_LABEL } from "./site";
import { whatsappUrl } from "../lib/whatsapp";
import type { IntroContent } from "../types/content";

export const CONTACT_INTRO: IntroContent = {
  eyebrow: "Contacto",
  title: ["Hablemos"],
  accent: "hoy.",
  kanji: "連絡",
  lede: "Escribinos por WhatsApp o dejá tu consulta acá: te respondemos en el día.",
};

export const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.0495055700694!2d-58.83557779999999!3d-27.467718100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456ca3f8507ea5%3A0x85b532d9bb5a206b!2sJunin%2C%20W3400%20Corrientes!5e0!3m2!1ses!2sar!4v1752512591116!5m2!1ses!2sar";

export interface Channel {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const CHANNELS: Channel[] = [
  { icon: MessageCircle, label: "WhatsApp", value: PHONE_LABEL, href: whatsappUrl() },
  { icon: Instagram, label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
  { icon: Linkedin, label: "LinkedIn", value: "Luz Fernandez" },
  { icon: MapPin, label: "Zona centro", value: "Corrientes Capital" },
  { icon: Clock, label: "Lun a sáb", value: "9 a 21 h · con turno" },
];

/** Single-line fields of the contact form. `name` must match the keys of `contactSchema`. */
export const CONTACT_FIELDS = [
  { name: "name", label: "Nombre", type: "text", autoComplete: "name", required: true, maxLength: 80 },
  { name: "phone", label: "Teléfono", type: "tel", autoComplete: "tel", required: true, maxLength: 30 },
  { name: "email", label: "Email (opcional)", type: "email", autoComplete: "email", maxLength: 120 },
  { name: "motive", label: "Motivo (opcional)", type: "text", maxLength: 120 },
] as const;
