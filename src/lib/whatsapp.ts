import { WHATSAPP_NUMBER } from "../data/site";

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const BOOK_URL = whatsappUrl("¡Hola, Luz! Quiero agendar un turno para un piercing, por favor.");
export const PROMO_URL = whatsappUrl("¡Hola, Luz! Quiero reservar un turno para la promoción que vi en tu web.");

/** Opening lines for product enquiries; the product title is appended. */
export const MESSAGES = {
  book: "¡Hola, Luz! Quiero agendar un turno para el servicio: ",
  change: "¡Hola, Luz! Quiero cambiar la pieza de: ",
  jewelry:
    "¡Hola, Luz! Estoy interesado/a en una pieza de joyería que vi en tu catálogo. ¿Podrías darme más información sobre su disponibilidad? Pieza: ",
};
