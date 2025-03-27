import React, { useMemo } from 'react'

interface DateFilterProps {
  fromDate: string
  toDate: string
  onChange: (newValues: { fromDate?: string; toDate?: string }) => void
  onReset?: () => void
  onApply: () => void
}

const DateFilter: React.FC<DateFilterProps> = ({ fromDate, toDate, onChange, onReset, onApply }) => {
  // Kiểm tra valid: nếu cả fromDate và toDate đều có giá trị, thì fromDate phải <= toDate
  const isDateValid = useMemo(() => {
    if (fromDate && toDate) {   
      return new Date(fromDate) <= new Date(toDate)
    }
    return true
  }, [fromDate, toDate])

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-86 border z-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-700">Date Range</h4>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-teal-600"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onChange({ fromDate: e.target.value })}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => onChange({ toDate: e.target.value })}
          className="border p-2 rounded-md w-full"
        />
      </div>
      {!isDateValid && (
        <p className="text-xs text-red-500 mt-1">
          From date must be earlier than or equal to To date.
        </p>
      )}
      <div className="flex justify-end mt-3">
        <button
          onClick={() => {
            if (isDateValid) {
              onApply()
            }
          }}
          disabled={!isDateValid}
          className={`text-sm px-3 py-1 rounded-md ${isDateValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default DateFilter
