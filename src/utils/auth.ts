import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()

  const logout = () => {
    // Clear any auth data from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Redirect to login
    router.push('/login')
  }

  return { logout }
}
