'use client'

import { Bell, Search, User } from 'lucide-react'

export default function NavbarMobile() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-3 py-2 sticky top-16 z-40">
      <div className="flex items-center gap-2 justify-between">
        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg">
          <Bell size={16} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Mobile Profile Avatar Only */}
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 shadow-lg">
          <User size={14} className="text-white" />
        </div>
      </div>
    </div>
  )
}
