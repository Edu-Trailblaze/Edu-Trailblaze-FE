'use client'
import React, { useEffect, useState } from 'react'
import ReadingLecture from './reading/lecture_reading'

import VideoLecture from './video/lecutre_video'
import QuizLecture from './quiz/QuizLecture'
import { useGetQuizDetailQuery } from '../../../../../redux/services/quiz.service'
import { jwtDecode } from 'jwt-decode'
import { useGetUserProgressQuery } from '../../../../../redux/services/userProgress.service'

interface LectureContentProps {
  lecture: ILecture
  decodedUserId: string
  video?: IVideo[]
  lectureType: string
  onNextLecture: () => void
}

export default function LectureContent({
  lecture,
  decodedUserId,
  video,
  lectureType,
  onNextLecture
}: LectureContentProps) {
  const { data: userProgress } = useGetUserProgressQuery({ userId: decodedUserId, lectureId: lecture.id })
  const { data: quizData } = useGetQuizDetailQuery(lecture.id)
  return (
    <div className='container py-8'>
      {lectureType === 'Video' && (
        <VideoLecture lecture={lecture} video={video} userId={decodedUserId} userProgress={userProgress} />
      )}
      {lectureType === 'Reading' && (
        <ReadingLecture lecture={lecture} userId={decodedUserId} userProgress={userProgress} />
      )}
      {lectureType === 'Quiz' && (
        <QuizLecture quizDetail={quizData} onNextLecture={onNextLecture} userId={decodedUserId} />
      )}
    </div>
  )
}
