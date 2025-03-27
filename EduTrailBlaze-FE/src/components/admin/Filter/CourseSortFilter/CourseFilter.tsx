import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'

interface CourseFilterProps {
  onClose: () => void
  onClear: () => void
  onFilterApply: () => void
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onClose, onClear, onFilterApply }) => {
  const dispatch = useDispatch()
  const { fromDate, toDate } = useSelector((state: RootState) => state.filter)

  // Kiểm tra valid: nếu cả hai có giá trị, thì fromDate phải nhỏ hơn hoặc bằng toDate
  const isDateValid = useMemo(() => {
    if (fromDate && toDate) {
      return new Date(fromDate) <= new Date(toDate)
    }
    return true
  }, [fromDate, toDate])

  const applyFilters = () => {
    if (!isDateValid) return
    onFilterApply()
    onClose()
  }

  return (
    <div className='absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-86 border z-50'>
      {/* Header */}
      <div className='flex justify-between items-center border-b pb-2 mb-3'>
        <button
          onClick={() => {
            dispatch(clearFilter())
            onClear()
          }}
          className='text-sm text-gray-600 px-2 py-1 border rounded-md hover:bg-gray-100'
        >
          Clear
        </button>
        <h4 className='font-semibold text-gray-700'>Filters</h4>
        <button
          onClick={applyFilters}
          className={`text-sm px-3 py-1 rounded-md ${isDateValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          disabled={!isDateValid}
        >
          Done
        </button>
      </div>

      {/* Filter List */}
      <div className='space-y-2'>
        {/* Date Range */}
        <div className='mb-4'>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium text-gray-700'>Date range</span>
            <button
              onClick={() => {
                // Reset chỉ date range
                dispatch(setFilter({ fromDate: '', toDate: '' }))
              }}
              className='text-sm text-teal-600'
            >
              Reset
            </button>
          </div>
          <div className='flex space-x-2 mt-1'>
            <input
              type='date'
              value={fromDate}
              onChange={(e) =>
                dispatch(
                  setFilter({
                    fromDate: e.target.value,
                    toDate
                  })
                )
              }
              className='border p-2 rounded-md w-full'
            />
            <input
              type='date'
              value={toDate}
              onChange={(e) =>
                dispatch(
                  setFilter({
                    fromDate,
                    toDate: e.target.value
                  })
                )
              }
              className='border p-2 rounded-md w-full'
            />
          </div>
          {!isDateValid && (
            <p className='text-xs text-red-500 mt-1'>From date must be earlier than or equal to To date.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseFilter
