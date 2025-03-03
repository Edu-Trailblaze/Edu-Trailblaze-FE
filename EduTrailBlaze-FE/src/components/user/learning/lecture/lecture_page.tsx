'use client'
import React, { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'
import LectureSideBar from './sidebar/lecture_side_bar'
import LectureContent from './content/leture_content'
import LoadingPage from '@/components/animate/Loading/LoadingPage'
import { useParams, useRouter } from 'next/navigation'
import { useGetCourseDetailsQuery } from '../../../../redux/services/courseDetail.service'
import { useGetLectureQuery, useGetSectionLectureQuery } from '../../../../redux/services/lecture.service'
import { useGetVideoByConditionsQuery } from '../../../../redux/services/video.service'

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
  const currentLecture = lectures?.flatMap((section) => section.lectures).find((lec) => lec.id === activeLectureId)
  const lectureType = currentLecture?.lectureType || 'Reading'

  useEffect(() => {
    sessionStorage.setItem('expandedSections', JSON.stringify(expandedSections))
  }, [expandedSections])

  const handleLectureChange = (id: number) => {
    setActiveLectureId(id)
    setIsSidebarOpen(false)
    router.push(`/course/${courseURL}/lecture/${id}`, { scroll: false })
  }

  const handleNextLecture = () => {
    const allLecture = lectures?.flatMap((section) => section.lectures) || []
    const currentIndex = allLecture?.findIndex((l) => l.id === activeLectureId)
    if (currentIndex !== -1 && currentIndex < allLecture.length - 1) {
      const nextLecutre = allLecture[currentIndex + 1]
      handleLectureChange(nextLecutre.id)
    }
  }

  if (courseLoading) return <LoadingPage />
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
            <LectureContent
              lecture={lectureContent}
              video={video}
              lectureType={lectureType}
              onNextLecture={handleNextLecture}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
