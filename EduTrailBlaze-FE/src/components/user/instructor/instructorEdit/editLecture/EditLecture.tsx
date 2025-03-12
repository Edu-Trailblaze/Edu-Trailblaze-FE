import React from 'react'
import Head from 'next/head'

export default function EditLecture() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <Head>
        <title>Edit Lecture | EduTrailBlaze</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex'>
        {/* Main content */}
        <main className='flex-1 ml-0 md:ml-14 pb-12'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8'>
            {/* Header */}
            <div className='mb-8'>
              <div className='flex items-center'>
                <button type='button' className='mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <div>
                  <h1 className='text-3xl font-bold text-indigo-900'>Chỉnh sửa bài giảng</h1>
                  <p className='mt-2 text-gray-600'>Cập nhật nội dung và thông tin bài giảng của bạn</p>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className='bg-white shadow-xl rounded-xl mb-8 overflow-hidden border border-gray-100'>
              {/* Form Header */}
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
                <h2 className='text-xl font-semibold text-white'>Thông tin bài giảng</h2>
                <p className='text-purple-100 mt-1'>Chỉnh sửa chi tiết và tài nguyên bài giảng</p>
              </div>

              <div className='p-8'>
                <form>
                  <div className='space-y-8'>
                    {/* Basic Lecture Information */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Thông tin cơ bản</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                            Tiêu đề bài giảng
                          </label>
                          <div className='relative'>
                            <input
                              type='text'
                              name='title'
                              id='title'
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Nhập tiêu đề bài giảng'
                            />
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='lectureType' className='block text-sm font-medium text-gray-700 mb-1'>
                            Loại bài giảng
                          </label>
                          <div className='relative'>
                            <select
                              id='lectureType'
                              name='lectureType'
                              className='appearance-none shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150 pr-10'
                            >
                              <option value='Video'>Video</option>
                              <option value='Reading'>Reading</option>
                              <option value='Quiz'>Quiz</option>
                            </select>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                              <svg
                                className='h-5 w-5 text-gray-400'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='duration' className='block text-sm font-medium text-gray-700 mb-1'>
                            Thời lượng (phút)
                          </label>
                          <div className='mt-1 relative rounded-lg shadow-sm'>
                            <input
                              type='number'
                              name='duration'
                              id='duration'
                              className='focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='0'
                              min='0'
                            />
                            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                              <span className='text-gray-500 sm:text-sm'>phút</span>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                            Mô tả
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='description'
                              name='description'
                              rows={3}
                              className='shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Mô tả ngắn gọn về nội dung bài giảng...'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Type Content */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Nội dung Video</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label htmlFor='videoUrl' className='block text-sm font-medium text-gray-700 mb-1'>
                            URL Video
                          </label>
                          <div className='mt-1 flex rounded-lg shadow-sm'>
                            <input
                              type='text'
                              name='videoUrl'
                              id='videoUrl'
                              className='focus:ring-red-500 focus:border-red-500 flex-grow block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='https://example.com/video.mp4'
                            />
                            <button
                              type='button'
                              className='ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            >
                              Duyệt
                            </button>
                          </div>
                          <p className='mt-2 text-xs text-gray-500'>Hỗ trợ YouTube, Vimeo, hoặc URL video trực tiếp</p>
                        </div>

                        <div className='sm:col-span-6'>
                          <div className='bg-gray-100 rounded-lg p-4 mb-4'>
                            <div className='aspect-w-16 aspect-h-9 bg-black rounded-md flex items-center justify-center'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-20 w-20 text-gray-400'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={1}
                                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={1}
                                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>
                            </div>
                            <div className='mt-2 text-center text-sm text-gray-500'>Nhập URL video để xem trước</div>
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='transcript' className='block text-sm font-medium text-gray-700 mb-1'>
                            Bản ghi lời (Transcript)
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='transcript'
                              name='transcript'
                              rows={8}
                              className='shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3 border transition duration-150'
                              placeholder='Nhập nội dung ghi chép cho video bài giảng...'
                            />
                          </div>
                          <div className='mt-2 flex justify-between'>
                            <span className='text-xs text-gray-500'>
                              Cung cấp bản ghi lời sẽ giúp học viên dễ dàng tiếp cận nội dung
                            </span>
                            <div>
                              <button
                                type='button'
                                className='inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-4 w-4 mr-1'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                                Tải bản ghi lời
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reading Type Content */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hidden'>
                      <div className='flex items-center mb-6'>
                        <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
                          </svg>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>Nội dung đọc</h3>
                      </div>

                      <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6'>
                        <div className='sm:col-span-6'>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>Tài liệu PDF</label>
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
                                    <span>Tải tệp lên</span>
                                    <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                                  </label>
                                  <p className='pl-1'>hoặc kéo và thả</p>
                                </div>
                                <p className='text-xs text-gray-500'>PDF tối đa 10MB</p>
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
                              <div className='ml-4 flex-1'>
                                <div className='flex items-center justify-between'>
                                  <h3 className='text-sm font-medium'>lecture-material.pdf</h3>
                                  <div className='flex items-center space-x-2'>
                                    <button type='button' className='text-gray-400 hover:text-gray-500'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                      >
                                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                                      </svg>
                                    </button>
                                    <button type='button' className='text-gray-400 hover:text-red-500'>
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
                                <div className='mt-1 text-sm text-gray-500'>2.4 MB · Đã tải lên 2 giờ trước</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='sm:col-span-6'>
                          <label htmlFor='content' className='block text-sm font-medium text-gray-700 mb-1'>
                            Nội dung trực tuyến (tùy chọn)
                          </label>
                          <div className='mt-1'>
                            <div className='border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500'>
                              <div className='border-b bg-white px-4 py-2 flex'>
                                <button type='button' className='p-1 text-gray-400 hover:text-gray-600'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                                <button type='button' className='p-1 text-gray-400 hover:text-gray-600'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                                <button type='button' className='p-1 text-gray-400 hover:text-gray-600'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                                <button type='button' className='p-1 text-gray-400 hover:text-gray-600'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3 3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3 3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3 3 3 0 00-3 3v4a5 5 0 0010 0V7a3 3 0 00-3-3H8z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                              </div>
                              <textarea
                                id='content'
                                name='content'
                                rows={10}
                                className='block w-full border-0 p-3 focus:ring-0 sm:text-sm'
                                placeholder='Nhập nội dung đọc trực tuyến ở đây. Hỗ trợ định dạng markdown...'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Type Content */}
                    <div className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hidden'>
                      <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                          <div className='w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                          <h3 className='text-lg font-semibold text-gray-800'>Bài kiểm tra</h3>
                        </div>
                        <button
                          type='button'
                          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Thêm câu hỏi
                        </button>
                      </div>

                      {/* Quiz Settings */}
                      <div className='mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
                        <h4 className='text-sm font-medium text-yellow-800 mb-2'>Cài đặt bài kiểm tra</h4>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                          <div>
                            <label className='flex items-center'>
                              <input
                                type='checkbox'
                                className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
                              />
                              <span className='ml-2 text-sm text-gray-700'>Thời gian giới hạn</span>
                            </label>
                          </div>
                          <div>
                            <label className='flex items-center'>
                              <input
                                type='checkbox'
                                className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
                              />
                              <span className='ml-2 text-sm text-gray-700'>Hiển thị đáp án</span>
                            </label>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
