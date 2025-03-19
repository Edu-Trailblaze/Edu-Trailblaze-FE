import { MoveUp, MoveUpRight, X } from 'lucide-react'
import React from 'react'

interface RatingProps {
  onChangeRating: (value: number | undefined) => void
}

export default function SearchSidebar({ onChangeRating }: RatingProps) {
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)
  const ratings = [
    {
      name: '⭐⭐⭐⭐⭐',
      value: 5
    },
    {
      name: '⭐⭐⭐⭐',
      value: 4
    },
    {
      name: '⭐⭐⭐',
      value: 3
    },
    {
      name: '⭐⭐',
      value: 2
    },
    {
      name: '⭐',
      value: 1
    }
  ]
  const handleChange = (value: number) => {
    const newRating = selectedRating === value ? null : value
    setSelectedRating(newRating)
    onChangeRating(newRating ?? undefined)
  }

  const handleReset = () => {
    setSelectedRating(null)
    onChangeRating(undefined)
  }

  return (
    <div className='w-64 pr-6'>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-bold text-lg text-gray-800'>Rating</h3>
          {selectedRating !== null && (
            <button
              onClick={handleReset}
              className='text-sm text-blue-600 flex items-center hover:text-blue-800 transition-colors duration-200'
            >
              <X size={16} className='mr-1' />
              Reset
            </button>
          )}
        </div>

        <div className='space-y-3'>
          {ratings.map((rating, index) => (
            <div
              key={index}
              onClick={() => handleChange(rating.value)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRating === rating.value
                  ? 'bg-blue-100 border border-blue-300'
                  : 'bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <div className='flex items-center'>
                <div
                  className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                    selectedRating === rating.value ? 'bg-blue-500' : 'border border-gray-300'
                  }`}
                >
                  {selectedRating === rating.value && <div className='w-2 h-2 rounded-full bg-white'></div>}
                </div>
                <span className='text-sm font-medium text-gray-700'>{rating.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The commented out sections are preserved from the original code */}
      {/* <div className='mb-6'>
        <h3 className='font-bold mb-3'>Language</h3>
        <div className='space-y-2'>
          {['English', 'Spanish'].map((lang, i) => (
            <div key={i} className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-3'>Video Duration</h3>
        <div className='space-y-2'>
          {['0-2 Hours', '3-6 Hours', '7+ Hours'].map((duration, i) => (
            <div key={i} className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>{duration}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}
