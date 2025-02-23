import React from 'react'

export default function WebFooter() {
  return (
    <footer className='relative bg-gradient-to-bl from-gray-900 via-black to-sky-950 to to-95% text-gray-50'>
      <div className='container mx-auto px-6 py-6'>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <div className='py-[60] px-0'>
              <div className='grid md:grid-cols-12 grid-cols-1 gap-[30px]'>
                <div className='lg:col-span-4 md:col-span-12'>
                  <span className='text-2xl text-yellow-400 font-semibold flex justify-center lg:justify-start'>
                    <img alt='' src='/assets/logos/ETB_Logo.png' className='w-80' />
                  </span>
                  <p className='mt-6 text-gray-300 text-justify'>
                    Discover a world of knowledge and innovation at EduTrailBlaze. Whether you're a student eager to
                    learn or a teacher seeking to inspire, our platform offers a diverse range of courses, tools, and
                    resources to support your educational journey. Join us and ignite your passion for learning.
                  </p>
                  <ul className='list-none mt-6 text-center lg:text-justify'>
                    <li className='inline mr-3'>
                      <a
                        href=''
                        className='font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-9 w-9 inline-flex items-center text-center justify-center text-sm border border-yellow-600 rounded-md hover:border-yellow-600 hover:bg-yellow-600'
                      >
                        <img src='/assets/logos/facebook_logo1.png' alt='' className='h-4 w-4 fill-gray-300' />
                      </a>
                    </li>
                    <li className='inline mr-3'>
                      <a
                        href=''
                        className='font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-9 w-9 inline-flex items-center text-center justify-center text-sm border border-yellow-600 rounded-md hover:border-yellow-600 hover:bg-yellow-600'
                      >
                        <img src='/assets/logos/instagram_logo.png' alt='' className='h-4 w-4 fill-gray-300' />
                      </a>
                    </li>
                    <li className='inline mr-3'>
                      <a
                        href=''
                        className='font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-9 w-9 inline-flex items-center text-center justify-center text-sm border border-yellow-600 rounded-md hover:border-yellow-600 hover:bg-yellow-600'
                      >
                        <img src='/assets/logos/twitter_logo.png' alt='' className='h-4 w-4 fill-gray-300' />
                      </a>
                    </li>
                    <li className='inline mr-3'>
                      <a
                        href=''
                        className='font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-9 w-9 inline-flex items-center text-center justify-center text-sm border border-yellow-600 rounded-md hover:border-yellow-600 hover:bg-yellow-600'
                      >
                        <img src='/assets/logos/linkedin_logo.png' alt='' className='h-4 w-4 fill-gray-300' />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='lg:col-span-2 md:col-span-4 text-center lg:text-justify'>
                  <h5 className='tracking-[1px] text-yellow-300 font-semibold'>EduTrailBlaze</h5>
                  <ul className='list-none mt-6'>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Services
                      </a>
                    </li>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='lg:col-span-2 md:col-span-4 text-center lg:text-justify'>
                  <h5 className='tracking-[1px] text-yellow-300 font-semibold'>Important Links</h5>
                  <ul className='list-none mt-6'>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Term Of Services
                      </a>
                    </li>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href='' className='text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out'>
                        Document
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='lg:col-span-3 md:col-span-4 text-center lg:text-justify'>
                  <h5 className='tracking-[1px] text-yellow-300 font-semibold'>Newsletter</h5>

                  <p className='mt-6'>Sign Up and receive the latest update via email</p>

                  <form>
                    <div className='grid grid-cols-1'>
                      <div className='my-3'>
                        <label htmlFor='' className='font-lable'>
                          Write your email
                          <span className='text-red-600'>*</span>
                        </label>
                        <div className='relative mt-2'>
                          <input
                            type='email'
                            className='w-full py-2 px-3 rounded h-10 outline-none bg-transparent rounded-t-sm rounded-r-none rounded-b-none rounded-l-sm outline-0 border border-gray-800/90 text-gray-100 focus-within: shadow-none focus:border-gray-800/90'
                            placeholder='Email...'
                            name='email'
                            required
                          />
                        </div>
                        <button
                          type='submit'
                          id='submitsubcribe'
                          name='send'
                          className='w-full mt-4 py-2 px-5 inline-block font-semibold tracking-wide border align-middle text-center bg-yellow-400 border-[#201914] text-black rounded-lg hover:bg-sky-400'
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
