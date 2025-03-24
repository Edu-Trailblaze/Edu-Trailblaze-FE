// pages/no-lecture.js
import { ArrowLeft, BookOpen, Bell, Library } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

export default function NotAvailable() {
  return (
    <>
      <Head>
        <title>No Lecture Available</title>
        <meta name='description' content="This course doesn't have any lectures yet" />
      </Head>

      <div className='min-h-screen bg-blue-50 flex items-center justify-center p-4'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='h-2 bg-blue-600'></div>

          <div className='p-8'>
            <div className='flex justify-center'>
              <div className='w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600'>
                <BookOpen size={40} />
              </div>
            </div>

            <h1 className='mt-6 text-2xl font-bold text-center text-blue-600'>No Lecture Available</h1>

            <p className='mt-4 text-gray-600 text-center'>
              This course doesn't have any lectures yet. We're working on adding new content. Please check back later.
            </p>

            <div className='mt-8'>
              <Link
                href='/'
                className=' w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition duration-300 flex items-center justify-center'
              >
                <ArrowLeft size={16} className='mr-2' />
                Return to Homepage
              </Link>
            </div>

            <div className='mt-8 bg-blue-50 p-4 rounded-md'>
              <h2 className='font-semibold text-blue-600 mb-3'>You might want to try:</h2>
              <ul className='space-y-3 text-gray-600'>
                <li className='flex items-start'>
                  <BookOpen size={18} className='text-blue-500 mr-2 mt-0.5 flex-shrink-0' />
                  <span>Browse other available courses</span>
                </li>
                <li className='flex items-start'>
                  <Bell size={18} className='text-blue-500 mr-2 mt-0.5 flex-shrink-0' />
                  <span>Sign up for notifications when new lectures are added</span>
                </li>
                <li className='flex items-start'>
                  <Library size={18} className='text-blue-500 mr-2 mt-0.5 flex-shrink-0' />
                  <span>Explore related learning materials in our library</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
