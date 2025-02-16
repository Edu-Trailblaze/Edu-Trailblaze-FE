'use client'
import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowUpSLine } from 'react-icons/ri'

interface ModuleBarProps {
  lecture: ILecture
  video: IVideo
}

export default function ModuleVideo({ lecture, video }: ModuleBarProps) {
  const [languageListOpen, setLanguageOpen] = useState(false)
  const toggleList = () => {
    setLanguageOpen((prev) => !prev)
  }

  const languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'ภาษาไทย' },
    { id: 3, name: 'Tiếng Việt' },
    { id: 4, name: '한국어' },
    { id: 5, name: '日本語' },
    { id: 6, name: 'Português' },
    { id: 7, name: 'Română' },
    { id: 8, name: 'Polski' },
    { id: 9, name: 'Türkçe' },
    { id: 10, name: 'Русский' },
    { id: 11, name: 'Français' },
    { id: 12, name: 'Español' },
    { id: 13, name: 'Deutsch' }
  ]

  return (
    <div className='pb-5 container max-w-[1300px]'>
      {/**Video Display */}
          <div className='pl-12 mt-3'>
            <p className='font-semibold text-2xl '>{video.title}</p>
            <video className=' my-5 w-full h-[500px] bg-black' controls>
              <source src={video.videoUrl} type='video/mp4'  ></source>
            </video>
          </div>

          {/**Video summarise */}
          <div className='ml-12 bg-[#F4F4F4] px-[30px] py-[20px] rounded-2xl border-2 border-blue-500'>
            <p>{lecture.content}</p>
          </div>


      {/**Video Options */}
      <div className='ml-12 pt-5 pb-3 flex items-center gap-8 border-b-2 border-b-gray-300'>
        <p>Transcript</p>
        <p>Download</p>
      </div>

      {/**Video transcript example */}
      <div className='flex pt-7 gap-14 justify-center'>
        <p className='w-[600px]'>
          [MUSIC] Hello and welcome to this demonstration on using RegEx Builder in studio, in this video you will be
          creating a workflow that can extract email IDs from a piece of text to display in the Output panel. So let's
          begin, search for an assigned activity in the Activities panel and drag and drop it in the Designer panel,
          rename the sequence as RegEx Builder and add an annotation to it. Rename the assigned activity as message, in
          the two text box, press Control plus K to create a new variable and name it as message. Now navigate to the
          Properties panel of the assigned activity, click the ellipsis icon of the value field to open the expression
          editor window.
          <br />
          <br />
          Enter my name isJoe, my email is, joe@theratemail.com and my father's email is jack@theratemail.com, and my
          uncle's email is j@theratemail.com, in double quotes, click OK.
          <br />
          <br />
          Search for a Matches activity, and drag and drop it below the assigned activity, rename it as email. Click the
          configure regular expression button within the matches activity, in the RegEx Builder wizard, go to the RegEX
          column and select email from the dropdown. In the qualifiers column, select any zero or more from the
          dropdown, it will extract all the email IDs from the text, click save to exit the wizard.
        </p>
        <div>
          <span className='flex  px-2 py-2  hover:bg-blue-200 rounded-sm' onClick={toggleList}>
            <span className='font-semibold'>Transcript language: </span>
            <span className='flex ml-2'>
              English{' '}
              {languageListOpen ? (
                <RiArrowDropDownLine className='text-2xl' />
              ) : (
                <RiArrowUpSLine className='text-2xl' />
              )}
            </span>
          </span>
          {/**Language list open */}
          {languageListOpen && (
            <>
              <div className='border-t-2 border-t-blue-700 py-2'></div>
              <div className='border-2 border-blue-500 py-2 px-2 rounded-md h-[200px] overflow-auto'>
                <ul>
                  {languages.map((language) => (
                    <li className='px-4 hover:bg-blue-200 rounded-sm' key={language.id}>
                      {language.name}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
