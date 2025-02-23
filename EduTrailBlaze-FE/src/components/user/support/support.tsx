'use client'
import React from 'react'
import {
  Search,
  User,
  CreditCard,
  GraduationCap,
  ClipboardList,
  Award,
  BookOpen,
  Medal,
  Monitor,
  PlaySquare
} from 'lucide-react'

const HelpCenter = () => {
  const helpTopics = [
    {
      icon: <User className='w-8 h-8 text-blue-600' />,
      title: 'Account & notifications',
      description: 'Account settings, login issues, and notification preferences'
    },
    {
      icon: <CreditCard className='w-8 h-8 text-blue-600' />,
      title: 'Payments & subscriptions',
      description: 'Help with payments, subscription options, and Financial Aid'
    },
    {
      icon: <GraduationCap className='w-8 h-8 text-blue-600' />,
      title: 'Enrollment',
      description: 'Find courses to take and learn about enrollment options'
    },
    {
      icon: <ClipboardList className='w-8 h-8 text-blue-600' />,
      title: 'Grades & assignments',
      description: 'Grades, peer review, assignments, and Labs'
    },
    {
      icon: <Award className='w-8 h-8 text-blue-600' />,
      title: 'Certificates & verification',
      description: 'How to get and share a Course Certificate'
    },
    {
      icon: <BookOpen className='w-8 h-8 text-blue-600' />,
      title: 'Coursera policies',
      description: 'Learn about our policies and program terms'
    },
    {
      icon: <Medal className='w-8 h-8 text-blue-600' />,
      title: 'Course content',
      description: 'Videos, discussion forums, and common course issues'
    },
    {
      icon: <Monitor className='w-8 h-8 text-blue-600' />,
      title: 'Specializations',
      description: 'Help with Specializations and Capstone Projects'
    },
    {
      icon: <GraduationCap className='w-8 h-8 text-blue-600' />,
      title: 'Degrees & other programs',
      description: 'Help with degrees, Professional Certificates, and other programs'
    },
    {
      icon: <PlaySquare className='w-8 h-8 text-blue-600' />,
      title: 'Video library',
      description: 'Watch tutorials on the Coursera learner experience'
    }
  ]

  const popularArticles = [
    'Verify your ID',
    'Apply for financial aid',
    'Coursera Honor Code',
    'Get a Course Certificate',
    'Cancel a subscription',
    'Payments on Coursera'
  ]

  const communityTopics = [
    'Time allotted has expired, please submit',
    'Financial Aid for Multiple Courses',
    'Can You Recommend a Music Course?',
    'Roadmap in Data Science for Beginners',
    'Is certification course fee applied on top of Coursera fee?',
    'Error message appeared in quiz',
    'How difficult is it to change your career?',
    'How to Become a Data Analyst: Q&A with IBM Instructors'
  ]

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='bg-blue-600 py-12 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-8'>Learner Help Center</h1>
          <div className='max-w-2xl mx-auto relative'>
            <input type='text' placeholder='Search for help' className='w-full px-4 py-3 rounded-lg pl-12' />
            <Search className='absolute left-4 top-3.5 text-gray-400' size={20} />
          </div>
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {helpTopics.map((topic, index) => (
            <div key={index} className='border rounded-lg p-6 hover:shadow-lg transition-shadow'>
              <div className='mb-4'>{topic.icon}</div>
              <h3 className='font-semibold text-lg mb-2'>{topic.title}</h3>
              <p className='text-gray-600 text-sm'>{topic.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className='bg-gray-50 py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-xl font-semibold mb-6 flex items-center'>
            <span className='mr-2'>★</span> Popular articles
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {popularArticles.map((article, index) => (
              <a key={index} href='#' className='text-blue-600 hover:underline'>
                {article}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className='max-w-6xl mx-auto px-4 py-12 text-center'>
        {/* <img 
          src="/api/placeholder/120/120" 
          alt="Community" 
          className="mx-auto mb-6 rounded-full"
        /> */}
        <h2 className='text-2xl font-bold mb-4'>Connect with learners around the world</h2>
        <p className='text-gray-600 mb-6'>
          Ask questions and help others, discuss subjects you're studying and meet people around the world.
        </p>
        <button className='bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors'>
          Visit the Community
        </button>

        <div className='mt-12'>
          <h2 className='text-xl font-semibold mb-6 flex items-center justify-center'>
            <span className='mr-2'>★</span> Popular community conversations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left'>
            {communityTopics.map((topic, index) => (
              <a key={index} href='#' className='text-blue-600 hover:underline'>
                {topic}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Need Help Section */}
      <div className='bg-gray-50 py-12 text-center'>
        <div className='max-w-6xl mx-auto px-4'>
          {/* <img 
            src="/api/placeholder/120/120" 
            alt="Support" 
            className="mx-auto mb-6 rounded-full"
          /> */}
          <h2 className='text-2xl font-bold mb-4'>Need help?</h2>
          <p className='text-gray-600 mb-6'>
            If you can't find what you're looking for, get in touch with our Support team and we'll be happy to help.
          </p>
          <button className='bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors'>
            Contact us
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
