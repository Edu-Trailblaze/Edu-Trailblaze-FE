import { Star } from 'lucide-react'
import React, { useState } from 'react'
import Pagination from '../../global/Pagination/Pagination'
import { useGetCoursePagingQuery } from '../../../redux/services/courseDetail.service'
import Link from 'next/link'

interface CourseSearchProp {
  searchQuery: string
  sortBy: string
}
export default function SearchCard({ searchQuery, sortBy }: CourseSearchProp) {
  const [pageIndex, setPageIndex] = useState(1)

  const { data: courses, isLoading } = useGetCoursePagingQuery(
    { Title: searchQuery, PageIndex: pageIndex, PageSize: 10, Sort: sortBy },
    { skip: !searchQuery }
  )

  if (isLoading) return <div>Loading...</div>
  if (!courses?.items?.length) return <div>No courses found</div>
  return (
    <div>
      {courses.items.map((courseItem, coursesIndex) => (
        <Link href={`/student/course/${courseItem.course.id}`} key={coursesIndex}>
          <div className='flex border rounded border-gray-200 p-4 hover:bg-gray-50'>
            <img
              src={courseItem.course.imageURL}
              alt={courseItem.course.title}
              className='w-64 h-36 object-cover rounded'
            />
            <div className='ml-4 flex-1'>
              <h3 className='font-bold text-lg'>{courseItem.course.title}</h3>
              {courseItem.instructors.map((instructor, index) => (
                <p key={index} className='text-sm text-gray-600'>
                  {instructor.fullname}
                </p>
              ))}
              <div className='flex items-center mt-1'>
                <span className='text-orange-400 font-bold'>{courseItem.review.totalRatings}</span>
                <div className='flex ml-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(courseItem.review.averageRating)
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className='text-sm text-gray-600 ml-1'>({courseItem.review.totalRatings} reviews)</span>
              </div>
              <div className='mt-2 text-sm'>{courseItem.course.description}</div>
              <div className='mt-2'>
                {courseItem.tags.map((tag, i) => (
                  <span key={i} className='mr-2 px-2 py-1 bg-gray-100 text-xs rounded'>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className='ml-4 text-right'>
              <div className='font-bold text-lg'>${courseItem.course.price}</div>
            </div>
          </div>
        </Link>
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
  )
}
