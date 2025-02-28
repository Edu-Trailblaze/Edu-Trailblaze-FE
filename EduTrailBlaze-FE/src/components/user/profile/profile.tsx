'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaBell, FaCircleUser } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { MdContactSupport } from 'react-icons/md'
import { Camera, X } from 'lucide-react'
import { useGetUserProfileQuery, useUpdateUserMutation } from '@/redux/services/user.service'
import { jwtDecode } from 'jwt-decode'
import EducationSection from './educationSection'
import LoadingPage from '@/components/animate/Loading/LoadingPage'

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [updateUser] = useUpdateUserMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: '',
    phoneNumber: ''
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const { data: profile, error, isLoading, isFetching } = useGetUserProfileQuery(userId)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    try {
      if (token) {
        const decode = jwtDecode(token)
        setUserId(decode?.sub ?? '')
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      setUserId('')
    }
  }, [])

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        profilePicture: profile.profilePictureUrl,
        phoneNumber: profile.phoneNumber
      })
      setImagePreviewUrl(profile.profilePictureUrl)
    }
  }, [profile])

  if (isLoading || isFetching) {
    return <LoadingPage />
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }

  console.log('imageFile', imageFile)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedData = new FormData()
    updatedData.append('fullName', formData.fullName)
    updatedData.append('phoneNumber', formData.phoneNumber)
    if (imageFile) {
      updatedData.append('profilePicture', imageFile)
    }

    console.log('updatedData', updatedData.get('profilePicture'))

    try {
      const update = await updateUser({ id: userId, body: updatedData }).unwrap()
      alert('Profile updated successfully')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile')
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onRemoveFile = () => {
    setImagePreviewUrl(null)
    setImageFile(null)
  }
  return (
    <div className='flex flex-col md:flex-row min-h-[60vh] bg-gray-50 p-4 md:p-8 gap-4 md:gap-8'>
      {/* Sidebar */}
      <div className='w-full md:w-72'>
        <div className='bg-white rounded-lg shadow-sm p-4'>
          <div className='flex items-center mb-6 p-2'>
            <div className='relative group mr-3'>
              <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img
                  src={imagePreviewUrl ? imagePreviewUrl : profile?.profilePictureUrl}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Camera Icon Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className='absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors'
              >
                <Camera className='w-3 h-3 text-gray-600' />
              </button>

              {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                  <div className='bg-white rounded-lg w-[310px] max-w-md mx-4'>
                    {/* Modal Header */}
                    <div className='p-4 border-b'>
                      <div className='flex items-center justify-between mb-4 hover:bg-gray-200 rounded-full w-fit p-2 border-2 border-[#727272]'>
                        <button onClick={() => setIsModalOpen(false)} className='rounded-full'>
                          <X className='w-5 h-5' />
                        </button>
                      </div>
                      <div>
                        <h2 className='text-xl font-normal'>Profile picture</h2>
                        <p className='text-sm text-gray-600 mt-1'>
                          A picture helps people recognize you and lets you know when you're signed in to your account
                        </p>
                      </div>
                    </div>

                    {/* Current Image */}
                    <div className='p-4'>
                      <div className='w-48 h-48 mx-auto rounded-full overflow-hidden'>
                        <img
                          src={imagePreviewUrl ? imagePreviewUrl : profile?.profilePictureUrl}
                          alt='Profile'
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-center gap-4 p-4'>
                      <input type='file' onChange={handleImageChange} ref={fileInputRef} className='hidden' />
                      <button
                        className='px-6 py-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 font-medium flex items-center'
                        onClick={handleButtonClick}
                      >
                        <Camera className='w-4 h-4 mr-2' />
                        Change
                      </button>
                      <button
                        className='px-6 py-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 font-medium flex items-center'
                        onClick={onRemoveFile}
                      >
                        <X className='w-4 h-4 mr-2' />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h2 className='text-lg font-medium'>{profile?.fullName}</h2>
              <p className='text-sm text-gray-500'>Balance: {profile?.balance}</p>
            </div>
          </div>

          <nav className='space-y-1'>
            <Link
              href=''
              className='flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600'
            >
              <FaCircleUser className='w-5 h-5 mr-3' />
              Account
            </Link>
            <Link
              href=''
              className='flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600'
            >
              <FaBell className='w-5 h-5 mr-3' />
              Notification
            </Link>
            <Link
              href=''
              className='flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600'
            >
              <IoIosSettings className='w-5 h-5 mr-3' />
              Setting
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        <div className='bg-white rounded-lg shadow-sm'>
          <div className='flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 border-b gap-4 md:gap-0'>
            <h1 className='text-xl font-medium'>Account Setting</h1>
            <div className='flex gap-3 w-full md:w-auto'>
              <button className='flex-1 md:flex-none px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50'>
                Cancel
              </button>
              <button
                className='flex-1 md:flex-none px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700'
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>

          <form className='p-4 md:p-6 space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className='block text-sm text-gray-500 mb-2'>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  value={formData?.fullName}
                  onChange={handleChange}
                  placeholder='Full Name'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm text-gray-500 mb-2'>Phone</label>
                <input
                  type='text'
                  name='phoneNumber'
                  value={formData?.phoneNumber}
                  onChange={handleChange}
                  placeholder='User Name'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className='block text-sm text-gray-500 mb-2'>Email</label>
                <input
                  type='email'
                  value={profile?.email}
                  onChange={handleChange}
                  placeholder='example@gmail.com'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm text-gray-500 mb-2'>Phone Number</label>
                <input
                  type='tel'
                  value={profile?.phoneNumber}
                  onChange={handleChange}
                  placeholder='Phone Number'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
              </div>
            </div> */}

            {/* <div>
              <label className="block text-sm text-gray-500 mb-2">Address</label>
              <textarea
                placeholder="Address"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div> */}
          </form>
        </div>
        <EducationSection />
      </div>
    </div>
  )
}
