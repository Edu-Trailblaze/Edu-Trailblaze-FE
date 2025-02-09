'use client'
import CourseAbout from './course_about'
import CourseOutcome from './course_outcome'
import CourseDetails from './course_details'
import CourseLessons from './course_lessons'
import CourseHeader from './course_header'
import CourseSuggestion from './course_suggestion'
import Navigation from './course_nav'
import { useEffect, useState } from 'react'
import LoadingPayment from '../animate/LoadingPayment'
import { useGetCourseQuery } from '../../service/redux.service'

export default function Course() {
  // const [selected, setSelected] = useState<string>('about')
  // const [showNavigation, setShowNavigation] = useState<boolean>(false)

  const { data, isLoading, isFetching, error } = useGetCourseQuery(18)

  const detail = data?.courseDetails
  const section = data?.sectionDetails

  // Kiểm tra nếu courseDetails không phải là undefined
  if (!detail) {
    return <div>No course available.</div>;
  }

  if (!section) {
    return <div>No section available.</div>;
  }

  return (
    <div className='relative'>
      {/* Header */}
      <div id='course-header'>
      <CourseHeader courseDetails={detail} />
      </div>

      {/* CourseDetails */}
      <CourseDetails  />

      {/* Navigation */}
        {/* <div className='sticky top-0 z-10 bg-white shadow-md'>
          <Navigation  />
        </div> */}
   
      {/* Sections */}
      <div id='about'>
        <CourseAbout courseDetails={detail}/>
      </div>
      <div id='outcomes'>
        <CourseOutcome />
      </div>
      <div id='courses'>
        <CourseLessons courseDetails={detail} sectionDetails={section} />
      </div>
      <div id='suggestion'>
        <CourseSuggestion />
      </div>
    </div>
  )
}
