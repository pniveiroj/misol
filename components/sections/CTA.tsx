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
    <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jpg/1.png"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
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
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-secondary-400 fill-secondary-400" />
            <Star className="w-6 h-6 text-secondary-400 fill-secondary-400" />
            <Star className="w-6 h-6 text-secondary-400 fill-secondary-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            {text.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            {text.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+34965680319"
              className="group bg-secondary-500 hover:bg-secondary-600 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 whitespace-nowrap"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{translations.contact.phone}</span>
            </a>
            
            <Link
              href={`/${locale}/contacto`}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 border-2 border-white/30 hover:border-white/50 shadow-xl"
            >
              <Mail className="w-5 h-5" />
              <span>{text.button}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
