'use client'
import React, { useState } from 'react'
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Save,
  HelpCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import InputText from '../../../global/Input/InputText'
import InputNumber from '../../../global/Input/InputNumber'
import Button from '../../../global/Button/Button'
import { useCreateQuizMutation } from '../../../../redux/services/quiz.service'

interface QuizItemProp {
  lectureId: number
}

const QuizCreator = ({ lectureId }: QuizItemProp) => {
  const [createQuiz, { isLoading, isError, isSuccess }] = useCreateQuizMutation()
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)

  const [quiz, setQuiz] = useState<CreateQuiz>({
    lectureId: lectureId,
    title: '',
    passingScore: 0,
    questions: [
      {
        questionText: '',
        answers: [
          { answerText: '', isCorrect: true },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false }
        ]
      }
    ]
  })

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          questionText: '',
          answers: [
            { answerText: '', isCorrect: true },
            { answerText: '', isCorrect: false },
            { answerText: '', isCorrect: false },
            { answerText: '', isCorrect: false }
          ]
        }
      ]
    })
    setActiveQuestion(quiz.questions.length)
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions.splice(index, 1)
    setQuiz({ ...quiz, questions: updatedQuestions })
    if (activeQuestion >= updatedQuestions.length) {
      setActiveQuestion(Math.max(0, updatedQuestions.length - 1))
    }
  }

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === quiz.questions.length - 1)) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const updatedQuestions = [...quiz.questions]
    const temp = updatedQuestions[index]
    updatedQuestions[index] = updatedQuestions[newIndex]
    updatedQuestions[newIndex] = temp

    setQuiz({ ...quiz, questions: updatedQuestions })
    setActiveQuestion(newIndex)
  }

  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[index].questionText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  const updateAnswerText = (questionIndex: number, answerIndex: number, text: string) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers[answerIndex].answerText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === answerIndex
    })
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...quiz.questions]
    if (updatedQuestions[questionIndex].answers.length < 6) {
      updatedQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false })
      setQuiz({ ...quiz, questions: updatedQuestions })
    }
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions]
    if (updatedQuestions[questionIndex].answers.length > 2) {
      // Don't remove if it's the correct answer
      if (updatedQuestions[questionIndex].answers[answerIndex].isCorrect) {
        alert('Cannot remove the correct answer. Please mark another answer as correct first.')
        return
      }
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1)
      setQuiz({ ...quiz, questions: updatedQuestions })
    }
  }

  // Save quiz
  const saveQuiz = async () => {
    try {
      // Validation
      if (!quiz.title.trim()) {
        alert('Please enter a quiz title')
        return
      }

      if ((quiz.passingScore ?? 0) <= 0 || (quiz.passingScore ?? 0) > 100) {
        alert('Passing score must be between 1 and 100')
        return
      }

      for (let i = 0; i < quiz.questions.length; i++) {
        if (!quiz.questions[i].questionText.trim()) {
          alert(`Question ${i + 1} cannot be empty`)
          setActiveQuestion(i)
          return
        }

        for (let j = 0; j < quiz.questions[i].answers.length; j++) {
          if (!quiz.questions[i].answers[j].answerText.trim()) {
            alert(`Answer ${j + 1} in Question ${i + 1} cannot be empty`)
            setActiveQuestion(i)
            return
          }
        }
      }

      const response = await createQuiz(quiz).unwrap()
      console.log('response', response)
      alert('Quiz saved successfully!')
    } catch (error) {
      console.error('Error saving quiz:', error)
      alert('Failed to save quiz. Please try again.')
    }
  }

  const isQuizValid = () => {
    if (!quiz.title.trim()) return false
    if ((quiz.passingScore ?? 0) <= 0 || (quiz.passingScore ?? 0) > 100) return false

    for (const question of quiz.questions) {
      if (!question.questionText.trim()) return false

      for (const answer of question.answers) {
        if (!answer.answerText.trim()) return false
      }
    }

    return true
  }

  const questionsProgress = () => {
    return (
      <div className='flex flex-wrap gap-2 mb-6'>
        {quiz.questions.map((_, index) => (
          <button
            type='button'
            key={index}
            onClick={() => setActiveQuestion(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              index === activeQuestion
                ? 'bg-blue-600 text-white transform scale-110 shadow-lg'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          type='button'
          onClick={addQuestion}
          className='w-10 h-10 rounded-full bg-blue-50 text-blue-600 border-2 border-dashed border-blue-300 flex items-center justify-center hover:bg-blue-100 transition-all'
          title='Add new question'
        >
          <Plus size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='container mx-auto py-8 px-4'>
        <div className='bg-white shadow-xl rounded-2xl p-8 mb-8 border border-blue-100'>
          <div className='flex items-center justify-between mb-8 pb-4 border-b border-blue-100'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent'>
              Create Interactive Quiz
            </h1>
            <div className='flex gap-3'>
              <Button
                type='button'
                variant={previewMode ? 'primary' : 'outline'}
                onClick={() => setPreviewMode(!previewMode)}
                className='flex items-center gap-2'
              >
                <HelpCircle size={16} />
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button
                type='button'
                variant='DarkBlue'
                onClick={saveQuiz}
                isLoading={isLoading}
                disabled={!isQuizValid()}
                className='flex items-center gap-2'
              >
                <Save size={16} />
                Save Quiz
              </Button>
            </div>
          </div>

          {/* Quiz Basic Info */}
          <div className='mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100'>
            <h2 className='text-xl font-bold text-blue-800 mb-4 flex items-center'>
              <span className='bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-2'>
                i
              </span>
              Quiz Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='border-2 focus:border-blue-500 rounded-lg'>
                <InputText
                  label={<label className='block text-blue-800 font-semibold mb-2'>Quiz Title</label>}
                  name='quizTitle'
                  value={quiz.title}
                  variant='blue'
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  placeholder='Input quiz title'
                  required
                  // className='border-2 focus:border-blue-500 rounded-lg'
                />
              </div>

              <div className='bg-white border rounded-md shadow-sm px-4 py-7 w-[28rem]'>
                <label htmlFor='quiz-title' className='block text-sm font-semibold text-blue-800 mb-1'>
                  LectureId
                </label>
                <div className='mt-1'>
                  <div className='border rounded-md py-2 px-3 text-gray-500'>{quiz.lectureId}</div>
                </div>
              </div>

              <div className='md:col-span-2'>
                <InputNumber
                  label={
                    <div className='flex items-center justify-between w-full'>
                      <label className='block text-blue-800 font-semibold mb-2'>Passing Score (%)</label>
                      <span className='text-sm text-blue-600 font-medium'>{quiz.passingScore}%</span>
                    </div>
                  }
                  name='passingScore'
                  min={0}
                  max={100}
                  value={quiz.passingScore}
                  onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) })}
                  placeholder='Enter Passing Score'
                  required
                  // className='border-2 focus:border-blue-500 rounded-lg'
                />
                <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full'
                    style={{ width: `${Math.max(0, Math.min(100, quiz.passingScore ?? 0))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Navigation */}
          {!previewMode && questionsProgress()}

          {/* Questions Section */}
          <div className='mb-6'>
            {previewMode ? (
              <div className='bg-white rounded-xl p-6 shadow-sm border border-blue-100'>
                <h2 className='text-2xl font-bold text-blue-800 mb-6 text-center'>Quiz Preview</h2>
                <div className='max-w-3xl mx-auto'>
                  <div className='text-xl font-bold mb-8 text-center'>{quiz.title || 'Untitled Quiz'}</div>

                  {quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className='mb-10 p-6 bg-gray-50 rounded-xl'>
                      <div className='text-lg font-semibold mb-4'>
                        <span className='bg-blue-600 text-white px-3 py-1 rounded-lg mr-2'>{qIndex + 1}</span>
                        {question.questionText || 'Question text goes here'}
                      </div>
                      <div className='space-y-3 ml-10'>
                        {question.answers.map((answer, aIndex) => (
                          <div
                            key={aIndex}
                            className='flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors'
                          >
                            <div className='w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center mr-3'>
                              {answer.isCorrect && <div className='w-3 h-3 bg-blue-600 rounded-full'></div>}
                            </div>
                            <div>{answer.answerText || `Answer option ${aIndex + 1}`}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className='text-center mt-6 text-gray-600'>Passing score: {quiz.passingScore}%</div>
                </div>
              </div>
            ) : (
              quiz.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className={`transition-all duration-300 ${
                    activeQuestion === questionIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 absolute -left-full'
                  }`}
                  style={{
                    display: activeQuestion === questionIndex ? 'block' : 'none'
                  }}
                >
                  <div className='p-6 bg-white rounded-xl shadow-sm border border-blue-100 mb-6'>
                    <div className='flex justify-between items-center mb-4'>
                      <div className='flex items-center'>
                        <span className='bg-blue-600 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center mr-3'>
                          {questionIndex + 1}
                        </span>
                        <h3 className='font-bold text-blue-800 text-xl'>Question</h3>
                      </div>

                      <div className='flex gap-2'>
                        <Button
                          type='button'
                          variant='ghost'
                          onClick={() => moveQuestion(questionIndex, 'up')}
                          disabled={questionIndex === 0}
                          className='w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50'
                          title='Move question up'
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button
                          type='button'
                          variant='ghost'
                          onClick={() => moveQuestion(questionIndex, 'down')}
                          disabled={questionIndex === quiz.questions.length - 1}
                          className='w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50'
                          title='Move question down'
                        >
                          <ArrowDown size={16} />
                        </Button>
                        <Button
                          type='button'
                          variant='danger'
                          size='sd'
                          onClick={() => removeQuestion(questionIndex)}
                          disabled={quiz.questions.length === 1}
                          className='flex items-center'
                        >
                          <Trash2 size={16} className='mr-1' /> Remove
                        </Button>
                      </div>
                    </div>

                    <div className='mb-6'>
                      <InputText
                        label={<label className='block text-blue-800 font-semibold mb-2'>Question Text</label>}
                        type='textarea'
                        name='questionContent'
                        value={question.questionText}
                        onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                        placeholder='Enter your question here...'
                        rows={3}
                        // className='border-2 focus:border-blue-500 rounded-lg w-full'
                      />
                    </div>

                    <div className='mb-4'>
                      <div className='flex justify-between items-center mb-3'>
                        <label className='block text-blue-800 font-semibold'>Answer Options</label>
                        <div className='text-sm text-blue-600'>Select the correct answer</div>
                      </div>

                      <div className='space-y-3'>
                        {question.answers.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className={`flex items-center p-3 rounded-lg transition-all ${
                              answer.isCorrect
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <div className='flex-shrink-0 mr-3'>
                              <input
                                type='radio'
                                id={`q${questionIndex}-a${answerIndex}`}
                                name={`question-${questionIndex}-correct`}
                                checked={answer.isCorrect}
                                onChange={() => setCorrectAnswer(questionIndex, answerIndex)}
                                className='w-5 h-5 text-blue-600'
                              />
                            </div>
                            <div className='flex-grow'>
                              <input
                                type='text'
                                className='w-full p-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none'
                                value={answer.answerText}
                                onChange={(e) => updateAnswerText(questionIndex, answerIndex, e.target.value)}
                                placeholder={`Answer option ${answerIndex + 1}`}
                              />
                            </div>
                            <div className='flex-shrink-0 ml-2'>
                              {answer.isCorrect && <CheckCircle size={18} className='text-green-600' />}
                            </div>
                            <div className='flex-shrink-0 ml-2'>
                              <Button
                                type='button'
                                size='sd'
                                variant='ghost'
                                disabled={question.answers.length <= 2}
                                onClick={() => removeAnswer(questionIndex, answerIndex)}
                                className='w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full'
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <Button
                        type='button'
                        size='ml'
                        variant='outline'
                        onClick={() => addAnswer(questionIndex)}
                        disabled={question.answers.length >= 6}
                        className='flex items-center gap-2'
                      >
                        <Plus size={16} /> Add Answer Option
                      </Button>

                      <div className='text-sm text-gray-500'>{question.answers.length}/6 options</div>
                    </div>
                  </div>

                  <div className='flex justify-between mb-8'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setActiveQuestion(Math.max(0, activeQuestion - 1))}
                      disabled={activeQuestion === 0}
                      className='flex items-center gap-2'
                    >
                      <ArrowLeft size={16} /> Previous
                    </Button>

                    {activeQuestion < quiz.questions.length - 1 ? (
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setActiveQuestion(activeQuestion + 1)}
                        className='flex items-center gap-2'
                      >
                        Next <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button variant='blue' onClick={addQuestion} className='flex items-center gap-2' type='button'>
                        <Plus size={16} /> Add New Question
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          <div className='flex justify-between items-center border-t border-blue-100 pt-6'>
            <div className='text-blue-800'>
              <span className='font-semibold'>{quiz.questions.length}</span> questions
              {quiz.title && <span className='mx-2'>•</span>}
              {quiz.title && <span>{quiz.title}</span>}
            </div>
          </div>

          {/* Status Message */}
          {isError && (
            <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700'>
              <AlertCircle className='mr-2' size={20} />
              Failed to save quiz. Please check your inputs and try again.
            </div>
          )}

          {isSuccess && (
            <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700'>
              <CheckCircle className='mr-2' size={20} />
              Quiz saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizCreator
