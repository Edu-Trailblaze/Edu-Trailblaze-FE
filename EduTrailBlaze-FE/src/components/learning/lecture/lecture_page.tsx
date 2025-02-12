'use client'
import ModuleBar from '@/components/learning/lecture/module_bar'
import ModuleVideo from '@/components/learning/lecture/module_video'
import React from 'react'
import { useGetCourseQuery } from '../../../services/courseDetail.service'
import { useGetSectionQuery } from '../../../services/section.service'
import { useGetLectureQuery } from '../../../services/lecture.service'
import Loading from '../../animate/Loading'
import { useGetVideoQuery } from '../../../services/video.service'


export default function LecturePage() {
  const { data: course, isLoading: courseLoading, isFetching: courseFetching } = useGetCourseQuery(22)
  const { data: section, isLoading: sectionLoading, isFetching: sectionFetching } = useGetSectionQuery(1)
  const { data: lecture, isLoading: lectureLoading, isFetching: lectureFetching } = useGetLectureQuery(2)
  const { data: video, isLoading: videoLoading, isFetching: videoFetching } = useGetVideoQuery(4)
  
  if(courseLoading || sectionLoading){
    return <Loading />
  }

  if (!course){
    return <div>Course not found</div>
  }

  if (!section){
    return <div>Section not found</div>
  }

  if (!lecture){
    return <div>Lecture not found</div>
  }

  if (!video){
    return <div>Video not found</div>
  }

  return (
    <div>
        <div className='flex'>
            <ModuleBar course={course} section={section} lecture={lecture} video={video} />
            <ModuleVideo course={course} section={section} lecture={lecture} video={video}/>
        </div>
    </div>
  )
}
