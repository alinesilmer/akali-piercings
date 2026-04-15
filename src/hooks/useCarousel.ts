"use client"

import { useState, useCallback, useEffect } from "react"

export const useCarousel = (totalItems: number, autoPlay = false, autoPlayInterval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }, [totalItems])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }, [totalItems])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
     if (autoPlay) {
       const interval = setInterval(goToNext, autoPlayInterval)
       return () => clearInterval(interval)
     }
   }, [autoPlay, autoPlayInterval, goToNext])

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
  }
}
