// components/VideoEditForm.js
import InputFile from '@/components/global/Input/InputFile'
import { useGetVideoByConditionsQuery, usePutVideoMutation } from '@/redux/services/video.service'
import { useState, useEffect } from 'react'

interface VideoEditFormProps {
  lectureId: number
}

export default function VideoEditForm({ lectureId }: VideoEditFormProps) {
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [videoTitle, setVideoTitle] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const {
    data: videoData,
    isLoading: videoLoading,
    isFetching: videoFetching
  } = useGetVideoByConditionsQuery({ lectureId: lectureId })
  const [putVideo] = usePutVideoMutation()

  const [videoInfo, setVideoInfo] = useState({
    VideoId: 0,
    Title: '',
    VideoFile: '',
    Transcript: ''
  })

  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setVideoInfo({
        VideoId: videoData[0].id,
        Title: videoData[0].title,
        VideoFile: videoData[0].videoUrl,
        Transcript: videoData[0].transcript ?? ''
      })
      setVideoPreview(videoData[0].videoUrl || '')
    }
  }, [videoData])

  interface FormData {
    VideoId: number
    Title: string
    VideoFile: string
    Transcript: string
  }

  interface Notification {
    show: boolean
    message: string
    type: string
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('Selected video file:', file)
    const videoURL = URL.createObjectURL(file)
    setVideoPreview(videoURL)
    setVideoFile(file)
  }

  const handleRemoveFile = () => {
    if (videoFile && videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
      setVideoFile(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVideoInfo((prev) => ({ ...prev, [name]: value }))

    if (name === 'VideoFile' && value) {
      setVideoPreview(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append('VideoId', videoInfo.VideoId.toString())
      formData.append('Title', videoInfo.Title)
      formData.append('Transcript', videoInfo.Transcript)

      if (videoFile) {
        formData.append('VideoFile', videoFile)
      }

      await putVideo(formData).unwrap()

      setNotification({ show: true, message: 'Video updated successfully!', type: 'success' })

      setTimeout(function () {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setNotification({ show: true, message: 'Failed to update video.', type: 'error' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000)
    }
  }

  return (
    <div className='w-[60rem] mx-auto p-6 bg-white rounded-xl shadow-2xl'>
      <div className='flex items-center mb-8 border-b pb-4'>
        <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg mr-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-6 h-6 text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            />
          </svg>
        </div>
        <h1 className='text-2xl font-bold text-gray-800'>Edit Video</h1>
      </div>

      {notification.show && (
        <div
          className={`mb-6 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='Title' className='block text-sm font-medium text-gray-700 mb-1'>
                Video Title
              </label>
              <input
                type='text'
                id='Title'
                name='Title'
                value={videoInfo.Title}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all'
                placeholder='Enter video title...'
                required
              />
            </div>

            <div>
              <label htmlFor='VideoFile' className='block text-sm font-medium text-gray-700 mb-1'>
                Video URL
              </label>
              <InputFile
                label='Upload Course Video'
                name='VideoFile'
                accept='video/*'
                onChange={handleVideoUpload}
                noLayout={false}
              />
            </div>

            {videoPreview && (
              <div className='aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden'>
                <iframe
                  src={videoPreview}
                  className='w-full h-full'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div>
            <label htmlFor='Transcript' className='block text-sm font-medium text-gray-700 mb-1'>
              Transcript
            </label>
            <textarea
              id='Transcript'
              name='Transcript'
              value={videoInfo.Transcript}
              onChange={handleChange}
              rows={15}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none'
              placeholder='Enter video transcript here...'
            ></textarea>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <button
            type='submit'
            disabled={isSaving}
            className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center gap-2 ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'} transition-all`}
          >
            {isSaving ? (
              <>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
