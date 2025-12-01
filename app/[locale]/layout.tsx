import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppChat from '@/components/layout/WhatsAppChat'
import ClientArea from '@/components/layout/ClientArea'
import { locales, defaultLocale, isValidLocale, type Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import { notFound } from 'next/navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale
  
  const titles = {
    es: 'Autocares Mi-Sol | Transporte de Calidad en Elche',
    val: 'Autocars Mi-Sol | Transport de Qualitat a Elx',
    en: 'Autocares Mi-Sol | Quality Transport in Elche',
  }

  const descriptions = {
    es: 'Autocares Mi-Sol S.L. - Empresa de transporte con años de experiencia. Servicios de autocares, rutas escolares y transporte de grupos. Solicite su presupuesto sin compromiso.',
    val: 'Autocars Mi-Sol S.L. - Empresa de transport amb anys d\'experiència. Serveis d\'autocars, rutes escolars i transport de grups. Sol·liciti el seu pressupost sense compromís.',
    en: 'Autocares Mi-Sol S.L. - Transport company with years of experience. Coach services, school routes and group transport. Request your free quote.',
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: locale === 'es' ? 'autocares, transporte, Elche, rutas escolares, viajes, grupos' : 
              locale === 'val' ? 'autocars, transport, Elx, rutes escolars, viatges, grups' :
              'coaches, transport, Elche, school routes, trips, groups',
    authors: [{ name: 'Autocares Mi-Sol' }],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : locale === 'val' ? 'ca_ES' : 'en_US',
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const translations = getTranslations(locale)

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <ClientArea locale={locale} translations={translations} />
        <Header locale={locale} translations={translations} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer locale={locale} translations={translations} />
        <WhatsAppChat />
      </body>
    </html>
  )
}

