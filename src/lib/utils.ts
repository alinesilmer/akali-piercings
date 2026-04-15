import type { Timestamp } from "firebase/firestore"
import type { CategoryDoc, ProductDoc, ServiceDoc } from "../types/firestore"
import type { Category, Product, Service } from "../types/models"

// ─── Slug ─────────────────────────────────────────────────────────────────────

/**
 * Converts any string to a URL-safe slug.
 * Handles Spanish diacritics (á→a, ñ→n, ü→u, etc.).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "")   // remove non-alphanumeric
    .trim()
    .replace(/[\s_]+/g, "-")         // spaces/underscores → dashes
    .replace(/-+/g, "-")             // collapse consecutive dashes
    .replace(/^-|-$/g, "")           // trim leading/trailing dashes
}

// ─── ID generation ────────────────────────────────────────────────────────────

/** Generates a random image ID for ProductImageDoc */
export function generateImageId(): string {
  return crypto.randomUUID()
}

// ─── Timestamp helpers ────────────────────────────────────────────────────────

export function timestampToISO(ts: Timestamp): string {
  return ts.toDate().toISOString()
}

export function optionalTimestampToISO(ts: Timestamp | null): string | null {
  return ts ? ts.toDate().toISOString() : null
}

// ─── Doc → Model converters ───────────────────────────────────────────────────

export function categoryDocToModel(doc: CategoryDoc): Category {
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    imageUrl: doc.imageUrl,
    imagePublicId: doc.imagePublicId,
    order: doc.order,
    isActive: doc.isActive,
    createdAt: timestampToISO(doc.createdAt),
    updatedAt: timestampToISO(doc.updatedAt),
    createdBy: doc.createdBy,
  }
}

export function serviceDocToModel(doc: ServiceDoc): Service {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    originalPrice: doc.originalPrice,
    bodyPart: doc.bodyPart,
    images: doc.images.map((img) => ({
      id: img.id,
      url: img.url,
      publicId: img.publicId,
      alt: img.alt,
      type: img.type,
    })),
    features: doc.features,
    isActive: doc.isActive,
    isNew: doc.isNew,
    isOnSale: doc.isOnSale,
    order: doc.order,
    createdAt: timestampToISO(doc.createdAt),
    updatedAt: timestampToISO(doc.updatedAt),
    createdBy: doc.createdBy,
  }
}

export function productDocToModel(doc: ProductDoc): Product {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    originalPrice: doc.originalPrice,
    currency: doc.currency,
    categoryId: doc.categoryId,
    categoryName: doc.categoryName,
    images: doc.images.map((img) => ({
      id: img.id,
      url: img.url,
      publicId: img.publicId,
      alt: img.alt,
      type: img.type,
    })),
    features: doc.features,
    status: doc.status,
    isFeatured: doc.isFeatured,
    isNew: doc.isNew,
    isOnSale: doc.isOnSale,
    publishedAt: optionalTimestampToISO(doc.publishedAt),
    createdAt: timestampToISO(doc.createdAt),
    updatedAt: timestampToISO(doc.updatedAt),
    createdBy: doc.createdBy,
  }
}
