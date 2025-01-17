import ModuleBar from '@/components/course_lectur_compo/module_bar'
import ModuleVideo from '@/components/course_lectur_compo/module_video'
import React from 'react'

export default function CourseLecture() {
  return (
    <div>
        <div className='flex'>
            <ModuleBar/>
            <ModuleVideo/>
        </div>
    </div>
  )
}
