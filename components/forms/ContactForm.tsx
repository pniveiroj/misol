'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2 } from 'lucide-react'
import type { Translations } from '@/lib/get-translations'
import type { Locale } from '@/lib/i18n'

export default function ContactForm({ translations, locale }: { translations: Translations; locale: Locale }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const errorMessages = {
    es: {
      name: 'El nombre debe tener al menos 2 caracteres',
      email: 'Email inválido',
      phone: 'Teléfono inválido',
      subject: 'El asunto debe tener al menos 5 caracteres',
      message: 'El mensaje debe tener al menos 10 caracteres',
    },
    val: {
      name: 'El nom ha de tenir almenys 2 caràcters',
      email: 'Email invàlid',
      phone: 'Telèfon invàlid',
      subject: 'L\'assumpte ha de tenir almenys 5 caràcters',
      message: 'El missatge ha de tenir almenys 10 caràcters',
    },
    en: {
      name: 'Name must be at least 2 characters',
      email: 'Invalid email',
      phone: 'Invalid phone',
      subject: 'Subject must be at least 5 characters',
      message: 'Message must be at least 10 characters',
    },
  }

  const errors = errorMessages[locale]

  const contactSchema = z.object({
    name: z.string().min(2, errors.name),
    email: z.string().email(errors.email),
    phone: z.string().min(9, errors.phone),
    subject: z.string().min(5, errors.subject),
    message: z.string().min(10, errors.message),
  })

  type ContactFormData = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {translations.contact.form.name} *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base min-h-[44px]"
            placeholder={translations.contact.form.name}
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600">{formErrors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {translations.contact.form.email} *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base min-h-[44px]"
            placeholder={translations.contact.form.email}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          {translations.contact.form.phone} *
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base min-h-[44px]"
          placeholder={translations.contact.form.phone}
        />
        {formErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{formErrors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {translations.contact.form.subject} *
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base min-h-[44px]"
          placeholder={translations.contact.form.subject}
        />
        {formErrors.subject && (
          <p className="mt-1 text-sm text-red-600">{formErrors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {translations.contact.form.message} *
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-base"
          placeholder={translations.contact.form.message}
        />
        {formErrors.message && (
          <p className="mt-1 text-sm text-red-600">{formErrors.message.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {translations.contact.form.success}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {translations.contact.form.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[48px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{translations.contact.form.sending}</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>{translations.contact.form.send}</span>
          </>
        )}
      </button>
    </form>
  )
}
