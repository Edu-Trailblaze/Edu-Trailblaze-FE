'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Globe, Download, FileText, Volume2, CheckCircle, Play, Clock } from 'lucide-react'
import Button from '../../../../../global/Button/Button'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'
import { toast } from 'react-toastify'

interface VideoLectureProps {
  lecture: ILecture
  video?: IVideo[]
  userId: string
  userProgress?: UserProgressResponse[]
}

export default function VideoLecture({ lecture, video, userId, userProgress }: VideoLectureProps) {
  const [languageListOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [activeTab, setActiveTab] = useState('transcript')

  const progress = userProgress?.find((p) => p.lectureId === lecture.id)
  const [postUserProgress, { isLoading }] = usePostUserProgressMutation()

  const handleUserProgress = async () => {
    try {
      await postUserProgress({ userId: userId, lectureId: lecture.id })
      toast.success('Lecture completed!')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error enrolling:', error)
    }
  }

  const toggleList = () => {
    setLanguageOpen((prev) => !prev)
  }

  const languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'ภาษาไทย' },
    { id: 3, name: 'Tiếng Việt' },
    { id: 4, name: '한국어' },
    { id: 5, name: '日本語' },
    { id: 6, name: 'Português' },
    { id: 7, name: 'Română' },
    { id: 8, name: 'Polski' },
    { id: 9, name: 'Türkçe' },
    { id: 10, name: 'Русский' },
    { id: 11, name: 'Français' },
    { id: 12, name: 'Español' },
    { id: 13, name: 'Deutsch' }
  ]

  return (
    <div className='space-y-8'>
      {/* Header with duration and completion status */}
      <div className='flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm'>
        <div className='flex items-center gap-3'>
          <div className='bg-blue-100 p-2 rounded-full'>
            <Play className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <h3 className='font-medium text-gray-800'>{lecture.title}</h3>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Clock className='w-4 h-4' />
              <span>{lecture.duration} minutes</span>
            </div>
          </div>
        </div>

        {progress?.isCompleted ? (
          <Button
            disabled
            size='lg'
            className='flex items-center gap-2 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
          >
            <CheckCircle className='w-5 h-5' />
            <span>Completed</span>
          </Button>
        ) : (
          <Button
            onClick={handleUserProgress}
            size='lg'
            isLoading={isLoading}
            className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors'
          >
            Mark as complete
          </Button>
        )}
      </div>

      {/* Video Player */}
      {video?.map((v) => (
        <div key={v.id} className='space-y-4'>
          <div className='aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-gray-800'>
            <video className='w-full h-full' controls poster='/api/placeholder/800/450' preload='metadata'>
              <source src={v.videoUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video controls below player */}
          <div className='flex justify-end gap-3'>
            <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm'>
              <Download className='w-4 h-4' />
              Download Video
            </button>
            <button className='flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm'>
              <FileText className='w-4 h-4' />
              Show Transcript
            </button>
          </div>
        </div>
      ))}

      {/* Content Summary Card */}
      <div className='bg-white rounded-xl border-l-4 border-blue-500 shadow-sm'>
        <div className='p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Volume2 className='w-5 h-5 text-blue-600' />
            <h2 className='text-xl font-semibold text-gray-800'>Lecture Summary</h2>
          </div>
          <div className='prose prose-blue max-w-none text-gray-700 leading-relaxed'>{lecture.content}</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
        {/* Tab Headers */}
        <div className='flex border-b border-gray-200'>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors
              ${
                activeTab === 'transcript'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            onClick={() => setActiveTab('transcript')}
          >
            <FileText className='w-4 h-4' />
            Transcript
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors
              ${
                activeTab === 'download'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            onClick={() => setActiveTab('download')}
          >
            <Download className='w-4 h-4' />
            Downloads
          </button>
        </div>

        {/* Tab Content */}
        <div className='p-6'>
          {activeTab === 'transcript' && (
            <div className='flex gap-6'>
              {/* Transcript Text */}
              <div className='flex-1 p-5 bg-gray-50 rounded-lg max-h-96 overflow-y-auto border border-gray-200'>
                <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                  [MUSIC] Hello and welcome to this demonstration on using RegEx Builder in studio...
                </p>
              </div>
            </div>
          )}

          {/* Language Selector */}
          {/* <div className='w-64'>
                <div className='sticky top-4'>
                  <div className='mb-3 text-sm font-medium text-gray-700'>Select Language</div>
                  <div className='relative overflow-visible'>
                    <button
                      className='w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors'
                      onClick={toggleList}
                      aria-expanded={languageListOpen}
                      aria-haspopup='listbox'
                    >
                      <div className='flex items-center gap-2'>
                        <Globe className='w-4 h-4 text-blue-600' />
                        <span>{selectedLanguage}</span>
                      </div>
                      {languageListOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </button>

                    {languageListOpen && (
                      <div className='absolute w-full left-0 top-full mt-2 bg-white border-2 border-blue-500 rounded-lg shadow-lg z-50'>
                        <div className='max-h-64 overflow-auto p-2'>
                          {languages.map((language) => (
                            <button
                              key={language.id}
                              className={`w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md transition-colors ${
                                selectedLanguage === language.name ? 'bg-blue-50 text-blue-600 font-medium' : ''
                              }`}
                              onClick={() => {
                                setSelectedLanguage(language.name)
                                setLanguageOpen(false)
                              }}
                            >
                              {language.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div> */}

          {/* Add download transcript button */}
          {/* <button className='w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors'>
                    <Download className='w-4 h-4' />
                    Download Transcript
                  </button> */}
          {/* </div>
              </div>
            </div>
          )} */}

          {activeTab === 'download' && (
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all'>
                <div className='flex items-center gap-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <FileText className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Lecture Transcript</p>
                    <p className='text-sm text-gray-500'>Download lecture transcript as PDF</p>
                  </div>
                </div>
                <Button className='px-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors'>
                  <Download className='w-4 h-4 mr-2' />
                  Download
                </Button>
              </div>

              <div className='flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all'>
                <div className='flex items-center gap-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <Download className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Video File</p>
                    <p className='text-sm text-gray-500'>Download lecture video (MP4)</p>
                  </div>
                </div>
                <Button className='px-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors'>
                  <Download className='w-4 h-4 mr-2' />
                  Download
                </Button>
              </div>

              {/* Additional resources */}
              <div className='flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all'>
                <div className='flex items-center gap-4'>
                  <div className='bg-blue-50 p-3 rounded-full'>
                    <FileText className='w-6 h-6 text-blue-600' />
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>Lecture Notes</p>
                    <p className='text-sm text-gray-500'>Download supplementary materials (PDF)</p>
                  </div>
                </div>
                <Button className='px-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors'>
                  <Download className='w-4 h-4 mr-2' />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
