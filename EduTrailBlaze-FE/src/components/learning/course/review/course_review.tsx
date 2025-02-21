import { Star } from 'lucide-react'
import React from 'react'

export default function CourseReview() {
  const reviews = [
    {
      user: 'Anonymous User',
      rating: 1,
      date: '02/21/2025 08:27:21 PM',
      comment: '(Edited) Khó nói',
      likes: 0
    },
    {
      user: 'Tran Thanh Dat (K18 HCM)',
      rating: 5,
      date: '02/21/2025 08:26:58 PM',
      comment: 'Nhìn là 5 nghìn',
      likes: 0
    },
    {
      user: 'Anonymous User',
      rating: 5,
      date: '02/21/2025 08:26:15 PM',
      comment: '(Edited) hay đo',
      likes: 0
    },
    {
      user: 'Anonymous User',
      rating: 5,
      date: '02/21/2025 08:25:24 PM',
      comment: '(Edited) hayyyyy',
      likes: 1
    }
  ]

  const ratings = {
    5: 50,
    4: 25,
    3: 0,
    2: 0,
    1: 25
  }

  const averageRating = 3.8

  return (
    <div className='container p-8 border rounded-lg shadow'>
      {/* Header Section */}
      <h1 className='text-3xl font-bold mb-6'>PICKELBALL</h1>

      {/* Rating Overview Section */}
      <div className='flex gap-12 mb-8'>
        {/* Average Rating */}
        <div className='flex items-center gap-3'>
          <span className='text-5xl font-bold'>{averageRating}</span>
          <Star className='w-8 h-8 text-yellow-400 fill-yellow-400' />
        </div>

        {/* Rating Bars */}
        <div className='flex-1 space-y-2'>
          {Object.entries(ratings)
            .reverse()
            .map(([rating, percentage]) => (
              <div key={rating} className='flex items-center gap-3'>
                <span className='w-4 text-lg'>{rating}</span>
                <div className='flex-1 h-3 bg-gray-200 rounded-full'>
                  <div
                    className='h-full bg-yellow-400 rounded-full transition-all duration-300'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className='w-12 text-sm text-gray-500'>{percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>All Reviews (4)</h2>
          <button className='text-blue-500 hover:text-blue-600 text-lg'>+ Add Review</button>
        </div>

        {/* Review List */}
        <div className='space-y-6'>
          {reviews.map((review, index) => (
            <div key={index} className='border-b pb-6 last:border-b-0'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-gray-200 rounded-full flex-shrink-0' />
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-lg'>{review.user}</span>
                    <span className='text-sm text-gray-500'>{review.date}</span>
                  </div>
                  <div className='flex items-center gap-1 mb-3'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className='text-gray-700 text-lg mb-3'>{review.comment}</p>
                  <div className='flex items-center gap-2'>
                    <button className='flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors'>
                      <span className='text-lg'>👍</span>
                      <span>{review.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className='flex justify-between mt-8 pt-4 border-t'>
        <button className='text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg'>
          <span>⬇️</span> Download Data
        </button>
        <button className='text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg'>
          <span>👁️</span> Hide reviews
        </button>
      </div>
    </div>
  )
}
