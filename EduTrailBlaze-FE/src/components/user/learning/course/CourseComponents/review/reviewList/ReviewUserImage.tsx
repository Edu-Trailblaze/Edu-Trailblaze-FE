import React from 'react'
import { useGetUserProfileQuery } from '@/redux/services/user.service'

interface InstructorItemProps {
  userId: string
}

const ReviewUserPicture: React.FC<InstructorItemProps> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserProfileQuery(userId)

  if (isLoading) return <span>Loading...</span>

  return <div className='w-12 h-12 flex-shrink-0'><img className='rounded-full' src={user?.profilePictureUrl} alt="user" /></div>
}

export default ReviewUserPicture