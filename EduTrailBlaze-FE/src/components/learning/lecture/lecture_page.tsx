'use client'
import React, { useEffect, useState } from 'react'
import { useGetCourseDetailsQuery, useGetCourseQuery } from '../../../services/courseDetail.service'
import { useGetLectureQuery, useGetSectionLectureQuery } from '../../../services/lecture.service'
import Loading from '../../animate/Loading'
import { useGetVideoByConditionsQuery, useGetVideoQuery } from '../../../services/video.service'
import { useParams, useRouter } from 'next/navigation'
import LectureContent from './video/lecutre_video'
import LectureSideBar from './lecture_side_bar'

export default function LecturePage() {
  const { courseURL, lectureURL } = useParams()
  const router = useRouter()
  const { data: course, isLoading: courseLoading } = useGetCourseDetailsQuery(Number(courseURL))
  const sectionIds = course?.sectionDetails?.map((section) => section.id) || []
  const { data: lectures } = useGetSectionLectureQuery(sectionIds)

  const [activeLectureId, setActiveLectureId] = useState<number | null>(Number(lectureURL))
  
  //get one lecture
  const { data: lectureContent } = useGetLectureQuery(activeLectureId ?? 0)
  const { data: video } = useGetVideoByConditionsQuery({ lectureId: activeLectureId })

  // Lấy trạng thái mở rộng từ sessionStorage (nếu có)
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(sessionStorage.getItem('expandedSections') || '{}')
    }
    return {}
  })

  useEffect(() => {
    sessionStorage.setItem('expandedSections', JSON.stringify(expandedSections))
  }, [expandedSections]) // Khi đổi lecture, giữ nguyên trạng thái mở rộng

  const handleLectureChange = (id: number) => {
    setActiveLectureId(id)
    router.push(`/course/${courseURL}/lecture/${id}`, { scroll: false })
  }

  if (courseLoading) return <Loading />
  if (!course) return <div>Course not found</div>
  if (!lectures) return <div>Lecture not found</div>
  if (!lectureContent) return <div>Lecture not found</div>
  if (!video) return <div>Video not found</div>

  return (
    <div>
      <div className='flex'>
        <LectureSideBar
          course={course}
          lectures={lectures}
          video={video}
          activeLectureId={activeLectureId}
          setActiveLectureId={handleLectureChange}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
        />
        <LectureContent lecture={lectureContent} video={video} />
      </div>
    </div>
  )
}
