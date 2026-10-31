import { z } from "zod";

import { BODY_PART_IDS } from "../types/models";
import { imagesSchema, slugSchema } from "./shared";

export const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(80, "El título no puede superar 80 caracteres"),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(1000, "La descripción no puede superar 1000 caracteres"),
  price: z.number().int("El precio debe ser un número entero").min(0, "El precio no puede ser negativo"),
  originalPrice: z
    .number()
    .int("El precio original debe ser un número entero")
    .min(0, "El precio original no puede ser negativo")
    .nullable()
    .optional(),
  bodyPart: z.enum(BODY_PART_IDS, { error: "Seleccioná una zona del cuerpo válida" }),
  images: imagesSchema,
  features: z.array(z.string().trim().min(1).max(100)).max(10, "Máximo 10 características").optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int("El orden debe ser un número entero").min(0, "El orden no puede ser negativo").optional(),
});

export type ServiceInput = z.input<typeof serviceSchema>;
