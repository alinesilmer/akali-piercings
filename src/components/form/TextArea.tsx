import { Field, type TextAreaProps } from "./Field";

export function TextArea({ label, error, wide, hideLabel, ...textarea }: TextAreaProps) {
  return (
    <Field label={label} error={error} wide={wide} hideLabel={hideLabel}>
      {(aria) => <textarea className="field__control" {...aria} {...textarea} />}
    </Field>
  );
}
