'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Modal from '../../../../../global/Modal/Modal'
import { ChevronDown, Video, Clock, FileText, User, Play, Users, BookOpen, Compass } from 'lucide-react'

interface CourseSectionProps {
  courseDetails: ICourseDetails
  section: ISection[]
  lecture: SectionLecture[]
}

export default function CourseSection({ courseDetails, section, lecture }: CourseSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    [section[0]?.id]: true // Open first section by default
  })
  const [expandedLectures, setExpandedLectures] = useState<Record<number, boolean>>({})
  const [isModalOpen, setModalOpen] = useState(false)

  const toggleExpand = (sectionId: number) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const toggleLectureExpand = (lectureId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setExpandedLectures((prev) => ({ ...prev, [lectureId]: !prev[lectureId] }))
  }

  const totalLectures = section.reduce((sum, sec) => sum + sec.numberOfLectures, 0)

  return (
    <div className=' py-8' id='courses'>
      {/* Summary */}
      <div className='mb-6'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='h-8 w-1 bg-blue-600 rounded-full'></div>
          <h2 className='text-2xl md:text-3xl font-bold'>Course Content</h2>
        </div>

        <div className='flex flex-wrap gap-2 items-center text-gray-600 mb-4'>
          <div className='flex items-center'>
            <BookOpen size={16} className='mr-1' />
            <span>{section.length} sections</span>
          </div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-400'></div>
          <div className='flex items-center'>
            <FileText size={16} className='mr-1' />
            <span>{totalLectures} lectures</span>
          </div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-400'></div>
          <div className='flex items-center'>
            <Clock size={16} className='mr-1' />
            <span>{courseDetails.duration} minutes total</span>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12'>
        {/* Sections & Lectures */}
        <div className='lg:col-span-8'>
          <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
            {section.map((sec, index) => (
              <div key={sec.id} className='border-b border-gray-200 last:border-b-0'>
                <div
                  className={`flex justify-between items-center px-4 py-4 cursor-pointer transition-colors duration-200 ${
                    expandedSections[sec.id] ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleExpand(sec.id)}
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium'>
                      {index + 1}
                    </div>
                    <h3 className='font-medium text-gray-900'>{sec.title}</h3>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='hidden sm:flex items-center text-sm text-gray-500 space-x-2'>
                      <span className='flex items-center'>
                        <FileText size={14} className='mr-1' />
                        <span>
                          {sec.numberOfLectures} {sec.numberOfLectures > 1 ? 'lectures' : 'lecture'}
                        </span>
                      </span>
                      <span className='h-1 w-1 bg-gray-300 rounded-full'></span>
                      <span className='flex items-center'>
                        <Clock size={14} className='mr-1' />
                        <span>{sec.duration.substring(0, 5)}</span>
                      </span>
                    </div>

                    <ChevronDown
                      size={20}
                      className={`text-gray-500 transition-transform duration-300 ${
                        expandedSections[sec.id] ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedSections[sec.id] ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  {lecture
                    .filter((lec) => lec.sectionId === sec.id && lec.lectures.length > 0)
                    .map((lec) => (
                      <div key={lec.sectionId} className='border-t border-gray-100'>
                        {lec.lectures.map((l) => (
                          <div key={l.id} className='px-4 py-3 hover:bg-gray-50'>
                            <div
                              className='flex items-center gap-2 cursor-pointer'
                              onClick={(e) => toggleLectureExpand(l.id, e)}
                            >
                              <div className='flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600'>
                                <Play size={14} />
                              </div>
                              <div className='flex-grow'>
                                <span className='text-gray-900'>{l.title}</span>
                              </div>
                              <div className='flex items-center text-sm text-gray-500 space-x-2'>
                                <span className='whitespace-nowrap hidden sm:inline-flex items-center'>
                                  <Clock size={14} className='mr-1' />
                                  {l.duration} min
                                </span>
                                <span className='sm:hidden'>{l.duration}m</span>
                                <ChevronDown
                                  size={18}
                                  className={`transition-transform duration-300 ${
                                    expandedLectures[l.id] ? 'transform rotate-180' : ''
                                  }`}
                                />
                              </div>
                            </div>

                            <div
                              className={`ml-8 mr-2 transition-all duration-300 overflow-hidden ${
                                expandedLectures[l.id] ? 'max-h-40 mt-2' : 'max-h-0'
                              }`}
                            >
                              <p className='text-gray-600 text-sm bg-gray-50 p-3 rounded-md'>
                                {l.description || 'No description provided for this lecture.'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructors */}
        <div className='lg:col-span-4'>
          <div className='border border-gray-200 rounded-lg p-6 shadow-sm bg-white sticky top-20'>
            <div className='flex items-center mb-4'>
              <User size={20} className='mr-2 text-blue-600' />
              <h3 className='text-lg font-semibold'>Instructors</h3>
            </div>

            {courseDetails?.instructors.slice(0, 2).map((instructor, index) => (
              <div key={index} className='flex items-center py-3 border-b border-gray-100 last:border-b-0'>
                <Avatar className='h-12 w-12 border-2 border-blue-100'>
                  <AvatarImage src={instructor.profilePictureUrl} alt={instructor.userName} />
                  <AvatarFallback className='bg-blue-100 text-blue-800'>
                    {instructor.userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-3'>
                  <Link href='' className='text-blue-600 hover:text-blue-800 font-medium'>
                    {instructor.userName}
                  </Link>
                  <div className='flex items-center text-xs text-gray-500 mt-1'>
                    <Compass size={12} className='mr-1' />
                    <span>0 Courses</span>
                    <span className='mx-1'>•</span>
                    <Users size={12} className='mr-1' />
                    <span>{courseDetails.enrollment.totalEnrollments} learners</span>
                  </div>
                </div>
              </div>
            ))}

            {courseDetails?.instructors.length > 2 && (
              <button
                onClick={() => setModalOpen(true)}
                className='w-full mt-4 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200'
              >
                <Users size={16} className='mr-2' />
                View all {courseDetails?.instructors.length} instructors
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for all instructors */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title='Course Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {courseDetails?.instructors.map((instructor, index) => (
            <div
              key={index}
              className='bg-white rounded-lg p-4 border border-gray-200 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200'
            >
              <Avatar className='h-16 w-16 border-2 border-blue-100'>
                <AvatarImage src={instructor.profilePictureUrl} alt={instructor.userName} />
                <AvatarFallback className='bg-blue-100 text-blue-800 text-lg'>
                  {instructor.userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link href='' className='text-blue-600 hover:text-blue-800 font-medium'>
                  {instructor.userName}
                </Link>
                <p className='text-sm text-gray-500 mt-1'>
                  0 Courses • {courseDetails.enrollment.totalEnrollments} learners
                </p>
                <button className='text-sm text-blue-600 hover:underline mt-2'>View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
