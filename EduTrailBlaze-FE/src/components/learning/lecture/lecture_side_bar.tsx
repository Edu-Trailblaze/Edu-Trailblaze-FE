import { FileVideo } from 'lucide-react'
import { BsCheck2 } from 'react-icons/bs'
import { LuTableOfContents } from 'react-icons/lu'
import { RiArrowDropDownLine, RiArrowUpSLine } from 'react-icons/ri'

interface ModuleBarProps {
  course: ICourseFull
  lectures: SectionLecture[]
  video: IVideo[]
  activeLectureId: number | null
  setActiveLectureId: (id: number) => void
  expandedSections: { [key: number]: boolean }
  setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>
}

export default function LectureSideBar({
  course,
  lectures,
  video,
  activeLectureId,
  setActiveLectureId,
  expandedSections,
  setExpandedSections
}: ModuleBarProps) {
  const toggleExpand = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  let lectureCounter = 1
  const processedSections = (course.sectionDetails ?? []).map((section) => {
    const sectionLectures =
      lectures
        .find((lec) => lec.sectionId === section.id)
        ?.lectures.map((item) => ({
          ...item,
          currentIndex: lectureCounter++
        })) || []
    return { ...section, lectures: sectionLectures }
  })

  return (
    <div className='w-[400px] border-r-2 border-gray-200 select-none'>
      <div className='flex pl-3 text-center items-center font-bold py-3 bg-white'>
        <LuTableOfContents className='text-2xl' />
        <h1 className='px-2 text-xl'>Course Content</h1>
      </div>

      {processedSections.map((section) => (
        <div key={section.id}>
          <div
            className='flex bg-gray-100 px-4 py-2 justify-between cursor-pointer items-center'
            onClick={() => toggleExpand(section.id)}
          >
            <div>
              <p className='font-semibold'>{section.title}</p>
              <p className='font-thin text-sm'>
                {section.duration.substring(0, 8)} | 0/{section.lectures.length}
              </p>
            </div>
            <div>
              {expandedSections[section.id] ? (
                <RiArrowUpSLine className='text-3xl' />
              ) : (
                <RiArrowDropDownLine className='text-3xl' />
              )}
            </div>
          </div>

          {expandedSections[section.id] && (
            <div className='bg-white'>
              {section.lectures.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLectureId(item.id)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer ${activeLectureId === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                >
                  <div className='flex items-center gap-2'>
                    <div>
                      <p className={`font-semibold mr-2 ${activeLectureId === item.id ? 'text-blue-600' : ''}`}>
                        {item.currentIndex}. {item.title}
                      </p>
                      <div className='text-sm flex items-center gap-2'>
                        <FileVideo className='' />
                        <span>{item.duration}min</span>
                      </div>
                    </div>
                  </div>
                  <BsCheck2 className='text-2xl text-gray-600' />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
