'use client'
import React from 'react'

interface ReadingLectureProps {
  lecture: ILecture
}

export default function ReadingLecture({ lecture }: ReadingLectureProps) {
  return (
    <div className='py-8 space-y-6'>
      <p className='text-3xl font-bold'>{lecture.title}</p>

      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
        {lecture.content.split('\n').map((line, index) => (
          <p key={index} className='text-gray-700 leading-relaxed'>
            {line}
          </p>
        ))}
      </div>

      {/* Danh sách file đọc */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Document</h2>
        <p className='text-gray-700 leading-relaxed'>{lecture.description}</p>
      </div>
    </div>
  )
}
