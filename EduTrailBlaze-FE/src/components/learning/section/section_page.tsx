import React from 'react'
import SectionHeader from './items/section_header'
import SectionDetail from './items/section_detail'
import SectionAbout from './items/section_about'
import SectionOutcome from './items/section_outcome'
import SectionModule from './items/section_module'
import CourseSuggestion from '../course_suggestion'

export default function SectionPage() {
  return (
    <div className=''>
      <SectionHeader/>
      <SectionDetail/>
      <SectionAbout/>
      <SectionOutcome/>
      <SectionModule/>
      <CourseSuggestion/>
    </div>
  )
}
