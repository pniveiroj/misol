'use client'

import { useState, useEffect } from 'react'
import { Save, Search, Globe } from 'lucide-react'

interface Translation {
  id: string
  key: string
  locale: string
  value: string
}

export default function ContentEditor() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [filteredTranslations, setFilteredTranslations] = useState<Translation[]>([])
  const [selectedLocale, setSelectedLocale] = useState<'es' | 'val' | 'en'>('es')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadTranslations()
  }, [selectedLocale])

  useEffect(() => {
    if (searchTerm) {
      setFilteredTranslations(
        translations.filter((t) =>
          t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredTranslations(translations)
    }
  }, [searchTerm, translations])

  const loadTranslations = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/content?locale=${selectedLocale}`)
      const data = await res.json()
      if (data.success) {
        setTranslations(data.data)
        setFilteredTranslations(data.data)
      }
    } catch (error) {
      console.error('Error al cargar traducciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTranslation = async (id: string, key: string, value: string) => {
    setSaving(id)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          locale: selectedLocale,
          value,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Guardado correctamente' })
        // Actualizar en el estado local
        setTranslations((prev) =>
          prev.map((t) => (t.id === id ? { ...t, value } : t))
        )
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: data.message || 'Error al guardar' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' })
    } finally {
      setSaving(null)
    }
  }

  const handleValueChange = (id: string, key: string, newValue: string) => {
    // Actualizar inmediatamente en el estado
    setTranslations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, value: newValue } : t))
    )
    setFilteredTranslations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, value: newValue } : t))
    )
  }

  const handleBlur = (translation: Translation) => {
    updateTranslation(translation.id, translation.key, translation.value)
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
      {/* Header con selector de idioma y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Globe className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {(['es', 'val', 'en'] as const).map((locale) => (
                <button
                  key={locale}
                  onClick={() => setSelectedLocale(locale)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLocale === locale
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por clave o texto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 px-4 py-2 rounded ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Lista de traducciones */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredTranslations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? 'No se encontraron resultados' : 'No hay traducciones'}
            </div>
          ) : (
            filteredTranslations.map((translation) => (
              <div key={translation.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="text-sm font-mono text-gray-500 mb-2">
                      {translation.key}
                    </div>
                    <textarea
                      value={translation.value}
                      onChange={(e) =>
                        handleValueChange(translation.id, translation.key, e.target.value)
                      }
                      onBlur={() => handleBlur(translation)}
                      rows={translation.value.length > 100 ? 3 : 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  {saving === translation.id && (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

