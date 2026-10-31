const ars = new Intl.NumberFormat("es-AR");

export const formatPrice = (price: number) => `$${ars.format(price)}`;

export const pad = (n: number) => String(n).padStart(2, "0");

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
