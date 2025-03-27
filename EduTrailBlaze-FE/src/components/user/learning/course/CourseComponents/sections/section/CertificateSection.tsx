'use client'
import React from 'react'
import { useGetUserCertificateByConditionsQuery } from '@/redux/services/userCertificate.service'
import FormatDateTime from '@/components/admin/Date/FormatDateTime'
import { FileText, Share2, Award, Download } from 'lucide-react'

interface ICertificateSectionProps {
  userId: string
  courseId: number
}

export function CertificateSection({ userId, courseId }: ICertificateSectionProps) {
  // Fetch certificate
  const {
    data: certificate,
    isLoading: isLoadingCertificate,
    error: errorCertificate
  } = useGetUserCertificateByConditionsQuery({ CourseId: courseId, UserId: userId })

  // Loading State
  if (isLoadingCertificate)
    return (
      <div className=' border border-gray-200 rounded-xl p-6  mx-auto'>
        <div className='flex items-center justify-center space-x-4 animate-pulse'>
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <div className='flex-1 space-y-3'>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
            <div className='h-4 bg-gray-300 rounded w-1/2'></div>
          </div>
        </div>
      </div>
    )

  // Error State
  if (errorCertificate)
    return (
      <div className='border border-red-200 rounded-xl p-6  mx-auto'>
        <div className='flex items-center bg-red-50 p-4 rounded-lg'>
          <Award className='h-10 w-10 text-red-500 mr-4' />
          <div>
            <h3 className='text-lg font-semibold text-red-800'>Certificate Loading Error</h3>
            <p className='text-red-700 text-sm'>We couldn't retrieve your certificate. Please try again later.</p>
          </div>
        </div>
      </div>
    )

  // No Certificate State
  if (!certificate) {
    return (
      <div className='bg-white border border-yellow-200 rounded-xl p-6  mx-auto'>
        <div className='flex items-center bg-yellow-50 p-4 rounded-lg'>
          <Award className='h-10 w-10 text-yellow-500 mr-4' />
          <div>
            <h3 className='text-lg font-semibold text-yellow-800'>Certificate Pending</h3>
            <p className='text-yellow-700 text-sm'>Your certificate is being processed. Check back soon!</p>
          </div>
        </div>
      </div>
    )
  }

  // Certificate Display
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6  mx-auto shadow-sm'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-6'>
        <div className='flex items-center space-x-3 mb-4 md:mb-0'>
          <Award className='h-8 w-8 text-blue-600' />
          <h2 className='text-2xl font-bold text-gray-800'>Career Certificate</h2>
        </div>

        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <FileText className='h-4 w-4 text-blue-500' />
          <span>
            Completed: <FormatDateTime date={certificate.issuedAt} />
          </span>
        </div>
      </div>

      <div className='bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100'>
        <p className='text-lg font-medium text-gray-700 mb-3'>Congratulations on completing your course!</p>
        <p className='text-sm text-gray-600 mb-2'>Add this credential to:</p>
        <ul className='list-disc list-inside text-sm text-gray-600 space-y-1 pl-4'>
          <li>LinkedIn profile</li>
          <li>Resume or CV</li>
          <li>Professional portfolio</li>
        </ul>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4'>
        <p className='text-sm text-gray-500 text-center sm:text-left'>
          Click the button to view, download, or share your achievement
        </p>
        <a
          href={certificate.certificateUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full sm:w-auto flex items-center justify-center 
            px-6 py-3 bg-blue-600 text-white font-semibold 
            rounded-lg hover:bg-blue-700 transition-colors 
            duration-300 space-x-2 group'
        >
          <Share2 className='h-5 w-5 group-hover:animate-pulse' />
          <span>View Certificate</span>
          <Download className='h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity' />
        </a>
      </div>
    </div>
  )
}

export default CertificateSection
