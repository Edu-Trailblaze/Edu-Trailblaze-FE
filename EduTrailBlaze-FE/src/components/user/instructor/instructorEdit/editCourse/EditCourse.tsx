'use client'
import { useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useGetCourseByIdQuery, useUpdateCourseMutation } from '../../../../../redux/services/courseDetail.service'
import LoadingPage from '../../../../animate/Loading/LoadingPage'
import InputText from '../../../../global/Input/InputText'
import InputNumber from '../../../../global/Input/InputNumber'
import SelectField from '../../../../global/Select/SelectField'
import InputFile from '../../../../global/Input/InputFile'
import {
  Image,
  Video,
  BookOpenCheck,
  Library,
  CircleCheck,
  CirclePlus,
  RotateCcw,
  Check,
  EllipsisVertical,
  Trash2
} from 'lucide-react'
import Button from '../../../../global/Button/Button'
import Box from '../../../../global/Box/Box'
import { toast } from 'react-toastify'

export default function CourseEdit() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(Number(courseId))
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const [courseData, setCourseData] = useState(course ?? null)

  useEffect(() => {
    if (course) {
      setCourseData((prev) => ({
        ...prev,
        ...course
      }))
      setImagePreview(course.imageURL)
      setVideoPreview(course.introURL)
    }
  }, [course])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCourseData((prevData) => (prevData ? { ...prevData, [name]: value } : null))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    // const reader = new FileReader()
    // reader.onload = () => setImagePreview(reader.result as string)
    setImageFile(file)
    // reader.readAsDataURL(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // if (videoPreview) {
    //   URL.revokeObjectURL(videoPreview)
    // }

    // const newVideoURL = URL.createObjectURL(file)
    setVideoFile(file)
    // setVideoPreview(newVideoURL)
    setVideoPreview(URL.createObjectURL(file))
  }

  const handleOutcomeChange = (index: number, value: string) => {
    if (!courseData) return
    const updatedOutcomes = [...courseData.learningOutcomes]
    updatedOutcomes[index] = value
    setCourseData((prev) => (prev ? { ...prev, learningOutcomes: updatedOutcomes } : null))
  }

  const addOutcome = () => {
    setCourseData((prev) => (prev ? { ...prev, learningOutcomes: [...prev.learningOutcomes, ''] } : null))
  }

  // Xóa outcome
  const removeOutcome = (index: number) => {
    setCourseData((prev) =>
      prev ? { ...prev, learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index) } : null
    )
  }

  const handleReset = () => {
    if (course) {
      setCourseData(course)
      setImagePreview(course.imageURL)
      setVideoPreview(course.introURL)
      setImageFile(null)
      setVideoFile(null)
    }
  }

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseData) return
    try {
      const formData = new FormData()
      formData.append('CourseId', courseId)
      formData.append('Title', courseData.title)
      formData.append('Price', String(courseData.price))
      formData.append('DifficultyLevel', courseData.difficultyLevel)
      formData.append('Description', courseData.description)
      formData.append('Prerequisites', courseData.prerequisites)
      courseData.learningOutcomes.forEach((outcome) => {
        formData.append('LearningOutcomes', outcome)
      })
      formData.append('UpdatedBy', courseData.updatedBy)

      if (imageFile) formData.append('ImageURL', imageFile)
      if (videoFile) formData.append('IntroURL', videoFile)

      await updateCourse(formData).unwrap()
      toast.success('Course updated successfully!')
    } catch (error) {
      console.error('Error updating course:', error)
      toast.error('Failed to update course! Please check again')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex'>
      {/* Main content */}
      <main className='flex-1 ml-0 md:ml-14 pb-12'>
        <div className='container px-4 sm:px-6 md:px-8 py-8'>
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
              {courseData ? (
                <form onSubmit={handleSubmit} onLoad={isUpdating ? () => <LoadingPage /> : undefined}>
                  <div className='space-y-10'>
                    {/* Basic Information Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3'>
                          <InfoIcon />
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Basic Information</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <InputText
                            label='Course Title'
                            name='title'
                            value={courseData?.title}
                            onChange={handleChange}
                            placeholder='Enter an attractive course title'
                            noLayout
                          />
                        </div>

                        <div className='sm:col-span-3'>
                          <InputNumber
                            label='Price'
                            name='price'
                            value={courseData.price}
                            onChange={handleChange}
                            placeholder='0.00'
                            noLayout
                            suffix='VNĐ'
                          />
                        </div>

                        <div className='sm:col-span-3'>
                          <SelectField
                            label='Difficulty Level'
                            name='difficultyLevel'
                            value={courseData.difficultyLevel}
                            onChange={handleChange}
                            options={['Beginner', 'Intermediate', 'Advanced']}
                            noLayout
                          />
                        </div>

                        <div className='sm:col-span-6'>
                          <div className='bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6'>
                            <div className='flex'>
                              <InfoIcon color='primary' />
                              <div className='ml-3'>
                                <h3 className='text-sm font-medium text-blue-800'>Optimization tips!</h3>
                                <p className='mt-2 text-sm text-blue-700'>
                                  Introductory images and videos can increase your course sign-up rates by up to 30%.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <InputFile
                            label='Upload Course Image'
                            name='courseImage'
                            accept='image/*'
                            onChange={handleImageUpload}
                            preview={imagePreview ?? courseData.imageURL}
                            icon={<Image className='w-5 h-5 text-blue-500 mr-2' />}
                            noLayout
                          />
                        </div>

                        <div className='sm:col-span-3'>
                          <InputFile
                            label='Upload Course Video'
                            name='courseVideo'
                            accept='video/*'
                            onChange={handleVideoUpload}
                            preview={videoPreview ?? courseData.introURL}
                            icon={<Video className='w-5 h-5 text-red-500 mr-2' />}
                            noLayout
                          />
                        </div>

                        <div className='sm:col-span-6'>
                          <InputText
                            label='Description'
                            name='description'
                            type='textarea'
                            value={courseData.description}
                            required
                            subtitle="Describe your course in at least 100 words to help students understand what they'll learn"
                            placeholder="Provide a detailed description of your course, including what students will learn, who it's for, and why they should take it."
                            onChange={handleChange}
                            noLayout
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites Section */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3'>
                          <Library />
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Prerequisites</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <InputText
                            name='prerequisites'
                            type='textarea'
                            value={courseData.prerequisites}
                            onChange={handleChange}
                            placeholder='Enter any prerequisites for this course'
                            noLayout
                          />
                          <div className='mt-2 flex items-center text-sm text-gray-500'>
                            <InfoIcon />
                            Setting clear expectations will help attract the right target students.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Learning Outcomes Section */}
                    <Box>
                      <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                          <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3'>
                            <BookOpenCheck />
                          </div>
                          <h3 className='text-lg font-semibold text-gray-800'>Learning Outcomes</h3>
                        </div>
                        <Button variant='Green' className='gap-3 hover:scale-105' onClick={addOutcome} type='button'>
                          <CirclePlus />
                          Add Another Outcomes
                        </Button>
                      </div>

                      <div className='space-y-4'>
                        {courseData?.learningOutcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className='flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-green-200 transition duration-150 select-none'
                          >
                            <div className='mr-3 text-green-500'>
                              <CircleCheck />
                            </div>
                            <div className='flex-grow'>
                              <input
                                type='text'
                                value={outcome}
                                onChange={(e) => handleOutcomeChange(index, e.target.value)}
                                className='block w-full bg-gray-50 focus:ring-green-500 focus:border-green-500 sm:text-sm border-0 rounded-md p-0'
                                placeholder='Student can...'
                              />
                            </div>
                            <div className='flex items-center space-x-2'>
                              <button
                                type='button'
                                className='text-gray-400 hover:text-gray-500 focus:outline-none p-1'
                              >
                                <EllipsisVertical />
                              </button>
                              <button
                                type='button'
                                className='text-gray-400 hover:text-red-500 focus:outline-none p-1'
                                onClick={() => removeOutcome(index)}
                              >
                                <Trash2 />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className='mt-4 text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100'>
                        <strong>Tip:</strong> Use clear action verbs (such as “create,” “analyze,” “design”) to describe
                        the specific skills the learner will acquire.
                      </p>
                    </Box>
                  </div>

                  <div className='flex justify-end gap-3 mt-8'>
                    <Button variant='outline' className='gap-3' type='button' onClick={handleReset}>
                      <RotateCcw />
                      Reset
                    </Button>
                    <Button variant='indigo'>
                      <Check />
                      Save changes
                    </Button>
                  </div>
                </form>
              ) : (
                <LoadingPage />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
