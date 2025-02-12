'use client'
import * as React from 'react'
import { useTheme, Theme, CSSObject } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import { Paper, useMediaQuery } from '@mui/material'
import scss from './SideMenu.module.scss'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SchoolIcon from '@mui/icons-material/School'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Person2Icon from '@mui/icons-material/Person2'
import Settings from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/Logout'
import GroupsIcon from '@mui/icons-material/Groups';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ListSubheader from '@mui/material/ListSubheader';

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Paperclip, Star } from 'lucide-react'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const generalRoutes = ['analytics', 'news', 'courses', 'orders', 'vouchers', 'reviews'];
const generalTranslations = ['Data', 'News', 'Courses', 'Orders', 'Vouchers', 'Reviews'];
const generalIcons = [<EqualizerIcon />, <Paperclip />, <SchoolIcon />, <ShoppingCartIcon />, <CardGiftcardIcon />, <Star />, <Paper />];

const personalRoutes = ['profile', 'settings', ''];
const personalTranslations = ['Profile', 'Settings', 'Sign Out'];
const personalIcons = [<Person2Icon />, <Settings />, <ExitToAppIcon />];



export default function SideMenu() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  // const mobileCheck = useMediaQuery("(max-width:600px)")
  const mobileCheck = useMediaQuery(theme.breakpoints.down("sm"));



  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const handleListItemButtonClick = (text: string) => {
    text === 'Sign Out' ? signOut() : null
    setOpen(false)
  }

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      open={open}
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          top: mobileCheck ? 64 : 57,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme)
          })
        }
      }}
    >
      <div className={scss.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />


      {/* GENERAL */}

      <List
        subheader={
          mobileCheck ? (
            <ListSubheader
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '0.5px',
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
              }}
            >
              General
            </ListSubheader>
          ) : null
        }
      >
        {generalTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link href={`/admin_dashboard/Dashboard/${generalRoutes[index]}`} className={scss.link}>
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)}
                title={text}
                aria-label={text}
                sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                  {generalIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: theme.palette.text.primary, opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* PERSONAL */}

      <List
        subheader={
          mobileCheck ? (
            <ListSubheader
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '0.5px',
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
              }}
            >
              Personal
            </ListSubheader>
          ) : null
        }
      >
        {personalTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link href={`/admin_dashboard/Dashboard/${personalRoutes[index]}`} className={scss.link}>
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)}
                title={text}
                aria-label={text}
                sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                  {personalIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: theme.palette.text.primary, opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

    </Drawer >
  );
}
