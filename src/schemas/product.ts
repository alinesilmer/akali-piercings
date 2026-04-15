import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const productImageSchema = z.object({
  url: z.string().url("La URL de imagen no es válida"),
  publicId: z.string().trim().nullable().optional(),
  alt: z
    .string()
    .trim()
    .min(1, "El texto alternativo es obligatorio")
    .max(120, "El texto alternativo no puede superar 120 caracteres"),
  type: z.enum(["main", "detail", "result"]),
})

export const createProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(100, "El título no puede superar 100 caracteres"),
  slug: z
    .string()
    .trim()
    .regex(slugRegex, "El slug solo puede contener letras minúsculas, números y guiones")
    .max(120, "El slug no puede superar 120 caracteres")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(2000, "La descripción no puede superar 2000 caracteres"),
  price: z
    .number()
    .positive("El precio debe ser mayor a 0")
    .max(10_000_000, "Precio fuera de rango"),
  originalPrice: z
    .number()
    .positive("El precio original debe ser mayor a 0")
    .nullable()
    .optional(),
  currency: z
    .string()
    .length(3, "La moneda debe ser un código ISO de 3 letras")
    .toUpperCase()
    .optional(),
  categoryId: z
    .string()
    .trim()
    .min(1, "La categoría es obligatoria"),
  images: z
    .array(productImageSchema)
    .max(10, "No se pueden cargar más de 10 imágenes")
    .optional(),
  features: z
    .array(z.string().trim().min(1).max(200))
    .max(20, "No se pueden agregar más de 20 características")
    .optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema
  .extend({
    status: z.enum(["published", "draft", "archived"]).optional(),
  })
  .partial()

export const productFlagsSchema = z.object({
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductFlagsInput = z.infer<typeof productFlagsSchema>

// Aliases used by form components
export type CreateProductFormData = CreateProductInput
export type UpdateProductFormData = UpdateProductInput
