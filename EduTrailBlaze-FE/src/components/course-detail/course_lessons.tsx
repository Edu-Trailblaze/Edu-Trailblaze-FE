'use client'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetCourseQuery } from '../../service/redux.service'
import Modal from '../global/Modal'
import Link from 'next/link'
import LoadingPayment from '../animate/LoadingPayment'
import { convertDuration, formatNumber } from '../../utils/format'

export default function CourseLessons({courseDetails, sectionDetails} : ICourseFull) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [showMore, setShowMore] = useState(false)

  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  if (!courseDetails) {
    return <div>No course details available</div>;
  }
  

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const toggleSummary = () => {
    setShowMore(!showMore)
  }

  return (
    <>
      {/* summary */}
      <div className='container mb-10'>
        <div className='w-[900px]'>
          <h1 className='text-2xl mb-3 font-semibold'>Specialization - 5 course series</h1>
          <p
            className={`text-grey-700 mt-4 overflow-hidden transition-all duration-500 ${
              showMore ? 'max-h-[1000px]' : 'max-h-[50px]'
            }`}
          >
            Stemming from the principles of storytelling and design established in CalArts’ renowned Animation programs,
            this Specialization lays a primary foundation for experimentation and exploration of video game design,
            story, character development, and winning gameplay before programming begins. <br /> These four courses
            emphasize the self-reliance and personal expression of the gaming artist, and encourage you to take
            conceptual risks and develop new modes of expression and form through gaming.
            <br /> Applied Learning Project In the final Capstone Project, you’ll put your creative skills to work by
            generating an engaging game design document for a personal game project, outlining the conceptual, narrative
            and aesthetic elements of your game. This four-part capstone project guides you to distill and improve the
            foundational aspects of your game so that you may express your ideas in a clear and productive way.
          </p>
          <button onClick={toggleSummary} className='text-blue-500 mt-2'>
            {showMore ? 'Read less' : 'Read more'}
          </button>
        </div>
      </div>

      {/* courses and instructors */}
      <div className='container mb-10'>
        <div className='grid grid-cols-12'>
          {/* courses */}
          <div className='col-span-8 border-2 rounded-lg px-10 py-4 mr-12'>
            {sectionDetails.map((value, index) => (
              <div key={index} className='border-b last:border-0 py-4 flex justify-between'>
                <div>
                  <a href='' className='text-lg font-semibold underline'>
                    {value.title}
                  </a>
                  <div className='flex text-xs text-gray-500 space-x-4'>
                    <span>Course {index + 1}</span>
                    <span>•</span>
                    {/* <span>{value.duration}</span> */}
                    <span>{convertDuration(value.duration)}</span>
                    <span>•</span>
                    {/* <span className='text-blue-500 tracking-wide font-semibold'>★ {value.rating}</span> */}
                    <span>{value.numberOfLectures} {value.numberOfLectures > 1 ? "instructors" : "instructor"} </span>
                  </div>
                  {expandedIndex === index && <p className='mt-2 text-sm text-gray-700'>{value.description}</p>}
                </div>
                <button onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </button>
              </div>
            ))}
          </div>

          {/* instructors */}
          <div className='col-span-4 border-2 rounded-lg px-10 py-4 h-fit'>
            <div className='py-4'>
              <p className=' text-lg font-semibold'>Instructors</p>
              {courseDetails?.instructors.slice(0, 2).map((value, index) => (
                <div key={index} className='flex mb-5 mt-5'>
                  <Avatar>
                    <AvatarImage src={`${value.image}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='ml-5'>
                    <a href='' className='text-sm underline'>
                      {value.userName}
                    </a>
                    <div>
                      <span className='text-xs mr-2 text-gray-500'>3 Course</span>
                      <span className='mr-2 text-gray-500 text-xs'>•</span>
                      <span className='text-xs text-gray-500'>{courseDetails.enrollment.totalEnrollments} learners</span>
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
            {/* <div className='font-semibold text-lg mb-5'> Offered by</div>
            <div className='flex'>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='ml-5 mb-3'>
                <p className='underline font-semibold text-sm'>California Institute of the Arts</p>
                <a href='' className='text-blue-700 text-sm'>
                  Learn more
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title='Instructors'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4'>
          {courseDetails?.instructors.map((value, index) => (
            <div key={index} className='flex space-x-3 items-center'>
              <Avatar className='border-2 border-gray-300'>
                <AvatarImage src={`${value.image}`}/>
                <AvatarFallback>Instructor</AvatarFallback>
              </Avatar>
              <div>
                <Link href='' className='text-sm font-semibold'>{value.userName}</Link>
                <br/>
                <Link href='' className='text-sm text-gray-500'>{'IBM'}</Link>
                <p className='text-sm text-gray-500'>{0} Courses • {0} learners</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
