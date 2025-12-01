import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { Translations } from '@/lib/get-translations'

export default function Footer({ locale, translations }: { locale: Locale; translations: Translations }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              AUTOCARES <span className="text-secondary-500">MI-SOL</span>
            </h3>
            <p className="text-gray-400 mb-4">
              {translations.company.description1.substring(0, 100)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{locale === 'es' ? 'Enlaces Rápidos' : locale === 'val' ? 'Enllaços Ràpids' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/empresa`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.company}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/servicios`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/flota`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.fleet}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacto`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{translations.nav.services}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/servicios`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.services.companies.item1}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rutas-escolares`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.schoolRoutes}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/servicios`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.services.custom.item4}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/servicios`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.services.custom.item6}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{translations.nav.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary-500 mt-0.5" />
                <a href="tel:+34965680319" className="text-gray-400 hover:text-white transition-colors">
                  {translations.contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary-500 mt-0.5" />
                <span className="text-gray-400">{translations.contact.address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary-500 mt-0.5" />
                <a href={`mailto:${translations.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Autocares Mi-Sol S.L. {locale === 'es' ? 'Todos los derechos reservados.' : locale === 'val' ? 'Tots els drets reservats.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}

