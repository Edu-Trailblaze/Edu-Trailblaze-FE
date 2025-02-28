import { Clock, MinusCircleIcon, PlusCircleIcon, X, Check, HelpCircle, Edit3 } from 'lucide-react'
import Button from '../../../../global/Button/Button'
import InputText from '../../../../global/Input/InputText'
import SelectField from '../../../../global/Select/SelectField'
import InputNumber from '../../../../global/Input/InputNumber'
import { useState } from 'react'

interface LectureFieldsProps {
  section: ISectionTest
  sectionIndex: number
  removeLecture: (sectionIndex: number, lectureIndex: number) => void
  handleLectureChange: (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof ILectureTest,
    value: string | boolean | number | IQuestion[]
  ) => void
  setSections: React.Dispatch<React.SetStateAction<ISectionTest[]>>
  sections: ISectionTest[]
}

export default function LectureFields({
  section,
  sectionIndex,
  removeLecture,
  handleLectureChange,
  sections,
  setSections
}: LectureFieldsProps) {
  // State to track expanded lectures and questions
  const [expandedLectures, setExpandedLectures] = useState<Record<number, boolean>>({})
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})

  const toggleLecture = (lectureIndex: number) => {
    setExpandedLectures((prev) => ({
      ...prev,
      [lectureIndex]: !prev[lectureIndex]
    }))
  }

  const toggleQuestion = (lectureIndex: number, questionIndex: number) => {
    const key = `${lectureIndex}-${questionIndex}`
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const addLecture = (sectionIndex: number) => {
    setSections((prevSections) =>
      prevSections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: Date.now(),
                  title: '',
                  lectureType: 'Video',
                  contentPDFFile: '',
                  description: '',
                  duration: 0,
                  passingScore: 0,
                  questions: [
                    {
                      questionText: '',
                      answers: [{ answerText: '', isCorrect: true }]
                    }
                  ]
                }
              ]
            }
          : section
      )
    )
  }

  const addQuestion = (sectionIndex: number, lectureIndex: number) => {
    const newSections = [...sections]
    const lecture = newSections[sectionIndex].lectures[lectureIndex]
    const newQuestionIndex = lecture.questions.length
    lecture.questions.push({
      questionText: '',
      answers: [{ answerText: '', isCorrect: true }]
    })
    setSections(newSections)

    // Automatically expand the new question
    const key = `${lectureIndex}-${newQuestionIndex}`
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: true
    }))
  }

  const removeQuestion = (sectionIndex: number, lectureIndex: number, questionIndex: number) => {
    const newSections = [...sections]
    const lecture = newSections[sectionIndex].lectures[lectureIndex]
    lecture.questions.splice(questionIndex, 1)
    setSections(newSections)
  }

  const addAnswer = (sectionIndex: number, lectureIndex: number, questionIndex: number) => {
    const newSections = [...sections]
    const question = newSections[sectionIndex].lectures[lectureIndex].questions[questionIndex]
    question.answers.push({ answerText: '', isCorrect: false })
    setSections(newSections)
  }

  const removeAnswer = (sectionIndex: number, lectureIndex: number, questionIndex: number, answerIndex: number) => {
    const newSections = [...sections]
    const question = newSections[sectionIndex].lectures[lectureIndex].questions[questionIndex]
    question.answers.splice(answerIndex, 1)
    setSections(newSections)
  }

  const handleQuestionChange = (sectionIndex: number, lectureIndex: number, questionIndex: number, value: string) => {
    const newSections = [...sections]
    const question = newSections[sectionIndex].lectures[lectureIndex].questions[questionIndex]
    question.questionText = value
    setSections(newSections)
  }

  const handleAnswerChange = (
    sectionIndex: number,
    lectureIndex: number,
    questionIndex: number,
    answerIndex: number,
    field: 'answerText' | 'isCorrect',
    value: string | boolean
  ) => {
    setSections((prevSections) =>
      prevSections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lectures: section.lectures.map((lecture, lIndex) =>
                lIndex === lectureIndex
                  ? {
                      ...lecture,
                      questions: lecture.questions.map((question, qIndex) =>
                        qIndex === questionIndex
                          ? {
                              ...question,
                              answers: question.answers.map((answer, aIndex) =>
                                aIndex === answerIndex
                                  ? { ...answer, [field]: value } // ✅ TypeScript hiểu đúng
                                  : answer
                              )
                            }
                          : question
                      )
                    }
                  : lecture
              )
            }
          : section
      )
    )
  }

  // Helper function to get question/answer status
  const getQuestionStatus = (question: IQuestion) => {
    if (!question.questionText.trim()) return 'empty'
    const hasCorrectAnswer = question.answers.some((a) => a.isCorrect)
    const hasEmptyAnswers = question.answers.some((a) => !a.answerText.trim())
    if (hasEmptyAnswers) return 'incomplete'
    if (!hasCorrectAnswer) return 'nocorrect'
    return 'complete'
  }

  const getLectureTypeIcon = (type: 'Reading' | 'Video' | 'Quiz') => {
    switch (type) {
      case 'Reading':
        return <Edit3 className='w-4 h-4' />
      case 'Video':
        return <Clock className='w-4 h-4' />
      case 'Quiz':
        return <HelpCircle className='w-4 h-4' />
    }
  }

  const getLectureTypeColor = (type: 'Reading' | 'Video' | 'Quiz') => {
    switch (type) {
      case 'Reading':
        return 'bg-purple-100 text-purple-800'
      case 'Video':
        return 'bg-blue-100 text-blue-800'
      case 'Quiz':
        return 'bg-amber-100 text-amber-800'
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-base font-medium text-gray-800'>Lecture Content</h3>
      </div>

      {section.lectures.map((lecture, lectureIndex) => {
        const isExpanded = expandedLectures[lectureIndex] || false
        const questionCount = lecture.lectureType === 'Quiz' ? lecture.questions.length : 0

        return (
          <div
            key={lecture.id}
            className={`mb-4 border rounded-lg ${isExpanded ? 'border-blue-300 shadow-sm' : 'border-gray-200'}`}
          >
            {/* Lecture Header - Always visible */}
            <div
              className={`p-3 flex justify-between items-center cursor-pointer rounded-t-lg 
                ${isExpanded ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'}`}
              onClick={() => toggleLecture(lectureIndex)}
            >
              <div className='flex items-center'>
                <div className='mr-2'>
                  {isExpanded ? (
                    <MinusCircleIcon className='h-5 w-5 text-blue-500' />
                  ) : (
                    <PlusCircleIcon className='h-5 w-5 text-gray-500' />
                  )}
                </div>
                <div>
                  <div className='flex items-center'>
                    <span className='font-medium text-gray-900'>
                      Lecture {lectureIndex + 1}: {lecture.title || 'Untitled Lecture'}
                    </span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getLectureTypeColor(lecture.lectureType)}`}>
                      <span className='flex items-center'>
                        {getLectureTypeIcon(lecture.lectureType)}
                        <span className='ml-1'>{lecture.lectureType}</span>
                      </span>
                    </span>
                  </div>
                  <div className='text-xs text-gray-500 mt-1 flex items-center'>
                    <Clock className='w-3 h-3 mr-1' />
                    {lecture.duration} mins
                    {lecture.lectureType === 'Quiz' && <span className='ml-2'>• {questionCount} question</span>}
                  </div>
                </div>
              </div>

              {section.lectures.length > 1 && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    removeLecture(sectionIndex, lectureIndex)
                  }}
                  className='ml-2 text-red-600 p-1 rounded-full hover:bg-red-100'
                >
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>

            {/* Lecture Content - Visible when expanded */}
            {isExpanded && (
              <div className='p-4 border-t border-gray-200 bg-white rounded-b-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  {/* Lecture Title */}
                  <div>
                    <InputText
                      label='Lecture Title'
                      name='lectureTitle'
                      value={lecture.title}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value)}
                      required
                      placeholder='Enter Lecture Title'
                    />
                  </div>
                  <div>
                    {/* Lecture Type */}
                    <SelectField
                      label='Lecture Type'
                      name='type'
                      options={['Reading', 'Video', 'Quiz']}
                      value={lecture.lectureType}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'lectureType', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  {/* Description */}
                  <div>
                    <InputText
                      label='Description'
                      name='description'
                      value={lecture.description}
                      onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'description', e.target.value)}
                      placeholder='Short description of the lecture'
                      type='textarea'
                      rows={2}
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <InputText
                      label='Duration (mins)'
                      name='duration'
                      iconLeft={<Clock className='w-5 h-5 text-gray-500' />}
                      value={String(lecture.duration)}
                      onChange={(e) =>
                        handleLectureChange(sectionIndex, lectureIndex, 'duration', Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                {lecture.lectureType !== 'Quiz' ? (
                  <div className='mb-4'>
                    {/* Content URL */}
                    <InputText
                      label='Content URL'
                      name='contentURL'
                      value={lecture.contentPDFFile}
                      onChange={(e) =>
                        handleLectureChange(sectionIndex, lectureIndex, 'contentPDFFile', e.target.value)
                      }
                      placeholder='Enter content URL'
                    />
                  </div>
                ) : (
                  <div className='mt-4'>
                    <div className='bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4'>
                      <h5 className='text-sm font-medium text-amber-800 mb-2 flex items-center'>
                        <HelpCircle className='w-4 h-4 mr-1' />
                        Quiz Settings
                      </h5>

                      <div className='bg-white p-3 rounded border border-amber-100'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <InputNumber label='Passing Score (%)' name='passingScore' min={0} max={100} />
                        </div>
                      </div>
                    </div>

                    {/* Quiz Questions */}
                    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
                      <div className='bg-gray-50 p-3 border-b border-gray-200'>
                        <h6 className='text-sm font-medium text-gray-700 flex items-center'>
                          <HelpCircle className='w-4 h-4 mr-1' />
                          Number of question: {lecture.questions.length}
                        </h6>
                      </div>

                      <div className='divide-y divide-gray-200'>
                        {lecture.questions.map((question, questionIndex) => {
                          const key = `${lectureIndex}-${questionIndex}`
                          const isQuestionExpanded = expandedQuestions[key] || false
                          const questionStatus = getQuestionStatus(question)

                          return (
                            <div key={questionIndex} className='border-l-4 border-transparent hover:border-l-blue-300'>
                              <div
                                className={`flex justify-between items-center p-3 cursor-pointer
                                  ${isQuestionExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                onClick={() => toggleQuestion(lectureIndex, questionIndex)}
                              >
                                <div className='flex items-center'>
                                  <div className='mr-2'>
                                    {isQuestionExpanded ? (
                                      <MinusCircleIcon className='h-4 w-4 text-blue-500' />
                                    ) : (
                                      <PlusCircleIcon className='h-4 w-4 text-gray-500' />
                                    )}
                                  </div>
                                  <span className='font-medium text-gray-800'>
                                    Question {questionIndex + 1}
                                    {question.questionText &&
                                      `: ${question.questionText.slice(0, 40)}${question.questionText.length > 40 ? '...' : ''}`}
                                  </span>
                                </div>

                                <div className='flex items-center'>
                                  {/* Status indicator */}
                                  {questionStatus === 'complete' && (
                                    <span className='text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full mr-2 flex items-center'>
                                      <Check className='w-3 h-3 mr-1' />
                                      Hoàn thành
                                    </span>
                                  )}
                                  {questionStatus === 'incomplete' && (
                                    <span className='text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full mr-2'>
                                      Chưa hoàn thành
                                    </span>
                                  )}
                                  {questionStatus === 'nocorrect' && (
                                    <span className='text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full mr-2'>
                                      Thiếu đáp án đúng
                                    </span>
                                  )}

                                  {lecture.questions.length > 1 && (
                                    <button
                                      type='button'
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        removeQuestion(sectionIndex, lectureIndex, questionIndex)
                                      }}
                                      className='text-red-600 p-1 rounded-full hover:bg-red-100'
                                    >
                                      <X className='h-3 w-3' />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {isQuestionExpanded && (
                                <div className='p-4 border-t border-gray-100 bg-white'>
                                  <InputText
                                    label='Question Content'
                                    name={`question-${questionIndex}`}
                                    value={question.questionText}
                                    onChange={(e) =>
                                      handleQuestionChange(sectionIndex, lectureIndex, questionIndex, e.target.value)
                                    }
                                    placeholder='Enter question'
                                    type='textarea'
                                    rows={2}
                                  />

                                  <div className='mt-3'>
                                    <h6 className='text-sm font-medium text-gray-700 mb-2'>Answer</h6>

                                    <div className='space-y-3'>
                                      {question.answers.map((answer, answerIndex) => (
                                        <div
                                          key={answerIndex}
                                          className={`p-3 rounded-lg border ${
                                            answer.isCorrect
                                              ? 'border-green-300 bg-green-50'
                                              : 'border-gray-200 bg-white'
                                          }`}
                                        >
                                          <div className='flex items-center gap-3'>
                                            <div className='flex-grow'>
                                              <InputText
                                                label={`Answer ${answerIndex + 1}`}
                                                name={`answer-${questionIndex}-${answerIndex}`}
                                                value={answer.answerText}
                                                onChange={(e) =>
                                                  handleAnswerChange(
                                                    sectionIndex,
                                                    lectureIndex,
                                                    questionIndex,
                                                    answerIndex,
                                                    'answerText',
                                                    e.target.value
                                                  )
                                                }
                                                placeholder='Enter answer'
                                              />
                                            </div>

                                            <div className='flex items-center self-start mt-6 ml-2'>
                                              <div
                                                className={`p-2 rounded-lg border ${
                                                  answer.isCorrect
                                                    ? 'border-green-400 bg-green-100'
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                              >
                                                <label className='flex items-center cursor-pointer'>
                                                  <input
                                                    type='radio'
                                                    name={`correct-${lectureIndex}-${questionIndex}`}
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                      handleAnswerChange(
                                                        sectionIndex,
                                                        lectureIndex,
                                                        questionIndex,
                                                        answerIndex,
                                                        'isCorrect',
                                                        e.target.checked
                                                      )
                                                    }
                                                    className='w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500'
                                                  />
                                                  <span className='ml-2 text-sm text-gray-700'>Correct Answer</span>
                                                </label>
                                              </div>

                                              {question.answers.length > 1 && (
                                                <button
                                                  type='button'
                                                  onClick={() =>
                                                    removeAnswer(sectionIndex, lectureIndex, questionIndex, answerIndex)
                                                  }
                                                  className='ml-2 text-red-600 p-2 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200'
                                                >
                                                  <X className='h-4 w-4' />
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                      <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => addAnswer(sectionIndex, lectureIndex, questionIndex)}
                                        className='mt-2 w-full justify-center bg-white hover:bg-gray-50'
                                        icon={<PlusCircleIcon className='h-4 w-4 mr-1 text-gray-500' />}
                                      >
                                        Add Answer
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      <div className='p-3 bg-gray-50 border-t border-gray-200'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => addQuestion(sectionIndex, lectureIndex)}
                          className='w-full justify-center'
                          icon={<PlusCircleIcon className='h-4 w-4 mr-1 text-blue-500' />}
                        >
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Add Lecture Button */}
      <Button
        variant='outline'
        onClick={() => addLecture(sectionIndex)}
        icon={<PlusCircleIcon className='h-5 w-5 mr-2 text-blue-500' />}
        className='mt-2 w-full justify-center py-3 bg-white hover:bg-blue-50 border-dashed border-blue-300'
      >
        Add New Lecture
      </Button>
    </div>
  )
}
