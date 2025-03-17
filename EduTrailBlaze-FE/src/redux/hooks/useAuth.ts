import { useEffect, useState } from 'react'

export function useAuth() {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'))

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return { role, isInstructor: role === 'Instructor', isStudent: role === 'Student', isAdmin: role === 'Admin' }
}
