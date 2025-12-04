import { Locale } from './i18n'
import { prisma } from './prisma'
import es from '@/messages/es.json'
import val from '@/messages/val.json'
import en from '@/messages/en.json'

const fallbackTranslations = {
  es,
  val,
  en,
}

// Función para convertir array plano a objeto anidado
function buildNestedObject(translations: Array<{ key: string; value: string }>) {
  const result: Record<string, any> = {}
  
  for (const t of translations) {
    const keys = t.key.split('.')
    let current = result
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    
    // Intentar parsear si es JSON (para arrays)
    try {
      const parsed = JSON.parse(t.value)
      current[keys[keys.length - 1]] = parsed
    } catch {
      current[keys[keys.length - 1]] = t.value
    }
  }
  
  return result
}

export async function getTranslations(locale: Locale) {
  try {
    // Intentar leer de la BD
    const translations = await prisma.translation.findMany({
      where: { locale },
    })

    if (translations.length > 0) {
      const nested = buildNestedObject(translations)
      return nested as typeof es
    }
  } catch (error) {
    console.error('Error al leer traducciones de BD, usando fallback:', error)
  }

  // Fallback a JSON estático
  return fallbackTranslations[locale]
}

// Función síncrona para compatibilidad (usa fallback)
export function getTranslationsSync(locale: Locale) {
  return fallbackTranslations[locale]
}

export type Translations = typeof es




