import Box from '../Box/Box'
import { CircleHelp } from 'lucide-react'
interface InputTextProps {
  label?: React.ReactNode
  name: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: 'text' | 'textarea'
  rows?: number
  disabled?: boolean
  subtitle?: string
  required?: boolean
  helperText?: string // Dùng để hiển thị nội dung tooltip động
  iconLeft?: React.ReactNode
  variant?: 'default' | 'blue'
  labelClassName?: string
  noLayout?: boolean
}

export default function InputText({
  label,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled,
  type = 'text',
  rows = 4,
  subtitle,
  required,
  helperText,
  iconLeft,
  variant = 'default',
  labelClassName,
  noLayout
}: InputTextProps) {
  const inputClass =
    variant === 'blue'
      ? 'w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      : 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'

  const content = (
    <>
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
            disabled={disabled}
            rows={rows}
            onKeyDown={onKeyDown}
            onChange={onChange}
            className={inputClass}
          />
        ) : (
          <input
            id={name}
            name={name}
            type='text'
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`${inputClass} ${iconLeft ? 'pl-9' : ''}`}
          />
        )}
      </div>

      {/* Subtitle */}
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )

  return noLayout ? content : <Box>{content}</Box>
}
