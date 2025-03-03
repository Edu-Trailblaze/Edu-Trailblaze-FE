// pages/become-instructor.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faLightbulb, faCoins, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function BecomeInstructor() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Become an Instructor | EduShare</title>
        <meta name="description" content="Become an instructor, share knowledge and change lives" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-16 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Join our teaching community</h1>
              <p className="text-lg text-gray-600 mb-8">Become a lecturer, not only share knowledge but also inspire, direct and change the lives of others, while discovering and developing yourself. <br/><br/> Get started now and make a positive impact with us!</p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300">
                <Link href="/instructor/createCourse">
                Get Started Now
                </Link>
              </button>
            </div>
            <div className="lg:w-[40%] relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-100 rounded-full opacity-50"></div>
              <div className="relative z-10 rounded-2xl shadow-xl overflow-hidden">
                <Image 
                  src="/assets/Lecturer/img1.jpg" 
                  alt="Instructor" 
                  width={600} 
                  height={500}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-16 bg-gray-50">
        <div className="container mx-auto px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">Why become an instructor</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 mx-auto">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Teach your way</h3>
              <p className="text-gray-600 text-center">Publish courses the way you want, in the field you're passionate about, with complete control over your content.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 mx-auto">
                <FontAwesomeIcon icon={faLightbulb} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Inspire learners</h3>
              <p className="text-gray-600 text-center">Share knowledge and help students discover their potential, develop new skills, and advance in their careers.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg mb-6 mx-auto">
                <FontAwesomeIcon icon={faCoins} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Expand opportunities</h3>
              <p className="text-gray-600 text-center">Develop your professional network, build your reputation, and earn income from each course enrollment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            <div className="text-white">
              <p className="text-3xl lg:text-4xl font-bold mb-2">65M+</p>
              <p className="text-sm lg:text-base">Students</p>
            </div>
            <div className="text-white">
              <p className="text-3xl lg:text-4xl font-bold mb-2">85+</p>
              <p className="text-sm lg:text-base">Languages</p>
            </div>
            <div className="text-white">
              <p className="text-3xl lg:text-4xl font-bold mb-2">950M+</p>
              <p className="text-sm lg:text-base">Enrollments</p>
            </div>
            <div className="text-white">
              <p className="text-3xl lg:text-4xl font-bold mb-2">140+</p>
              <p className="text-sm lg:text-base">Countries</p>
            </div>
            <div className="text-white">
              <p className="text-3xl lg:text-4xl font-bold mb-2">12,000+</p>
              <p className="text-sm lg:text-base">Business partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Begin Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-16">How to begin</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mr-4">1</div>
                  <h3 className="text-xl font-semibold">Plan your course</h3>
                </div>
                <p className="text-gray-600 pl-16">Start with your passion and expertise. Choose an engaging topic with support from our market analysis tools.</p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mr-4">2</div>
                  <h3 className="text-xl font-semibold">Record video lectures</h3>
                </div>
                <p className="text-gray-600 pl-16">How you teach — what you bring to it — is your differentiator. We provide guidelines to create quality video lectures.</p>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mr-4">3</div>
                  <h3 className="text-xl font-semibold">Launch your course</h3>
                </div>
                <p className="text-gray-600 pl-16">We provide many resources to help you create your first course. Our platform helps you organize and manage your course effectively.</p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <Image 
                  src="/assets/Lecturer/guide.webp" 
                  alt="Course creation guide" 
                  width={500}
                  height={400}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="lg:w-2/3 h-64 lg:h-auto relative">
              <Image 
                src="/assets/Lecturer/JohnSon.jpeg" 
                alt="Instructor" 
                className="object-cover"
                width={600} 
                height={500}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            </div>
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="flex items-start mb-6">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-blue-200 mr-4 mt-1" />
                <p className="text-xl lg:text-2xl font-medium text-gray-700">
                  "I'm proud to know that my work is helping people around the world develop their careers and build amazing things. While being a full-time instructor is challenging, it allows me to work when, where, and how I want."
                </p>
              </div>
              <div className="pl-14">
                <p className="font-bold text-gray-800">Michael Johnson</p>
                <p className="text-gray-600">Data Science & Analytics Expert</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">You don't have to do it alone</h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">We provide comprehensive support throughout your journey</p>

          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="relative w-full h-96 rounded-2xl shadow-xl overflow-hidden mx-auto">
                <Image 
                  src="/assets/Lecturer/support.webp" 
                  alt="Instructor support" 
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            </div>
            
            <div className="lg:w-[40%]">
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructor Support Team</h3>
                <p className="text-gray-600">Always ready to answer questions and review your first video lecture.</p>
              </div>
              
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Teaching Center</h3>
                <p className="text-gray-600">Provides you with many resources to support you throughout the process.</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online Community</h3>
                <p className="text-gray-600 mb-6">Get support from experienced instructors in our community.</p>
                <Link href="/instructor-community" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                  Learn more details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">Become an instructor today</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Join one of the world's largest online learning platforms</p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-3 px-10 rounded-lg shadow-lg hover:opacity-90 transition duration-300">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}