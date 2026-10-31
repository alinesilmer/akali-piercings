import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

import { IMAGE_TYPES, type ImageType } from "../../types/models";
import s from "./admin.module.scss";
import { emptyImage, type ImageRow } from "./images";

const IMAGE_TYPE_LABELS: Record<ImageType, string> = { main: "Principal", detail: "Detalle", result: "Resultado" };

export interface Option {
  value: string;
  label: string;
}

interface FieldProps {
  label: ReactNode;
  error?: string;
  full?: boolean;
}

export function Spinner({ fullscreen = false }: { fullscreen?: boolean }) {
  return (
    <div className={fullscreen ? s.fullscreen : s.loading}>
      <div className={s.spinner} role="status" aria-label="Cargando" />
    </div>
  );
}

export function Button({
  variant = "primary",
  small = false,
  to,
  type = "button",
  className = "",
  ...rest
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" | "danger"; small?: boolean; to?: string }) {
  const classes = [s.button, variant !== "primary" && s[variant], small && s.small, className].filter(Boolean).join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {rest.children}
      </Link>
    );
  }
  return <button type={type} {...rest} className={classes} />;
}

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className={s.header}>
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className={s.dialogOverlay} role="alertdialog" aria-modal="true">
      <div className={s.dialog}>
        <h3>Confirmar eliminación</h3>
        <p>{message}</p>
        <div className={s.actions}>
          <Button small onClick={onCancel}>
            Cancelar
          </Button>
          <Button small variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={s.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, error, full, children }: FieldProps & { children: ReactNode }) {
  return (
    <label className={`${s.field} ${full ? s.fieldFull : ""}`}>
      <span className={s.label}>{label}</span>
      {children}
      {error && <span className={s.errorText}>{error}</span>}
    </label>
  );
}

const controlClass = (error?: string) => `${s.control} ${error ? s.invalid : ""}`;

export function TextField({ label, error, full, ...input }: FieldProps & ComponentProps<"input">) {
  return (
    <Field label={label} error={error} full={full}>
      <input type="text" {...input} className={controlClass(error)} />
    </Field>
  );
}

export function TextAreaField({ label, error, ...input }: FieldProps & ComponentProps<"textarea">) {
  return (
    <Field label={label} error={error} full>
      <textarea rows={4} {...input} className={controlClass(error)} />
    </Field>
  );
}

export function SelectField({
  label,
  error,
  options,
  placeholder,
  ...input
}: FieldProps & ComponentProps<"select"> & { options: Option[]; placeholder?: string }) {
  return (
    <Field label={label} error={error}>
      <select {...input} className={controlClass(error)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function CheckboxField({ label, ...input }: { label: string } & ComponentProps<"input">) {
  return (
    <label className={s.checkbox}>
      <input type="checkbox" {...input} />
      <span>{label}</span>
    </label>
  );
}

export function Thumbnail({ image }: { image?: { url: string; alt: string } }) {
  return image?.url ? (
    <img className={s.thumbnail} src={image.url} alt={image.alt} loading="lazy" />
  ) : (
    <div className={s.thumbnail}>Sin imagen</div>
  );
}

export function StatusToggle({ on, labels, onClick }: { on: boolean; labels: [string, string]; onClick: () => void }) {
  return (
    <button type="button" className={`${s.status} ${on ? s.on : s.off}`} onClick={onClick}>
      {on ? labels[0] : labels[1]}
    </button>
  );
}

export function ImagesEditor({
  images,
  error,
  onChange,
}: {
  images: ImageRow[];
  error?: string;
  onChange: (images: ImageRow[]) => void;
}) {
  const patch = (rowId: string, changes: Partial<ImageRow>) =>
    onChange(images.map((image) => (image.rowId === rowId ? { ...image, ...changes } : image)));

  return (
    <Section title="Imágenes">
      {error && <div className={s.banner}>{error}</div>}
      {images.map((image) => (
        <div key={image.rowId} className={s.imageRow}>
          <TextField
            label="URL *"
            value={image.url}
            placeholder="https://res.cloudinary.com/..."
            onChange={(event) => patch(image.rowId, { url: event.target.value })}
          />
          <TextField
            label="Texto alternativo *"
            value={image.alt}
            placeholder="Descripción de la imagen"
            onChange={(event) => patch(image.rowId, { alt: event.target.value })}
          />
          <SelectField
            label="Tipo"
            value={image.type}
            options={IMAGE_TYPES.map((value) => ({ value, label: IMAGE_TYPE_LABELS[value] }))}
            onChange={(event) => patch(image.rowId, { type: event.target.value as ImageType })}
          />
          {images.length > 1 && (
            <Button
              small
              variant="danger"
              aria-label="Quitar imagen"
              onClick={() => onChange(images.filter((other) => other.rowId !== image.rowId))}
            >
              ×
            </Button>
          )}
          {image.url.startsWith("https://") && <img src={image.url} alt={image.alt || "Vista previa"} />}
        </div>
      ))}
      <Button small onClick={() => onChange([...images, emptyImage()])}>
        + Agregar imagen
      </Button>
    </Section>
  );
}

export function FeaturesEditor({
  features,
  draft,
  onDraft,
  onChange,
}: {
  features: string[];
  draft: string;
  onDraft: (draft: string) => void;
  onChange: (features: string[]) => void;
}) {
  const add = () => {
    const feature = draft.trim();
    if (!feature || features.includes(feature)) return;
    onChange([...features, feature]);
    onDraft("");
  };

  return (
    <Section title="Características">
      <div className={s.inline}>
        <input
          type="text"
          className={s.control}
          value={draft}
          placeholder="Nueva característica"
          onChange={(event) => onDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            add();
          }}
        />
        <Button small onClick={add}>
          Agregar
        </Button>
      </div>
      {features.length > 0 && (
        <div className={s.chips}>
          {features.map((feature) => (
            <span key={feature}>
              {feature}
              <button
                type="button"
                aria-label={`Quitar ${feature}`}
                onClick={() => onChange(features.filter((other) => other !== feature))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </Section>
  );
}
