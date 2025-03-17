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
  if (isLoadingProgress) return <div>Loading progress...</div>
  if (errorProgress) return <div>Error loading progress</div>
  if (!progressData) return <div>No progress data</div>

  // Kiểm tra tiến độ
  const { progressPercentage } = progressData
  const isCompleted = progressPercentage === 100

  // Nếu chưa hoàn thành => hiển thị progress, KHÔNG render certificate
  if (!isCompleted) {
    return (
      <div>
        <p>Progress: {progressPercentage}%</p>
        <p>Bạn chưa hoàn thành khóa học, hãy tiếp tục!</p>
      </div>
    )
  }

  // Nếu đã hoàn thành => render component CertificateSection
  return <CertificateSection userId={userId} courseId={courseId} />
}
