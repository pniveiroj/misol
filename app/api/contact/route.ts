import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar los datos
    const validatedData = contactSchema.parse(body)
    
    // Aquí iría la lógica para enviar el email
    // Por ejemplo, usando SendGrid, Resend, o Nodemailer
    // Por ahora solo simulamos el envío
    
    console.log('Formulario de contacto recibido:', validatedData)
    
    // TODO: Implementar envío de email
    // Ejemplo con SendGrid:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contacto: ${validatedData.subject}`,
    //   html: `
    //     <h2>Nuevo mensaje de contacto</h2>
    //     <p><strong>Nombre:</strong> ${validatedData.name}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     <p><strong>Teléfono:</strong> ${validatedData.phone}</p>
    //     <p><strong>Asunto:</strong> ${validatedData.subject}</p>
    //     <p><strong>Mensaje:</strong></p>
    //     <p>${validatedData.message}</p>
    //   `
    // })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.' 
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos inválidos', 
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar el mensaje. Por favor, inténtelo de nuevo.' 
      },
      { status: 500 }
    )
  }
}

