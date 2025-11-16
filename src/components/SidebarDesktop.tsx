'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Settings, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

export default function SidebarDesktop() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      id: 'absen',
      label: 'Absen Kehadiran',
      icon: Clock,
      href: '/dashboard/absen',
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      href: '/dashboard/users',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
    },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 h-screen sticky top-0 flex flex-col backdrop-blur-lg overflow-y-auto overflow-x-hidden transition-all duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-1.5 rounded-full hover:shadow-lg transition-all duration-200 z-10"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Header */}
      <div className={`p-6 flex items-center gap-3 border-b border-white/10 ${isOpen ? '' : 'justify-center'}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="min-w-0">
            <h1 className="text-white font-bold text-lg truncate">Dashboard</h1>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isOpen ? '' : 'justify-center'} ${
                active
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-2">
      </div>
    </div>
  )
}
