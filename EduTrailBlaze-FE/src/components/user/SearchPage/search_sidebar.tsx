import { ChevronDown, X } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

interface RatingProps {
  onChangeRating: (value: number | undefined) => void
}

export default function SearchSidebar({ onChangeRating }: RatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const ratings = [
    { value: 5, label: '5 stars and above' },
    { value: 4, label: '4 stars and above' },
    { value: 3, label: '3 stars and above' },
    { value: 2, label: '2 stars and above' },
    { value: 1, label: '1 star and above' }
  ]

  const handleChange = (value: number) => {
    setSelectedRating(value)
    onChangeRating(value)
    setIsOpen(false)
  }

  const handleReset = () => {
    setSelectedRating(null)
    onChangeRating(undefined)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Generate star display
  const renderStars = (count: number) => {
    return (
      <div className='flex items-center'>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className='text-yellow-400'>
            ★
          </span>
        ))}
        {Array.from({ length: 5 - count }).map((_, i) => (
          <span key={i} className='text-gray-300'>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className='w-64 pr-6'>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-bold text-lg text-gray-800'>Min Rating</h3>
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

        <div className='relative' ref={dropdownRef}>
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='w-full p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors duration-200'
          >
            <div className='flex items-center'>
              {selectedRating ? (
                <>
                  {renderStars(selectedRating)}
                  <span className='ml-2 text-sm text-gray-700'>{selectedRating}+ stars</span>
                </>
              ) : (
                <span className='text-sm text-gray-500'>Select minimum rating</span>
              )}
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className='absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
              {ratings.map((rating) => (
                <div
                  key={rating.value}
                  onClick={() => handleChange(rating.value)}
                  className={`flex items-center p-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${
                    selectedRating === rating.value ? 'bg-blue-50' : ''
                  }`}
                >
                  {renderStars(rating.value)}
                  <span className='ml-2 text-sm text-gray-700'>{rating.label}</span>
                </div>
              ))}
            </div>
          )}
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
