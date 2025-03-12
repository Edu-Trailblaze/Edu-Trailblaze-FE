'use client'
import CourseFields from './Content/CourseFields'

export default function CreateForm() {
  return (
    <div className='min-h-screen bg-blue-50'>
      <main className='container  py-10 px-6 sm:px-6 lg:px-40'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <div className='p-6 bg-blue-600 text-white'>
            <h1 className='text-2xl font-bold'>Create New Course</h1>
            <p className='text-blue-100 mt-1'>Fill in the details below to create your course</p>
          </div>
          <CourseFields />
        </div>
      </main>
    </div>
  )
}
