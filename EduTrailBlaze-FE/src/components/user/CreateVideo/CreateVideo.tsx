'use client'
import { useState } from 'react'
import { usePostVideoMutation } from '../../../redux/services/video.service'
import { toast } from 'react-toastify'

export default function CreateLectureVideo() {
  const [file, setFile] = useState<File | null>(null)
  const [lectureId, setLectureId] = useState('')
  const [title, setTitle] = useState('')

  const [postVideo] = usePostVideoMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !(file instanceof File)) {
      alert('Invalid file format!')
      return
    }

    if (!lectureId || !title) {
      alert('Please fill in all fields!')
      return
    }
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('lectureId', lectureId.toString())
      formData.append('title', title)
      const response = postVideo(formData).unwrap()
      toast.success('Video uploaded successfully!')
      console.log('Upload response:', response)
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`Failed to upload video! ${error.message || ''}`)
    }
  }

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'>
      <main className='container mx-auto py-10 px-4'>
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='bg-blue-600 p-6'>
            <h1 className='text-2xl font-bold text-white text-center'>Create Lecture Video</h1>
          </div>

          <form onSubmit={handleSubmit} className='p-6 space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='file-upload' className='block text-sm font-medium text-gray-700'>
                File Video
              </label>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='file-upload'
                  className='flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-10 h-10 mb-3 text-blue-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      ></path>
                    </svg>
                    <p className='mb-2 text-sm text-blue-600'>
                      <span className='font-semibold'>Click to upload</span> or drag and drop a video file
                    </p>
                    <p className='text-xs text-blue-500'>MP4, WebM, OGG (MAX: 1GB)</p>
                  </div>
                  <input id='file-upload' type='file' className='hidden' accept='video/*' onChange={handleFileChange} />
                </label>
              </div>
              {file && <p className='text-sm text-blue-600'>Chosen file: {file.name}</p>}
            </div>

            <div className='space-y-2'>
              <label htmlFor='lectureId' className='block text-sm font-medium text-gray-700'>
                Lecture ID
              </label>
              <input
                type='number'
                id='lectureId'
                value={lectureId}
                onChange={(e) => setLectureId(e.target.value)}
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                placeholder='Nhập mã bài giảng'
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                placeholder='Enter title'
                required
              />
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Upload video
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
