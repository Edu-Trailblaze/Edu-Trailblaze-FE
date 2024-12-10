'use client';
import { useState } from 'react';

export default function CourseDetails() {
  const [selected, setSelected] = useState<string>('About');
  const items = ['About', 'Outcomes', 'Courses', 'Testimonials'];

  const handleClick = (items: string) => {
    setSelected(items);
  };

  return (
    <div className='container mt-8 mb-10 '>
      <ul className='flex gap-10 w-[900px] border-b-2'>
        {items.map((option) => (
          <li key={option}>
            <button
              onClick={() => handleClick(option)}
              className={`${
                selected === option ? 'text-blue-500 bg-blue-100' : ''
              } px-4 py-2 rounded-lg mb-2`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
