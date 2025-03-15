import React, { useState } from 'react'
import { ArrowDown, ArrowUp, CheckCircle, XCircle, Info, Edit, Trash, Eye, EyeOff } from 'lucide-react'
import { useDeleteQuizMutation, useGetQuizDetailQuery } from '@/redux/services/quiz.service'
import { toast } from 'react-toastify'

interface QuizItemProp {
  lectureId: number
}

export default function PreviewQuiz({ lectureId }: QuizItemProp) {
  const [activeQuestionId, setActiveQuestionId] = useState(0)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
  const { data: quizData, isLoading: quizLoading, isFetching: quizFetching } = useGetQuizDetailQuery(lectureId)
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation()

  const toggleQuestion = (questionId: number) => {
    if (activeQuestionId === questionId) {
      setActiveQuestionId(0)
    } else {
      setActiveQuestionId(questionId)
    }
  }

  const getCorrectAnswerCount = () => {
    return quizData?.questions.reduce((total, question) => {
      const correctAnswers = question.answers.filter((answer) => answer.isCorrect)
      return total + correctAnswers.length
    }, 0)
  }

  const toggleShowCorrectAnswers = () => {
    setShowCorrectAnswers(!showCorrectAnswers)
  }

  const handleDelete = async () => {
    if (!quizData) return

    const confirmDelete = window.confirm(`Are you sure to delete "${quizData.title}" ?`)
    if (!confirmDelete) return

    try {
      await deleteQuiz(quizData.id).unwrap()
      toast.success('Delete Quiz successfully!')
      window.location.reload()
    } catch (error) {
      toast.error('Delete Failed! Please try again.')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='mb-8 bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='bg-indigo-600 p-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <div>
                <h1 className='text-2xl md:text-3xl font-bold text-white'>{quizData?.title}</h1>
                <p className='text-indigo-200 mt-2'>Quiz ID: {quizData?.id}</p>
              </div>
              <div className='mt-4 md:mt-0 flex space-x-3'>
                <button
                  type='submit'
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className='px-4 py-2 bg-red-500 text-white rounded-md font-medium flex items-center shadow-md hover:bg-red-600 transition-all'
                >
                  <Trash size={16} className='mr-2' /> {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-indigo-50 p-4 rounded-lg border border-indigo-100'>
                <p className='text-indigo-400 text-sm font-medium'>Questions</p>
                <p className='text-3xl font-bold text-indigo-700'>{quizData?.questions.length}</p>
              </div>
              <div className='bg-indigo-50 p-4 rounded-lg border border-indigo-100'>
                <p className='text-indigo-400 text-sm font-medium'>Passing Score</p>
                <p className='text-3xl font-bold text-indigo-700'>{quizData?.passingScore}%</p>
              </div>
              <div className='bg-indigo-50 p-4 rounded-lg border border-indigo-100'>
                <p className='text-indigo-400 text-sm font-medium'>Total Correct Answers</p>
                <p className='text-3xl font-bold text-indigo-700'>{getCorrectAnswerCount()}</p>
              </div>
            </div>

            <div className='mt-6 flex justify-end'>
              <button
                type='button'
                onClick={toggleShowCorrectAnswers}
                className='flex items-center text-sm font-medium px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-all'
              >
                {showCorrectAnswers ? (
                  <>
                    <EyeOff size={16} className='mr-2' /> Hide Correct Answers
                  </>
                ) : (
                  <>
                    <Eye size={16} className='mr-2' /> Show Correct Answers
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'>
          <div className='bg-indigo-600 p-4'>
            <h2 className='text-xl font-bold text-white'>Quiz Questions</h2>
          </div>

          <div>
            {quizData?.questions.map((question, index) => (
              <div key={question.id} className='border-b border-gray-200 last:border-b-0'>
                <div
                  className='p-4 flex justify-between items-center cursor-pointer hover:bg-indigo-50 transition-all'
                  onClick={() => toggleQuestion(question.id)}
                >
                  <div className='flex items-center'>
                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold mr-3'>
                      {index + 1}
                    </span>
                    <h3 className='font-medium text-gray-800'>{question.questionText}</h3>
                  </div>
                  {activeQuestionId === question.id ? (
                    <ArrowUp className='text-indigo-600' size={20} />
                  ) : (
                    <ArrowDown className='text-indigo-600' size={20} />
                  )}
                </div>

                {activeQuestionId === question.id && (
                  <div className='bg-gray-50 p-4 pl-16'>
                    <h4 className='font-medium text-gray-600 mb-3'>Answer Options:</h4>
                    <div className='space-y-2'>
                      {question.answers.map((answer) => (
                        <div key={answer.id} className='flex items-start'>
                          {showCorrectAnswers && (
                            <div className='mr-2 mt-0.5'>
                              {answer.isCorrect ? (
                                <CheckCircle size={16} className='text-green-500' />
                              ) : (
                                <XCircle size={16} className='text-red-500' />
                              )}
                            </div>
                          )}
                          <div
                            className={`flex-1 p-2 rounded-md ${showCorrectAnswers && answer.isCorrect ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-200'}`}
                          >
                            {answer.answerText}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md font-medium shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center">
            <Info size={16} className="mr-2" /> View Student Results
          </button>
          <div className="flex gap-3 w-full md:w-auto">
            <button type='button' className="flex-1 md:flex-auto px-6 py-3 bg-indigo-100 text-indigo-700 rounded-md font-medium hover:bg-indigo-200 transition-all">
              Preview Quiz
            </button>
            <button className="flex-1 md:flex-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all">
              Export Data
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
