'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import ToggleButton from '@/components/global/toggle_button/toggle_button'
import { useTheme } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/redux/slice/auth.slice'
import { toast } from 'react-toastify'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function AdminHeader() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [userName, setUserName] = React.useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const [userId, setUserId] = React.useState('')
  const { data: session } = useSession()
  const theme = useTheme()
  const userProfile = session?.user?.image as string

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken')

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

  console.log(userName)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logout successful! Redirecting to Login...')
    router.push('/auth/login_register')
  }

  return (
    <AppBar
      position='static'
      sx={{
        zIndex: 1300,
        // marginLeft: isCollapsed ? '57px' : '200px',
        // width: `calc(100% - ${isCollapsed ? 57 : 200}px)`
        marginLeft: '200px',
        width: 'calc(100% - 200px)'
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 6,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            {/* <img alt='' src='/assets/logos/ETB_Logo.png' className='w-40 h-30' /> */}
            <Link href={'/admin_dashboard'}>EduTrailBlaze</Link>
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            EduTrailBlaze
          </Typography>
          <Box sx={{ paddingRight: 5, marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
            <Typography>Signed in as {userName}</Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open profile settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={session?.user?.name as string} src={userProfile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link
                  href={'/admin_dashboard/Dashboard/profile'}
                  style={{ color: theme.palette.text.primary, textDecoration: 'none' }}
                >
                  <Typography textAlign='center'>Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <ToggleButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AdminHeader
