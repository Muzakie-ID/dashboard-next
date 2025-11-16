'use client'

import { Bell, Search, User } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-3 md:px-6 lg:px-8 py-2 md:py-4 sticky top-16 md:top-0 z-40 md:z-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 md:gap-0">
        {/* Search Bar - Hidden on mobile, visible on sm and up */}
        <div className="flex-1 hidden sm:block max-w-xs md:max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="w-full pl-10 pr-3 py-2 md:py-2.5 bg-white/10 border border-white/20 rounded-lg text-xs md:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-6 justify-end sm:justify-start">
          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-lg">
            <Bell size={16} className="sm:w-5 sm:h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile - Hidden on mobile, visible on sm and up */}
          <div className="hidden sm:flex sm:items-center sm:gap-2 md:gap-3 sm:pl-3 md:pl-6 sm:border-l sm:border-white/20">
            <div className="text-right hidden lg:block">
              <p className="text-white text-xs md:text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 shadow-lg">
              <User size={16} className="text-white sm:w-5 sm:h-5" />
            </div>
          </div>

          {/* Mobile Profile Avatar Only */}
          <div className="sm:hidden w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 shadow-lg">
            <User size={14} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
