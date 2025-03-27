'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetUserProfileQuery } from '@/redux/services/user.service'
import { logout } from '@/redux/slice/auth.slice'
import { jwtDecode } from 'jwt-decode'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaUserCog, FaUserEdit } from 'react-icons/fa'
import { FaBell } from 'react-icons/fa6'
import { IoLogOut } from 'react-icons/io5'
import { MdOutlineSupportAgent } from 'react-icons/md'
import { useDispatch } from 'react-redux'

export default function InstructorHeader() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const { data: profile, isLoading, isFetching } = useGetUserProfileQuery(userId)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    try {
      if (token) {
        const decode = jwtDecode(token)
        console.log('decode', decode)
        setUserId(decode?.sub ?? '') // Use optional chaining and nullish coalescing
        setUserName((decode as any)?.fullName ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    alert(`Logout successful!`)
    router.push('/auth/login_register')
  }
  return (
    <div>
      {/* Navigation Bar */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-end h-16'>
            {/* <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <div className='h-8 w-44 relative'>
                  <Link href={'/'}>
                    <div className='absolute inset-0 flex items-center cursor-pointer'>
                      <img alt='EduTrailBlaze Logo' src='https://res.cloudinary.com/dtjgueyp2/image/upload/v1742871415/ETB_Logo_vpv1gu.png' className='h-8 md:h-10' />
                    </div>
                  </Link>
                </div>
              </div>
            </div> */}
            <div className='flex items-center'>
              <Link href={'/'}>
                <div className='hover:bg-sky-100 hover:text-blue-600 p-2 rounded-lg'>Learn on EduTrail</div>
              </Link>
              <button className='ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none'>
                <span className='sr-only'>Notifications</span>
                <Bell size={20} />
              </button>
              <div className='ml-3 relative'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src={profile?.profilePictureUrl} alt='avatar' />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56 bg-white'>
                    <DropdownMenuLabel className='flex items-center bg-sky-200 rounded'>
                      <Avatar className='border-2 border-green-600'>
                        <AvatarImage
                          src={profile?.profilePictureUrl || '/assets/img/default-avatar.jpg'}
                          alt='avatar'
                        />
                      </Avatar>
                      <p className='ml-2'>{userName}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'>
                        <div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'>
                          <FaUserEdit />
                        </div>
                        <Link href={'/student/profile'} prefetch={false} className='ml-2'>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'>
                        <div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'>
                          <FaBell />
                        </div>
                        <Link href={''} className='ml-2'>
                          Notification
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'>
                        <div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'>
                          <FaUserCog />
                        </div>
                        <span className='ml-2'>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'>
                      <div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'>
                        <MdOutlineSupportAgent />
                      </div>
                      <Link href={'/student/support'} className='ml-2'>
                        Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex' onClick={handleLogout}>
                      <div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'>
                        <IoLogOut />
                      </div>
                      <span className='ml-2'>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='ml-3 -mr-1 md:hidden'>
                <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'>
                  <span className='sr-only'>Open menu</span>
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
