'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function LoginRequest() {
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
    <div className='fixed bottom-6 right-6 max-w-sm z-50 animate-fade-in'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='bg-blue-600 px-4 py-2 flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <h3 className='font-medium text-white text-sm'>Thông báo</h3>
          </div>
        </div>

        <div className='p-4'>
          <p className='text-sm text-gray-700 mb-4'>Please log in to access full features and personalized content.</p>

          <div className='flex justify-end space-x-2'>
            <Link href={'/auth/login_register'}>
              <button className='px-4 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700'>Log In</button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
