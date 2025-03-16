'use client'
import React from 'react'
import Button from '../../../../../global/Button/Button'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'
import { BookOpen, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'react-toastify'

interface ReadingLectureProps {
  lecture: ILecture
  userId: string
  userProgress?: UserProgressResponse[]
}

export default function ReadingLecture({ lecture, userId, userProgress }: ReadingLectureProps) {
  const [postUserProgress, { isLoading: enrollLoading }] = usePostUserProgressMutation()

  const progress = userProgress?.find((p) => p.lectureId === lecture.id)

  const handleUserProgress = async () => {
    try {
      await postUserProgress({ userId: userId, lectureId: lecture.id })
      toast.success('Lecture completed!')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Progress indicator */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Clock className='w-5 h-5 text-gray-500' />
          <span className='text-sm text-gray-500'>{lecture.duration} min read</span>
        </div>

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
          <div className='prose prose-blue max-w-none'>
            {typeof lecture.content === 'string' ? (
              lecture.content.split('\n').map((line, index) => (
                <p key={index} className='text-gray-700 leading-relaxed mb-4'>
                  {line}
                </p>
              ))
            ) : (
              <div dangerouslySetInnerHTML={{ __html: lecture.content }} />
            )}
          </div>
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
