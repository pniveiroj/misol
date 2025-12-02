import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { Wifi, Users, Shield, Plug, Radio, Wind, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

export default async function FlotaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)

  const amenities = [
    { icon: Wind, name: localeParam === 'es' ? 'Aire Acondicionado' : localeParam === 'val' ? 'Aire condicionat' : 'Air Conditioning' },
    { icon: Wifi, name: 'WiFi' },
    { icon: Users, name: localeParam === 'es' ? 'Asientos Cómodos' : localeParam === 'val' ? 'Seients Còmodes' : 'Comfortable Seats' },
    { icon: Shield, name: localeParam === 'es' ? 'Seguridad Máxima' : localeParam === 'val' ? 'Seguretat Màxima' : 'Maximum Safety' },
    { icon: Plug, name: localeParam === 'es' ? 'Tomas de Corriente' : localeParam === 'val' ? 'Preses de Corrent' : 'Power Outlets' },
    { icon: Radio, name: localeParam === 'es' ? 'Sistema de Sonido' : localeParam === 'val' ? 'Sistema de So' : 'Sound System' },
  ]

  const fleetVehicles = [
    {
      capacity: '35-45',
      image: '/images/jpg/6.jpg',
      features: [
        localeParam === 'es' ? 'Ideal para grupos pequeños' : localeParam === 'val' ? 'Ideal per a grups petits' : 'Ideal for small groups',
        localeParam === 'es' ? 'Máxima comodidad' : localeParam === 'val' ? 'Màxima comoditat' : 'Maximum comfort',
      ],
    },
    {
      capacity: '50-55',
      image: '/images/jpg/7.jpg',
      features: [
        localeParam === 'es' ? 'Perfecto para excursiones' : localeParam === 'val' ? 'Perfecte per a excursions' : 'Perfect for excursions',
        localeParam === 'es' ? 'Equipamiento completo' : localeParam === 'val' ? 'Equipament complet' : 'Full equipment',
      ],
    },
    {
      capacity: '60-63',
      image: '/images/jpg/8.jpg',
      features: [
        localeParam === 'es' ? 'Gran capacidad' : localeParam === 'val' ? 'Gran capacitat' : 'Large capacity',
        localeParam === 'es' ? 'Larga distancia' : localeParam === 'val' ? 'Llarga distància' : 'Long distance',
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/header5.jpg"
            alt="Flota de autobuses"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
              {t.fleet.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-md">
              {t.fleet.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-3 text-lg">
              <Star className="w-6 h-6 text-secondary-400 fill-secondary-400" />
              <span className="font-semibold">{localeParam === 'es' ? 'Calidad y Confort Garantizados' : localeParam === 'val' ? 'Qualitat i Confort Garantits' : 'Quality and Comfort Guaranteed'}</span>
              <Star className="w-6 h-6 text-secondary-400 fill-secondary-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section with Pattern Background */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/jpg/6.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-primary-100">
              <p className="text-lg md:text-xl text-gray-700 mb-8 text-center leading-relaxed">
                {t.fleet.description}
              </p>
              <div className="flex items-center justify-center space-x-3 text-primary-600 font-semibold text-lg bg-primary-50 rounded-lg py-4 px-6">
                <Wifi className="w-6 h-6" />
                <span>{t.fleet.wifi}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section with Elegant Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {localeParam === 'es' ? 'Equipamiento Premium' : localeParam === 'val' ? 'Equipament Premium' : 'Premium Equipment'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {localeParam === 'es' ? 'Todas las comodidades para su viaje perfecto' : localeParam === 'val' ? 'Totes les comoditats per al seu viatge perfecte' : 'All amenities for your perfect trip'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon
                return (
                  <div
                    key={amenity.name}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold text-center text-sm">{amenity.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Vehicles Gallery with Elegant Cards */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {localeParam === 'es' ? 'Nuestros Vehículos' : localeParam === 'val' ? 'Els Nostres Vehicles' : 'Our Vehicles'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {localeParam === 'es' ? 'Flota moderna y confortable para todas sus necesidades' : localeParam === 'val' ? 'Flota moderna i confortable per a totes les seves necessitats' : 'Modern and comfortable fleet for all your needs'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {fleetVehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={localeParam === 'es' ? `Autobús ${vehicle.capacity} plazas` : localeParam === 'val' ? `Autocar ${vehicle.capacity} places` : `Coach ${vehicle.capacity} seats`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-bold text-lg shadow-2xl backdrop-blur-sm">
                      {vehicle.capacity} {localeParam === 'es' ? 'plazas' : localeParam === 'val' ? 'places' : 'seats'}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {localeParam === 'es' ? `Autobús ${vehicle.capacity} plazas` : localeParam === 'val' ? `Autocar ${vehicle.capacity} places` : `Coach ${vehicle.capacity} seats`}
                    </h3>
                    <ul className="space-y-3">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Info Section with Background Image */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/9.jpg"
            alt="Autobús en carretera"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/80"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {localeParam === 'es' ? 'Capacidad de Nuestra Flota' :
                 localeParam === 'val' ? 'Capacitat de la Nostra Flota' :
                 'Our Fleet Capacity'}
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                {localeParam === 'es' ? 'Autocares con capacidad desde 35 hasta 63 plazas' :
                 localeParam === 'val' ? 'Autocars amb capacitat des de 35 fins a 63 places' :
                 'Coaches with capacity from 35 to 63 seats'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 md:p-12 border border-white/20 shadow-2xl">
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-secondary-400 flex-shrink-0 mt-1" />
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                  {localeParam === 'es' ? 'Todos nuestros vehículos cuentan con cinturones de seguridad en todas las butacas, aire acondicionado, WiFi gratuito y todas las comodidades necesarias para hacer su viaje más placentero. Nuestra flota está en constante renovación para garantizar los más altos estándares de calidad, seguridad y confort.' :
                   localeParam === 'val' ? 'Tots els nostres vehicles compten amb cinturons de seguretat en totes les butaques, aire condicionat, WiFi gratuït i totes les comoditats necessàries per fer el seu viatge més plaent. La nostra flota està en constant renovació per garantir els més alts estàndards de qualitat, seguretat i confort.' :
                   'All our vehicles have seat belts in all seats, air conditioning, free WiFi and all the amenities needed to make your trip more pleasant. Our fleet is constantly being renewed to guarantee the highest standards of quality, safety and comfort.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
