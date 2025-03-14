'use client'
import React, { useState } from 'react'

export default function CourseDetails() {
  const items = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'review', title: 'Review' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  return (
    <div className='flex space-x-6 py-4 mt-3'>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={`px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500`}>
          {item.title}
        </a>
      ))}
    </div>
  )
}
