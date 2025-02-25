import { useGetUserQuery } from '@/redux/services/user.service'
import React from 'react'

interface UserItemProps {
  id: string
}

export default function WelcomeItem({ id }: UserItemProps) {
  const { data: user, isLoading } = useGetUserQuery(id)

  if (isLoading) return <span>Loading....</span>
  return <span>{user && user !== undefined ? 'Welcome, ' + user.userName : 'Welcome to EduTrailBlaze'}</span>
}
