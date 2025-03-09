'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function RequestPaymentMethod() {
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
      <div className='bg-red-50 rounded-md p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <svg
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              className='text-red-500 w-5 h-5'
            >
              <path
                clipRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                fillRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='ml-1 flex flex-col'>
            <p className='text-red-800 font-semibold text-sm'>Payment method needed</p>
            <div className='mt-2 text-red-700 text-sm'>
              <ul role='list' className='list-disc pl-5 mt-1'>
                <li>Please select a payment method to continue checkout.</li>
                <li>Available payment methods: VnPay, MoMo, Paypal or Your App Ballance</li>
              </ul>
            </div>
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
