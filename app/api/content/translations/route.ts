import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// API pública para obtener traducciones (sin autenticación)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') as 'es' | 'val' | 'en' | null

    if (!locale) {
      return NextResponse.json(
        { success: false, message: 'Se requiere locale' },
        { status: 400 }
      )
    }

    const translations = await prisma.translation.findMany({
      where: { locale },
    })

    // Convertir array a objeto anidado (como los JSON originales)
    const translationsObject: Record<string, any> = {}
    
    for (const t of translations) {
      const keys = t.key.split('.')
      let current = translationsObject
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = t.value
    }

    return NextResponse.json({ success: true, data: translationsObject })
  } catch (error) {
    console.error('Error al obtener traducciones:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener contenido' },
      { status: 500 }
    )
  }
}

