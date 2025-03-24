'use client'
import { useParams } from 'next/navigation'
import { skipToken } from '@reduxjs/toolkit/query'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import { useGetSectionLectureQuery } from '../../../../../redux/services/lecture.service'
import {
  useGetCourseDetailsQuery,
  useGetCoursePageInformationQuery
} from '../../../../../redux/services/courseDetail.service'
import CourseHeader from '../CourseComponents/header/course_header'
import CourseDetails from '../CourseComponents/sections/course_details'
import Navigation from '../CourseComponents/navigation/course_nav'
import CourseAbout from '../CourseComponents/sections/course_about'
import CourseOutcome from '../CourseComponents/sections/course_outcome'
import CourseSection from '../CourseComponents/sections/course_section'
import CourseReview from '../CourseComponents/review/course_review'
import CourseSuggestion from '../CourseComponents/suggestion/course_suggestion'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import NotAvailable from '@/app/not-available/page'

export default function Course() {
  const { courseURL } = useParams()
  const [lectureURL, setLectureURL] = useState<number | undefined>()
  // const { data: courseDetails, isLoading, isFetching, error } = useGetCourseDetailsQuery(Number(courseURL))
  const {
    data: coursePage,
    isLoading: courseLoading,
    isFetching: courseFetching
  } = useGetCoursePageInformationQuery(Number(courseURL))
  // console.log('courseSectionInformation', coursePage?.courseSectionInformation)
  // const detail = courseDetails?.courseDetails
  const detail = coursePage?.courseSectionInformation.courseDetails
  // const section = courseDetails?.sectionDetails
  const section = coursePage?.courseSectionInformation.sectionDetails
  const sectionId = section?.map((item) => item.id) || []
  const recommendedCourses = coursePage?.recommendedCourses
  const [userId, setUserId] = useState('')

  const { data: lecture, isFetching: isLectureFetching } = useGetSectionLectureQuery(
    sectionId.length > 0 ? sectionId : skipToken
  )

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    try {
      if (token) {
        const decode = jwtDecode(token)
        setUserId(decode?.sub ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  useEffect(() => {
    if (lecture) {
      const firstLecture = lecture.find((section) => section.lectures.length > 0)?.lectures[0]
      if (firstLecture) {
        setLectureURL(firstLecture.id)
      }
    }
  }, [lecture])

  if (courseLoading || courseFetching || isLectureFetching) {
    return <LoadingPage />
  }

  if (!detail) return <div>No course available.</div>
  if (!section) return <div>No section available.</div>
  if (!lecture) return <NotAvailable />
  if (!lectureURL) return <div>No LectureURL</div>
  if (!recommendedCourses) return <div>No recommended courses available.</div>

  return (
    <div>
      {/* Header */}
      <div id='course-header'>
        <CourseHeader
          courseDetails={detail}
          sectionDetails={section}
          courseURL={Number(courseURL)}
          lectureURL={lectureURL}
          userId={userId}
        />
      </div>

      {/* CourseDetails */}
      <div className='container'>
        <CourseDetails />

        {/* Navigation */}
        <div>
          <Navigation courseDetails={detail} courseURL={Number(courseURL)} lectureURL={lectureURL} userId={userId} />
        </div>

        {/* Sections */}
        <div id='about' className='scroll-mt-40'>
          <CourseAbout courseDetails={detail} sectionDetails={section} />
        </div>

        {/* <div id='outcomes' className='scroll-mt-60'>
          <CourseOutcome />
        </div> */}
        <div id='outcomes' className='scroll-mt-60'>
          <CourseOutcome userId={userId} courseId={Number(courseURL)} />
        </div>

        <div id='courses' className='scroll-mt-48'>
          <CourseSection courseDetails={detail} section={section} lecture={lecture} />
        </div>
        <div id='review' className='scroll-mt-48'>
          <CourseReview courseDetails={detail} courseId={Number(courseURL)} />
        </div>
        <div id='suggestion' className='scroll-mt-48'>
          <CourseSuggestion recommendedCourses={recommendedCourses} />
        </div>
      </div>
    </div>
  )
}
