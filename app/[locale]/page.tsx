import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/get-translations'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Fleet from '@/components/sections/Fleet'
import CTA from '@/components/sections/CTA'
import News from '@/components/sections/News'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const t = getTranslations(localeParam)

  return (
    <>
      <Hero translations={t} locale={localeParam} />
      <Services translations={t} locale={localeParam} />
      <About translations={t} locale={localeParam} />
      <Fleet translations={t} locale={localeParam} />
      <News translations={t} locale={localeParam} />
      <CTA translations={t} locale={localeParam} />
    </>
  )
}

