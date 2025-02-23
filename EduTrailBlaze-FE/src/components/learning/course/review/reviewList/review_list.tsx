import { Star } from 'lucide-react'
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

export default function ReviewList() {
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
  return (
    <div className='space-y-6'>
      {reviews.map((review, index) => (
        <div key={index} className='border-b last:pb-0 pb-6 last:border-b-0'>
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
                  <ThumbUpIcon fontSize='small' />
                  <span className='text-lg'>{review.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
