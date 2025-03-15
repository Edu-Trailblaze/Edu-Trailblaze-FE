'use client'
import { useState } from 'react'
import { formatCurrency } from '../../../../../../helper/format'
import { ChevronDown, ChevronUp, Star, Clock } from 'lucide-react'

interface CourseSuggestionProps {
  recommendedCourses: IRecommendedCourse[]
}

export default function CourseSuggestion({ recommendedCourses }: CourseSuggestionProps) {
  const [visibleCourse, setVisibleCourse] = useState(4)
  const [isHoveredIndex, setIsHoveredIndex] = useState<number | null>(null)

  const handleShowCourses = () => {
    if (recommendedCourses && visibleCourse < recommendedCourses.length) {
      setVisibleCourse(recommendedCourses.length)
    } else {
      setVisibleCourse(4)
    }
  }

  if (!recommendedCourses || !recommendedCourses.length) {
    return (
      <div className='flex justify-center items-center h-40 bg-gray-50 rounded-lg animate-pulse'>
        <p className='text-gray-500'>Loading recommended courses...</p>
      </div>
    )
  }

  return (
    <div className='mb-12'>
      {/* Title with decorative element */}
      <div className='flex items-center mb-6'>
        <div className='w-1 h-8 bg-blue-600 rounded mr-3'></div>
        <h2 className='text-2xl font-bold'>Students also bought</h2>
      </div>

      {/* Course List */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {recommendedCourses.slice(0, visibleCourse).map((item, index) => (
          <a
            href={item.course.id ? `/student/course/${item.course.id}` : '#'}
            key={index}
            className={`flex flex-col sm:flex-row items-center border rounded-lg p-4 transition-all duration-300 hover:shadow-lg ${
              isHoveredIndex === index ? 'border-blue-400 shadow-md' : 'border-gray-200'
            }`}
            onMouseEnter={() => setIsHoveredIndex(index)}
            onMouseLeave={() => setIsHoveredIndex(null)}
          >
            {/* Course Image with overlay on hover */}
            <div className='relative w-full sm:w-32 h-32 mb-4 sm:mb-0'>
              <img
                src={item.course.imageURL || '/api/placeholder/400/320'}
                alt={item.course.title}
                className='w-full h-full object-cover rounded-md'
              />
              {isHoveredIndex === index && (
                <div className='absolute inset-0 bg-blue-600 bg-opacity-20 rounded-md flex items-center justify-center'>
                  <span className='text-white font-medium px-2 py-1 bg-blue-600 rounded text-sm'>View Course</span>
                </div>
              )}
            </div>

            {/* Course Information */}
            <div className='flex-1 sm:ml-4 w-full'>
              <h3 className='text-lg font-semibold line-clamp-1'>{item.course.title}</h3>
              <p className='text-sm text-gray-600 line-clamp-2 mt-1'>{item.course.description}</p>

              <div className='flex items-center mt-2'>
                <div className='flex items-center text-sm text-amber-500'>
                  <Star size={16} className='mr-1' />
                  <span>{item.course.review?.averageRating?.toFixed(1) || '0.0'}</span>
                </div>
                <div className='w-1 h-1 bg-gray-300 rounded-full mx-2'></div>
                <div className='flex items-center text-sm text-gray-500'>
                  <Clock size={16} className='mr-1' />
                  <span>{item.course.duration} min</span>
                </div>
                <div className='w-1 h-1 bg-gray-300 rounded-full mx-2'></div>
                <span className='text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600'>
                  {item.course.difficultyLevel}
                </span>
              </div>

              {/* Price tag */}
              <div className='mt-3'>
                <span className='text-lg font-bold text-green-600'>{formatCurrency(item.course.price)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Show more / Show less button */}
      {recommendedCourses.length > 4 && (
        <button
          onClick={handleShowCourses}
          className='flex items-center justify-center w-full max-w-md mx-auto mt-8 py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md'
        >
          {visibleCourse < recommendedCourses.length ? (
            <>
              Show more courses <ChevronDown size={20} className='ml-2' />
            </>
          ) : (
            <>
              Show less <ChevronUp size={20} className='ml-2' />
            </>
          )}
        </button>
      )}
    </div>
  )
}
