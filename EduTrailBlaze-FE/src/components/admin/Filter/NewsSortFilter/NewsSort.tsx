import React, { useState, useEffect } from 'react'
import { News } from '@/app/(Admin)/admin_dashboard/Dashboard/news/page'

interface NewsSortProps {
  columns: { label: string; accessor: keyof News }[]
  visibleColumns: Record<keyof News, boolean>
  onApply: (newVisibleColumns: Record<keyof News, boolean>) => void
  onClose: () => void
  onClear: () => void
}

const NewsSort: React.FC<NewsSortProps> = ({ columns, visibleColumns, onApply, onClose, onClear }) => {
  const [tempVisibleColumns, setTempVisibleColumns] = useState(visibleColumns)

  useEffect(() => {
    setTempVisibleColumns(visibleColumns)
  }, [visibleColumns])

  return (
    <div className='absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-60 border z-50'>
      {/* Header */}
      <div className='flex justify-between items-center border-b pb-2 mb-3'>
        <button onClick={onClear} className='text-sm text-gray-600 px-2 py-1 border rounded-md hover:bg-gray-100'>
          Clear
        </button>
        <h4 className='font-semibold text-gray-700'>Sort</h4>
        <button
          onClick={() => {
            onApply(tempVisibleColumns)
            // onClose()
          }}
          className='text-sm bg-black text-white px-3 py-1 rounded-md'
        >
          Done
        </button>
      </div>

      {/* Filter List */}
      <div className='space-y-2'>
        {columns.map((field) => (
          <label key={field.accessor} className='flex items-center space-x-2 text-gray-800'>
            <input
              type='checkbox'
              checked={tempVisibleColumns[field.accessor]}
              onChange={() =>
                setTempVisibleColumns((prev) => ({
                  ...prev,
                  [field.accessor]: !prev[field.accessor]
                }))
              }
              className='w-4 h-4'
            />
            <span>{field.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default NewsSort
