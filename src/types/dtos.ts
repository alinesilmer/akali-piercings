import type { QueryDocumentSnapshot } from "firebase/firestore"
import type { BodyPart, ProductStatus } from "./models"

// ─── Service DTOs ─────────────────────────────────────────────────────────────

export interface ServiceImageInputDto {
  url: string
  publicId?: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export interface CreateServiceDto {
  title: string
  /** Auto-generated from title when omitted */
  slug?: string
  description: string
  price: number
  originalPrice?: number | null
  bodyPart: BodyPart
  images?: ServiceImageInputDto[]
  features?: string[]
  isNew?: boolean
  isOnSale?: boolean
  /** Display order — lower number appears first */
  order?: number
}

export interface UpdateServiceDto {
  title?: string
  slug?: string
  description?: string
  price?: number
  originalPrice?: number | null
  bodyPart?: BodyPart
  images?: ServiceImageInputDto[]
  features?: string[]
  isActive?: boolean
  isNew?: boolean
  isOnSale?: boolean
  order?: number
}

// ─── Category DTOs ────────────────────────────────────────────────────────────

export interface CreateCategoryDto {
  name: string
  /** Auto-generated from name when omitted */
  slug?: string
  description?: string | null
  imageUrl?: string | null
  imagePublicId?: string | null
  /** Defaults to 0 */
  order?: number
}

export interface UpdateCategoryDto {
  name?: string
  slug?: string
  description?: string | null
  imageUrl?: string | null
  imagePublicId?: string | null
  order?: number
  isActive?: boolean
}

// ─── Product DTOs ─────────────────────────────────────────────────────────────

export interface ProductImageInputDto {
  url: string
  publicId?: string | null
  alt: string
  type: "main" | "detail" | "result"
}

export interface CreateProductDto {
  title: string
  /** Auto-generated from title when omitted */
  slug?: string
  description: string
  price: number
  originalPrice?: number | null
  /** Defaults to "ARS" */
  currency?: string
  categoryId: string
  images?: ProductImageInputDto[]
  features?: string[]
  isFeatured?: boolean
  isNew?: boolean
  isOnSale?: boolean
}

export interface UpdateProductDto {
  title?: string
  slug?: string
  description?: string
  price?: number
  originalPrice?: number | null
  currency?: string
  categoryId?: string
  images?: ProductImageInputDto[]
  features?: string[]
  isFeatured?: boolean
  isNew?: boolean
  isOnSale?: boolean
  status?: ProductStatus
}

export interface ProductFlagsDto {
  isFeatured?: boolean
  isNew?: boolean
  isOnSale?: boolean
}

// ─── Query options ────────────────────────────────────────────────────────────

export interface ProductListOptions {
  categoryId?: string
  limit?: number
  startAfter?: QueryDocumentSnapshot
}

export interface AdminProductListOptions {
  status?: ProductStatus
  categoryId?: string
  limit?: number
  startAfter?: QueryDocumentSnapshot
}
