'use client'
interface PaginationProps {
  pageIndex?: number
  pageSize?: number
  totalCount?: number
  totalPages?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
  onPageChange: (page: number) => void //change page function
}

export default function Pagination({
  pageIndex = 1,
  totalPages = 2,
  hasPreviousPage = false,
  hasNextPage = false,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <div className='flex items-center justify-center space-x-2 mt-4'>
      {/* previous button */}
      <button
        onClick={() => onPageChange(pageIndex - 1)}
        disabled={!hasPreviousPage}
        className='px-3 py-1 rounded border disabled:opacity-50'
      >
        {'<'}
      </button>

      {/* List page */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`px-3 py-1 border rounded ${page === pageIndex ? 'bg-blue-500 text-white' : 'bg-white'} `}
        >
          {page}
        </button>
      ))}

      {/* next button */}
      <button
        onClick={() => onPageChange?.(pageIndex + 1)}
        disabled={!hasNextPage}
        className='px-3 py-1 rounded border disabled:opacity-50'
      >
        {'>'}
      </button>
    </div>
  )
}
