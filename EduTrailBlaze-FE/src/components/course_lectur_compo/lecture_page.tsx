'use client'
import ModuleBar from '@/components/course_lectur_compo/module_bar'
import ModuleVideo from '@/components/course_lectur_compo/module_video'
import React from 'react'
import { useGetCourseQuery } from '../../services/courseDetail.service'
import { useGetSectionQuery } from '../../services/section.service'
import { useGetLectureQuery } from '../../services/lecture.service'
import Loading from '../animate/Loading'


export default function LecturePage() {
  const { data: course, isLoading: courseLoading, isFetching: courseFetching } = useGetCourseQuery(18)
  const { data: section, isLoading: sectionLoading, isFetching: sectionFetching } = useGetSectionQuery(1)
  const { data: lecture, isLoading: lectureLoading, isFetching: lectureFetching } = useGetLectureQuery(1)
  
  if(courseLoading || sectionLoading){
    return <Loading />
  }

  if (!course){
    return <div>Course not found</div>
  }

  if (!section){
    return <div>Section not found</div>
  }

  

  // if (!lecture){
  //   return <div>Lecture not found</div>
  // }
  return (
    <div>
        <div className='flex'>
            <ModuleBar course={course} section={section}/>
            <ModuleVideo course={course} section={section}/>
        </div>
    </div>
  )
}
