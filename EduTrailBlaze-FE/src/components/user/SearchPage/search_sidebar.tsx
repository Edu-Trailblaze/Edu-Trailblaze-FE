import React from 'react'

export default function SearchSidebar() {
  return (
    <div className='w-64 pr-6'>
      <div className='mb-6'>
        <h3 className='font-bold mb-3'>Settings</h3>
        <div className='space-y-2'>
          {['⭐⭐⭐⭐⭐ 4.5 & up', '⭐⭐⭐⭐ 4.0 & up', '⭐⭐⭐ 3.5 & up'].map((rating, i) => (
            <div key={i} className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>{rating}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-3'>Language</h3>
        <div className='space-y-2'>
          {['English', 'Spanish'].map((lang, i) => (
            <div key={i} className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold mb-3'>Video Duration</h3>
        <div className='space-y-2'>
          {['0-2 Hours', '3-6 Hours', '7+ Hours'].map((duration, i) => (
            <div key={i} className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-sm'>{duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
