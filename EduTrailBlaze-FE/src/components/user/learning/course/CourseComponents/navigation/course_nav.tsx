import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useGetCheckCourseStatusQuery, usePostEnrollMutation } from '../../../../../../redux/services/enroll.service'
import { usePostCartMutation } from '../../../../../../redux/services/cart.service'
import { addItemToCart } from '../../../../../../redux/slice/cart.slice'
import { toast } from 'react-toastify'
import Button from '../../../../../global/Button/Button'

interface NavigationProps {
  courseDetails: ICourseDetails
  courseURL: number
  lectureURL: number
  userId: string
}

export default function Navigation({ courseDetails, courseURL, lectureURL, userId }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const [postCart, { isLoading: isAddingToCart }] = usePostCartMutation()

  const {
    data: enroll,
    isLoading: checkLoading,
    error
  } = useGetCheckCourseStatusQuery({ courseId: Number(courseURL), studentId: userId })

  const [postEnroll, { isLoading: postLoading }] = usePostEnrollMutation()

  const handleEnroll = async () => {
    try {
      await postEnroll({
        courseId: Number(courseURL),
        studentId: userId
      }).unwrap()
      window.location.reload()
    } catch (error) {
      console.error('Enrollment failed', error)
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

  useEffect(() => {
    const handleScroll = () => {
      const courseHeader = document.getElementById('course-header')
      if (!courseHeader) return
      const headerBottom = courseHeader.getBoundingClientRect().bottom
      setIsVisible(headerBottom < 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  const items = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'review', title: 'Review' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 transform translate-y-0'>
      <div className='container'>
        <div className='flex items-center justify-between py-4 border-b border-gray-200'>
          <div className='flex items-center '>
            <img src={courseDetails.imageURL} alt='Course logo' className='w-10 h-10 rounded-full' />
            <h2 className='font-semibold text-xl ml-5 truncate max-w-xl'>{courseDetails?.title || 'Course Title'}</h2>
          </div>
          {/* Enroll button */}
          <Button variant='primary' size='xl' isLoading={checkLoading || postLoading}>
            {enroll?.status === 'Not bought' ? (
              <div onClick={() => handleAddToCart(userId, courseURL)}>Add to cart</div>
            ) : enroll?.status === 'Not enrolled' ? (
              <div onClick={() => handleEnroll()}>Enroll</div>
            ) : (
              <Link href={`/student/course/${courseURL}/lecture/${lectureURL}`} target='_blank'>
                Go to course
              </Link>
            )}
          </Button>
        </div>
        <div className='flex space-x-6 py-4'>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
