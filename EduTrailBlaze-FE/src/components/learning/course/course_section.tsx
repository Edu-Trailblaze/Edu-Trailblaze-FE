'use client'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Modal from '../../global/Modal'
import Link from 'next/link'
import { getInstructorImage } from '../../../utils/format'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo'

interface CourseSectionProps {
  courseDetails: ICourseDetails
  section: ISection[]
  lecture: SectionLecture[]
}

export default function CourseSection({ courseDetails, section, lecture }: CourseSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({})
  const [expandedLectures, setExpandedLectures] = useState<Record<number, boolean>>({})
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleExpand = (sectionId: number) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const toggleLectureExpand = (lectureId: number) => {
    setExpandedLectures((prev) => ({ ...prev, [lectureId]: !prev[lectureId] }))
  }

  return (
    <>
      {/* Summary */}
      <div className='container mb-5'>
        <div className='w-[900px]'>
          <h1 className='text-xl mb-3 font-semibold'>Course Content</h1>
          <div className='flex gap-2'>
            <p>{section.length} sections</p>
            <p>•</p>
            <p>{section.reduce((sum, sec) => sum + sec.numberOfLectures, 0)} lectures</p>
            <p>•</p>
            <p>3h duration</p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className='container mb-10 grid grid-cols-12'>
        {/* Sections & Lectures */}
        <div className='col-span-8 border-2 border-gray-400 mr-12'>
          {section.map((sec) => (
            <div key={sec.id} className='w-full'>
              <div
                className='flex border-b-2 border-gray-400 p-3 bg-gray-200 justify-between items-center cursor-pointer'
                onClick={() => toggleExpand(sec.id)}
              >
                <div className='flex items-center gap-2'>
                  {/* Icon có hiệu ứng xoay */}
                  <div
                    className={`transition-transform duration-500 ${
                      expandedSections[sec.id] ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <ExpandMoreIcon />
                  </div>
                  <span>{sec.title}</span>
                </div>

                <div className='flex items-center gap-1'>
                  <span>
                    {sec.numberOfLectures} {sec.numberOfLectures > 1 ? 'lectures' : 'lecture'}
                  </span>
                  <span>•</span>
                  <span>{sec.duration.substring(0, 5)}</span>
                </div>
              </div>

              {expandedSections[sec.id] &&
                lecture
                  .filter((lec) => lec.sectionId === sec.id && lec.lectures.length > 0)
                  .map((lec) => (
                    <div key={lec.sectionId} className='p-3 text-sm border-b-2 border-gray-400 flex flex-col'>
                      {lec.lectures.map((l) => (
                        <div key={l.id} className='flex flex-col gap-2 p-2'>
                          <div className='flex items-center gap-2'>
                            <SlowMotionVideoIcon className='hover:animate-spin' />
                            <span>{l.title}</span>
                            <ExpandMoreIcon
                              onClick={() => toggleLectureExpand(l.id)}
                              className={`cursor-pointer transition-transform duration-500 ${
                                expandedLectures[l.id] ? 'rotate-180' : 'rotate-0'
                              }`}
                            />
                          </div>

                          {expandedLectures[l.id] && <div className='ml-6 text-gray-600'>{l.description}</div>}
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          ))}
        </div>

        {/* Instructors */}
        <div className='col-span-4 border-2 border-gray-400 px-10 py-3 h-fit'>
          <p className='font-semibold'>Instructors</p>
          {courseDetails?.instructors.slice(0, 2).map((instructor, index) => (
            <div key={index} className='flex mb-5 mt-5'>
              <Avatar>
                <AvatarImage src={getInstructorImage(instructor)} />
              </Avatar>
              <div className='ml-5'>
                <Link href='' className='text-sm underline'>
                  {instructor.userName}
                </Link>
                <div className='text-xs text-gray-500'>
                  0 Courses • {courseDetails.enrollment.totalEnrollments} learners
                </div>
              </div>
            </div>
          ))}

          {/* View all instructors */}
          <button className='text-sm text-blue-700 hover:underline' onClick={() => setModalOpen(true)}>
            View all {courseDetails?.instructors.length} instructors
          </button>
        </div>
      </div>

      {/* Modal for all instructors */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title='Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4'>
          {courseDetails?.instructors.map((instructor, index) => (
            <div key={index} className='flex space-x-3 items-center'>
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src={getInstructorImage(instructor)} />
                <AvatarFallback>Instructor</AvatarFallback>
              </Avatar>
              <div>
                <Link href='' className='text-sm font-semibold'>
                  {instructor.userName}
                </Link>
                <p className='text-sm text-gray-500'>0 Courses • 0 learners</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
