import Link from 'next/link'
import { isValidLocale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que está buscando no existe.
        </p>
        <Link
          href={`/${defaultLocale}`}
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}


