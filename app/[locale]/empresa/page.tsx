import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { Award, FileCheck, Clock, Users } from 'lucide-react'
import Image from 'next/image'

export default async function EmpresaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)
  const certificates = [
    t.company.cert1,
    t.company.cert2,
    t.company.cert3,
    t.company.cert4,
  ]

  const values = [
    {
      icon: Clock,
      title: localeParam === 'es' ? 'Desde los años 40' : localeParam === 'val' ? 'Des dels anys 40' : 'Since the 1940s',
      description: localeParam === 'es' ? 'Más de 80 años de experiencia en el sector' : localeParam === 'val' ? 'Més de 80 anys d\'experiència al sector' : 'More than 80 years of experience in the sector',
    },
    {
      icon: Users,
      title: localeParam === 'es' ? 'Empresa Familiar' : localeParam === 'val' ? 'Empresa Familiar' : 'Family Business',
      description: localeParam === 'es' ? 'Tradición y valores familiares en cada servicio' : localeParam === 'val' ? 'Tradició i valors familiars en cada servei' : 'Tradition and family values in every service',
    },
    {
      icon: Award,
      title: localeParam === 'es' ? '4 Certificados ISO' : localeParam === 'val' ? '4 Certificats ISO' : '4 ISO Certificates',
      description: localeParam === 'es' ? 'Compromiso con la calidad y el medio ambiente' : localeParam === 'val' ? 'Compromís amb la qualitat i el medi ambient' : 'Commitment to quality and the environment',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/2.png"
            alt="Nuestra empresa"
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
              {t.company.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg">
              {localeParam === 'es' ? 'Empresa familiar desde los años 40' : 
               localeParam === 'val' ? 'Empresa familiar des dels anys 40' :
               'Family business since the 1940s'}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Image */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/3.png?v=2"
                  alt={localeParam === 'es' ? 'Nuestra empresa' : localeParam === 'val' ? 'La nostra empresa' : 'Our company'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
              </div>

              {/* Text Content */}
              <div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.company.description1}
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.company.description2}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t.company.description3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.company.certificates}
              </h2>
              <p className="text-xl text-gray-600">
                {localeParam === 'es' ? 'Garantía de calidad y compromiso' : localeParam === 'val' ? 'Garantia de qualitat i compromís' : 'Quality guarantee and commitment'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
