import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const bodyParts = ["nose", "mouth", "body", "eyebrow", "ear"] as const

const serviceImageSchema = z.object({
  url: z.string().url("La URL de imagen no es válida"),
  publicId: z.string().trim().nullable().optional(),
  alt: z
    .string()
    .trim()
    .min(1, "El texto alternativo es requerido")
    .max(200, "El texto alternativo no puede superar 200 caracteres"),
  type: z.enum(["main", "detail", "result"]),
})

export const createServiceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(80, "El título no puede superar 80 caracteres"),
  slug: z
    .string()
    .trim()
    .regex(slugRegex, "El slug solo puede contener letras minúsculas, números y guiones")
    .max(80, "El slug no puede superar 80 caracteres")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(1000, "La descripción no puede superar 1000 caracteres"),
  price: z
    .number()
    .int("El precio debe ser un número entero")
    .min(0, "El precio no puede ser negativo"),
  originalPrice: z
    .number()
    .int("El precio original debe ser un número entero")
    .min(0, "El precio original no puede ser negativo")
    .nullable()
    .optional(),
  bodyPart: z.enum(bodyParts, {
    errorMap: () => ({ message: "Seleccioná una zona del cuerpo válida" }),
  }),
  images: z.array(serviceImageSchema).max(10, "Máximo 10 imágenes por servicio").optional(),
  features: z
    .array(z.string().trim().min(1).max(100))
    .max(10, "Máximo 10 características")
    .optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  order: z
    .number()
    .int("El orden debe ser un número entero")
    .min(0, "El orden no puede ser negativo")
    .optional(),
})

export const updateServiceSchema = createServiceSchema
  .extend({
    isActive: z.boolean().optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debés proveer al menos un campo para actualizar",
  })

export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type CreateServiceFormData = CreateServiceInput
export type UpdateServiceFormData = UpdateServiceInput
