'use client'

import { motion } from 'framer-motion'
import { Building2, Users, GraduationCap, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Translations } from '@/lib/get-translations'
import type { Locale } from '@/lib/i18n'

export default function Services({ translations, locale }: { translations: Translations; locale: Locale }) {
  const services = [
    {
      icon: Building2,
      title: translations.services.companies.title,
      items: [
        translations.services.companies.item1,
        translations.services.companies.item2,
        translations.services.companies.item3,
        translations.services.companies.item4,
      ],
      href: `/${locale}/servicios`,
      image: '/images/jpg/1.png',
    },
    {
      icon: Users,
      title: translations.services.custom.title,
      items: [
        translations.services.custom.item1,
        translations.services.custom.item2,
        translations.services.custom.item3,
        translations.services.custom.item4,
        translations.services.custom.item5,
        translations.services.custom.item6,
      ],
      href: `/${locale}/servicios`,
      image: '/images/jpg/2.jpg',
    },
    {
      icon: GraduationCap,
      title: translations.services.school.title,
      items: [
        translations.services.school.item1,
        translations.services.school.item2,
        translations.services.school.item3,
        translations.services.school.item4,
      ],
      href: `/${locale}/rutas-escolares`,
      image: '/images/jpg/escolar.jpg',
    },
    {
      icon: Calendar,
      title: translations.services.events.title,
      items: [
        translations.services.events.item1,
        translations.services.events.item2,
        translations.services.events.item3,
        translations.services.events.item4,
        translations.services.events.item5,
        translations.services.events.item6,
      ],
      href: `/${locale}/servicios`,
      image: '/images/jpg/3.jpg',
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {translations.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translations.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-800/40 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Icon className="w-8 h-8 text-primary-600" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <ul className="space-y-2 flex-grow">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
