'use client'
import React, { useEffect, useState } from 'react'

export default function CourseDetails() {
  const [activeItem, setActiveItem] = useState('about')

  const items = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'review', title: 'Review' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && items.some((item) => item.id === hash)) {
        setActiveItem(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <nav className='flex space-x-1 sm:space-x-2 md:space-x-4 py-4 mt-3 min-w-max'>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`px-3 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap transition-all duration-300 
                ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-blue-500'
                }`}
          onClick={() => setActiveItem(item.id)}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}
