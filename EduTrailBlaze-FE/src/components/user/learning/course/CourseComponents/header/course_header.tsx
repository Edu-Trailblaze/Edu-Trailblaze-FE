'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../ui/avatar'
import { formatNumber } from '../../../../../../helper/format'
import Modal from '../../../../../global/Modal/Modal'
import { useGetCheckCourseStatusQuery, usePostEnrollMutation } from '../../../../../../redux/services/enroll.service'
import { usePostCartMutation } from '../../../../../../redux/services/cart.service'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../../../../../redux/slice/cart.slice'
import Button from '../../../../../global/Button/Button'
import { toast } from 'react-toastify'
import { BookOpen, Star, Award, Clock, Users, ArrowRight, ShoppingCart } from 'lucide-react'

interface CourseHeaderProps extends ICourseFull {
  courseDetails: ICourseDetails
  sectionDetails: ISection[]
  courseURL: number
  lectureURL: number
  userId: string
}

export default function CourseHeader({
  courseDetails,
  sectionDetails,
  courseURL,
  lectureURL,
  userId
}: CourseHeaderProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const [postCart, { isLoading: isAddingToCart }] = usePostCartMutation()

  const dispatch = useDispatch()

  const { data: enroll, isLoading: checkLoading } = useGetCheckCourseStatusQuery({
    courseId: Number(courseURL),
    studentId: userId
  })

  const [postEnroll, { isLoading: postLoading }] = usePostEnrollMutation()

  const handleEnroll = async () => {
    try {
      await postEnroll({
        courseId: Number(courseURL),
        studentId: userId
      }).unwrap()
      window.location.reload()
    } catch (error) {
      toast.error('Enrollment failed' + error)
    }
  }

  const handleAddToCart = async (userId: string, courseId: number) => {
    try {
      const result = await postCart({ userId, courseId }).unwrap()
      dispatch(addItemToCart(result.cartItems[result.cartItems.length - 1]))
      toast.success('Course added to cart please go to cart to checkout')
    } catch (error: any) {
      if (error.originalStatus === 400) toast.error('Course already in cart')
      else toast.error('Failed to add course to cart')
    }
  }

  return (
    <div className='relative mb-28'>
      {/* Hero section with gradient background */}
      <div className='bg-gradient-to-r from-sky-100 to-blue-200 p-16 md:p-24 lg:p-32 relative overflow-hidden'>
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-400'></div>
          <div className='absolute top-40 left-10 w-40 h-40 rounded-full bg-blue-500'></div>
          <div className='absolute bottom-10 right-40 w-32 h-32 rounded-full bg-blue-300'></div>
        </div>

        <div className='container'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-8 lg:space-x-16 relative z-10'>
            {/* Left Section */}
            <div className='w-full md:w-1/2 mb-8 md:mb-0'>
              <div className='inline-block bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4'>
                {courseDetails.difficultyLevel} Level
              </div>

              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
                {courseDetails.title}
              </h1>

              <p className='text-lg text-gray-800 mb-6 leading-relaxed'>{courseDetails.description}</p>

              <div className='flex flex-wrap gap-2 mb-6'>
                <p className='font-semibold text-gray-700 mr-2'>Categories:</p>
                {courseDetails.tags?.map((tag, index) => (
                  <div
                    key={index}
                    className='bg-white bg-opacity-70 text-blue-700 font-medium rounded-full px-4 py-1 text-sm shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white'
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className='flex items-center mb-6'>
                <div className='flex -space-x-3 mr-4'>
                  {courseDetails.instructors
                    .slice(0, 3)
                    .reverse()
                    .map((instructor, index) => (
                      <Avatar key={index} className='border-2 border-white'>
                        <AvatarImage src={instructor.profilePictureUrl} />
                        <AvatarFallback className='bg-blue-200 text-blue-800'>
                          {instructor.userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  {courseDetails.instructors.length > 3 && (
                    <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold border-2 border-white text-blue-800'>
                      +{courseDetails.instructors.length - 3}
                    </div>
                  )}
                </div>

                <div>
                  <p className='text-gray-700 font-medium'>
                    By{' '}
                    <span onClick={() => setModalOpen(true)} className='text-blue-600 hover:underline'>
                      {courseDetails.instructors[0].userName}
                    </span>
                    {courseDetails.instructors.length > 1 && (
                      <button onClick={openModal} className='ml-1 text-blue-600 hover:underline font-medium'>
                        + {courseDetails.instructors.length - 1} more
                      </button>
                    )}
                  </p>
                  <div className='flex items-center text-sm text-gray-600 mt-1'>
                    <Users size={14} className='mr-1' />
                    <span>{formatNumber(courseDetails.enrollment.totalEnrollments)} students enrolled</span>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <Button
                  variant='primary'
                  size='xl'
                  isLoading={checkLoading || postLoading || isAddingToCart}
                  className='flex items-center justify-center py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  {enroll?.status === 'Not bought' ? (
                    <div onClick={() => handleAddToCart(userId, courseURL)} className='flex items-center'>
                      <ShoppingCart size={20} className='mr-2' /> Add to cart
                    </div>
                  ) : enroll?.status === 'Not enrolled' ? (
                    <div onClick={() => handleEnroll()} className='flex items-center'>
                      <BookOpen size={20} className='mr-2' /> Enroll now
                    </div>
                  ) : (
                    <Link href={`/student/course/${courseURL}/lecture/${lectureURL}`} className='flex items-center'>
                      <ArrowRight size={20} className='mr-2' /> Go to course
                    </Link>
                  )}
                </Button>

                <div className='flex items-center'>
                  <Star size={20} className='text-yellow-500 mr-1' />
                  <span className='font-bold text-lg'>{courseDetails.review.averageRating}</span>
                  <span className='text-gray-500 text-sm ml-1'>
                    ({formatNumber(courseDetails.review.totalRatings)} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className='w-full md:w-1/2'>
              <div className='relative'>
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50'></div>
                <img
                  src={courseDetails.imageURL}
                  alt='Course Visual'
                  className='rounded-xl shadow-2xl object-cover w-full h-full relative z-10 border-4 border-white'
                />
                <div className='absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md z-20'>
                  <div className='flex items-center'>
                    <Clock size={16} className='text-blue-600 mr-2' />
                    <span className='font-medium'>{courseDetails.duration} hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course details stats card */}
      <div className='container px-4'>
        <div className='bg-white rounded-xl shadow-xl p-6 md:p-8 -mt-16 relative z-20 border border-gray-100'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6'>
            <div className='flex flex-col items-center p-4 border-b sm:border-b md:border-b-0 md:border-r border-gray-200'>
              <div className='p-3 bg-blue-100 rounded-full mb-3'>
                <BookOpen size={24} className='text-blue-600' />
              </div>
              <p className='font-bold text-xl mb-1'>{sectionDetails.length}</p>
              <p className='font-medium text-gray-800'>Course sections</p>
              <p className='text-sm text-gray-500 text-center'>Comprehensive curriculum</p>
            </div>

            <div className='flex flex-col items-center p-4 border-b sm:border-b md:border-b-0 md:border-r border-gray-200'>
              <div className='p-3 bg-yellow-100 rounded-full mb-3'>
                <Star size={24} className='text-yellow-600' />
              </div>
              <p className='font-bold text-xl mb-1'>{courseDetails.review.averageRating} ★</p>
              <p className='font-medium text-gray-800'>Rating</p>
              <p className='text-sm text-gray-500 text-center'>
                ({formatNumber(courseDetails.review.totalRatings)} reviews)
              </p>
            </div>

            <div className='flex flex-col items-center p-4 border-b sm:border-b md:border-b-0 md:border-r border-gray-200'>
              <div className='p-3 bg-green-100 rounded-full mb-3'>
                <Award size={24} className='text-green-600' />
              </div>
              <p className='font-bold text-xl mb-1'>{courseDetails.difficultyLevel}</p>
              <p className='font-medium text-gray-800'>Difficulty</p>
              <p className='text-sm text-gray-500 text-center'>Suitable for all levels</p>
            </div>

            <div className='flex flex-col items-center p-4 border-b sm:border-b md:border-b-0 md:border-r border-gray-200'>
              <div className='p-3 bg-purple-100 rounded-full mb-3'>
                <Clock size={24} className='text-purple-600' />
              </div>
              <p className='font-bold text-xl mb-1'>{courseDetails.duration}</p>
              <p className='font-medium text-gray-800'>Hours</p>
              <p className='text-sm text-gray-500 text-center'>Self-paced learning</p>
            </div>

            <div className='flex flex-col items-center p-4'>
              <div className='p-3 bg-red-100 rounded-full mb-3'>
                <Users size={24} className='text-red-600' />
              </div>
              <p className='font-bold text-xl mb-1'>{formatNumber(courseDetails.enrollment.totalEnrollments)}</p>
              <p className='font-medium text-gray-800'>Students</p>
              <p className='text-sm text-gray-500 text-center'>Join the community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructors Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Course Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courseDetails.instructors.map((instructor, index) => (
            <div
              key={index}
              className='rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300'
            >
              <Avatar className='h-16 w-16 border-2 border-blue-200'>
                <AvatarImage src={instructor.profilePictureUrl} />
                <AvatarFallback className='bg-blue-200 text-blue-800 text-lg'>
                  {instructor.userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-bold text-lg'>{instructor.userName}</p>
                <p className='text-sm text-gray-500'>Instructor</p>
                <button className='text-blue-600 text-sm hover:underline mt-1'>View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
