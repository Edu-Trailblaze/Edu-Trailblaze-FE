import React from 'react'
import Box from '../Box/Box'
import { CircleHelp } from 'lucide-react'

interface InputDateProps {
  label?: React.ReactNode
  name: string
  placeholder?: string
  value?: string // Thường là 'YYYY-MM-DD' nếu type='date'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  subtitle?: string
  required?: boolean
  helperText?: string // Tooltip nội dung
  iconLeft?: React.ReactNode
  variant?: 'default' | 'blue'
  labelClassName?: string
  noLayout?: boolean
  min?: string // Giới hạn min date (VD: "2025-01-01")
  max?: string // Giới hạn max date
}

export default function InputDate({
  label,
  name,
  placeholder,
  value,
  onChange,
  subtitle,
  required,
  helperText,
  iconLeft,
  variant = 'default',
  labelClassName,
  noLayout,
  min,
  max
}: InputDateProps) {
  // Áp dụng style giống InputText
  const inputClass =
    variant === 'blue'
      ? 'w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      : 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'

  // Giao diện (không layout)
  const content = (
    <>
      {/* Label */}
      <label htmlFor={name} className={`text-sm font-medium text-gray-700 flex ${labelClassName}`}>
        {label} {required && <span className='text-red-500'>*</span>}{' '}
        {helperText && (
          <span className='ml-1 group relative'>
            <CircleHelp className='h-4 w-4 text-gray-400' />
            <span className='hidden group-hover:block absolute z-10 top-6 -left-2 w-64 p-2 bg-black text-white text-xs rounded shadow-lg'>
              {helperText}
            </span>
          </span>
        )}
      </label>

      {/* Ô input type='date' */}
      <div className='relative'>
        {iconLeft && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>{iconLeft}</div>
        )}
        <input
          id={name}
          name={name}
          type='date'
          placeholder={placeholder}
          value={value || ''} // rỗng nếu undefined
          onChange={onChange}
          min={min}
          max={max}
          className={`${inputClass} ${iconLeft ? 'pl-9' : ''}`}
        />
      </div>

      {/* Subtitle */}
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )

  // Nếu noLayout = true, trả về nội dung trực tiếp, nếu không bọc trong <Box>
  return noLayout ? content : <Box>{content}</Box>
}
