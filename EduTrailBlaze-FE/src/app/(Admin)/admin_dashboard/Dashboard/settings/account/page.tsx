import React from 'react'
import { Box, Typography, Divider, TextField, Button, Grid, Avatar } from '@mui/material'

const SettingAccount = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Divider */}
      <Divider orientation='vertical' flexItem sx={{ bgcolor: '#ddd' }} />

      {/* Content */}
      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant='h5' gutterBottom>
          Account
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          Update your business personal
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant='h6' gutterBottom>
            My Profile
          </Typography>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }} />
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' size='small' sx={{ mr: 2 }}>
                Upload
              </Button>
              <Button variant='outlined' color='error' size='small'>
                Delete
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField label='First Name' fullWidth value='Vietnam' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Last Name' fullWidth value='Ho Chi Minh' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Phone' fullWidth value='johndoe@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Email' fullWidth value='johndoe@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Birth of Date' fullWidth value='johndoe@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Password' fullWidth value='johndoe@gmail.com' />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant='h6' gutterBottom>
              Delete account
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Update your business personal
            </Typography>
            <Button variant='contained' color='error' sx={{ mr: 2 }}>
              Delete Account
            </Button>
            <Button variant='outlined'>Learn More</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SettingAccount
