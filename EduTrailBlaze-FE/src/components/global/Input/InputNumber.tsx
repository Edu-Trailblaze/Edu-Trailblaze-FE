import React from 'react'
import Box from '../Box/Box'

interface InputNumberProps {
  label: React.ReactNode
  name: string
  placeholder?: string
  value?: number | null
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  prefix?: string
  suffix?: string
  min?: number
  max?: number
  subtitle?: string
  required?: boolean
  noLayout?: boolean
}

export default function InputNumber({
  label,
  name,
  placeholder,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  subtitle,
  required,
  noLayout
}: InputNumberProps) {
  const content = (
    <>
      <label htmlFor={name} className='flex text-sm font-medium texgray-700 mb-1'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative rounded-md shadow-sm'>
        {prefix && (
          <div className='absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none'>
            <span className='text-gray-500 sm:text-sm'>{prefix}</span>
          </div>
        )}
        <input
          id={name}
          name={name}
          type='number'
          placeholder={placeholder}
          value={value !== undefined && value !== null ? value : ''}
          onChange={onChange}
          min={min}
          max={max}
          className={`p-3 ${prefix ? 'pl-12' : ''} block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
        />
        {suffix && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <span className='text-gray-500 sm:text-sm'>{suffix}</span>
          </div>
        )}
      </div>
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )
  return noLayout ? content : <Box>{content}</Box>
}
