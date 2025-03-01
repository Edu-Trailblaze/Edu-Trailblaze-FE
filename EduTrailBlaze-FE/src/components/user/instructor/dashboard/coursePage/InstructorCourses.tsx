'use client'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  ChevronDown,
  Filter,
  Bell,
  Settings,
  HelpCircle,
  Lightbulb,
  Video,
  MessageCircle,
  MoreVertical
} from 'lucide-react'

export default function InstructorCourses() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('newest')

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation Bar */}
      <nav className='bg-white shadow-sm sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <div className='h-8 w-44 relative'>
                  <div className='absolute inset-0 flex items-center'><img alt='EduTrailBlaze Logo' src='/assets/logos/ETB_Logo.png' className='h-8 md:h-10' /></div>
                </div>
              </div>
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8 p-4'>
                <Link href='/instructor/courses'>
                  <span className='border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Courses
                  </span>
                </Link>
                <Link href='/instructor/students'>
                  <span className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer'>
                    Students
                  </span>
                </Link>
                <Link href='/instructor/analytics'>
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

      {/* Main Content */}
      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Courses</h1>
          <div className='flex items-center space-x-2'>
            <button className='text-gray-500 hover:text-gray-700'>
              <Settings size={20} />
            </button>
            <button className='text-gray-500 hover:text-gray-700'>
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0'>
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search your courses'
                className='border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='absolute inset-y-0 right-0 px-3 flex items-center bg-indigo-600 text-white rounded-r-md'>
                <Search size={16} />
              </button>
            </div>
            <div className='relative inline-block text-left'>
              <button className='inline-flex justify-between w-full sm:w-32 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
                <span>{sortOption === 'newest' ? 'Newest' : sortOption === 'oldest' ? 'Oldest' : 'Popular'}</span>
                <ChevronDown size={16} className='ml-2' />
              </button>
            </div>
          </div>
          <div className='flex space-x-2'>
            <button className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'>
              <Filter size={16} className='mr-2' />
              Filter
            </button>
            <button className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'>
              New course
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-gray-500 text-sm'>Total Courses</p>
            <div className='flex items-center mt-1'>
              <span className='text-2xl font-bold'>12</span>
              <span className='text-green-500 ml-2 text-sm'>+2 new</span>
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-gray-500 text-sm'>Active Students</p>
            <div className='flex items-center mt-1'>
              <span className='text-2xl font-bold'>1,248</span>
              <span className='text-green-500 ml-2 text-sm'>+8.5%</span>
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-gray-500 text-sm'>Course Completion</p>
            <div className='flex items-center mt-1'>
              <span className='text-2xl font-bold'>76%</span>
              <span className='text-red-500 ml-2 text-sm'>-2.3%</span>
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'>
            <p className='text-gray-500 text-sm'>Revenue This Month</p>
            <div className='flex items-center mt-1'>
              <span className='text-2xl font-bold'>$14,320</span>
              <span className='text-green-500 ml-2 text-sm'>+12%</span>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className='space-y-4'>
          <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-gray-100 p-4 flex items-center md:w-60'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-12 bg-gray-200 flex items-center justify-center rounded'>
                    <span className='text-xs text-gray-500'>Course</span>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>DRAFT</h3>
                  <p className='text-sm text-gray-500'>Public</p>
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div>
                  <span className='text-gray-400 font-medium'>Finish your course</span>
                </div>
                <div className='mt-2 md:mt-0'>
                  <Link href='/instructor/courses/edit'>
                    <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                      Edit / manage course
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-gray-100 p-4 flex items-center md:w-60'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-12 bg-gray-200 flex items-center justify-center rounded'>
                    <span className='text-xs text-gray-500'>Course</span>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>React</h3>
                  <p className='text-sm text-gray-500'>DRAFT Public</p>
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-auto'>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='text-gray-500 font-medium mb-2 sm:mb-0 sm:mr-4'>Finish your course</span>
                    <div className='w-full sm:w-64 bg-gray-200 rounded-full h-2 flex-1'>
                      <div className='bg-indigo-600 h-2 rounded-full' style={{ width: '15%' }}></div>
                    </div>
                    <span className='mt-1 sm:mt-0 sm:ml-2 text-sm text-gray-500'>15%</span>
                  </div>
                </div>
                <div className='mt-4 md:mt-0'>
                  <Link href='/instructor/courses/react/edit'>
                    <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                      Continue editing
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-gray-100 p-4 flex items-center md:w-60'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-12 bg-gray-200 flex items-center justify-center rounded'>
                    <span className='text-xs text-gray-500'>Course</span>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>JavaScript Basics</h3>
                  <p className='text-sm text-gray-500'>Published</p>
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-auto'>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='text-gray-500 font-medium mb-2 sm:mb-0 sm:mr-4'>Course completion</span>
                    <div className='w-full sm:w-64 bg-gray-200 rounded-full h-2 flex-1'>
                      <div className='bg-green-500 h-2 rounded-full' style={{ width: '100%' }}></div>
                    </div>
                    <span className='mt-1 sm:mt-0 sm:ml-2 text-sm text-gray-500'>100%</span>
                  </div>
                </div>
                <div className='mt-4 md:mt-0'>
                  <Link href='/instructor/courses/javascript'>
                    <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                      View course
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-gray-100 p-4 flex items-center md:w-60'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-12 bg-gray-200 flex items-center justify-center rounded'>
                    <span className='text-xs text-gray-500'>Course</span>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>Python for Data Science</h3>
                  <p className='text-sm text-gray-500'>Published</p>
                </div>
              </div>
              <div className='flex-1 p-4 flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-auto'>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='text-gray-500 font-medium mb-2 sm:mb-0 sm:mr-4'>Course completion</span>
                    <div className='w-full sm:w-64 bg-gray-200 rounded-full h-2 flex-1'>
                      <div className='bg-green-500 h-2 rounded-full' style={{ width: '100%' }}></div>
                    </div>
                    <span className='mt-1 sm:mt-0 sm:ml-2 text-sm text-gray-500'>100%</span>
                  </div>
                </div>
                <div className='mt-4 md:mt-0'>
                  <Link href='/instructor/courses/python'>
                    <span className='text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer'>
                      View course
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Creation Guide */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Course Creation Guide</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='flex items-center mb-3'>
                <div className='bg-indigo-100 rounded-full p-2 mr-3'>
                  <Lightbulb size={16} className='text-indigo-600' />
                </div>
                <h3 className='font-medium'>Plan Your Course</h3>
              </div>
              <p className='text-sm text-gray-600'>
                Define your course objectives, audience, and outline the curriculum structure.
              </p>
              <Link href='/instructor/guides/planning'>
                <span className='text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block cursor-pointer'>
                  Learn more →
                </span>
              </Link>
            </div>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='flex items-center mb-3'>
                <div className='bg-indigo-100 rounded-full p-2 mr-3'>
                  <Video size={16} className='text-indigo-600' />
                </div>
                <h3 className='font-medium'>Create Content</h3>
              </div>
              <p className='text-sm text-gray-600'>
                Record high-quality videos, prepare downloadable resources, and create engaging quizzes.
              </p>
              <Link href='/instructor/guides/content'>
                <span className='text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block cursor-pointer'>
                  Learn more →
                </span>
              </Link>
            </div>
            <div className='border border-gray-200 rounded-lg p-4'>
              <div className='flex items-center mb-3'>
                <div className='bg-indigo-100 rounded-full p-2 mr-3'>
                  <MessageCircle size={16} className='text-indigo-600' />
                </div>
                <h3 className='font-medium'>Launch & Promote</h3>
              </div>
              <p className='text-sm text-gray-600'>
                Set pricing, publish your course, and implement marketing strategies to reach your target audience.
              </p>
              <Link href='/instructor/guides/launch'>
                <span className='text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block cursor-pointer'>
                  Learn more →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Recent Activity</h2>
          <div className='space-y-4'>
            <div className='flex'>
              <div className='flex-shrink-0 mr-3'>
                <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs font-medium'>SJ</span>
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium text-gray-900'>Sarah Johnson</span> enrolled in{' '}
                  <span className='font-medium text-gray-900'>React</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>2 hours ago</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-shrink-0 mr-3'>
                <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs font-medium'>MB</span>
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium text-gray-900'>Michael Brown</span> completed{' '}
                  <span className='font-medium text-gray-900'>JavaScript Basics</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>5 hours ago</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-shrink-0 mr-3'>
                <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs font-medium'>ED</span>
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium text-gray-900'>Emily Davis</span> left a 5-star review on{' '}
                  <span className='font-medium text-gray-900'>Python for Data Science</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>Yesterday</p>
              </div>
            </div>
            <div className='flex'>
              <div className='flex-shrink-0 mr-3'>
                <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-xs font-medium'>DW</span>
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium text-gray-900'>David Wilson</span> asked a question in{' '}
                  <span className='font-medium text-gray-900'>JavaScript Basics</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>2 days ago</p>
              </div>
            </div>
          </div>
          <Link href='/instructor/activity'>
            <span className='text-sm text-indigo-600 hover:text-indigo-800 mt-4 inline-block cursor-pointer'>
              View all activity →
            </span>
          </Link>
        </div>

        {/* Upcoming Deadlines */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Upcoming Deadlines</h2>
          <div className='space-y-3'>
            <div className='flex justify-between items-center border-b border-gray-200 pb-3'>
              <div>
                <h3 className='font-medium'>Complete React course outline</h3>
                <p className='text-sm text-gray-500'>React</p>
              </div>
              <div className='flex items-center'>
                <span className='text-sm text-red-500 mr-2'>Due tomorrow</span>
                <button className='text-gray-400 hover:text-gray-500'>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center border-b border-gray-200 pb-3'>
              <div>
                <h3 className='font-medium'>Record introduction video</h3>
                <p className='text-sm text-gray-500'>React</p>
              </div>
              <div className='flex items-center'>
                <span className='text-sm text-orange-500 mr-2'>Due in 3 days</span>
                <button className='text-gray-400 hover:text-gray-500'>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-medium'>Prepare quiz questions</h3>
                <p className='text-sm text-gray-500'>JavaScript Basics</p>
              </div>
              <div className='flex items-center'>
                <span className='text-sm text-gray-500 mr-2'>Due in 7 days</span>
                <button className='text-gray-400 hover:text-gray-500'>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
