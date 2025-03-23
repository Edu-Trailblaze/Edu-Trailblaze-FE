import { useEffect } from 'react'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'
import { toast } from 'react-toastify'

interface QuizResultProps {
  lecture: ILecture
  score: number
  totalQuestions: number
  passingScore: number
  userId: string
  startQuiz: () => void
  nextLecutre: () => void
  // refetchUserProgress: () => void
}

export default function QuizResult({
  lecture,
  score,
  totalQuestions,
  passingScore,
  userId,
  startQuiz,
  nextLecutre
  // refetchUserProgress
}: QuizResultProps) {
  const [postUserProgress] = usePostUserProgressMutation()

  const handleUserProgress = async () => {
    try {
      await postUserProgress({ userId: userId, lectureId: lecture.id })
      toast.success('Quiz completed!')
      // if (refetchUserProgress) {
      //   refetchUserProgress()
      // }
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }

  const isPassing = score >= passingScore

  useEffect(() => {
    if (isPassing) {
      handleUserProgress()
    }
  }, [score, passingScore])

  return (
    <div className='container max-w-3xl mx-auto py-8 px-4'>
      <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className={`py-6 px-8 ${isPassing ? 'bg-green-600' : 'bg-blue-600'}`}>
          <h1 className='text-3xl font-bold text-white'>Quiz Result</h1>
          <p className='text-blue-100 mt-2'>
            {isPassing ? 'Congratulations! You passed the quiz.' : 'Keep learning! You can try again.'}
          </p>
        </div>

        <div className='p-8'>
          <div className='flex flex-col items-center mb-8'>
            <div className='relative mb-4'>
              <svg className='w-32 h-32'>
                <circle
                  className='text-gray-200'
                  strokeWidth='8'
                  stroke='currentColor'
                  fill='transparent'
                  r='58'
                  cx='64'
                  cy='64'
                />
                <circle
                  className={`${isPassing ? 'text-green-500' : 'text-blue-500'}`}
                  strokeWidth='8'
                  strokeLinecap='round'
                  stroke='currentColor'
                  fill='transparent'
                  r='58'
                  cx='64'
                  cy='64'
                  strokeDasharray='364.4'
                  strokeDashoffset={364.4 - (364.4 * score) / 100}
                />
              </svg>
              <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <span className='text-3xl font-bold'>{score.toFixed(0)}%</span>
              </div>
            </div>
            <p className='text-center text-lg mb-2'>
              <span className='font-medium'>Passing Score: </span>
              <span>{passingScore}%</span>
            </p>
            <p className='text-center text-gray-700 max-w-md'>
              {isPassing
                ? "Great job! You've demonstrated a solid understanding of the material."
                : `You scored ${score.toFixed(0)}%. You need ${passingScore}% to pass. Keep studying and try again!`}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
            <button
              onClick={startQuiz}
              className='w-full sm:w-auto bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200'
            >
              Try Again
            </button>
            <button
              onClick={nextLecutre}
              className={`w-full sm:w-auto font-medium py-3 px-8 rounded-lg transition-colors duration-200 ${
                isPassing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next Lecture
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
