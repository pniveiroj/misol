'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Translations } from '@/lib/get-translations'
import type { Locale } from '@/lib/i18n'

export default function CTA({ translations, locale }: { translations: Translations; locale: Locale }) {
  const ctaText = {
    es: {
      title: '¿Listo para Comenzar?',
      description: 'Contacte con nosotros hoy mismo y solicite su presupuesto sin compromiso. Estamos aquí para ayudarle a encontrar la solución perfecta.',
      button: 'Formulario de Contacto',
    },
    val: {
      title: 'A punt per Començar?',
      description: 'Contacti amb nosaltres avui mateix i sol·liciti el seu pressupost sense compromís. Estem aquí per ajudar-lo a trobar la solució perfecta.',
      button: 'Formulari de Contacte',
    },
    en: {
      title: 'Ready to Get Started?',
      description: 'Contact us today and request your free quote. We are here to help you find the perfect solution.',
      button: 'Contact Form',
    },
  }

  const text = ctaText[locale]

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jpg/1.png"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/80 to-primary-900/85"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-400 fill-secondary-400" />
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-400 fill-secondary-400" />
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-400 fill-secondary-400" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg px-2">
            {text.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-12 max-w-3xl mx-auto drop-shadow-md leading-relaxed px-4">
            {text.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 px-4">
            <a
              href="tel:+34965680319"
              className="group bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-3xl min-h-[48px]"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{translations.contact.phone}</span>
            </a>
            
            <Link
              href={`/${locale}/contacto`}
              className="group bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-10 py-3 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-white/50 shadow-xl min-h-[48px]"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              <span>{text.button}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
