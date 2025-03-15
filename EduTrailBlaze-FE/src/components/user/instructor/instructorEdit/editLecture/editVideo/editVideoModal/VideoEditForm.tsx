// components/VideoEditForm.js
import InputFile from '@/components/global/Input/InputFile'
import { useState } from 'react'

export default function VideoEditForm() {
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    transcript: ''
  })
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [videoTitle, setVideoTitle] = useState('')
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [videoPreview, setVideoPreview] = useState<string | null>(null)

  interface FormData {
    title: string
    videoUrl: string
    transcript: string
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData((prev: FormData) => ({ ...prev, [name]: value }))

    // Update preview if video URL changes
    if (name === 'videoUrl' && value) {
      try {
        const url = new URL(value)
        // Check if it's a YouTube URL
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
          const videoId = url.hostname.includes('youtube.com') ? url.searchParams.get('v') : url.pathname.slice(1)
          setPreviewUrl(`https://www.youtube.com/embed/${videoId}`)
        } else {
          setPreviewUrl(value)
        }
      } catch (e) {
        setPreviewUrl('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500))

      setNotification({
        show: true,
        message: 'Video has been updated successfully!',
        type: 'success'
      })

      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' })
      }, 3000)
    } catch (error) {
      setNotification({
        show: true,
        message: 'An error occurred while saving the video.',
        type: 'error'
      })
    } finally {
      setIsSaving(false)
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
              <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                Video Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all'
                placeholder='Enter video title...'
                required
              />
            </div>

            <div>
              <label htmlFor='videoUrl' className='block text-sm font-medium text-gray-700 mb-1'>
                Video URL
              </label>
              <InputFile
                label='Upload Course Video'
                name='videoUrl'
                accept='video/*'
                onChange={handleVideoUpload}
                preview={videoPreview}
                noLayout={false}
              />
            </div>

            {previewUrl && (
              <div className='aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden'>
                <iframe
                  src={previewUrl}
                  className='w-full h-full'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div>
            <label htmlFor='transcript' className='block text-sm font-medium text-gray-700 mb-1'>
              Transcript
            </label>
            <textarea
              id='transcript'
              name='transcript'
              value={formData.transcript}
              onChange={handleChange}
              rows={15}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none'
              placeholder='Enter video transcript here...'
            ></textarea>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors'
          >
            Cancel
          </button>
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
