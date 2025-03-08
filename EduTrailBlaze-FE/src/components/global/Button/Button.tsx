import { cn } from '@/lib/utils' // Nếu bạn không có, có thể xóa hoặc dùng `clsx`
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'Blue' | 'Red' | 'Green' | 'DarkBlue'
  size?: 'sm' | 'md' | 'ml' | 'lg' | 'sd' | 'xl'
  isLoading?: boolean
  icon?: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    Blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    Red: 'bg-red-100 text-red-600 hover:bg-red-200',
    Green: 'bg-green-600 focus:ring-green-500 hover:bg-green-700 text-white',
    DarkBlue: 'bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-medium text-lg'
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    sd: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-sm',
    ml: 'px-5 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'py-4 w-40 text-base'
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className='animate-spin h-5 w-5 mr-2' /> : icon && <span className='mr-2'>{icon}</span>}
      {children}
    </button>
  )
}
