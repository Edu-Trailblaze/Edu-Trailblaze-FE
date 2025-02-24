import React from 'react'

interface QuizQuestionProps {
  question?: { text: string; options: string[] }
  questionIndex: number
  totalQuestions: number
  selectedAnswer: number
  handleAnswerSelection: (optionIndex: number) => void
  goToNextQuestion: () => void
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  handleAnswerSelection,
  goToNextQuestion
}: QuizQuestionProps) {
  return (
    <div className='py-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-semibold'>Quiz</h1>
      <p className='text-sm text-gray-500'>
        Question {questionIndex + 1} of {totalQuestions}
      </p>

      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6 mb-6'>
        <h2 className='text-xl font-medium mb-4'>{question?.text}</h2>
        <div className='space-y-4'>
          {question?.options.map((option, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 cursor-pointer ${selectedAnswer === index ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-gray-400'}`}
              onClick={() => handleAnswerSelection(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToNextQuestion}
        className={`px-4 py-2 rounded-md text-white ${selectedAnswer === -1 ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
        disabled={selectedAnswer === -1}
      >
        Next Question
      </button>
    </div>
  )
}
