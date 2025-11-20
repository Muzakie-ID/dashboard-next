'use client'

import SidebarDesktop from '@/components/SidebarDesktop'
import NavbarDesktop from '@/components/NavbarDesktop'
import Toast from '@/components/Toast'
import DetailModal from '@/components/DetailModal'
import { Clock, CheckCircle, AlertCircle, XCircle, Check, Edit2, Save } from 'lucide-react'
import { useState, useEffect } from 'react'

const STATUS_OPTIONS = ['Hadir', 'Sakit', 'Izin', 'Tidak Berangkat'] as const

const STATUS_COLORS = {
  'Hadir': { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-300' },
  'Sakit': { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-300' },
  'Izin': { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-300' },
  'Tidak Berangkat': { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-300' },
} as const

export default function AbsenPage() {
  const absenData = [
    {
      id: 1,
      nama: 'Budi Santoso',
      status: 'Hadir',
      jamMasuk: '07:30',
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      status: 'Izin',
      jamMasuk: null,
      icon: AlertCircle,
      bgColor: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      id: 3,
      nama: 'Ahmad Wijaya',
      status: 'Sakit',
      jamMasuk: null,
      icon: AlertCircle,
      bgColor: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
    },
    {
      id: 4,
      nama: 'Rini Susanti',
      status: 'Tidak Berangkat',
      jamMasuk: null,
      icon: XCircle,
      bgColor: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      id: 5,
      nama: 'Hendra Gunawan',
      status: 'Hadir',
      jamMasuk: '07:15',
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    },
    ...Array.from({ length: 95 }, (_, i) => ({
      id: i + 6,
      nama: `Guru ${i + 6}`,
      status: 'Hadir',
      jamMasuk: `07:${String(15 + Math.floor(Math.random() * 30)).padStart(2, '0')}`,
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
    })),
  ]

  const [jamMasukStandar, setJamMasukStandar] = useState('07:00')
  const [isEditingStandar, setIsEditingStandar] = useState(false)
  const [tempJamMasukStandar, setTempJamMasukStandar] = useState('07:00')

  const [absenStatus, setAbsenStatus] = useState<Record<number, string>>(() => {
    const initialStatus: Record<number, string> = {}
    absenData.forEach((item) => {
      initialStatus[item.id] = 'Hadir'
    })
    return initialStatus
  })
  const [jamMasukGuru, setJamMasukGuru] = useState<Record<number, string>>(() => {
    const initialJam: Record<number, string> = {}
    absenData.forEach((item) => {
      initialJam[item.id] = item.jamMasuk || ''
    })
    return initialJam
  })
  const [keterangan, setKeterangan] = useState<Record<number, string>>({
    2: '',
    3: '',
  })
  const [saveNotification, setSaveNotification] = useState<{ guruId: number; show: boolean; type: 'status' | 'keterangan'; timeoutId?: NodeJS.Timeout }>({ guruId: 0, show: false, type: 'status' })
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [selectedDetail, setSelectedDetail] = useState<{ id: number; nama: string; status: string; keterangan?: string; jamMasuk?: string } | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Calculate summary counts
  const summary = {
    hadir: Object.values(absenStatus).filter(s => s === 'Hadir').length,
    izin: Object.values(absenStatus).filter(s => s === 'Izin').length,
    sakit: Object.values(absenStatus).filter(s => s === 'Sakit').length,
    alpa: Object.values(absenStatus).filter(s => s === 'Tidak Berangkat').length,
  }

  // Pagination
  const totalPages = Math.ceil(absenData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = absenData.slice(startIndex, startIndex + itemsPerPage)

  // Filter by name
  const filteredData = absenData.filter(item =>
    item.nama.toLowerCase().includes(searchName.toLowerCase())
  )
  const filteredTotalPages = Math.ceil(filteredData.length / itemsPerPage)
  const filteredStartIndex = (currentPage - 1) * itemsPerPage
  const filteredPaginatedData = filteredData.slice(filteredStartIndex, filteredStartIndex + itemsPerPage)

  useEffect(() => {
    return () => {
      // Cleanup timeout jika component unmount
      if (saveNotification.timeoutId) {
        clearTimeout(saveNotification.timeoutId)
      }
    }
  }, [saveNotification.timeoutId])

  const showSaveIndicator = (guruId: number, type: 'status' | 'keterangan') => {
    // Tampilkan toast
    const fieldName = type === 'status' ? 'Status' : 'Keterangan'
    setToastMessage(`${fieldName} tersimpan`)
    setShowToast(true)

    // Clear previous timeout jika ada
    if (saveNotification.timeoutId) {
      clearTimeout(saveNotification.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      setShowToast(false)
    }, 2000)

    setSaveNotification({ guruId, show: true, type, timeoutId })
  }

  // Helper function untuk check apakah guru terlambat
  const isTerlambat = (jamMasuk: string | null): boolean => {
    if (!jamMasuk) return false
    const [jamMasukH, jamMasukM] = jamMasuk.split(':').map(Number)
    const [standarH, standarM] = jamMasukStandar.split(':').map(Number)
    
    const jamMasukTotal = jamMasukH * 60 + jamMasukM
    const standarTotal = standarH * 60 + standarM
    
    return jamMasukTotal > standarTotal
  }

  // Helper function untuk hitung berapa menit terlambat
  const hitungMenitTerlambat = (jamMasuk: string | null): number | null => {
    if (!jamMasuk) return null
    const [jamMasukH, jamMasukM] = jamMasuk.split(':').map(Number)
    const [standarH, standarM] = jamMasukStandar.split(':').map(Number)
    
    const jamMasukTotal = jamMasukH * 60 + jamMasukM
    const standarTotal = standarH * 60 + standarM
    
    const selisih = jamMasukTotal - standarTotal
    return selisih > 0 ? selisih : null
  }

  const handleSaveJamMasukStandar = () => {
    setJamMasukStandar(tempJamMasukStandar)
    setIsEditingStandar(false)
    setToastMessage('Jam masuk standar berhasil diperbarui')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SidebarDesktop />
      <div className="flex-1 flex flex-col">
        <NavbarDesktop />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Absen Kehadiran</h1>
              <p className="text-gray-400 text-base">Riwayat dan status kehadiran guru</p>
            </div>

            {/* Info Note */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">Catatan:</span> Data akan otomatis tersimpan saat Anda mengubah status atau keterangan. Bisa diubah sampai 23:59 hari ini.
              </p>
            </div>

            {/* Standard Check-in Time Section */}
            <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <div className="flex items-start justify-between flex-col lg:flex-row lg:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    Jam Masuk Standar
                  </h3>
                  <p className="text-sm text-gray-300">Atur jam masuk standar untuk mendeteksi keterlambatan guru</p>
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  {!isEditingStandar ? (
                    <>
                      <div className="text-3xl font-bold text-purple-400">{jamMasukStandar}</div>
                      <button
                        onClick={() => {
                          setIsEditingStandar(true)
                          setTempJamMasukStandar(jamMasukStandar)
                        }}
                        className="p-2.5 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="time"
                        value={tempJamMasukStandar}
                        onChange={(e) => setTempJamMasukStandar(e.target.value)}
                        className="px-4 py-2.5 bg-white/10 border border-purple-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSaveJamMasukStandar}
                        className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsEditingStandar(false)}
                        className="px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        Batal
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Ringkasan</h3>
              <div className="grid grid-cols-4 gap-4">
                {/* Hadir */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-green-300 font-medium mb-2">Hadir</p>
                  <p className="text-2xl font-bold text-green-400">{summary.hadir}</p>
                </div>
                
                {/* Izin */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-yellow-300 font-medium mb-2">Izin</p>
                  <p className="text-2xl font-bold text-yellow-400">{summary.izin}</p>
                </div>
                
                {/* Sakit */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-orange-300 font-medium mb-2">Sakit</p>
                  <p className="text-2xl font-bold text-orange-400">{summary.sakit}</p>
                </div>
                
                {/* Alpa */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-red-300 font-medium mb-2">Alpa</p>
                  <p className="text-2xl font-bold text-red-400">{summary.alpa}</p>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
              <div className="flex gap-4 flex-col lg:flex-row lg:items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cari Nama Guru</label>
                  <input
                    type="text"
                    placeholder="Ketikkan nama guru..."
                    value={searchName}
                    onChange={(e) => {
                      setSearchName(e.target.value)
                      setCurrentPage(1) // Reset ke halaman pertama saat search
                    }}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>

                <button 
                  onClick={() => setSearchName('')}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Reset
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
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Jam Masuk</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {filteredPaginatedData.map((item, index) => {
                      const terlambat = absenStatus[item.id] === 'Hadir' && isTerlambat(jamMasukGuru[item.id])
                      const menitTerlambat = absenStatus[item.id] === 'Hadir' ? hitungMenitTerlambat(jamMasukGuru[item.id]) : null
                      
                      return (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm text-white">{item.nama}</td>
                          
                          {/* Jam Masuk */}
                          <td className="px-6 py-4">
                            {absenStatus[item.id] === 'Hadir' ? (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <input
                                  type="time"
                                  value={jamMasukGuru[item.id] || ''}
                                  onChange={(e) => {
                                    setJamMasukGuru({
                                      ...jamMasukGuru,
                                      [item.id]: e.target.value
                                    })
                                    showSaveIndicator(item.id, 'status')
                                  }}
                                  className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {terlambat && menitTerlambat !== null && (
                                  <span className="text-xs px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded font-semibold">Terlambat {menitTerlambat} menit</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">-</span>
                            )}
                          </td>
                          
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex gap-4 items-start flex-wrap">
                                {/* Button Status */}
                                <div className="flex gap-2 flex-wrap">
                                  {STATUS_OPTIONS.map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => {
                                        setAbsenStatus({
                                          ...absenStatus,
                                          [item.id]: status
                                        })
                                        showSaveIndicator(item.id, 'status')
                                      }}
                                      className={`px-3 py-2 text-xs font-medium rounded border-2 transition-all cursor-pointer ${
                                        absenStatus[item.id] === status
                                          ? STATUS_COLORS[status as keyof typeof STATUS_COLORS]?.bg + ' ' + STATUS_COLORS[status as keyof typeof STATUS_COLORS]?.border + ' ' + STATUS_COLORS[status as keyof typeof STATUS_COLORS]?.text
                                          : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-gray-300'
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                                
                                {/* Keterangan Input untuk Izin dan Sakit */}
                                {(absenStatus[item.id] === 'Izin' || absenStatus[item.id] === 'Sakit') && (
                                  <input
                                    type="text"
                                    placeholder={`Keterangan ${absenStatus[item.id]}`}
                                    value={keterangan[item.id] || ''}
                                    onChange={(e) => {
                                      setKeterangan({
                                        ...keterangan,
                                        [item.id]: e.target.value
                                      })
                                    }}
                                    onBlur={() => {
                                      if (keterangan[item.id]) {
                                        showSaveIndicator(item.id, 'keterangan')
                                      }
                                    }}
                                    className="flex-1 px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => {
                                setSelectedDetail({
                                  id: item.id,
                                  nama: item.nama,
                                  status: absenStatus[item.id] || 'Hadir',
                                  keterangan: keterangan[item.id] || undefined,
                                  jamMasuk: jamMasukGuru[item.id] || undefined,
                                })
                                setShowDetailModal(true)
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:shadow-xl"
                            >
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
              <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-400">Tampilkan:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                  >
                    <option value={5} className="bg-slate-800">5 data</option>
                    <option value={10} className="bg-slate-800">10 data</option>
                    <option value={15} className="bg-slate-800">15 data</option>
                    <option value={20} className="bg-slate-800">20 data</option>
                    <option value={50} className="bg-slate-800">50 data</option>
                    <option value={100} className="bg-slate-800">100 data</option>
                  </select>
                  <span className="text-sm text-gray-400">per halaman</span>
                </div>
                
                <p className="text-sm text-gray-400">
                  Menampilkan {filteredStartIndex + 1}-{Math.min(filteredStartIndex + itemsPerPage, filteredData.length)} dari {filteredData.length} data
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'border border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, filteredTotalPages))}
                    disabled={currentPage === filteredTotalPages}
                    className="px-3 py-1 text-sm border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* Detail Modal */}
      {selectedDetail && (
        <DetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedDetail(null)
          }}
          guruId={selectedDetail.id}
          guruName={selectedDetail.nama}
          status={selectedDetail.status}
          keterangan={selectedDetail.keterangan}
          jamMasuk={selectedDetail.jamMasuk}
          jamMasukStandar={jamMasukStandar}
        />
      )}
    </div>
  )
}
