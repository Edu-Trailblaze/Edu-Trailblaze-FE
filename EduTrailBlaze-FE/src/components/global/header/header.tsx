'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, BriefcaseIcon, NewspaperIcon, ComputerDesktopIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ArrowRightCircleIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { LuHandHeart } from 'react-icons/lu'
import { MdAttachMoney, MdOutlineShoppingCart, MdLanguage, MdOutlineSupportAgent } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'
import Link from 'next/link'
import { logout } from '../../../redux/slice/auth.slice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import { Avatar, AvatarImage } from '../../ui/avatar'
import { jwtDecode } from 'jwt-decode'
import { FaUserCog, FaUserEdit } from 'react-icons/fa'
import { useGetCartQuery } from '@/redux/services/cart.service'
import ViewCart from './viewCart'
import { FaBell } from 'react-icons/fa6'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useGetUserProfileQuery } from '@/redux/services/user.service'

const products = [
  {
    name: 'Development',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ComputerDesktopIcon
  },
  {
    name: 'Business',
    description: 'Speak directly to your customers',
    href: '#',
    icon: BriefcaseIcon
  },
  {
    name: 'Marketing',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: NewspaperIcon
  },
  {
    name: 'Lifestyle',
    description: 'Connect with third-party tools',
    href: '#',
    icon: LuHandHeart
  },
  {
    name: 'Finance',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: MdAttachMoney
  }
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'View all', href: '#', icon: ArrowRightCircleIcon }
]

const languageOptions = [
  'English',
  'Deutsch',
  'Español',
  'Français',
  'Bahasa Indonesia',
  'Italiano',
  '日本語',
  '한국어',
  '中文(简体)',
  '中文(繁體)',
  'Português',
  'Русский',
  'Türkçe',
  'Polski',
  'Română',
  'Tiếng Việt',
  'ภาษาไทย',
  'Nederlands'
]

