import type { ImageType } from "../../types/models";

export interface ImageRow {
  rowId: string;
  url: string;
  alt: string;
  type: ImageType;
}

export const emptyImage = (): ImageRow => ({ rowId: crypto.randomUUID(), url: "", alt: "", type: "main" });

export const toImageRows = (images: Omit<ImageRow, "rowId">[]): ImageRow[] =>
  images.length ? images.map(({ url, alt, type }) => ({ rowId: crypto.randomUUID(), url, alt, type })) : [emptyImage()];

export const toImageInputs = (rows: ImageRow[]) =>
  rows.filter((row) => row.url.trim() && row.alt.trim()).map(({ url, alt, type }) => ({ url, alt, type }));
