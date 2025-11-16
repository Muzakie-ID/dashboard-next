'use client'

import SidebarDesktop from '@/components/SidebarDesktop'
import NavbarDesktop from '@/components/NavbarDesktop'
import { Clock, CheckCircle, AlertCircle, XCircle, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AbsenPage() {
  const [selectedStatuses, setSelectedStatuses] = useState(['Hadir'])
  const [absenCheckboxes, setAbsenCheckboxes] = useState<Record<number, string>>({
    1: 'Hadir',
    2: 'Izin',
    3: 'Sakit',
    4: 'Tidak Berangkat',
    5: 'Hadir',
  })
  const [keterangan, setKeterangan] = useState<Record<number, string>>({
    2: '',
    3: '',
  })
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>({})
  const [saveNotification, setSaveNotification] = useState<{ guruId: number; show: boolean; type: 'status' | 'keterangan' }>({ guruId: 0, show: false, type: 'status' })

  useEffect(() => {
    if (saveNotification.show) {
      const timer = setTimeout(() => {
        setSaveNotification({ guruId: 0, show: false, type: 'status' })
      }, 2000)
      return () => clearInterval(timer)
    }
  }, [saveNotification.show])
  const absenData = [
    {
      id: 1,
      nama: 'Budi Santoso',
      status: 'Hadir',
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      status: 'Izin',
      icon: AlertCircle,
      bgColor: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      id: 3,
      nama: 'Ahmad Wijaya',
      status: 'Sakit',
      icon: AlertCircle,
      bgColor: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
    },
    {
      id: 4,
      nama: 'Rini Susanti',
      status: 'Tidak Berangkat',
      icon: XCircle,
      bgColor: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      id: 5,
      nama: 'Hendra Gunawan',
      status: 'Hadir',
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SidebarDesktop />
      <div className="flex-1 flex flex-col">
        <NavbarDesktop />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Absen Kehadiran</h1>
              <p className="text-gray-400 text-base">Riwayat dan status kehadiran guru</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
              <div className="flex gap-4 flex-col lg:flex-row lg:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Filter
                </button>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Nama</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {absenData.map((item, index) => {
                      return (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm text-white">{item.nama}</td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex gap-3 items-center whitespace-nowrap">
                                {['Hadir', 'Sakit', 'Izin', 'Tidak Berangkat'].map((status) => (
                                  <label key={status} className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={absenCheckboxes[item.id] === status}
                                      onChange={() => {
                                        setAbsenCheckboxes({
                                          ...absenCheckboxes,
                                          [item.id]: status
                                        })
                                        setSavedStatus({
                                          ...savedStatus,
                                          [item.id]: true
                                        })
                                      setSaveNotification({ guruId: item.id, show: true, type: 'status' })
                                      
                                      setTimeout(() => {
                                        setSavedStatus({
                                          ...savedStatus,
                                          [item.id]: false
                                        })
                                      }, 2000)
                                      }}
                                      className="w-4 h-4 cursor-pointer accent-green-500"
                                    />
                                    <span className="text-xs text-gray-300">{status}</span>
                                  </label>
                                ))}
                                {saveNotification.guruId === item.id && saveNotification.show && saveNotification.type === 'status' && (
                                  <div className="flex items-center gap-1 ml-1 text-green-400 text-xs">
                                    <Check size={14} />
                                    <span>Tersimpan</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Keterangan Input untuk Izin dan Sakit */}
                              {(absenCheckboxes[item.id] === 'Izin' || absenCheckboxes[item.id] === 'Sakit') && (
                                <div className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    placeholder={`Keterangan ${absenCheckboxes[item.id]}`}
                                    value={keterangan[item.id] || ''}
                                    onChange={(e) => {
                                      setKeterangan({
                                        ...keterangan,
                                        [item.id]: e.target.value
                                      })
                                    }}
                                    onBlur={() => {
                                      setSaveNotification({ guruId: item.id, show: true, type: 'keterangan' })
                                      setTimeout(() => {
                                        setSaveNotification({ guruId: 0, show: false, type: 'status' })
                                      }, 2000)
                                    }}
                                    className="flex-1 px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                  />
                                  {saveNotification.guruId === item.id && saveNotification.show && saveNotification.type === 'keterangan' && (
                                    <div className="flex items-center gap-1 text-green-400 text-xs whitespace-nowrap">
                                      <Check size={14} />
                                      <span>Tersimpan</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                              Detail
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-400">Menampilkan 1-5 dari 45 data</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">Sebelumnya</button>
                  <button className="px-3 py-1 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-1 text-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">2</button>
                  <button className="px-3 py-1 text-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">Selanjutnya</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
