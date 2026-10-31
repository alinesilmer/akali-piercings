import { z } from "zod";

import { IMAGE_TYPES, type StoredImage } from "../types/models";

export const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug solo puede contener letras minúsculas, números y guiones")
  .max(120, "El slug no puede superar 120 caracteres")
  .optional();

const imageSchema = z.object({
  url: z
    .string()
    .trim()
    .url("La URL de imagen no es válida")
    .startsWith("https://", "La URL de imagen debe empezar con https://"),
  publicId: z.string().trim().nullable().optional(),
  alt: z
    .string()
    .trim()
    .min(1, "El texto alternativo es obligatorio")
    .max(200, "El texto alternativo no puede superar 200 caracteres"),
  type: z.enum(IMAGE_TYPES),
});

export const imagesSchema = z.array(imageSchema).max(10, "No se pueden cargar más de 10 imágenes").optional();

export const toStoredImages = (images: z.output<typeof imagesSchema> = []): StoredImage[] =>
  images.map((image) => ({
    id: crypto.randomUUID(),
    url: image.url,
    publicId: image.publicId ?? null,
    alt: image.alt,
    type: image.type,
  }));

export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
  }
  return errors;
}
