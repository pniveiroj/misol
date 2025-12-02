'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import ImageLightbox from '@/components/ui/ImageLightbox'
import type { Locale } from '@/lib/i18n'

interface FleetVehicle {
  capacity: string
  image: string
  features: string[]
}

interface FleetGalleryProps {
  vehicles: FleetVehicle[]
  locale: Locale
}

export default function FleetGallery({ vehicles, locale }: FleetGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
          >
            <div 
              className="relative h-72 w-full overflow-hidden cursor-pointer"
              onClick={() => {
                setLightboxIndex(index)
                setLightboxOpen(true)
              }}
            >
              <Image
                src={vehicle.image}
                alt={locale === 'es' ? `Autobús ${vehicle.capacity} plazas` : locale === 'val' ? `Autocar ${vehicle.capacity} places` : `Coach ${vehicle.capacity} seats`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-bold text-lg shadow-2xl backdrop-blur-sm">
                {vehicle.capacity} {locale === 'es' ? 'plazas' : locale === 'val' ? 'places' : 'seats'}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'es' ? `Autobús ${vehicle.capacity} plazas` : locale === 'val' ? `Autocar ${vehicle.capacity} places` : `Coach ${vehicle.capacity} seats`}
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

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={vehicles.map(v => v.image)}
          alt={vehicles.map(v => 
            locale === 'es' ? `Autobús ${v.capacity} plazas` : 
            locale === 'val' ? `Autocar ${v.capacity} places` : 
            `Coach ${v.capacity} seats`
          )}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

