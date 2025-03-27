'use client'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useGetReviewPagingQuery } from '../../../../../../../redux/services/review.service'
import { formatDateTime } from '../../../../../../../helper/format'
import Pagination from '../../../../../../global/Pagination/Pagination'
import ReviewUserName from './reviewUserName'
import ReviewUserPicture from './ReviewUserImage'
import PutReviewModal from '../reviewModal/PutReviewModal'

interface ReviewListProp {
  courseId: number
  userId: string
}

export default function ReviewList({ courseId, userId }: ReviewListProp) {
  const [pageIndex, setPageIndex] = useState(1)
  const { data: reviewPaging } = useGetReviewPagingQuery({ courseId: courseId, pageIndex })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='space-y-6'>
      {reviewPaging?.items.map((review, index) => (
        <div key={index} className='border-b last:pb-0 pb-6 last:border-b-0'>
          <div className='flex items-start gap-4'>
            <ReviewUserPicture userId={review.userId} />
            <div className='flex-1'>
              <div className='flex justify-between items-center mb-2'>
                <ReviewUserName userId={review.userId} />
                <span className='text-sm text-gray-500'>{formatDateTime(review.createdAt)}</span>
              </div>
              <div className='flex justify-between items-center gap-1 mb-3'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                {review.userId === userId ? (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className='p-2 rounded-md hover:bg-blue-50 hover:text-blue-500'
                  >
                    Edit
                  </button>
                ) : (
                  ''
                )}
              </div>
              <p className='text-gray-700 text-lg'>{review.reviewText}</p>
              {/* <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors'>
                  <ThumbUpIcon fontSize='small' />
                  <span className='text-lg'>so luong like</span>
                </button>
              </div> */}
            </div>
          </div>
          <PutReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reviewId={review.id} />
        </div>
      ))}

      <Pagination
        pageIndex={reviewPaging?.pageIndex}
        totalPages={reviewPaging?.totalPages}
        hasPreviousPage={reviewPaging?.hasPreviousPage}
        hasNextPage={reviewPaging?.hasNextPage}
        onPageChange={setPageIndex}
      />
    </div>
  )
}
