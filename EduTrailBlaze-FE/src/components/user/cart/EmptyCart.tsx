import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className='flex flex-col items-center justify-center py-8 md:py-16 px-4 min-h-screen bg-gradient-to-b from-white to-blue-50'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center mb-6 md:mb-10 w-full max-w-md mx-auto'
      >
        <h1 className='text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-gray-800'>Shopping Cart</h1>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 200
          }}
          className='relative mb-4 md:mb-6'
        >
          <svg
            className='w-16 h-16 md:w-24 md:h-24 mx-auto text-blue-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            ></path>
          </svg>
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4'
          >
            <svg
              className='w-5 h-5 md:w-6 md:h-6 text-red-500'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                clipRule='evenodd'
              ></path>
            </svg>
          </motion.div>
        </motion.div>

        <p className='text-base md:text-lg text-gray-500 mb-2'>0 course(s) in the Cart</p>
        <p className='text-xl md:text-2xl font-medium mb-6 md:mb-10 text-gray-700'>No course in the cart right now!</p>
      </motion.div>

      <Link href={'/'}>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 25px rgba(37, 99, 235, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className='px-6 md:px-8 py-3 md:py-4 rounded-lg text-white font-bold text-lg md:text-xl relative overflow-hidden w-full max-w-xs md:max-w-md'
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #0EA5E9 100%)',
            boxShadow: '0px 4px 15px rgba(59, 130, 246, 0.3)'
          }}
        >
          <span className='relative z-10 flex items-center justify-center'>
            <span>Get Your Course</span>
            <svg
              className='w-4 h-4 md:w-5 md:h-5 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
            </svg>
          </span>
          <motion.div
            className='absolute top-0 left-0 right-0 bottom-0 opacity-30'
            animate={{
              background: [
                'linear-gradient(135deg, rgba(79, 70, 229, 0) 0%, rgba(79, 70, 229, 0.8) 50%, rgba(79, 70, 229, 0) 100%)',
                'linear-gradient(135deg, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.8) 50%, rgba(37, 99, 235, 0) 100%)',
                'linear-gradient(135deg, rgba(14, 165, 233, 0) 0%, rgba(14, 165, 233, 0.8) 50%, rgba(14, 165, 233, 0) 100%)'
              ],
              left: ['-100%', '100%', '-100%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        </motion.button>
      </Link>
    </div>
  )
}
