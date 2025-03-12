'use client'
import Pagination from '@/components/global/Pagination/Pagination'
import { useGetInstructorCoursePagingQuery } from '@/redux/services/courseDetail.service'
import Link from 'next/link'
import React, { useState } from 'react'

interface CourseSearchProp {
  InstructorId: string | undefined
  searchQuery: string | undefined
}
export default function CourseDisplay({ searchQuery, InstructorId }: CourseSearchProp) {
  const [pageIndex, setPageIndex] = useState(1)

  const { data: courses, isLoading } = useGetInstructorCoursePagingQuery({
    InstructorId: InstructorId,
    CourseName: searchQuery,
    PageIndex: pageIndex,
    PageSize: 4
  })

  if (isLoading) return <div>Loading...</div>
  if (!courses?.items) return <div>No courses found</div>
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
                  <p className='text-sm text-gray-500'>Published</p>
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-auto'>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    {courseItem.completionPercentage === 100 ? (
                      <span className='text-gray-400 font-medium mr-1'>Course Completion</span>
                    ) : (
                      <span className='text-gray-400 font-medium mr-1'>Finish your course</span>
                    )}
                    <div className='w-full sm:w-64 bg-gray-200 rounded-full h-2 flex-1'>
                      <div className='bg-indigo-600 h-2 rounded-full' style={{ width: `${courseItem.completionPercentage}%` }}></div>
                    </div>
                    <span className='mt-1 sm:mt-0 sm:ml-2 text-sm text-gray-500'>{courseItem.completionPercentage}%</span>
                  </div>
                </div>
                <div className='mt-2 md:mt-0'>
                  <Link href='/instructor/courses/edit'>
                    {courseItem.completionPercentage === 100 ? (
                      <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                        View Course
                      </span>
                    ) : (
                      <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                        Edit / manage course
                      </span>
                    )}
                  </Link>
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
      </div>
    </>
  )
}
