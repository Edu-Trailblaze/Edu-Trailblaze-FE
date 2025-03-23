'use client'
import React from 'react'
import Button from '../../../../../global/Button/Button'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'
import { CheckCircle, FileText, Download } from 'lucide-react'
import { toast } from 'react-toastify'

interface ReadingLectureProps {
  lecture: ILecture
  userId: string
  userProgress?: UserProgressResponse[]
  // refetchUserProgress: () => void
}

export default function ReadingLecture({ lecture, userId, userProgress }: ReadingLectureProps) {
  const [postUserProgress, { isLoading: enrollLoading }] = usePostUserProgressMutation()

  const progress = userProgress?.find((p) => p.lectureId === lecture.id)

  const handleUserProgress = async () => {
    try {
      await postUserProgress({ userId: userId, lectureId: lecture.id })
      toast.success('Lecture completed!')
      // if (refetchUserProgress) {
      //   refetchUserProgress()
      // }
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Progress indicator */}
      <div className='flex justify-end items-center '>
        <div>
          {progress?.isCompleted ? (
            <Button
              disabled
              size='lg'
              className='flex items-center gap-2 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
            >
              <CheckCircle className='w-5 h-5' />
              <span>Completed</span>
            </Button>
          ) : (
            <Button
              onClick={handleUserProgress}
              isLoading={enrollLoading}
              size='lg'
              className='flex items-center gap-2'
            >
              Mark as complete
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
        <div className='p-6'>
          <h1 className='font-semibold text-2xl'>Content</h1>
          <div className='prose prose-blue max-w-none'>{lecture.title}</div>

          {/* Enhanced document display */}
          {lecture.docUrl && (
            <div className='flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100 mt-5'>
              <div className='flex items-center space-x-3'>
                <div className='bg-blue-100 p-2 rounded-md'>
                  <FileText className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h3 className='font-medium text-blue-800'>{lecture.content}</h3>
                  <p className='text-sm text-blue-600'>Document attachment</p>
                </div>
              </div>
              <a
                href={lecture.docUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
              >
                <Download className='w-4 h-4' />
                View Document
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom progress button for better mobile UX */}
      <div className='mt-8 text-center md:hidden'>
        {!progress?.isCompleted && (
          <Button onClick={handleUserProgress} isLoading={enrollLoading} size='lg' className='w-full'>
            Mark as complete
          </Button>
        )}
      </div>
    </div>
  )
}
