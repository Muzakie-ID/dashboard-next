'use client'

import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, show, onClose, duration = 2000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        const hideTimer = setTimeout(() => {
          onClose()
        }, 300)
        return () => clearTimeout(hideTimer)
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show, duration, onClose])

  if (!show && !isVisible) return null

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-[-10px]'
    }`}>
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl px-5 py-4 flex items-center gap-3 text-slate-800 border border-white/20">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={16} className="text-white" />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
