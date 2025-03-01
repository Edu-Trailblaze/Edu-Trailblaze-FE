import React, { useState } from 'react'

const QuizCreator = () => {
  const [quiz, setQuiz] = useState({
    lectureId: 0,
    title: '',
    passingScore: 70,
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

  // Add a new question to the quiz
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
  const removeQuestion = (index) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions.splice(index, 1)
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Update question text
  const updateQuestionText = (index, text) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[index].questionText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Update answer text
  const updateAnswerText = (questionIndex, answerIndex, text) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers[answerIndex].answerText = text
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Set correct answer
  const setCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...quiz.questions]
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === answerIndex
    })
    setQuiz({ ...quiz, questions: updatedQuestions })
  }

  // Add a new answer option
  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...quiz.questions]
    if (updatedQuestions[questionIndex].answers.length < 6) {
      updatedQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false })
      setQuiz({ ...quiz, questions: updatedQuestions })
    }
  }

  // Remove an answer option
  const removeAnswer = (questionIndex, answerIndex) => {
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
  const saveQuiz = () => {
    console.log(JSON.stringify(quiz, null, 2))
    alert('Quiz saved successfully!')
  }

  return (
    <div className='min-h-screen bg-blue-50'>
      <div className='container mx-auto py-8 px-4'>
        <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
          <h1 className='text-3xl font-bold text-blue-800 mb-6'>Tạo Bài Kiểm Tra Mới</h1>

          {/* Quiz Basic Info */}
          <div className='mb-8 p-4 bg-blue-100 rounded-lg'>
            <div className='mb-4'>
              <label className='block text-blue-800 font-medium mb-2'>Tiêu đề bài kiểm tra</label>
              <input
                type='text'
                className='w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder='Nhập tiêu đề bài kiểm tra'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-blue-800 font-medium mb-2'>ID bài giảng</label>
              <input
                type='number'
                className='w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={quiz.lectureId}
                onChange={(e) => setQuiz({ ...quiz, lectureId: parseInt(e.target.value) || 0 })}
                placeholder='Nhập ID bài giảng'
              />
            </div>

            <div>
              <label className='block text-blue-800 font-medium mb-2'>Điểm đạt (%) </label>
              <input
                type='number'
                min='0'
                max='100'
                className='w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={quiz.passingScore}
                onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || 0 })}
                placeholder='Nhập điểm đạt'
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-blue-800 mb-4'>Câu hỏi</h2>

            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className='mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-xl font-semibold text-blue-700'>Câu hỏi {questionIndex + 1}</h3>
                  <button
                    onClick={() => removeQuestion(questionIndex)}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    disabled={quiz.questions.length === 1}
                  >
                    Xóa
                  </button>
                </div>

                <div className='mb-4'>
                  <label className='block text-blue-800 font-medium mb-2'>Nội dung câu hỏi</label>
                  <textarea
                    className='w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={question.questionText}
                    onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                    placeholder='Nhập nội dung câu hỏi'
                    rows='2'
                  />
                </div>

                <div className='mb-2'>
                  <label className='block text-blue-800 font-medium mb-2'>Các đáp án</label>
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
                        className='flex-grow p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={answer.answerText}
                        onChange={(e) => updateAnswerText(questionIndex, answerIndex, e.target.value)}
                        placeholder={`Đáp án ${answerIndex + 1}`}
                      />
                      <button
                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                        className='ml-2 bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200'
                        disabled={question.answers.length <= 2}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addAnswer(questionIndex)}
                  className='bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200'
                  disabled={question.answers.length >= 6}
                >
                  + Thêm đáp án
                </button>
              </div>
            ))}

            <button
              onClick={addQuestion}
              className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium'
            >
              + Thêm câu hỏi mới
            </button>
          </div>

          {/* Save Button */}
          <div className='text-center'>
            <button
              onClick={saveQuiz}
              className='bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-medium text-lg'
            >
              Lưu bài kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizCreator
