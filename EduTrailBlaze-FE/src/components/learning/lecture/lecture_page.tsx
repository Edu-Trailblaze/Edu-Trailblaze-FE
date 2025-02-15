'use client'
import ModuleBar from '@/components/learning/lecture/module_bar'
import ModuleVideo from '@/components/learning/lecture/module_video'
import React from 'react'
import { useGetCourseDetailsQuery, useGetCourseQuery } from '../../../services/courseDetail.service'
import { useGetSectionQuery } from '../../../services/section.service'
import {
  useGetLectureByConditionsQuery,
  useGetLectureQuery,
  useGetSectionLectureQuery
} from '../../../services/lecture.service'
import Loading from '../../animate/Loading'
import { useGetVideoQuery } from '../../../services/video.service'
import { useParams } from 'next/navigation'

export default function LecturePage() {
  const { courseURL, lectureURL } = useParams()
  const {
    data: course,
    isLoading: courseLoading,
    isFetching: courseFetching
  } = useGetCourseDetailsQuery(Number(courseURL))
  const sectionIds = course?.sectionDetails?.map((section) => section.id) || []
  const {
    data: lectures,
    isLoading: lectureLoading,
    isFetching: lectureFetching
  } = useGetSectionLectureQuery(sectionIds)
  // const {
  //   data: lecture,
  //   isLoading: lectureLoading,
  //   isFetching: lectureFetching
  // } = useGetLectureByConditionsQuery({ sectionId: 12 })
  const {
    data: lectureVideo,
    isLoading: lectureVideoLoading,
    isFetching: lectureVideoFetching
  } = useGetLectureQuery(12)
  const { data: video, isLoading: videoLoading, isFetching: videoFetching } = useGetVideoQuery(4)

  if (courseLoading) {
    return <Loading />
  }

  if (!course) {
    return <div>Course not found</div>
  }

  // if (!section){
  //   return <div>Section not found</div>
  // }

  if (!lectures) {
    return <div>Lecture not found</div>
  }
  if (!lectureVideo) {
    return <div>Lecture not found</div>
  }

  if (!video) {
    return <div>Video not found</div>
  }
console.log('sss',lectures)
console.log('sId',sectionIds)
  return (
    <div>
      <div className='flex'>
        {/* <ModuleBar course={course} section={section} lecture={lecture} video={video} /> */}
        <ModuleBar course={course} lectures={lectures} video={video} />
        <ModuleVideo course={course} lecture={lectureVideo} video={video} />
      </div>
    </div>
  )
}
