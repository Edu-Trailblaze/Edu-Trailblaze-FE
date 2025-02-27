'use client'
import { useState } from 'react'
import Head from 'next/head'
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowLeftIcon,
  CircleHelp as QuestionMarkCircleIcon,
  Video as VideoIcon,
  Image as PhotoIcon,
  BookOpen,
  Clock,
  User,
  CheckCircle,
  ChevronDown
} from 'lucide-react'

export default function CreateCourse() {
  const [activeTab, setActiveTab] = useState('details')
  const [outcomes, setOutcomes] = useState([''])
  const [sections, setSections] = useState([
    {
      id: 1,
      title: '',
      description: '',
      lectures: [
        {
          id: 1,
          title: '',
          type: 'Video',
          contentUrl: '',
          description: '',
          duration: 0
        }
      ]
    }
  ])
  const [imagePreview, setImagePreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const videoURL = URL.createObjectURL(file)
      setVideoPreview(videoURL)
    }
  }

  // Add a new learning outcome
  const addOutcome = () => {
    setOutcomes([...outcomes, ''])
  }

  // Remove a learning outcome
  const removeOutcome = (index) => {
    const newOutcomes = [...outcomes]
    newOutcomes.splice(index, 1)
    setOutcomes(newOutcomes)
  }

  // Update a learning outcome
  const updateOutcome = (index, value) => {
    const newOutcomes = [...outcomes]
    newOutcomes[index] = value
    setOutcomes(newOutcomes)
  }

  // Add a new section
  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: '',
      description: '',
      lectures: [
        {
          id: 1,
          title: '',
          type: 'Video',
          contentUrl: '',
          description: '',
          duration: 0
        }
      ]
    }
    setSections([...sections, newSection])
  }

  // Add a lecture to a section
  const addLecture = (sectionIndex) => {
    const newSections = [...sections]
    const section = newSections[sectionIndex]
    section.lectures.push({
      id: section.lectures.length + 1,
      title: '',
      type: 'Video',
      contentUrl: '',
      description: '',
      duration: 0
    })
    setSections(newSections)
  }

  // Remove a lecture from a section
  const removeLecture = (sectionIndex, lectureIndex) => {
    const newSections = [...sections]
    newSections[sectionIndex].lectures.splice(lectureIndex, 1)
    setSections(newSections)
  }

  // Handle section field changes
  const handleSectionChange = (sectionIndex, field, value) => {
    const newSections = [...sections]
    newSections[sectionIndex][field] = value
    setSections(newSections)
  }

  // Handle lecture field changes
  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const newSections = [...sections]
    newSections[sectionIndex].lectures[lectureIndex][field] = value
    setSections(newSections)
  }

  return (
    <div className='min-h-screen bg-blue-50'>
      <Head>
        <title>Create New Course</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <div className='p-6 bg-blue-600 text-white'>
            <h1 className='text-2xl font-bold'>Create New Course</h1>
            <p className='text-blue-100 mt-1'>Fill in the details below to create your course</p>
          </div>

          {/* Tabs */}
          <div className='flex border-b border-gray-200'>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ${
                activeTab === 'details'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`flex-1 py-4 px-6 text-center text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ${
                activeTab === 'sections'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sections & Lectures
            </button>
          </div>

          <div className='p-6'>
            {activeTab === 'details' ? (
              <div className='space-y-6'>
                {/* Title */}
                <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                  <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                    Course Title <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    placeholder='Enter a descriptive title for your course'
                  />
                  <p className='mt-1 text-xs text-gray-500'>A clear, specific title will attract more students</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Input file ảnh */}
                  <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                    <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
                      <PhotoIcon className='w-5 h-5 text-blue-500 mr-2' />
                      Upload Course Image
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                    {imagePreview && (
                      <div className='mt-2 flex justify-center'>
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='w-auto  rounded-lg shadow-md border border-gray-300'
                        />
                      </div>
                    )}
                  </div>

                  {/* Input file video */}
                  <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                    <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
                      <VideoIcon className='w-5 h-5 text-red-500 mr-2' />
                      Upload Introduction Video
                    </label>
                    <input
                      type='file'
                      accept='video/*'
                      onChange={handleVideoUpload}
                      className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                    {videoPreview && (
                      <div className='mt-2'>
                        <video controls className='w-full rounded'>
                          <source src={videoPreview} type='video/mp4' />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                  <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                    Description <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    rows={4}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    placeholder="Provide a detailed description of your course, including what students will learn, who it's for, and why they should take it."
                  />
                  <p className='mt-1 text-xs text-gray-500'>
                    Describe your course in at least 200 words to help students understand what they'll learn
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Price */}
                  <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                    <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>
                      Price ($)
                    </label>
                    <div className='relative rounded-md shadow-sm'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <span className='text-gray-500 sm:text-sm'>$</span>
                      </div>
                      <input
                        type='number'
                        name='price'
                        id='price'
                        className='p-3 pl-7 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                        placeholder='0'
                        aria-describedby='price-currency'
                      />
                      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                        <span className='text-gray-500 sm:text-sm' id='price-currency'>
                          USD
                        </span>
                      </div>
                    </div>
                    <p className='mt-1 text-xs text-gray-500'>Set a competitive price or enter 0 for a free course</p>
                  </div>

                  {/* Difficulty Level */}
                  <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                    <label htmlFor='difficulty' className='block text-sm font-medium text-gray-700 mb-1'>
                      Difficulty Level
                    </label>
                    <div className='relative'>
                      <select
                        id='difficulty'
                        name='difficulty'
                        className='p-3 block w-full border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                        defaultValue='Beginner'
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
                        <ChevronDown className='h-4 w-4' />
                      </div>
                    </div>
                    <p className='mt-1 text-xs text-gray-500'>Clearly specify who your course is intended for</p>
                  </div>
                </div>

                {/* Instructor Name */}
                <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                  <label htmlFor='instructor' className='block text-sm font-medium text-gray-700 mb-1'>
                    Instructor Name <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <User className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                      type='text'
                      name='instructor'
                      id='instructor'
                      className='p-3 pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                      placeholder='Your full name'
                    />
                  </div>
                </div>

                {/* Prerequisites */}
                <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                  <label htmlFor='prerequisites' className=' text-sm font-medium text-gray-700 mb-1 flex items-center'>
                    Prerequisites
                    <span className='ml-1 group relative'>
                      <QuestionMarkCircleIcon className='h-4 w-4 text-gray-400' />
                      <span className='hidden group-hover:block absolute z-10 top-6 -left-2 w-64 p-2 bg-black text-white text-xs rounded shadow-lg'>
                        List any knowledge or skills students need before taking this course
                      </span>
                    </span>
                  </label>
                  <textarea
                    id='prerequisites'
                    name='prerequisites'
                    rows={3}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    placeholder="List any prerequisites for taking this course, or write 'None' if there are no prerequisites."
                  />
                  <p className='mt-1 text-xs text-gray-500'>
                    Be specific about required knowledge to ensure student success
                  </p>
                </div>

                {/* Learning Outcomes */}
                <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                  <div className='flex justify-between items-center mb-3'>
                    <label className=' text-sm font-medium text-gray-700 flex items-center'>
                      Learning Outcomes <span className='text-red-500'>*</span>
                      <span className='ml-1 group relative'>
                        <QuestionMarkCircleIcon className='h-4 w-4 text-gray-400' />
                        <span className='hidden group-hover:block absolute z-10 top-6 -left-2 w-64 p-2 bg-black text-white text-xs rounded shadow-lg'>
                          What will students be able to do after completing your course?
                        </span>
                      </span>
                    </label>
                    <button
                      type='button'
                      onClick={addOutcome}
                      className='inline-flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200'
                    >
                      <PlusCircleIcon className='h-4 w-4 mr-1' />
                      Add Outcome
                    </button>
                  </div>

                  <div className='space-y-3'>
                    {outcomes.map((outcome, index) => (
                      <div key={index} className='flex items-center'>
                        <div className='flex-grow relative rounded-md shadow-sm'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <CheckCircle className='h-5 w-5 text-blue-500' />
                          </div>
                          <input
                            type='text'
                            value={outcome}
                            onChange={(e) => updateOutcome(index, e.target.value)}
                            className='p-3 pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                            placeholder={`Outcome ${index + 1}, e.g., "Create professional web applications using React"`}
                          />
                        </div>
                        {outcomes.length > 1 && (
                          <button
                            type='button'
                            onClick={() => removeOutcome(index)}
                            className='ml-2 text-red-600 p-1 rounded-full hover:bg-red-100'
                          >
                            <MinusCircleIcon className='h-5 w-5' />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className='mt-3 text-xs text-gray-500'>
                    Good learning outcomes are specific, measurable, and achievable
                  </p>
                </div>

                {/* Next button */}
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => setActiveTab('sections')}
                    className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
                  >
                    Next: Add Sections
                  </button>
                </div>
              </div>
            ) : (
              <div className='space-y-6'>
                <h2 className='text-xl font-medium text-gray-900 mb-4'>Course Sections</h2>

                {sections.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'
                  >
                    <div className='p-4 bg-blue-50 border-b border-gray-200 flex justify-between items-center'>
                      <h3 className='font-medium text-blue-800'>
                        Section {sectionIndex + 1}: {section.title || 'Untitled Section'}
                      </h3>
                      <div className='flex space-x-2'>
                        <button
                          type='button'
                          className='px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-md hover:bg-blue-200 transition-colors duration-200'
                        >
                          Close
                        </button>
                        <button
                          type='button'
                          className='px-3 py-1 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200 transition-colors duration-200'
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className='p-4 space-y-4'>
                      {/* Section Title */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Section Title</label>
                        <input
                          type='text'
                          value={section.title}
                          onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                          placeholder='Enter section title'
                        />
                      </div>

                      {/* Section Description */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Section Description</label>
                        <textarea
                          value={section.description}
                          onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                          rows={3}
                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                          placeholder='Describe what this section covers'
                        />
                      </div>

                      {/* Lectures */}
                      <div>
                        <div className='flex justify-between items-center mb-2'>
                          <h4 className='text-sm font-medium text-gray-700'>Lectures</h4>
                        </div>

                        {section.lectures.map((lecture, lectureIndex) => (
                          <div key={lecture.id} className='bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200'>
                            <div className='flex justify-between items-center mb-3'>
                              <h5 className='text-sm font-medium'>
                                Lecture {lectureIndex + 1}: {lecture.title || 'Untitled Lecture'}
                              </h5>
                              {section.lectures.length > 1 && (
                                <button
                                  type='button'
                                  onClick={() => removeLecture(sectionIndex, lectureIndex)}
                                  className='text-red-600 p-1 rounded-full hover:bg-red-100'
                                >
                                  <MinusCircleIcon className='h-4 w-4' />
                                </button>
                              )}
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
                              {/* Lecture Title */}
                              <div>
                                <label className='block text-xs font-medium text-gray-700 mb-1'>Title</label>
                                <input
                                  type='text'
                                  value={lecture.title}
                                  onChange={(e) =>
                                    handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value)
                                  }
                                  className='w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                  placeholder='Enter lecture title'
                                />
                              </div>

                              {/* Lecture Type */}
                              <div>
                                <label className='block text-xs font-medium text-gray-700 mb-1'>Type</label>
                                <div className='relative'>
                                  <select
                                    value={lecture.type}
                                    onChange={(e) =>
                                      handleLectureChange(sectionIndex, lectureIndex, 'type', e.target.value)
                                    }
                                    className='w-full p-2 text-sm border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                  >
                                    <option>Video</option>
                                    <option>Document</option>
                                    <option>Quiz</option>
                                  </select>
                                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500'>
                                    <ChevronDown className='h-4 w-4' />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Content URL */}
                            <div className='mb-3'>
                              <label className='block text-xs font-medium text-gray-700 mb-1'>Content URL</label>
                              <input
                                type='text'
                                value={lecture.contentUrl}
                                onChange={(e) =>
                                  handleLectureChange(sectionIndex, lectureIndex, 'contentUrl', e.target.value)
                                }
                                className='w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder='Enter content URL'
                              />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                              {/* Description */}
                              <div>
                                <label className='block text-xs font-medium text-gray-700 mb-1'>Description</label>
                                <textarea
                                  value={lecture.description}
                                  onChange={(e) =>
                                    handleLectureChange(sectionIndex, lectureIndex, 'description', e.target.value)
                                  }
                                  rows={2}
                                  className='w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                  placeholder='Describe this lecture'
                                />
                              </div>

                              {/* Duration */}
                              <div>
                                <label className='block text-xs font-medium text-gray-700 mb-1'>
                                  Duration (minutes)
                                </label>
                                <div className='relative'>
                                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Clock className='h-4 w-4 text-gray-400' />
                                  </div>
                                  <input
                                    type='number'
                                    value={lecture.duration}
                                    onChange={(e) =>
                                      handleLectureChange(
                                        sectionIndex,
                                        lectureIndex,
                                        'duration',
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    className='w-full p-2 pl-9 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    placeholder='0'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type='button'
                          onClick={() => addLecture(sectionIndex)}
                          className='inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
                        >
                          <PlusCircleIcon className='h-5 w-5 mr-1 text-blue-500' />
                          Add Lecture
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={addSection}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200'
                >
                  <PlusCircleIcon className='h-5 w-5 mr-1' />
                  Add New Section
                </button>

                <div className='mt-8 flex justify-between'>
                  <button
                    type='button'
                    onClick={() => setActiveTab('details')}
                    className='inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
                  >
                    <ArrowLeftIcon className='h-5 w-5 mr-1' />
                    Back to Course Details
                  </button>

                  <button
                    type='button'
                    className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
                  >
                    Create Course
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='bg-blue-100 rounded-lg p-4 border border-blue-200'>
          <h3 className='text-sm font-medium text-blue-800 mb-2'>Mock API Status (Check console for details)</h3>
          <div className='text-xs text-blue-600 space-y-1'>
            <p>Mock Courses: 0</p>
            <p>Mock Sections: 0</p>
            <p>Mock Lectures: 0</p>
            <p className='italic'>All created data is stored in memory and will be lost on page refresh.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
