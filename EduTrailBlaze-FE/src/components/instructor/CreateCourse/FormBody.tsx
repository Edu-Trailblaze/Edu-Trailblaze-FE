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
import InputText from '../../global/Input/InputText'
import InputFile from '../../global/Input/InputFile'
import InputNumber from '../../global/Input/InputNumber'
import SelectField from '../../global/Select/SelectField'
import Box from '../../global/Box/Box'
import Button from '../../global/Button/Button'
import Course from '../../learning/course/layout/course_fullpage'
import CourseFields from './Content/CourseFields'
import SectionFields from './Content/SectionFields'

interface FormBodyProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function FormBody({ activeTab, setActiveTab }: FormBodyProps) {
  return (
    <div className='p-10'>
      {activeTab === 'details' ? <CourseFields activeTab={activeTab} setActiveTab={setActiveTab} /> : <SectionFields />}
    </div>
  )
}
