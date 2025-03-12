'use client'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function CourseEdit() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  console.log('Course ID:', courseId)

  // State for form data
  const [courseData, setCourseData] = useState({
    title: 'React',
    imageUrl: 'https://example.com/react-course.jpg',
    introUrl: 'https://example.com/videos/react-intro.mp4',
    description:
      'Learn modern React development from the ground up. This course covers hooks, state management, and building interactive UIs with React.',
    price: 49.99,
    difficultyLevel: 'intermediate',
    prerequisites: 'Basic knowledge of HTML, CSS, and JavaScript. Familiarity with ES6 syntax is recommended.',
    learningOutcomes: [
      'Build modern React applications using functional components and hooks',
      'Create and manage complex state using React hooks',
      'Work with API data and implement proper error handling',
      'Deploy React applications to production'
    ]
  })

  // Handler for form input changes
  interface CourseData {
    title: string
    imageUrl: string
    introUrl: string
    description: string
    price: number
    difficultyLevel: string
    prerequisites: string
    learningOutcomes: string[]
  }

  interface ChangeEvent {
    target: {
      name: string
      value: string
    }
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target
    setCourseData((prevData: CourseData) => ({
      ...prevData,
      [name]: value
    }))
  }

  //   // Handler for learning outcomes changes
  //   const handleOutcomeChange = (index, value) => {
  //     const updatedOutcomes = [...courseData.learningOutcomes];
  //     updatedOutcomes[index] = value;
  //     setCourseData({
  //       ...courseData,
  //       learningOutcomes: updatedOutcomes
  //     });
  //   };

  //   // Add new outcome
  //   const addOutcome = () => {
  //     setCourseData({
  //       ...courseData,
  //       learningOutcomes: [...courseData.learningOutcomes, ""]
  //     });
  //   };

  //   // Remove outcome
  //   const removeOutcome = (index) => {
  //     const updatedOutcomes = courseData.learningOutcomes.filter((_, i) => i !== index);
  //     setCourseData({
  //       ...courseData,
  //       learningOutcomes: updatedOutcomes
  //     });
  //   };

  //   // Form submission handler
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Call API to save course data
  //     console.log("Saving course data:", courseData);
  //     // Example API call:
  //     // await fetch(`/api/courses/${id}`, {
  //     //   method: 'PUT',
  //     //   headers: { 'Content-Type': 'application/json' },
  //     //   body: JSON.stringify(courseData)
  //     // });

  //     // Navigate back to courses page or show success message
  //     alert("Course updated successfully!");
  //     // router.push('/courses');
  //   };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <Head>
        <title>Edit Course | EduTrailBlaze</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex'>
        {/* Main content */}
        <main className='flex-1 ml-0 md:ml-14 pb-12'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8'>
            {/* Header */}
            <div className='mb-8'>
              <h1 className='text-3xl font-bold text-indigo-900'>Course Editing</h1>
              <p className='mt-2 text-gray-600'>Update details to improve your course</p>
            </div>

            {/* Course Edit Form */}
            <div className='bg-white shadow-xl rounded-xl mb-8 overflow-hidden border border-gray-100'>
              {/* Form Header */}
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
                <h2 className='text-xl font-semibold text-white'>Update course information</h2>
                <p className='text-blue-100 mt-1'>Customize course content and settings</p>
              </div>

              <div className='p-8'>
                <form>
                  <div className='space-y-10'>
                    {/* Basic Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Basic Information</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                            Course Title
                          </label>
                          <div className='relative'>
                            <input
                              type='text'
                              name='title'
                              id='title'
                              onChange={handleChange}
                              className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Enter an attractive course title'
                            />
                            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 text-gray-400'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>
                            Price (₫)
                          </label>
                          <div className='mt-1 relative rounded-lg shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500 sm:text-sm'>₫</span>
                            </div>
                            <input
                              type='number'
                              name='price'
                              id='price'
                              value={courseData.price}
                              onChange={handleChange}
                              className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='0.00'
                            />
                            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500 sm:text-sm'>VNĐ</span>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='difficultyLevel' className='block text-sm font-medium text-gray-700 mb-1'>
                            Difficulty Level
                          </label>
                          <div className='relative'>
                            <select
                              id='difficultyLevel'
                              name='difficultyLevel'
                              value={courseData.difficultyLevel}
                              onChange={handleChange}
                              className='appearance-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150 pr-10'
                            >
                              <option value='beginner'>Beginner</option>
                              <option value='intermediate'>Intermediate</option>
                              <option value='advanced'>Advanced</option>
                            </select>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                              <svg
                                className='h-5 w-5 text-gray-400'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <div className='bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6'>
                            <div className='flex'>
                              <div className='flex-shrink-0'>
                                <svg
                                  className='h-5 w-5 text-blue-600'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              </div>
                              <div className='ml-3'>
                                <h3 className='text-sm font-medium text-blue-800'>Optimization tips!</h3>
                                <div className='mt-2 text-sm text-blue-700'>
                                  <p>
                                    Introductory images and videos can increase your course sign-up rates by up to 30%.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='imageUrl' className='block text-sm font-medium text-gray-700 mb-1'>
                            Course Image
                          </label>
                          <div className='mt-1 flex rounded-lg shadow-sm'>
                            <input
                              type='text'
                              name='imageUrl'
                              id='imageUrl'
                              value={courseData.imageUrl}
                              onChange={handleChange}
                              className='focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='https://example.com/course-image.jpg'
                            />
                            <button
                              type='button'
                              className='ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            >
                              Check
                            </button>
                          </div>
                          <div className='mt-2 flex items-center'>
                            {courseData.imageUrl ? (
                              <div className='w-12 h-12 rounded-md overflow-hidden mr-3 border border-gray-200'>
                                <img src={courseData.imageUrl} alt='Preview' className='w-full h-full object-cover' />
                              </div>
                            ) : (
                              <div className='w-12 h-12 flex items-center justify-center rounded-md bg-gray-100 mr-3'>
                                <svg
                                  className='h-6 w-6 text-gray-400'
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                  />
                                </svg>
                              </div>
                            )}
                            <span className='text-xs text-gray-500'>Suggestion: 1280x720px (16:9)</span>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='introUrl' className='block text-sm font-medium text-gray-700 mb-1'>
                            URL Introduction Video
                          </label>
                          <div className='mt-1'>
                            <input
                              type='text'
                              name='introUrl'
                              id='introUrl'
                              value={courseData.introUrl}
                              onChange={handleChange}
                              className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='https://youtube.com/watch?v=...'
                            />
                          </div>
                          <p className='mt-2 text-xs text-gray-500'>YouTube, Vimeo or Video URL</p>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                            Course Description
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='description'
                              name='description'
                              rows={6}
                              value={courseData.description}
                              onChange={handleChange}
                              className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Mô tả chi tiết về nội dung khóa học của bạn...'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z' />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Prerequisites</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label htmlFor='prerequisites' className='block text-sm font-medium text-gray-700 mb-1'>
                            Basic knowledge required
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='prerequisites'
                              name='prerequisites'
                              rows={4}
                              value={courseData.prerequisites}
                              onChange={handleChange}
                              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='List the skills or knowledge that students should have before starting your course...'
                            />
                          </div>
                          <div className='mt-2 flex items-center text-sm text-gray-500'>
                            <svg
                              className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Setting clear expectations will help attract the right target students.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Learning Outcomes Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                          <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                          <h3 className='text-lg font-semibold text-gray-800'>Learning Outcomes</h3>
                        </div>
                        <button
                          type='button'
                          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Add Another Outcomes
                        </button>
                      </div>

                      <div className='space-y-4'>
                        {courseData.learningOutcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className='flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-green-200 transition duration-150'
                          >
                            <div className='mr-3 text-green-500'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                            <div className='flex-grow'>
                              <input
                                type='text'
                                value={outcome}
                                onChange={handleChange}
                                className='block w-full bg-gray-50 focus:ring-green-500 focus:border-green-500 sm:text-sm border-0 rounded-md p-0'
                                placeholder='Student can...'
                              />
                            </div>
                            <div className='flex items-center space-x-2'>
                              <button
                                type='button'
                                className='text-gray-400 hover:text-gray-500 focus:outline-none p-1'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                                </svg>
                              </button>
                              <button type='button' className='text-gray-400 hover:text-red-500 focus:outline-none p-1'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}

                        {courseData.learningOutcomes.length === 0 && (
                          <div className='text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
                            <svg
                              className='mx-auto h-12 w-12 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1}
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                            <h3 className='mt-2 text-sm font-medium text-gray-900'>No learning results yet</h3>
                            <p className='mt-1 text-sm text-gray-500'>Add learning outcomes to engage learners.</p>
                            <div className='mt-4'>
                              <button
                                type='button'
                                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 mr-2'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                                Add first result
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className='mt-4 text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100'>
                        <strong>Tip:</strong> Use clear action verbs (such as “create,” “analyze,” “design”) to describe
                        the specific skills the learner will acquire.
                      </p>
                    </div>
                  </div>

                  <div className='flex justify-end gap-3 mt-8'>
                    <button
                      type='button'
                      onClick={() => router.push('/courses')}
                      className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                      </svg>
                      Save Draft
                    </button>
                    <button
                      type='submit'
                      className='inline-flex items-center px-5 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
