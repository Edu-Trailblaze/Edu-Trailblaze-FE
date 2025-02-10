'use-client'
import { useState } from 'react'
import Modal from '../global/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatNumber, getInstructorImage } from '../../utils/format'

export default function CourseHeader({ courseDetails, sectionDetails }: ICourseFull) {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  if (!courseDetails) {
    return <div>No course details available</div>
  }

  return (
    <div className='p-6 container bg-sky-200 rounded-lg'>
      <div className='mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12'>
        {/* Left Section */}
        <div className='w-1/2 pl-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>{courseDetails.title}</h1>
          <p className='text-lg text-gray-700 mb-6'>{courseDetails.description}</p>

          <div className='flex items-center space-x-3 mb-5'>
            {/* Display instructor images */}
            <div className='flex -space-x-3'>
              {courseDetails.instructors.length > 3 && (
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold border-2 border-white'>
                  +{courseDetails.instructors.length - 3}
                </div>
              )}
              {courseDetails.instructors
                .slice(0, 3)
                .reverse()
                .map((instructor, index) => (
                  <Avatar key={index}>
                    <AvatarImage src={getInstructorImage(instructor)} />
                  </Avatar>
                ))}
            </div>

            {/* Instructor label */}
            <p className='text-gray-700'>
              Instructors:{' '}
              <a href='#' className='text-blue-600 underline'>
                {courseDetails.instructors[0].userName}
              </a>{' '}
            </p>

            <button onClick={openModal} className='underline font-bold text-blue-600'>
              +{courseDetails.instructors.length} more
            </button>
          </div>

          <button className='bg-blue-700 text-white py-3 px-6 w-60 rounded-lg hover:bg-blue-600 mb-4'>
            Enroll Now
            <p className='text-sm mt-1'>Starts Dec 2</p>
          </button>

          <p>
            <span className='font-bold'>{formatNumber(courseDetails.enrollment.totalEnrollments)}</span> already
            registered
          </p>
        </div>

        {/* Right Section */}
        <div className='w-1/2 min-h-[400px] relative '>
          <img src={courseDetails.imageURL} alt='Course Visual' className='rounded-lg shadow-lg max-h-[400px] absolute right-10' />
        </div>
      </div>

      <div className='container mx-auto mt-12 p-6 rounded-lg border-2 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>5 course services</p>
            <p className='text-gray-500'>Get in-depth knowledge of a subject</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='text-blue-700 font-bold text-xl'>{courseDetails.review.averageRating} ★</p>
            <p className='text-gray-500'>({formatNumber(courseDetails.review.totalRatings)} reviews)</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>{courseDetails.difficultyLevel} level</p>
            <p className='text-gray-500'>No prior experience required</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>{courseDetails.duration} hours</p>
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
          {courseDetails.instructors.map((instructor, index) => (
            <div key={index} className='flex items-center space-x-3'>
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src={getInstructorImage(instructor)} />
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
