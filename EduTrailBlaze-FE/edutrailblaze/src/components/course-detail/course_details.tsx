'use client';
import { useState } from 'react';

export default function CourseDetails() {
  const [selected, setSelected] = useState<string>('About');

  const handleClick = (items: string) => {
    setSelected(items);
  };

  return (
    <div className='container mt-8 mb-10 '>
      <ul className='flex gap-10 w-[900px] border-b-2'>
        <li>
          <button
            onClick={() => handleClick('About')}
            className={`${
              selected === 'About' ? 'text-blue-500 bg-blue-100' : ''
            } px-4 py-2 rounded-lg mb-2`}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick('Outcomes')}
            className={`${
              selected === 'Outcomes' ? 'text-blue-500 bg-blue-100' : ''
            } px-4 py-2 rounded-lg`}
          >
            Outcomes
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick('Courses')}
            className={`${
              selected === 'Courses' ? 'text-blue-500 bg-blue-100' : ''
            } px-4 py-2 rounded-lg`}
          >
            Courses
          </button>
        </li>
        <li>
          <button
            onClick={() => handleClick('Testimonials')}
            className={`${
              selected === 'Testimonials' ? 'text-blue-500 bg-blue-100' : ''
            } px-4 py-2 rounded-lg`}
          >
            Testimonials
          </button>
        </li>
      </ul>
    </div>
  );
}
