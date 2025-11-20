'use client'

import { X, Calendar, User, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  guruName: string
  guruId: number
  status: string
  keterangan?: string
  jamMasuk?: string
  jamMasukStandar?: string
}

export default function DetailModal({
  isOpen,
  onClose,
  guruName,
  guruId,
  status,
  keterangan,
  jamMasuk,
  jamMasukStandar,
}: DetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden'
      return () => {
        // Re-enable body scroll
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Calculate lateness in minutes
  const calculateLateness = (): number | null => {
    if (!jamMasuk || !jamMasukStandar || status !== 'Hadir') return null
    const [jamH, jamM] = jamMasuk.split(':').map(Number)
    const [standarH, standarM] = jamMasukStandar.split(':').map(Number)
    const jamTotal = jamH * 60 + jamM
    const standarTotal = standarH * 60 + standarM
    const lateness = jamTotal - standarTotal
    return lateness > 0 ? lateness : null
  }

  const lateness = calculateLateness()

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case 'Hadir':
        return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'text-green-300' }
      case 'Izin':
        return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', label: 'text-yellow-300' }
      case 'Sakit':
        return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', label: 'text-orange-300' }
      case 'Tidak Berangkat':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'text-red-300' }
      default:
        return { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', label: 'text-gray-300' }
    }
  }

  const statusColor = getStatusColor(status)
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-white/10 max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{guruName}</h2>
            <p className="text-gray-400 text-sm">ID: {guruId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Status Card */}
          <div className={`${statusColor.bg} border ${statusColor.border} rounded-xl p-4 backdrop-blur-sm`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${statusColor.bg} border ${statusColor.border} flex items-center justify-center`}>
                {status === 'Hadir' && <CheckCircle size={24} className={statusColor.text} />}
                {(status === 'Izin' || status === 'Sakit') && <AlertCircle size={24} className={statusColor.text} />}
                {status === 'Tidak Berangkat' && <XCircle size={24} className={statusColor.text} />}
              </div>
              <div>
                <p className={`text-sm font-medium ${statusColor.label}`}>Status Hari Ini</p>
                <p className={`text-2xl font-bold ${statusColor.text}`}>{status}</p>
                {keterangan && <p className="text-xs text-gray-300 mt-1">Keterangan: {keterangan}</p>}
                {status === 'Hadir' && jamMasuk && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-400">Jam Masuk: <span className="text-gray-300 font-semibold">{jamMasuk}</span></p>
                    {lateness !== null && (
                      <p className="text-xs text-red-400">Terlambat: <span className="text-red-300 font-semibold">{lateness} menit</span></p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{today}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-green-300 font-medium mb-1">Hadir (Bulan)</p>
              <p className="text-xl font-bold text-green-400">18</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-300 font-medium mb-1">Izin (Bulan)</p>
              <p className="text-xl font-bold text-yellow-400">3</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-orange-300 font-medium mb-1">Sakit (Bulan)</p>
              <p className="text-xl font-bold text-orange-400">2</p>
            </div>
          </div>

          {/* Riwayat Kehadiran */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock size={20} />
              Riwayat Kehadiran (30 Hari Terakhir)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
              {[...Array(30)].map((_, day) => {
                const statuses = ['Hadir', 'Izin', 'Sakit', 'Tidak Berangkat']
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
                const date = new Date()
                date.setDate(date.getDate() - (29 - day))
                const dateStr = date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })

                return (
                  <div
                    key={day}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Calendar size={16} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{dateStr}</p>
                          {randomStatus !== 'Hadir' && (
                            <p className="text-xs text-gray-400">
                              {randomStatus === 'Izin' ? 'Mengurus keperluan' : randomStatus === 'Sakit' ? 'Sakit' : 'Tidak berangkat'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {randomStatus === 'Hadir' && (
                          <>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                              {randomStatus}
                            </span>
                            <span className="text-xs text-gray-400">07:15</span>
                          </>
                        )}
                        {randomStatus === 'Izin' && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                            {randomStatus}
                          </span>
                        )}
                        {randomStatus === 'Sakit' && (
                          <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                            {randomStatus}
                          </span>
                        )}
                        {randomStatus === 'Tidak Berangkat' && (
                          <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                            {randomStatus}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold text-blue-300">Informasi Tambahan</h4>
            <div className="space-y-1 text-sm text-gray-300">
              <p>• Email: guru{guruId}@sekolah.id</p>
              <p>• Kontak: 08xx-xxxx-xxxx</p>
              <p>• Bergabung sejak: 1 Januari 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
