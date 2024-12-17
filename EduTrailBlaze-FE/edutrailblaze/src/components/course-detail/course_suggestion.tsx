'use client'
import { useState } from 'react'

export default function CourseSuggestion() {
  interface Courses {
    link?: string
    imgage: string
    name: string
    time: number
    date: string
    star: number
    participants: string
    price: string
    discountPrice: string
  }

  const courses: Courses[] = [
    {
      name: 'The Complete Prompt Engineering for AI Bootcamp (2024)',
      link: 'https://www.youtube.com/',
      imgage: 'https://github.com/shadcn.png',
      time: 22,
      date: '11/2024',
      star: 4.5,
      participants: '131,594',
      price: '₫199,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'ChatGPT Masterclass: The Guide to AI & Prompt Engineering',
      imgage: 'https://github.com/shadcn.png',
      time: 23,
      date: '10/2024',
      star: 4.6,
      participants: '30,696',
      price: '₫229,000',
      discountPrice: '₫999,000'
    },
    {
      name: 'Artificial Intelligence A-Z 2024: Build 7 AI + LLM & ChatGPT',
      imgage: 'https://github.com/shadcn.png',
      time: 15.5,
      date: '10/2024',
      star: 4.4,
      participants: '298,532',
      price: '₫299,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'AI MBA - 25 Courses in 1: ChatGPT Prompt Engineering Hands On',
      imgage: 'https://github.com/shadcn.png',
      time: 45.5,
      date: '10/2024',
      star: 4.7,
      participants: '3,182',
      price: '₫199,000',
      discountPrice: '₫1,399,000'
    },
    {
      name: 'The AI Engineer Course 2024: Complete AI Engineer Bootcamp',
      imgage: 'https://github.com/shadcn.png',
      time: 21.5,
      date: '10/2024',
      star: 4.5,
      participants: '5,824',
      price: '₫199,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'The Complete Prompt Engineering for AI Bootcamp (2024)',
      link: 'https://www.youtube.com/',
      imgage: 'https://github.com/shadcn.png',
      time: 22,
      date: '11/2024',
      star: 4.5,
      participants: '131,594',
      price: '₫199,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'ChatGPT Masterclass: The Guide to AI & Prompt Engineering',
      imgage: 'https://github.com/shadcn.png',
      time: 23,
      date: '10/2024',
      star: 4.6,
      participants: '30,696',
      price: '₫229,000',
      discountPrice: '₫999,000'
    },
    {
      name: 'Artificial Intelligence A-Z 2024: Build 7 AI + LLM & ChatGPT',
      imgage: 'https://github.com/shadcn.png',
      time: 15.5,
      date: '10/2024',
      star: 4.4,
      participants: '298,532',
      price: '₫299,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'AI MBA - 25 Courses in 1: ChatGPT Prompt Engineering Hands On',
      imgage: 'https://github.com/shadcn.png',
      time: 45.5,
      date: '10/2024',
      star: 4.7,
      participants: '3,182',
      price: '₫199,000',
      discountPrice: '₫1,399,000'
    },
    {
      name: 'The AI Engineer Course 2024: Complete AI Engineer Bootcamp',
      imgage: 'https://github.com/shadcn.png',
      time: 21.5,
      date: '10/2024',
      star: 4.5,
      participants: '5,824',
      price: '₫199,000',
      discountPrice: '₫1,499,000'
    },
    {
      name: 'Machine Learning, Data Science and Generative AI with Python',
      imgage: 'https://github.com/shadcn.png',
      time: 20.5,
      date: '10/2024',
      star: 4.6,
      participants: '219,294',
      price: '₫299,000',
      discountPrice: '₫1,499,000'
    }
  ]

  const [visibleCourse, setVisibleCourse] = useState(6)

  const handleShowCourses = () => {
    if (visibleCourse < courses.length) {
      setVisibleCourse(courses.length)
    } else {
      setVisibleCourse(6)
    }
  }

  return (
    <div className='container mb-10'>
      {/* Title */}
      <h2 className='text-2xl font-semibold mb-4'>Students also bought</h2>

      {/* Course List */}
      <div className='grid grid-cols-2 gap-6'>
        {courses.slice(0, visibleCourse).map((course, index) => (
            <a
              href={`${course.link || '#'} `}
              key={index}
              className='flex items-center border rounded-lg p-4 hover:shadow-lg'
            >
              {/* Course Image */}
              <img src={course.imgage} alt={course.name} className='w-20 h-20 object-cover rounded-md mr-4' />

              {/* Course Information */}
              <div className='flex-1'>
                <h3 className='text-md font-semibold'>{course.name}</h3>
                <p className='text-sm text-gray-500'>
                  ⭐ {course.star} • {course.participants} participants
                </p>
                <p className='text-sm text-gray-500'>
                  ⏳ {course.time} total hours • Updated {course.date}
                </p>
              </div>

              {/* Course Price */}
              <div className='text-right'>
                <p className='text-lg font-bold text-green-600'>{course.price}</p>
                <p className='text-sm line-through text-gray-400'>{course.discountPrice}</p>
              </div>
            </a>
        ))}
      </div>
      {/* Show more / Show less */}
      <button
        onClick={handleShowCourses}
        className='text-white font-semibold hover:bg-cyan-600 transition-colors duration-500 bg-blue-600 container h-12 mt-2 mb-2 row-span-12unded'
      >
        {visibleCourse < courses.length ? 'Show more' : 'Show less'}
      </button>
    </div>
  )
}
