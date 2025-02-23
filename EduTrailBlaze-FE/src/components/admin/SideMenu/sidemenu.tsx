'use client'
import * as React from 'react'
import { useTheme, Theme, CSSObject } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Drawer from '@mui/material/Drawer'
import { Paper, useMediaQuery } from '@mui/material'
import scss from './SideMenu.module.scss'

import EqualizerIcon from '@mui/icons-material/Equalizer'
import SchoolIcon from '@mui/icons-material/School'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Person2Icon from '@mui/icons-material/Person2'
import Settings from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/Logout'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Star } from 'lucide-react'

const generalRoutes = ['analytics', 'news', 'courses', 'orders', 'vouchers', 'reviews']
const generalTranslations = ['Data', 'News', 'Courses', 'Orders', 'Vouchers', 'Reviews']
const generalIcons = [
  <EqualizerIcon />,
  <NewspaperIcon />,
  <SchoolIcon />,
  <ShoppingCartIcon />,
  <CardGiftcardIcon />,
  <Star />,
  <Paper />
]

const personalRoutes = ['profile', 'settings', '']
const personalTranslations = ['Profile', 'Settings', 'Sign Out']
const personalIcons = [<Person2Icon />, <Settings />, <ExitToAppIcon />]

export default function SideMenu() {
  const theme = useTheme()

  const handleListItemButtonClick = (text: string) => {
    if (text === 'Sign Out') signOut()
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 180,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          position: 'relative',
          width: 200,
          boxSizing: 'border-box',
          height: '100%' // 🔹 Đảm bảo chiều cao full trong phần aside
        }
      }}
    >
      <Divider />

      {/* GENERAL */}

      <List>
        <ListSubheader
          component='div'
          sx={{
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '0.5px',
            color: theme.palette.text.primary,
            textTransform: 'uppercase'
          }}
        >
          General
        </ListSubheader>

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

      {/* PERSONAL */}
      <List>
        <ListSubheader
          component='div'
          sx={{
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '0.5px',
            color: theme.palette.text.primary,
            textTransform: 'uppercase'
          }}
        >
          Personal
        </ListSubheader>
        {personalTranslations.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link href={`/admin_dashboard/Dashboard/${personalRoutes[index]}`} className={scss.link}>
              <ListItemButton onClick={() => handleListItemButtonClick(text)}>
                <ListItemIcon>{personalIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
