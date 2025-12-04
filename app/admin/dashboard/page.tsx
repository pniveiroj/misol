import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { FileText, Image, Settings, LogOut } from 'lucide-react'
import AdminLogout from '@/components/admin/AdminLogout'

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bienvenido, <strong>{user.username}</strong></span>
              <AdminLogout />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/content"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gestionar Contenido</h2>
                <p className="text-gray-600 text-sm">Editar textos y traducciones</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/images"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-100 p-3 rounded-lg">
                <Image className="w-8 h-8 text-secondary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gestionar Imágenes</h2>
                <p className="text-gray-600 text-sm">Subir y organizar imágenes</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 opacity-50">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-400">Configuración</h2>
                <p className="text-gray-400 text-sm">Próximamente</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

