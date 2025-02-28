import { Star } from 'lucide-react'
import React from 'react'
import { useGetRatingDetailQuery } from '../../../../../../redux/services/review.service'
import ReviewLoading from '../../../../../animate/ReviewLoading/Loading'

export default function RatingOverview({ courseDetails, courseId }: ReviewProps) {
  const { data: reviewRating, isLoading: reviewLoading } = useGetRatingDetailQuery(courseId)

  const ratingCounts: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  if (reviewRating) {
    reviewRating.forEach(({ rating, ratingPercentage }) => {
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating as 1 | 2 | 3 | 4 | 5] = ratingPercentage
      }
    })
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
        {reviewLoading && <ReviewLoading />}
        {Object.entries(ratingCounts)
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
