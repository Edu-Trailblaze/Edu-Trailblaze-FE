import { PlusCircleIcon } from 'lucide-react'
import Button from '../../../../global/Button/Button'
import { useState, useEffect } from 'react'
import LectureItem from './LectureItems'

interface LectureFieldsProps {
  sectionIndex: number
  lectures: ILectureTest[]
  setSections: React.Dispatch<React.SetStateAction<ISectionTest[]>>
  updateLectures: (sectionIndex: number, newLectures: ILectureTest[]) => void
}

export default function LectureFields({ sectionIndex, lectures, setSections, updateLectures }: LectureFieldsProps) {
  const [localLectures, setLocalLectures] = useState<ILectureTest[]>(lectures)
  const [expandedLectures, setExpandedLectures] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setLocalLectures(lectures)
  }, [lectures])

  useEffect(() => {
    updateLectures(sectionIndex, localLectures)
  }, [localLectures])

  const toggleLecture = (lectureIndex: number) => {
    setExpandedLectures((prev) => ({
      ...prev,
      [lectureIndex]: !prev[lectureIndex]
    }))
  }

  const addLecture = () => {
    setLocalLectures([
      ...localLectures,
      {
        id: Date.now(),
        title: '',
        lectureType: 'Video',
        contentPDFFile: '',
        description: '',
        duration: 0,
        passingScore: 0,
        questions: []
      }
    ])
  }

  const removeLecture = (index: number) => {
    setLocalLectures(localLectures.filter((_, i) => i !== index))
  }

  const handleLectureChange = (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof ILectureTest,
    value: string | boolean | number | IQuestion[]
  ) => {
    setSections((prevSections) =>
      prevSections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lectures: section.lectures.map((lecture, lIndex) =>
                lIndex === lectureIndex ? { ...lecture, [field]: value } : lecture
              )
            }
          : section
      )
    )
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-base font-medium text-gray-800'>Lecture Content</h3>
      </div>

      {localLectures.map((lecture, lectureIndex) => (
        <LectureItem
          key={lecture.id}
          lecture={lecture}
          lectureIndex={lectureIndex}
          sectionIndex={sectionIndex}
          isExpanded={expandedLectures[lectureIndex] || false}
          toggleLecture={toggleLecture}
          removeLecture={removeLecture}
          handleLectureChange={handleLectureChange}
          setSections={setSections}
          totalLectures={localLectures.length}
        />
      ))}

      {/* Add Lecture Button */}
      <Button
        variant='outline'
        onClick={addLecture}
        icon={<PlusCircleIcon className='h-5 w-5 mr-2 text-blue-500' />}
        className='mt-2 w-full justify-center py-3 bg-white hover:bg-blue-50 border-dashed border-blue-300'
      >
        Add New Lecture
      </Button>
    </div>
  )
}
