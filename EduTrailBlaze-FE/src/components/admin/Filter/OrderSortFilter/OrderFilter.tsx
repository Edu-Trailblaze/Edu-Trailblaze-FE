import React from 'react'
import { Search } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setFilter, clearFilter } from '@/redux/slice/filter.slice'

interface OrderFilterProps {
  onClose: () => void
  onClear: () => void
  onFilterApply: () => void // Giờ onFilterApply không cần tham số
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onClose, onClear, onFilterApply }) => {
  const dispatch = useDispatch()
  const { fromDate, toDate, keyword } = useSelector((state: RootState) => state.filter)

  const applyFilters = () => {
    // Thay vì onFilterApply(filters), ta chỉ gọi onFilterApply()
    // vì toàn bộ filter đã nằm trong Redux
    onFilterApply()
    onClose()
  }

  return (
    <div className='absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-86 border z-50'>
      {/* Header */}
      <div className='flex justify-between items-center border-b pb-2 mb-3'>
        <button
          onClick={() => {
            dispatch(clearFilter()) // reset Redux slice
            onClear() // onClear ở cha => setOrder(allOrder)
          }}
          className='text-sm text-gray-600 px-2 py-1 border rounded-md hover:bg-gray-100'
        >
          Clear
        </button>
        <h4 className='font-semibold text-gray-700'>Filters</h4>
        <button onClick={applyFilters} className='text-sm bg-black text-white px-3 py-1 rounded-md'>
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
                // Reset only fromDate, toDate trong Redux
                dispatch(setFilter({ fromDate: '', toDate: '', keyword }))
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
                    toDate,
                    keyword
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
                    toDate: e.target.value,
                    keyword
                  })
                )
              }
              className='border p-2 rounded-md w-full'
            />
          </div>
        </div>

        {/* Keyword Search */}
        <div className='mb-4'>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium text-gray-700'>Keyword search</span>
            <button
              onClick={() => dispatch(setFilter({ fromDate, toDate, keyword: '' }))}
              className='text-sm text-teal-600'
            >
              Reset
            </button>
          </div>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
            <input
              type='text'
              placeholder='Search...'
              value={keyword}
              onChange={(e) =>
                dispatch(
                  setFilter({
                    fromDate,
                    toDate,
                    keyword: e.target.value
                  })
                )
              }
              className='border p-2 rounded-md w-full pl-8'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderFilter
