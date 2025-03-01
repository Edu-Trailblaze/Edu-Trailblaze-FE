import { Clock, MinusCircleIcon, PlusCircleIcon, X, Edit3, HelpCircle } from 'lucide-react'
import InputText from '../../../../global/Input/InputText'
import SelectField from '../../../../global/Select/SelectField'

interface LectureItemProps {
  lecture: LectureVip
  lectureIndex: number
  sectionIndex: number
  isExpanded: boolean
  toggleLecture: (lectureIndex: number) => void
  removeLecture: (index: number) => void
  handleLectureChange: (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof LectureVip,
    value: string | boolean | number
  ) => void
  totalLectures: number
}

export default function LectureItem({
  lecture,
  lectureIndex,
  sectionIndex,
  isExpanded,
  toggleLecture,
  removeLecture,
  handleLectureChange,
  totalLectures
}: LectureItemProps) {
  const getLectureTypeIcon = (type: 'Reading' | 'Video' | 'Quiz') => {
    switch (type) {
      case 'Reading':
        return <Edit3 className='w-4 h-4' />
      case 'Video':
        return <Clock className='w-4 h-4' />
      case 'Quiz':
        return <HelpCircle className='w-4 h-4' />
    }
  }

  const getLectureTypeColor = (type: 'Reading' | 'Video' | 'Quiz') => {
    switch (type) {
      case 'Reading':
        return 'bg-purple-100 text-purple-800'
      case 'Video':
        return 'bg-blue-100 text-blue-800'
      case 'Quiz':
        return 'bg-amber-100 text-amber-800'
    }
  }

  return (
    <div className={`mb-4 border rounded-lg ${isExpanded ? 'border-blue-300 shadow-sm' : 'border-gray-200'}`}>
      {/* Lecture Header - Always visible */}
      <div
        className={`p-3 flex justify-between items-center cursor-pointer rounded-t-lg 
          ${isExpanded ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => toggleLecture(lectureIndex)}
      >
        <div className='flex items-center'>
          <div className='mr-2'>
            {isExpanded ? (
              <MinusCircleIcon className='h-5 w-5 text-blue-500' />
            ) : (
              <PlusCircleIcon className='h-5 w-5 text-gray-500' />
            )}
          </div>
          <div>
            <div className='flex items-center'>
              <span className='font-medium text-gray-900'>
                Lecture {lectureIndex + 1}: {lecture.title || 'Untitled Lecture'}
              </span>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getLectureTypeColor(lecture.lectureType)}`}>
                <span className='flex items-center'>
                  {getLectureTypeIcon(lecture.lectureType)}
                  <span className='ml-1'>{lecture.lectureType}</span>
                </span>
              </span>
            </div>
            <div className='text-xs text-gray-500 mt-1 flex items-center'>
              <Clock className='w-3 h-3 mr-1' />
              {lecture.duration} mins
            </div>
          </div>
        </div>

        {totalLectures > 1 && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              removeLecture(lectureIndex)
            }}
            className='ml-2 text-red-600 p-1 rounded-full hover:bg-red-100'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      {/* Lecture Content - Visible when expanded */}
      {isExpanded && (
        <div className='p-4 border-t border-gray-200 bg-white rounded-b-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            {/* Lecture Title */}
            <div>
              <InputText
                label='Lecture Title'
                name='lectureTitle'
                value={lecture.title}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value)}
                required
                placeholder='Enter Lecture Title'
              />
            </div>
            <div>
              {/* Lecture Type */}
              <SelectField
                label='Lecture Type'
                name='type'
                options={['Reading', 'Video', 'Quiz']}
                value={lecture.lectureType}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'lectureType', e.target.value)}
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            {/* Description */}
            <div>
              <InputText
                label='Description'
                name='description'
                value={lecture.description}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'description', e.target.value)}
                placeholder='Short description of the lecture'
                type='textarea'
                rows={2}
              />
            </div>

            {/* Duration */}
            <div>
              <InputText
                label='Duration (mins)'
                name='duration'
                iconLeft={<Clock className='w-5 h-5 text-gray-500' />}
                value={String(lecture.duration)}
                onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'duration', Number(e.target.value))}
              />
            </div>
          </div>

          <div className='mb-4'>
            <InputText
              label='Content URL'
              name='contentURL'
              value={lecture.contentPDFFile}
              onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'contentPDFFile', e.target.value)}
              placeholder='Enter content URL'
            />
          </div>
        </div>
      )}
    </div>
  )
}
