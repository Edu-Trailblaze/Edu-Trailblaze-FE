import React from 'react'

interface QuizIntroProps {
  lecture: { quiz?: { title: string; questionCount: number } }
  startQuiz: () => void
}

export default function QuizIntro({ lecture, startQuiz }: QuizIntroProps) {
  return (
    <div className='py-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-semibold mb-4'>{lecture.quiz?.title || 'Microservices Quiz'}</h1>
      <p className='text-sm text-gray-500 mb-2'>Quiz | {lecture.quiz?.questionCount || 0} questions</p>

      <div className='mt-6'>
        <button
          onClick={startQuiz}
          className='bg-purple-600 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700'
        >
          Start quiz
        </button>
      </div>
    </div>
  )
}
