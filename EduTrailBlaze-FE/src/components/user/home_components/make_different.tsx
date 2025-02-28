'use client'

import React from 'react'

export default function MakeDiffer() {
  return (
    <div className='px-[100px] py-[70px]'>
      <div className='flex justify-center'>
        <h1 className='font-bold text-4xl'>WHAT MAKE US DIFFERENT</h1>
      </div>
      <div className='flex justify-evenly pt-28'>
        <div className='text-center'>
          <img src='/assets/logos/personalized_learning.png' alt='' className='rounded-[50%] h-[180px] ml-[60px]'></img>
          <h1 className='text-xl font-semibold mt-2 mb-7'>Personalized learning</h1>
          <p className='w-[300px]'>
            Students practice at their own pace, first filling in gaps in their understanding and then accelerating
            their learning.
          </p>
        </div>
        <div className='text-center'>
          <img src='/assets/logos/trusted_content.png' alt='' className='rounded-[50%] h-[180px] ml-[60px]'></img>
          <h1 className='text-xl font-semibold mt-2 mb-7'>Trusted content</h1>
          <p className='w-[300px]'>
            Created by experts, EduTrailBlaze’s library of trusted practice and lessons covers math, science, and more.
            Always free for learners and teachers.
          </p>
        </div>
        <div className='text-center'>
          <img src='/assets/logos/tool_teacher.avif' alt='' className='rounded-[50%] h-[180px] ml-[60px]'></img>
          <h1 className='text-xl font-semibold mt-2 mb-7'>Tools to empower teachers</h1>
          <p className='w-[300px]'>
            With EduTrailBlaze, teachers can identify gaps in their students’ understanding, tailor instruction, and
            meet the needs of every student.
          </p>
        </div>
      </div>
    </div>
  )
}
