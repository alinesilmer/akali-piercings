"use client"

import { useState, useCallback } from "react"

export const useImageGallery = (images: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectImage = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setSelectedIndex(index)
      }
    },
    [images.length],
  )

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  return {
    selectedIndex,
    selectedImage: images[selectedIndex],
    selectImage,
    goToNext,
    goToPrevious,
  }
}
