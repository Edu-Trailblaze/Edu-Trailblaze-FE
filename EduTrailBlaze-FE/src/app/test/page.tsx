'use client'
import React, { useState } from 'react'

// Types
interface IQuestion {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface IQuiz {
  id: number
  title: string
  description: string
  questionCount: number
  questions: IQuestion[]
}

interface ILecture {
  id: number
  title: string
  content: string
  quiz?: IQuiz
}

// Sample data
const sampleQuiz: IQuiz = {
  id: 1,
  title: 'Microservices Quiz',
  description: 'Test your knowledge of microservices architecture',
  questionCount: 6,
  questions: [
    {
      id: 1,
      text: 'What is Microservices Architecture?',
      options: [
        'An architecture where all services are tightly integrated into one codebase',
        'A design pattern where an application is broken down into multiple small, independent services',
        'A monolithic system that uses modular components',
        'A method to combine all services into a single, large application'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'Which of the following is NOT a benefit of microservices?',
      options: [
        'Easier scaling of individual components',
        'Simplified deployment process for small changes',
        'Reduced complexity in system management',
        'Technology diversity and flexibility'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'Which of the following are key characteristics of Microservices?',
      options: [
        'Strong coupling between services',
        'Centralized data storage',
        'Independently deployable and scalable services',
        'Single codebase for the entire system'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: 'Which pattern is used to handle data consistency across microservices?',
      options: ['Saga pattern', 'Singleton pattern', 'Factory pattern', 'Observer pattern'],
      correctAnswer: 0
    },
    {
      id: 5,
      text: 'Which deployment strategy is NOT commonly used with microservices?',
      options: ['Blue-Green deployment', 'Canary deployment', 'Big-bang deployment', 'Rolling deployment'],
      correctAnswer: 2
    },
    {
      id: 6,
      text: 'Which of the following is a challenge in microservices architecture?',
      options: [
        'Too simplified testing',
        'Distributed system complexity',
        'Inability to scale individual services',
        'Limited technology choices'
      ],
      correctAnswer: 1
    }
  ]
}

const sampleLecture: ILecture = {
  id: 1,
  title: 'Introduction to Microservices',
  content:
    'This quiz will test your understanding of microservices architecture concepts. There are 6 questions to answer. Good luck!',
  quiz: sampleQuiz
}

// Main Quiz Component
export default function MicroservicesQuiz() {
  const [lecture] = useState<ILecture>(sampleLecture)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(lecture.quiz?.questions.length || 0).fill(-1))
  const [quizCompleted, setQuizCompleted] = useState(false)

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers(Array(lecture.quiz?.questions.length || 0).fill(-1))
    setQuizCompleted(false)
  }

  const skipQuiz = () => {
    // Implementation for skipping the quiz
    console.log('Quiz skipped')
  }

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < (lecture.quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const skipQuestion = () => {
    // Skip this question without answering
    if (currentQuestionIndex < (lecture.quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const calculateScore = () => {
    if (!lecture.quiz) return 0

    let correctCount = 0
    lecture.quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    return correctCount
  }

  // Quiz Intro Screen
  if (!quizStarted && !quizCompleted) {
    return (
      <div className='py-6 max-w-2xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>{lecture.quiz?.title || 'Microservices Quiz'}</h1>
        <p className='text-sm text-gray-500 mb-2'>Quiz 1 | {lecture.quiz?.questionCount || 0} questions</p>

        <div className='mt-6'>
          <button
            onClick={startQuiz}
            className='bg-purple-600 text-white font-medium py-2 px-6 rounded-md mr-4 hover:bg-purple-700'
          >
            Start quiz
          </button>
          <button onClick={skipQuiz} className='text-gray-600 font-medium py-2 px-6 hover:text-gray-800'>
            Skip quiz
          </button>
        </div>
      </div>
    )
  }

  // Quiz Results Screen
  if (quizCompleted) {
    const score = calculateScore()
    const totalQuestions = lecture.quiz?.questions.length || 0

    return (
      <div className='py-6 max-w-2xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Quiz Results</h1>
        <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6'>
          <h2 className='text-2xl font-medium mb-4'>
            You scored: {score}/{totalQuestions}
          </h2>
          <p className='text-gray-700 mb-6'>
            {score === totalQuestions
              ? 'Perfect! You have an excellent understanding of microservices.'
              : score >= totalQuestions / 2
                ? 'Good job! You have a solid grasp of microservices concepts.'
                : 'Keep learning! Microservices architecture can be complex.'}
          </p>

          <button
            onClick={startQuiz}
            className='bg-purple-600 text-white font-medium py-2 px-6 rounded-md mr-4 hover:bg-purple-700'
          >
            Retry Quiz
          </button>
        </div>
      </div>
    )
  }

  // Quiz Questions Screen
  const currentQuestion = lecture.quiz?.questions[currentQuestionIndex]

  return (
    <div className='max-w-3xl mx-auto border-t border-b border-gray-200'>
      {/* Question header */}
      <div className='p-6 border-b border-gray-200'>
        <h2 className='text-lg font-medium'>Question {currentQuestionIndex + 1}:</h2>
        <p className='text-lg mt-2'>{currentQuestion?.text}</p>
      </div>

      {/* Options */}
      <div className='py-2'>
        {currentQuestion?.options.map((option, index) => (
          <div
            key={index}
            className='border-b border-gray-200 py-3 px-4 hover:bg-gray-50 cursor-pointer'
            onClick={() => handleOptionSelect(index)}
          >
            <div className='flex items-center'>
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  selectedAnswers[currentQuestionIndex] === index ? 'border-purple-600' : 'border-gray-400'
                }`}
              >
                {selectedAnswers[currentQuestionIndex] === index && (
                  <div className='w-3 h-3 bg-purple-600 rounded-full'></div>
                )}
              </div>
              <span className='ml-3'>{option}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className='p-4 border-t border-gray-200 flex justify-between items-center'>
        <div className='text-sm text-gray-700'>
          Question {currentQuestionIndex + 1} of {lecture.quiz?.questionCount}
        </div>
        <div className='flex space-x-2'>
          <button onClick={skipQuestion} className='px-4 py-2 text-gray-700 hover:text-gray-900'>
            Skip question
          </button>
          <button
            onClick={goToNextQuestion}
            className={`px-4 py-2 rounded-md text-white ${
              selectedAnswers[currentQuestionIndex] === -1
                ? 'bg-purple-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            disabled={selectedAnswers[currentQuestionIndex] === -1}
          >
            Check answer
          </button>
        </div>
      </div>
    </div>
  )
}
