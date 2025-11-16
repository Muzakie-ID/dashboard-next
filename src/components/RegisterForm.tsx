'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check, X } from 'lucide-react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepassword, setShowRepassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Password validation checks
  const passwordLength = password.length >= 6
  const passwordsMatch = password && repassword && password === repassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validasi
    if (password !== repassword) {
      setError('Password tidak cocok!')
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter!')
      return
    }

    setLoading(true)

    try {
      // TODO: Implementasi register API
      console.log('Register:', { email, username, password })
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess('Register berhasil! Silakan login.')
      setEmail('')
      setUsername('')
      setPassword('')
      setRepassword('')
      
    } catch (err) {
      setError('Register gagal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md space-y-6 sm:space-y-8">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Buat Akun Baru</h2>
            <p className="text-gray-300 text-xs sm:text-sm">Bergabunglah dengan komunitas kami</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="rounded-lg sm:rounded-xl bg-red-500/20 border border-red-500/50 p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-medium text-red-200">{error}</p>
            </div>
          )}
          {success && (
            <div className="rounded-lg sm:rounded-xl bg-green-500/20 border border-green-500/50 p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-medium text-green-200">{success}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Pilih username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 pr-10"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordLength ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <X size={14} className="text-red-400" />
                  )}
                  <span className={`text-xs ${passwordLength ? 'text-green-400' : 'text-red-400'}`}>
                    {passwordLength ? 'Password cukup panjang' : 'Password minimal 6 karakter'}
                  </span>
                </div>
              )}
            </div>

            {/* Repassword Input */}
            <div>
              <label htmlFor="repassword" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="repassword"
                  name="repassword"
                  type={showRepassword ? 'text' : 'password'}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 pr-10"
                  placeholder="Ulangi password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowRepassword(!showRepassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showRepassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {repassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordsMatch ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <X size={14} className="text-red-400" />
                  )}
                  <span className={`text-xs ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                    {passwordsMatch ? 'Password cocok' : 'Password tidak cocok'}
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !passwordLength || !passwordsMatch}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6 sm:mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sedang membuat akun...
                </span>
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-slate-900/50 text-gray-400">Atau</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-300 text-xs sm:text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-200">
                Login di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs">
          <p>© 2025 Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
