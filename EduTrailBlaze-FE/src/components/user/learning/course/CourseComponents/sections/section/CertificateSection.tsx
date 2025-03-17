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

  if (isLoadingCertificate) return <div>Đang tải chứng chỉ...</div>
  if (errorCertificate) return <div>Có lỗi khi tải chứng chỉ</div>
  if (!certificate) {
    return <div>Hoàn thành 100% nhưng chưa có Certificate!</div>
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
            Issued At:{' '}
            <FormatDateTime date={certificate.issuedAt} />
          </p>
        </div>

      </div>

      <div className='flex justify-center items-center h-full w-[600px] rounded-r-md bg-slate-400 absolute top-1/2 right-0 transform -translate-y-1/2'>
        <a
          href={certificate.certificateUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={certificate.certificateUrl}
            alt='certificate'
            className='w-[400px] h-[400px] object-contain cursor-pointer'
          />
        </a>
      </div>
    </div>
  )
}
