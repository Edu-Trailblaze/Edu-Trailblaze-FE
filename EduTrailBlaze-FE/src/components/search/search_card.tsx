import { Star } from 'lucide-react'
import React from 'react'

interface Course {
  title: string
  instructor: string
  rating: number
  reviews: number
  description: string
  price: number
  image: string
  bestseller: boolean
  tags: string[]
}
export default function SearchCard({ course }: { course: Course }) {
  return (
    <div className='flex border-b border-gray-200 p-4 hover:bg-gray-50'>
      <img src={course.image} alt={course.title} className='w-64 h-36 object-cover rounded' />
      <div className='ml-4 flex-1'>
        <h3 className='font-bold text-lg'>{course.title}</h3>
        <p className='text-sm text-gray-600'>{course.instructor}</p>
        <div className='flex items-center mt-1'>
          <span className='text-orange-400 font-bold'>{course.rating}</span>
          <div className='flex ml-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(course.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className='text-sm text-gray-600 ml-1'>({course.reviews} reviews)</span>
        </div>
        <div className='mt-2 text-sm'>{course.description}</div>
        <div className='mt-2'>
          {course.tags.map((tag, i) => (
            <span key={i} className='mr-2 px-2 py-1 bg-gray-100 text-xs rounded'>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='ml-4 text-right'>
        <div className='font-bold text-lg'>${course.price}</div>
        {course.bestseller && (
          <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded'>Bestseller</span>
        )}
      </div>
    </div>
  )
}
