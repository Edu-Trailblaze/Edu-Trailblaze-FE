interface Quiz {
  lectureId: number
  title: string
  passingScore: number
  createdAt: string
  updatedAt: string
  id: number
}

interface Question {
  quizzId: number
  questionText: string
  createdAt: string
  updatedAt: string
  id: number
}

interface Answer {
  questionId: number
  answerText: string
  isCorrect: boolean
  id: number
}
