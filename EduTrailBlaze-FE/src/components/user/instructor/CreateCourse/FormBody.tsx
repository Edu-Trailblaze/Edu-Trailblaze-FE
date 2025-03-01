'use client'

import CourseFields from './Content/CourseFields'
import SectionFields from './Content/SectionFields'

interface FormBodyProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function FormBody({ activeTab, setActiveTab }: FormBodyProps) {
  return (
    <div className='p-10'>
      {activeTab === 'details' ? (
        <CourseFields activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <SectionFields activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  )
}
