import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function NoSpecialtyNotification() {
  return (
    <div className='flex items-center justify-center  p-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-md text-center'>
        <div className='flex justify-center mb-6'>
          <AlertTriangle className='text-red-500' size={64} />
        </div>

        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Important Notification</h1>

        <p className='text-gray-600 mb-6'>
          You haven't set up your specialty yet. Please update your profile information to complete your profile.
        </p>

        <Link
          href='/student/profile'
          className='w-full inline-block bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out'
        >
          Go to Profile
        </Link>
      </div>
    </div>
  )
}
