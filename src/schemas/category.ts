import { z } from "zod";

import { slugSchema } from "./shared";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "El nombre no puede superar 60 caracteres"),
  slug: slugSchema,
  description: z.string().trim().max(300, "La descripción no puede superar 300 caracteres").nullable().optional(),
  order: z.number().int("El orden debe ser un número entero").min(0, "El orden no puede ser negativo").optional(),
  isActive: z.boolean().optional(),
});

export type CategoryInput = z.input<typeof categorySchema>;
