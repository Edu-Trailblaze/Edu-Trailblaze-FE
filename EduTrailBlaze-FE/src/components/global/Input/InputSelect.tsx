import React from 'react'
import Box from '../Box/Box'

interface Option {
  label: string
  value: string
}

interface InputSelectProps {
  label?: React.ReactNode
  name: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
  required?: boolean
  subtitle?: string
  noLayout?: boolean
}

export default function InputSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  subtitle,
  noLayout
}: InputSelectProps) {
  const content = (
    <>
      {/* Label */}
      <label htmlFor={name} className='text-sm font-medium text-gray-700 flex'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>

      {/* Select box */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Subtitle / error message */}
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )

  return noLayout ? content : <Box>{content}</Box>
}
