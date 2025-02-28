import React from 'react'

const ReviewLoading = () => {
  return (
    <div className='space-y-2'>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className='flex items-center space-x-2'>
          <span className='w-4'>{rating}</span>
          <div className='h-3 w-full bg-gray-300 rounded animate-pulse'></div>
          <span className='w-8 text-right'>--%</span>
        </div>
      ))}
    </div>
  )
}

export default ReviewLoading
