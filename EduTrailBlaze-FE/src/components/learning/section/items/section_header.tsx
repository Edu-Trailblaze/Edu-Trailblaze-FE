import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SectionHeader() {
  return (
    <div className='p-6 bg-sky-200 relative mb-20'>
      <div className='container flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 mb-20'>
        {/* Left */}
        <div className='w-1/2 pr-8 '>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Section Title</h1>
          <p className='text-lg text-gray-700 mb-6'>Section Description</p>

          <div className='flex items-center space-x-3 mb-5'>
            <p className='text-gray-700'>
              Instructor:{' '}
              <a href='#' className='text-blue-600 underline'>
                Instructor Name
              </a>
            </p>
          </div>
          <button className='bg-blue-700 text-white py-3 px-6 w-60 rounded-lg hover:bg-blue-600 mb-4'>
            Start Learning
          </button>
          <p className='font-bold'>0 already registed</p>
        </div>
        {/* Right */}
        <div className='w-1/2 min-h-[400px] relative'>
          <img
            src='/assets/Logos/AI.png'
            alt='Section Image'
            className='rounded-lg shadow-lg h-[400px] w-[700px] absolute right-10'
          />
        </div>
      </div>

      <div className='mx-auto p-6 rounded-lg border-2 bg-white container absolute bottom-[-60px] left-0 right-0 max-w-[1400px]'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg underline'>6 modules</p>
            <p className='text-gray-500'>Get insight into a topic and learn the fundamentals</p>
          </div>
          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>Flexible Schedule</p>
            <p className='text-gray-500'>Approx 7 hours</p>
            <p className='text-gray-500'>Learn at your own place</p>
          </div>
          <div className='text-center md:border-r-2 border-gray-300'>
            <p className='font-semibold text-lg'>5 course services</p>
            <p className='text-gray-500'>Get in-depth knowledge of a subject</p>
          </div>
          <div className='text-center '>
            <p className='font-semibold text-lg'>Earn degree credit</p>
            <p className='text-gray-500'>Learn more <InfoOutlinedIcon/></p>
          </div>
        </div>
    </div>
    </div>
  )
}
