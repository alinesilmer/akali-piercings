import type { QueryDocumentSnapshot } from "firebase/firestore"

// Public-facing models: Timestamps converted to ISO 8601 strings.
// Use these in components and hooks — never expose raw Firestore docs.

export type UserRole = "admin" | "user"

export interface User {
  uid: string
  email: string
  displayName: string | null
  role: UserRole
  createdAt: string
  updatedAt: string
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  imagePublicId: string | null
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
}

// ─── Service ─────────────────────────────────────────────────────────────────

export type BodyPart = "nose" | "mouth" | "body" | "eyebrow" | "ear"

export interface ServiceImage {
  id: string
  url: string
  publicId: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  bodyPart: BodyPart
  images: ServiceImage[]
  features: string[]
  isActive: boolean
  isNew: boolean
  isOnSale: boolean
  order: number
  createdAt: string
  updatedAt: string
  createdBy: string
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string
  url: string
  publicId: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export type ProductStatus = "published" | "draft" | "archived"

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  currency: string
  categoryId: string
  categoryName: string
  images: ProductImage[]
  features: string[]
  status: ProductStatus
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  createdBy: string
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[]
  /** Pass as `startAfter` cursor for the next page; null when no more pages. */
  cursor: QueryDocumentSnapshot | null
  hasMore: boolean
}
