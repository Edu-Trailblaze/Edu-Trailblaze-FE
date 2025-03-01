import { useState } from 'react'
import Button from '../../../../global/Button/Button'
import InputText from '../../../../global/Input/InputText'
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import LectureFields from './LectureFields'

interface SectionFieldsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function SectionFields({ activeTab, setActiveTab }: SectionFieldsProps) {
  const courseId = 33
  const [sections, setSections] = useState<SectionLectureVip[]>([
    {
      CourseId: courseId,
      Sections: [
        {
          id: Date.now(), // React cần id, nhưng không gửi lên server
          title: 'Section 1',
          description: 'Section 1 description',
          lectures: []
        }
      ]
    }
  ]) // SectionLectureVip[]
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>(sections.map(() => false))

  const addSection = () => {
    setSections((prevSections) => {
      // Sao chép mảng cũ
      const newSections = [...prevSections]

      // Kiểm tra xem SectionLectureVip đầu tiên có tồn tại không
      if (newSections.length > 0) {
        newSections[0] = {
          ...newSections[0],
          Sections: [
            ...newSections[0].Sections,
            {
              id: Date.now(), // Chỉ dùng trong React, không gửi lên server
              title: '',
              description: '',
              lectures: []
            }
          ]
        }
      } else {
        // Nếu chưa có, tạo mới
        newSections.push({
          CourseId: 33, // Thay bằng courseId phù hợp
          Sections: [
            {
              id: Date.now(),
              title: '',
              description: '',
              lectures: []
            }
          ]
        })
      }
      return newSections
    })
    setCollapsedSections((prev) => [...prev, false])
  }

  const sectionsToSend = sections.map((sectionLecture) => ({
    CourseId: sectionLecture.CourseId,
    Sections: sectionLecture.Sections.map(({ id, ...rest }) => rest) // Xóa id
  }))

  // back
  const handleBack = () => {
    setActiveTab('details')
  }

  // Xóa Section
  const removeSection = (sectionIndex: number) => {
    setSections((prevSections) => {
      if (prevSections.length === 0) return prevSections //// Tránh lỗi nếu không có phần tử nào
      const newSections = [...prevSections]
      newSections[0] = {
        ...newSections[0],
        Sections: newSections[0].Sections.filter((_, index) => index !== sectionIndex)
      }
      return newSections
    })
    setCollapsedSections((prev) => prev.filter((_, index) => index !== sectionIndex))
  }

  // Update Lectures
  const updateLectures = (sectionIndex: number, newLectures: LectureVip[]) => {
    setSections((prevSections) => {
      if (prevSections.length === 0) return prevSections // Tránh lỗi nếu không có phần tử nào
      const newSections = [...prevSections]
      newSections[0] = {
        ...newSections[0],
        Sections: newSections[0].Sections.map((section, index) =>
          index === sectionIndex ? { ...section, lectures: newLectures } : section
        )
      }
      return newSections
    })
  }

  // Toggle Collapse Section
  const toggleCollapse = (index: number) => {
    setCollapsedSections(collapsedSections.map((val, i) => (i === index ? !val : val)))
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-medium text-gray-900 mb-4'>Course Content</h2>
      {sections.map((sectionLecture, sectionLectureIndex) =>
        sectionLecture.Sections.map((section, sectionIndex) => (
          <div
            key={section.id || `section${sectionLectureIndex} - ${sectionIndex}`}
            className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
          >
            <div className='p-4 bg-blue-50 border-b border-gray-200 flex justify-between items-center'>
              <h3 className='font-medium text-blue-800'>
                Section {sectionIndex + 1}: {section.title || 'Untilted Section'}
              </h3>
              <div className='flex space-x-2'>
                <Button size='sm' variant='Blue' onClick={() => toggleCollapse(sectionIndex)}>
                  {collapsedSections[sectionIndex] ? 'Open' : 'Close'}
                </Button>
                <Button size='sm' variant='Red' onClick={() => removeSection(sectionIndex)}>
                  Delete
                </Button>
              </div>
            </div>

            {/* Section Title */}
            {!collapsedSections[sectionIndex] && (
              <div className='p-4 space-y-4'>
                <InputText label='Section Title' placeholder='Enter Section Title' name='sectionTitle' required />

                {/* Section Description */}
                <InputText
                  label='Section Description'
                  placeholder='Enter Section Description'
                  name='sectionDescription'
                  type='textarea'
                  required
                  rows={4}
                />

                {/* Lectures */}
                <LectureFields
                  sectionIndex={sectionIndex}
                  lectures={section.lectures}
                  setSections={setSections}
                  updateLectures={updateLectures}
                />
              </div>
            )}
          </div>
        ))
      )}
      <Button variant='Green' onClick={addSection} icon={<PlusCircleIcon className='h-4 w-4' />} size='ml'>
        Add New Section
      </Button>

      <div className='mt-8 flex justify-between'>
        <Button variant='outline' icon={<ArrowLeftIcon className='h-5 w-5 mr-1' />} onClick={handleBack}>
          Back: Course Details
        </Button>
        <Button variant='primary'>Create Course</Button>
      </div>
    </div>
  )
}
