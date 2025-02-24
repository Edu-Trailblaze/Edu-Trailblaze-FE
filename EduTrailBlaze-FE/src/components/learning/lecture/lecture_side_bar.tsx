// lecture_side_bar.tsx
'use client'
import React from 'react'
import { FileVideo, ChevronDown, ChevronUp, CheckCircle2, MenuIcon, X } from 'lucide-react'

interface ModuleBarProps {
  course: ICourseFull
  lectures: SectionLecture[]
  video: IVideo[]
  activeLectureId: number | null
  setActiveLectureId: (id: number) => void
  expandedSections: { [key: number]: boolean }
  setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>
  isSidebarOpen: boolean
  onCloseSidebar: () => void
}

export default function LectureSideBar({
  course,
  lectures,
  video,
  activeLectureId,
  setActiveLectureId,
  expandedSections,
  setExpandedSections,
  isSidebarOpen,
  onCloseSidebar
}: ModuleBarProps) {
  const toggleExpand = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  let lectureCounter = 1

  //map section to lectures
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

  const completedLectures = 0

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white w-[320px] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 border-r border-gray-200 flex flex-col z-50`}
    >
      <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0'>
        <div className='flex items-center gap-2'>
          <MenuIcon className='w-5 h-5 text-blue-600' />
          <h1 className='font-semibold text-lg'>Course Content</h1>
        </div>
        <button onClick={onCloseSidebar} className='md:hidden'>
          <X className='w-5 h-5' />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {processedSections.map((section) => (
          // section
          <div key={section.id} className='border-b border-gray-200 bg-gray-100'>
            <button
              className='w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors'
              onClick={() => toggleExpand(section.id)}
            >
              <div className='text-left'>
                <p className='font-medium text-gray-900'>{section.title}</p>
                <p className='text-sm text-gray-500 mt-1'>
                  {section.duration.substring(0, 8)} • {completedLectures}/{section.lectures.length} lectures
                </p>
              </div>
              {expandedSections[section.id] ? (
                <ChevronUp className='w-5 h-5 text-gray-400' />
              ) : (
                <ChevronDown className='w-5 h-5 text-gray-400' />
              )}
            </button>

            {expandedSections[section.id] && (
              <div className='bg-white border-l-4 border-blue-300'>
                {section.lectures.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveLectureId(item.id)}
                    className={`w-full text-left p-4  hover:bg-sky-100 transition-colors ${
                      activeLectureId === item.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <p
                          className={`font-medium mr-2 ${activeLectureId === item.id ? 'text-blue-600' : 'text-gray-900'}`}
                        >
                          {item.currentIndex}. {item.title}
                        </p>
                        <div className='flex items-center gap-2 mt-1 text-sm text-gray-500'>
                          <FileVideo className='w-4 h-4' />
                          <span>{item.duration} min</span>
                        </div>
                      </div>
                      <CheckCircle2 className={`w-5 h-5 ${false ? 'text-green-500' : 'text-gray-300'}`} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
