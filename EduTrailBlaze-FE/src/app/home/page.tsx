import React from 'react'
import { Search, ChevronDown, MessageCircle, HelpCircle, PlayCircle, Users, BarChart2, Book } from 'lucide-react'

const CourseDashboard = () => {
  const sidebarItems = [{ icon: 'Ü', active: true }, { icon: '□' }, { icon: '✉' }, { icon: '📊' }, { icon: '?' }]

  const resourceCards = [
    {
      icon: <PlayCircle className='w-8 h-8 text-purple-600' />,
      title: 'Test Video',
      description: 'Send us a sample video and get expert feedback.'
    },
    {
      icon: <MessageCircle className='w-8 h-8 text-purple-600' />,
      title: 'Instructor Community',
      description: 'Connect with experienced instructors. Ask questions, browse discussions, and more.'
    },
    {
      icon: <Book className='w-8 h-8 text-purple-600' />,
      title: 'Teaching Center',
      description: 'Learn about best practices for teaching on Udemy.'
    },
    {
      icon: <BarChart2 className='w-8 h-8 text-purple-600' />,
      title: 'Marketplace Insights',
      description: 'Validate your course topic by exploring our marketplace supply and demand.'
    },
    {
      icon: <HelpCircle className='w-8 h-8 text-purple-600' />,
      title: 'Help and Support',
      description: 'Browse our Help Center or contact our support team.'
    }
  ]

  return (
    <>
      <div className='flex min-h-screen bg-white'>
        {/* Sidebar */}
        <div className='w-16 bg-[#1C1D1F] flex flex-col items-center py-4 space-y-6'>
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg
              ${item.active ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className='flex-1 p-8'>
          <div className='max-w-6xl mx-auto'>
            {/* Header for mobile */}
            <div className=' flex items-center justify-between  z-50'>
              <img src='/api/placeholder/120/40' alt='Udemy' className='h-8' />
              <div className='flex items-center gap-4'>
                <span>Student</span>
                <div className='w-8 h-8 bg-purple-600 rounded-full'></div>
              </div>
            </div>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
              <h1 className='text-2xl font-bold'>Courses</h1>
              <div className='flex items-center gap-4'>
                <div className='flex gap-2'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Search your courses'
                      className='pl-4 pr-10 py-2 border rounded-lg w-64'
                    />
                    <Search className='w-5 h-5 absolute right-3 top-2.5 text-gray-400' />
                  </div>
                  <button className='px-4 py-2 border rounded-lg flex items-center gap-2'>
                    Newest
                    <ChevronDown className='w-4 h-4' />
                  </button>
                </div>
                <button className='px-4 py-2 bg-purple-600 text-white rounded-lg'>New course</button>
              </div>
            </div>

            {/* Draft Course Card */}
            <div className='border rounded-lg p-6 mb-8'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='flex -space-x-2'>
                  <div className='w-12 h-12 bg-gray-100 border rounded'></div>
                  <div className='w-12 h-12 bg-gray-100 border rounded'></div>
                  <div className='w-12 h-12 bg-gray-100 border rounded'></div>
                </div>
                <div>
                  <h2 className='font-medium mb-1'>React</h2>
                  <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <span>DRAFT</span>
                    <span>Public</span>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 rounded p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Finish your course</span>
                  <span className='text-sm text-gray-600'>5%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1'>
                  <div className='bg-purple-600 h-1 rounded-full w-[5%]'></div>
                </div>
              </div>
            </div>

            {/* Info Message */}
            <p className='text-gray-600 mb-8'>Based on your experience, we think these resources will be helpful.</p>

            {/* Feature Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
              {/* Create Course Card */}
              <div className='border rounded-lg p-6 flex gap-6'>
                <img src='/api/placeholder/150/150' alt='Create course' className='w-32 h-32 object-cover' />
                <div>
                  <h3 className='text-xl font-bold mb-2'>Create an Engaging Course</h3>
                  <p className='text-gray-600 mb-4'>
                    Whether you've been teaching for years or are teaching for the first time, you can make an engaging
                    course. We've compiled resources and best practices to help you get to the next level, no matter
                    where you're starting.
                  </p>
                  <button className='text-purple-600 font-medium'>Get Started</button>
                </div>
              </div>

              {/* Video Card */}
              <div className='border rounded-lg p-6 flex gap-6'>
                <img src='/api/placeholder/150/150' alt='Video guide' className='w-32 h-32 object-cover' />
                <div>
                  <h3 className='text-xl font-bold mb-2'>Get Started with Video</h3>
                  <p className='text-gray-600 mb-4'>
                    Quality video lectures can set your course apart. Use our resources to learn the basics.
                  </p>
                  <button className='text-purple-600 font-medium'>Get Started</button>
                </div>
              </div>
            </div>

            {/* Challenge Card */}
            <div className='border rounded-lg p-6 flex gap-6 mb-12'>
              <img src='/api/placeholder/150/150' alt='Instructor challenge' className='w-32 h-32 object-cover' />
              <div>
                <h3 className='text-xl font-bold mb-2'>Join the New Instructor Challenge!</h3>
                <p className='text-gray-600 mb-4'>
                  Get exclusive tips and resources designed to help you launch your first course faster! Eligible
                  instructors who publish their first course on time will receive a special bonus to celebrate. Start
                  today!
                </p>
                <button className='text-purple-600 font-medium'>Get Started</button>
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className='text-lg font-medium mb-6'>
                Have questions? Here are our most popular instructor resources.
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                {resourceCards.map((card, index) => (
                  <div key={index} className='text-center'>
                    <div className='mb-4 flex justify-center'>{card.icon}</div>
                    <h4 className='font-medium mb-2 text-purple-600'>{card.title}</h4>
                    <p className='text-sm text-gray-600'>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDashboard
