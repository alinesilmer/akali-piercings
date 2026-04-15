import { serverTimestamp } from "firebase/firestore"
import { categoryRepository } from "../repositories/categoryRepository"
import { createCategorySchema, updateCategorySchema } from "../schemas/category"
import { slugify, categoryDocToModel } from "../lib/utils"
import type { Category } from "../types/models"
import type { CreateCategoryDto, UpdateCategoryDto } from "../types/dtos"

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Ensures the slug is unique in the categories collection.
 * If the base slug is taken, appends -2, -3, etc.
 */
async function resolveUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let candidate = base
  let suffix = 1
  while (true) {
    const existing = await categoryRepository.getBySlug(candidate)
    if (!existing || existing.id === excludeId) return candidate
    suffix++
    candidate = `${base}-${suffix}`
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const categoryService = {
  /**
   * Creates a new category. Validates input, generates slug, persists to Firestore.
   * @param uid  UID of the admin creating the category.
   */
  async create(uid: string, dto: CreateCategoryDto): Promise<Category> {
    const parsed = createCategorySchema.parse(dto)
    const baseSlug = parsed.slug ?? slugify(parsed.name)
    const slug = await resolveUniqueSlug(baseSlug)

    const now = serverTimestamp() as ReturnType<typeof serverTimestamp>

    const id = await categoryRepository.create({
      name: parsed.name,
      slug,
      description: parsed.description ?? null,
      imageUrl: parsed.imageUrl ?? null,
      imagePublicId: parsed.imagePublicId ?? null,
      order: parsed.order ?? 0,
      isActive: true,
      createdAt: now as never,
      updatedAt: now as never,
      createdBy: uid,
    })

    const created = await categoryRepository.getById(id)
    if (!created) throw new Error("Failed to fetch created category")
    return categoryDocToModel(created)
  },

  /**
   * Updates an existing category. Only provided fields are changed.
   * If `name` changes and `slug` is not provided, slug is regenerated.
   */
  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const parsed = updateCategorySchema.parse(dto)

    const updates: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }

    if (parsed.name !== undefined) updates.name = parsed.name
    if (parsed.description !== undefined) updates.description = parsed.description
    if (parsed.imageUrl !== undefined) updates.imageUrl = parsed.imageUrl
    if (parsed.imagePublicId !== undefined) updates.imagePublicId = parsed.imagePublicId
    if (parsed.order !== undefined) updates.order = parsed.order
    if (parsed.isActive !== undefined) updates.isActive = parsed.isActive

    // Resolve slug only when name or slug is explicitly provided
    if (parsed.slug !== undefined) {
      updates.slug = await resolveUniqueSlug(parsed.slug, id)
    } else if (parsed.name !== undefined) {
      updates.slug = await resolveUniqueSlug(slugify(parsed.name), id)
    }

    await categoryRepository.update(id, updates as never)

    const updated = await categoryRepository.getById(id)
    if (!updated) throw new Error("Failed to fetch updated category")
    return categoryDocToModel(updated)
  },

  /**
   * Permanently deletes a category.
   * Does NOT cascade-delete products — caller is responsible.
   */
  async delete(id: string): Promise<void> {
    const existing = await categoryRepository.getById(id)
    if (!existing) throw new Error(`Category not found: ${id}`)
    await categoryRepository.delete(id)
  },

  async getById(id: string): Promise<Category | null> {
    const doc = await categoryRepository.getById(id)
    return doc ? categoryDocToModel(doc) : null
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const doc = await categoryRepository.getBySlug(slug)
    return doc ? categoryDocToModel(doc) : null
  },

  /** Public site: returns active categories ordered by `order`. */
  async listActive(): Promise<Category[]> {
    const docs = await categoryRepository.listActive()
    return docs.map(categoryDocToModel)
  },

  /** Admin dashboard: returns all categories regardless of status. */
  async adminList(): Promise<Category[]> {
    const docs = await categoryRepository.listAll()
    return docs.map(categoryDocToModel)
  },
}
