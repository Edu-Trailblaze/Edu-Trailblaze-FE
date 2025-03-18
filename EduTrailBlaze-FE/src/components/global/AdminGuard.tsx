'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/redux/hooks/useAuth'
import { toast } from 'react-toastify'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!isAdmin && !hasRedirected.current) {
      hasRedirected.current = true
      toast.error("You don't have permission to access this page, redirecting to home...")
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [isAdmin])

  return isAdmin ? <>{children}</> : null
}
