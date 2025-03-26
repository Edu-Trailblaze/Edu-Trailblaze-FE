'use client'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import Pagination from '@/components/global/Pagination/Pagination'
import RequestApprove from '@/components/global/requestNotification/requestApprove/success/RequestApprove'
import { useGetInstructorCoursePagingQuery } from '@/redux/services/courseDetail.service'
import Link from 'next/link'
import React, { useState } from 'react'
import Modal from 'react-modal'
import '@/components/global/Modal/ReactModal.css'
import { useApproveCourseByAIInsMutation } from '@/redux/services/instructor.service'
import ApproveFail from '@/components/global/requestNotification/requestApprove/fail/ApproveFail'

interface CourseSearchProp {
  InstructorId: string | undefined
  searchQuery: string | undefined
  tagId: number | undefined
}
export default function CourseDisplay({ searchQuery, InstructorId, tagId }: CourseSearchProp) {
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModelOpen] = useState(false)
  const [failModalOpen, setFailModalOpen] = useState(false)
  const [approveStatus, setApproveStatus] = useState('')
  const {
    data: courses,
    isLoading: courseLoading,
    isFetching
  } = useGetInstructorCoursePagingQuery({
    InstructorId: InstructorId,
    CourseName: searchQuery,
    TagId: tagId ?? undefined,
    PageIndex: pageIndex,
    PageSize: 4
  })

  const [approveCourse] = useApproveCourseByAIInsMutation()

  if (courseLoading || isFetching) return <div>Loading...</div>
  if (!courses?.items) return <div>No courses found</div>

  const handleApproveCourse = async (courseId: number) => {
    setIsLoading(true)
    try {
      const result = await approveCourse(courseId).unwrap()
      console.log('Course approved:', result.message)
      if (result.message === 'Approved') {
        setIsModelOpen(true)
      } else if (result.message === 'Rejected') {
        setFailModalOpen(true)
      }

      setApproveStatus(result.message)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModelOpen(false)
    setFailModalOpen(false)
  }

  console.log(failModalOpen)

  return (
    <>
      <div className='space-y-4'>
        {courses.items.map((courseItem, coursesIndex) => (
          <div key={coursesIndex} className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-gray-100 p-4 flex items-center md:w-80'>
                <div className='flex-shrink-0'>
                  <div className='w-24 h-12 bg-gray-200 flex items-center justify-center rounded'>
                    <img src={courseItem.courseImage} alt='' />
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>{courseItem.courseName}</h3>
                  {approveStatus ? (
                    approveStatus === 'Approved' ? (
                      <p className='text-sm text-gray-500'>Pending</p>
                    ) : (
                      <p className='text-sm text-red-500'>{approveStatus}</p>
                    )
                  ) : (
                    <p
                      className={`text-sm ${courseItem.status === 'Approved' ? 'text-green-500 font-semibold' : 'text-gray-500'}`}
                    >
                      {courseItem.status}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-auto'>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    {courseItem.completionPercentage === 100 ? (
                      <span className='text-gray-400 font-medium mr-2'>Course Completion</span>
                    ) : (
                      <span className='text-gray-400 font-medium mr-2'>Finish your course</span>
                    )}
                    <div className='w-full sm:w-64 bg-gray-200 rounded-full h-2 flex-1'>
                      <div
                        className='bg-indigo-600 h-2 rounded-full'
                        style={{ width: `${courseItem.completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className='mt-1 sm:mt-0 sm:ml-2 text-sm text-gray-500'>
                      {courseItem.completionPercentage}%
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-8 mt-2 md:mt-0'>
                  {courseItem.completionPercentage === 100 ? (
                    <>
                      {courseItem.status === 'Approved' ||
                      courseItem.status === 'Pending' ||
                      approveStatus === 'Approved' ? (
                        ''
                      ) : (
                        <button
                          type='button'
                          onClick={() => handleApproveCourse(courseItem.courseId)}
                          disabled={isLoading}
                          className={`w-44 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-800'} flex justify-center items-center text-white font-medium py-1 md:py-2 rounded-lg text-sm md:text-base`}
                        >
                          {isLoading ? (
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
                              Request...
                            </>
                          ) : (
                            'Request to Approve'
                          )}
                        </button>
                      )}

                      <Link href={`/instructor/edit/edit-course/${courseItem.courseId}`}>
                        <p className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                          Edit / manage course
                        </p>
                      </Link>
                    </>
                  ) : (
                    <Link href={`/instructor/edit/edit-course/${courseItem.courseId}`}>
                      <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                        Edit / manage course
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {courses.totalPages > 1 && (
          <Pagination
            pageIndex={courses.pageIndex}
            totalPages={courses.totalPages}
            hasNextPage={courses.hasNextPage}
            hasPreviousPage={courses.hasPreviousPage}
            onPageChange={setPageIndex}
          />
        )}

        {isModalOpen && (
          <Modal
            key='unique-modal-key'
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className={'bg-transparent border-none p-0'}
            overlayClassName='modal-overlay'
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <RequestApprove />
          </Modal>
        )}

        {failModalOpen && (
          <Modal
            key='second-modal-key'
            isOpen={failModalOpen}
            onRequestClose={handleCloseModal}
            className={'bg-transparent border-none p-0'}
            overlayClassName='modal-overlay'
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <ApproveFail />
          </Modal>
        )}
      </div>
    </>
  )
}
