export default function CourseOutcome() {
  const items = [
    {
      id: 1,
      text: 'Learn in-demand skills from university and industry experts'
    },
    { id: 2, text: 'Master a subject or tool with hands-on projects' },
    { id: 3, text: 'Develop a deep understanding of key concepts' },
    {
      id: 4,
      text: 'Earn a career certificate from California Institute of the Arts'
    }
  ]

  return (
    <>
      {/* Text */}
      <div className='container mb-32 flex relative '>
        <div className='w-[1375px]'>
          <p className='mb-3 text-3xl font-semibold'>Advance your subject-matter expertise</p>
          <ul className='ml-7'>
            {items.map((item) => (
              <li key={item.id} className='list-disc mb-3'>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className='absolute right-[90px]'>
          <img src='/assets/logos/pp_study.png' alt='study' className='rounded-md' />
        </div>
      </div>

      {/* Certificate */}
      <div className='container flex border-8 shadow-lg shadow-cyan-200/50 p-4 rounded-2xl mb-32 relative w-[1375px]'>
        <div>
          <p className='text-3xl font-semibold mb-7'>Earn a career certificate</p>
          <p className='mb-2'>Add this credential to your LinkedIn profile, resume, or CV</p>
          <p>Share it on social media and in your performance review</p>
        </div>
        <div className='flex justify-center items-center h-full w-[600px] rounded-r-md bg-slate-400 absolute top-1/2 right-0 transform -translate-y-1/2'>
          <img src='/assets/logos/certificate.jpg' alt='certificate' className='w-[400px] h-[400px] object-contain' />
        </div>
      </div>
    </>
  )
}
