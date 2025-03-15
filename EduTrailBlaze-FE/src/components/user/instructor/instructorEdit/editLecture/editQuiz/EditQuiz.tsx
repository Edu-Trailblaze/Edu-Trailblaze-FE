import Modal from '@/components/global/Modal/Modal'
import React, { useState } from 'react'
import QuizCreator from '../../../CreateQuiz/QuizCreator'

interface QuizItemProp {
    lectureId: number
  }

export default function EditQuiz({ lectureId }: QuizItemProp) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleAddQuiz = () => {
    setIsModalOpen(true)
  }
  return (
    <>
      <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>Quiz</h3>
          </div>
          <button
            onClick={handleAddQuiz}
            type='button'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
            Add Quiz
          </button>
        </div>

        {/* Quiz Settings */}
        {/* <div className='mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='text-sm font-medium text-yellow-800 mb-2'>Cài đặt bài kiểm tra</h4>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
                />
                <span className='ml-2 text-sm text-gray-700'>Thời gian giới hạn</span>
              </label>
            </div>
            <div>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
                />
                <span className='ml-2 text-sm text-gray-700'>Hiển thị đáp án</span>
              </label>
            </div>
            <div></div>
          </div>
        </div> */}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Add New Quiz'>
        <QuizCreator lectureId={lectureId} />
      </Modal>
    </>
  )
}
