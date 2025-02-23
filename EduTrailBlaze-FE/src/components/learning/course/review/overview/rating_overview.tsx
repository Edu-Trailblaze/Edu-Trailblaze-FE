import { Star } from 'lucide-react'
import React from 'react'

export default function RatingOverview({ courseDetails }: ICourseFull) {
  // const {data: reviewPercentage} = useGetR
  const ratings = {
    //số lượng rating từng sao
    1: 20,
    2: 0,
    3: 20,
    4: 20,
    5: 40
  }

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
