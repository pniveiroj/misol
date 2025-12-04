import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const imageSchema = z.object({
  filename: z.string().min(1),
  path: z.string().min(1),
  alt: z.string().optional(),
  category: z.string().optional(),
  order: z.number().default(0),
})

// GET - Obtener todas las imágenes
export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category ? { category } : {}

    const images = await prisma.image.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })

    return NextResponse.json({ success: true, data: images })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al obtener imágenes' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva imagen (subir archivo)
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const alt = formData.get('alt') as string | null
    const category = formData.get('category') as string | null
    const order = parseInt(formData.get('order') as string) || 0

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No se proporcionó archivo' },
        { status: 400 }
      )
    }

    // Guardar archivo en public/images
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const filename = file.name
    const path = `/images/jpg/${filename}`
    const filePath = join(process.cwd(), 'public', 'images', 'jpg', filename)

    // Crear directorio si no existe
    await mkdir(join(process.cwd(), 'public', 'images', 'jpg'), { recursive: true })
    
    // Guardar archivo
    await writeFile(filePath, buffer)

    // Guardar en BD
    const image = await prisma.image.create({
      data: {
        filename,
        path,
        alt: alt || null,
        category: category || null,
        order,
      },
    })

    return NextResponse.json({ success: true, data: image })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al subir imagen' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar imagen
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Se requiere id' },
        { status: 400 }
      )
    }

    const image = await prisma.image.findUnique({ where: { id } })
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Imagen no encontrada' },
        { status: 404 }
      )
    }

    // Eliminar de BD
    await prisma.image.delete({ where: { id } })

    // Opcional: eliminar archivo físico
    // const filePath = join(process.cwd(), 'public', image.path)
    // await unlink(filePath).catch(() => {}) // Ignorar error si no existe

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error al eliminar imagen' },
      { status: 500 }
    )
  }
}

