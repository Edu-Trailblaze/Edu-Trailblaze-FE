import React, { useState } from 'react'
import QuizIntro from './QuizIntro'
import QuizResult from './QuizResult'
import QuizQuestion from './QuizQuestion'

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

interface QuizLectureProps {
  lecture: ILecture
}

export default function QuizLecture({ lecture }: QuizLectureProps) {
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

  const handleAnswerSelection = (optionIndex: number) => {
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

  const calculateScore = () => {
    if (!lecture.quiz) return 0
    return lecture.quiz.questions.reduce(
      (score, question, index) => (selectedAnswers[index] === question.correctAnswer ? score + 1 : score),
      0
    )
  }

  if (!quizStarted && !quizCompleted) {
    return <QuizIntro lecture={lecture} startQuiz={startQuiz} />
  }

  if (quizCompleted) {
    return (
      <QuizResult score={calculateScore()} totalQuestions={lecture.quiz?.questions.length || 0} startQuiz={startQuiz} />
    )
  }

  return (
    <QuizQuestion
      question={lecture.quiz?.questions[currentQuestionIndex]}
      questionIndex={currentQuestionIndex}
      totalQuestions={lecture.quiz?.questions.length || 0}
      selectedAnswer={selectedAnswers[currentQuestionIndex]}
      handleAnswerSelection={handleAnswerSelection}
      goToNextQuestion={goToNextQuestion}
    />
  )
}
