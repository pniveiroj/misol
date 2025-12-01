import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import Image from 'next/image'

export default async function ContactoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)

  const benefits = [
    localeParam === 'es' ? 'Presupuestos sin compromiso' : localeParam === 'val' ? 'Pressupostos sense compromís' : 'Free quotes',
    localeParam === 'es' ? 'Atención personalizada' : localeParam === 'val' ? 'Atenció personalitzada' : 'Personalized attention',
    localeParam === 'es' ? 'Respuesta rápida' : localeParam === 'val' ? 'Resposta ràpida' : 'Quick response',
    localeParam === 'es' ? 'Soluciones a medida' : localeParam === 'val' ? 'Solucions a mida' : 'Tailored solutions',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/9.jpg"
            alt="Contacto"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {t.nav.contact}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg">
              {t.contact.title}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information with Image */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {localeParam === 'es' ? 'Información de Contacto' :
                 localeParam === 'val' ? 'Informació de Contacte' :
                 'Contact Information'}
              </h2>
              
              {/* Image */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-8">
                <Image
                  src="/images/jpg/7.jpg"
                  alt={localeParam === 'es' ? 'Oficinas' : localeParam === 'val' ? 'Oficines' : 'Offices'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {localeParam === 'es' ? 'Teléfono' : localeParam === 'val' ? 'Telèfon' : 'Phone'}
                    </h3>
                    <a
                      href="tel:+34965680319"
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                    >
                      {t.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {localeParam === 'es' ? 'Dirección' : localeParam === 'val' ? 'Adreça' : 'Address'}
                    </h3>
                    <p className="text-gray-600">
                      {t.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {localeParam === 'es' ? 'Horario de Atención' : localeParam === 'val' ? 'Horari d\'Atenció' : 'Opening Hours'}
                    </h3>
                    <p className="text-gray-600">
                      {t.contact.schedule}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-lg border border-primary-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {localeParam === 'es' ? '¿Por qué contactarnos?' :
                   localeParam === 'val' ? 'Per què contactar-nos?' :
                   'Why contact us?'}
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {localeParam === 'es' ? 'Envíenos un Mensaje' :
                 localeParam === 'val' ? 'Envieu-nos un Missatge' :
                 'Send us a Message'}
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <ContactForm translations={t} locale={localeParam} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with Background */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jpg/8.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/80"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.location.title}
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <div className="rounded-lg h-96 overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps?q=Calle+Juan+de+Herrera+15,+Elche,+Comunidad+Valenciana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={localeParam === 'es' ? 'Ubicación de Autocares Mi-Sol' : localeParam === 'val' ? 'Ubicació d\'Autocars Mi-Sol' : 'Autocares Mi-Sol Location'}
              ></iframe>
            </div>
            <p className="text-center text-gray-100 mt-6 text-lg">
              {t.contact.address}
            </p>
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Calle+Juan+de+Herrera+15,+Elche,+Comunidad+Valenciana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-secondary-200 underline text-lg font-semibold transition-colors"
              >
                {localeParam === 'es' ? 'Abrir en Google Maps' :
                 localeParam === 'val' ? 'Obrir a Google Maps' :
                 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
