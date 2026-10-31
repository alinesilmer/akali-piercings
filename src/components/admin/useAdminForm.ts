import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ZodType } from "zod";

import { slugify } from "../../lib/format";
import { fieldErrors } from "../../schemas/shared";
import { useAuth } from "./auth";

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface Options<F, I> {
  initial: F;
  slugFrom: keyof F;
  backTo: string;
  schema: ZodType;
  load: (id: string) => Promise<F | null>;
  toInput: (form: F) => I;
  save: (input: I, context: { id?: string; uid: string }) => Promise<void>;
}

export function useAdminForm<F extends { slug: string }, I>({
  initial,
  slugFrom,
  backTo,
  schema,
  load,
  toInput,
  save,
}: Options<F, I>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [submitting, setSubmitting] = useState(false);
  const slugEdited = useRef(Boolean(id));

  useEffect(() => {
    if (!id) return;
    load(id)
      .then((found) => (found ? setForm(found) : navigate(backTo)))
      .catch(() => navigate(backTo))
      .finally(() => setLoading(false));
  }, [id, load, navigate, backTo]);

  const set = <K extends keyof F>(key: K, value: F[K]) => {
    if (key === "slug") slugEdited.current = true;
    const autoSlug = key === slugFrom && !slugEdited.current ? { slug: slugify(String(value)) } : {};
    setForm((previous) => ({ ...previous, [key]: value, ...autoSlug }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const text = <K extends keyof F & string>(name: K) => ({
    name,
    value: String(form[name] ?? ""),
    error: errors[name],
    onChange: (event: ChangeEvent<Control>) => set(name, event.target.value as F[K]),
  });

  const check = <K extends keyof F & string>(name: K) => ({
    name,
    checked: Boolean(form[name]),
    onChange: (event: ChangeEvent<HTMLInputElement>) => set(name, event.target.checked as F[K]),
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const input = toInput(form);
    const result = schema.safeParse(input);
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    if (!user) return;

    setSubmitting(true);
    try {
      await save(input, { id, uid: user.uid });
      navigate(backTo);
    } catch (error) {
      console.error(error);
      setSubmitError("No se pudo guardar. Intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    set,
    text,
    check,
    errors,
    submitError,
    loading,
    submitting,
    isEdit: Boolean(id),
    submit,
    cancel: () => navigate(backTo),
  };
}
