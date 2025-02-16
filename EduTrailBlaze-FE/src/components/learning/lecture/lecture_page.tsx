'use client'
import ModuleBar from '@/components/learning/lecture/module_bar'
import ModuleVideo from '@/components/learning/lecture/module_video'
import React from 'react'
import { useGetCourseDetailsQuery, useGetCourseQuery } from '../../../services/courseDetail.service'
import { useGetLectureQuery, useGetSectionLectureQuery } from '../../../services/lecture.service'
import Loading from '../../animate/Loading'
import { useGetVideoByConditionsQuery, useGetVideoQuery } from '../../../services/video.service'
import { useParams } from 'next/navigation'

export default function LecturePage() {
  const { courseURL, lectureURL } = useParams()
  const { data: course, isLoading: courseLoading } = useGetCourseDetailsQuery(Number(courseURL))
  const sectionIds = course?.sectionDetails?.map((section) => section.id) || []
  const { data: lectures } = useGetSectionLectureQuery(sectionIds)
  const { data: lectureVideo, isLoading: lectureVideoLoading } = useGetLectureQuery(12)
  const { data: video, isLoading: videoLoading } = useGetVideoByConditionsQuery({ lectureId: 12 })

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
  console.log('video', video)

  return (
    <div>
      <div className='flex'>
        {/* <ModuleBar course={course} section={section} lecture={lecture} video={video} /> */}
        <ModuleBar course={course} lectures={lectures} video={video} />
        <ModuleVideo lecture={lectureVideo} video={video} />
      </div>
    </div>
  )
}
