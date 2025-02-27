import React from 'react'
import FormHeader from './FormHeader'
import FormBody from './FormBody'

export default function CreateForm() {
  return (
    <div className='min-h-screen bg-blue-50'>
      <main className='container mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <FormHeader />
          <FormBody />
        </div>
      </main>
    </div>
  )
}
