import { ChevronDownIcon, CircleHelp } from 'lucide-react'
import Box from '../Box/Box'

interface SelectFieldProps {
  label: string
  name: string
  options: string[]
  value?: string
  helperText?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  subtitle?: React.ReactNode
  required?: boolean
  noLayout?: boolean
  tip?: string
}

export default function SelectField({
  label,
  name,
  options,
  value,
  helperText,
  onChange,
  subtitle,
  required,
  noLayout
}: SelectFieldProps) {
  const content = (
    <>
      <label htmlFor={name} className=' text-sm font-medium text-gray-500 flex'>
        {label} {required && <span className='text-red-500'>*</span>}
        {helperText && (
          <span className='ml-1 group relative'>
            <CircleHelp className='h-4 w-4 text-gray-400' />
            <span className='hidden group-hover:block absolute z-10 top-6 -left-2 w-64 p-2 bg-black text-white text-xs rounded shadow-lg'>
              {helperText}
            </span>
          </span>
        )}
      </label>
      <div className='relative'>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className='p-3 block w-full border border-gray-300 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200'
        >
          {options.map((options) => (
            <option key={options} value={options}>
              {options}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
          <ChevronDownIcon className='w-5 h-5' />
        </div>
      </div>
      <p className='mt-1 text-xs text-gray-500'>{subtitle}</p>
    </>
  )
  return noLayout ? content : <Box>{content}</Box>
}
