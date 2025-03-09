import { Star } from 'lucide-react'
import React from 'react'

interface CourseSearchProp {
  courses: CourseDetails[]
}
export default function SearchCard({ courses }: CourseSearchProp) {
  if (!courses.length) return <div>NO course</div>
  return (
    <div>
      {/* {course.items.ma} */}
      {courses.map((courseItem, coursesIndex) => (
        <div key={coursesIndex} className='flex border-b border-gray-200 p-4 hover:bg-gray-50'>
          <img
            src={courseItem.course.imageURL}
            alt={courseItem.course.title}
            className='w-64 h-36 object-cover rounded'
          />
          <div className='ml-4 flex-1'>
            <h3 className='font-bold text-lg'>{courseItem.course.title}</h3>
            {/* {courseItem.instructors.map((instructor, index) => (
              <p key={index} className='text-sm text-gray-600'>
                {instructor}
              </p>
            ))} */}
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
      ))}
    </div>
  )
}
