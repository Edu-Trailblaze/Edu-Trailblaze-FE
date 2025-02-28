import Box from '../Box/Box'
import { CircleHelp } from 'lucide-react'
interface InputTextProps {
  label: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: 'text' | 'textarea'
  rows?: number
  subtitle?: string
  required?: boolean
  helperText?: string // Dùng để hiển thị nội dung tooltip động
  iconLeft?: React.ReactNode
}

export default function InputText({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  rows = 4,
  subtitle,
  required,
  helperText,
  iconLeft
}: InputTextProps) {
  return (
    <>
      <label htmlFor={name} className=' text-sm font-medium text-gray-700 flex'>
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

      {/* Input / Textarea */}
      <div className='relative'>
        {iconLeft && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>{iconLeft}</div>
        )}
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            rows={rows}
            onChange={onChange}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
          />
        ) : (
          <input
            id={name}
            name={name}
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-3 ${iconLeft ? 'pl-9' : ''} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
          />
        )}
      </div>

      {/* Subtitle */}
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )
}
