import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio")
    .email("Por favor, ingresá un correo electrónico válido")
    .toLowerCase(),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export type LoginFormData = z.infer<typeof loginSchema>
