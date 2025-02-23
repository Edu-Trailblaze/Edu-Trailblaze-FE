import React from 'react'

interface LoaderProps {
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return <div className={`border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin ${className}`} />
}

export default Loader
