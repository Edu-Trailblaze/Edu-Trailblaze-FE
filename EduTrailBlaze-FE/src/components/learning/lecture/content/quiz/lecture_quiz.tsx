import React from 'react'

interface QuizLectureProps {
  lecture: ILecture
}

export default function QuizLecture({ lecture }: QuizLectureProps) {
  return (
    <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
      <h2 className='text-xl font-semibold mb-4'>Quiz</h2>
      <p className='text-gray-700'>{lecture.content}</p>
      <p className='text-sm text-gray-500 mt-2'>Tính năng làm bài quiz sẽ được thêm sau.</p>
    </div>
  )
}
