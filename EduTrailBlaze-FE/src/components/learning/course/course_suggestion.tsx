'use client'
import { useState } from 'react'
import { useGetAllCoursesQuery } from '../../../services/courseDetail.service'
import SkeletonCard from '../../skeleton/skeleton_card'
import { formatCurrency } from '../../../utils/format'

export default function CourseSuggestion() {
  const { data, isLoading, isFetching } = useGetAllCoursesQuery()

  const [visibleCourse, setVisibleCourse] = useState(4)

  const handleShowCourses = () => {
    if (data && visibleCourse < data.length) {
      setVisibleCourse(data.length)
    } else {
      setVisibleCourse(4)
    }
  }

  return (
    <div className='container mb-10'>
      {/* Title */}
      <h2 className='text-2xl font-semibold mb-4'>Students also bought</h2>

      {/* Loading State */}
      {isLoading || isFetching ? (
        <div className='grid grid-cols-2 gap-6'>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !data ? (
        <p>No courses available at the moment.</p>
      ) : (
        <>
          {/* Course List */}
          <div className='grid grid-cols-2 gap-6'>
            {data.slice(0, visibleCourse).map((course: any, index: any) => (
              <a
                href={course.id ? `http://localhost:4000/course/${course.id}` : '#'}
                key={index}
                className='flex items-center border rounded-lg p-4 hover:shadow-lg'
              >
                {/* Course Image */}
                <img src={course.imageURL} alt={course.title} className='w-40 h-40 object-cover rounded-md mr-4' />

                {/* Course Information */}
                <div className='flex-1'>
                  <h3 className='text-md font-semibold'>{course.title}</h3>
                  <p className='text-sm text-gray-500'> {course.description}</p>
                  {/* <p className='text-sm text-gray-500'>⭐ {course.review.averageRating}</p> */}
                  <p className='text-sm text-gray-500'>
                    ⏳ {course.duration} total hours • {course.difficultyLevel} Level
                  </p>
                </div>

                {/* Course Price */}
                <div className='ml-3 text-right'>
                  <p className='text-lg font-bold text-green-600'>{formatCurrency(course.price)}</p>
                  {/* <p className='text-lg font-bold text-green-600'>{formatCurrency(course.discount.calculatedPrice)}</p> */}
                  {/* <p className='text-sm line-through text-gray-400'>{formatCurrency(course.price)}</p> */}
                </div>
              </a>
            ))}
          </div>
          {/* Show more / Show less */}
          <button
            onClick={handleShowCourses}
            className='text-white font-semibold hover:bg-cyan-600 transition-colors duration-500 bg-blue-600 container h-12 mt-7 mb-2 row-span-12unded'
          >
            {visibleCourse < data.length ? 'Show more' : 'Show less'}
          </button>
        </>
      )}
    </div>
  )
}
