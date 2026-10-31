import { z } from "zod";

import { PRODUCT_STATUSES } from "../types/models";
import { imagesSchema, slugSchema } from "./shared";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(100, "El título no puede superar 100 caracteres"),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(2000, "La descripción no puede superar 2000 caracteres"),
  price: z.number().positive("El precio debe ser mayor a 0").max(10_000_000, "Precio fuera de rango"),
  originalPrice: z.number().positive("El precio original debe ser mayor a 0").nullable().optional(),
  categoryId: z.string().trim().min(1, "La categoría es obligatoria"),
  images: imagesSchema,
  features: z
    .array(z.string().trim().min(1).max(200))
    .max(20, "No se pueden agregar más de 20 características")
    .optional(),
  status: z.enum(PRODUCT_STATUSES).optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
});

export type ProductInput = z.input<typeof productSchema>;
