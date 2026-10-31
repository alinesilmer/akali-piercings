declare global {
  interface Window {
    instgrm?: { Embeds?: { process(): void } };
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

let script: Promise<void> | null = null;

/** Loads Instagram's embed script once, on demand. */
export const loadEmbedScript = () =>
  (script ??= new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = EMBED_SCRIPT;
    tag.async = true;
    tag.onload = () => resolve();
    tag.onerror = reject;
    document.body.append(tag);
  }));

/** Only real instagram.com post permalinks are ever rendered into the page. */
export const isInstagramPost = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "www.instagram.com" && url.pathname.startsWith("/p/");
  } catch {
    return false;
  }
};
