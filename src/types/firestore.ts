import type { Timestamp } from "firebase/firestore"

// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "user"

// ─── User document ───────────────────────────────────────────────────────────

export interface UserDoc {
  uid: string
  email: string
  displayName: string | null
  role: UserRole
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Category document ───────────────────────────────────────────────────────

export interface CategoryDoc {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  imagePublicId: string | null
  /** Display order — lower number appears first */
  order: number
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string // uid
}

// ─── Service document ────────────────────────────────────────────────────────

export type BodyPart = "nose" | "mouth" | "body" | "eyebrow" | "ear"

export interface ServiceImageDoc {
  id: string
  url: string
  publicId: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export interface ServiceDoc {
  id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  bodyPart: BodyPart
  images: ServiceImageDoc[]
  features: string[]
  isActive: boolean
  isNew: boolean
  isOnSale: boolean
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

// ─── Product document ────────────────────────────────────────────────────────

export interface ProductImageDoc {
  id: string
  url: string
  /** Cloudinary public_id — null when image was loaded by URL directly */
  publicId: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export type ProductStatus = "published" | "draft" | "archived"

export interface ProductDoc {
  id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  /** ISO 4217 currency code, e.g. "ARS" */
  currency: string
  categoryId: string
  /** Denormalized for query efficiency — keep in sync when category name changes */
  categoryName: string
  images: ProductImageDoc[]
  features: string[]
  status: ProductStatus
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  publishedAt: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string // uid
}
