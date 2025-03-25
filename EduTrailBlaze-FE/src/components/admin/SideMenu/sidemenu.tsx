// 'use client'
// import * as React from 'react'
// import { useState } from 'react'

// import { Theme, CSSObject } from '@mui/material/styles'
// import {
//   Box,
//   Badge,
//   Menu,
//   MenuItem,
//   useTheme,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   Divider
// } from '@mui/material'
// import scss from './SideMenu.module.scss'

// import EqualizerIcon from '@mui/icons-material/Equalizer'
// import SchoolIcon from '@mui/icons-material/School'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
// import Person2Icon from '@mui/icons-material/Person2'
// import Settings from '@mui/icons-material/Settings'
// import ExitToAppIcon from '@mui/icons-material/Logout'
// import NewspaperIcon from '@mui/icons-material/Newspaper'
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
// import MenuIcon from '@mui/icons-material/Menu'
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// import NotificationsIcon from '@mui/icons-material/Notifications'
// import MoreVertIcon from '@mui/icons-material/MoreVert'

// import Link from 'next/link'
// import { signOut } from 'next-auth/react'
// import { Star } from 'lucide-react'

// //general
// const generalRoutes = ['analytics', 'news', 'courses', 'orders', 'vouchers', 'reviews', 'users']
// const generalTranslations = ['Data', 'News', 'Courses', 'Orders', 'Vouchers', 'Reviews', 'Users']
// const generalIcons = [
//   <EqualizerIcon />,
//   <NewspaperIcon />,
//   <SchoolIcon />,
//   <ShoppingCartIcon />,
//   <CardGiftcardIcon />,
//   <Star />,
//   <Person2Icon />
// ]

// //personal
// const personalRoutes = ['profile', 'notifications', '']
// const personalTranslations = ['Profile', 'Notification', 'Sign Out']
// const personalIcons = [<Person2Icon />, <NotificationsIcon />, <ExitToAppIcon />]

// export default function SideMenu() {

//   // const handleToggleSidebar = () => {
//   //   setIsCollapsed((prev) => !prev)
//   // }

//   //notification (số thông báo)
//   const [notificationsCount] = useState(3)

//   //3 dot
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const openProfileMenu = Boolean(anchorEl)
//   const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleCloseProfileMenu = () => {
//     setAnchorEl(null)
//   }

//   //signout
//   const handleListItemButtonClick = (text: string) => {
//     if (text === 'Sign Out') signOut()
//   }

//   //theme
//   const theme = useTheme()

//   return (
//     <Drawer
//       variant='permanent'
//       sx={{
//         width:  200,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width:  200,
//           boxSizing: 'border-box',
//           height: '100vh',
//           overflowX: 'hidden',
//           overflowY: 'auto',
//           display: 'flex',
//           flexDirection: 'column'
//         }
//       }}
//     >
//       {/* ADDED: Bọc toàn bộ nội dung bằng Box, chia làm top + bottom */}
//       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//         <Box>

//           {/* GENERAL */}
//           <List>
//             {generalTranslations.map((text, index) => (
//               <ListItem key={text} disablePadding>
//                 <Link href={`/admin_dashboard/Dashboard/${generalRoutes[index]}`} className={scss.link}>
//                   <ListItemButton onClick={() => handleListItemButtonClick(text)}>
//                     <ListItemIcon>{generalIcons[index]}</ListItemIcon>
//                    <ListItemText primary={text} />
//                   </ListItemButton>
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             {personalTranslations.map((text, index) => (
//               <ListItem key={text} disablePadding>
//                 <Link href={`/admin_dashboard/Dashboard/${personalRoutes[index]}`} className={scss.link}>
//                   <ListItemButton onClick={() => handleListItemButtonClick(text)}>
//                     <ListItemIcon>{personalIcons[index]}</ListItemIcon>
//                     <ListItemText primary={text} />
//                     {/* Notification Badge */}
//                     {text === 'Notification' && (
//                       <Badge badgeContent={notificationsCount} color='error' sx={{ ml: 1 }} />
//                     )}
//                   </ListItemButton>
//                 </Link>
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* BOTTOM BOX: PERSONAL + 3-chấm */}
//         <Box sx={{ mt: 'auto' }}>
//           <Divider />
//           {/* Nút 3 chấm */}
//           <ListItemButton onClick={handleProfileClick}>
//             <ListItemIcon>
//               <MoreVertIcon />
//             </ListItemIcon>
//             <ListItemText primary='Profile Menu' />
//           </ListItemButton>
//           <Menu anchorEl={anchorEl} open={openProfileMenu} onClose={handleCloseProfileMenu}>
//             <MenuItem
//               onClick={() => {
//                 /* navigate /admin_dashboard/Dashboard/profile */
//               }}
//             >
//               Profile
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 /* navigate /admin_dashboard/Dashboard/settings */
//               }}
//             >
//               Settings
//             </MenuItem>
//             <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
//           </Menu>
//         </Box>
//       </Box>
//     </Drawer>
//   )
// }

"use client"
import type * as React from "react"
import { useState } from "react"
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
  Divider,
  Typography,
} from "@mui/material"

import EqualizerIcon from "@mui/icons-material/Equalizer"
import SchoolIcon from "@mui/icons-material/School"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Person2Icon from "@mui/icons-material/Person2"
import ExitToAppIcon from "@mui/icons-material/Logout"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Star } from "lucide-react"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

