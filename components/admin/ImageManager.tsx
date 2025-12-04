'use client'

import { useState, useEffect } from 'react'
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageData {
  id: string
  filename: string
  path: string
  alt: string | null
  category: string | null
  order: number
}

export default function ImageManager() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [alt, setAlt] = useState('')

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/images')
      const data = await res.json()
      if (data.success) {
        setImages(data.data)
      }
    } catch (error) {
      console.error('Error al cargar imágenes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setAlt(file.name.replace(/\.[^/.]+$/, '')) // Usar nombre sin extensión como alt por defecto
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      if (category) formData.append('category', category)
      if (alt) formData.append('alt', alt)

      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        await loadImages()
        setSelectedFile(null)
        setCategory('')
        setAlt('')
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        alert(data.message || 'Error al subir imagen')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen?')) return

    try {
      const res = await fetch(`/api/admin/images?id=${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (data.success) {
        await loadImages()
      } else {
        alert(data.message || 'Error al eliminar imagen')
      }
    } catch (error) {
      alert('Error de conexión')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Subir Nueva Imagen</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivo
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>

          {selectedFile && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría (opcional)
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="header, fleet, gallery..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto alternativo (alt)
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Descripción de la imagen"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Subiendo...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Subir Imagen</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Images grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Imágenes ({images.length})</h2>
        {images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No hay imágenes subidas</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={image.path}
                    alt={image.alt || image.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-2 bg-white">
                  <p className="text-xs text-gray-600 truncate">{image.filename}</p>
                  {image.category && (
                    <p className="text-xs text-primary-600">{image.category}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

