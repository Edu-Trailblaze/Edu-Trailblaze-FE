'use client'
import React, { useState } from 'react'
import { LuTableOfContents } from 'react-icons/lu'
import { RiArrowDropDownLine, RiArrowUpSLine } from 'react-icons/ri'
import { BsCheck2 } from 'react-icons/bs' // Checkmark icon
import { FiVideo } from 'react-icons/fi' // Video icon
import { convertDuration } from '../../../utils/format'

interface ModuleBarProps {
  course: ICourseFull
  lectures: SectionLecture[]
  video: IVideo
}

export default function ModuleBar({ course, lectures, video }: ModuleBarProps) {
  const [openModules, setOpenModules] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({})

  const toggleExpand = (index: any) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className='w-[400px] border-r-2 border-gray-200'>
      {/* Header */}
      <div className='flex pl-3 text-center items-center font-bold py-3 bg-white'>
        <LuTableOfContents className='text-2xl' />
        <h1 className='px-2 text-xl'>Course Content</h1>
      </div>

      {/* Module Dropdown */}
      {course.sectionDetails.map((section) => {
        const sectionLectures = lectures.find((lec) => lec.sectionId === section.id)?.lectures || []

        return (
          <div key={section.id}>
            <div
              className='flex bg-gray-100 px-4 py-2 justify-between cursor-pointer items-center'
              onClick={() => toggleExpand(section.id)}
            >
              <div>
                <p className='font-semibold'>{section.title}</p>
                <p className='font-thin text-sm'>
                  {convertDuration(section.duration)} | {sectionLectures.length} lectures
                </p>
              </div>
              <div>
                {expandedSections[section.id] ? (
                  <RiArrowUpSLine className='text-3xl' />
                ) : (
                  <RiArrowDropDownLine className='text-3xl' />
                )}
              </div>
            </div>

            {/* Submenu */}
            {expandedSections[section.id] && (
              <div className='bg-white'>
                {sectionLectures.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveVideo(item.id)}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                      activeVideo === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className='flex items-center gap-2'>
                      <FiVideo className='text-gray-500' />
                      <div>
                        <p className={`font-semibold mr-2 ${activeVideo === item.id ? 'text-blue-600' : ''}`}>
                          {index + 1}. {item.title}
                        </p>
                        <p className='text-sm text-gray-500'>{convertDuration(video.duration)}</p>
                      </div>
                    </div>
                    <BsCheck2 className='text-2xl text-gray-600' />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
