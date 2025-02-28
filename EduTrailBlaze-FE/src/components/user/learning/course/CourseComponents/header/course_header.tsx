'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useGetUserProfileQuery } from '../../../../../redux/services/user.service'
import { Avatar } from '@mui/material'
import { AvatarFallback, AvatarImage } from '../../../../ui/avatar'
import { formatNumber } from '../../../../../utils/format'
import Modal from '../../../../global/Modal/Modal'

interface CourseHeaderProps extends ICourseFull {
  courseDetails: ICourseDetails
  sectionDetails: ISection[]
  id: number
}

export default function CourseHeader({ courseDetails, sectionDetails, id }: CourseHeaderProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const { data: instructorURL } = useGetUserProfileQuery('aca1c0c4-d195-4208-b1ed-0a89f55b7e09')

  return (
    <div className='p-6 bg-sky-200 relative mb-20'>
      <div className='flex items-center md:space-y-0 md:space-x-12 container mb-20'>
        {/* Left Section */}
        <div className='w-1/2'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>{courseDetails.title}</h1>
          <p className='text-lg text-gray-800 mb-3'>{courseDetails.description}</p>
          <div className='mb-5'>
            <div className='flex gap-3 items-center'>
              <p className='font-semibold '>Categories:</p>
              {/* {courseDetails.tags?.map((tag, index) =>
               <div key={index} className='bg-blue-300 rounded-full h-full  p-3'>{String(tag)}</div>
            )} */}
              <ul className='flex flex-wrap gap-2'>
                {courseDetails.tags?.map((tag, index) => (
                  <li
                    key={index}
                    className='bg-blue-300 text-blue-900 font-medium rounded-full px-4 py-2 text-sm shadow-md transition-all duration-300 hover:bg-blue-400 hover:text-white'
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex items-center space-x-3 mb-5'>
            {/* Display instructor images */}
            <div className='flex -space-x-3 '>
              {courseDetails.instructors.length > 3 && (
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center text-sm font-semibold border-2 border-white'>
                  +{courseDetails.instructors.length - 3}
                </div>
              )}
              {courseDetails.instructors
                .slice(0, 3)
                .reverse()
                .map((instructor, index) => (
                  <Avatar key={index}>
                    <AvatarImage src={instructor.profilePictureUrl} />
                    <AvatarFallback>CN</AvatarFallback>
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
          <Link href={`/course/${id}/lecture/12`} target='_blank'>
            <button className='bg-blue-700 text-white py-5 w-60 rounded-lg hover:bg-blue-600 mb-2'>Go to course</button>
          </Link>
          <p>
            <span className='font-bold mt-10'>{formatNumber(courseDetails.enrollment.totalEnrollments)}</span>
            already registered
          </p>
        </div>

        {/* Right Section */}
        <div className='w-1/2 min-h-[400px] ml-auto'>
          <img src={courseDetails.imageURL} alt='Course Visual' className='rounded-lg shadow-lg ml-auto ' />
        </div>
      </div>

      {/* Course details */}
      <div className='mx-auto p-6 rounded-lg border-2 bg-white container absolute bottom-[-60px] left-0 right-0 max-w-[1320px] z-0'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <div className='text-center md:border-r-2 border-gray-300 pr-2'>
            <p className='font-semibold text-lg'>{sectionDetails.length} course services</p>
            <p className='text-gray-500'>Get in-depth knowledge of a subject</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300 pr-2'>
            <p className='text-blue-700 font-bold text-xl '>{courseDetails.review.averageRating} ★</p>
            <p className='text-gray-500'>({formatNumber(courseDetails.review.totalRatings)} reviews)</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300 pr-2'>
            <p className='font-semibold text-lg'>{courseDetails.difficultyLevel} level</p>
            <p className='text-gray-500'>No prior experience required</p>
          </div>

          <div className='text-center md:border-r-2 border-gray-300 pr-2'>
            <p className='font-semibold text-lg'>{courseDetails.duration} hours</p>
            <p className='text-gray-500'>at 10 hours a week</p>
          </div>

          <div className='text-center pr-2'>
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
                <AvatarImage src={instructor.profilePictureUrl} />
              </Avatar>
              <div>
                <p className='font-bold'>{instructor.userName}</p>
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
