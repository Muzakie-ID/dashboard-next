import SidebarDesktop from '@/components/SidebarDesktop'
import NavbarDesktop from '@/components/NavbarDesktop'

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SidebarDesktop />
      <div className="flex-1 flex flex-col">
        <NavbarDesktop />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
              <p className="text-gray-400 text-base">Kelola pengguna dashboard</p>
            </div>

            {/* Empty State */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Halaman Users</h2>
              <p className="text-gray-400 text-base max-w-md mx-auto">
                Konten halaman users akan ditampilkan di sini. Fokus pengembangan frontend terlebih dahulu.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
