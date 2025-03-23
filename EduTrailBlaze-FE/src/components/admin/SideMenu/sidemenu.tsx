'use client'
import * as React from 'react'
import { useState } from 'react'

import { Theme, CSSObject } from '@mui/material/styles'
import {
  Box,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider
} from '@mui/material'
import scss from './SideMenu.module.scss'

import EqualizerIcon from '@mui/icons-material/Equalizer'
import SchoolIcon from '@mui/icons-material/School'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Person2Icon from '@mui/icons-material/Person2'
import Settings from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/Logout'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Star } from 'lucide-react'

//general
const generalRoutes = ['analytics', 'news', 'courses', 'orders', 'vouchers', 'reviews', 'users']
const generalTranslations = ['Data', 'News', 'Courses', 'Orders', 'Vouchers', 'Reviews', 'Users']
const generalIcons = [
  <EqualizerIcon />,
  <NewspaperIcon />,
  <SchoolIcon />,
  <ShoppingCartIcon />,
  <CardGiftcardIcon />,
  <Star />,
  <Person2Icon />
]

//personal
const personalRoutes = ['profile', 'notifications', '']
const personalTranslations = ['Profile', 'Notification', 'Sign Out']
const personalIcons = [<Person2Icon />, <NotificationsIcon />, <ExitToAppIcon />]

export default function SideMenu() {

  // const handleToggleSidebar = () => {
  //   setIsCollapsed((prev) => !prev)
  // }

  //notification (số thông báo)
  const [notificationsCount] = useState(3)

  //3 dot
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openProfileMenu = Boolean(anchorEl)
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseProfileMenu = () => {
    setAnchorEl(null)
  }

  //signout
  const handleListItemButtonClick = (text: string) => {
    if (text === 'Sign Out') signOut()
  }

  //theme
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      sx={{
        width:  200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'fixed',
          top: 0,
          left: 0,
          width:  200,
          boxSizing: 'border-box',
          height: '100vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {/* ADDED: Bọc toàn bộ nội dung bằng Box, chia làm top + bottom */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>

          {/* GENERAL */}
          <List>
            {generalTranslations.map((text, index) => (
              <ListItem key={text} disablePadding>
                <Link href={`/admin_dashboard/Dashboard/${generalRoutes[index]}`} className={scss.link}>
                  <ListItemButton onClick={() => handleListItemButtonClick(text)}>
                    <ListItemIcon>{generalIcons[index]}</ListItemIcon>
                   <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {personalTranslations.map((text, index) => (
              <ListItem key={text} disablePadding>
                <Link href={`/admin_dashboard/Dashboard/${personalRoutes[index]}`} className={scss.link}>
                  <ListItemButton onClick={() => handleListItemButtonClick(text)}>
                    <ListItemIcon>{personalIcons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                    {/* Notification Badge */}
                    {text === 'Notification' && (
                      <Badge badgeContent={notificationsCount} color='error' sx={{ ml: 1 }} />
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* BOTTOM BOX: PERSONAL + 3-chấm */}
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          {/* Nút 3 chấm */}
          <ListItemButton onClick={handleProfileClick}>
            <ListItemIcon>
              <MoreVertIcon />
            </ListItemIcon>
            <ListItemText primary='Profile Menu' />
          </ListItemButton>
          <Menu anchorEl={anchorEl} open={openProfileMenu} onClose={handleCloseProfileMenu}>
            <MenuItem
              onClick={() => {
                /* navigate /admin_dashboard/Dashboard/profile */
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                /* navigate /admin_dashboard/Dashboard/settings */
              }}
            >
              Settings
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Drawer>
  )
}
