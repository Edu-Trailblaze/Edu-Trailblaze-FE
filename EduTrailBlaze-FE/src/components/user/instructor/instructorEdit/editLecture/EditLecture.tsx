'use client'
import React, { useEffect, useState } from 'react'
import { useGetLectureByIdQuery, usePutLectureMutation } from '@/redux/services/lecture.service'
import { useParams } from 'next/navigation'
import { Check, RotateCcw } from 'lucide-react'
import Button from '@/components/global/Button/Button'
import { toast } from 'react-toastify'
import EditVideo from './editVideo/EditVideo'
import EditReadingFile from './editReadingFile/EditReadingFile'
import EditQuiz from './editQuiz/EditQuiz'

export default function EditLecture() {
  const params = useParams()
  const lectureId = Number(params.lectureId)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editLecture] = usePutLectureMutation()

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isFetching: lectureFetching
  } = useGetLectureByIdQuery(lectureId)

  const [readingFile, setReadingFile] = useState<File | null>(null)
  const [readingFilePreview, setReadingFilePreview] = useState<string | null>(null)
  const [readingFileInfo, setReadingFileInfo] = useState<{
    name: string
    size: number
    type: string
    url: string
  } | null>(null)

  const [lectureInfo, setLectureInfo] = useState({
    LectureId: 0,
    LectureType: '',
    Description: '',
    Content: '',
    Title: '',
    Duration: 0
  })

  useEffect(() => {
    if (lectureData) {
      setLectureInfo({
        LectureId: lectureData?.id,
        LectureType: lectureData?.lectureType,
        Title: lectureData?.title,
        Content: lectureData?.content,
        Description: lectureData?.description,
        Duration: lectureData?.duration
      })
    }
  }, [lectureData])

  const handleReadingFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileURL = URL.createObjectURL(file)
    setReadingFile(file)
    setReadingFilePreview(fileURL)

    setReadingFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileURL
    })
  }

  const handleRemoveFile = () => {
    if (readingFileInfo?.url) {
      URL.revokeObjectURL(readingFileInfo.url) // Giải phóng bộ nhớ
    }
    setReadingFileInfo(null)
  }

  const handleEditInformation = async () => {
    const formData = new FormData()
    formData.append('LectureId', String(lectureInfo.LectureId))
    formData.append('LectureType', lectureInfo.LectureType)
    formData.append('Title', lectureInfo.Title)
    formData.append('Content', lectureInfo.Content)
    formData.append('Description', lectureInfo.Description)
    formData.append('Duration', String(lectureInfo.Duration))
    if (readingFile) {
      formData.append('ContentFile', readingFile)
    }
    try {
      const response = await editLecture(formData).unwrap()
      console.log('Edit successful:', response)
      toast.success('Edit successful!')
    } catch (error) {
      console.error('Edit failed:', error)
      toast.error('Edit failed!')
    }
  }

  const handleReset = () => {
    if (lectureData) {
      setLectureInfo({
        LectureId: lectureData.id,
        LectureType: lectureData.lectureType,
        Title: lectureData.title,
        Content: lectureData.content,
        Description: lectureData.description,
        Duration: lectureData.duration
      })
    }
  }

  interface HandleClickViewFileProps {
    url: string
  }

  const handleClickViewFile = ({ url }: HandleClickViewFileProps): void => {
    const newUrl = url + '?fl_attachment=true';
    console.log('newUrl:', newUrl);
    window.open(newUrl, '_blank', 'noopener,noreferrer');
  };
  
  

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='flex'>
        {/* Main content */}
        <main className='flex-1 ml-0 md:ml-14 pb-12'>
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
                  <h1 className='text-3xl font-bold text-indigo-900'>Editing Lecture</h1>
                  <p className='mt-2 text-gray-600'>Update your lecture content and information</p>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className='bg-white shadow-xl rounded-xl mb-8 overflow-hidden border border-gray-100'>
              {/* Form Header */}
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
                <h2 className='text-xl font-semibold text-white'>Lecture Information</h2>
                <p className='text-purple-100 mt-1'>Edit lecture details and resources</p>
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
                              value={lectureInfo.Title}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, Title: e.target.value })}
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
                              value={lectureInfo.LectureType}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, LectureType: e.target.value })}
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
                              // value={lectureInfo.duration}
                              // onChange={(e) => setLectureInfo({ ...lectureInfo, duration: Number(e.target.value) })}
                              value={lectureInfo.Duration === 0 ? '' : lectureInfo.Duration}
                              onChange={(e) => {
                                const value = e.target.value
                                setLectureInfo({
                                  ...lectureInfo,
                                  Duration: value === '' ? 1 : Number(value)
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
                              value={lectureInfo.Description}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, Description: e.target.value })}
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
                              value={lectureInfo.Content}
                              onChange={(e) => setLectureInfo({ ...lectureInfo, Content: e.target.value })}
                              rows={3}
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Brief description of lecture content...'
                            />
                          </div>
                        </div>
                      </div>
                      {lectureInfo.LectureType == 'Reading' ? (
                        ''
                      ) : (
                        <div className='flex justify-end gap-3 mt-8'>
                          <Button variant='outline' className='gap-3' type='button' onClick={handleReset}>
                            <RotateCcw />
                            Reset
                          </Button>
                          <button
                            onClick={handleEditInformation}
                            type='button'
                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                          >
                            <Check />
                            Save changes
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Video Type Content */}
                    {lectureInfo.LectureType == 'Video' && <EditVideo lectureId={lectureId} />}

                    {/* Reading Type Content */}
                    {lectureInfo.LectureType == 'Reading' && (
                      <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                        <div className='flex items-center mb-6'>
                          <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
                            </svg>
                          </div>
                          <h3 className='text-lg font-semibold text-gray-800'>Reading Information</h3>
                        </div>

                        <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                          <div className='sm:col-span-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Document</label>
                            <div className='mt-1'>
                              <div className='flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                                <div className='space-y-1 text-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='mx-auto h-12 w-12 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={1}
                                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                    />
                                  </svg>
                                  <div className='flex text-sm text-gray-600'>
                                    <label
                                      htmlFor='file-upload'
                                      className='relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none'
                                    >
                                      <span>Upload your file</span>
                                      <input
                                        onChange={handleReadingFileUpload}
                                        id='file-upload'
                                        name='file-upload'
                                        type='file'
                                        accept='.pdf,.doc,.docx'
                                        className='sr-only'
                                      />
                                    </label>
                                    <p className='pl-1'>or drag and drop</p>
                                  </div>
                                  <p className='text-xs text-gray-500'>maximum 10MB</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='sm:col-span-6'>
                            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-red-600'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                                    />
                                  </svg>
                                </div>
                                {readingFileInfo && (
                                  <div className='ml-4 flex-1'>
                                    <div className='flex items-center justify-between'>
                                      <h3 className='text-sm font-medium'>{readingFileInfo?.name}</h3>
                                      <div className='flex items-center space-x-2'>
                                        <button
                                          onClick={handleRemoveFile}
                                          type='button'
                                          className='text-gray-400 hover:text-red-500'
                                        >
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                          >
                                            <path
                                              fillRule='evenodd'
                                              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                              clipRule='evenodd'
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <div className='mt-1 text-sm text-gray-500'>{readingFileInfo?.size} B</div>
                                  </div>
                                )}
                                {lectureData?.docUrl && (
                                  <div className='ml-4 flex-1'>
                                    <div className='flex items-center justify-between'>
                                      <h3 className='text-sm font-medium'>Your current Reading File</h3>
                                      <div className='flex items-center space-x-2 p-2 rounded hover:bg-blue-100 hover:text-blue-500'>
                                        <button
                                          type='button'
                                          onClick={() => handleClickViewFile({ url: lectureData.docUrl })}
                                          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                                        >
                                          View/Download File
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-end gap-3 mt-8'>
                          <Button onClick={handleEditInformation} variant='indigo' type='button'>
                            <Check />
                            Save changes
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quiz Type Content */}
                    {lectureInfo.LectureType == 'Quiz' && <EditQuiz lectureId={lectureId} />}
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
