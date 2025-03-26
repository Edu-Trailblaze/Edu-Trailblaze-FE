'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import {
  FileVideo,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  MenuIcon,
  X,
  FileText,
  FileQuestion,
  Lock
} from 'lucide-react'
import { useGetUserProgressQuery } from '../../../../../redux/services/userProgress.service'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

interface ModuleBarProps {
  decodedUserId: string
  course: ICourseFull
  lectures: SectionLecture[]
  activeLectureId: number | null
  setActiveLectureId: (id: number) => void
  expandedSections: { [key: number]: boolean }
  setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>
  isSidebarOpen: boolean
  onCloseSidebar: () => void
}

export default function LectureSideBar({
  decodedUserId,
  course,
  lectures,
  activeLectureId,
  setActiveLectureId,
  expandedSections,
  setExpandedSections,
  isSidebarOpen,
  onCloseSidebar
}: ModuleBarProps) {
  const router = useRouter()
  const { courseURL } = useParams()
  console.log('courseURL', courseURL)
  const { data: userProgress, isLoading: progressLoading } = useGetUserProgressQuery({ userId: decodedUserId })

  const toggleExpand = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  let lectureCounter = 1

  // Map section to lectures
  const processedSections = (course.sectionDetails ?? []).map((section) => {
    const sectionLectures =
      lectures
        .filter((lec) => lec.sectionId === section.id)
        .flatMap((lec) => lec.lectures)
        .map((item) => ({
          ...item,
          currentIndex: lectureCounter++
        })) || []
    return { ...section, lectures: sectionLectures }
  })

  // Check if current lecture is the last lecture
  const allLectures = processedSections.flatMap((section) => section.lectures)
  const lastLecture = allLectures.at(-1) // Lấy phần tử cuối cùng của mảng
  const isCurrentLectureLast = activeLectureId === lastLecture?.id

  const isLastLectureCompleted = useMemo(() => {
    return lastLecture && userProgress?.some((p) => p.lectureId === lastLecture.id && p.isCompleted)
  }, [userProgress, lastLecture])

  const hasShownToast = useRef(false)

  useEffect(() => {
    if (isCurrentLectureLast && isLastLectureCompleted && !hasShownToast.current) {
      toast.success(
        <div>
          🎉 Congrats! You have completed the last lecture!
          <button
            onClick={() => router.push(`/student/course/${Number(courseURL)}`)}
            className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
          >
            Go to Course Details
          </button>
        </div>,
        {
          autoClose: 3000,
          closeOnClick: false
        }
      )
      hasShownToast.current = true // Đánh dấu đã hiển thị
    }
  }, [isCurrentLectureLast, isLastLectureCompleted])

  const getLectureIcon = (lectureType: string) => {
    switch (lectureType) {
      case 'Reading':
        return <FileText className='w-4 h-4' />
      case 'Video':
        return <FileVideo className='w-4 h-4' />
      case 'Quiz':
        return <FileQuestion className='w-4 h-4' />
      default:
        return <FileText className='w-4 h-4' />
    }
  }

  return (
    <div
      className={`min-h-screen fixed top-0 left-0 h-full bg-white w-80 transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 border-r border-gray-200 flex flex-col z-50 shadow-md`}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10'>
        <div className='flex items-center gap-2'>
          <MenuIcon className='w-5 h-5 text-blue-600' />
          <h1 className='font-bold text-lg text-gray-800'>Course Content</h1>
        </div>
        <button onClick={onCloseSidebar} className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <X className='w-5 h-5' />
        </button>
      </div>

      {/* {isCurrentLectureLast && <p className='text-red-500 text-sm mt-2'>You are on the last lecture!</p>} */}
      {/* Sections List */}
      <div className='flex-1 overflow-y-auto'>
        {processedSections.map((section) => (
          <div key={section.id} className='border-b border-gray-200'>
            <button
              className='w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors'
              onClick={() => toggleExpand(section.id)}
            >
              <div className='text-left'>
                <p className='font-medium text-gray-900'>{section.title}</p>
                <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
                  <span>{section.lectures.length} lectures</span>
                  <span>•</span>
                  <span>{section.duration.substring(0, 8)}</span>
                </div>
              </div>
              {expandedSections[section.id] ? (
                <ChevronUp className='w-5 h-5 text-gray-500' />
              ) : (
                <ChevronDown className='w-5 h-5 text-gray-500' />
              )}
            </button>

            {expandedSections[section.id] && (
              <div className='bg-gray-50'>
                {section.lectures.map((item) => {
                  const isCompleted = userProgress?.some((p) => p.lectureId === item.id && p.isCompleted)

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveLectureId(item.id)}
                      className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${
                        activeLectureId === item.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200'>
                          {isCompleted ? (
                            <CheckCircle2 className='w-5 h-5 text-green-500' />
                          ) : (
                            <span className='text-xs text-gray-500'>{item.currentIndex}</span>
                          )}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <p
                            className={`font-medium truncate ${activeLectureId === item.id ? 'text-blue-600' : 'text-gray-900'}`}
                          >
                            {item.title}
                          </p>
                          <div className='flex items-center gap-2 mt-1 text-xs text-gray-500'>
                            {getLectureIcon(item.lectureType)}
                            <span>{item.lectureType}</span>
                            <span>•</span>
                            <span>{item.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Course Info Footer */}
      <div className='p-4 border-t border-gray-200 bg-gray-50'>
        <h1>Course Detail</h1>
        <h3 className='font-semibold text-gray-800 mb-2'>{course.courseDetails?.title}</h3>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <span>{course.sectionDetails?.map((lecture) => lecture.title)} lectures</span>
          <span>•</span>
          <span>{course.courseDetails?.duration} total hours</span>
        </div>
      </div>
    </div>
  )
}
