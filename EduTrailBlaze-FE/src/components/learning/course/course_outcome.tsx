export default function CourseOutcome() {

  return (
    <>
      {/* Certificate */}
      <div className=' flex border-8 shadow-lg shadow-cyan-200/50 p-4 rounded-2xl mb-32 relative w-[1375px]'>
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
