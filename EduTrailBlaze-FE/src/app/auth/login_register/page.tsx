'use client'
import React, { useState } from 'react'
import { LiaEyeSlashSolid } from 'react-icons/lia'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookSquare } from 'react-icons/fa'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true) // Quản lý chế độ hiển thị
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        Username is {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <section className='bg-gray-50 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-100 flex rounded-2xl shadow-xl max-w-4xl p-5'>
        {/* Nội dung thay đổi dựa trên trạng thái */}
        {isLogin ? (
          <div className='sm:w-1/2 px-12 py-10'>
            <h1 className='font-bold text-2xl text-blue-500 flex text-center justify-center'>LOGIN</h1>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-center text-sm'
            >
              <FcGoogle className='mr-3' />
              Login with google
            </button>
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-center text-sm'
            >
              <FaFacebookSquare className='mr-3 text-blue-700' />
              Login with facebook
            </button>
            <div className='mt-6 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-400' />
              <p className='text-center text-sm'>Or</p>
              <hr className='border-gray-400' />
            </div>
            <form action='' className='flex flex-col gap-4 mt-4'>
              <div>
                <span>
                  Email <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='text'
                  name='email'
                  placeholder='name@email.com'
                  required
                />
              </div>
              <div className='relative'>
                <span>
                  Password <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                  required
                />
                <LiaEyeSlashSolid fill='gray' className='absolute top-1/2 right-3 -translate-y-1/2 font-bold' />
                <p className='text-xs mt-3 text-blue-500 underline cursor-pointer'>Forgot your password?</p>
              </div>
              <button className='bg-blue-500 rounded-xl text-white py-2'>Log in</button>
            </form>
            <div className='border-t-[1px] mt-4 border-[#9ca3af]'></div>
            <div className='flex mt-8 justify-center text-sm'>
              <p className='mr-1'>New to EduTrailBlaze?</p>
              <button className='text-blue-500 underline' onClick={() => setIsLogin(false)}>
                Register
              </button>
            </div>

            <div className='mt-8 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  Having trouble logging in? 
                  <a href='' className='underline text-gray-600 font-bold'>
                    Student Help Center
                  </a>
                </p>
              </div>
            </div>

            <div className='mt-2 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  This site is protected by reCAPTCHA Enterprise and the Google
                  <a className='underline text-gray-600 font-bold' href=''>
                    Privacy Policy and Terms of Service
                  </a>
                   apply.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='sm:w-1/2 px-12 py-10'>
            <h2 className='font-bold text-2xl text-blue-500 flex text-center justify-center'>REGISTER</h2>
            <form action='' className='flex flex-col gap-4 mt-4'>
              <div>
                <span>
                  Email <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='email'
                  placeholder='name@email.com'
                  required
                />
              </div>
              <div>
                <span>
                  Username <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='text'
                  placeholder='Enter your username'
                  required
                />
              </div>
              <div>
                <span>
                  Password <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  placeholder='Enter your password'
                  required
                />
              </div>
              <div>
                <span>
                  Confirm Password <span className='text-red-600 font-bold'>*</span>
                </span>
                <input
                  className='p-2 rounded-xl border w-full mt-1'
                  type='password'
                  placeholder='Re-enter your password'
                  required
                />
              </div>
              <button className='bg-blue-500 rounded-xl text-white py-2 my-2'>Register</button>
            </form>
            <div className='border-t-[1px] mt-4 border-[#9ca3af]'></div>
            <div className='flex mt-8 justify-center text-sm'>
              <p className='mr-1'>Already have an account?</p>
              <button className='text-blue-500 underline' onClick={() => setIsLogin(true)}>
                Login
              </button>
            </div>

            <div className='mt-8 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  Having trouble logging in? 
                  <a href='' className='underline text-gray-600 font-bold'>
                    Student Help Center
                  </a>
                </p>
              </div>
            </div>

            <div className='mt-2 text-xs'>
              <div className='flex justify-center text-center'>
                <p>
                  This site is protected by reCAPTCHA Enterprise and the Google
                  <a className='underline text-gray-600 font-bold' href=''>
                    Privacy Policy and Terms of Service
                  </a>
                   apply.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='sm:block hidden w-1/2 p-5'>
          <img className='rounded-2xl h-[620px]' src='\public\assets\Side_Image\login_pic.jpg' alt='Side Illustration' />
        </div>
      </div>
    </section>
  )
}
