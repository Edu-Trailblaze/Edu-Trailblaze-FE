// import React from 'react'
// import Image from 'next/image'

// export default function CourseOutcome() {
//   return (
//     <div className='relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-50 to-blue-100'>
//       <div className='flex flex-col lg:flex-row'>
//         {/* Certificate Info */}
//         <div className='p-6 md:p-10 lg:w-1/2'>
//           <h2 className='text-2xl md:text-3xl font-bold mb-4 text-gray-800'>Earn a career certificate</h2>
//           <div className='space-y-4 text-gray-600'>
//             <p className='flex items-center'>
//               <span className='mr-2 text-blue-500'>•</span>
//               Add this credential to your LinkedIn profile, resume, or CV
//             </p>
//             <p className='flex items-center'>
//               <span className='mr-2 text-blue-500'>•</span>
//               Share it on social media and in your performance review
//             </p>
//             <p className='flex items-center'>
//               <span className='mr-2 text-blue-500'>•</span>
//               Boost your career opportunities with a verified credential
//             </p>
//           </div>
//           <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 shadow-md'>
//             Learn More
//           </button>
//         </div>

//         {/* Certificate Image */}
//         <div className='relative lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto flex items-center justify-center'>
//           <div className='absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 opacity-40'></div>
//           <div className='relative w-full max-w-md flex items-center justify-center'>
//             <img
//               src='/assets/logos/certificate.jpg'
//               alt='Course Certificate'
//               className='object-contain shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300'
//             />
//           </div>
//         </div>
//       </div>

//       {/* Decorative Elements */}
//       <div className='absolute top-0 right-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full -mt-10 -mr-10'></div>
//       <div className='absolute bottom-0 left-0 w-16 h-16 bg-green-500 opacity-10 rounded-full -mb-8 -ml-8'></div>
//     </div>
//   )
// }

// 'use client'
// import React from 'react'
// import { useGetStudentCourseProgressQuery } from '@/redux/services/enroll.service'

// import { useGetUserCertificatesByConditionsQuery } from '@/redux/services/userCertificate.service'

// interface ICourseOutcomeProps {
//   userId: string
//   courseId: number
// }

// export default function CourseOutcome({ userId, courseId }: ICourseOutcomeProps) {

//   const { data, isLoading, error } = useGetStudentCourseProgressQuery({
//     studentId: userId,
//     courseId
//   })

//   if (isLoading) return <div>Loading progress...</div>
//   if (error) return <div>Error loading progress</div>

//   // Lấy giá trị progressPercentage từ data
//   const progressPercentage = data?.progressPercentage ?? 0
//   const isCompleted = progressPercentage === 100

//   // Nếu chưa hoàn thành, có thể hiển thị progress hoặc ẩn block certificate
//   if (!isCompleted) {
//     return (
//       <div>
//         <p>Progress: {progressPercentage}%</p>
//         <p>Bạn chưa hoàn thành khóa học!</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       {/* Certificate */}
//       <div className=' flex border-8 shadow-lg shadow-cyan-200/50 p-4 rounded-2xl mb-32 relative w-[1320px]'>
//         <div>
//           <p className='text-3xl font-semibold mb-7'>Earn a career certificate</p>
//           <p className='mb-2'>Add this credential to your LinkedIn profile, resume, or CV</p>
//           <p>Share it on social media and in your performance review</p>
//         </div>
//         <div className='flex justify-center items-center h-full w-[600px] rounded-r-md bg-slate-400 absolute top-1/2 right-0 transform -translate-y-1/2'>
//           <img src='/assets/logos/certificate.jpg' alt='certificate' className='w-[400px] h-[400px] object-contain' />
//         </div>
//       </div>
//     </>
//   )
// }

// CourseOutcome.tsx
'use client'
import React from 'react'
import { useGetStudentCourseProgressQuery } from '@/redux/services/enroll.service'
import { CertificateSection } from '../sections/section/CertificateSection'

interface ICourseOutcomeProps {
  userId: string
  courseId: number
}

export default function CourseOutcome({ userId, courseId }: ICourseOutcomeProps) {
  const {
    data: progressData,
    isLoading: isLoadingProgress,
    error: errorProgress
  } = useGetStudentCourseProgressQuery({
    studentId: userId,
    courseId
  })

  // Loading & error
  if (isLoadingProgress)
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 w-full max-w-4xl my-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Đang tải thông tin khóa học...</p>
      </div>
    )

    if (errorProgress)
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 w-full max-w-4xl my-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800">Unable to load progress information</h3>
          </div>
          <p className="text-red-700 ml-12">Please enroll in the course to stay updated on progress or contact support if the error persists.</p>
        </div>
      )

      if (!progressData)
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 w-full max-w-4xl my-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-yellow-800">Chưa có dữ liệu tiến độ</h3>
            </div>
            <p className="text-yellow-700 ml-12">
              Bạn chưa bắt đầu khóa học này. Hãy bắt đầu học để theo dõi tiến độ của bạn.
            </p>
          </div>
        )

  // Kiểm tra tiến độ
  const { progressPercentage } = progressData
  const isCompleted = progressPercentage === 100

  // Nếu chưa hoàn thành => hiển thị progress, KHÔNG render certificate
  if (!isCompleted) {
    return (
      <div className="w-full max-w-4xl my-8">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Tiến độ khóa học</h3>
          <span className="text-lg font-bold text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">Bạn chưa hoàn thành khóa học! Hãy tiếp tục học để nhận chứng chỉ.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Nếu đã hoàn thành => render component CertificateSection
  return <CertificateSection userId={userId} courseId={courseId} />
}
