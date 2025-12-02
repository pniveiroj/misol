'use client'

import { useState } from 'react'
import { User, X, LogIn, Lock, Mail } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { Translations } from '@/lib/get-translations'

interface ClientAreaProps {
  locale: Locale
  translations: Translations
  inline?: boolean
}

export default function ClientArea({ locale, translations, inline = false }: ClientAreaProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de login ficticia
    if (email && password) {
      setIsLoggedIn(true)
      setIsOpen(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const loginTexts = {
    es: {
      title: 'Área de Cliente',
      subtitle: 'Accede a tu cuenta',
      email: 'Email',
      password: 'Contraseña',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      welcome: 'Bienvenido',
      forgot: '¿Olvidaste tu contraseña?',
    },
    val: {
      title: 'Àrea de Client',
      subtitle: 'Accedeix al teu compte',
      email: 'Email',
      password: 'Contrasenya',
      login: 'Iniciar Sessió',
      logout: 'Tancar Sessió',
      welcome: 'Benvingut',
      forgot: 'Has oblidat la teva contrasenya?',
    },
    en: {
      title: 'Client Area',
      subtitle: 'Access your account',
      email: 'Email',
      password: 'Password',
      login: 'Sign In',
      logout: 'Sign Out',
      welcome: 'Welcome',
      forgot: 'Forgot your password?',
    },
  }

  const texts = loginTexts[locale]

  const buttonClasses = inline 
    ? "bg-white hover:bg-gray-50 active:bg-gray-100 text-primary-600 rounded-lg w-[44px] h-[44px] md:w-auto md:h-[44px] md:px-4 border border-gray-200 transition-all duration-300 flex items-center justify-center p-0 md:px-4 md:space-x-2 group"
    : "bg-white hover:bg-gray-50 active:bg-gray-100 text-primary-600 rounded-full w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2 shadow-lg border border-gray-200 transition-all duration-300 flex items-center justify-center sm:space-x-2 group min-h-[44px] min-w-[44px]"

  return (
    <>
      {/* Client Area Button */}
      <div className={inline ? "relative" : "hidden md:block fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] lg:hidden"}>
        {isLoggedIn ? (
          <div className={`flex items-center space-x-2 sm:space-x-3 bg-white ${inline ? 'rounded-lg' : 'rounded-full'} px-3 sm:px-4 py-2 ${inline ? '' : 'shadow-lg'} border border-gray-200`}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{texts.welcome}</span>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 active:text-primary-800 font-medium px-2 py-1 min-h-[32px]"
            >
              {texts.logout}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={buttonClasses}
            aria-label={texts.title}
          >
            <User className="w-5 h-5 flex-shrink-0" />
            {inline && <span className="text-sm font-medium text-primary-600 hidden md:inline">{texts.title}</span>}
            {!inline && <span className="text-xs sm:text-sm font-medium hidden sm:inline">{texts.title}</span>}
          </button>
        )}
      </div>

      {/* Login Modal */}
      {isOpen && !isLoggedIn && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-[55]"
          />

          {/* Login Form */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] w-[calc(100vw-2rem)] sm:w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{texts.title}</h2>
                    <p className="text-sm text-white/90">{texts.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base min-h-[44px]"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    {texts.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base min-h-[44px]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span>{locale === 'es' ? 'Recordarme' : locale === 'val' ? 'Recorda\'m' : 'Remember me'}</span>
                  </label>
                  <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                    {texts.forgot}
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 text-white py-3 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl min-h-[48px] text-base"
                >
                  <LogIn className="w-5 h-5 flex-shrink-0" />
                  <span>{texts.login}</span>
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>
                    {locale === 'es' ? '¿No tienes cuenta?' : locale === 'val' ? 'No tens compte?' : 'Don\'t have an account?'}{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                      {locale === 'es' ? 'Regístrate' : locale === 'val' ? 'Registra\'t' : 'Sign up'}
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </>
        )}
    </>
  )
}

