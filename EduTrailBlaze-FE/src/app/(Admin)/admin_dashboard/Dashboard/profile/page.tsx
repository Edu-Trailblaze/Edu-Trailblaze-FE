'use client'
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'

// 1) Import custom hook
import { useGetUserProfileQuery } from '@/redux/services/user.service' 

interface DecodedToken {
  sub?: string
  [key: string]: any
}

export default function Profile() {
  const { data: session } = useSession()

  // 2) Lấy userId từ JWT
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setUserId(decoded?.sub ?? '')
      } catch (error) {
        console.error('Error decoding token:', error)
        setUserId('')
      }
    }
  }, [])

  // 3) Gọi RTK Query lấy userProfile
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery(userId, {
    skip: !userId // nếu userId rỗng, skip gọi
  })

  // 4) Xử lý loading/error
  if (isLoading) {
    return <Typography>Loading user profile...</Typography>
  }
  if (isError) {
    return <Typography color='error'>Failed to load user profile!</Typography>
  }
  if (!userProfile) {
    return <Typography>No user profile data!</Typography>
  }

  // 5) Hiển thị userProfile
  // Ở đây, ta chỉ show field: fullName, email, phoneNumber, role, balance, profilePictureUrl
  // tuỳ ý bạn thay đổi UI.
  return (
    <>
      <Box>
        <Typography variant='h4' sx={{ paddingBottom: 4 }}>
          Hey {userProfile.fullName}, welcome to your profile
        </Typography>
        <Paper sx={{ padding: '1rem 2rem' }}>
          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={8} md={6}>
              <Box display='flex' flexDirection='column' alignItems='center' mb={2}>
                <Avatar sx={{ height: 100, width: 100, marginBottom: 2 }} src={userProfile.profilePictureUrl} />
                <Typography variant='h6'>{userProfile.fullName}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {userProfile.email}
                </Typography>
                <Typography variant='body1'>
                  <strong>Phone:</strong> {userProfile.phoneNumber}
                </Typography>
                <Typography variant='body1'>
                  <strong>Role:</strong> {userProfile.role.join(', ')}
                </Typography>
                <Typography variant='body1'>
                  <strong>Balance:</strong> {userProfile.balance}
                </Typography>
              </Box>

              {/* Dưới đây là form cũ của bạn, tuỳ ý bạn muốn giữ hay xoá */}
              {/* 
              <form style={{ maxWidth: 600, margin: '0 auto' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Full Name' value={userProfile.fullName} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type='email' label='Email' value={userProfile.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Phone Number' value={userProfile.phoneNumber} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant='contained' color='primary'>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
              */}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}
