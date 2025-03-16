import Button from '@/components/global/Button/Button'
import InputFile from '@/components/global/Input/InputFile'
import { useGetVideoByConditionsQuery, usePostVideoMutation } from '@/redux/services/video.service'
import { Check, Edit, RotateCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import VideoEditForm from './editVideoModal/VideoEditForm'
import Modal from 'react-modal'
import '@/components/global/Modal/ReactModal.css'

interface VideoItemProp {
  lectureId: number
}
export default function EditVideo({ lectureId }: VideoItemProp) {
  const [videoTitle, setVideoTitle] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [postVideo] = usePostVideoMutation()
  const {
    data: videoData,
    isLoading: videoDataLoading,
    isFetching: videoDataFetching
  } = useGetVideoByConditionsQuery({ lectureId: lectureId })

  useEffect(() => {
    console.log('Updated videoFile:', videoFile)
  }, [videoFile])

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

  const handlePostVideo = async () => {
    if (!videoFile) {
      toast.error('Please select a video file!')
      return
    }

    console.log('Before appending to FormData, videoFile:', videoFile)

    const formData = new FormData()
    formData.append('File', videoFile)
    formData.append('LectureId', String(lectureId))
    formData.append('Title', videoTitle)
    console.log('FormData content:', [...formData.values()]) // Kiểm tra FormData

    try {
      await postVideo(formData).unwrap()
      toast.success('Video uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      toast.error('Video upload failed!')
    }
  }

  const handleEditVideo = () => {
    setIsVideoModalOpen(true)
  }

  const handleCloseModal = () => { 
    setIsVideoModalOpen(false)
  }
  return (
    <>
      <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
        <div className='flex items-center mb-6'>
          <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-800'>Video Content</h3>
        </div>

        <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
              Video Title
            </label>
            <div className='relative'>
              <input
                type='text'
                name='title'
                id='title'
                value={videoData && videoData.length > 0 ? videoData[0].title : videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                placeholder='Enter video title'
              />
            </div>
          </div>
          <div className='sm:col-span-6'>
            <label htmlFor='videoUrl' className='block text-sm font-medium text-gray-700 mb-1'>
              URL Video
            </label>
            <div className='mt-1 flex rounded-lg shadow-sm'>
              <InputFile
                label='Upload Course Video'
                name='courseVideo'
                accept='video/*'
                onChange={handleVideoUpload}
                preview={videoPreview ?? (videoData && videoData.length > 0 ? videoData[0].videoUrl : '')}
                noLayout={false}
              />
            </div>
            <p className='mt-2 text-xs text-gray-500'>Supports YouTube, Vimeo, or direct video URL</p>
            {videoData && videoData[0]?.videoUrl ? (
              ' '
            ) : (
              <Button
                variant='outline'
                className='gap-3 hover:text-red-500 hover:bg-red-50'
                type='button'
                onClick={handleRemoveFile}
              >
                <RotateCcw />
                Reset File
              </Button>
            )}
          </div>

          {/* <div className='sm:col-span-6'>
            <label htmlFor='transcript' className='block text-sm font-medium text-gray-700 mb-1'>
              Lyric transcript (Transcript)
            </label>
            <div className='mt-1'>
              <textarea
                id='transcript'
                name='transcript'
                rows={8}
                className='shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                placeholder='Enter notes for video lectures...'
              />
            </div>
            <div className='mt-2 flex justify-between'>
              <span className='text-xs text-gray-500'>
                Providing transcripts will help learners easily access the content.
              </span>
              <div>
                <button
                  type='button'
                  className='inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Download transcript
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div className='flex justify-end gap-3 mt-8'>
          {videoData && videoData[0]?.videoUrl ? (
            <button
              onClick={handleEditVideo}
              type='button'
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
            >
              <Edit className='w-5 mr-1' />
              Edit Video
            </button>
          ) : (
            <button
              onClick={handlePostVideo}
              type='button'
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
            >
              <Check />
              Save changes
            </button>
          )}
        </div>
        <Modal
          key='unique-modal-key'
          isOpen={isVideoModalOpen}
          onRequestClose={handleCloseModal}
          className={'bg-transparent border-none p-0'}
          overlayClassName='modal-overlay'
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <VideoEditForm />
        </Modal>
      </div>
    </>
  )
}
