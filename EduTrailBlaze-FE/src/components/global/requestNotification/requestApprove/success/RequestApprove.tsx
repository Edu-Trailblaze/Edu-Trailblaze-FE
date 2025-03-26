import React, { useEffect, useState } from 'react'

export default function RequestApprove() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setIsAnimating(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null
  return (
    <div className='w-80 space-y-4'>
      <div className='bg-green-50 rounded-md p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <svg
              className='text-green-500 w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0-1.414 1.414l2 2a1 1 0 01.414 0l4-4z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='ml-3'>
            <p className='text-sm font-semibold text-green-800'>Request completed</p>
            <div className='mt-2 text-sm text-green-700'>
              <p>
                Your approve course request has been processed by AI first, please wait for the final approval step from
                the system admin to publish the course. Thank you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}