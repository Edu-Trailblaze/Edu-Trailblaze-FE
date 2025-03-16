import React, { useState } from 'react'
import QuizIntro from './QuizIntro'
import QuizResult from './QuizResult'
import QuizQuestion from './QuizQuestion'
import LoadingPage from '../../../../../animate/Loading/LoadingPage'
import { useGetQuizDetailQuery } from '@/redux/services/quiz.service'

interface QuizLectureProps {
  userId: string
  lecture: ILecture
  onNextLecture: () => void
}

export default function QuizLecture({ lecture, onNextLecture, userId }: QuizLectureProps) {
  const { data: quizData } = useGetQuizDetailQuery(lecture.id)

  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!quizData) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  const { passingScore, questions, title } = quizData
  const answers = questions.flatMap((q) => q.answers)

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers(Array(questions.length).fill(-1))
    setQuizCompleted(false)
  }

  const handleAnswerSelection = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const skipQuestion = () => {
    handleAnswerSelection(-1)
    goToNextQuestion()
  }

  const handleSkipQuiz = () => {
    console.log('Quiz skipped!')
    setQuizCompleted(true)
  }

  const calculateScore = () => {
    if (questions.length === 0) return 0

    const correctAnswers = questions.reduce((score, question, index) => {
      const correctAnswer = answers?.find?.((answer) => answer.questionId === question.id && answer.isCorrect)
      return selectedAnswers[index] === correctAnswer?.id ? score + 1 : score
    }, 0)

    return (correctAnswers / questions.length) * 100
  }

  if (!quizStarted && !quizCompleted) {
    return <QuizIntro quiz={quizData} startQuiz={startQuiz} onSkipQuiz={handleSkipQuiz} />
  }

  if (quizCompleted) {
    return (
      <QuizResult
        userId={userId}
        score={calculateScore()}
        lecture={lecture}
        totalQuestions={questions.length}
        passingScore={passingScore}
        startQuiz={startQuiz}
        nextLecutre={onNextLecture}
      />
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswers = answers?.filter?.((answer) => answer.questionId === currentQuestion.id)

  return (
    <QuizQuestion
      question={currentQuestion}
      answers={currentAnswers}
      questionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      selectedAnswer={selectedAnswers[currentQuestionIndex]}
      handleAnswerSelection={handleAnswerSelection}
      goToNextQuestion={goToNextQuestion}
      skipQuestion={skipQuestion}
      onSkipQuiz={handleSkipQuiz}
    />
  )
}
