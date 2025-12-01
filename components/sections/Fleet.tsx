'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Wifi, Star } from 'lucide-react'
import Image from 'next/image'
import type { Translations } from '@/lib/get-translations'
import type { Locale } from '@/lib/i18n'

export default function Fleet({ translations, locale }: { translations: Translations; locale: Locale }) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jpg/5.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/jpg/6.jpg"
              alt={locale === 'es' ? 'Nuestra flota' : locale === 'val' ? 'La nostra flota' : 'Our fleet'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {translations.fleet.title}
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {translations.fleet.subtitle}
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {translations.fleet.description}
            </p>
            <div className="flex items-center space-x-3 text-primary-600 font-semibold text-lg bg-primary-50 rounded-lg py-4 px-6 inline-flex">
              <Wifi className="w-6 h-6" />
              <span>{translations.fleet.wifi}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            href={`/${locale}/flota`}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <span>{locale === 'es' ? 'Ver Flota Completa' : locale === 'val' ? 'Veure Flota Completa' : 'View Full Fleet'}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
