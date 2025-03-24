// 'use client'
// import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
// import { useSession } from 'next-auth/react'
// import React, { useState, useEffect } from 'react'
// import {jwtDecode} from 'jwt-decode'

// // 1) Import custom hook
// import { useGetUserProfileQuery } from '@/redux/services/user.service' 

// interface DecodedToken {
//   sub?: string
//   [key: string]: any
// }

// export default function Profile() {
//   const { data: session } = useSession()

//   // 2) Lấy userId từ JWT
//   const [userId, setUserId] = useState('')
//   useEffect(() => {
//     const token = localStorage.getItem('accessToken')
//     if (token) {
//       try {
//         const decoded: DecodedToken = jwtDecode(token)
//         setUserId(decoded?.sub ?? '')
//       } catch (error) {
//         console.error('Error decoding token:', error)
//         setUserId('')
//       }
//     }
//   }, [])

//   // 3) Gọi RTK Query lấy userProfile
//   const { data: userProfile, isLoading, isError } = useGetUserProfileQuery(userId, {
//     skip: !userId // nếu userId rỗng, skip gọi
//   })

//   // 4) Xử lý loading/error
//   if (isLoading) {
//     return <Typography>Loading user profile...</Typography>
//   }
//   if (isError) {
//     return <Typography color='error'>Failed to load user profile!</Typography>
//   }
//   if (!userProfile) {
//     return <Typography>No user profile data!</Typography>
//   }

//   // 5) Hiển thị userProfile
//   // Ở đây, ta chỉ show field: fullName, email, phoneNumber, role, balance, profilePictureUrl
//   // tuỳ ý bạn thay đổi UI.
//   return (
//     <>
//       <Box>
//         <Typography variant='h4' sx={{ paddingBottom: 4 }}>
//           Hey {userProfile.fullName}, welcome to your profile
//         </Typography>
//         <Paper sx={{ padding: '1rem 2rem' }}>
//           <Grid container justifyContent='center'>
//             <Grid item xs={12} sm={8} md={6}>
//               <Box display='flex' flexDirection='column' alignItems='center' mb={2}>
//                 <Avatar sx={{ height: 100, width: 100, marginBottom: 2 }} src={userProfile.profilePictureUrl} />
//                 <Typography variant='h6'>{userProfile.fullName}</Typography>
//               </Box>

//               <Box mb={2}>
//                 <Typography variant='body1'>
//                   <strong>Email:</strong> {userProfile.email}
//                 </Typography>
//                 <Typography variant='body1'>
//                   <strong>Phone:</strong> {userProfile.phoneNumber}
//                 </Typography>
//                 <Typography variant='body1'>
//                   <strong>Role:</strong> {userProfile.role.join(', ')}
//                 </Typography>
//                 <Typography variant='body1'>
//                   <strong>Balance:</strong> {userProfile.balance}
//                 </Typography>
//               </Box>

//               {/* Dưới đây là form cũ của bạn, tuỳ ý bạn muốn giữ hay xoá */}
//               {/* 
//               <form style={{ maxWidth: 600, margin: '0 auto' }}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <TextField fullWidth label='Full Name' value={userProfile.fullName} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField fullWidth type='email' label='Email' value={userProfile.email} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField fullWidth label='Phone Number' value={userProfile.phoneNumber} />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button variant='contained' color='primary'>
//                       Save Changes
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//               */}
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     </>
//   )
// }


"use client"
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"

// Import custom hook
import { useGetUserProfileQuery } from "@/redux/services/user.service"

interface DecodedToken {
  sub?: string
  [key: string]: any
}

export default function Profile() {
  const { data: session } = useSession()

  // Get userId from JWT
  const [userId, setUserId] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setUserId(decoded?.sub ?? "")
      } catch (error) {
        console.error("Error decoding token:", error)
        setUserId("")
      }
    }
  }, [])

  // Call RTK Query to get userProfile
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetUserProfileQuery(userId, {
    skip: !userId, // skip if userId is empty
  })

  // Handle loading/error states
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">Loading user profile...</Typography>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="error">
          Failed to load user profile!
        </Typography>
      </Box>
    )
  }

  if (!userProfile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">No user profile data!</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
        {/* Header with background gradient */}
        <Box
          sx={{
            height: "128px",
            position: "relative",
            background: "linear-gradient(90deg, #e0f2fe 0%, #f5f3ff 50%, #e0f7fe 100%)",
          }}
        >
          <Box sx={{ position: "absolute", bottom: -64, left: 32 }}>
            <Avatar
              src={userProfile.profilePictureUrl || ""}
              alt={userProfile.fullName}
              sx={{
                width: 128,
                height: 128,
                border: "4px solid white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              {!userProfile.profilePictureUrl && userProfile.fullName?.charAt(0)}
            </Avatar>
          </Box>
         
        </Box>

        {/* User name and description */}
        <Box sx={{ mt: 10, px: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            {userProfile.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            A user information collection form is a document used to collect data about users.
          </Typography>

          {/* Contact info */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2 }}>
            {userProfile.phoneNumber && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#ffedd5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 14, color: "#f97316" }} />
                </Box>
                <Typography variant="body2">{userProfile.phoneNumber}</Typography>
              </Box>
            )}

            {userProfile.email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "#fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmailIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                </Box>
                <Typography variant="body2">{userProfile.email}</Typography>
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />
        </Box>

        {/* User details grid */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Grid container spacing={4}>
            {userProfile.fullName && (
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {userProfile.fullName}
                </Typography>
              </Grid>
            )}

            {userProfile.email && (
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {userProfile.email}
                </Typography>
              </Grid>
            )}

            {userProfile.phoneNumber && (
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {userProfile.phoneNumber}
                </Typography>
              </Grid>
            )}

            {userProfile.role && (
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {userProfile.role.join(", ")}
                </Typography>
              </Grid>
            )}

            {userProfile.balance !== undefined && (
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="text.secondary">
                  Balance
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  ${userProfile.balance}
                </Typography>
              </Grid>
            )}

            {/* ID field */}
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                ID
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {userId || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}


