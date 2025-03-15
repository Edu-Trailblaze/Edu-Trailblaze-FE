import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useGetCheckCourseStatusQuery, usePostEnrollMutation } from '../../../../../../redux/services/enroll.service'
import { usePostCartMutation } from '../../../../../../redux/services/cart.service'
import { addItemToCart } from '../../../../../../redux/slice/cart.slice'
import { toast } from 'react-toastify'
import Button from '../../../../../global/Button/Button'
import { Menu, X, ShoppingCart, BookOpen, ArrowRight, ChevronDown } from 'lucide-react'

interface NavigationProps {
  courseDetails: ICourseDetails
  courseURL: number
  lectureURL: number
  userId: string
}

export default function Navigation({ courseDetails, courseURL, lectureURL, userId }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const navRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const [postCart, { isLoading: isAddingToCart }] = usePostCartMutation()

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
      toast.error('Enrollment failed')
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

      // Update active section based on scroll position
      const sections = ['about', 'outcomes', 'courses', 'review', 'suggestion']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [navRef])

  if (!isVisible) return null

  const navItems = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'review', title: 'Review' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  return (
    <div
      ref={navRef}
      className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 transform animate-slideDown'
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between py-3 md:py-4'>
          {/* Logo and Title */}
          <div className='flex items-center flex-1 min-w-0'>
            <div className='relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm'>
              <img src={courseDetails.imageURL} alt='Course logo' className='object-cover h-full w-full' />
              <div className='absolute inset-0 ring-2 ring-white ring-opacity-60 rounded-full'></div>
            </div>
            <h2 className='font-semibold text-lg md:text-xl ml-3 md:ml-4 truncate max-w-xs md:max-w-md lg:max-w-xl'>
              {courseDetails?.title || 'Course Title'}
            </h2>
          </div>

          {/* Desktop Navigation Items */}
          <div className='hidden md:flex items-center space-x-1 lg:space-x-4 mx-4'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap
                  ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className='flex items-center'>
            <Button
              variant='primary'
              size='md'
              isLoading={checkLoading || postLoading || isAddingToCart}
              className='hidden md:flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300'
            >
              {enroll?.status === 'Not bought' ? (
                <div onClick={() => handleAddToCart(userId, courseURL)} className='flex items-center'>
                  <ShoppingCart size={18} className='mr-1' />
                  <span className='hidden lg:inline'>Add to cart</span>
                  <span className='lg:hidden'>Cart</span>
                </div>
              ) : enroll?.status === 'Not enrolled' ? (
                <div onClick={() => handleEnroll()} className='flex items-center'>
                  <BookOpen size={18} className='mr-1' />
                  <span className='hidden lg:inline'>Enroll now</span>
                  <span className='lg:hidden'>Enroll</span>
                </div>
              ) : (
                <Link
                  href={`/student/course/${courseURL}/lecture/${lectureURL}`}
                  target='_blank'
                  className='flex items-center'
                >
                  <ArrowRight size={18} className='mr-1' />
                  <span className='hidden lg:inline'>Go to course</span>
                  <span className='lg:hidden'>Start</span>
                </Link>
              )}
            </Button>

            {/* Mobile menu button */}
            <button
              className='md:hidden inline-flex items-center justify-center p-2 ml-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className='sr-only'>Open main menu</span>
              {mobileMenuOpen ? <X size={24} aria-hidden='true' /> : <Menu size={24} aria-hidden='true' />}
            </button>
          </div>
        </div>

        {/* Mobile navigation items */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='px-2 pt-2 pb-4 space-y-1 border-t border-gray-200'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                {item.title}
              </a>
            ))}

            {/* Mobile action button */}
            <div className='pt-2'>
              <Button
                variant='primary'
                size='lg'
                isLoading={checkLoading || postLoading}
                className='w-full flex items-center justify-center gap-2'
              >
                {enroll?.status === 'Not bought' ? (
                  <div onClick={() => handleAddToCart(userId, courseURL)} className='flex items-center'>
                    <ShoppingCart size={18} className='mr-2' /> Add to cart
                  </div>
                ) : enroll?.status === 'Not enrolled' ? (
                  <div onClick={() => handleEnroll()} className='flex items-center'>
                    <BookOpen size={18} className='mr-2' /> Enroll now
                  </div>
                ) : (
                  <Link
                    href={`/student/course/${courseURL}/lecture/${lectureURL}`}
                    target='_blank'
                    className='flex items-center'
                  >
                    <ArrowRight size={18} className='mr-2' /> Go to course
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator for mobile */}
      <div className='h-1 bg-gray-100 md:hidden'>
        <div
          className='h-full bg-blue-600 transition-all duration-300'
          style={{
            width: `${((navItems.findIndex((item) => item.id === activeSection) + 1) / navItems.length) * 100}%`
          }}
        ></div>
      </div>
    </div>
  )
}
