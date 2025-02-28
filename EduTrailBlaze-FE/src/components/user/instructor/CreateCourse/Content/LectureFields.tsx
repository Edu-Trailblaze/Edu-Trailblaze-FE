import { Clock, MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import Button from '../../../../global/Button/Button'
import InputText from '../../../../global/Input/InputText'
import SelectField from '../../../../global/Select/SelectField'
import InputFile from '../../../../global/Input/InputFile'
import InputNumber from '../../../../global/Input/InputNumber'

interface LectureFieldsProps {
  section: ISectionTest
  sectionIndex: number
  removeLecture: (sectionIndex: number, lectureIndex: number) => void
  handleLectureChange: (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof ILectureTest,
    value: string | boolean | number
  ) => void
  setSections: React.Dispatch<React.SetStateAction<ISectionTest[]>>
  sections: ISectionTest[]
}

export default function LectureFields({
  section,
  sectionIndex,
  removeLecture,
  handleLectureChange,
  sections,
  setSections
}: LectureFieldsProps) {
  const addLecture = (sectionIndex: number) => {
    const newSections = [...sections]
    const section = newSections[sectionIndex]
    section.lectures.push({
      id: section.lectures.length + 1,
      title: '',
      type: 'Video',
      contentUrl: '',
      description: '',
      duration: 0
    })
    setSections(newSections)
  }
  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-sm font-medium text-gray-700'>Lectures</h3>
      </div>
      {section.lectures.map((lecture, lectureIndex) => (
        <div key={lecture.id} className='bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200'>
          <div className='mb-3 flex justify-between items-center'>
            <h5 className='text-sm font-medium'>
              Lecture {lectureIndex + 1}: {lecture.title || 'Untitled Lecture'}
            </h5>
            {section.lectures.length > 1 && (
              <button
                type='button'
                onClick={() => removeLecture(sectionIndex, lectureIndex)}
                className='text-red-600 p-1 rounded-full hover:bg-red-100'
              >
                <MinusCircleIcon className='h-4 w-4' />
              </button>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
            {/* Lecture Title */}
            <div>
              <InputText
                label='Title'
                name='lectureTitle'
                value={lecture.title}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value)}
                required
                placeholder='Enter Lecture Title'
              />
            </div>
            <div>
              {/* Lecture Type */}
              <SelectField label='Type' name='type' options={['Reading', 'Video', 'Quiz']} />
            </div>
          </div>

          {/* Content URL */}
          <InputText
            label='Content URL'
            name='contentURL'
            value={lecture.contentUrl}
            onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'contentUrl', e.target.value)}
            placeholder='Enter Content URL'
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
            {/* Description */}
            <div>
              <InputText
                label='Description'
                name='description'
                value={lecture.description}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'description', e.target.value)}
                placeholder='Lecture Description'
                type='textarea'
                rows={2}
              />
            </div>

            {/* Duration */}
            <div>
              <InputText
                label='Duration (minutes)'
                name='duration'
                iconLeft={<Clock className='w-5 h-5 text-gray-500' />}
                value={String(lecture.duration)}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'duration', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Button */}
      <Button
        variant='outline'
        onClick={() => addLecture(sectionIndex)}
        icon={<PlusCircleIcon className='h-5 w-5 mr-1 text-blue-500' />}
      >
        Add Lecture
      </Button>
    </div>
  )
}
