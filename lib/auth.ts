import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-in-production'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(userId: string): Promise<string> {
  const sessionId = `${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}`
  // En producción, deberías almacenar esto en una tabla de sesiones
  // Por ahora usamos cookies simples
  return sessionId
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!session?.value) {
    return null
  }

  // Extraer userId del session (formato: userId-timestamp-random)
  const userId = session.value.split('-')[0]
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, role: true }
    })
    return user
  } catch {
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

