import React from 'react'
import RatingOverview from './overview/rating_overview'
import ReviewList from './reviewList/review_list'

export default function CourseReview( {courseDetails} : ICourseFull ) {
  return (
    <div className='container p-8 border rounded-lg shadow mb-10'>
      {/* Review Header */}
      <h1 className='text-xl font-bold mb-6'>REVIEW COURSE</h1>

      {/* Rating Overview Section */}
      <RatingOverview courseDetails={courseDetails} />

      {/* Reviews Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>All Reviews ({courseDetails?.review.totalRatings})</h2>
          <button className='text-blue-500 hover:text-blue-600 text-lg'>+ Add Review</button>
        </div>

        <ReviewList />
      </div>

      {/* Footer Actions */}
      {/* <div className='flex justify-between mt-8 pt-4 border-t'>
        <button className='text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg'>
          <span>⬇️</span> Download Data
        </button>
        <button className='text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg'>
          <span>👁️</span> Hide reviews
        </button>
      </div> */}
    </div>
  )
}
