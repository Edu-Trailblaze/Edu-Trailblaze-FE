'use client'
import { useState } from 'react'
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
import InputText from '../../../../global/Input/InputText'
import Button from '../../../../global/Button/Button'
import SelectField from '../../../../global/Select/SelectField'
import InputNumber from '../../../../global/Input/InputNumber'
import InputFile from '../../../../global/Input/InputFile'
import Box from '../../../../global/Box/Box'
import { useAddCourseMutation } from '../../../../../redux/services/courseDetail.service'

interface CourseFieldsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function CourseFields({ activeTab, setActiveTab }: CourseFieldsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [courseForm, setCourseForm] = useState<CreateCourse>({
    title: '',
    description: '',
    prerequisites: '',
    imageURL: '',
    introURL: '',
    price: 0,
    difficultyLevel: 'Beginner',
    learningOutcomes: [''],
    createdBy: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCourseForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [createCourse, { isLoading: isCreateCourse }] = useAddCourseMutation()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result as string)
    }

    setImageFile(file) // ✅ Lưu file thay vì Base64
    reader.readAsDataURL(file)
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const videoURL = URL.createObjectURL(file)
    setVideoPreview(videoURL)

    // ✅ Lưu file thay vì chỉ lưu URL
    setVideoFile(file)
  }
  // Add a new learning outcome
  const addOutcome = () => {
    setCourseForm((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, '']
    }))
  }

  const removeOutcome = (index: number) => {
    setCourseForm((prev) => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
    }))
  }

  const updateOutcome = (index: number, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.map((outcome, i) => (i === index ? value : outcome))
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('Title', courseForm.title)
      formData.append('Description', courseForm.description)
      formData.append('Prerequisites', courseForm.prerequisites)
      formData.append('Price', courseForm.price.toString()) // Chuyển số thành string
      formData.append('DifficultyLevel', courseForm.difficultyLevel)
      formData.append('CreatedBy', courseForm.createdBy)

      // Xử lý Learning Outcomes (Array)
      courseForm.learningOutcomes.forEach((outcome, index) => {
        formData.append(`LearningOutcomes[${index}]`, outcome)
      })

      // Kiểm tra và thêm file
      if (imageFile) {
        formData.append('ImageURL', imageFile)
      }
      if (videoFile) {
        formData.append('IntroURL', videoFile)
      }
      const response = await createCourse(formData).unwrap()
      console.log('Course created successfully', response)
      setActiveTab('sections')
    } catch (error) {
      console.error('Failed to create course', error)
    }
  }

  return (
    <div className='space-y-6'>
      {/* COURSE TITLE */}
      <Box>
        <InputText
          label='Course Title'
          name='title'
          subtitle='A clear, specific title will attract more students'
          placeholder='Enter a descriptive title for your course'
          required
          onChange={handleChange}
        />
      </Box>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Input file ảnh */}
        <InputFile
          label='Upload Course Image'
          name='courseImage'
          accept='image/*'
          onChange={handleImageUpload}
          preview={imagePreview}
          icon={<PhotoIcon className='w-5 h-5 text-blue-500 mr-2' />}
        />
        {/* <Box>
          <InputText
            label='Course Image URL'
            name='imageURL'
            required
            subtitle='Upload a high-quality image that represents your course'
            placeholder='Enter the URL of the course image'
            onChange={handleChange}
          />
        </Box> */}

        {/* Input file video */}
        <InputFile
          label='Upload Course Video'
          name='courseVideo'
          accept='video/*'
          onChange={handleVideoUpload}
          preview={videoPreview}
          icon={<VideoIcon className='w-5 h-5 text-red-500 mr-2' />}
        />

        {/* <Box>
          <InputText
            label='Course Video URL'
            name='introURL'
            required
            subtitle='Upload a video that introduces your course'
            placeholder='Enter the URL of the course video'
            onChange={handleChange}
          />
        </Box> */}
      </div>

      {/* Decription */}
      <Box>
        <InputText
          label='Description'
          name='description'
          type='textarea'
          required
          subtitle="Describe your course in at least 200 words to help students understand what they'll learn"
          placeholder="Provide a detailed description of your course, including what students will learn, who it's for, and why they should take it."
          onChange={handleChange}
        />
      </Box>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Price */}
        <Box>
          <InputNumber
            label='Price (VND)'
            name='price'
            subtitle='Set a competitive price or enter 0 for a free course'
            placeholder='0'
            required
            prefix='VND'
            suffix='VND'
            // onChange={(e) => setPrice(Number(e.target.value))}
            onChange={handleChange}
          />
        </Box>

        {/* Difficult Level */}
        <Box>
          <SelectField
            label='Difficulty Level'
            name='difficultyLevel'
            required
            subtitle='Clearly specify who your course is intended for '
            options={['Beginner', 'Intermediate', 'Advanced']}
            onChange={handleChange}
          />
        </Box>
      </div>

      {/* Instructor Name */}
      <Box>
        <InputText
          label='Instructor Name'
          name='createdBy'
          required
          subtitle='Enter the name of the instructor who created this course'
          placeholder='Enter the name of the instructor'
          onChange={handleChange}
        />
      </Box>
      {/* Prerequisites */}
      <Box>
        <InputText
          label='Prerequisites'
          name='prerequisites'
          required
          helperText='Knowledge or skills students need before taking this course'
          placeholder='Knowledge or skills students need before taking this course'
          subtitle='Be specific about required knowledge to ensure student success'
          onChange={handleChange}
        />
      </Box>

      {/* Learning Outcomes */}
      <Box>
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
          {courseForm.learningOutcomes.map((outcome, index) => (
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
              {courseForm.learningOutcomes.length > 1 && (
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
        <p className='mt-3 text-xs text-gray-500'>Good learning outcomes are specific, measurable, and achievable</p>
      </Box>

      {/* Next button */}
      <div className='flex justify-end py-5'>
        <form onSubmit={handleSubmit}>
          <Button icon={<PlusCircleIcon className='h-4 w-4' />} size='ml' variant='primary' isLoading={isCreateCourse}>
            {isCreateCourse ? 'Creating...' : 'Next: Add Sections'}
          </Button>
        </form>
      </div>
    </div>
  )
}
