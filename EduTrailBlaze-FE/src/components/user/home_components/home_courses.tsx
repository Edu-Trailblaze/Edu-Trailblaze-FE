'use client'
import {
  useGetAllCoursesQuery,
  useGetCourseByIdAndTagPagingQuery,
  useGetCourseByIdAndTagQuery,
  useGetTrendingCourseQuery
} from '@/redux/services/courseDetail.service'
import React, { useEffect, useRef, useState } from 'react'
import InstructorItem from './InstructorItem'
import { formatDate } from '@/helper/Util'
import { jwtDecode } from 'jwt-decode'
import { usePostCartMutation } from '@/redux/services/cart.service'
import { useDispatch } from 'react-redux'
import { addItemToCart, setCart } from '@/redux/slice/cart.slice'
import Link from 'next/link'
import SkeletonCard from '../../animate/skeleton/skeleton_card'
import { useGetTagQuery } from '@/redux/services/tag.service'
import LoginRequest from '@/components/global/requestNotification/requestLogin/RequestLogin'
import Modal from 'react-modal'
import '@/components/global/Modal/ReactModal.css'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { toast } from 'react-toastify'
import { formatCurrency } from '@/helper/format'

export default function HomeCourses() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [addingToCart, setAddingToCart] = useState<{ [key: string]: boolean }>({})
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  const [userId, setUserId] = useState('')
  const [selectedTag, setSelectedTag] = useState(1)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [visibleCards, setVisibleCards] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const {
    data: coursesPaging,
    isLoading: coursesPagingLoading,
    isFetching: coursesPagingFetching,
    status: coursesPagingStatus
  } = useGetCourseByIdAndTagPagingQuery({ tagId: selectedTag, studentId: userId, pageIndex: 1, pageSize: 8 })
  const {
    data: trendingCourses,
    isLoading: trendingCoursesLoading,
    isFetching: trendingCoursesFetching
  } = useGetTrendingCourseQuery({ studentId: userId, numberOfCourses: 8 })
  const { data: tags, isLoading: tagsLoading, isFetching: tagsFetching } = useGetTagQuery()
  const [postCart, { isLoading: isAddingToCart, isSuccess: addedToCart, error: cartError, status: cartStatus }] =
    usePostCartMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const paidCourses = coursesPaging?.items?.filter((course) => course.course.price > 0) ?? []
  const freeCourses = coursesPaging?.items?.filter((course) => course.course.price === 0) ?? []

  const coursesPerSlide = 4

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    try {
      if (token) {
        const decode = jwtDecode(token)
        setUserId(decode?.sub ?? '') // Use optional chaining and nullish coalescing
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize() // Set initial width

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth < 640) {
      setVisibleCards(1)
    } else if (windowWidth < 768) {
      setVisibleCards(2)
    } else if (windowWidth < 1024) {
      setVisibleCards(3)
    } else {
      setVisibleCards(4)
    }
  }, [windowWidth])

  const handleTagSelect = (index: number, tagId: number) => {
    setActiveIndex(index)
    setSelectedTag(tagId)
  }

  const handleAddToCart = async (userId: string, courseId: number) => {
    console.log(cartStatus, cartError)
    setAddingToCart((prev) => ({ ...prev, [courseId]: true }))
    try {
      if (userId === '' || userId === 'undefined') {
        setModalOpen(true)
        return
      }
      const result = await postCart({ userId, courseId }).unwrap()
      dispatch(addItemToCart(result.cartItems[result.cartItems.length - 1])) // Dispatch the action with the correct payload
      dispatch(setCart(result.cartItems))
      toast.success('Course added to cart please go to cart to checkout')
    } catch (error) {
      console.log('Error adding to cart: ', error)
      if ((error as any).originalStatus === 400) toast.error('Course already in cart')
    } finally {
      setAddingToCart((prev) => ({ ...prev, [courseId]: false }))
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const nextSlide = (courses: any[]) => {
    setCurrentIndex((prevIndex) =>
      prevIndex + coursesPerSlide >= (courses?.length ?? 0) ? 0 : prevIndex + coursesPerSlide
    )
  }

  const prevSlide = (courses: any[]) => {
    setCurrentIndex((prevIndex) =>
      prevIndex - coursesPerSlide < 0 ? (courses?.length ?? 0) - coursesPerSlide : prevIndex - coursesPerSlide
    )
  }

  // Get popup position based on screen size and card index
  const getPopupPosition = (index: number) => {
    if (windowWidth < 768) {
      return 'top-full left-0 mt-2' // Mobile: always below
    } else if (visibleCards === 1) {
      return 'top-0 left-full ml-4' // Single visible card: always right
    } else {
      // Determine if card is in first or second half of visible courses
      return index % visibleCards < visibleCards / 2
        ? 'top-1/2 -translate-y-1/2 left-full ml-4'
        : 'top-1/2 -translate-y-1/2 right-full mr-4'
    }
  }

  const renderStarRating = (rating: number) => {
    return (
      <div className='flex items-center'>
        <span className='mr-1 text-sm font-medium text-gray-700'>{rating.toFixed(1)}</span>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-400 opacity-50' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div>
        <div className='container'>
          <ul className='flex w-fit pt-[5px]'>
            {tags?.map((tags, index) => (
              <li
                key={index}
                className={`mr-1 cursor-pointer px-2 py-1 hover:bg-slate-100 ${
                  activeIndex === index ? 'border-b-2 border-black font-bold' : ''
                }`}
                onClick={() => handleTagSelect(index, tags.id)}
              >
                <button>{tags.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-[#F4F4F4] py-[20px]'>
          <div className='container'>
            {/** Premium courses layout */}
            <div>
              <div className='mb-[30px]'>
                <p className='mb-[10px] font-bold'>Invest in Yourself</p>
                <h1 className='text-4xl font-bold'>Unlock Learning with Premium Courses</h1>
                <p>Explore top-tier online courses from the world's leading universities and companies.</p>
              </div>

              {coursesPagingLoading || coursesPagingFetching ? (
                <div className='grid grid-cols-2 gap-6'>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : coursesPagingStatus === 'rejected' || paidCourses?.length === 0 ? (
                <p>No paid courses available at the moment.</p>
              ) : (
                <div className='relative'>
                  <button
                    onClick={() => prevSlide(paidCourses)}
                    className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -ml-3 md:-ml-4 hidden sm:block'
                    aria-label='Scroll left'
                  >
                    <ChevronLeft size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='flex pl-5 gap-3 md:gap-4 lg:gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
                    {paidCourses?.slice(currentIndex, currentIndex + coursesPerSlide).map((course, index) => (
                      <div
                        className='relative flex-shrink-0 snap-start w-full sm:w-1/2 md:w-1/3 lg:w-[300px] px-1'
                        key={course.course.id}
                      >
                        <Link href={`/student/course/${course.course.id}`}>
                          <div
                            className='relative transform transition duration-300 hover:scale-105 rounded-lg shadow-md w-full hover:shadow-xl bg-white border border-gray-200 p-3 hover:z-10 h-full flex flex-col'
                            onMouseEnter={() => setHoveredCourse(course.course.id)}
                            onMouseLeave={() => setHoveredCourse(null)}
                          >
                            {course.course.imageURL !== null ? (
                              <div className='mb-3 rounded-lg overflow-hidden'>
                                <img
                                  className='w-full h-32 sm:h-36 md:h-40 object-cover rounded-md'
                                  src={course.course.imageURL}
                                  alt='course_image'
                                />
                              </div>
                            ) : (
                              <div className='bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 mb-3 h-32 sm:h-36 md:h-40 rounded-lg' />
                            )}

                            <div className='px-1 mb-2 flex-grow'>
                              <h2 className='font-semibold text-base md:text-lg line-clamp-2 mb-1'>
                                {course.course.title}
                              </h2>
                              <p className='text-xs md:text-sm text-gray-600 mb-1'>
                                <span className='font-medium'>Instructor:</span>{' '}
                                <InstructorItem courseId={course.course.id} />
                              </p>
                              <div className='flex items-center space-x-1 mb-2'>
                                {/* <!-- Star icons --> */}
                                <div className='flex justify-between items-center'>
                                  {renderStarRating(course.review.averageRating)}
                                  <span className='text-gray-400 text-xs ml-1'>{`(${course.review.totalRatings})`}</span>
                                </div>
                              </div>

                              <div className='flex justify-between items-center mt-auto'>
                                <p className='text-base md:text-lg font-bold text-gray-900 '>
                                  {formatCurrency(course.course.price)}
                                </p>

                                <button
                                  key={course.course.id}
                                  className={`w-[150px] transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex justify-center items-center gap-2 ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-900'} text-white font-medium py-1 md:py-2 rounded-lg text-sm md:text-base`}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleAddToCart(userId, course.course.id)
                                  }}
                                  disabled={addingToCart[course.course.id]}
                                >
                                  {addingToCart[course.course.id] ? (
                                    <>
                                      <svg
                                        className='animate-spin h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                      >
                                        <circle
                                          className='opacity-25'
                                          cx='12'
                                          cy='12'
                                          r='10'
                                          stroke='currentColor'
                                          strokeWidth='4'
                                        ></circle>
                                        <path
                                          className='opacity-75'
                                          fill='currentColor'
                                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                      </svg>
                                      Adding...
                                    </>
                                  ) : (
                                    <p>Add to Cart</p>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {hoveredCourse === course.course.id && (
                          <div
                            className={`absolute w-80 bg-white p-4 rounded-xl border shadow-2xl z-[999]
                               ${
                                 index === 0
                                   ? 'left-[calc(100%)]' // First course: show on right
                                   : '-left-[320px]' // Other courses: show on left
                               } ${windowWidth < 768 ? 'w-full' : 'w-64 md:w-72 lg:w-80'} ${getPopupPosition(index)}`}
                            style={{
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <h4 className='font-semibold text-base md:text-lg mb-1'>{course.course.title}</h4>
                            <p className='text-xs md:text-sm text-gray-500 mb-2'>
                              Updated{' '}
                              <span className='text-green-600 font-medium'>{formatDate(course.course.updatedAt)}</span>
                            </p>
                            <div className='space-y-1 mb-3'>
                              <p className='text-xs md:text-sm text-gray-600'>• Duration: {course.course.duration}</p>
                              <p className='text-xs md:text-sm text-gray-600'>
                                • Difficulty: {course.course.difficultyLevel}
                              </p>
                              {windowWidth >= 768 && (
                                <p className='text-xs md:text-sm text-gray-600'>• {course.course.prerequisites}</p>
                              )}
                            </div>

                            {windowWidth >= 768 && (
                              <p className='text-gray-700 text-xs md:text-sm mb-3'>{course.course.description}</p>
                            )}

                            <div className='mb-3'>
                              <p className='text-xs md:text-sm font-medium mb-1'>What you'll learn:</p>
                              <ul className='space-y-1 text-xs md:text-sm text-gray-800'>
                                {course.course.learningOutcomes
                                  ?.slice(0, windowWidth < 768 ? 2 : 3)
                                  .map((outcome, idx) => (
                                    <li key={idx} className='flex items-start'>
                                      <span className='mr-2 text-green-600'>✔</span> {outcome}
                                    </li>
                                  ))}
                                {course.course.learningOutcomes?.length > (windowWidth < 768 ? 2 : 3) && (
                                  <li className='text-purple-600 text-xs md:text-sm'>
                                    + {course.course.learningOutcomes.length - (windowWidth < 768 ? 2 : 3)} more
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Arrow pointer */}
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border
                ${index === 0 ? 'left-0 -ml-2 border-l border-b' : 'right-0 -mr-2 border-t border-r'}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => nextSlide(paidCourses)}
                    className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -mr-3 md:-mr-4 hidden sm:block'
                    aria-label='Scroll right'
                  >
                    <ChevronRight size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
                    <button
                      className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-md transition hover:bg-blue-700 text-sm md:text-base'
                      type='button'
                    >
                      Explore All Courses
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/** Free courses layout */}
            <div className='mt-10'>
              <div className='mb-[30px]'>
                <p className='mb-[10px] font-bold'>100% free</p>
                <h1 className='text-4xl font-bold'>Start learning with free courses</h1>
                <p>Discover free online courses from the world's best universities and companies.</p>
              </div>

              {coursesPagingLoading || coursesPagingFetching ? (
                <div className='grid grid-cols-2 gap-6'>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : coursesPagingStatus === 'rejected' || freeCourses?.length === 0 ? (
                <p>No free courses available at the moment.</p>
              ) : (
                <div className='relative'>
                  <button
                    onClick={() => prevSlide(freeCourses)}
                    className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -ml-3 md:-ml-4 hidden sm:block'
                    aria-label='Scroll left'
                  >
                    <ChevronLeft size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='flex gap-3 md:gap-4 lg:gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory'>
                    {freeCourses?.slice(currentIndex, currentIndex + coursesPerSlide).map((course, index) => (
                      <div
                        className='relative flex-shrink-0 snap-start w-full sm:w-1/2 md:w-1/3 lg:w-[300px] px-1'
                        key={course.course.id}
                      >
                        <Link href={`/student/course/${course.course.id}`}>
                          <div
                            className='relative transform transition duration-300 hover:scale-105 rounded-lg shadow-md w-full hover:shadow-xl bg-white border border-gray-200 p-3 hover:z-10 h-full flex flex-col'
                            onMouseEnter={() => setHoveredCourse(course.course.id)}
                            onMouseLeave={() => setHoveredCourse(null)}
                          >
                            {course.course.imageURL !== null ? (
                              <div className='mb-3 rounded-lg overflow-hidden'>
                                <img
                                  className='w-full h-32 sm:h-36 md:h-40 object-cover rounded-md'
                                  src={course.course.imageURL}
                                  alt='course_image'
                                />
                              </div>
                            ) : (
                              <div className='bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 mb-3 h-32 sm:h-36 md:h-40 rounded-lg' />
                            )}

                            <div className='px-1 mb-2 flex-grow'>
                              <h2 className='font-semibold text-base md:text-lg line-clamp-2 mb-1'>
                                {course.course.title}
                              </h2>
                              <p className='text-xs md:text-sm text-gray-600 mb-1'>
                                <span className='font-medium'>Instructor:</span>{' '}
                                <InstructorItem courseId={course.course.id} />
                              </p>
                              <div className='flex items-center space-x-1 mb-2'>
                                {/* <!-- Star icons --> */}
                                <div className='flex justify-between items-center'>
                                  {renderStarRating(course.review.averageRating)}
                                  <span className='text-gray-400 text-xs ml-1'>{`(${course.review.totalRatings})`}</span>
                                </div>
                              </div>

                              <div className='flex justify-between items-center mt-auto'>
                                <p className='text-base md:text-lg font-bold text-gray-900 '>
                                  {formatCurrency(course.course.price)}
                                </p>

                                <button
                                  key={course.course.id}
                                  className={`w-[150px] transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex justify-center items-center gap-2 ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-900'} text-white font-medium py-1 md:py-2 rounded-lg text-sm md:text-base`}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleAddToCart(userId, course.course.id)
                                  }}
                                  disabled={addingToCart[course.course.id]}
                                >
                                  {addingToCart[course.course.id] ? (
                                    <>
                                      <svg
                                        className='animate-spin h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                      >
                                        <circle
                                          className='opacity-25'
                                          cx='12'
                                          cy='12'
                                          r='10'
                                          stroke='currentColor'
                                          strokeWidth='4'
                                        ></circle>
                                        <path
                                          className='opacity-75'
                                          fill='currentColor'
                                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                      </svg>
                                      Adding...
                                    </>
                                  ) : (
                                    <p>Go to Course</p>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {hoveredCourse === course.course.id && (
                          <div
                            className={`absolute w-80 bg-white p-4 rounded-xl border shadow-2xl z-[999]
                             ${
                               index === 0
                                 ? 'left-[calc(100%)]' // First course: show on right
                                 : '-left-[320px]' // Other courses: show on left
                             } ${windowWidth < 768 ? 'w-full' : 'w-64 md:w-72 lg:w-80'} ${getPopupPosition(index)}`}
                            style={{
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <h4 className='font-semibold text-base md:text-lg mb-1'>{course.course.title}</h4>
                            <p className='text-xs md:text-sm text-gray-500 mb-2'>
                              Updated{' '}
                              <span className='text-green-600 font-medium'>{formatDate(course.course.updatedAt)}</span>
                            </p>
                            <div className='space-y-1 mb-3'>
                              <p className='text-xs md:text-sm text-gray-600'>• Duration: {course.course.duration}</p>
                              <p className='text-xs md:text-sm text-gray-600'>
                                • Difficulty: {course.course.difficultyLevel}
                              </p>
                              {windowWidth >= 768 && (
                                <p className='text-xs md:text-sm text-gray-600'>• {course.course.prerequisites}</p>
                              )}
                            </div>

                            {windowWidth >= 768 && (
                              <p className='text-gray-700 text-xs md:text-sm mb-3'>{course.course.description}</p>
                            )}

                            <div className='mb-3'>
                              <p className='text-xs md:text-sm font-medium mb-1'>What you'll learn:</p>
                              <ul className='space-y-1 text-xs md:text-sm text-gray-800'>
                                {course.course.learningOutcomes
                                  ?.slice(0, windowWidth < 768 ? 2 : 3)
                                  .map((outcome, idx) => (
                                    <li key={idx} className='flex items-start'>
                                      <span className='mr-2 text-green-600'>✔</span> {outcome}
                                    </li>
                                  ))}
                                {course.course.learningOutcomes?.length > (windowWidth < 768 ? 2 : 3) && (
                                  <li className='text-purple-600 text-xs md:text-sm'>
                                    + {course.course.learningOutcomes.length - (windowWidth < 768 ? 2 : 3)} more
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Arrow pointer */}
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border
              ${index === 0 ? 'left-0 -ml-2 border-l border-b' : 'right-0 -mr-2 border-t border-r'}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => nextSlide(freeCourses)}
                    className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -mr-3 md:-mr-4 hidden sm:block'
                    aria-label='Scroll right'
                  >
                    <ChevronRight size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
                    <button
                      className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-md transition hover:bg-blue-700 text-sm md:text-base'
                      type='button'
                    >
                      Explore All Courses
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/** Trending courses layout */}
          <div className='container'>
            <div className='mt-10'>
              <div className='mb-[30px]'>
                <p className='mb-[10px] font-bold'>Our suggestion</p>
                <h1 className='text-4xl font-bold'>Explore trending courses</h1>
                <p>Courses on the top trends in the world today.</p>
              </div>

              {trendingCoursesLoading || trendingCoursesFetching ? (
                <div className='grid grid-cols-2 gap-6'>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : trendingCourses?.length === 0 ? (
                <p>No trending courses available at the moment.</p>
              ) : (
                <div className='relative'>
                  <button
                    onClick={() => prevSlide(trendingCourses ?? [])}
                    className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -ml-3 md:-ml-4 hidden sm:block'
                    aria-label='Scroll left'
                  >
                    <ChevronLeft size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='flex gap-3 md:gap-4 lg:gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory pl-5'>
                    {trendingCourses?.slice(currentIndex, currentIndex + coursesPerSlide).map((course, index) => (
                      <div
                        className='relative flex-shrink-0 snap-start w-full sm:w-1/2 md:w-1/3 lg:w-[300px] px-1'
                        key={course.course.id}
                      >
                        <Link href={`/student/course/${course.course.id}`}>
                          <div
                            className='relative transform transition duration-300 hover:scale-105 rounded-lg shadow-md w-full hover:shadow-xl bg-white border border-gray-200 p-3 hover:z-10 h-full flex flex-col'
                            onMouseEnter={() => setHoveredCourse(course.course.id)}
                            onMouseLeave={() => setHoveredCourse(null)}
                          >
                            {course.course.imageURL !== null ? (
                              <div className='mb-3 rounded-lg overflow-hidden'>
                                <img
                                  className='w-full h-32 sm:h-36 md:h-40 object-cover rounded-md'
                                  src={course.course.imageURL}
                                  alt='course_image'
                                />
                              </div>
                            ) : (
                              <div className='bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 mb-3 h-32 sm:h-36 md:h-40 rounded-lg' />
                            )}

                            <div className='px-1 mb-2 flex-grow'>
                              <h2 className='font-semibold text-base md:text-lg line-clamp-2 mb-1'>
                                {course.course.title}
                              </h2>
                              <p className='text-xs md:text-sm text-gray-600 mb-1'>
                                <span className='font-medium'>Instructor:</span>{' '}
                                <InstructorItem courseId={course.course.id} />
                              </p>
                              <div className='flex items-center space-x-1 mb-2'>
                                {/* <!-- Star icons --> */}
                                <div className='flex justify-between items-center'>
                                  {renderStarRating(course.review.averageRating)}
                                  <span className='text-gray-400 text-xs ml-1'>{`(${course.review.totalRatings})`}</span>
                                </div>
                              </div>

                              <div className='flex justify-between items-center mt-auto'>
                                <p className='text-base md:text-lg font-bold text-gray-900 '>
                                  {formatCurrency(course.course.price)}
                                </p>

                                <button
                                  key={course.course.id}
                                  className={`w-[150px] transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex justify-center items-center gap-2 ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-900'} text-white font-medium py-1 md:py-2 rounded-lg text-sm md:text-base`}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleAddToCart(userId, course.course.id)
                                  }}
                                  disabled={addingToCart[course.course.id]}
                                >
                                  {addingToCart[course.course.id] ? (
                                    <>
                                      <svg
                                        className='animate-spin h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                      >
                                        <circle
                                          className='opacity-25'
                                          cx='12'
                                          cy='12'
                                          r='10'
                                          stroke='currentColor'
                                          strokeWidth='4'
                                        ></circle>
                                        <path
                                          className='opacity-75'
                                          fill='currentColor'
                                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                      </svg>
                                      Adding...
                                    </>
                                  ) : (
                                    <p>Add to Cart</p>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {hoveredCourse === course.course.id && (
                          <div
                            className={`absolute w-80 bg-white p-4 rounded-xl border shadow-2xl z-[999]
                             ${
                               index === 0
                                 ? 'left-[calc(100%)]' // First course: show on right
                                 : '-left-[320px]' // Other courses: show on left
                             } ${windowWidth < 768 ? 'w-full' : 'w-64 md:w-72 lg:w-80'} ${getPopupPosition(index)}`}
                            style={{
                              top: '50%',
                              transform: 'translateY(-50%)'
                            }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <h4 className='font-semibold text-base md:text-lg mb-1'>{course.course.title}</h4>
                            <p className='text-xs md:text-sm text-gray-500 mb-2'>
                              Updated{' '}
                              <span className='text-green-600 font-medium'>{formatDate(course.course.updatedAt)}</span>
                            </p>
                            <div className='space-y-1 mb-3'>
                              <p className='text-xs md:text-sm text-gray-600'>• Duration: {course.course.duration}</p>
                              <p className='text-xs md:text-sm text-gray-600'>
                                • Difficulty: {course.course.difficultyLevel}
                              </p>
                              {windowWidth >= 768 && (
                                <p className='text-xs md:text-sm text-gray-600'>• {course.course.prerequisites}</p>
                              )}
                            </div>

                            {windowWidth >= 768 && (
                              <p className='text-gray-700 text-xs md:text-sm mb-3'>{course.course.description}</p>
                            )}

                            <div className='mb-3'>
                              <p className='text-xs md:text-sm font-medium mb-1'>What you'll learn:</p>
                              <ul className='space-y-1 text-xs md:text-sm text-gray-800'>
                                {course.course.learningOutcomes
                                  ?.slice(0, windowWidth < 768 ? 2 : 3)
                                  .map((outcome, idx) => (
                                    <li key={idx} className='flex items-start'>
                                      <span className='mr-2 text-green-600'>✔</span> {outcome}
                                    </li>
                                  ))}
                                {course.course.learningOutcomes?.length > (windowWidth < 768 ? 2 : 3) && (
                                  <li className='text-purple-600 text-xs md:text-sm'>
                                    + {course.course.learningOutcomes.length - (windowWidth < 768 ? 2 : 3)} more
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Arrow pointer */}
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border
              ${index === 0 ? 'left-0 -ml-2 border-l border-b' : 'right-0 -mr-2 border-t border-r'}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => nextSlide(trendingCourses ?? [])}
                    className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-100 -mr-3 md:-mr-4 hidden sm:block'
                    aria-label='Scroll right'
                  >
                    <ChevronRight size={windowWidth < 768 ? 20 : 24} />
                  </button>
                  <div className='mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
                    <button
                      className='w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-md transition hover:bg-blue-700 text-sm md:text-base'
                      type='button'
                    >
                      Explore All Courses
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {modalOpen && (
          <Modal
            key='unique-modal-key'
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            className={'bg-transparent border-none p-0'}
            overlayClassName='modal-overlay'
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <LoginRequest />
          </Modal>
        )}
      </div>
    </>
  )
}
