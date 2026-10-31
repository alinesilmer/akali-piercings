import { Search } from "lucide-react";

import { Field, type InputProps } from "./Field";

/** Large borderless search input with a leading icon (used inside the search drawer). */
export function SearchField({ label, ...input }: Omit<InputProps, "error" | "wide" | "hideLabel">) {
  return (
    <Field label={label} hideLabel className="field--search">
      {(aria) => (
        <>
          <Search size={28} strokeWidth={1.25} aria-hidden />
          <input type="search" className="field__control" {...aria} {...input} />
        </>
      )}
    </Field>
  );
}
