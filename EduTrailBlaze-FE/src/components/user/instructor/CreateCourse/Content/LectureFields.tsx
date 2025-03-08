import { PlusCircleIcon } from 'lucide-react'
import Button from '../../../../global/Button/Button'
import { useState, useEffect } from 'react'
import LectureItem from './LectureItems'

interface LectureFieldsProps {
  sectionIndex: number
  lectures: LectureVip[]
  setSections: React.Dispatch<React.SetStateAction<SectionVip[]>>
  updateLectures: (sectionIndex: number, newLectures: LectureVip[]) => void
}

export default function LectureFields({ sectionIndex, lectures, setSections, updateLectures }: LectureFieldsProps) {
  const [localLectures, setLocalLectures] = useState<LectureVip[]>(lectures)
  const [expandedLectures, setExpandedLectures] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (JSON.stringify(lectures) !== JSON.stringify(localLectures)) {
      updateLectures(sectionIndex, localLectures)
    }
  }, [localLectures, sectionIndex, updateLectures])

  const toggleLecture = (lectureIndex: number) => {
    setExpandedLectures((prev) => ({
      ...prev,
      [lectureIndex]: !prev[lectureIndex]
    }))
  }

  const addLecture = () => {
    setLocalLectures((prevLectures) => [
      ...prevLectures,
      {
        sectionId: Date.now(),
        title: '',
        lectureType: 'Video' as LectureType,
        contentPDFFile: null,
        description: '',
        duration: 0,
        content: ''
      }
    ])

    setTimeout(() => {
      updateLectures(sectionIndex, localLectures)
    }, 0)
  }

  const removeLecture = (index: number) => {
    setLocalLectures(localLectures.filter((_, i) => i !== index))
  }

  const handleLocalLectureChange = (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof LectureVip,
    value: string | number | boolean | File | null
  ) => {
    setLocalLectures((prevLectures) => {
      const updatedLectures = prevLectures.map((lecture, index) =>
        index === lectureIndex ? { ...lecture, [field]: value } : lecture
      )
      return updatedLectures
    })
    setTimeout(() => {
      updateLectures(sectionIndex, localLectures)
    }, 0)
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-base font-medium text-gray-800'>Lecture Content</h3>
      </div>

      {localLectures.map((lecture, lectureIndex) => (
        <LectureItem
          key={`lecture-${sectionIndex}-${lectureIndex}`}
          lecture={lecture}
          lectureIndex={lectureIndex}
          sectionIndex={sectionIndex}
          isExpanded={expandedLectures[lectureIndex] || false}
          toggleLecture={toggleLecture}
          removeLecture={removeLecture}
          handleLectureChange={handleLocalLectureChange}
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
