import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import type { ProductDoc } from "../types/firestore"
import type { PaginatedResult } from "../types/models"
import type { ProductListOptions, AdminProductListOptions } from "../types/dtos"

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_FEATURED_LIMIT = 8

// ─── Converter ────────────────────────────────────────────────────────────────

const productConverter: FirestoreDataConverter<ProductDoc> = {
  toFirestore(data: ProductDoc) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data
    return rest
  },
  fromFirestore(snap: QueryDocumentSnapshot, options: SnapshotOptions): ProductDoc {
    const data = snap.data(options)
    return { id: snap.id, ...data } as ProductDoc
  },
}

// ─── Collection ref ───────────────────────────────────────────────────────────

function productsRef() {
  return collection(db, "products").withConverter(productConverter)
}

function productDocRef(id: string) {
  return doc(db, "products", id).withConverter(productConverter)
}

// ─── Pagination helper ────────────────────────────────────────────────────────

function buildPaginatedResult(
  snaps: QueryDocumentSnapshot<ProductDoc>[],
  pageSize: number,
): PaginatedResult<ProductDoc> {
  const hasMore = snaps.length === pageSize
  const cursor = hasMore ? snaps[snaps.length - 1] : null
  return { items: snaps.map((s) => s.data()), cursor, hasMore }
}

// ─── Repository ───────────────────────────────────────────────────────────────

export const productRepository = {
  // ── Single doc reads ───────────────────────────────────────────────────────

  async getById(id: string): Promise<ProductDoc | null> {
    const snap = await getDoc(productDocRef(id))
    return snap.exists() ? snap.data() : null
  },

  async getBySlug(slug: string): Promise<ProductDoc | null> {
    const q = query(productsRef(), where("slug", "==", slug), firestoreLimit(1))
    const snap = await getDocs(q)
    if (snap.empty) return null
    return snap.docs[0].data()
  },

  // ── Public list queries ────────────────────────────────────────────────────

  /**
   * Lists published products, newest first.
   * Optional: filter by categoryId, paginate with startAfter cursor.
   *
   * Requires index: (status ASC, categoryId ASC, createdAt DESC)
   * and             (status ASC, createdAt DESC)
   */
  async listPublished(options: ProductListOptions = {}): Promise<PaginatedResult<ProductDoc>> {
    const pageSize = options.limit ?? DEFAULT_PAGE_SIZE
    const constraints = [
      where("status", "==", "published"),
      ...(options.categoryId ? [where("categoryId", "==", options.categoryId)] : []),
      orderBy("createdAt", "desc"),
      firestoreLimit(pageSize),
      ...(options.startAfter ? [startAfter(options.startAfter)] : []),
    ]
    const q = query(productsRef(), ...constraints)
    const snap = await getDocs(q)
    return buildPaginatedResult(snap.docs, pageSize)
  },

  /**
   * Lists featured published products, newest first.
   * Requires index: (status ASC, isFeatured ASC, createdAt DESC)
   */
  async listFeatured(limit = DEFAULT_FEATURED_LIMIT): Promise<ProductDoc[]> {
    const q = query(
      productsRef(),
      where("status", "==", "published"),
      where("isFeatured", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(limit),
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => d.data())
  },

  /**
   * Lists new published products, newest first.
   * Requires index: (status ASC, isNew ASC, createdAt DESC)
   */
  async listNew(limit = DEFAULT_FEATURED_LIMIT): Promise<ProductDoc[]> {
    const q = query(
      productsRef(),
      where("status", "==", "published"),
      where("isNew", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(limit),
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => d.data())
  },

  /**
   * Lists on-sale published products, newest first.
   * Requires index: (status ASC, isOnSale ASC, createdAt DESC)
   */
  async listOnSale(limit = DEFAULT_FEATURED_LIMIT): Promise<ProductDoc[]> {
    const q = query(
      productsRef(),
      where("status", "==", "published"),
      where("isOnSale", "==", true),
      orderBy("createdAt", "desc"),
      firestoreLimit(limit),
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => d.data())
  },

  // ── Admin list queries ─────────────────────────────────────────────────────

  /**
   * Lists products for admin dashboard.
   * Optional: filter by status and/or categoryId.
   *
   * Requires indexes:
   *   (status ASC, createdAt DESC)
   *   (status ASC, categoryId ASC, createdAt DESC)
   *   (createdAt DESC)  — no-filter case, covered by default single-field index
   */
  async adminList(options: AdminProductListOptions = {}): Promise<PaginatedResult<ProductDoc>> {
    const pageSize = options.limit ?? 50
    // Avoid composite indexes: filter/sort client-side when status or categoryId are specified.
    // Only orderBy("createdAt") alone is safe — single-field indexes are auto-created by Firestore.
    const constraints = [
      orderBy("createdAt", "desc"),
      firestoreLimit(pageSize),
      ...(options.startAfter ? [startAfter(options.startAfter)] : []),
    ]
    const q = query(productsRef(), ...constraints)
    const snap = await getDocs(q)
    let docs = snap.docs

    if (options.status) {
      docs = docs.filter((d) => d.data().status === options.status)
    }
    if (options.categoryId) {
      docs = docs.filter((d) => d.data().categoryId === options.categoryId)
    }

    return buildPaginatedResult(docs, pageSize)
  },

  // ── Writes ─────────────────────────────────────────────────────────────────

  async create(data: Omit<ProductDoc, "id">): Promise<string> {
    const ref = await addDoc(collection(db, "products"), data)
    return ref.id
  },

  async update(id: string, data: Partial<Omit<ProductDoc, "id">>): Promise<void> {
    await updateDoc(doc(db, "products", id), data as DocumentData)
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "products", id))
  },
}
