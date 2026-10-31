import { z } from "zod";

// Every value that leaves the page (into a WhatsApp link) is validated and length-capped first.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Contanos tu nombre").max(80),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono válido")
    .max(30)
    .regex(/^[\d\s()+-]+$/, "Sólo números, espacios y + - ( )"),
  email: z.string().trim().max(120).pipe(z.email("Email inválido")).or(z.literal("")),
  motive: z.string().trim().max(120),
  message: z.string().trim().min(1, "Escribí tu consulta").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult = { ok: true; data: ContactInput } | { ok: false; errors: Partial<Record<keyof ContactInput, string>> };

export function parseContact(form: FormData): ContactResult {
  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (parsed.success) return { ok: true, data: parsed.data };

  const errors: Partial<Record<keyof ContactInput, string>> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    errors[key] ??= issue.message;
  }
  return { ok: false, errors };
}

export const contactToMessage = ({ name, email, phone, motive, message }: ContactInput) =>
  [
    `👋 Hola Luz, soy ${name}.`,
    email && `📧 ${email}`,
    `📞 ${phone}`,
    motive && `📝 Motivo: ${motive}`,
    `📝 Consulta:\n${message}`,
  ]
    .filter(Boolean)
    .join("\n\n");
