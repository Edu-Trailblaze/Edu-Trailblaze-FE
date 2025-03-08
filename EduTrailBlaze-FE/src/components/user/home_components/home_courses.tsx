'use client'
import { useGetAllCoursesQuery, useGetCourseByIdAndTagQuery } from '@/redux/services/courseDetail.service'
import React, { useEffect, useState } from 'react'
import InstructorItem from './InstructorItem'
import { formatDate } from '@/helper/Util'
import { jwtDecode } from 'jwt-decode'
import { usePostCartMutation } from '@/redux/services/cart.service'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '@/redux/slice/cart.slice'
import Link from 'next/link'
import SkeletonCard from '../../animate/skeleton/skeleton_card'
import { useGetTagQuery } from '@/redux/services/tag.service'
import LoginRequest from '@/components/global/requestLogin/RequestLogin'
import Modal from 'react-modal';
import '@/components/global/Modal/ReactModal.css'

// Modal.setAppElement('');

export default function HomeCourses() {
  const [visibleCourse, setVisibleCourse] = useState(4)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  const [userId, setUserId] = useState('')
  const [selectedTag, setSelectedTag] = useState(1)

  const {
    data: courses,
    isLoading,
    isFetching
  } = useGetCourseByIdAndTagQuery({ tagId: selectedTag, studentId: userId })
  const { data: tags, isLoading: tagsLoading, isFetching: tagsFetching } = useGetTagQuery()
  const [postCart, { isLoading: isAddingToCart, isSuccess: addedToCart, error: cartError }] = usePostCartMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const paidCourses = courses?.filter((course) => course.price > 0)
  const freeCourses = courses?.filter((course) => course.price === 0)

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

  const categories = [
    'Courses Science',
    'IT Certifications',
    'Leadership',
    'Web Development',
    'Communication',
    'Business Analytics and Intelligence'
  ]

  const handleTagSelect = (index: number, tagId: number) => {
    setActiveIndex(index)
    setSelectedTag(tagId)
  }

  const handleShowCourses = () => {
    if (courses && visibleCourse < courses.length) {
      setVisibleCourse(courses.length)
    } else {
      setVisibleCourse(4)
    }
  }
  const handleAddToCart = async (userId: string, courseId: number) => {
    try {
      const result = await postCart({ userId, courseId }).unwrap()
      if (userId === '' || userId === 'undefined') {
        setModalOpen(true)
        return
      }
      console.log('Item add to cart: ', result)
      dispatch(addItemToCart(result.cartItems[result.cartItems.length - 1])) // Dispatch the action with the correct payload
    } catch (error) {
      console.log('Error adding to cart: ', error)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          {/** Premium courses layout */}
          <div className='container'>
            <div>
              <div className='mb-[30px]'>
                <p className='mb-[10px] font-bold'>Invest in Yourself</p>
                <h1 className='text-4xl font-bold'>Unlock Learning with Premium Courses</h1>
                <p>Explore top-tier online courses from the world's leading universities and companies.</p>
              </div>

              {isLoading || isFetching ? (
                <div className='grid grid-cols-2 gap-6'>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : paidCourses?.length === 0 || paidCourses === undefined ? (
                <p>No paid courses available at the moment.</p>
              ) : (
                <div className='flex gap-[5rem]'>
                  {paidCourses.slice(0, visibleCourse).map((course, index) => (
                    <div className='relative' key={course.id}>
                      <Link href={`/student/course/${course.id}`}>
                        <div
                          className='relative transform transition duration-300 hover:scale-110 rounded-lg shadow-lg w-[17.5rem] hover:shadow-xl bg-white border border-black p-[5px] hover:z-[1]'
                          onMouseEnter={() => setHoveredCourse(course.id)}
                          onMouseLeave={() => setHoveredCourse(null)}
                        >
                          {course.imageURL !== null ? (
                            <div className='m-2 rounded-lg'>
                              <img className='w-[100%] h-[170px] rounded-md' src={course.imageURL} alt='course_image' />
                            </div>
                          ) : (
                            <div className='bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg' />
                          )}

                          <div className='px-5 mb-[5px] flex flex-col'>
                            <h2 className='font-semibold'>{course.title}</h2>
                            <p className='block font-sans text-base font-light leading-relaxed text-inherit antialiased'>
                              <strong>Instructor:</strong> <InstructorItem courseId={course.id} />
                            </p>
                            <div className='flex space-x-1 mt-1 text-yellow-400'>
                              <span className='text-gray-600 text-sm font-medium'>4.6</span>
                              {/* <!-- Star icons --> */}
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                                className='w-5 h-5'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                                className='w-5 h-5'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                                className='w-5 h-5'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                                className='w-5 h-5'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                className='w-5 h-5'
                              >
                                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                              </svg>
                              <span className='text-gray-400 text-sm'>(40,856)</span>
                            </div>

                            <p className='mt-5'>{course.price}$</p>
                          </div>

                          {hoveredCourse === course.id && (
                            <div
                              className={`absolute w-80 bg-white p-4 rounded-xl border shadow-2xl z-[999]
                               ${
                                 index === 0
                                   ? 'left-[calc(100%)]' // First course: show on right
                                   : '-left-[320px]' // Other courses: show on left
                               }`}
                              style={{
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                              onClick={(e) => e.preventDefault()}
                            >
                              <h4 className='font-semibold text-md'>{course.title}</h4>
                              <p className='text-sm text-gray-500'>
                                Updated <span className='text-green-600 font-bold'>{formatDate(course.updatedAt)}</span>
                              </p>
                              <p className='text-sm text-gray-500'>• Duration: {course.duration}</p>
                              <p className='text-sm text-gray-500'>• Difficulty Level: {course.difficultyLevel}</p>
                              <p className='text-sm text-gray-500'>• {course.prerequisites}</p>

                              <p className='text-gray-700 mt-2 text-sm'>{course.description}</p>

                              <ul className='mt-2 space-y-1 text-sm text-gray-800'>
                                {course.learningOutcomes.map((outcome, index) => (
                                  <li key={index} className='flex items-start'>
                                    <span className='mr-2 text-green-600'>✔</span> {outcome}
                                  </li>
                                ))}
                              </ul>

                              <button
                                className='mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg'
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleAddToCart(userId, course.id)
                                }}
                                disabled={isAddingToCart}
                              >
                                {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                              </button>

                              {/* Arrow pointer */}
                              <div
                                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border
                ${index === 0 ? 'left-0 -ml-2 border-l border-b' : 'right-0 -mr-2 border-t border-r'}`}
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div className='mt-[20px]'>
                <button
                  className='w-[160px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]'
                  type='button'
                >
                  Show 8 others
                </button>
                <button
                  className='w-[100px] bg-white text-blue-500 border-2 border-blue-500 cursor-pointer px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-500 hover:text-white'
                  type='button'
                >
                  View all
                </button>
              </div>
            </div>

            {/** Free courses layout */}
            <div className='mt-[80px]'>
              <div className='mb-[30px]'>
                <p className='mb-[10px] font-bold'>100% free</p>
                <h1 className='text-4xl font-bold'>Start learning with free courses</h1>
                <p>Discover free online courses from the world's best universities and companies.</p>
              </div>

              {isLoading || isFetching ? (
                <div className='grid grid-cols-2 gap-6'>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : freeCourses?.length === 0 || freeCourses === undefined ? (
                <div>
                  <p>No free courses available at the moment.</p>
                </div>
              ) : (
                <div className='flex gap-10'>
                  {freeCourses.slice(0, visibleCourse).map((course, index) => (
                    <div
                      key={index}
                      className='transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-[20rem] w-[16rem] hover:shadow-xl bg-white border border-black'
                    >
                      <div className='bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg'></div>

                      <div className='px-5 pt-2 flex flex-col'>
                        <h2 className='font-semibold'>{course.title}</h2>
                        <p className='block font-sans text-base font-light leading-relaxed text-inherit antialiased'>
                          Author, teacher
                        </p>
                        {/* <!-- Rating Section --> */}
                        <div className='flex space-x-1 text-yellow-400'>
                          {/* <!-- Rating text --> */}
                          <span className='text-gray-600 text-sm font-medium'>4.6</span>
                          {/* <!-- Star icons --> */}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                          {/* <!-- Review count --> */}
                          <span className='text-gray-400 text-sm'>(40,856)</span>
                        </div>

                        <p className='mt-5'>Free</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className='mt-[20px]'>
                <button
                  className='w-[160px] bg-blue-500 cursor-pointer text-white px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-700 mr-[10px]'
                  type='button'
                >
                  Show 8 others
                </button>
                <button
                  className='w-[100px] bg-white text-blue-500 border-2 border-blue-500 cursor-pointer px-2 py-1 mt-2 rounded-md transition duration-150 hover:bg-blue-500 hover:text-white'
                  type='button'
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        {modalOpen && (
          <Modal
          isOpen={modalOpen}
          onRequestClose={handleCloseModal}
          className={'bg-transparent border-none p-0'}
          overlayClassName="modal-overlay"
          >
            <LoginRequest />
          </Modal>
        )}
      </div>
    </>
  )
}
