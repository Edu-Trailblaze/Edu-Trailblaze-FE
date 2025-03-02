'use client'

import { useState } from 'react'
import CourseFields from './Content/CourseFields'
import SectionFields from './Content/SectionFields'

interface FormBodyProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function FormBody({ activeTab, setActiveTab }: FormBodyProps) {
  const [courseId, setCourseId] = useState<number | null>(null)
  return (
    <div className='p-10'>
      {activeTab === 'details' ? (
        <CourseFields activeTab={activeTab} setActiveTab={setActiveTab} setCourseId={setCourseId} />
      ) : (
        <SectionFields courseId={courseId} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  )
}
