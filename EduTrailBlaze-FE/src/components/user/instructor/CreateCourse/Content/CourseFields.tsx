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

interface CourseFieldsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function CourseFields({ activeTab, setActiveTab }: CourseFieldsProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [prerequisites, setPrerequisites] = useState('')
  const [outcomes, setOutcomes] = useState<string[]>([''])

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [price, setPrice] = useState(0)
  const [difficultLevel, setDifficultLevel] = useState('Beginner')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const videoURL = URL.createObjectURL(file)
      setVideoPreview(videoURL)
    }
  }

  // Add a new learning outcome
  const addOutcome = () => {
    setOutcomes([...outcomes, ''])
  }

  const removeOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index))
  }

  const updateOutcome = (index: number, value: string) => {
    setOutcomes(outcomes.map((outcome, i) => (i === index ? value : outcome)))
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
          onChange={(e) => setTitle(e.target.value)}
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

        {/* Input file video */}
        <InputFile
          label='Upload Course Video'
          name='courseVideo'
          accept='video/*'
          onChange={handleVideoUpload}
          preview={videoPreview}
          icon={<VideoIcon className='w-5 h-5 text-red-500 mr-2' />}
        />
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
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Box>

        {/* Difficult Level */}
        <Box>
          <SelectField
            label='Difficult Level'
            name='difficultLevel'
            required
            subtitle='Clearly specify who your course is intended for '
            options={['Beginner', 'Intermidate', 'Advanced']}
            onChange={(e) => setDifficultLevel(e.target.value)}
          />
        </Box>
      </div>

      {/* Instructor Name */}
      <Box>
        <InputText
          label='Instructor Name'
          name='instructorName'
          required
          subtitle='Enter the name of the instructor who created this course'
          placeholder='Enter the name of the instructor'
          onChange={(e) => setInstructor(e.target.value)}
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
          onChange={(e) => setPrerequisites(e.target.value)}
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
        <p className='mt-3 text-xs text-gray-500'>Good learning outcomes are specific, measurable, and achievable</p>
      </Box>

      {/* Next button */}
      <div className='flex justify-end py-5'>
        <Button
          icon={<PlusCircleIcon className='h-4 w-4' />}
          size='ml'
          onClick={() => setActiveTab('sections')}
          variant='primary'
        >
          Next: Add Sections
        </Button>
      </div>
    </div>
  )
}
