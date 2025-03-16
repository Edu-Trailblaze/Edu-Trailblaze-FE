'use client'
import Button from '@/components/global/Button/Button'
import { useCreateLectureMutation } from '@/redux/services/lecture.service'
import { Check, RotateCcw } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'

interface LectureInfoProps {
  sectionId: number
}

export default function CreateLecture({ sectionId }: LectureInfoProps) {
  const [postLecture, { isLoading: addLectureLoading }] = useCreateLectureMutation()
  const [lectureInfo, setLectureInfo] = useState({
    sectionId: sectionId,
    lectureType: '',
    title: '',
    content: '',
    description: '',
    duration: 0
  })

  const handleAddLecture = async () => {
    const formData = new FormData()
    formData.append('SectionId', String(lectureInfo.sectionId))
    formData.append('LectureType', lectureInfo.lectureType)
    formData.append('Title', lectureInfo.title)
    formData.append('Description', lectureInfo.description)
    formData.append('Content', lectureInfo.content)
    formData.append('Duration', String(lectureInfo.duration))

    try {
      await postLecture(formData).unwrap()
      toast.success('Lecture added successfully!')
      setTimeout(function () {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Failed to add lecture')
    }
  }

  const handleReset = () => {}

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='flex justify-center items-center'>
        {/* Main content */}
        <main className='flex-1 ml-0 md:ml-0 pb-12'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8'>
            {/* Header */}
            <div className='mb-8'>
              <div className='flex items-center'>
                <button type='button' className='mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <div>
                  <h1 className='text-3xl font-bold text-indigo-900'>Creating Lecture</h1>
                  <p className='mt-2 text-gray-600'>Create your lecture content and information</p>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className='bg-white shadow-xl rounded-xl mb-8 overflow-hidden border border-gray-100'>
              {/* Form Header */}
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
                <h2 className='text-xl font-semibold text-white'>Lecture Information</h2>
                <p className='text-purple-100 mt-1'>Create lecture details and resources</p>
              </div>

              <div className='p-8'>
                <form>
                  <div className='space-y-8'>
                    {/* Basic Lecture Information */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Basic Information</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                            Lecture Title
                          </label>
                          <div className='relative'>
                            <input
                              type='text'
                              name='title'
                              id='title'
                              value={lectureInfo.title}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, title: e.target.value })}
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Enter lecture title'
                            />
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='lectureType' className='block text-sm font-medium text-gray-700 mb-1'>
                            Lecture Type
                          </label>
                          <div className='relative'>
                            <select
                              id='lectureType'
                              value={lectureInfo.lectureType}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, lectureType: e.target.value })}
                              name='lectureType'
                              className='appearance-none shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150 pr-10'
                            >
                              <option value='Video'>Video</option>
                              <option value='Reading'>Reading</option>
                              <option value='Quiz'>Quiz</option>
                            </select>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                              <svg
                                className='h-5 w-5 text-gray-400'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='duration' className='block text-sm font-medium text-gray-700 mb-1'>
                            Duration (mins)
                          </label>
                          <div className='mt-1 relative rounded-lg shadow-sm'>
                            <input
                              type='number'
                              name='duration'
                              id='duration'
                              value={lectureInfo.duration === 0 ? '' : lectureInfo.duration}
                              onChange={(e) => {
                                const value = e.target.value
                                setLectureInfo({
                                  ...lectureInfo,
                                  duration: value === '' ? 0 : Number(value)
                                })
                              }}
                              className='focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='0'
                              min='0'
                            />
                            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500 sm:text-sm'>mins</span>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                            Description
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='description'
                              name='description'
                              value={lectureInfo.description}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, description: e.target.value })}
                              rows={3}
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Brief description of lecture content...'
                            />
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                            Content
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='content'
                              name='content'
                              value={lectureInfo.content}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, content: e.target.value })}
                              rows={3}
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Brief description of lecture content...'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end gap-3 mt-8'>
                        <Button variant='outline' className='gap-3' type='button' onClick={handleReset}>
                          <RotateCcw />
                          Reset
                        </Button>
                        <button
                          onClick={handleAddLecture}
                          type='button'
                          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                        >
                          {addLectureLoading ? <ClipLoader /> : <><Check /> Create Now</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
