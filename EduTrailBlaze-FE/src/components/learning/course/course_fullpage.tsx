'use client'
import CourseAbout from './course_about'
import CourseOutcome from './course_outcome'
import CourseDetails from './course_details'
import CourseHeader from './course_header'
import { useGetCourseDetailsQuery, useGetCourseQuery } from '../../../services/courseDetail.service'
import { useParams } from 'next/navigation'
import Loading from '../../animate/Loading'
import CourseSection from './course_section'
import CourseSuggestion from './course_suggestion'

export default function Course() {
  const { courseURL } = useParams()
  const { data: courseDetails, isLoading, isFetching, error } = useGetCourseDetailsQuery(Number(courseURL))
  // const { data: section}
  if (isLoading || isFetching) {
    return <Loading />
  }
  const detail = courseDetails?.courseDetails
  const section = courseDetails?.sectionDetails
  if (!detail) {
    return <div>No course available.</div>
  }
  if (!section) {
    return <div>No section available.</div>
  }

  return (
    <div>
      {/* Header */}
      <div id='course-header'>
        <CourseHeader courseDetails={detail} sectionDetails={section} />
      </div>

      {/* CourseDetails */}
      <CourseDetails />

      {/* Navigation */}
      {/* <div className='sticky top-0 z-10 bg-white shadow-md'>
          <Navigation  />
        </div> */}

      {/* Sections */}
      <div id='about'>
        <CourseAbout courseDetails={detail} sectionDetails={section} />
      </div>
      <div id='outcomes'>
        <CourseOutcome />
      </div>
      <div id='courses'>
        <CourseSection courseDetails={detail} section={section} />
      </div>
      <div id='suggestion'>
        <CourseSuggestion />
      </div>
    </div>
  )
}
