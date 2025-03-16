import React from 'react'

interface QuizQuestionProps {
  question: { questionText: string }
  answers: { answerText: string; id: number }[]
  questionIndex: number
  totalQuestions: number
  selectedAnswer: number
  handleAnswerSelection: (answerId: number) => void
  goToNextQuestion: () => void
  skipQuestion: () => void
  onSkipQuiz: () => void
}

export default function QuizQuestion({
  question,
  answers,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  handleAnswerSelection,
  goToNextQuestion,
  skipQuestion,
  onSkipQuiz
}: QuizQuestionProps) {
  return (
    <div className='container max-w-3xl mx-auto py-8 px-4'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='bg-blue-600 py-4 px-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-white'>Quiz</h1>
            <div className='bg-blue-500 text-white text-sm font-medium rounded-full px-4 py-1'>
              Question {questionIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div className='w-full bg-blue-500 h-2 mt-4 rounded-full'>
            <div
              className='bg-white h-2 rounded-full'
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className='p-6'>
          <h2 className='text-xl font-semibold mb-6'>{question.questionText}</h2>
          <div className='space-y-3'>
            {answers.map((answer) => (
              <div
                key={answer.id}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === answer.id
                    ? 'border-blue-600 bg-blue-50 shadow-md transform scale-[1.01]'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleAnswerSelection(answer.id)}
              >
                <div className='flex items-center'>
                  <div
                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      selectedAnswer === answer.id ? 'bg-blue-600' : 'border-2 border-gray-300'
                    }`}
                  >
                    {selectedAnswer === answer.id && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3 text-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </div>
                  <span className='text-gray-800'>{answer.answerText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex gap-3 w-full sm:w-auto'>
            <button
              onClick={skipQuestion}
              className='w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium'
            >
              Skip Question
            </button>
            <button
              onClick={onSkipQuiz}
              className='w-full sm:w-auto border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium'
            >
              Skip Quiz
            </button>
          </div>
          <button
            onClick={goToNextQuestion}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium flex items-center justify-center ${
              selectedAnswer === -1
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
            }`}
            disabled={selectedAnswer === -1}
          >
            <span>Next Question</span>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 ml-2' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
