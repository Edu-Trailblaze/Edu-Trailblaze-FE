'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/redux/hooks/useAuth'
import { toast } from 'react-toastify'

export default function InstructorGuard({ children }: { children: React.ReactNode }) {
  const { isInstructor } = useAuth()
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!isInstructor && !hasRedirected.current) {
      hasRedirected.current = true
      toast.error("You don't have permission to access this page, you will be redirected to the home page")
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [isInstructor])

  return isInstructor ? <>{children}</> : null
}
