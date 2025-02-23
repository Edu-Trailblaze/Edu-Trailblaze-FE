import React from 'react'
import { Box, Typography, Divider, TextField, Grid, Button, Avatar } from '@mui/material'

const SettingGeneral = () => {
  return (
    <Box sx={{ padding: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant='h5' gutterBottom>
        General
      </Typography>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        Update your business personal
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Business Details */}
      <Box sx={{ mt: 3 }}>
        <Typography variant='h6' gutterBottom>
          Business Details
        </Typography>
        <Grid container spacing={2} alignItems='center' sx={{ mb: 3 }}>
          <Grid item>
            <Avatar sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item>
            <Button variant='contained' color='success' sx={{ mr: 2 }}>
              Upload
            </Button>
            <Button variant='outlined' color='error'>
              Delete
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label='Organization' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Organization' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Organization' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Organization' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Address Section */}
      <Box>
        <Typography variant='h6' gutterBottom>
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label='Country' fullWidth defaultValue='Vietnam' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='City' fullWidth defaultValue='Ho Chi Minh' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Flat/Unit' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Street' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Phone' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Postcode' fullWidth defaultValue='johndoe@gmail.com' />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SettingGeneral
