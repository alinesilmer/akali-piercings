import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type FieldValue,
  type QueryConstraint,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import type { Stored } from "../types/models";

type Writable<T> = { [K in Exclude<keyof T, keyof Stored>]: T[K] | FieldValue };

function toModel<T>(id: string, data: DocumentData): T {
  const fields = Object.entries(data).map(([key, value]) => [
    key,
    value instanceof Timestamp ? value.toDate().toISOString() : value,
  ]);
  return { id, ...Object.fromEntries(fields) } as T;
}

const defined = (data: object) => Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));

export function createRepository<T extends Stored & { slug: string }>(name: string) {
  const ref = collection(db, name);

  const list = async (...constraints: QueryConstraint[]) => {
    const snap = await getDocs(query(ref, ...constraints));
    return snap.docs.map((item) => toModel<T>(item.id, item.data()));
  };

  return {
    list,

    async getById(id: string) {
      const snap = await getDoc(doc(ref, id));
      return snap.exists() ? toModel<T>(snap.id, snap.data()) : null;
    },

    async create(uid: string, data: Writable<T>) {
      const now = serverTimestamp();
      await addDoc(ref, { ...data, createdAt: now, updatedAt: now, createdBy: uid });
    },

    async update(id: string, data: Partial<Writable<T>>) {
      await updateDoc(doc(ref, id), { ...defined(data), updatedAt: serverTimestamp() });
    },

    async remove(id: string) {
      await deleteDoc(doc(ref, id));
    },

    async uniqueSlug(base: string, excludeId?: string) {
      for (let n = 1; ; n++) {
        const candidate = n === 1 ? base : `${base}-${n}`;
        const [taken] = await list(where("slug", "==", candidate), limit(1));
        if (!taken || taken.id === excludeId) return candidate;
      }
    },
  };
}
