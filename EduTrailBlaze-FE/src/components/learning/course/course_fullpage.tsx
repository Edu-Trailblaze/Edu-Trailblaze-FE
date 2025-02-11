'use client'
import CourseAbout from './course_about'
import CourseOutcome from './course_outcome'
import CourseDetails from './course_details'
import CourseLessons from './course_lessons'
import CourseHeader from './course_header'
import CourseSuggestion from './course_suggestion'
import { useGetCourseDetailsQuery } from '../../../services/courseDetail.service'
import { useParams } from 'next/navigation'
import Loading from '../../animate/Loading'

export default function Course() {
  const { courseId } = useParams()
  const numbericCourseId = Number(courseId);
  const { data, isLoading, isFetching, error } = useGetCourseDetailsQuery(numbericCourseId)
  if (isLoading || isFetching) {
    return <Loading />
  }
  const detail = data?.courseDetails
  const section = data?.sectionDetails 

  if (!detail) {
    return <div>No course available.</div>
  }
  if (!section) {
    return <div>No section available.</div>
  }

  

  return (
    <div className='relative'>
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
        <CourseLessons courseDetails={detail} sectionDetails={section} />
      </div>
      <div id='suggestion'>
        <CourseSuggestion />
      </div>
    </div>
  )
}
