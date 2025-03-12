'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Globe, Download, FileText, Volume2 } from 'lucide-react'
import Button from '../../../../../global/Button/Button'
import { usePostUserProgressMutation } from '../../../../../../redux/services/userProgress.service'

interface ModuleBarProps {
  lecture: ILecture
  video?: IVideo[]
  userId: string
  userProgress?: UserProgressResponse[]
}

export default function VideoLecture({ lecture, video, userId, userProgress }: ModuleBarProps) {
  const [languageListOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [activeTab, setActiveTab] = useState('transcript')

  const progress = userProgress?.find((p) => p.lectureId === lecture.id)

  const [postUserProgress] = usePostUserProgressMutation()

  const handleUserProgress = async () => {
    try {
      postUserProgress({ userId: userId, lectureId: lecture.id })
      window.location.reload()
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
    <div className='py-8'>
      {/* Video Section */}
      <div className='space-y-6'>
        {video?.map((v) => (
          <div key={v.id} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold tracking-tight'>{v.title}</h1>
              {progress?.isCompleted ? (
                <Button disabled size='lg'>
                  Already finished
                </Button>
              ) : (
                <Button onClick={handleUserProgress} size='lg'>
                  Make as complete
                </Button>
              )}
            </div>
            <div className='aspect-video relative rounded-xl overflow-hidden bg-black'>
              <video className='w-full h-full' controls>
                <source src={v.videoUrl} type='video/mp4' />
              </video>
            </div>
          </div>
        ))}
      </div>

      {/* Content Summary Card */}
      <div className='mt-8 bg-white rounded-xl border-2 border-blue-500 shadow-sm'>
        <div className='p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Volume2 className='w-5 h-5 text-blue-600' />
            <h2 className='text-xl font-semibold'>Lecture Summary</h2>
          </div>
          <p className='text-gray-700 leading-relaxed'>{lecture.content}</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='mt-8'>
        {/* Tab Headers */}
        <div className='flex border-b border-gray-200'>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors
              ${
                activeTab === 'transcript'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            onClick={() => setActiveTab('transcript')}
          >
            <FileText className='w-4 h-4' />
            Transcript
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors
              ${
                activeTab === 'download'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            onClick={() => setActiveTab('download')}
          >
            <Download className='w-4 h-4' />
            Download
          </button>
        </div>

        {/* Tab Content */}
        <div className='mt-6'>
          {activeTab === 'transcript' && (
            <div className='flex gap-8'>
              {/* Transcript Text */}
              <div className='flex-1'>
                <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                  [MUSIC] Hello and welcome to this demonstration on using RegEx Builder in studio...
                </p>
              </div>

              {/* Language Selector */}
              <div className='w-64'>
                <div className='relative'>
                  <button
                    className='w-full flex items-center justify-between px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors'
                    onClick={toggleList}
                  >
                    <div className='flex items-center gap-2'>
                      <Globe className='w-4 h-4 text-blue-600' />
                      <span>{selectedLanguage}</span>
                    </div>
                    {languageListOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                  </button>

                  {languageListOpen && (
                    <div className='absolute w-full mt-2 bg-white border-2 border-blue-500 rounded-lg shadow-lg z-50'>
                      <div className='max-h-64 overflow-auto p-2'>
                        {languages.map((language) => (
                          <button
                            key={language.id}
                            className='w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md transition-colors'
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
                </div>
              </div>
            </div>
          )}

          {activeTab === 'download' && (
            <div className='text-center text-gray-500'>Download options will appear here</div>
          )}
        </div>
      </div>
    </div>
  )
}
