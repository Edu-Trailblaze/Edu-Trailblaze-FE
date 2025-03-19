import React, { useEffect, useMemo, useState } from 'react'
import { Check, X } from 'lucide-react'
import { useGetInstructorSpecialtiesQuery, useGetTagQuery, usePostTagMutation } from '@/redux/services/tag.service'

interface SpecialtiesProp {
  userId: string
}

const SpecialtySelector = ({ userId }: SpecialtiesProp) => {
  const { data: specialtiesData, isFetching: specialtiesFetching, isLoading: specialtiesLoading } = useGetTagQuery()
  const {
    data: specialtiesIns,
    isFetching: specialtiesInsFetching,
    isLoading: specialtiesInsLoading
  } = useGetInstructorSpecialtiesQuery(userId)
  const [postTags, { isLoading: isSaving }] = usePostTagMutation()

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (specialtiesIns?.tag) {
      setSelectedTagIds(specialtiesIns.tag)
    }
  }, [specialtiesIns])

  interface ToggleSpecialty {
    (tagId: number): void
  }

  const toggleSpecialty: ToggleSpecialty = (tagId) => {
    setSelectedTagIds((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const handleSave = async () => {
    try {
      await postTags({ userId, tagId: selectedTagIds }).unwrap()
      setIsExpanded(false)
    } catch (error) {
      console.error('Failed to save specialties:', error)
    }
  }

  const filteredSpecialties = useMemo(() => {
    return specialtiesData?.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []
  }, [searchQuery, specialtiesData])

  return (
    <div className='bg-white rounded-lg shadow-sm mb-6'>
      <div className='flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 border-b gap-4 md:gap-0'>
        <h2 className='text-xl font-medium'>Specialties</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center'
        >
          {isExpanded ? 'Close' : 'Select Specialties'}
        </button>
      </div>

      {/* Selected specialties display */}
      <div className='p-4 md:p-6'>
        <p className='text-sm text-gray-500 mb-3'>Your teaching expertise areas:</p>
        <div className='flex flex-wrap gap-2'>
        {(specialtiesIns?.tag && specialtiesIns.tag.length > 0 || selectedTagIds.length > 0) ? (
            [...new Set([...specialtiesIns?.tag ?? [], ...selectedTagIds])].map((tagId) => {
              const specialty = specialtiesData?.find((s) => s.id === tagId)
              return (
                <div key={tagId} className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm'>
                  {specialty?.name}
                  <button onClick={() => toggleSpecialty(tagId)} className='ml-2 text-blue-500 hover:text-blue-700'>
                    <X className='w-3 h-3' />
                  </button>
                </div>
              )
            })
          ) : (
            <p className='text-gray-400 italic'>No specialties selected</p>
          )}
        </div>
      </div>

      {/* Specialty selector modal */}
      {isExpanded && (
        <div className='p-4 md:p-6 border-t'>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search specialties...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {filteredSpecialties?.map((specialty) => (
              <div
                key={specialty.id}
                onClick={() => toggleSpecialty(specialty.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center ${
                  selectedTagIds.includes(specialty.id) || specialtiesIns?.tag.includes(specialty.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div
                  className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                    selectedTagIds.includes(specialty.id) || specialtiesIns?.tag.includes(specialty.id)
                      ? 'bg-blue-500'
                      : 'border border-gray-300'
                  }`}
                >
                  {(selectedTagIds.includes(specialty.id) || specialtiesIns?.tag.includes(specialty.id)) && (
                    <Check className='w-3 h-3 text-white' />
                  )}
                </div>
                <span className='text-sm'>{specialty.name}</span>
              </div>
            ))}
          </div>

          <div className='mt-4 flex justify-end'>
            <button
              onClick={handleSave}
              className='px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700'
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpecialtySelector
