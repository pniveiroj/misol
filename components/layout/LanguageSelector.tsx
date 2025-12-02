'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import { locales, type Locale } from '@/lib/i18n'

const languageNames: Record<Locale, string> = {
  es: 'Español',
  val: 'Valencià',
  en: 'English',
}

export default function LanguageSelector({ currentLocale }: { currentLocale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (locale: Locale) => {
    // Reemplazar el locale actual en el pathname
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors h-[44px] border border-gray-200 bg-white"
        aria-label="Seleccionar idioma"
      >
        <Globe className="w-5 h-5 text-gray-700 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700">
          {languageNames[currentLocale]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => changeLanguage(locale)}
                className={`w-full text-left px-4 py-3 text-sm sm:text-base hover:bg-gray-100 active:bg-gray-200 transition-colors first:rounded-t-lg last:rounded-b-lg min-h-[44px] flex items-center ${
                  locale === currentLocale
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {languageNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

