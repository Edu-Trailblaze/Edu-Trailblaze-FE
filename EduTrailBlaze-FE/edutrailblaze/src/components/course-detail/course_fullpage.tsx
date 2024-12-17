'use client'
import CourseAbout from './course_about'
import CourseOutcome from './course_outcome'
import CourseDetails from './course_details'
import CourseLessons from './course_lessons'
import CourseHeader from './course_header'
import CourseSuggestion from './course_suggestion'

export default function Blog() {
  return (
    <div className='relative'>
      {/* Header */}
      <CourseHeader />
      <CourseDetails />
      {/* Sticky Navigation */}
      {/* <div className=" sticky top-0 z-10 bg-white shadow-md">
        <Navigation />
      </div> */}

      {/* Sections */}
      <div id='about'>
        <CourseAbout />
      </div>
      <div id='outcomes'>
        <CourseOutcome />
      </div>
      <div id='courses'>
        <CourseLessons />
      </div>
      <div id='suggestion'>
        <CourseSuggestion />
      </div>
    </div>
  )
}
