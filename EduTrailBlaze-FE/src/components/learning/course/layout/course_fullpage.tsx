'use client'

import CourseOutcome from '../sections/course_outcome'
import CourseDetails from '../sections/course_details'
import CourseHeader from '../header/course_header'
import { useGetCourseDetailsQuery, useGetCourseQuery } from '../../../../redux/services/courseDetail.service'
import { useParams } from 'next/navigation'
import CourseSection from '../sections/course_section'
import CourseSuggestion from '../suggestion/course_suggestion'
import { useGetSectionLectureQuery } from '../../../../redux/services/lecture.service'
import { skip } from 'node:test'
import { skipToken } from '@reduxjs/toolkit/query'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import Navigation from '../navigation/course_nav'
import CourseReview from '../review/course_review'
import CourseAbout from '../sections/course_about'

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
