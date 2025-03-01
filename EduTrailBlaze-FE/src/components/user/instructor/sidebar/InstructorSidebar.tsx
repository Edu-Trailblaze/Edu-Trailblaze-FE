'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MdOutlineScreenShare } from 'react-icons/md'
import { BsChatLeftText } from 'react-icons/bs'
import { GrResources } from "react-icons/gr";
import { GrDocumentPerformance } from "react-icons/gr";
import { TbTool } from "react-icons/tb";

const InstructorSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const menuItems = [
    { icon: <MdOutlineScreenShare className='w-6 h-5' />, label: 'Courses', href: '/instructor/courses' },
    { icon: <BsChatLeftText className='w-6 h-5' />, label: 'Communication', href: '/instructor/communication' },
    { icon: <GrDocumentPerformance className='w-6 h-5' />, label: 'Performance', href: '/instructor/performance' },
    { icon: <TbTool className='w-6 h-5' />, label: 'Tools', href: '/instructor/tools' },
    { icon: <GrResources className='w-6 h-5' />, label: 'Resources', href: '/instructor/resources' }
  ]

  return (
    <div
      className='fixed top-0 left-0 h-screen bg-[#2A57D8] text-white flex flex-col transition-all duration-300 z-10'
      style={{ width: isExpanded ? '240px' : '60px' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className='py-4 pl-5 flex items-center'>
        <div className='text-white font-bold text-2xl flex items-center'>
          <span>E</span>
          {isExpanded && <span className='transition-opacity duration-300'>dutrailBlaze</span>}
        </div>
      </div>

      <div className='flex-1'>
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
