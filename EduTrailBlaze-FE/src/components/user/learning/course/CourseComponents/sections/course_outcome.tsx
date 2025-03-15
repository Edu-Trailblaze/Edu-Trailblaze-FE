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
// ^^^ import component vừa tạo, kiểm tra đường dẫn

interface ICourseOutcomeProps {
  userId: string
  courseId: number
}

export default function CourseOutcome({ userId, courseId }: ICourseOutcomeProps) {
  // Gọi API progress
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
        <p>Bạn chưa hoàn thành khóa học!</p>
      </div>
    )
  }

  // Nếu đã hoàn thành => render component CertificateSection
  return <CertificateSection userId={userId} courseId={courseId} />
}
