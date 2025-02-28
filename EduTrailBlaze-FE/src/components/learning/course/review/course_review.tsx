import React from 'react'
import RatingOverview from './overview/rating_overview'
import ReviewList from './reviewList/review_list'
import Pagination from '../../../global/Pagination/Pagination'

export default function CourseReview({ courseDetails, courseId }: ReviewProps) {
  return (
    <div className='container p-8 border rounded-lg shadow mb-10'>
      {/* Review Header */}
      <h1 className='text-xl font-bold mb-6'>REVIEW COURSE</h1>

      {/* Rating Overview Section */}
      <RatingOverview courseDetails={courseDetails} courseId={courseId} />

      {/* Reviews Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>All Reviews ({courseDetails?.review.totalRatings})</h2>
          <button className='text-blue-500 hover:text-blue-600 text-lg'>+ Add Review</button>
        </div>

        <ReviewList id={courseId} />
      </div>

      {/* Footer Actions */}
    </div>
  )
}
