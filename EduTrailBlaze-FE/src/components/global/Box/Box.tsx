interface BoxProps {
  children: React.ReactNode
  className?: string
}

export default function Box({ children, className }: BoxProps) {
  return <div className={`bg-white rounded-lg p-6 border border-gray-200 ${className}`}>{children}</div>
}
