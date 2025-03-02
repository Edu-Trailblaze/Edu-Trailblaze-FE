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
  const [sidebarHeight, setSidebarHeight] = useState('898px')

  useEffect(() => {
    const updateSidebarHeight = () => {
      const footer = document.querySelector('footer') // Target the footer by its ID
      if (footer) {
        const footerHeight = footer.offsetHeight
        const windowHeight = window.innerHeight
        const sidebarMaxHeight = windowHeight - footerHeight // Subtract footer height and add a small padding (20px)
        setSidebarHeight(`${sidebarMaxHeight}px`)
      } else {
        // If footer isn’t present (e.g., on certain pages), use full viewport height
        setSidebarHeight('100vh')
      }
    }

    updateSidebarHeight()
    window.addEventListener('resize', updateSidebarHeight)
    window.addEventListener('scroll', updateSidebarHeight) // Optional: Update on scroll if needed

    return () => {
      window.removeEventListener('resize', updateSidebarHeight)
      window.removeEventListener('scroll', updateSidebarHeight)
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
      className='fixed top-0 left-0 bg-[#2A57D8] text-white flex flex-col transition-all duration-300 z-10'
      style={{
        width: isExpanded ? '240px' : '60px',
        height: sidebarHeight,
        maxHeight: sidebarHeight // Ensure it doesn’t exceed the calculated height
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
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
