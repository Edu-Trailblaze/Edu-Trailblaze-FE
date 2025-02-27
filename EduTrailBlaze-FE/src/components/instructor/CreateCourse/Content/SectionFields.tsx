import { useState } from 'react'
import Button from '../../../global/Button/Button'
import { Input } from 'postcss'
import InputText from '../../../global/Input/InputText'
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import LectureFields from './LectureFields'

export default function SectionFields() {
  // const [sections, setSections] = useState<SectionLecture[]>([])

  const [sections, setSections] = useState<ISectionTest[]>([]) // SectionLecture[]
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>(sections.map(() => false))

  const addSection = () => {
    const tempId = Date.now()
    const newSection = {
      id: tempId,
      title: '',
      description: '',
      lectures: [
        {
          id: tempId,
          title: '',
          type: '' as 'Video' | 'Reading' | 'Quiz',
          contentUrl: '',
          description: '',
          duration: 0
        }
      ]
    }
    setSections([...sections, newSection])
    setCollapsedSections([...collapsedSections, false])
  }

  // Xóa Section
  const removeSection = (sectionIndex: number) => {
    setSections(sections.filter((_, index) => index !== sectionIndex))
    setCollapsedSections(collapsedSections.filter((_, index) => index !== sectionIndex))
  }

  // Toggle Collapse Section
  const toggleCollapse = (index: number) => {
    setCollapsedSections(collapsedSections.map((val, i) => (i === index ? !val : val)))
  }

  const removeLecture = (sectionIndex: number, lectureIndex: number) => {
    setSections((prevSection) => {
      return prevSection.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          return {
            ...section,
            lectures: section.lectures.filter((_, lIndex) => lIndex !== lectureIndex)
          }
        }
        return section
      })
    })
  }

  const handleLectureChange = (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof ILectureTest,
    value: string | boolean | number
  ) => {
    setSections((prevSection) =>
      prevSection.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          return {
            ...section,
            lectures: section.lectures.map((lecture, lIndex) => {
              if (lIndex === lectureIndex) {
                return {
                  ...lecture,
                  [field]: value
                }
              }
              return lecture
            })
          }
        }
        return section
      })
    )
  }
  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-medium text-gray-900 mb-4'>Course Content</h2>
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='p-4 bg-blue-50 border-b border-gray-200 flex justify-between items-center'>
            <h3 className='font-medium text-blue-800'>
              Section {sectionIndex + 1}: {section.title || 'Untilted Section'}
            </h3>
            <div className='flex space-x-2'>
              <Button size='sm' variant='customBlue' onClick={() => toggleCollapse(sectionIndex)}>
                {collapsedSections[sectionIndex] ? 'Open' : 'Close'}
              </Button>
              <Button size='sm' variant='customRed' onClick={() => removeSection(sectionIndex)}>
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
                section={section}
                sectionIndex={sectionIndex}
                removeLecture={removeLecture}
                handleLectureChange={handleLectureChange}
                sections={sections}
                setSections={setSections}
              />
            </div>
          )}
        </div>
      ))}
      <Button variant='customGreen' onClick={addSection} icon={<PlusCircleIcon className='h-4 w-4' />} size='ml'>
        Add New Section
      </Button>

      <div className='mt-8 flex justify-between'>
        <Button variant='outline' icon={<ArrowLeftIcon className='h-5 w-5 mr-1' />}>
          Back: Course Details
        </Button>
        <Button variant='primary'>Create Course</Button>
      </div>
    </div>
  )
}
