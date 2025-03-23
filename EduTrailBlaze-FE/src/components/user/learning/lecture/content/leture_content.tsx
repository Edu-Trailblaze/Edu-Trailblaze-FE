'use client'
import React from 'react'
import ReadingLecture from './reading/lecture_reading'
import VideoLecture from './video/lecutre_video'
import QuizLecture from './quiz/QuizLecture'
import { useGetUserProgressQuery } from '../../../../../redux/services/userProgress.service'
import { BookOpen, Video, FileQuestion, Clock } from 'lucide-react'

interface LectureContentProps {
  lecture: ILecture
  decodedUserId: string
  video?: IVideo[]
  lectureType: string
  onNextLecture: () => void
  refetchUserProgress: () => void
}

export default function LectureContent({
  lecture,
  decodedUserId,
  video,
  lectureType,
  onNextLecture,
  refetchUserProgress
}: LectureContentProps) {
  const { data: userProgress } = useGetUserProgressQuery({ userId: decodedUserId, lectureId: lecture.id })

  const renderLectureTypeIcon = () => {
    switch (lectureType) {
      case 'Video':
        return <Video className='w-6 h-6 text-blue-600' />
      case 'Reading':
        return <BookOpen className='w-6 h-6 text-blue-600' />
      case 'Quiz':
        return <FileQuestion className='w-6 h-6 text-blue-600' />
      default:
        return null
    }
  }

  return (
    <div className='container bg-white rounded-xl shadow-sm'>
      <div className='p-6 border-b '>
        <div className='flex items-center gap-3 mb-2'>
          {renderLectureTypeIcon()}
          <h1 className='text-2xl font-bold text-gray-800'>{lecture.title}</h1>
        </div>
        <div className='flex items-center space-x-2'>
          <Clock className='w-5 h-5 text-gray-500' />
          <span className='text-sm text-gray-500'>{lecture.duration} min</span>
        </div>
        <p className='text-gray-600 mt-2'>Description: {lecture.description}</p>
      </div>

      <div className='p-6'>
        {lectureType === 'Video' && (
          <VideoLecture
            lecture={lecture}
            video={video}
            userId={decodedUserId}
            userProgress={userProgress}
            refetchUserProgress={refetchUserProgress}
          />
        )}
        {lectureType === 'Reading' && (
          <ReadingLecture
            lecture={lecture}
            userId={decodedUserId}
            userProgress={userProgress}
            refetchUserProgress={refetchUserProgress}
          />
        )}
        {lectureType === 'Quiz' && (
          <QuizLecture
            lecture={lecture}
            onNextLecture={onNextLecture}
            userId={decodedUserId}
            refetchUserProgress={refetchUserProgress}
          />
        )}
      </div>
    </div>
  )
}
