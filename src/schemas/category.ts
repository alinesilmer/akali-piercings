import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "El nombre no puede superar 60 caracteres"),
  slug: z
    .string()
    .trim()
    .regex(slugRegex, "El slug solo puede contener letras minúsculas, números y guiones")
    .max(80, "El slug no puede superar 80 caracteres")
    .optional(),
  description: z
    .string()
    .trim()
    .max(300, "La descripción no puede superar 300 caracteres")
    .nullable()
    .optional(),
  imageUrl: z
    .string()
    .url("La URL de imagen no es válida")
    .nullable()
    .optional(),
  imagePublicId: z.string().trim().nullable().optional(),
  order: z
    .number()
    .int("El orden debe ser un número entero")
    .min(0, "El orden no puede ser negativo")
    .optional(),
})

export const updateCategorySchema = createCategorySchema
  .extend({
    isActive: z.boolean().optional(),
  })
  .partial()

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
