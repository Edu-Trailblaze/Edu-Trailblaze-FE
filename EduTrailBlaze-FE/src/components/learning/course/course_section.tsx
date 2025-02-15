'use client'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Modal from '../../global/Modal'
import Link from 'next/link'
import { convertDuration, formatNumber, getInstructorImage } from '../../../utils/format'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo'

interface CourseSectionProps {
  courseDetails: ICourseDetails
  section: ISection[]
  
}

export default function CourseSection({ courseDetails, section }: CourseSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({})
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const toggleExpand = (index: any) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <>
      {/* summary */}
      <div className='container mb-5'>
        <div className='w-[900px]'>
          <h1 className='text-xl mb-3 font-semibold'>Course Content</h1>
          <div className='flex gap-2 '>
            <p>47 sections</p>
            <p>•</p>
            <p>{section[0].numberOfLectures} lecture</p>
            <p>•</p>
            <p>3h duration</p>
          </div>
        </div>
      </div>

      {/* courses and instructors */}
      <div className='container mb-10'>
        <div className='grid grid-cols-12'>
          {/* courses */}
          <div className='col-span-8 border-2 border-black mr-12 rounded-lg'>
            {section.map((value, index) => (
              <div className='w-full' key={index}>
                <div className=' flex border-b-2 border-black p-3 justify-between items-center cursor-pointer' onClick={() => toggleExpand(index)}>
                  <div className='flex items-center'>
                      {expandedSections[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <div className='ml-2'>{value.title}</div>
                  </div>

                  <div className='flex items-center gap-1'>
                    <div>{value.numberOfLectures} {value.numberOfLectures > 1 ? 'lectures' : 'lecture'}</div>
                    <div>•</div>
                    <div>{value.duration.substring(0,5)}</div>
                  </div>
                </div>
                {expandedSections[index] && (
                  <div className='p-3 text-sm bg-gray-200 flex items-center  border-b-2 border-black'>
                    <div>
                      <SlowMotionVideoIcon />
                    </div>
                    <div className='ml-2'>leture</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* instructors */}
          <div className='col-span-4 border-2 border-black  px-10 py-4 h-fit rounded-lg'>
            <div className='py-4'>
              <p className=' text-lg font-semibold'>Instructors</p>
              {courseDetails?.instructors.slice(0, 2).map((value, index) => (
                <div key={index} className='flex mb-5 mt-5'>
                  <Avatar>
                    <AvatarImage src={getInstructorImage(value)} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='ml-5'>
                    <a href='' className='text-sm underline'>
                      {value.userName}
                    </a>
                    <div>
                      <span className='text-xs mr-2 text-gray-500'>3 Course</span>
                      <span className='mr-2 text-gray-500 text-xs'>•</span>
                      <span className='text-xs text-gray-500'>
                        {courseDetails.enrollment.totalEnrollments} learners
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <button className='text-sm text-blue-700 hover:underline' onClick={openModal}>
                  View all {courseDetails?.instructors.length} instructors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4'>
          {courseDetails?.instructors.map((value, index) => (
            <div key={index} className='flex space-x-3 items-center'>
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src={getInstructorImage(value)} />
                <AvatarFallback>Instructor</AvatarFallback>
              </Avatar>
              <div>
                <Link href='' className='text-sm font-semibold'>
                  {value.userName}
                </Link>
                <br />
                <Link href='' className='text-sm text-gray-500'>
                  {'IBM'}
                </Link>
                <p className='text-sm text-gray-500'>
                  {0} Courses • {0} learners
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
