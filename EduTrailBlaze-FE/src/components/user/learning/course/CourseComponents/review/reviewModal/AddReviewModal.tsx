import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { usePostReviewMutation } from '@/redux/services/review.service'

interface AddReviewModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: number
  userId: string
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, courseId, userId }) => {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [postReview] = usePostReviewMutation()

  const handleSubmit = async () => {
    if (rating > 0 && reviewText.trim()) {
      setIsLoading(true)
      try {
        // Prepare review data according to ReviewByUser interface
        const reviewData = {
          courseId,
          userId,
          rating,
          reviewText
        }

        // Call the mutation
        await postReview(reviewData).unwrap()

        // Reset form and close modal on successful submission
        setRating(0)
        setReviewText('')
        onClose()
      } catch (submitError) {
        // Error handling will be managed by RTK Query
        console.error('Failed to submit review', submitError)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-xl w-96 max-w-full p-6 m-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Add Your Review</h2>

        {/* Star Rating */}
        <div className='flex justify-center mb-4'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type='button'
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className='focus:outline-none'
            >
              <Star
                size={32}
                className={`
                  ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  transition-colors duration-200 ease-in-out
                `}
              />
            </button>
          ))}
        </div>

        {/* Rating Text */}
        <div className='text-center mb-4 text-lg font-semibold'>
          {rating > 0 ? `${rating} Star Rating` : 'Select Your Rating'}
        </div>

        {/* Review Textarea */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder='Write your review here...'
          className='w-full h-32 p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />

        {/* Action Buttons */}
        <div className='flex justify-between space-x-4'>
          <button
            onClick={onClose}
            className='flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || !reviewText.trim() || isLoading}
            className='flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors 
              disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <>
                <svg
                  className='animate-spin h-5 w-5 text-white mr-1'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddReviewModal
