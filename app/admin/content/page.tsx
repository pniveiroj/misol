import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import ContentEditor from '@/components/admin/ContentEditor'

export default async function AdminContent() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <a href="/admin/dashboard" className="text-primary-600 hover:text-primary-700">
                ← Volver
              </a>
              <h1 className="text-2xl font-bold text-gray-900">Gestionar Contenido</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContentEditor />
      </main>
    </div>
  )
}

