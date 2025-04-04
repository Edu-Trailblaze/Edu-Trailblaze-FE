'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineScreenShare } from 'react-icons/md'
import { BsChatLeftText } from 'react-icons/bs'
import { IoArrowUndo, IoBookOutline } from 'react-icons/io5'
import { FaPencilAlt } from 'react-icons/fa'
import { useParams } from 'next/navigation'

const InstructorEditSidebar = () => {
  const { courseId } = useParams()

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
    {
      icon: <MdOutlineScreenShare className='w-6 h-5' />,
      label: 'Courses Edit',
      href: `/instructor/edit/edit-course/${courseId}`
    },
    {
      icon: <IoBookOutline className='w-6 h-5' />,
      label: 'Section Edit',
      href: `/instructor/edit/edit-section/${courseId}`
    },
    {
      icon: <IoArrowUndo className='w-6 h-5' />,
      label: 'Dashboard',
      href: `/instructor/dashboard/coursePage`
    }
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

export default InstructorEditSidebar
