'use client'
import React, { useState } from 'react'

export default function FormHeader() {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <>
      <div className='p-6 bg-blue-600 text-white'>
        <h1 className='text-2xl font-bold'>Create New Course</h1>
        <p className='text-blue-100 mt-1'>Fill in the details below to create your course</p>
      </div>
      <div className='flex border-b border-gray-200'>
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-4 px-6 text-center text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ${
            activeTab === 'details'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Course Details
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-4 px-6 text-center text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ${
            activeTab === 'sections'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Sections & Lectures
        </button>
      </div>
    </>
  )
}
