interface QuizQuestionProps {
  question: { questionText: string }
  answers: { answerText: string; id: number }[]
  questionIndex: number
  totalQuestions: number
  selectedAnswer: number
  userId: string
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
    <div className='py-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-semibold'>Quiz</h1>
      <p className='text-sm text-gray-500 py-5'>
        Question {questionIndex + 1} / {totalQuestions}
      </p>

      <div className='bg-white rounded-xl border-2 border-blue-500 shadow-sm p-6 mb-6'>
        <h2 className='text-xl font-medium mb-4'>{question.questionText}</h2>
        <div className='space-y-4'>
          {answers.map((answer) => (
            <div
              key={answer.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedAnswer === answer.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleAnswerSelection(answer.id)}
            >
              {answer.answerText}
            </div>
          ))}
        </div>
      </div>

      <footer className='w-full flex justify-between '>
        <div className='flex gap-5'>
          <button onClick={onSkipQuiz} className='bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500'>
            Skip Quiz
          </button>
          <button onClick={skipQuestion} className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600'>
            Skip Question
          </button>
        </div>
        <button
          onClick={goToNextQuestion}
          className={`px-4 py-2 rounded-md text-white ${selectedAnswer === -1 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={selectedAnswer === -1}
        >
          Next Question
        </button>
      </footer>
    </div>
  )
}
