import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { GraduationCap, CheckCircle, Shield, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function RutasEscolaresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)

  const schools = [
    {
      name: t.schoolRoutes.school1,
      image: '/images/jpg/escolar.jpg',
    },
    {
      name: t.schoolRoutes.school2,
      image: '/images/jpg/escolar.jpg',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: localeParam === 'es' ? 'Seguridad Garantizada' : localeParam === 'val' ? 'Seguretat Garantida' : 'Guaranteed Safety',
      description: localeParam === 'es' ? 'Vehículos adaptados y conductores certificados' : localeParam === 'val' ? 'Vehicles adaptats i conductors certificats' : 'Adapted vehicles and certified drivers',
    },
    {
      icon: Clock,
      title: localeParam === 'es' ? 'Puntualidad' : localeParam === 'val' ? 'Puntualitat' : 'Punctuality',
      description: localeParam === 'es' ? 'Comprometidos con la puntualidad en cada ruta' : localeParam === 'val' ? 'Compromesos amb la puntualitat en cada ruta' : 'Committed to punctuality on every route',
    },
    {
      icon: MapPin,
      title: localeParam === 'es' ? 'Rutas Optimizadas' : localeParam === 'val' ? 'Rutes Optimitzades' : 'Optimized Routes',
      description: localeParam === 'es' ? 'Rutas diseñadas para máxima eficiencia' : localeParam === 'val' ? 'Rutes dissenyades per a màxima eficiència' : 'Routes designed for maximum efficiency',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/escolar.jpg"
            alt="Rutas escolares"
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
              {t.schoolRoutes.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg">
              {t.schoolRoutes.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section with Images */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {localeParam === 'es' ? 'Colegios con los que Trabajamos' : localeParam === 'val' ? 'Col·legis amb els que Treballem' : 'Schools We Work With'}
              </h2>
              <p className="text-xl text-gray-600">
                {localeParam === 'es' ? 'Consulte horarios y paradas de nuestras rutas escolares' : localeParam === 'val' ? 'Consulteu horaris i parades de les nostres rutes escolars' : 'Check schedules and stops of our school routes'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schools.map((school, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={school.image}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-800/40 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl">
                        <GraduationCap className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {school.name}
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span>{localeParam === 'es' ? 'Rutas regulares' : localeParam === 'val' ? 'Rutes regulars' : 'Regular routes'}</span>
                      </li>
                      <li className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span>{localeParam === 'es' ? 'Horarios optimizados' : localeParam === 'val' ? 'Horaris optimitzats' : 'Optimized schedules'}</span>
                      </li>
                      <li className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span>{localeParam === 'es' ? 'Paradas seguras' : localeParam === 'val' ? 'Parades segures' : 'Safe stops'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/1.jpg"
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
            {localeParam === 'es' ? 'Solicite Información sobre Rutas Escolares' :
             localeParam === 'val' ? 'Sol·liciti Informació sobre Rutes Escolars' :
             'Request Information about School Routes'}
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
          <Link
            href={`/${localeParam}/contacto`}
            className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            {localeParam === 'es' ? 'Contactar Ahora' :
             localeParam === 'val' ? 'Contactar Ara' :
             'Contact Now'}
          </Link>
        </div>
      </section>
    </div>
  )
}
