import { serverTimestamp } from "firebase/firestore"
import { productRepository } from "../repositories/productRepository"
import { categoryRepository } from "../repositories/categoryRepository"
import { createProductSchema, updateProductSchema, productFlagsSchema } from "../schemas/product"
import { slugify, productDocToModel, generateImageId } from "../lib/utils"
import type { Product, PaginatedResult } from "../types/models"
import type {
  CreateProductDto,
  UpdateProductDto,
  ProductFlagsDto,
  ProductListOptions,
  AdminProductListOptions,
} from "../types/dtos"
import type { ProductImageDoc } from "../types/firestore"

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function resolveUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let candidate = base
  let suffix = 1
  while (true) {
    const existing = await productRepository.getBySlug(candidate)
    if (!existing || existing.id === excludeId) return candidate
    suffix++
    candidate = `${base}-${suffix}`
  }
}

async function getCategoryName(categoryId: string): Promise<string> {
  const cat = await categoryRepository.getById(categoryId)
  if (!cat) throw new Error(`Category not found: ${categoryId}`)
  return cat.name
}

function mapImages(
  inputs: CreateProductDto["images"] = [],
): ProductImageDoc[] {
  return inputs.map((img) => ({
    id: generateImageId(),
    url: img.url,
    publicId: img.publicId ?? null,
    alt: img.alt,
    type: img.type,
  }))
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const productService = {
  // ── Create ─────────────────────────────────────────────────────────────────

  /**
   * Creates a new product in `draft` status.
   * Validates input, ensures slug uniqueness, denormalizes categoryName.
   */
  async create(uid: string, dto: CreateProductDto): Promise<Product> {
    const parsed = createProductSchema.parse(dto)
    const baseSlug = parsed.slug ?? slugify(parsed.title)
    const [slug, categoryName] = await Promise.all([
      resolveUniqueSlug(baseSlug),
      getCategoryName(parsed.categoryId),
    ])

    const now = serverTimestamp()

    const id = await productRepository.create({
      title: parsed.title,
      slug,
      description: parsed.description,
      price: parsed.price,
      originalPrice: parsed.originalPrice ?? null,
      currency: parsed.currency ?? "ARS",
      categoryId: parsed.categoryId,
      categoryName,
      images: mapImages(parsed.images),
      features: parsed.features ?? [],
      status: "draft",
      isFeatured: parsed.isFeatured ?? false,
      isNew: parsed.isNew ?? false,
      isOnSale: parsed.isOnSale ?? false,
      publishedAt: null,
      createdAt: now as never,
      updatedAt: now as never,
      createdBy: uid,
    })

    const created = await productRepository.getById(id)
    if (!created) throw new Error("Failed to fetch created product")
    return productDocToModel(created)
  },

  // ── Update ─────────────────────────────────────────────────────────────────

  /**
   * Partially updates a product. Denormalizes category name when categoryId changes.
   */
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const parsed = updateProductSchema.parse(dto)
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)

    const updates: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }

    if (parsed.title !== undefined) updates.title = parsed.title
    if (parsed.description !== undefined) updates.description = parsed.description
    if (parsed.price !== undefined) updates.price = parsed.price
    if (parsed.originalPrice !== undefined) updates.originalPrice = parsed.originalPrice
    if (parsed.currency !== undefined) updates.currency = parsed.currency
    if (parsed.images !== undefined) updates.images = mapImages(parsed.images)
    if (parsed.features !== undefined) updates.features = parsed.features
    if (parsed.isFeatured !== undefined) updates.isFeatured = parsed.isFeatured
    if (parsed.isNew !== undefined) updates.isNew = parsed.isNew
    if (parsed.isOnSale !== undefined) updates.isOnSale = parsed.isOnSale
    if (parsed.status !== undefined) updates.status = parsed.status

    // Slug: explicit > derived from new title > keep current
    if (parsed.slug !== undefined) {
      updates.slug = await resolveUniqueSlug(parsed.slug, id)
    } else if (parsed.title !== undefined) {
      updates.slug = await resolveUniqueSlug(slugify(parsed.title), id)
    }

    // Denormalize new category name when category changes
    if (parsed.categoryId !== undefined) {
      updates.categoryId = parsed.categoryId
      updates.categoryName = await getCategoryName(parsed.categoryId)
    }

    await productRepository.update(id, updates as never)

    const updated = await productRepository.getById(id)
    if (!updated) throw new Error("Failed to fetch updated product")
    return productDocToModel(updated)
  },

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  /**
   * Publishes a product (sets status to "published" and records publishedAt).
   */
  async publish(id: string): Promise<void> {
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)
    await productRepository.update(id, {
      status: "published",
      publishedAt: serverTimestamp() as never,
      updatedAt: serverTimestamp() as never,
    })
  },

  /**
   * Unpublishes a product back to draft.
   */
  async unpublish(id: string): Promise<void> {
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)
    await productRepository.update(id, {
      status: "draft",
      updatedAt: serverTimestamp() as never,
    })
  },

  /**
   * Archives a product (hidden from public and admin active list).
   */
  async archive(id: string): Promise<void> {
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)
    await productRepository.update(id, {
      status: "archived",
      updatedAt: serverTimestamp() as never,
    })
  },

  /**
   * Updates product display flags (isFeatured, isNew, isOnSale).
   */
  async updateFlags(id: string, dto: ProductFlagsDto): Promise<void> {
    const parsed = productFlagsSchema.parse(dto)
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)

    const updates: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }
    if (parsed.isFeatured !== undefined) updates.isFeatured = parsed.isFeatured
    if (parsed.isNew !== undefined) updates.isNew = parsed.isNew
    if (parsed.isOnSale !== undefined) updates.isOnSale = parsed.isOnSale

    await productRepository.update(id, updates as never)
  },

  // ── Delete ─────────────────────────────────────────────────────────────────

  async delete(id: string): Promise<void> {
    const existing = await productRepository.getById(id)
    if (!existing) throw new Error(`Product not found: ${id}`)
    await productRepository.delete(id)
  },

  // ── Reads ──────────────────────────────────────────────────────────────────

  async getById(id: string): Promise<Product | null> {
    const doc = await productRepository.getById(id)
    return doc ? productDocToModel(doc) : null
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const doc = await productRepository.getBySlug(slug)
    return doc ? productDocToModel(doc) : null
  },

  /** Public site: paginated list of published products. */
  async listPublished(options: ProductListOptions = {}): Promise<PaginatedResult<Product>> {
    const result = await productRepository.listPublished(options)
    return {
      items: result.items.map(productDocToModel),
      cursor: result.cursor,
      hasMore: result.hasMore,
    }
  },

  async listFeatured(limit?: number): Promise<Product[]> {
    const docs = await productRepository.listFeatured(limit)
    return docs.map(productDocToModel)
  },

  async listNew(limit?: number): Promise<Product[]> {
    const docs = await productRepository.listNew(limit)
    return docs.map(productDocToModel)
  },

  async listOnSale(limit?: number): Promise<Product[]> {
    const docs = await productRepository.listOnSale(limit)
    return docs.map(productDocToModel)
  },

  /** Paginated list of published products filtered by category. */
  async listByCategory(categoryId: string, options: ProductListOptions = {}): Promise<PaginatedResult<Product>> {
    return this.listPublished({ ...options, categoryId })
  },

  /** Admin: paginated list with optional status/category filters. */
  async adminList(options: AdminProductListOptions = {}): Promise<PaginatedResult<Product>> {
    const result = await productRepository.adminList(options)
    return {
      items: result.items.map(productDocToModel),
      cursor: result.cursor,
      hasMore: result.hasMore,
    }
  },
}
