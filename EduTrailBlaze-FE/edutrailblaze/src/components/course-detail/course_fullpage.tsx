'use client'
import CourseAbout from './course_about'
import CourseOutcome from './course_outcome'
import CourseDetails from './course_details'
import CourseLessons from './course_lessons'
import CourseHeader from './course_header'
import CourseSuggestion from './course_suggestion'
import Navigation from './course_nav'
import { useEffect, useState } from 'react'
import { stat } from 'fs'
import { RootState } from '../../redux/store'
import { Stack } from '@mui/material'
import LoadingPayment from '../animate/LoadingPayment'

export default function Course() {
  const [selected, setSelected] = useState<string>('about')
  const [showNavigation, setShowNavigation] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.getElementById('course-header')
      if (!headerElement) return

      const headerRect = headerElement.getBoundingClientRect()
      const sections = [
        { id: 'about', element: document.getElementById('about') },
        { id: 'outcomes', element: document.getElementById('outcomes') },
        { id: 'courses', element: document.getElementById('courses') },
        { id: 'suggestion', element: document.getElementById('suggestion') }
      ]

      //CourseHeader đã hoàn toàn ra khỏi màn hình
      if (headerRect.bottom <= 0) {
        setShowNavigation(true)
      } else {
        setShowNavigation(false)
      }

      //Xác định section
      for (let section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= window.innerHeight / 4) {
            setSelected(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
        <div className='relative'>
          {/* Header */}
          <div id='course-header'>
            <CourseHeader />
          </div>

          {/* CourseDetails */}
          {!showNavigation && <CourseDetails selected={selected} setSelected={setSelected} />}

          {/* Navigation */}
          {showNavigation && (
            <div className='sticky top-0 z-10 bg-white shadow-md'>
              <Navigation selected={selected} setSelected={setSelected} />
            </div>
          )}

          {/* Sections */}
          <div id='about' className='scroll-mt-44'>
            <CourseAbout />
          </div>
          <div id='outcomes' className='scroll-mt-44'>
            <CourseOutcome />
          </div>
          <div id='courses' className='scroll-mt-44'>
            <CourseLessons />
          </div>
          <div id='suggestion' className='scroll-mt-44'>
            <CourseSuggestion />
          </div>
        </div>

  )
}
