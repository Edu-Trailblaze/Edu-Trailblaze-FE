import './css/course_header.css';

export default function CourseHeader() {
  return (
    <>
      {/* Course Information Section */}
      <div className='relative pb-12 mb-20'>
        <div className='bg-[rgb(205,228,242)] mt-14 pb-24'>
          <div className='container grid grid-cols-12'>
            {/* Left Section */}
            <div className='col-span-7 mt-10'>
              <div className='space-y-5'>
                <img
                  alt='Google Logo'
                  src='/assets/logos/google_logo.png'
                  className='w-52 mb-5'
                />
                <h1 className='text-6xl font-semibold'>
                  Google Data Analysis Professional Certificate
                </h1>
                <p className='mt-5'>
                  Discover a world of knowledge and innovation at EduTrailBlaze.
                  Whether you're a student eager to learn or a teacher seeking
                  to inspire, our platform offers a diverse range of courses,
                  tools, and resources to support your educational journey. Join
                  us and ignite your passion for learning.
                </p>
                <div className='flex items-center space-x-2 mt-3'>
                  <img
                    alt='Small Google Logo'
                    src='/assets/logos/small_google_logo.png'
                    className='w-10'
                  />
                  <p className='flex items-center'>
                    Instructor:{" "}
                    <a href='' className='underline text-blue-600 ml-2'>
                       Google Career Certificates
                    </a>
                  </p>
                </div>
                <button className='bg-blue-700 text-white py-2 px-5 w-60 mt-3 rounded-md hover:bg-blue-600'>
                  Register for free
                  <p className='text-sm'>Starts Dec 2</p>
                </button>
                <div className='mt-3'>
                  <span className='font-bold'>2,457,865 </span>
                  <span>already registered</span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className='col-span-4 flex justify-center'>
              <img
                alt='ETB Logo'
                src='/assets/logos/ETB_Logo.png'
                className='w-[600px] pt-24 object-contain'
              />
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className='container flex items-center space-x-4 shadow-xl pl-10 rounded-md absolute bg-slate-50 h-[120px] bottom-[-8px] left-0 right-0'>
          <div className='flex-1 relative'>
            <p className='font-semibold underline'>5 course Services</p>
            <p className='text-gray-500'>Get in-depth knowledge of a subject</p>
            <span className='vertical-divider'></span>
          </div>
          <div className='flex-1 relative'>
            <p>4.7 Stars</p>
            <p className='text-gray-500'>(2,629 reviews)</p>
            <span className='vertical-divider'></span>
          </div>
          <div className='flex-1 relative'>
            <p>Beginner level</p>
            <p className='text-gray-500'>No prior experience required</p>
            <span className='vertical-divider'></span>
          </div>
          <div className='flex-1 relative'>
            <p>1 month</p>
            <p className='text-gray-500'>at 10 hours a week</p>
            <span className='vertical-divider'></span>
          </div>
          <div className='flex-1'>
            <p>Flexible schedule</p>
            <p className='text-gray-500'>Learn at your own pace</p>
          </div>
        </div>
      </div>
    </>
  );
}
