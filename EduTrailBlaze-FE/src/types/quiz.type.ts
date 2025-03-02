//GET
interface Answer {
  questionId: number
  answerText: string
  isCorrect: boolean
  id: number
}

interface QuizDetail {
  id: number
  title: string
  passingScore: number
  questions: QuestionDetail[]
}

interface QuestionDetail {
  id: number
  quizzId: number
  questionText: string
  answers: Answer[]
}

//POST
interface CreateQuiz {
  lectureId: number | null
  title: string
  passingScore: number | null
  questions: CreateQuestion[]
}
interface CreateQuestion {
  questionText: string
  answers: CreateAnswer[]
}

interface CreateAnswer {
  answerText: string
  isCorrect: boolean
}
