'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, BriefcaseIcon, NewspaperIcon, ComputerDesktopIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ArrowRightCircleIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { LuHandHeart } from 'react-icons/lu'
import { MdAttachMoney, MdOutlineShoppingCart, MdLanguage, MdOutlineSupportAgent } from 'react-icons/md'
import { IoLogOut } from "react-icons/io5";
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
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

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

  console.log('userName', userName)

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
      <nav aria-label='Global' className='mx-auto flex items-center lg:px-8'>
        <div className='flex mr-20'>
          <Link href={'/'} className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img alt='' src='/assets/logos/ETB_Logo.png' className='w-40 h-30' />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon aria-hidden='true' className='size-6' />
          </button>
        </div>

        <PopoverGroup className='flex justify-evenly items-center'>
          <Popover className='relative'>
            <PopoverButton className='flex items-center gap-x-1 font-medium text-lg text-gray-90 mr-10'>
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

          <div className='flex items-center justify-center p-5 '>
            <div className='rounded-full outline outline-gray-300 '>
              <div className='flex'>
                <div className='flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5'>
                  <svg
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                    className='pointer-events-none absolute w-5 fill-gray-500 transition'
                  >
                    <path d='M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z'></path>
                  </svg>
                </div>
                <input
                  type='text'
                  className='w-full  bg-white pl-2 text-base font-semibold outline-0 hover:border-s-black'
                  placeholder=''
                  id=''
                  style={{ width: '650px' }}
                />
                <input
                  type='button'
                  value='Search'
                  className='bg-blue-500 p-2 text-white font-medium hover:bg-blue-800 transition-colors'
                  style={{ borderRadius: '0 50px 50px 0' }}
                />
              </div>
            </div>
          </div>

          <div
            className='cursor-pointer hover:bg-blue-200   ml-6 p-[6px] rounded-md'
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
          >
            {/* <a href="#">
              <MdOutlineShoppingCart className="w-8 h-8 ml-10" />
            </a> */}

            <MdOutlineShoppingCart className='w-8 h-8 hover:text-blue-600' />

            {cartHovered && (
              <div className='absolute mt-4 w-80 -translate-x-[45%] p-4 bg-white shadow-2xl rounded-xl border border-gray-400 z-10'>
                <div className='flex gap-5'>
                  <div>
                    <img
                      className='h-[70px] w-[7-px] rounded-[7px]'
                      src='assets/Side_Image/course_image.png'
                      alt='course_img'
                    />
                  </div>
                  <div>
                    <h1 className='font-semibold'>Course Title</h1>
                    <p className='block font-sans font-light text-sm leading-relaxed text-inherit antialiased'>
                      <strong>Instructor:</strong>
                    </p>
                    <p className='font-semibold'>Price$</p>
                  </div>
                </div>

                <button className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg'>
                  <Link href={'/shopping_cart'}>Go to Cart</Link>
                </button>

                <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-400'></div>
              </div>
            )}
          </div>
        </PopoverGroup>

        <div className='lg:flex lg:flex-1 justify-end'>
          {isLoggedIn ? (
            <div className='relative overflow-visible mr-[50px] mt-2'>
              {/* <WelcomeItem id={userId}/> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src='/assets/img/default-avatar.jpg' alt='avatar' />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 bg-white'>
                  <DropdownMenuLabel className='flex items-center bg-sky-200 rounded'>
                    <Avatar className='border-2 border-green-600'>
                      <AvatarImage src='/assets/img/default-avatar.jpg' alt='avatar' />
                    </Avatar>{' '}
                    <p className='ml-2'>{userName}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'><div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'><FaUserEdit /></div> Profile</DropdownMenuItem>
                    <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'><div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'><FaUserCog /></div> Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex'><div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'><MdOutlineSupportAgent /> </div>Support</DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-slate-100 cursor-pointer flex' onClick={handleLogout}><div className='flex justify-center items-center bg-slate-200 rounded-full w-8 h-8'><IoLogOut /></div> 
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <div>
                <Link href={'/auth/login_register'}>
                  <button
                    data-ripple-light='true'
                    type='button'
                    className='mr-5 select-none rounded-full bg-blue-500 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Login
                  </button>
                </Link>
              </div>

              <div>
                <button
                  data-ripple-light='true'
                  type='button'
                  className='mr-5 select-none rounded-full bg-white py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-blue-500 shadow-md shadow-blue-500/90 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                >
                  Register
                </button>
              </div>
            </>
          )}

          <PopoverGroup className='flex justify-evenly items-center'>
            <div>
              <button
                onClick={() => setLanguageModalOpen(true)}
                className='outline select-none rounded-lg bg-white py-3 px-3 text-center font-bold text-blue-500 shadow-md shadow-blue-500/90 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >
                <MdLanguage className='text-lg' />
              </button>
            </div>
          </PopoverGroup>

          <Dialog open={languageModalOpen} onClose={() => setLanguageModalOpen(false)} className='relative z-50'>
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
            <div className='fixed inset-0 flex items-center justify-center'>
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
        </div>
      </nav>

      {/** The codes below is for mobile edition (incomplete) */}
      {/* <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog> */}
    </header>
  )
}
