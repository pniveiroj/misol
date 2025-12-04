import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Permitir rutas de admin sin redirección de locale
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Verificar si el pathname ya tiene un locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si no tiene locale, redirigir al default
  if (!pathnameHasLocale) {
    const locale = defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  // Extraer el locale del pathname
  const pathnameLocale = pathname.split('/')[1]
  
  if (isValidLocale(pathnameLocale)) {
    // Si el locale es válido, continuar
    return NextResponse.next()
  }

  // Si el locale no es válido, redirigir al default
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}




