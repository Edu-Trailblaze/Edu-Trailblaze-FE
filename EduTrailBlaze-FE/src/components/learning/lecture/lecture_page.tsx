// lecture_page.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { useGetCourseDetailsQuery } from '../../../redux/services/courseDetail.service'
import { useGetLectureQuery, useGetSectionLectureQuery } from '../../../redux/services/lecture.service'
import { useGetVideoByConditionsQuery } from '../../../redux/services/video.service'
import { useParams, useRouter } from 'next/navigation'
import Loading from '../../animate/Loading'
import LectureSideBar from './sidebar/lecture_side_bar'
import LectureContent from './content/leture_content'

export default function LecturePage() {
  const { courseURL, lectureURL } = useParams()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { data: course, isLoading: courseLoading } = useGetCourseDetailsQuery(Number(courseURL))
  const sectionIds = course?.sectionDetails?.map((section) => section.id) || []
  const { data: lectures } = useGetSectionLectureQuery(sectionIds)

  const [activeLectureId, setActiveLectureId] = useState<number | null>(Number(lectureURL))

  const { data: lectureContent } = useGetLectureQuery(activeLectureId ?? 0)
  const { data: video } = useGetVideoByConditionsQuery({ lectureId: activeLectureId })

  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(sessionStorage.getItem('expandedSections') || '{}')
    }
    return {}
  })
  const sectionId = course?.sectionDetails?.map((section) => section.id)
  // const lectureType = lectures
  //   ?.filter((lecture) => sectionIds.includes(lecture.sectionId))
  //   .map((lec) => lec.lectures.map((item) => item.lectureType))
  const currentLecture = lectures?.flatMap((section) => section.lectures).find((lec) => lec.id === activeLectureId)

  const lectureType = currentLecture?.lectureType || 'Video'
  console.log(currentLecture)

  useEffect(() => {
    sessionStorage.setItem('expandedSections', JSON.stringify(expandedSections))
  }, [expandedSections])

  const handleLectureChange = (id: number) => {
    setActiveLectureId(id)
    setIsSidebarOpen(false)
    router.push(`/course/${courseURL}/lecture/${id}`, { scroll: false })
  }

  if (courseLoading) return <Loading />
  if (!course) return <div>Course not found</div>
  if (!lectures) return <div>Lecture not found</div>
  if (!lectureContent) return <div>Lecture not found</div>
  if (!video) return <div>Video not found</div>

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex'>
        <LectureSideBar
          course={course}
          lectures={lectures}
          activeLectureId={activeLectureId}
          setActiveLectureId={handleLectureChange}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />

        <div className='flex-1'>
          <div className='sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden'>
            <button onClick={() => setIsSidebarOpen(true)} className='p-4 hover:bg-gray-50'>
              <MenuIcon className='w-6 h-6' />
            </button>
          </div>

          <div className='p-4'>
            <LectureContent lecture={lectureContent} video={video} lectureType={lectureType} />
          </div>
        </div>
      </div>
    </div>
  )
}
