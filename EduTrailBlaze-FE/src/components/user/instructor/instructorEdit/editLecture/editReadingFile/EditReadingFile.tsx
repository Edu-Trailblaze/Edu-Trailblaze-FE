import Button from '@/components/global/Button/Button'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

export default function EditReadingFile() {
  const [readingFileInfo, setReadingFileInfo] = useState<{
    name: string
    size: number
    type: string
    url: string
  } | null>(null)

  const handleReadingFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileURL = URL.createObjectURL(file)

    setReadingFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileURL
    })
  }

  const handleRemoveFile = () => {
    if (readingFileInfo?.url) {
      URL.revokeObjectURL(readingFileInfo.url) // Giải phóng bộ nhớ
    }
    setReadingFileInfo(null)
  }
  return (
    <>
      <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
        <div className='flex items-center mb-6'>
          <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-800'>Reading Information</h3>
        </div>

        <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
          <div className='sm:col-span-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Document</label>
            <div className='mt-1'>
              <div className='flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                <div className='space-y-1 text-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <div className='flex text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none'
                    >
                      <span>Upload your file</span>
                      <input
                        onChange={handleReadingFileUpload}
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        accept='.pdf,.doc,.docx'
                        className='sr-only'
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>maximum 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className='sm:col-span-6'>
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='flex items-center'>
                <div className='flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-red-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                {readingFileInfo && (
                  <div className='ml-4 flex-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium'>{readingFileInfo?.name}</h3>
                      <div className='flex items-center space-x-2'>
                        <button onClick={handleRemoveFile} type='button' className='text-gray-400 hover:text-red-500'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='mt-1 text-sm text-gray-500'>{readingFileInfo?.size} B</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end gap-3 mt-8'>
          <Button variant='indigo'>
            <Check />
            Save changes
          </Button>
        </div>
      </div>
    </>
  )
}
