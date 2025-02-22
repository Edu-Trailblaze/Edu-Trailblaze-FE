import { Star } from 'lucide-react'
import React from 'react'

export default function RatingOverview( {courseDetails} : ICourseFull ) {

  const ratings = {
    //số lượng rating từng sao
    1: 20,
    2: 0,
    3: 20,
    4: 20,
    5: 40,
  }

  // const ratings = courseDetails?.review.ratings || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  // // Tính tổng số review
  // const totalReviews = Object.values(ratings).reduce((sum, count) => sum + count, 0)

  // // Tính phần trăm số lượng rating từng sao
  // const ratingPercentages = Object.keys(ratings).reduce((acc, key) => {
  //   const star = Number(key)
  //   acc[star] = totalReviews > 0 ? (ratings[star] / totalReviews) * 100 : 0
  //   return acc
  // }, {} as Record<number, number>)

  return (
    <div className='flex gap-12 mb-8'>
      {/* Average Rating */}
      <div className='flex items-center gap-3'>
        <span className='text-5xl font-bold'>{courseDetails?.review.averageRating.toFixed(1)}</span>
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
  )
}
