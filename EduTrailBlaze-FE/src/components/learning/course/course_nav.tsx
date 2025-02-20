import React, { useState, useEffect } from 'react'
import CourseDetails from './course_details'
import Link from 'next/link'

interface NavigationProps {
  courseDetails: ICourseDetails
  id: number
}

export default function Navigation({ courseDetails, id }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the course-header element
      const courseHeader = document.getElementById('course-header')
      if (!courseHeader) return
      // Get the bottom position of the course-header
      const headerBottom = courseHeader.getBoundingClientRect().bottom
      // Show navigation when we've scrolled past the header
      setIsVisible(headerBottom < 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  const items = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 transform translate-y-0'>
      <div className='container'>
        <div className='flex items-center justify-between py-4 border-b border-gray-200'>
          <div className='flex items-center'>
            <img src={courseDetails.imageURL} alt='Course logo' className='w-10 rounded-full' />
            <h2 className='font-semibold text-xl ml-5 truncate max-w-xl'>{courseDetails?.title || 'Course Title'}</h2>
          </div>
          <Link href={`/course/${id}/lecture/12`} target='_blank'>
            <button className='bg-blue-700 hover:bg-blue-600 text-white px-8 py-6 rounded'>
              <span className=''>Go to course</span>
            </button>
          </Link>
        </div>
        <div className='flex space-x-6 py-4 '>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
