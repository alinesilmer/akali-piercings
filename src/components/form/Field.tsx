import { useId, type ComponentProps, type ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
  wide?: boolean;
  /** Accessible name when the label is visually hidden or replaced by an icon. */
  hideLabel?: boolean;
  className?: string;
}

/** Label + control + error. Shared by every text control so spacing and a11y stay identical. */
export function Field({
  label,
  error,
  wide,
  hideLabel,
  className = "",
  children,
}: FieldProps & { children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode }) {
  const id = useId();
  const errorId = `${id}-error`;
  const classes = ["field", wide && "field--wide", error && "field--invalid", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "field__label"}>
        {label}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}
      {error && (
        <span id={errorId} className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export type { FieldProps };
export type InputProps = Omit<ComponentProps<"input">, "className"> & FieldProps;
export type TextAreaProps = Omit<ComponentProps<"textarea">, "className"> & FieldProps;
