'use client'

import { useEffect, useRef } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/redux/hooks/useAuth'
import { toast } from 'react-toastify'

export default function CustomerGuard({ children }: { children: React.ReactNode }) {
  const { isInstructor, isStudent } = useAuth()
  const router = useRouter()
  const { courseURL } = useParams()

  const pathname = usePathname()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (pathname === `/student/course/${courseURL}`) return
    if ((!isInstructor || !isStudent) && !hasRedirected.current) {
      hasRedirected.current = true
      toast.error("You don't have permission to access this page, you will be redirected to the home page")
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }, [isInstructor, isStudent, pathname])

  return pathname === `/student/course/${courseURL}` || isInstructor || isStudent ? <>{children}</> : null
}
