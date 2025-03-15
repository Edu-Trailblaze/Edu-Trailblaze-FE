import React from 'react'
import Image from 'next/image'

export default function CourseOutcome() {
  return (
    <div className='relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-50 to-blue-100'>
      <div className='flex flex-col lg:flex-row'>
        {/* Certificate Info */}
        <div className='p-6 md:p-10 lg:w-1/2'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-gray-800'>Earn a career certificate</h2>
          <div className='space-y-4 text-gray-600'>
            <p className='flex items-center'>
              <span className='mr-2 text-blue-500'>•</span>
              Add this credential to your LinkedIn profile, resume, or CV
            </p>
            <p className='flex items-center'>
              <span className='mr-2 text-blue-500'>•</span>
              Share it on social media and in your performance review
            </p>
            <p className='flex items-center'>
              <span className='mr-2 text-blue-500'>•</span>
              Boost your career opportunities with a verified credential
            </p>
          </div>
          <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 shadow-md'>
            Learn More
          </button>
        </div>

        {/* Certificate Image */}
        <div className='relative lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto flex items-center justify-center'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 opacity-40'></div>
          <div className='relative w-full max-w-md flex items-center justify-center'>
            <img
              src='/assets/logos/certificate.jpg'
              alt='Course Certificate'
              className='object-contain shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-0 right-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full -mt-10 -mr-10'></div>
      <div className='absolute bottom-0 left-0 w-16 h-16 bg-green-500 opacity-10 rounded-full -mb-8 -ml-8'></div>
    </div>
  )
}
