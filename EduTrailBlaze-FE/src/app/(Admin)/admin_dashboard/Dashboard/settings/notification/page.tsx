import React from 'react'
import { Box, Typography, Divider, Switch, FormControlLabel, Checkbox, FormGroup } from '@mui/material'

const SettingNotification = () => {
  return (
    <Box sx={{ padding: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant='h5' gutterBottom>
        Notifications
      </Typography>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        Update your business personal
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Email Notifications Section */}
      <Box sx={{ mt: 3 }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6'>Email Notifications</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label='On' labelPlacement='start' />
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>

          <FormControlLabel control={<Checkbox />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>

          <FormControlLabel control={<Checkbox defaultChecked />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* More Activity Section */}
      <Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6'>More Activity</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label='On' labelPlacement='start' />
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>

          <FormControlLabel control={<Checkbox />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>

          <FormControlLabel control={<Checkbox />} label='News and Update Settings' />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 4 }}>
            snadjknsakdnaskdnasjdnkandsandksan dkajndjsandjksanjkd
          </Typography>
        </FormGroup>
      </Box>
    </Box>
  )
}

export default SettingNotification
