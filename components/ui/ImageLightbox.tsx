'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    if (mounted) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [mounted, handleClose, handlePrevious, handleNext])

  // Cerrar al hacer click en el fondo (fuera de la imagen)
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }, [handleClose])

  if (!mounted) return null

  const lightboxContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className="absolute top-4 right-4 z-[10000] text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
        aria-label="Cerrar"
        style={{ pointerEvents: 'auto' }}
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          className="absolute left-4 z-[10000] text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Imagen anterior"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
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
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 z-[10000] text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Imagen siguiente"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[10000] text-white bg-black/50 px-4 py-2 rounded-full text-sm pointer-events-none">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )

  return createPortal(lightboxContent, document.body)
}

