import React from 'react'

interface QuizResultProps {
  score: number
  totalQuestions: number
  passingScore: number
  startQuiz: () => void
}

export default function QuizResult({ score, totalQuestions, passingScore, startQuiz }: QuizResultProps) {
  return (
    <div className='py-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-semibold mb-4'>Quiz Result</h1>
      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
        <h2 className='text-2xl font-medium mb-4'>
          Score: {score}/{totalQuestions}
        </h2>
        <p className='text-gray-700 mb-6'>
          {score >= passingScore ? 'Congratulations! You passed!' : 'Try again to improve your results!'}
        </p>

        <button
          onClick={startQuiz}
          className='bg-purple-600 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700'
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
