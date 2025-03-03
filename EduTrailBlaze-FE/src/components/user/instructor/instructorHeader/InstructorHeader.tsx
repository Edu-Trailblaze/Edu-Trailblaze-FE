import { Bell } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function InstructorHeader() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <div className='h-8 w-44 relative'>
                  <div className='absolute inset-0 flex items-center'><img alt='EduTrailBlaze Logo' src='/assets/logos/ETB_Logo.png' className='h-8 md:h-10' /></div>
                </div>
              </div>
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8 p-4'>
                <Link href='/instructor/dashboard/coursePage'>
                  <span className='border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Courses
                  </span>
                </Link>
                {/* <Link href='/instructor/students'>
                  <span className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Students
                  </span>
                </Link> */}
                <Link href='/instructor/dashboard/analyticsPage'>
                  <span className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Analytics
                  </span>
                </Link>
                <Link href='/instructor/messages'>
                  <span className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Messages
                  </span>
                </Link>
              </div>
            </div>
            <div className='flex items-center'>
              <button className='p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none'>
                <span className='sr-only'>Notifications</span>
                <Bell size={20} />
              </button>
              <div className='ml-3 relative'>
                <div>
                  <button className='flex text-sm rounded-full focus:outline-none'>
                    <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                      <span className='text-xs font-medium'>JD</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className='ml-3 -mr-1 md:hidden'>
                <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'>
                  <span className='sr-only'>Open menu</span>
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
