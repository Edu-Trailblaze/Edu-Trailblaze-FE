import type { Metadata } from 'next'
import InstructorSidebar from '@/components/user/instructor/sidebar/InstructorSidebar'
import InstructorHeader from '@/components/user/instructor/instructorHeader/InstructorHeader'
import WebFooter from '@/components/global/footer/footer'
import '@/app/(user)/instructor/layout.css'
import ScrollReveal from '@/components/global/scrollReveal/ScrollReveal'

export const metadata: Metadata = {
  title: 'Edutrail Blaze',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='sticky top-0 z-10'>
        <InstructorHeader />
      </div>
      <InstructorSidebar />
      <div className='ml-16 min-h-screen'>{children}</div>
      <WebFooter />
    </>
  )
}
