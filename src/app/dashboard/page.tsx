import SidebarDesktop from '@/components/SidebarDesktop'
import NavbarDesktop from '@/components/NavbarDesktop'
import { Users, GraduationCap, Home, CheckCircle, Stethoscope, FileText, HelpCircle, XCircle, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Guru',
      value: '45',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Total Siswa',
      value: '320',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Total Ruang Kelas',
      value: '12',
      icon: Home,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Total Kelas Tidak KBM',
      value: '2',
      icon: XCircle,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/20',
      iconColor: 'text-pink-400',
    },
    {
      title: 'Total Guru Hadir',
      value: '40',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
    {
      title: 'Total Sakit',
      value: '15',
      icon: Stethoscope,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      title: 'Total Izin',
      value: '8',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Total Tidak Ada Keterangan',
      value: '12',
      icon: HelpCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SidebarDesktop />
      <div className="flex-1 flex flex-col">
        <NavbarDesktop />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400 text-base">Selamat datang di panel admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <Icon size={20} className={stat.iconColor} />
                      </div>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-gray-400 text-xs mb-1">data</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Guru Sering Izin Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Guru Sering Izin */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Guru yang Sering Izin</h2>
                <div className="space-y-4">
                  {[
                    { nama: 'Siti Nurhaliza', count: 8, alasan: 'Mengurus anak' },
                    { nama: 'Hendri Kusuma', count: 6, alasan: 'Kondisi kesehatan' },
                    { nama: 'Dewi Santoso', count: 5, alasan: 'Acara keluarga' },
                    { nama: 'Bambang Suryanto', count: 4, alasan: 'Keperluan mendadak' },
                  ].map((guru, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium">{guru.nama}</h3>
                        <p className="text-gray-400 text-sm">{guru.alasan}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-yellow-400">{guru.count}x</p>
                        <p className="text-gray-400 text-xs">bulan ini</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rekapitulasi Izin */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Rekapitulasi Alasan Izin</h2>
                <div className="space-y-3">
                  {[
                    { alasan: 'Mengurus anak', count: 12, persen: 35 },
                    { alasan: 'Kondisi kesehatan', count: 9, persen: 26 },
                    { alasan: 'Acara keluarga', count: 8, persen: 24 },
                    { alasan: 'Keperluan mendadak', count: 5, persen: 15 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{item.alasan}</span>
                        <span className="text-sm font-semibold text-white">{item.count} ({item.persen}%)</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${item.persen}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
