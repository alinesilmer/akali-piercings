import { useState } from "react";

/**
 * Remembers the last non-null value. Lets an exit animation keep rendering the content
 * that was on screen after the parent has already cleared it.
 */
export function useLastDefined<T>(value: T | null): T | null {
  const [last, setLast] = useState<T | null>(value);
  if (value && value !== last) setLast(value);
  return value ?? last;
}
