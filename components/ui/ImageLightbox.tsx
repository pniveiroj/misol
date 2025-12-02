'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ImageLightboxProps {
  images: string[]
  alt: string[]
  initialIndex?: number
  onClose: () => void
}

export default function ImageLightbox({ images, alt, initialIndex = 0, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, handlePrevious, handleNext])

  // Cerrar al hacer click en el fondo (fuera de la imagen)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label="Cerrar"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 z-[101] text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-7xl h-full max-h-[90vh]">
          <Image
            src={images[currentIndex]}
            alt={alt[currentIndex] || 'Imagen ampliada'}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 z-[101] text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[101] text-white bg-black/50 px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

