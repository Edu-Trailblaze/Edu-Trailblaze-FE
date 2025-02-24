import React, { useState } from 'react'
import QuizIntro from './QuizIntro'
import QuizResult from './QuizResult'
import QuizQuestion from './QuizQuestion'
import Loading from '../../../../animate/Loading'

interface QuizData {
  quiz: Quiz
  questions: Question[]
  answers: Answer[]
}

interface QuizLectureProps {
  quizData: QuizData
}

export default function QuizLecture({ quizData }: QuizLectureProps) {
  if (!quizData) {
    return <Loading />
  }
  const { quiz, questions, answers } = quizData

  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [quizCompleted, setQuizCompleted] = useState(false)

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
    handleAnswerSelection(-1) // Đánh dấu là bỏ qua
    goToNextQuestion()
  }

  const handleSkipQuiz = () => {
    console.log('Quiz skipped!')
    setQuizCompleted(true) // Cập nhật state để hiển thị kết quả ngay lập tức
  }

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      const selectedAnswerId = selectedAnswers[index]
      const correctAnswer = answers.find((answer) => answer.questionId === question.id && answer.isCorrect)
      return correctAnswer && correctAnswer.id === selectedAnswerId ? score + 1 : score
    }, 0)
  }

  if (!quizStarted && !quizCompleted) {
    return <QuizIntro quiz={quiz} startQuiz={startQuiz} onSkipQuiz={handleSkipQuiz} />
  }

  if (quizCompleted) {
    return (
      <QuizResult
        score={calculateScore()}
        totalQuestions={questions.length}
        passingScore={quiz.passingScore}
        startQuiz={startQuiz}
      />
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswers = answers.filter((answer) => answer.questionId === currentQuestion.id)

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
