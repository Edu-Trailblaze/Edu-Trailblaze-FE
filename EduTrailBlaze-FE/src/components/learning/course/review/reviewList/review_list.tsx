import { Star } from 'lucide-react'
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useGetReviewPagingQuery } from '../../../../../redux/services/review.service'

export default function ReviewList({ id }: { id: number }) {
  const { data: reviewPaging } = useGetReviewPagingQuery({ courseId: id })
  const userId = reviewPaging?.items.map((rv) => rv.userId)
  // const user = userId?.map((id) => useGetUserQuery(id))
  const items = reviewPaging?.items.map((review) => ({
    courseId: review.courseId,
    userId: review.userId,
    rating: review.rating,
    reviewText: review.reviewText,
    isDeleted: review.isDeleted,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    id: review.id
  }))
  return (
    <div className='space-y-6'>
      {reviewPaging?.items.map((review, index) => (
        <div key={index} className='border-b last:pb-0 pb-6 last:border-b-0'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-gray-200 rounded-full flex-shrink-0' />
            <div className='flex-1'>
              <div className='flex justify-between items-center mb-2'>
                <span className='font-medium text-lg'>{review.userId}</span>
                <span className='text-sm text-gray-500'>{review.createdAt}</span>
              </div>
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className='text-gray-700 text-lg mb-3'>{review.reviewText}</p>
              <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors'>
                  <ThumbUpIcon fontSize='small' />
                  <span className='text-lg'>so luong like</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
