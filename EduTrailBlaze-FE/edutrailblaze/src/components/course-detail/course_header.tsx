import './css/course_header.css';
export default function CourseHeader() {
  return (
    <>
      {/* course information */}
      <div className='course-info'>
        <div className='bg-[rgb(205,228,242)] mt-14 pb-24'>
          {/* Left */}
          <div className='container grid grid-cols-12'>
            <div className=' col-span-7 mt-10'>
              <div className='google'>
                <img
                  alt='google logo'
                  src='/assets/logos/google_logo.png'
                  width='200px'
                  style={{
                    marginBottom: '20px',
                  }}
                />
                <p className='font-semibold text-6xl'>
                  Google Data Analysis Professional Certificate
                </p>
                <p className='mt-5'>
                  Discover a world of knowledge and innovation at EduTrailBlaze.
                  Whether you're a student eager to learn or a teacher seeking
                  to inspire, our platform offers a diverse range of courses,
                  tools, and resources to support your educational journey. Join
                  us and ignite your passion for learning.
                </p>
                <div className='flex'>
                  <img
                    alt='small logo'
                    src='/assets/logos/small_google_logo.png'
                    width='40px'
                  />
                  <div className='flex mt-2 space-x-2'>
                    <p>Instructor:</p>
                    <a href='' className='underline'>
                      Google Career Certificates
                    </a>
                  </div>
                </div>
                <button
                  type='submit'
                  style={{
                    backgroundColor: '#0955ef',
                    color: 'white',
                    padding: '10px 20px',
                    width: '250px',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    marginTop: '7px',
                  }}
                >
                  Register for free
                  <p className='text-sm'>Starts Dec 2</p>
                </button>
                <div className='mt-3'>
                  <span className='font-bold'>2,457,865 </span>
                  <span> already registered</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='col-span-4'>
              <img
                alt='logo'
                src='/assets/logos/ETB_Logo.png'
                style={{ width: '600px', paddingTop: '200px' }}
              />
            </div>
          </div>
        </div>

        {/* course detail */}
          <div className='container flex space-x-4 shadow-xl p-4 mb-12 rounded-md course-detail'>
            <div className='flex-1 relative'>
              <p className='font-semibold underline'>5 course Services</p>
              <p className='text-gray-500'>
                Get in-depth knowledge of a subject
              </p>
              {/* Đường kẻ dọc */}
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
