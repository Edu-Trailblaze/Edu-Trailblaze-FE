import React from 'react'

interface QuizIntroProps {
  quiz: { title: string }
  startQuiz: () => void
  onSkipQuiz: () => void
}

export default function QuizIntro({ quiz, startQuiz, onSkipQuiz }: QuizIntroProps) {
  return (
    <div className='container py-8'>
      <h1 className='text-3xl font-semibold mb-4'>{quiz.title}</h1>
      <main className='gap-3'>
        <button
          onClick={startQuiz}
          className='bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700'
        >
          Start Quiz
        </button>
        <button
          onClick={onSkipQuiz}
          className='bg-gray-400 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-500'
        >
          Skip Quiz
        </button>
      </main>
    </div>
  )
}
