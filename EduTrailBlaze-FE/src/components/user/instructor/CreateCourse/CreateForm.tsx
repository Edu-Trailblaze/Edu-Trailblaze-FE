'use client'
import { useState } from 'react'
import FormHeader from './FormHeader'
import FormBody from './FormBody'

export default function CreateForm() {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className='min-h-screen bg-blue-50'>
      <main className='container  py-10 px-6 sm:px-6 lg:px-40'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden mb-6'>
          <FormHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <FormBody activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  )
}
