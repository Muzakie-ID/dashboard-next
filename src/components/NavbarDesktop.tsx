'use client'

import { Bell, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NavbarDesktop() {
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-6 lg:px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-6">
        {/* Right Side */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Clock Display */}
          <div className="text-white font-mono text-lg">
            {time}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/20">
            <div className="text-right hidden lg:block">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 shadow-lg"
              >
                <User size={18} className="text-white" />
              </button>
              
              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/20 rounded-lg shadow-lg backdrop-blur-lg z-50">
                  <div className="p-3 space-y-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                      <LogOut size={16} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
