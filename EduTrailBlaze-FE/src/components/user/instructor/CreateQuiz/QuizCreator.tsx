'use client'
import React, { useState } from 'react'
import InputText from '../../../global/Input/InputText'
import InputNumber from '../../../global/Input/InputNumber'
import Button from '../../../global/Button/Button'
import { useCreateQuizMutation } from '../../../../redux/services/quiz.service'

const QuizCreator = () => {
  const [createQuiz, { isLoading, isError, isSuccess }] = useCreateQuizMutation()

  const [quiz, setQuiz] = useState<CreateQuiz>({
    lectureId: 69,
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
  }

  // Remove a question from the quiz
  const removeQuestion = (index: number) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions.splice(index, 1)
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Update question text
  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[index].questionText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Update answer text
  const updateAnswerText = (questionIndex: number, answerIndex: number, text: string) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers[answerIndex].answerText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Set correct answer
  const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === answerIndex
    })
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Add a new answer option
  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = [...quiz.questions]
    if (updatedQuestions[questionIndex].answers.length < 6) {
      updatedQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false })
      setQuiz({ ...quiz, questions: updatedQuestions })
    }
  }

  // Remove an answer option
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
    const response = await createQuiz(quiz).unwrap()
    console.log('response', response)
    alert('Quiz saved successfully!')
  }

  return (
    <div className='min-h-screen container'>
      <div className='container mx-auto py-8 px-4'>
        <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
          <h1 className='text-2xl font-bold text-blue-800 mb-6'>Create New Quiz</h1>

          {/* Quiz Basic Info */}
          <div className='mb-8 p-4 bg-blue-100 rounded-lg'>
            <div className='mb-4'>
              <InputText
                label={<label className='block text-blue-800 font-semibold mb-2'>Quiz Title</label>}
                name='quizTitle'
                value={quiz.title}
                variant='blue'
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder='Input quiz title'
                required
              />
            </div>

            <div className='mb-4'>
              <InputNumber
                label={<label className='block text-blue-800 font-semibold  mb-2'>Lecture ID</label>}
                name='lecutreId'
                min={0}
                value={quiz.lectureId}
                onChange={(e) => setQuiz({ ...quiz, lectureId: parseInt(e.target.value) || 0 })}
                placeholder='Enter Lecture Id'
                required
              />
            </div>

            <div>
              <InputNumber
                label={<label className='block text-blue-800 font-semibold  mb-2'>Passing Score</label>}
                name='passingScore'
                min={0}
                max={100}
                value={quiz.passingScore}
                onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || 0 })}
                placeholder='Enter Passing Score'
                required
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-blue-800 mb-4'>Question</h2>

            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className='mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='flex justify-between items-center mb-4'>
                  <h5 className='font-semibold text-blue-700'>Question {questionIndex + 1}</h5>

                  <Button
                    variant='danger'
                    onClick={() => removeQuestion(questionIndex)}
                    disabled={quiz.questions.length === 1}
                  >
                    Delete
                  </Button>
                </div>

                <div className='mb-4'>
                  <InputText
                    label={<label className='block text-blue-800 mb-2'></label>}
                    type='textarea'
                    name='questionContent'
                    value={question.questionText}
                    onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                    placeholder='Enter Question Content'
                    rows={2}
                  />
                </div>

                <div className='mb-2'>
                  <label className='block text-blue-800 mb-2'>Answer</label>
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className='flex items-center mb-3'>
                      <input
                        type='radio'
                        id={`q${questionIndex}-a${answerIndex}`}
                        name={`question-${questionIndex}-correct`}
                        checked={answer.isCorrect}
                        onChange={() => setCorrectAnswer(questionIndex, answerIndex)}
                        className='mr-2'
                      />
                      <input
                        type='text'
                        className='flex-grow p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                        value={answer.answerText}
                        onChange={(e) => updateAnswerText(questionIndex, answerIndex, e.target.value)}
                        placeholder={`Answer ${answerIndex + 1}`}
                      />

                      <Button
                        size='sd'
                        variant='Red'
                        disabled={question.answers.length <= 2}
                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                      >
                        x
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  size='ml'
                  variant='Blue'
                  onClick={() => addAnswer(questionIndex)}
                  disabled={question.answers.length >= 6}
                >
                  + New Answer
                </Button>
              </div>
            ))}

            <Button onClick={addQuestion} size='ml' className='w-full'>
              + New Question
            </Button>
          </div>

          {/* Save Button */}
          <div className='text-center'>
            <Button size='lg' variant='DarkBlue' onClick={saveQuiz} isLoading={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizCreator
