'use-client'
import { redirect, useParams } from 'next/navigation'
import { useGetCourseQuery } from '../../service/redux.service'
import { useState } from 'react'
import Modal from '../global/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatNumber } from '../../utils/format'
import LoadingPayment from '../animate/LoadingPayment'

export default function CourseDetails() {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const { courseId } = useParams()

  // Nếu courseId là mảng hoặc undefined, trả về undefined (không gọi API)
  const validCourseId = typeof courseId === 'string' ? courseId : undefined

  if (!validCourseId) {
    return <p>Invalid course ID</p>
  }

  const { data: course, isLoading, isFetching, error } = useGetCourseQuery(validCourseId)

  if (isLoading || isFetching) {
    return <LoadingPayment />
  }

  // if (error) {
  //   redirect('/')
  // }

  if (!course) {
    return <div className='text-center text-gray-700'>No course available.</div>
  }
  return (
    <div className='bg-white p-6'>
      <div className='container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12'>
        {/* Left Section */}
        <div className='md:w-1/2'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>{course?.title}</h1>
          <p className='text-lg text-gray-700 mb-6'>{course?.description}</p>

          <div className='flex items-center space-x-3 mb-5'>
            {/* Display instructor images */}
            <div className='flex -space-x-3'>
              {course?.instructors.length > 3 && (
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold border-2 border-white'>
                  +{course.instructors.length - 3}
                </div>
              )}
              {course?.instructors
                .slice(0, 3)
                .reverse()
                .map((instructor, index) => (
                  <Avatar key={index}>
                    <AvatarImage src={`${instructor.image}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ))}
            </div>

            {/* Instructor label */}
            <p className='text-gray-700'>
              Instructors:{' '}
              <a href='#' className='text-blue-600 underline'>
                {course?.instructors[0].userName}
              </a>{' '}
            </p>

            <button onClick={openModal} className='underline font-bold text-blue-600'>
              +{course?.instructors.length} more
            </button>
          </div>

          <button className='bg-blue-700 text-white py-3 px-6 w-60 rounded-lg hover:bg-blue-600 mb-4'>
            Enroll Now
            <p className='text-sm mt-1'>Starts Dec 2</p>
          </button>

          <p>
            <span className='font-bold'>{formatNumber(course.enrollment.totalEnrollments)}</span> already registered
          </p>
        </div>

        {/* Right Section */}
        <div className='md:w-1/2'>
          <img src='/assets/logos/AI.png' alt='Course Visual' className='rounded-lg shadow-lg w-full' />
        </div>
      </div>

      <div className='container mx-auto mt-12 p-6 rounded-lg shadow-xl border-2 '>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>5 course services</p>
            <p className='text-gray-500'>Get in-depth knowledge of a subject</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='text-blue-700 font-bold text-xl'>{course.review.averageRating} ★</p>
            <p className='text-gray-500'>({formatNumber(course.review.totalRatings)} reviews)</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>{course.difficultyLevel} level</p>
            <p className='text-gray-500'>No prior experience required</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>{course.duration} hours</p>
            <p className='text-gray-500'>at 10 hours a week</p>
          </div>

          <div className='text-center '>
            <p className='font-semibold text-lg'>Flexible schedule</p>
            <p className='text-gray-500'>Learn at your own pace</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title='Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4'>
          {course?.instructors.map((instructor, index) => (
            <div key={index} className='flex items-center space-x-3'>
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src={`${instructor.image}`} />
                <AvatarFallback>Instructor</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-bold'>{instructor.userName}</p>
                <p className='text-sm text-gray-500'>{'IBM'}</p>
                <p className='text-sm text-gray-500'>
                  {0} Courses • {0} learners
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
