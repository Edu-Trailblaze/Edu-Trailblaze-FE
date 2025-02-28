'use client'
import { useParams } from 'next/navigation'
import { skipToken } from '@reduxjs/toolkit/query'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import { useGetSectionLectureQuery } from '../../../../../redux/services/lecture.service'
import { useGetCourseDetailsQuery } from '../../../../../redux/services/courseDetail.service'
import CourseHeader from '../CourseComponents/header/course_header'
import CourseDetails from '../CourseComponents/sections/course_details'
import Navigation from '../CourseComponents/navigation/course_nav'
import CourseAbout from '../CourseComponents/sections/course_about'
import CourseOutcome from '../CourseComponents/sections/course_outcome'
import CourseSection from '../CourseComponents/sections/course_section'
import CourseReview from '../CourseComponents/review/course_review'
import CourseSuggestion from '../CourseComponents/suggestion/course_suggestion'

export default function Course() {
  const { courseURL } = useParams()
  const { data: courseDetails, isLoading, isFetching, error } = useGetCourseDetailsQuery(Number(courseURL))
  const detail = courseDetails?.courseDetails
  const section = courseDetails?.sectionDetails
  const sectionId = section?.map((item) => item.id) || []

  //bỏ qua query nếu ko có data
  const { data: lecture, isFetching: isLectureFetching } = useGetSectionLectureQuery(
    sectionId.length > 0 ? sectionId : skipToken
  )
  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  if (!detail) return <div>No course available.</div>
  if (!section) return <div>No section available.</div>
  if (!lecture) return <div>No lecture available.</div>

  return (
    <div>
      {/* Header */}
      <div id='course-header'>
        <CourseHeader courseDetails={detail} sectionDetails={section} id={Number(courseURL)} />
      </div>

      {/* CourseDetails */}
      <div className='container'>
        <CourseDetails />

        {/* Navigation */}
        <div>
          <Navigation courseDetails={detail} id={Number(courseURL)} />
        </div>

        {/* Sections */}
        <div id='about' className='scroll-mt-40'>
          <CourseAbout courseDetails={detail} sectionDetails={section} />
        </div>
        <div id='outcomes' className='scroll-mt-60'>
          <CourseOutcome />
        </div>
        <div id='courses' className='scroll-mt-48'>
          <CourseSection courseDetails={detail} section={section} lecture={lecture} />
        </div>
        <div id='review' className='scroll-mt-48'>
          <CourseReview courseDetails={detail} courseId={Number(courseURL)} />
        </div>
        <div id='suggestion' className='scroll-mt-48'>
          <CourseSuggestion />
        </div>
      </div>
    </div>
  )
}
