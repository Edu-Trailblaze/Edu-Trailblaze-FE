'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineScreenShare } from 'react-icons/md'
import { BsChatLeftText } from 'react-icons/bs'
import { GrResources } from 'react-icons/gr'
import { GrDocumentPerformance } from 'react-icons/gr'
import { TbTool } from 'react-icons/tb'

const InstructorSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [sidebarHeight, setSidebarHeight] = useState('100vh')

  useEffect(() => {
    let lastScrollY = window.scrollY
    let animationFrameId: number | null

    const updateSidebarHeight = () => {
      const footer = document.querySelector('footer')
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sidebarMaxHeight = Math.max(60, windowHeight - Math.max(0, windowHeight - footerRect.top))
        setSidebarHeight(`${sidebarMaxHeight}px`)
      } else {
        setSidebarHeight('100vh')
      }
    }

    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 5) {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            updateSidebarHeight()
            animationFrameId = null
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateSidebarHeight)
    updateSidebarHeight()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateSidebarHeight)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const menuItems = [
    { icon: <MdOutlineScreenShare className='w-6 h-5' />, label: 'Courses', href: '/instructor/courses' },
    { icon: <BsChatLeftText className='w-6 h-5' />, label: 'Communication', href: '/instructor/communication' },
    { icon: <GrDocumentPerformance className='w-6 h-5' />, label: 'Performance', href: '/instructor/performance' },
    { icon: <TbTool className='w-6 h-5' />, label: 'Tools', href: '/instructor/tools' },
    { icon: <GrResources className='w-6 h-5' />, label: 'Resources', href: '/instructor/resources' }
  ]

  return (
    <div
      className={`fixed top-0 left-0 bg-[#2A57D8] text-white flex flex-col z-10 transition-all duration-100 ease-out shadow-lg`}
      style={{ width: isExpanded ? '200px' : '60px', height: sidebarHeight }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setTimeout(() => setIsExpanded(false), 500)}
    >
      <div className='py-4 pl-5 flex items-center'>
        <div className='text-white font-bold text-2xl flex items-center'>
          <span>E</span>
          {isExpanded && <span className='transition-opacity duration-300'>dutrailBlaze</span>}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center p-4 hover:bg-blue-800 ${index === 0 ? 'bg-blue-800' : ''}`}
          >
            <span className='w-6 text-center'>{item.icon}</span>
            {isExpanded && <span className='ml-4 transition-opacity duration-300'>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default InstructorSidebar
