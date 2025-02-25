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
  lectureType: string // Nhận thêm loại bài giảng
}

export default function LectureContent({ lecture, video, lectureType }: LectureContentProps) {
  const mockQuizData = {
    quiz: {
      lectureId: 1,
      title: 'Lập trình Web với Next.js',
      passingScore: 2,
      createdAt: '2025-02-24T12:00:00Z',
      updatedAt: '2025-02-24T12:00:00Z',
      id: 101
    },
    questions: [
      {
        quizzId: 101,
        questionText: 'Next.js là framework dựa trên thư viện nào?',
        createdAt: '2025-02-24T12:01:00Z',
        updatedAt: '2025-02-24T12:01:00Z',
        id: 201
      },
      {
        quizzId: 101,
        questionText: 'Tính năng nào sau đây là của Next.js?',
        createdAt: '2025-02-24T12:02:00Z',
        updatedAt: '2025-02-24T12:02:00Z',
        id: 202
      }
    ],
    answers: [
      { questionId: 201, answerText: 'Angular', isCorrect: false, id: 301 },
      { questionId: 201, answerText: 'React', isCorrect: true, id: 302 },
      { questionId: 201, answerText: 'Vue', isCorrect: false, id: 303 },
      { questionId: 201, answerText: 'Svelte', isCorrect: false, id: 304 },

      { questionId: 202, answerText: 'SSR (Server-Side Rendering)', isCorrect: true, id: 305 },
      { questionId: 202, answerText: 'Virtual DOM', isCorrect: false, id: 306 },
      { questionId: 202, answerText: 'State Management', isCorrect: false, id: 307 },
      { questionId: 202, answerText: 'Client-Side Routing', isCorrect: false, id: 308 }
    ]
  }

  const { data: quizData } = useGetQuizDetailQuery(25)
  // console.log('quizData', quizData)

  return (
    <div className='container py-8'>
      {/* <h1 className='text-3xl font-bold mb-6'>{title}</h1> */}
      {lectureType === 'Video' && <VideoLecture lecture={lecture} video={video} />}
      {lectureType === 'Reading' && <ReadingLecture lecture={lecture} />}
      {lectureType === 'Quiz' && <QuizLecture quizDetail={quizData} />}
    </div>
  )
}
