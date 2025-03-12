import { useEffect, useState } from 'react'
import Button from '../../../../global/Button/Button'
import InputText from '../../../../global/Input/InputText'
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import LectureFields from './LectureFields'
import { useCreateSectionLectureVipMutation } from '../../../../../redux/services/lecture.service'
import { toast } from 'react-toastify'

interface SectionFieldsProps {
  courseId: number | null
}

export default function SectionFields({ courseId }: SectionFieldsProps) {
  const [createSecLec, { isLoading: loadingSecLec }] = useCreateSectionLectureVipMutation()
  // const [sections, setSections] = useState<SectionVip[]>([])
  const [sections, setSections] = useState<SectionVip[]>([{ id: Date.now(), title: '', description: '', lectures: [] }])
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>([false])

  useEffect(() => {
    setCollapsedSections(sections.map(() => false))
  }, [sections])

  const addSection = () => {
    setSections((prev) => [...prev, { id: Date.now(), title: '', description: '', lectures: [] }])
    setCollapsedSections((prev) => [...prev, false])
  }

  const removeSection = (sectionIndex: number) => {
    setSections((prev) => prev.filter((_, index) => index !== sectionIndex))
    setCollapsedSections((prev) => prev.filter((_, index) => index !== sectionIndex))
  }

  const updateSection = (sectionIndex: number, field: keyof SectionVip, value: string) => {
    setSections((prev) =>
      prev.map((section, index) => (index === sectionIndex ? { ...section, [field]: value } : section))
    )
  }

  const updateLectures = (sectionIndex: number, newLectures: LectureVip[]) => {
    setSections((prev) =>
      prev.map((section, index) => (index === sectionIndex ? { ...section, lectures: newLectures } : section))
    )
  }

  const toggleCollapse = (index: number) => {
    setCollapsedSections((prev) => prev.map((val, i) => (i === index ? !val : val)))
  }

  const handleCreateSecLecVip = async () => {
    if (!courseId) {
      toast.error('CourseId is missing. Please create a course first!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    if (sections.length === 0) {
      alert('⚠️ Please add at least one section.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('CourseId', courseId.toString())

      sections.forEach((section, sIndex) => {
        formData.append(`Sections[${sIndex}].Title`, section.title)
        formData.append(`Sections[${sIndex}].Description`, section.description)

        section.lectures.forEach((lecture, lIndex) => {
          formData.append(`Sections[${sIndex}].Lectures[${lIndex}].Title`, lecture.title)
          formData.append(`Sections[${sIndex}].Lectures[${lIndex}].LectureType`, lecture.lectureType)
          formData.append(`Sections[${sIndex}].Lectures[${lIndex}].Description`, lecture.description)
          formData.append(`Sections[${sIndex}].Lectures[${lIndex}].Duration`, lecture.duration.toString())
          formData.append(`Sections[${sIndex}].Lectures[${lIndex}].Content`, lecture.content)
          if (lecture.contentPDFFile instanceof File) {
            formData.append(`Sections[${sIndex}].Lectures[${lIndex}].ContentPDFFile`, lecture.contentPDFFile)
          }
        })
      })

      const response = await createSecLec(formData).unwrap()
      toast.success('Created successfully!')
      setSections([])
    } catch (error) {
      console.error('Error creating sections:', error)
    }
  }

  return (
    <div className='space-y-6 container my-10'>
      <h2 className='text-xl font-medium text-gray-900 mb-4'>Course Content</h2>

      {sections.map((section, sectionIndex) => (
        <div key={section.id} className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <div className='p-4 bg-blue-50 border-b border-gray-200 flex justify-between items-center'>
            <h3 className='font-medium text-blue-800'>
              Section {sectionIndex + 1}: {section.title || 'Untitled Section'}
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

          {!collapsedSections[sectionIndex] && (
            <div className='p-4 space-y-4'>
              <InputText
                label='Section Title'
                placeholder='Enter Section Title'
                name='sectionTitle'
                required
                value={section.title}
                onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
              />

              <InputText
                label='Section Description'
                placeholder='Enter Section Description'
                name='sectionDescription'
                type='textarea'
                required
                rows={4}
                value={section.description}
                onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
              />

              <LectureFields
                sectionIndex={sectionIndex}
                lectures={section.lectures}
                setSections={setSections}
                updateLectures={updateLectures}
              />
            </div>
          )}
        </div>
      ))}

      <Button variant='Green' onClick={addSection} icon={<PlusCircleIcon className='h-4 w-4' />} size='ml'>
        Add New Section
      </Button>

      <div className='mt-8 flex justify-between'>
        <Button variant='primary' onClick={handleCreateSecLecVip} isLoading={loadingSecLec}>
          {loadingSecLec ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </div>
  )
}
