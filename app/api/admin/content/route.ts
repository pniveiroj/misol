import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const translationSchema = z.object({
  key: z.string().min(1),
  locale: z.enum(['es', 'val', 'en']),
  value: z.string(),
})

// GET - Obtener todas las traducciones o filtrar por locale
export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale')

    const where = locale ? { locale: locale as 'es' | 'val' | 'en' } : {}

    const translations = await prisma.translation.findMany({
      where,
      orderBy: [{ locale: 'asc' }, { key: 'asc' }],
    })

    return NextResponse.json({ success: true, data: translations })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al obtener contenido' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva traducción
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    
    const body = await request.json()
    const data = translationSchema.parse(body)

    const translation = await prisma.translation.upsert({
      where: {
        key_locale: {
          key: data.key,
          locale: data.locale,
        },
      },
      update: {
        value: data.value,
      },
      create: data,
    })

    return NextResponse.json({ success: true, data: translation })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al crear contenido' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar traducción
export async function PUT(request: NextRequest) {
  try {
    await requireAuth()
    
    const body = await request.json()
    const { id, ...data } = translationSchema.parse(body)

    const translation = await prisma.translation.update({
      where: {
        key_locale: {
          key: data.key,
          locale: data.locale,
        },
      },
      data: {
        value: data.value,
      },
    })

    return NextResponse.json({ success: true, data: translation })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al actualizar contenido' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar traducción
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    const locale = searchParams.get('locale')

    if (!key || !locale) {
      return NextResponse.json(
        { success: false, message: 'Se requiere key y locale' },
        { status: 400 }
      )
    }

    await prisma.translation.delete({
      where: {
        key_locale: {
          key,
          locale: locale as 'es' | 'val' | 'en',
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al eliminar contenido' },
      { status: 500 }
    )
  }
}