// General section
// const generalRoutes = ["analytics", "news", "courses", "orders", "vouchers", "reviews", "users"]
// const generalTranslations = ["Data", "News", "Courses", "Orders", "Vouchers", "Reviews", "Users"]
const generalRoutes = [ "news", "courses", "orders", "vouchers", "reviews", "users"]
const generalTranslations = ["News", "Courses", "Orders", "Vouchers", "Reviews", "Users"]
const generalIcons = [
  <EqualizerIcon key="analytics" fontSize="small" />,
  <NewspaperIcon key="news" fontSize="small" />,
  <SchoolIcon key="courses" fontSize="small" />,
  <ShoppingCartIcon key="orders" fontSize="small" />,
  <CardGiftcardIcon key="vouchers" fontSize="small" />,
  <Star key="reviews" size={20} />,
  <Person2Icon key="users" fontSize="small" />,
]

// Personal section
const personalRoutes = ["profile", "notifications"]
const personalTranslations = ["Profile", "Notification"]
const personalIcons = [
  <Person2Icon key="profile" fontSize="small" />,
  <NotificationsIcon key="notifications" fontSize="small" />,
  <ExitToAppIcon key="signout" fontSize="small" />,
]

export default function SideMenu() {
  const pathname = usePathname()
  const [notificationsCount] = useState(3)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openProfileMenu = Boolean(anchorEl)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseProfileMenu = () => {
    setAnchorEl(null)
  }

  const handleListItemButtonClick = (text: string) => {
    if (text === "Sign Out") signOut()
  }

  const theme = useTheme()

  // Helper function to check if a route is active
  const isActive = (route: string) => {
    return pathname?.includes(`/admin_dashboard/Dashboard/${route}`)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          position: "fixed",
          top: 0,
          left: 0,
          width: 200,
          boxSizing: "border-box",
          height: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFFFF",
          boxShadow: "none",
          border: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 1 }}>
        {/* Logo Header */}
        <Link
          href="/admin_dashboard/Dashboard"
          style={{ textDecoration: "none", color: "inherit", marginBottom: "16px" }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              borderRadius: 1,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
              transition: "background-color 0.2s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src="/assets/logos/ETB_Logo.png"
                alt="EduTrailBlaze Logo"
                sx={{
                  height: 32,
                  width: "auto",
                }}
              />
            </Box>
          </Box>
        </Link>

        {/* GENERAL SECTION */}
        <Box>
          <List sx={{ px: 0.5 }}>
            {generalTranslations.map((text, index) => {
              const route = generalRoutes[index]
              const active = isActive(route)

              return (
                <ListItem key={text} disablePadding sx={{ mb: 0.5 }}>
                  <Link
                    href={`/admin_dashboard/Dashboard/${route}`}
                    style={{ textDecoration: "none", width: "100%", color: "inherit" }}
                  >
                    <ListItemButton
                      onClick={() => handleListItemButtonClick(text)}
                      sx={{
                        borderRadius: 1,
                        py: 1,
                        bgcolor: active ? "#f5f5f5" : "transparent",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>{generalIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: active ? 500 : 400,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )
            })}
          </List>

          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              PERSONAL
            </Typography>
          </Box>

          <List sx={{ px: 0.5 }}>
            {personalTranslations.map((text, index) => {
              const route = personalRoutes[index]
              const active = route ? isActive(route) : false

              return (
                <ListItem key={text} disablePadding sx={{ mb: 0.5 }}>
                  <Link
                    href={route ? `/admin_dashboard/Dashboard/${route}` : "#"}
                    style={{ textDecoration: "none", width: "100%", color: "inherit" }}
                    onClick={text === "Sign Out" ? () => signOut() : undefined}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: 1,
                        py: 1,
                        bgcolor: active ? "#f5f5f5" : "transparent",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>{personalIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: active ? 500 : 400,
                        }}
                      />
                      {/* Notification Badge */}
                      {text === "Notification" && notificationsCount > 0 && (
                        <Badge badgeContent={notificationsCount} color="error" sx={{ ml: 1 }} />
                      )}
                    </ListItemButton>
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </Box>

        {/* BOTTOM SECTION */}
        {/* <Box sx={{ mt: "auto", p: 1 }}>
          <Divider sx={{ my: 1 }} />
          <ListItemButton
            onClick={handleProfileClick}
            sx={{
              borderRadius: 1,
              py: 1.5,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            <Box
              sx={{
                bgcolor: "#4caf50",
                borderRadius: 1,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
              }}
            >
              <Person2Icon sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @admin
              </Typography>
            </Box>
            <MoreVertIcon fontSize="small" />
          </ListItemButton>

          <Menu
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleCloseProfileMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseProfileMenu()
                window.location.href = "/admin_dashboard/Dashboard/profile"
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseProfileMenu()
                window.location.href = "/admin_dashboard/Dashboard/settings"
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseProfileMenu()
                signOut()
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Box> */}
      </Box>
    </Drawer>
  )
}

