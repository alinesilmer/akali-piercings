import { useEffect } from "react";

let openOverlays = 0;

export function useOverlay(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    openOverlays += 1;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      openOverlays -= 1;
      if (openOverlays === 0) document.body.style.overflow = "";
    };
  }, [open, onClose]);
}
