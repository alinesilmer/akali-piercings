export const BODY_PART_IDS = ["nose", "mouth", "body", "eyebrow", "ear"] as const;
export type BodyPart = (typeof BODY_PART_IDS)[number];

export const IMAGE_TYPES = ["main", "detail", "result"] as const;
export type ImageType = (typeof IMAGE_TYPES)[number];

export const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export interface StoredImage {
  id: string;
  url: string;
  publicId: string | null;
  alt: string;
  type: ImageType;
}

export interface Stored {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Category extends Stored {
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  order: number;
  isActive: boolean;
}

interface Sellable extends Stored {
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: StoredImage[];
  features: string[];
  isNew: boolean;
  isOnSale: boolean;
}

export interface Service extends Sellable {
  bodyPart: BodyPart;
  isActive: boolean;
  order: number;
}

export interface Product extends Sellable {
  currency: string;
  categoryId: string;
  categoryName: string;
  status: ProductStatus;
  isFeatured: boolean;
  publishedAt: string | null;
}

export interface CatalogItem
  extends Pick<
    Sellable,
    "id" | "title" | "description" | "price" | "originalPrice" | "images" | "features" | "isNew" | "isOnSale"
  > {
  kind: "piercing" | "jewelry";
  categoryId: string;
}

export interface CatalogFilter {
  id: string;
  name: string;
}
