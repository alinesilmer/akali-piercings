import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { TextArea } from "../../components/form/TextArea";
import { TextField } from "../../components/form/TextField";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { Text } from "../../components/ui/Text";
import { CONTACT_FIELDS } from "../../data/contact";
import { useTransientFlag } from "../../hooks/useTransientFlag";
import { contactToMessage, parseContact, type ContactResult } from "../../lib/validation/contactForm";
import { whatsappUrl } from "../../lib/whatsapp";

type Errors = Extract<ContactResult, { ok: false }>["errors"];

/** Validates with zod, then hands the message to WhatsApp. Nothing is stored or sent to a server. */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, flashSent] = useTransientFlag();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = parseContact(new FormData(form));

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    window.open(whatsappUrl(contactToMessage(result.data)), "_blank", "noopener,noreferrer");
    form.reset();
    flashSent();
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <Heading size="md">
        ¿Una <em>duda?</em>
      </Heading>

      <div className="form-grid">
        {CONTACT_FIELDS.map(({ name, label, ...input }) => (
          <TextField key={name} name={name} label={label} error={errors[name]} {...input} />
        ))}
        <TextArea wide name="message" label="Mensaje" rows={4} maxLength={1000} required error={errors.message} />
      </div>

      <div className="contact-form__foot">
        <Button type="submit" variant="solid">
          <Send size={16} strokeWidth={1.75} /> Enviar por WhatsApp
        </Button>
        <Text variant="label" as="span">
          <span role="status">{sent ? "Se abrió WhatsApp: enviá el mensaje desde ahí." : ""}</span>
        </Text>
      </div>
    </form>
  );
}
