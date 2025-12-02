import { Locale } from './i18n'
import es from '@/messages/es.json'
import val from '@/messages/val.json'
import en from '@/messages/en.json'

const translations = {
  es,
  val,
  en,
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}

export type Translations = typeof es


