'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSelector from './LanguageSelector'
import type { Locale } from '@/lib/i18n'
import type { Translations } from '@/lib/get-translations'

export default function Header({ locale, translations }: { locale: Locale; translations: Translations }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: translations.nav.home, href: `/${locale}` },
    { name: translations.nav.company, href: `/${locale}/empresa` },
    { name: translations.nav.services, href: `/${locale}/servicios` },
    { name: translations.nav.schoolRoutes, href: `/${locale}/rutas-escolares` },
    { name: translations.nav.fleet, href: `/${locale}/flota` },
    { name: translations.nav.contact, href: `/${locale}/contacto` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">
              AUTOCARES <span className="text-secondary-500">MI-SOL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Phone CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector currentLocale={locale} />
            <a
              href="tel:+34965680319"
              className="flex items-center space-x-2 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-lg transition-colors group"
            >
              <Phone className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
              <span className="text-primary-600 font-semibold whitespace-nowrap group-hover:text-primary-700">
                +34 965 68 03 19
              </span>
            </a>
          </div>

          {/* Mobile: Language & Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector currentLocale={locale} />
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+34965680319"
                className="flex items-center space-x-2 py-3 px-4 bg-primary-50 rounded-lg text-primary-600 font-semibold hover:bg-primary-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span className="whitespace-nowrap">+34 965 68 03 19</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

