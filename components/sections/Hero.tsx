'use client'

import { motion } from 'framer-motion'
import { Phone, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Translations } from '@/lib/get-translations'
import type { Locale } from '@/lib/i18n'

export default function Hero({ translations, locale }: { translations: Translations; locale: Locale }) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jpg/1.png"
          alt="Autocares Mi-Sol"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/80 to-primary-900/85"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-2xl leading-tight"
          >
            {translations.home.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-gray-100 drop-shadow-lg px-2"
          >
            {translations.home.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-gray-200 max-w-2xl mx-auto font-semibold drop-shadow-md px-4"
          >
            {translations.home.cta}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 text-gray-200 max-w-2xl mx-auto drop-shadow-md px-4"
          >
            {translations.home.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <Link
              href={`/${locale}/contacto`}
              className="group bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-3xl min-h-[48px]"
            >
              <span>{translations.home.callToAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
            
            <a
              href="tel:+34965680319"
              className="group bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-white/50 shadow-xl min-h-[48px]"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{translations.contact.phone}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center space-x-2 mt-6 sm:mt-8 text-sm sm:text-base md:text-lg px-4"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 fill-secondary-400 flex-shrink-0" />
            <span className="font-semibold">{locale === 'es' ? 'Calidad y Confort Garantizados' : locale === 'val' ? 'Qualitat i Confort Garantits' : 'Quality and Comfort Guaranteed'}</span>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 fill-secondary-400 flex-shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
