import type { BodyPart, CatalogFilter } from "../types/models";

export const WHATSAPP_NUMBER = "5493794086969";
export const PHONE_LABEL = "+54 9 379 408-6969";
export const INSTAGRAM_HANDLE = "@akalipiercing";
export const INSTAGRAM_URL = "https://www.instagram.com/akalipiercing/";
export const DEVELOPER_URL = "https://www.instagram.com/devhorizontech/";

export const NAV_LINKS = [
  { path: "/", label: "Inicio" },
  { path: "/nosotros", label: "Nosotros" },
  { path: "/servicios", label: "Servicios" },
  { path: "/contacto", label: "Contacto" },
];

export const KIND_LABELS = { piercing: "Piercing", jewelry: "Joyería" };

export const BODY_PART_LABELS: Record<BodyPart, string> = {
  nose: "Nariz",
  mouth: "Boca",
  body: "Cuerpo",
  eyebrow: "Ceja",
  ear: "Oreja",
};

export const BODY_PARTS: CatalogFilter[] = Object.entries(BODY_PART_LABELS).map(([id, name]) => ({ id, name }));
