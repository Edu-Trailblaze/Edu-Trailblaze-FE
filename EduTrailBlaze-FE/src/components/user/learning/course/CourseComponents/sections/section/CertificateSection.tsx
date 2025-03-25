// CertificateSection.tsx
'use client'
import React from 'react'
import { useGetUserCertificateByConditionsQuery } from '@/redux/services/userCertificate.service'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'

interface ICertificateSectionProps {
  userId: string
  courseId: number
}

export function CertificateSection({ userId, courseId }: ICertificateSectionProps) {
  // Gọi API lấy certificate
  const {
    data: certificate,
    isLoading: isLoadingCertificate,
    error: errorCertificate
  } = useGetUserCertificateByConditionsQuery({ CourseId: courseId, UserId: userId })

  if (isLoadingCertificate)
    return (
      <div className='flex items-center justify-center p-8 border rounded-lg shadow-md bg-gray-50'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin'></div>
          <p className='text-lg font-medium text-gray-700'>Đang tải chứng chỉ...</p>
        </div>
      </div>
    )

  if (errorCertificate)
    return (
      <div className='p-6 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-md'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-red-500 mr-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <div>
            <h3 className='text-lg font-medium text-red-800'>Có lỗi khi tải chứng chỉ</h3>
            <p className='text-red-700 mt-1'>Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu lỗi vẫn tiếp tục.</p>
          </div>
        </div>
      </div>
    )

  if (!certificate) {
    return (
      <div className='p-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg shadow-md'>
        <div className='flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-yellow-500 mr-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <div>
            <h3 className='text-lg font-medium text-yellow-800'>Hoàn thành 100% nhưng chưa có certificate!</h3>
            <p className='text-yellow-700 mt-1'>Chứng chỉ của bạn đang được xử lý. Vui lòng kiểm tra lại sau.</p>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị certificate
  return (
    <div className='flex border-8 shadow-lg shadow-cyan-200/50 p-4 rounded-2xl mb-32 relative w-[1320px]'>
      <div>
        <p className='text-3xl font-semibold mb-7'>Earn a career certificate</p>
        <p className='mb-2'>Add this credential to your LinkedIn profile, resume, or CV</p>
        <p>Share it on social media and in your performance review</p>

        <div className='mt-4'>
          <p>
            Issued At: <FormatDateTime date={certificate.issuedAt} />
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center h-full w-[600px] rounded-r-md bg-slate-400 absolute top-1/2 right-0 transform -translate-y-1/2'>
        <a href={certificate.certificateUrl} target='_blank' rel='noopener noreferrer'>
          {/* Click here to get your certificate */}
          {/* <iframe
            src={`https://firebasestorage.googleapis.com/v0/b/court-callers.appspot.com/o/Certificates%2Fc20ae79a-3de6-4206-b14c-24d491499ea9.pdf?alt=media&token=3d478cf1-a1c4-4cec-9318-0c3223462745`}
            style={{ border: 'none' }}
            width='500px'
            height='200px'
          /> */}
          <img src='/assets/logos/certificate.jpg' alt='certificate' className='w-[400px] h-[400px] object-contain' />
        </a>
      </div>
    </div>
  )
}
