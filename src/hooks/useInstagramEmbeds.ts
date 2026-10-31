import { useEffect, type RefObject } from "react";

import { loadEmbedScript } from "../lib/instagram";

/** Once `ready`, loads Instagram's script and reveals each embed as soon as its iframe has loaded. */
export function useInstagramEmbeds(feed: RefObject<HTMLElement | null>, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    let watcher: MutationObserver | undefined;

    loadEmbedScript()
      .then(() => {
        const root = feed.current;
        if (!root) return;

        const reveal = () =>
          root.querySelectorAll<HTMLIFrameElement>("iframe:not([data-watched])").forEach((frame) => {
            frame.dataset.watched = "";
            frame.addEventListener("load", () => frame.closest(".post")?.classList.add("is-ready"));
          });

        watcher = new MutationObserver(reveal);
        watcher.observe(root, { childList: true, subtree: true });
        window.instgrm?.Embeds?.process();
        reveal();
      })
      .catch(console.error);

    return () => watcher?.disconnect();
  }, [feed, ready]);
}
