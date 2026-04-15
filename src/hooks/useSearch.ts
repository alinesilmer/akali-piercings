"use client"

import { useState, useMemo, useCallback } from "react"
import type { ProductService } from "../types/product"

export const useSearch = (products: ProductService[]) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase().trim()

    return products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(query)
      const descriptionMatch = product.description.toLowerCase().includes(query)
      const featuresMatch = product.features.some((feature) => feature.toLowerCase().includes(query))
      const categoryMatch = product.category.toLowerCase().includes(query)

      return titleMatch || descriptionMatch || featuresMatch || categoryMatch
    })
  }, [products, searchQuery])

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    openSearch,
    closeSearch,
    clearSearch,
    hasResults: searchResults.length > 0,
    hasQuery: searchQuery.trim().length > 0,
  }
}