export default function WebHeader() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageModalOpen, setLanguageModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartHovered, setCartHovered] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const { data: profile, isLoading, isFetching } = useGetUserProfileQuery(userId)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)

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

  const handleToggleCart = () => {
    setCartHovered((prev) => !prev)
  }

  return (
    <header className='bg-white'>
      <nav className='mx-auto flex flex-wrap items-center justify-between px-4 py-2 lg:px-8 border-b border-gray-200'>
        {/* Logo - always visible */}
        <div className='flex items-center mr-10'>
          <Link href={'/'} className='flex items-center'>
            <span className='sr-only'>EduTrailBlaze</span>
            <img alt='EduTrailBlaze Logo' src='/assets/logos/ETB_Logo.png' className='h-8 md:h-10' />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className='flex items-center lg:hidden'>
          <div className='flex items-center space-x-4'>
            {/* Cart Icon for Mobile */}
            <div className='relative cursor-pointer p-2'>
              <Link href={'/student/shopping_cart'}>
                <MdOutlineShoppingCart className='w-6 h-6 text-gray-700' />
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              className='p-2 text-gray-700 hover:text-gray-900'
            >
              <Bars3Icon className='h-6 w-6' />
            </button>
          </div>
        </div>

        {/* Categories dropdown - hidden on mobile */}
        <div className='hidden lg:flex lg:items-center'>
          <Popover className='relative'>
            <PopoverButton className='flex items-center gap-x-1 text-lg font-medium text-gray-700 hover:text-gray-900'>
              Categories
              <ChevronDownIcon aria-hidden='true' className='size-5 flex-none text-gray-400' />
            </PopoverButton>

            <PopoverPanel
              transition
              className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
            >
              <div className='p-4'>
                {products.map((item) => (
                  <div
                    key={item.name}
                    className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
                  >
                    <div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                      <item.icon aria-hidden='true' className='size-6 text-gray-600 group-hover:text-indigo-600' />
                    </div>
                    <div className='flex-auto'>
                      <a href={item.href} className='block font-semibold text-gray-900'>
                        {item.name}
                        <span className='absolute inset-0' />
                      </a>
                      <p className='mt-1 text-gray-600'>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100'
                  >
                    <item.icon aria-hidden='true' className='size-5 flex-none text-gray-400' />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </div>

        {/* Search - adjusts width based on screen size */}
        <div className='hidden md:flex w-full md:w-auto lg:flex-1 justify-evenly mt-4 md:mt-0 order-3 lg:order-none'>
          <div className='relative w-full max-w-3xl'>
            <div className='flex rounded-full border border-gray-300 overflow-hidden'>
              <div className='flex items-center justify-center rounded-tl-full rounded-bl-full border-r border-gray-200 bg-white p-2'>
                <svg viewBox='0 0 20 20' aria-hidden='true' className='w-5 h-5 fill-gray-500'>
                  <path d='M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z'></path>
                </svg>
              </div>
              <input
                type='text'
                className='w-full bg-white pl-2 text-base font-semibold outline-0'
                placeholder='Search courses'
              />
              <button
                type='button'
                className='bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition-colors'
                style={{ borderRadius: '0 50px 50px 0' }}
              >
                Search
              </button>
            </div>
          </div>
          {/* Cart Icon - hidden on mobile (shown in mobile menu button area) */}
          <div
            className='hidden lg:block cursor-pointer hover:bg-blue-100 p-2 rounded-md'
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
          >
            <Link href={'/student/shopping_cart'}>
              <MdOutlineShoppingCart className='w-6 h-6 hover:text-blue-600' />
            </Link>

            {cartHovered && <ViewCart id={userId} />}
          </div>
        </div>

        {/* Navigation Links - desktop only */}
        <div className='hidden lg:flex lg:items-center lg:space-x-4'>
          {isLoggedIn ? (
            <>
              <div className='hover:bg-sky-100 hover:text-blue-600 p-2 rounded-lg'>
                <IoMdNotificationsOutline className='w-6 h-6' />
              </div>
              <div className='hover:bg-sky-100 hover:text-blue-600 p-2 rounded-lg'>
                <Link href={'/student/welcome'}>Teach on EduTrail</Link>
              </div>
              <div className='hover:bg-sky-100 hover:text-blue-600 p-2 rounded-lg'>
                <Link href={'/student/myLearning'}>My Learning</Link>
              </div>
              <div className='relative'>
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
            </>
          ) : (
            <>
              <Link href={'/auth/login_register'}>
                <button
                  type='button'
                  className='select-none rounded-full bg-blue-500 py-2 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                >
                  Login
                </button>
              </Link>
              <Link href={'/auth/login_register'}>
                <button
                  type='button'
                  className='select-none rounded-full bg-white py-2 px-6 text-center font-sans text-xs font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                >
                  Register
                </button>
              </Link>
            </>
          )}

          {/* Language Button */}
          <button
            onClick={() => setLanguageModalOpen(true)}
            className='border-2 border-blue-500 rounded-lg bg-white p-2 text-center font-bold text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
          >
            <MdLanguage className='text-lg' />
          </button>
        </div>

        {/* Mobile Search - only visible on mobile */}
        <div className='w-full mt-4 md:hidden order-4'>
          <div className='relative w-full'>
            <div className='flex rounded-full border border-gray-300 overflow-hidden'>
              <div className='flex items-center justify-center rounded-tl-full rounded-bl-full border-r border-gray-200 bg-white p-2'>
                <svg viewBox='0 0 20 20' aria-hidden='true' className='w-5 h-5 fill-gray-500'>
                  <path d='M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z'></path>
                </svg>
              </div>
              <input
                type='text'
                className='w-full bg-white pl-2 text-base font-semibold outline-0'
                placeholder='Search courses'
              />
              <button
                type='button'
                className='bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition-colors'
                style={{ borderRadius: '0 50px 50px 0' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Language Modal */}
        <Dialog open={languageModalOpen} onClose={() => setLanguageModalOpen(false)} className='relative z-50'>
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          <div className='fixed inset-0 flex items-center justify-center p-4'>
            <DialogPanel className='w-full max-w-md rounded bg-white p-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Choose a language</h2>
                <button onClick={() => setLanguageModalOpen(false)} className='text-gray-400 hover:text-gray-700'>
                  <XMarkIcon className='w-6 h-6' />
                </button>
              </div>
              <ul className='mt-4 grid grid-cols-2 gap-4'>
                {languageOptions.map((language) => (
                  <li
                    key={language}
                    className='cursor-pointer rounded p-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100'
                    onClick={() => {
                      console.log(`Language selected: ${language}`)
                      setLanguageModalOpen(false)
                    }}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Mobile Menu */}
        <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen} className='relative z-50 lg:hidden'>
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white sm:max-w-sm'>
            <div className='p-6 h-full flex flex-col'>
              <div className='flex items-center justify-between mb-6'>
                <Link href='/' className='-m-1.5 p-1.5'>
                  <img className='h-8' src='/assets/logos/ETB_Logo.png' alt='EduTrailBlaze Logo' />
                </Link>
                <button type='button' className='p-2.5 text-gray-700' onClick={() => setMobileMenuOpen(false)}>
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </div>

              <div className='flex-1 overflow-y-auto'>
                {/* Navigation Links */}
                <div>
                  {isLoggedIn ? (
                    <div className='space-y-2'>
                      <div className='flex items-center p-3 mb-2'>
                        <Avatar className='mr-3 border-2 border-green-600'>
                          <AvatarImage
                            src={profile?.profilePictureUrl || '/assets/img/default-avatar.jpg'}
                            alt='avatar'
                          />
                        </Avatar>
                        <span className='font-medium'>{userName}</span>
                      </div>

                      <a
                        href='/student/profile'
                        className='flex items-center p-3 rounded-lg hover:bg-gray-50'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className='mr-3 rounded-full bg-gray-100 p-2'>
                          <FaUserEdit className='h-5 w-5' />
                        </div>
                        <span>Profile</span>
                      </a>

                      <a
                        href='/student/myLearning'
                        className='flex items-center p-3 rounded-lg hover:bg-gray-50'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className='mr-3 rounded-full bg-gray-100 p-2'>
                          <BriefcaseIcon className='h-5 w-5' />
                        </div>
                        <span>My Learning</span>
                      </a>

                      <a
                        href='/student/welcome'
                        className='flex items-center p-3 rounded-lg hover:bg-gray-50'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className='mr-3 rounded-full bg-gray-100 p-2'>
                          <NewspaperIcon className='h-5 w-5' />
                        </div>
                        <span>Teach on EduTrail</span>
                      </a>

                      <a
                        href='/student/support'
                        className='flex items-center p-3 rounded-lg hover:bg-gray-50'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className='mr-3 rounded-full bg-gray-100 p-2'>
                          <MdOutlineSupportAgent className='h-5 w-5' />
                        </div>
                        <span>Support</span>
                      </a>

                      <button
                        onClick={() => {
                          handleLogout()
                          setMobileMenuOpen(false)
                        }}
                        className='flex w-full items-center p-3 rounded-lg hover:bg-gray-50 text-left'
                      >
                        <div className='mr-3 rounded-full bg-gray-100 p-2'>
                          <IoLogOut className='h-5 w-5' />
                        </div>
                        <span>Log out</span>
                      </button>
                    </div>
                  ) : (
                    <div className='flex flex-col space-y-4 pt-2'>
                      <Link
                        href='/auth/login_register'
                        onClick={() => setMobileMenuOpen(false)}
                        className='w-full rounded-full bg-blue-500 py-3 px-4 text-center font-sans text-sm font-bold text-white shadow-md'
                      >
                        Login
                      </Link>
                      <button
                        type='button'
                        className='w-full rounded-full bg-white py-3 px-4 text-center font-sans text-sm font-bold text-blue-500 shadow-md border border-blue-500'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
                {/* Categories Section */}
                <div className='pt-6 mt-6  border-t border-gray-200'>
                  <h3 className='text-lg font-semibold mb-3'>Categories</h3>
                  <ul className='space-y-2'>
                    {products.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className='flex items-center p-3 rounded-lg hover:bg-gray-50'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className='mr-3 rounded-full bg-gray-100 p-2'>
                            <item.icon className='h-5 w-5 text-gray-600' />
                          </div>
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                

                {/* Language Selection */}
                <div className='border-t border-gray-200 pt-6 mt-6'>
                  <button
                    onClick={() => {
                      setLanguageModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className='flex items-center p-3 rounded-lg hover:bg-gray-50 w-full'
                  >
                    <div className='mr-3 rounded-full bg-gray-100 p-2'>
                      <MdLanguage className='h-5 w-5' />
                    </div>
                    <span>Change Language</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </nav>
    </header>
  )
}
