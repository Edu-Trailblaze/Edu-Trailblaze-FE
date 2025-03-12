'use client'
import React from 'react'
import Button from '../../../../../global/Button/Button'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'

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
      window.location.reload()
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }
  return (
    <div className='py-8 space-y-6'>
      <h2 className='text-3xl font-semibold mb-4'>Document</h2>
      <div className='flex justify-between items-center'>
        <p className='text-gray-700 leading-relaxed'>{lecture.description}</p>
        {progress?.isCompleted ? (
          <Button disabled size='lg'>
            Already finished
          </Button>
        ) : (
          <Button onClick={handleUserProgress} isLoading={enrollLoading} size='lg'>
            Make as complete
          </Button>
        )}
      </div>

      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
        {lecture.content.split('\n').map((line, index) => (
          <p key={index} className='text-gray-700 leading-relaxed'>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
