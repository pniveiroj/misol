import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'
import es from '../messages/es.json'
import val from '../messages/val.json'
import en from '../messages/en.json'

const prisma = new PrismaClient()

// Función recursiva para aplanar objetos anidados
function flattenObject(obj: any, prefix = '', result: { key: string; value: string }[] = []) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result)
      } else {
        result.push({
          key: newKey,
          value: Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : String(obj[key]),
        })
      }
    }
  }
  return result
}

async function main() {
  console.log('🚀 Iniciando migración de contenido...')

  // Crear usuario admin
  const adminPassword = await hashPassword('admin')
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { password: adminPassword },
    create: {
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    },
  })
  console.log('✅ Usuario admin creado/actualizado')

  // Migrar traducciones
  const locales = [
    { locale: 'es', data: es },
    { locale: 'val', data: val },
    { locale: 'en', data: en },
  ]

  for (const { locale, data } of locales) {
    console.log(`📝 Migrando traducciones para ${locale}...`)
    const flattened = flattenObject(data)

    for (const { key, value } of flattened) {
      await prisma.translation.upsert({
        where: {
          key_locale: {
            key,
            locale: locale as 'es' | 'val' | 'en',
          },
        },
        update: {
          value,
        },
        create: {
          key,
          locale: locale as 'es' | 'val' | 'en',
          value,
        },
      })
    }
    console.log(`✅ ${flattened.length} traducciones migradas para ${locale}`)
  }

  console.log('🎉 Migración completada!')
}

main()
  .catch((e) => {
    console.error('❌ Error en la migración:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

