'use client'

import { useState } from 'react'
import { User, X, LogIn, Lock, Mail } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import type { Translations } from '@/lib/get-translations'

interface ClientAreaProps {
  locale: Locale
  translations: Translations
}

export default function ClientArea({ locale, translations }: ClientAreaProps) {
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

  return (
    <>
      {/* Client Area Button */}
      <div className="fixed top-6 right-6 z-[60]">
        {isLoggedIn ? (
          <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{texts.welcome}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {texts.logout}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white hover:bg-gray-50 text-primary-600 rounded-full px-4 py-2 shadow-lg border border-gray-200 transition-all duration-300 flex items-center space-x-2 group"
            aria-label={texts.title}
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">{texts.title}</span>
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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 flex items-center justify-between">
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
              <form onSubmit={handleLogin} className="p-6 space-y-4">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <LogIn className="w-5 h-5" />
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

