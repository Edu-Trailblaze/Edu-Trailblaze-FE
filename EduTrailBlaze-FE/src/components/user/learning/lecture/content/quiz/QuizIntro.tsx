import React from 'react'

interface QuizIntroProps {
  quiz: { title: string }
  startQuiz: () => void
  onSkipQuiz: () => void
}

export default function QuizIntro({ quiz, startQuiz, onSkipQuiz }: QuizIntroProps) {
  return (
    <div className='container max-w-3xl mx-auto py-12 px-4'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='bg-blue-600 py-6 px-8'>
          <h1 className='text-3xl font-bold text-white'>{quiz.title}</h1>
          <p className='text-blue-100 mt-2'>Test your knowledge with this quiz</p>
        </div>

        <div className='p-8'>
          <div className='flex flex-col sm:flex-row gap-4 items-center'>
            <button
              onClick={startQuiz}
              className='w-full sm:w-auto bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center'
            >
              <span className='mr-2'>Start Quiz</span>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {/* <button
              onClick={onSkipQuiz}
              className='w-full sm:w-auto bg-gray-100 text-gray-700 font-medium py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-200'
            >
              Skip Quiz
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
