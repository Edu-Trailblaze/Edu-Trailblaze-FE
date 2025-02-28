'use client'
import React, { useState } from 'react'
import ReadingLecture from './reading/lecture_reading'

import VideoLecture from './video/lecutre_video'
import QuizLecture from './quiz/QuizLecture'
import QuizResult from './quiz/QuizResult'
import { useGetQuizDetailQuery } from '../../../../redux/services/quiz.service'

interface LectureContentProps {
  lecture: ILecture
  video?: IVideo[]
  lectureType: string
  onNextLecture: () => void
}

export default function LectureContent({ lecture, video, lectureType, onNextLecture }: LectureContentProps) {
  const { data: quizData } = useGetQuizDetailQuery(lecture.id)
  return (
    <div className='container py-8'>
      {/* <h1 className='text-3xl font-bold mb-6'>{title}</h1> */}
      {lectureType === 'Video' && <VideoLecture lecture={lecture} video={video} />}
      {lectureType === 'Reading' && <ReadingLecture lecture={lecture} />}
      {lectureType === 'Quiz' && <QuizLecture quizDetail={quizData} onNextLecture={onNextLecture} />}
    </div>
  )
}
