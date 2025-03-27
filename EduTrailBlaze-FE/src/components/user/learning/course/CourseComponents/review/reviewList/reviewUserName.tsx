import React from 'react'
import { useGetUserProfileQuery } from '@/redux/services/user.service'

interface InstructorItemProps {
  userId: string
}

const ReviewUserName: React.FC<InstructorItemProps> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserProfileQuery(userId)

  if (isLoading) return <span>Loading...</span>

  return <span className='font-medium text-lg'>{user?.fullName}</span>
}

export default ReviewUserName