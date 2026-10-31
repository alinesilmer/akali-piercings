import { Field, type InputProps } from "./Field";

export function TextField({ label, error, wide, hideLabel, ...input }: InputProps) {
  return (
    <Field label={label} error={error} wide={wide} hideLabel={hideLabel}>
      {(aria) => <input className="field__control" {...aria} {...input} />}
    </Field>
  );
}
