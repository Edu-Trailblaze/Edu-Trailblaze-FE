'use client'
import React, { useEffect, useState } from 'react'
import ReadingLecture from './reading/lecture_reading'

import VideoLecture from './video/lecutre_video'
import QuizLecture from './quiz/QuizLecture'
import QuizResult from './quiz/QuizResult'
import { useGetQuizDetailQuery } from '../../../../../redux/services/quiz.service'
import { jwtDecode } from 'jwt-decode'

interface LectureContentProps {
  lecture: ILecture
  video?: IVideo[]
  lectureType: string
  onNextLecture: () => void
}

export default function LectureContent({ lecture, video, lectureType, onNextLecture }: LectureContentProps) {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    try {
      if (token) {
        const decode = jwtDecode(token)
        setUserId(decode?.sub ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  const { data: quizData } = useGetQuizDetailQuery(lecture.id)
  return (
    <div className='container py-8'>
      {/* <h1 className='text-3xl font-bold mb-6'>{title}</h1> */}
      {lectureType === 'Video' && <VideoLecture lecture={lecture} video={video} userId={userId} />}
      {lectureType === 'Reading' && <ReadingLecture lecture={lecture} userId={userId} />}
      {lectureType === 'Quiz' && <QuizLecture quizDetail={quizData} onNextLecture={onNextLecture} userId={userId} />}
    </div>
  )
}
