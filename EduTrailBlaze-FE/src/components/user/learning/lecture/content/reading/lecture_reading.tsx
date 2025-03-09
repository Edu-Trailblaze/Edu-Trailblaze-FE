'use client'
import React from 'react'
import Button from '../../../../../global/Button/Button'

interface ReadingLectureProps {
  lecture: ILecture
  userId: string
  userProgress?: UserProgressResponse
}

export default function ReadingLecture({ lecture, userId, userProgress }: ReadingLectureProps) {
  return (
    <div className='py-8 space-y-6'>
      <h2 className='text-3xl font-semibold mb-4'>Document</h2>
      <div className='flex justify-between items-center'>
        <p className='text-gray-700 leading-relaxed'>{lecture.description}</p>
        {userProgress ? (
          <Button disabled size='lg'>
            Already finished
          </Button>
        ) : (
          <Button size='lg'>Make as complete</Button>
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
