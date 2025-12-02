import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { Building2, Users, GraduationCap, Calendar, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)

  const services = [
    {
      icon: Building2,
      title: t.services.companies.title,
      items: [
        t.services.companies.item1,
        t.services.companies.item2,
        t.services.companies.item3,
        t.services.companies.item4,
      ],
      image: '/images/jpg/1.jpg',
    },
    {
      icon: Users,
      title: t.services.custom.title,
      items: [
        t.services.custom.item1,
        t.services.custom.item2,
        t.services.custom.item3,
        t.services.custom.item4,
        t.services.custom.item5,
        t.services.custom.item6,
      ],
      image: '/images/jpg/2.jpg',
    },
    {
      icon: GraduationCap,
      title: t.services.school.title,
      items: [
        t.services.school.item1,
        t.services.school.item2,
        t.services.school.item3,
        t.services.school.item4,
      ],
      image: '/images/jpg/escolar.jpg',
    },
    {
      icon: Calendar,
      title: t.services.events.title,
      items: [
        t.services.events.item1,
        t.services.events.item2,
        t.services.events.item3,
        t.services.events.item4,
        t.services.events.item5,
        t.services.events.item6,
      ],
      image: '/images/jpg/3.jpg',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/header3.jpg"
            alt="Servicios"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {t.services.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Images */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-800/40 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h3>
                    <ul className="space-y-3">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/5.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/80"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {localeParam === 'es' ? '¿Necesita un Servicio Personalizado?' :
             localeParam === 'val' ? 'Necessita un Servei Personalitzat?' :
             'Need a Custom Service?'}
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            {t.contact.title}
          </p>
          <Link
            href={`/${localeParam}/contacto`}
            className="inline-flex items-center space-x-2 bg-secondary-500 hover:bg-secondary-600 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <span>{t.home.callToAction}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
