"use client"

import { useState } from "react"

export const useAccordion = (allowMultiple = false) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)

      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(itemId)
      }

      return newSet
    })
  }

  const isOpen = (itemId: string) => openItems.has(itemId)

  return {
    toggleItem,
    isOpen,
  }
}
