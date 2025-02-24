'use client'
import React from 'react'
import { Download } from 'lucide-react'

interface ReadingLectureProps {
  lecture: ILecture
}

export default function ReadingLecture({ lecture }: ReadingLectureProps) {
  return (
    <div className='py-8 space-y-6'>
      <p className='text-3xl font-bold'>{lecture.title}</p>

      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
        <p className='text-gray-700 leading-relaxed'>{lecture.content}</p>
      </div>

      {/* Danh sách file đọc */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Document</h2>
        <p className='text-gray-700 leading-relaxed'>{lecture.description}</p>
        <ul className='space-y-3'>
          {lecture.content.split(',').map((file: any, index: any) => (
            <li key={index} className='flex items-center gap-3'>
              <Download className='w-5 h-5 text-blue-600' />
              <a href={file.trim()} download className='text-blue-600 hover:underline'>
                {file.split('/').pop()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
