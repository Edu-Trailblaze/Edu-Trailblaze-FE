'use client'
import React, { useState } from 'react'
interface CourseDetailsProps {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}
export default function CourseDetails({selected, setSelected}: CourseDetailsProps) {

  const items = [
    { id: 'about', title: 'About' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'courses', title: 'Courses' },
    { id: 'suggestion', title: 'Suggestion Courses' }
  ]

  const handleClick = (id: string) => {
    setSelected(id)
  }

  return (
    <div className='container flex space-x-6 py-4'>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => handleClick(item.id)}
          className={`px-4 py-2 rounded-lg ${
            selected === item.id ? 'text-blue-500 bg-blue-100' : ''
          } hover:bg-blue-100 hover:text-blue-500`}
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}
