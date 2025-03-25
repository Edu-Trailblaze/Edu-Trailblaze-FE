'use client'

import ChatAgent from '@/components/chat/ChatAgent'
import { usePathname } from 'next/navigation'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    return (
      <>
        {children}
        <ChatAgent />
      </>
    )
  }

  return (
    <main className='main'>
      {children}
      <ChatAgent />
    </main>
  )
}
