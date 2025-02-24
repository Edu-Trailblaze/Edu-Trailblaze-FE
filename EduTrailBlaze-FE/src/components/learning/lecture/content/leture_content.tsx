'use client'
import React from 'react'
import ReadingLecture from './reading/lecture_reading'
import QuizLecture from './quiz/lecture_quiz'
import VideoLecture from './video/lecutre_video'

interface LectureContentProps {
  lecture: ILecture
  video?: IVideo[]
  lectureType: string // Nhận thêm loại bài giảng
}

export default function LectureContent({ lecture, video, lectureType }: LectureContentProps) {
  return (
    <div className='container py-8'>
      {/* <h1 className='text-3xl font-bold mb-6'>{title}</h1> */}
      {lectureType === 'Video' && <VideoLecture lecture={lecture} video={video} />}
      {lectureType === 'Reading' && <ReadingLecture lecture={lecture} />}
      {lectureType === 'Quiz' && <QuizLecture lecture={lecture} />}
    </div>
  )
}
